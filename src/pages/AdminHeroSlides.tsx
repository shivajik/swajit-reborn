import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminGuard from '@/components/admin/AdminGuard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, Save, X, Upload, ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  cta_text: string;
  cta_link: string;
  sort_order: number;
  is_active: boolean;
}

const BUCKET = 'client-logos';
const HERO_FOLDER = 'hero-slides';

const AdminHeroSlides = () => {
  const { toast } = useToast();
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [editing, setEditing] = useState<Partial<HeroSlide> | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchSlides = async () => {
    setLoading(true);
    const { data } = await supabase.from('hero_slides').select('*').order('sort_order');
    if (data) setSlides(data);
    setLoading(false);
  };

  useEffect(() => { fetchSlides(); }, []);

  const uploadImage = async (file: File): Promise<string | null> => {
    setUploading(true);
    const ext = file.name.split('.').pop();
    const fileName = `${HERO_FOLDER}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage.from(BUCKET).upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
      setUploading(false);
      return null;
    }

    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
    setUploading(false);
    return urlData.publicUrl;
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadImage(file);
    if (url) {
      setEditing(prev => ({ ...prev, image_url: url }));
      toast({ title: 'Image uploaded' });
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const saveSlide = async () => {
    if (!editing?.title) return;
    if (editing.id) {
      const { error } = await supabase.from('hero_slides').update({
        title: editing.title,
        subtitle: editing.subtitle || '',
        image_url: editing.image_url || '',
        cta_text: editing.cta_text || '',
        cta_link: editing.cta_link || '',
        is_active: editing.is_active ?? true,
      }).eq('id', editing.id);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    } else {
      const { error } = await supabase.from('hero_slides').insert({
        title: editing.title,
        subtitle: editing.subtitle || '',
        image_url: editing.image_url || '',
        cta_text: editing.cta_text || '',
        cta_link: editing.cta_link || '',
        sort_order: slides.length,
        is_active: true,
      });
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    }
    setEditing(null);
    fetchSlides();
    toast({ title: 'Saved' });
  };

  const deleteSlide = async (id: string) => {
    if (!confirm('Delete this slide?')) return;
    await supabase.from('hero_slides').delete().eq('id', id);
    fetchSlides();
    toast({ title: 'Deleted' });
  };

  const toggleActive = async (slide: HeroSlide) => {
    await supabase.from('hero_slides').update({ is_active: !slide.is_active }).eq('id', slide.id);
    fetchSlides();
  };

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Hero Slides</h1>
            <p className="text-muted-foreground text-sm">Manage homepage hero carousel</p>
          </div>
          <Button onClick={() => setEditing({ title: '', subtitle: '', image_url: '', cta_text: '', cta_link: '' })}>
            <Plus className="w-4 h-4 mr-1" /> Add Slide
          </Button>
        </div>

        {editing && (
          <div className="bg-card rounded-xl border border-border p-4 mb-6 space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Title</Label>
                <Input value={editing.title || ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label>Subtitle</Label>
                <Input value={editing.subtitle || ''} onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })} />
              </div>
            </div>

            {/* Image upload section */}
            <div className="space-y-2">
              <Label>Slide Image</Label>
              <div className="flex gap-3 items-start">
                {/* Preview */}
                <div className="w-40 h-24 bg-muted rounded-lg overflow-hidden shrink-0 border border-border flex items-center justify-center">
                  {editing.image_url ? (
                    <img src={editing.image_url} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    <Upload className="w-3 h-3 mr-1" />
                    {uploading ? 'Uploading...' : 'Upload Image'}
                  </Button>
                  <p className="text-xs text-muted-foreground">Or paste a URL below:</p>
                  <Input
                    value={editing.image_url || ''}
                    onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>CTA Text</Label>
                <Input value={editing.cta_text || ''} onChange={(e) => setEditing({ ...editing, cta_text: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label>CTA Link</Label>
                <Input value={editing.cta_link || ''} onChange={(e) => setEditing({ ...editing, cta_link: e.target.value })} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={saveSlide} disabled={uploading}><Save className="w-3 h-3 mr-1" /> Save</Button>
              <Button size="sm" variant="ghost" onClick={() => setEditing(null)}><X className="w-3 h-3" /></Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading...</div>
          ) : slides.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No slides yet.</div>
          ) : (
            slides.map((slide) => (
              <div key={slide.id} className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
                <div className="w-24 h-16 bg-muted rounded-lg overflow-hidden shrink-0">
                  {slide.image_url && <img src={slide.image_url} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-foreground truncate">{slide.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{slide.subtitle}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleActive(slide)}
                    className={`px-2 py-1 rounded text-xs font-heading ${
                      slide.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {slide.is_active ? 'Active' : 'Hidden'}
                  </button>
                  <button onClick={() => setEditing(slide)} className="p-1.5 hover:text-accent"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => deleteSlide(slide.id)} className="p-1.5 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))
          )}
        </div>
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminHeroSlides;
