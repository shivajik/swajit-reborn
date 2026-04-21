import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2, Upload } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface NewsRow {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  cover_image_url: string;
  is_published: boolean;
  sort_order: number;
  published_at: string | null;
}

const empty: NewsRow = {
  id: "",
  title: "",
  slug: "",
  summary: "",
  content: "<p></p>",
  cover_image_url: "",
  is_published: false,
  sort_order: 0,
  published_at: null,
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const AdminNews = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<NewsRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<NewsRow | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("sort_order")
      .order("published_at", { ascending: false });
    if (data) setItems(data as NewsRow[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const startNew = () => setEditing({ ...empty });

  const uploadCover = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `news/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("site-assets").upload(path, file);
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("site-assets").getPublicUrl(path);
    if (editing) setEditing({ ...editing, cover_image_url: data.publicUrl });
    setUploading(false);
  };

  const save = async () => {
    if (!editing) return;
    if (!editing.title.trim()) {
      toast({ title: "Title required", variant: "destructive" });
      return;
    }
    setSaving(true);
    const slug = editing.slug.trim() || slugify(editing.title);
    const payload = {
      title: editing.title.trim(),
      slug,
      summary: editing.summary,
      content: editing.content,
      cover_image_url: editing.cover_image_url,
      is_published: editing.is_published,
      sort_order: editing.sort_order || 0,
      published_at:
        editing.is_published && !editing.published_at
          ? new Date().toISOString()
          : editing.published_at,
    };

    let error;
    if (editing.id) {
      ({ error } = await supabase.from("news").update(payload).eq("id", editing.id));
    } else {
      ({ error } = await supabase.from("news").insert(payload));
    }
    setSaving(false);

    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: editing.id ? "News updated" : "News created" });
    setEditing(null);
    fetchItems();
  };

  const togglePublish = async (item: NewsRow) => {
    const newState = !item.is_published;
    await supabase
      .from("news")
      .update({
        is_published: newState,
        published_at: newState && !item.published_at ? new Date().toISOString() : item.published_at,
      })
      .eq("id", item.id);
    fetchItems();
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await supabase.from("news").delete().eq("id", deleteId);
    setDeleteId(null);
    toast({ title: "News deleted" });
    fetchItems();
  };

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-heading font-bold text-foreground">News & Announcements</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Publish news articles. Titles appear in the homepage ticker; clicking opens the full article page.
              </p>
            </div>
            <Button onClick={startNew} className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="w-4 h-4 mr-2" /> New Article
            </Button>
          </div>

          {/* Editor */}
          {editing && (
            <div className="bg-card border border-border rounded-lg p-5 mb-6 space-y-4">
              <h2 className="font-heading font-bold text-lg text-foreground">
                {editing.id ? "Edit Article" : "New Article"}
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Title *</Label>
                  <Input
                    value={editing.title}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        title: e.target.value,
                        slug: editing.id ? editing.slug : slugify(e.target.value),
                      })
                    }
                    placeholder="Article title"
                  />
                </div>
                <div>
                  <Label>Slug (URL)</Label>
                  <Input
                    value={editing.slug}
                    onChange={(e) => setEditing({ ...editing, slug: slugify(e.target.value) })}
                    placeholder="auto-generated-from-title"
                  />
                </div>
              </div>

              <div>
                <Label>Summary (optional)</Label>
                <Textarea
                  value={editing.summary}
                  onChange={(e) => setEditing({ ...editing, summary: e.target.value })}
                  placeholder="Short description shown above the article"
                  rows={2}
                />
              </div>

              <div>
                <Label>Cover Image (optional)</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    value={editing.cover_image_url}
                    onChange={(e) => setEditing({ ...editing, cover_image_url: e.target.value })}
                    placeholder="https://... or upload"
                  />
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])}
                    />
                    <Button type="button" variant="outline" disabled={uploading} asChild>
                      <span>
                        {uploading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4" />
                        )}
                      </span>
                    </Button>
                  </label>
                </div>
                {editing.cover_image_url && (
                  <img
                    src={editing.cover_image_url}
                    alt="Cover"
                    className="mt-2 h-32 rounded border border-border object-cover"
                  />
                )}
              </div>

              <div>
                <Label>Content *</Label>
                <RichTextEditor
                  value={editing.content}
                  onChange={(html) => setEditing({ ...editing, content: html })}
                  minHeight="320px"
                />
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={editing.is_published}
                    onCheckedChange={(v) => setEditing({ ...editing, is_published: v })}
                  />
                  <Label>Published</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-xs">Sort order</Label>
                  <Input
                    type="number"
                    value={editing.sort_order}
                    onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
                    className="w-20"
                  />
                </div>
                <div className="flex gap-2 ml-auto">
                  <Button variant="outline" onClick={() => setEditing(null)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={save}
                    disabled={saving}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Save
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* List */}
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              <Loader2 className="w-6 h-6 animate-spin mx-auto" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16 bg-card border border-dashed border-border rounded-lg text-muted-foreground">
              No news yet. Click "New Article" to create one.
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-lg p-4 flex items-center gap-4"
                >
                  {item.cover_image_url ? (
                    <img
                      src={item.cover_image_url}
                      alt=""
                      className="w-16 h-16 rounded object-cover border border-border shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded bg-muted shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-heading font-bold text-foreground truncate">{item.title}</h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          item.is_published
                            ? "bg-green-100 text-green-800"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {item.is_published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">/news/{item.slug}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button size="sm" variant="ghost" onClick={() => togglePublish(item)} title="Toggle publish">
                      {item.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditing(item)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setDeleteId(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this article?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminNews;
