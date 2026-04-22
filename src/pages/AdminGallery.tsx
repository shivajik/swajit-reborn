import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminGuard from '@/components/admin/AdminGuard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import ImageUpload from '@/components/admin/ImageUpload';
import { Plus, Pencil, Trash2, Save, X, ImageIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GalleryItem {
  id: string;
  section_title: string;
  image_url: string;
  alt_text: string;
  sort_order: number;
  is_active: boolean;
}

const empty: Omit<GalleryItem, 'id'> = {
  section_title: 'General',
  image_url: '',
  alt_text: '',
  sort_order: 0,
  is_active: true,
};

const AdminGallery = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<GalleryItem> | null>(null);
  const [saving, setSaving] = useState(false);
  const [tableMissing, setTableMissing] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from('gallery_items')
      .select('*')
      .order('section_title')
      .order('sort_order');
    if (error) {
      const missing =
        error.message.includes('does not exist') ||
        error.message.includes('schema cache') ||
        (error as any).code === 'PGRST205';
      setTableMissing(missing);
      toast({
        title: 'Failed to load',
        description: missing
          ? 'gallery_items table missing. Run docs/storage-and-rls-setup.sql in Supabase.'
          : error.message,
        variant: 'destructive',
      });
    } else {
      setTableMissing(false);
    }
    if (data) setItems(data as GalleryItem[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const save = async () => {
    if (!editing?.image_url) {
      toast({ title: 'Image required', variant: 'destructive' });
      return;
    }
    setSaving(true);
    const payload = {
      section_title: editing.section_title?.trim() || 'General',
      image_url: editing.image_url,
      alt_text: editing.alt_text || '',
      sort_order: editing.sort_order ?? 0,
      is_active: editing.is_active ?? true,
    };

    if (editing.id) {
      const { data, error } = await (supabase as any)
        .from('gallery_items')
        .update(payload)
        .eq('id', editing.id)
        .select()
        .single();
      setSaving(false);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
      if (!data) { toast({ title: 'Update blocked', description: 'No row updated. Check RLS policies.', variant: 'destructive' }); return; }
      setItems(prev => prev.map(i => i.id === data.id ? data : i));
    } else {
      const { data, error } = await (supabase as any)
        .from('gallery_items')
        .insert(payload)
        .select()
        .single();
      setSaving(false);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
      if (data) setItems(prev => [...prev, data]);
    }

    setEditing(null);
    toast({ title: 'Saved' });
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    const { error } = await (supabase as any).from('gallery_items').delete().eq('id', id);
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    setItems(prev => prev.filter(i => i.id !== id));
    toast({ title: 'Deleted' });
  };

  // Group by section_title
  const grouped = items.reduce<Record<string, GalleryItem[]>>((acc, item) => {
    (acc[item.section_title] = acc[item.section_title] || []).push(item);
    return acc;
  }, {});

  const sections = Array.from(new Set(items.map(i => i.section_title)));

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-accent" /> Photo Gallery
            </h1>
            <p className="text-muted-foreground text-sm">Manage gallery sections shown on the Photo Gallery page</p>
          </div>
          <Button onClick={() => setEditing({ ...empty })}>
            <Plus className="w-4 h-4 mr-1" /> Add Image
          </Button>
        </div>

        {tableMissing && (
          <div className="mb-6 rounded-lg border-2 border-destructive/40 bg-destructive/10 p-4 text-sm">
            <p className="font-heading font-bold text-destructive mb-1">⚠ Database setup required</p>
            <p className="text-foreground">
              The <code className="bg-muted px-1 rounded">gallery_items</code> table doesn't exist yet. Open
              {' '}<code className="bg-muted px-1 rounded">docs/storage-and-rls-setup.sql</code> from this project,
              copy its contents, and run it once in your Supabase SQL Editor. This same script also creates
              the storage buckets needed for image uploads (Hero, Products, News, Page Content, etc.).
            </p>
          </div>
        )}

        {editing && (
          <div className="bg-card rounded-xl border border-border p-5 mb-6 space-y-4">
            <h3 className="font-heading font-bold text-foreground">
              {editing.id ? 'Edit Image' : 'New Gallery Image'}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Section Title</Label>
                <Input
                  value={editing.section_title || ''}
                  onChange={(e) => setEditing({ ...editing, section_title: e.target.value })}
                  placeholder="e.g. Dealers Meet 2024"
                  list="gallery-sections"
                />
                <datalist id="gallery-sections">
                  {sections.map(s => <option key={s} value={s} />)}
                </datalist>
              </div>
              <div className="space-y-1">
                <Label>Alt Text</Label>
                <Input
                  value={editing.alt_text || ''}
                  onChange={(e) => setEditing({ ...editing, alt_text: e.target.value })}
                  placeholder="Description for accessibility"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label>Image *</Label>
              <ImageUpload
                value={editing.image_url || ''}
                onChange={(url) => setEditing({ ...editing, image_url: url })}
                bucket="gallery"
                previewClassName="w-48 h-32"
              />
            </div>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <Switch
                  checked={editing.is_active ?? true}
                  onCheckedChange={(v) => setEditing({ ...editing, is_active: v })}
                />
                <Label>Visible on website</Label>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs">Sort order</Label>
                <Input
                  type="number"
                  value={editing.sort_order ?? 0}
                  onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
                  className="w-20"
                />
              </div>
              <div className="flex gap-2 ml-auto">
                <Button variant="ghost" onClick={() => setEditing(null)}>
                  <X className="w-3 h-3 mr-1" /> Cancel
                </Button>
                <Button onClick={save} disabled={saving}>
                  {saving ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Save className="w-3 h-3 mr-1" />}
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 bg-card border border-dashed border-border rounded-lg text-muted-foreground">
            No gallery images yet. Click "Add Image" to create one.
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([section, list]) => (
              <div key={section} className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="bg-muted/50 px-4 py-3 border-b border-border">
                  <h2 className="font-heading font-bold text-foreground">{section}</h2>
                  <span className="text-xs text-muted-foreground">{list.length} image{list.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {list.map(item => (
                    <div key={item.id} className="border border-border rounded-lg overflow-hidden group relative">
                      <div className="aspect-[4/3] bg-muted">
                        <img src={item.image_url} alt={item.alt_text} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-2 flex items-center justify-between gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${item.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                          {item.is_active ? 'Visible' : 'Hidden'}
                        </span>
                        <div className="flex gap-1">
                          <button onClick={() => setEditing(item)} className="p-1 hover:text-accent">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => remove(item.id)} className="p-1 hover:text-red-500">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminGallery;
