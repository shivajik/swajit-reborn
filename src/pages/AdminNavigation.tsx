import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminGuard from '@/components/admin/AdminGuard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Save, Plus, Trash2, GripVertical, ArrowUp, ArrowDown, Eye, EyeOff, Navigation, FilePlus,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { NavItem, DEFAULT_NAV_ITEMS, clearNavCache } from '@/hooks/useNavItems';

const generateId = () => Math.random().toString(36).substring(2, 10);

const AdminNavigation = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Custom page form
  const [showNewPage, setShowNewPage] = useState(false);
  const [newPageLabel, setNewPageLabel] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [newPageContent, setNewPageContent] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('site_settings')
      .select('setting_value')
      .eq('setting_key', 'nav_items')
      .maybeSingle();

    if (data?.setting_value) {
      try {
        const parsed = JSON.parse(data.setting_value);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed.sort((a: NavItem, b: NavItem) => a.sort_order - b.sort_order));
          setLoading(false);
          return;
        }
      } catch { /* use defaults */ }
    }
    setItems([...DEFAULT_NAV_ITEMS]);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const saveItems = async (itemsToSave?: NavItem[]) => {
    setSaving(true);
    const toSave = (itemsToSave || items).map((item, i) => ({ ...item, sort_order: i }));

    // Upsert nav_items in site_settings
    const { error } = await supabase.from('site_settings').upsert(
      { setting_key: 'nav_items', setting_value: JSON.stringify(toSave) },
      { onConflict: 'setting_key' }
    );

    setSaving(false);
    clearNavCache();

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setItems(toSave);
      toast({ title: 'Saved', description: 'Navigation updated successfully.' });
    }
  };

  const toggleVisibility = (id: string) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, visible: !item.visible } : item
    ));
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    const updated = [...items];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setItems(updated.map((item, i) => ({ ...item, sort_order: i })));
  };

  const updateItemLabel = (id: string, label: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, label } : item));
  };

  const removeItem = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item && !item.is_custom) {
      // For built-in pages, just hide them
      toggleVisibility(id);
      return;
    }
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const addCustomPage = async () => {
    if (!newPageLabel.trim() || !newPageSlug.trim()) {
      toast({ title: 'Error', description: 'Label and slug are required.', variant: 'destructive' });
      return;
    }

    const slug = newPageSlug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/--+/g, '-');

    // Save custom page content to page_content table
    const { error: contentError } = await supabase.from('page_content').insert({
      page_key: `custom_${slug}`,
      section_key: 'main',
      title: newPageLabel.trim(),
      content: newPageContent.trim() || 'Page content goes here.',
      image_url: '',
      metadata: {},
    });

    if (contentError) {
      toast({ title: 'Error', description: contentError.message, variant: 'destructive' });
      return;
    }

    const newItem: NavItem = {
      id: generateId(),
      label: newPageLabel.trim(),
      href: `/page/${slug}`,
      visible: true,
      is_custom: true,
      sort_order: items.length,
    };

    const updated = [...items, newItem];
    setItems(updated);
    await saveItems(updated);

    setNewPageLabel('');
    setNewPageSlug('');
    setNewPageContent('');
    setShowNewPage(false);

    toast({ title: 'Created', description: `Custom page "${newPageLabel.trim()}" added.` });
  };

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
              <Navigation className="w-6 h-6 text-accent" />
              Page & Navigation
            </h1>
            <p className="text-muted-foreground text-sm">Manage menu items, page visibility, and custom pages</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowNewPage(!showNewPage)}>
              <FilePlus className="w-4 h-4 mr-1" />
              New Custom Page
            </Button>
            <Button onClick={() => saveItems()} disabled={saving}>
              <Save className="w-4 h-4 mr-1" />
              {saving ? 'Saving...' : 'Save Order'}
            </Button>
          </div>
        </div>

        {/* New Custom Page Form */}
        {showNewPage && (
          <div className="bg-card rounded-xl border border-border p-5 mb-6 space-y-4">
            <h3 className="font-heading font-bold text-foreground">Create Custom Page</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Page Name</Label>
                <Input
                  placeholder="e.g. Our Services"
                  value={newPageLabel}
                  onChange={(e) => {
                    setNewPageLabel(e.target.value);
                    if (!newPageSlug || newPageSlug === newPageLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-')) {
                      setNewPageSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
                    }
                  }}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">URL Slug</Label>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">/page/</span>
                  <Input
                    placeholder="our-services"
                    value={newPageSlug}
                    onChange={(e) => setNewPageSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Page Content</Label>
              <Textarea
                placeholder="Enter the page content here..."
                value={newPageContent}
                onChange={(e) => setNewPageContent(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={addCustomPage}>
                <Plus className="w-4 h-4 mr-1" /> Create Page
              </Button>
              <Button variant="ghost" onClick={() => setShowNewPage(false)}>Cancel</Button>
            </div>
          </div>
        )}

        {/* Navigation Items List */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 border-b border-border grid grid-cols-[auto_1fr_1fr_auto] gap-4 items-center">
              <span className="text-xs font-heading font-semibold text-muted-foreground w-8"></span>
              <span className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">Label</span>
              <span className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">Path</span>
              <span className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider w-32 text-right">Actions</span>
            </div>
            <div className="divide-y divide-border">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`px-4 py-3 grid grid-cols-[auto_1fr_1fr_auto] gap-4 items-center transition-colors ${
                    !item.visible ? 'opacity-50 bg-muted/20' : ''
                  }`}
                >
                  <div className="flex flex-col gap-0.5 w-8">
                    <button
                      onClick={() => moveItem(index, -1)}
                      disabled={index === 0}
                      className="p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <GripVertical className="w-3.5 h-3.5 text-muted-foreground/50 mx-auto" />
                    <button
                      onClick={() => moveItem(index, 1)}
                      disabled={index === items.length - 1}
                      className="p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <Input
                      value={item.label}
                      onChange={(e) => updateItemLabel(item.id, e.target.value)}
                      className="h-8 text-sm font-heading"
                    />
                    {item.is_custom && (
                      <span className="text-[10px] text-accent font-heading uppercase tracking-wider mt-0.5 inline-block">
                        Custom Page
                      </span>
                    )}
                  </div>

                  <span className="text-sm text-muted-foreground font-mono">{item.href}</span>

                  <div className="flex items-center gap-2 w-32 justify-end">
                    <button
                      onClick={() => toggleVisibility(item.id)}
                      className={`p-1.5 rounded-md transition-colors ${
                        item.visible
                          ? 'text-emerald-600 hover:bg-emerald-50'
                          : 'text-muted-foreground hover:bg-muted'
                      }`}
                      title={item.visible ? 'Hide' : 'Show'}
                    >
                      {item.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    {item.is_custom && (
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 rounded-md text-destructive hover:bg-destructive/10 transition-colors"
                        title="Delete custom page"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-4">
          💡 Built-in pages can be hidden but not deleted. Custom pages can be fully removed. Changes take effect after saving.
        </p>
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminNavigation;
