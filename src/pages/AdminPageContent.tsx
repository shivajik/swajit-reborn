import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminGuard from '@/components/admin/AdminGuard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RichTextEditor from '@/components/admin/RichTextEditor';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Save, Plus, Trash2, FileText, Pencil, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PageContent {
  id: string;
  page_key: string;
  section_key: string;
  title: string;
  content: string;
  image_url: string;
  metadata: Record<string, any>;
}

const AdminPageContent = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  // Create form
  const [showCreate, setShowCreate] = useState(false);
  const [newPageKey, setNewPageKey] = useState('');
  const [newSectionKey, setNewSectionKey] = useState('main');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [creating, setCreating] = useState(false);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<PageContent | null>(null);

  // Collapsed groups
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  const fetchContent = async () => {
    setLoading(true);
    const { data } = await supabase.from('page_content').select('*').order('page_key').order('section_key');
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchContent(); }, []);

  const saveItem = async (item: PageContent) => {
    setSaving(item.id);
    const { error } = await supabase.from('page_content').update({
      title: item.title,
      content: item.content,
      image_url: item.image_url,
    }).eq('id', item.id);

    setSaving(null);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Saved', description: `${item.page_key} › ${item.section_key} updated.` });
      setEditingId(null);
    }
  };

  const updateItem = (id: string, field: keyof PageContent, value: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const createItem = async () => {
    if (!newPageKey.trim() || !newSectionKey.trim()) {
      toast({ title: 'Error', description: 'Page key and section key are required.', variant: 'destructive' });
      return;
    }
    setCreating(true);
    const { error } = await supabase.from('page_content').insert({
      page_key: newPageKey.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_'),
      section_key: newSectionKey.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_'),
      title: newTitle.trim(),
      content: newContent.trim() || '<p></p>',
      image_url: newImageUrl.trim(),
      metadata: {},
    });
    setCreating(false);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Created', description: 'New content section added.' });
      setNewPageKey(''); setNewSectionKey('main'); setNewTitle(''); setNewContent(''); setNewImageUrl('');
      setShowCreate(false);
      fetchContent();
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from('page_content').delete().eq('id', deleteTarget.id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setItems(prev => prev.filter(i => i.id !== deleteTarget.id));
      toast({ title: 'Deleted', description: `Removed "${deleteTarget.page_key} › ${deleteTarget.section_key}".` });
    }
    setDeleteTarget(null);
  };

  const toggleGroup = (key: string) => {
    setCollapsedGroups(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  // Group by page_key
  const grouped = items.reduce<Record<string, PageContent[]>>((acc, item) => {
    (acc[item.page_key] = acc[item.page_key] || []).push(item);
    return acc;
  }, {});

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
              <FileText className="w-6 h-6 text-accent" />
              Page Content
            </h1>
            <p className="text-muted-foreground text-sm">Create, edit, and manage content sections for all pages</p>
          </div>
          <Button variant="outline" onClick={() => { setShowCreate(!showCreate); setEditingId(null); }}>
            <Plus className="w-4 h-4 mr-1" />
            New Section
          </Button>
        </div>

        {/* Create Form */}
        {showCreate && (
          <div className="bg-card rounded-xl border-2 border-accent/30 p-5 mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-foreground">Create Content Section</h3>
              <button onClick={() => setShowCreate(false)} className="p-1 text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Page Key</Label>
                <Input
                  placeholder="e.g. about, home, services"
                  value={newPageKey}
                  onChange={(e) => setNewPageKey(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Section Key</Label>
                <Input
                  placeholder="e.g. main, hero, intro"
                  value={newSectionKey}
                  onChange={(e) => setNewSectionKey(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Title</Label>
                <Input
                  placeholder="Section title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Image URL (optional)</Label>
              <Input
                placeholder="https://..."
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Content</Label>
              <RichTextEditor
                value={newContent}
                onChange={setNewContent}
                placeholder="Start writing content..."
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={createItem} disabled={creating}>
                <Plus className="w-4 h-4 mr-1" />
                {creating ? 'Creating...' : 'Create Section'}
              </Button>
              <Button variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button>
            </div>
          </div>
        )}

        {/* Content List */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : Object.keys(grouped).length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No page content yet. Click "New Section" to create one.
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(grouped).map(([pageKey, sections]) => {
              const isCollapsed = collapsedGroups.has(pageKey);
              return (
                <div key={pageKey} className="bg-card rounded-xl border border-border overflow-hidden">
                  <button
                    onClick={() => toggleGroup(pageKey)}
                    className="w-full bg-muted/50 px-4 py-3 border-b border-border flex items-center gap-2 hover:bg-muted/70 transition-colors"
                  >
                    {isCollapsed ? <ChevronRight className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    <h2 className="font-heading font-bold text-foreground capitalize">{pageKey.replace(/_/g, ' ')}</h2>
                    <span className="text-xs text-muted-foreground ml-auto">{sections.length} section{sections.length !== 1 ? 's' : ''}</span>
                  </button>

                  {!isCollapsed && (
                    <div className="divide-y divide-border">
                      {sections.map((item) => {
                        const isEditing = editingId === item.id;
                        return (
                          <div key={item.id} className="p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-heading font-semibold text-accent uppercase tracking-wider">
                                {item.section_key.replace(/_/g, ' ')}
                              </span>
                              <div className="flex items-center gap-1.5">
                                {!isEditing && (
                                  <button
                                    onClick={() => setEditingId(item.id)}
                                    className="p-1.5 rounded-md text-accent hover:bg-accent/10 transition-colors"
                                    title="Edit"
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </button>
                                )}
                                <button
                                  onClick={() => setDeleteTarget(item)}
                                  className="p-1.5 rounded-md text-destructive hover:bg-destructive/10 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {isEditing ? (
                              <>
                                <div className="grid sm:grid-cols-2 gap-3">
                                  <div className="space-y-1">
                                    <Label className="text-xs">Title</Label>
                                    <Input
                                      value={item.title}
                                      onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <Label className="text-xs">Image URL</Label>
                                    <Input
                                      value={item.image_url}
                                      onChange={(e) => updateItem(item.id, 'image_url', e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs">Content</Label>
                                  <RichTextEditor
                                    value={item.content}
                                    onChange={(html) => updateItem(item.id, 'content', html)}
                                    minHeight="200px"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => saveItem(item)}
                                    disabled={saving === item.id}
                                  >
                                    <Save className="w-3 h-3 mr-1" />
                                    {saving === item.id ? 'Saving...' : 'Save'}
                                  </Button>
                                  <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                                </div>
                              </>
                            ) : (
                              <div className="space-y-1">
                                <p className="text-sm font-heading font-semibold text-foreground">{item.title || <span className="text-muted-foreground italic">No title</span>}</p>
                                {item.image_url && (
                                  <p className="text-xs text-muted-foreground truncate">🖼 {item.image_url}</p>
                                )}
                                <div
                                  className="text-sm text-muted-foreground line-clamp-2 prose prose-sm max-w-none"
                                  dangerouslySetInnerHTML={{ __html: item.content || '<em>No content</em>' }}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-4">
          💡 Content sections are grouped by page key. Use consistent page keys (e.g. "about", "home") to organize content for each page.
        </p>

        {/* Delete Confirmation */}
        <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete content section?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently remove <strong>{deleteTarget?.page_key} › {deleteTarget?.section_key}</strong>. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminPageContent;
