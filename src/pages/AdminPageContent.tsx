import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminGuard from '@/components/admin/AdminGuard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';
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
      toast({ title: 'Saved', description: `${item.page_key} > ${item.section_key} updated.` });
    }
  };

  const updateItem = (id: string, field: keyof PageContent, value: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Group by page_key
  const grouped = items.reduce<Record<string, PageContent[]>>((acc, item) => {
    (acc[item.page_key] = acc[item.page_key] || []).push(item);
    return acc;
  }, {});

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="mb-6">
          <h1 className="text-2xl font-heading font-bold text-foreground">Page Content</h1>
          <p className="text-muted-foreground text-sm">Edit text and images on your website pages</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : Object.keys(grouped).length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No page content entries yet. Add content sections via the database.
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([pageKey, sections]) => (
              <div key={pageKey} className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="bg-muted/50 px-4 py-3 border-b border-border">
                  <h2 className="font-heading font-bold text-foreground capitalize">{pageKey.replace(/_/g, ' ')}</h2>
                </div>
                <div className="divide-y divide-border">
                  {sections.map((item) => (
                    <div key={item.id} className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-heading font-semibold text-accent uppercase tracking-wider">
                          {item.section_key.replace(/_/g, ' ')}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => saveItem(item)}
                          disabled={saving === item.id}
                        >
                          <Save className="w-3 h-3 mr-1" />
                          {saving === item.id ? 'Saving...' : 'Save'}
                        </Button>
                      </div>
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
                        <Textarea
                          value={item.content}
                          onChange={(e) => updateItem(item.id, 'content', e.target.value)}
                          rows={3}
                        />
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

export default AdminPageContent;
