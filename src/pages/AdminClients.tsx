import { useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminGuard from '@/components/admin/AdminGuard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Trash2, Save, X, Upload, Loader2, GripVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Client {
  id: string;
  name: string;
  logo_url: string;
  category: string;
  sort_order: number;
  is_active: boolean;
}

const CATEGORIES = ['Sugar', 'OEM', 'Chemical & Fertilizer', 'Steel', 'Cement', 'Export', 'Other'];

const AdminClients = () => {
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([]);
  const [editing, setEditing] = useState<Partial<Client> | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag state
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const fetchClients = async () => {
    setLoading(true);
    const { data } = await supabase.from('clients').select('*').order('sort_order');
    if (data) setClients(data as Client[]);
    setLoading(false);
  };

  useEffect(() => { fetchClients(); }, []);

  const uploadLogo = async (file: File): Promise<string | null> => {
    setUploading(true);
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
    const { error } = await supabase.storage.from('client-logos').upload(fileName, file);
    setUploading(false);
    if (error) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
      return null;
    }
    const { data: urlData } = supabase.storage.from('client-logos').getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    const url = await uploadLogo(file);
    if (url) setEditing({ ...editing, logo_url: url });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const saveClient = async () => {
    if (!editing?.name) return;
    if (editing.id) {
      const { error } = await supabase.from('clients').update({
        name: editing.name,
        logo_url: editing.logo_url || '',
        category: editing.category || 'Other',
        is_active: editing.is_active ?? true,
      }).eq('id', editing.id);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    } else {
      const { error } = await supabase.from('clients').insert({
        name: editing.name,
        logo_url: editing.logo_url || '',
        category: editing.category || 'Other',
        sort_order: clients.length + 1,
        is_active: true,
      });
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    }
    setEditing(null);
    fetchClients();
    toast({ title: 'Saved' });
  };

  const deleteClient = async (id: string) => {
    if (!confirm('Delete this client?')) return;
    await supabase.from('clients').delete().eq('id', id);
    fetchClients();
    toast({ title: 'Deleted' });
  };

  // --- Drag & Drop ---
  const handleDragStart = useCallback((id: string) => {
    setDragId(id);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (id !== dragId) setDragOverId(id);
  }, [dragId]);

  const handleDragLeave = useCallback(() => {
    setDragOverId(null);
  }, []);

  const handleDrop = useCallback(async (targetId: string) => {
    setDragOverId(null);
    if (!dragId || dragId === targetId) { setDragId(null); return; }

    const list = filterCategory === 'all' ? [...clients] : [...clients];
    const filtered = filterCategory === 'all' ? list : list.filter(c => c.category === filterCategory);

    const fromIndex = filtered.findIndex(c => c.id === dragId);
    const toIndex = filtered.findIndex(c => c.id === targetId);
    if (fromIndex === -1 || toIndex === -1) { setDragId(null); return; }

    // Reorder filtered list
    const [moved] = filtered.splice(fromIndex, 1);
    filtered.splice(toIndex, 0, moved);

    // Assign new sort_order values
    const updates = filtered.map((c, i) => ({ id: c.id, sort_order: i + 1 }));

    // Optimistic update
    setClients(prev => {
      const map = new Map(updates.map(u => [u.id, u.sort_order]));
      return prev.map(c => map.has(c.id) ? { ...c, sort_order: map.get(c.id)! } : c)
        .sort((a, b) => a.sort_order - b.sort_order);
    });

    setDragId(null);

    // Persist to DB
    const promises = updates.map(u =>
      supabase.from('clients').update({ sort_order: u.sort_order }).eq('id', u.id)
    );
    const results = await Promise.all(promises);
    const hasError = results.some(r => r.error);
    if (hasError) {
      toast({ title: 'Reorder failed', description: 'Could not save new order', variant: 'destructive' });
      fetchClients();
    } else {
      toast({ title: 'Order updated' });
    }
  }, [dragId, clients, filterCategory, toast]);

  const handleDragEnd = useCallback(() => {
    setDragId(null);
    setDragOverId(null);
  }, []);

  const filteredClients = filterCategory === 'all'
    ? clients
    : clients.filter((c) => c.category === filterCategory);

  const dataCategories = [...new Set(clients.map((c) => c.category).filter(Boolean))];
  const allCategories = [...new Set([...CATEGORIES, ...dataCategories])];

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Clients</h1>
            <p className="text-muted-foreground text-sm">Drag cards to reorder. Changes save automatically.</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {allCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={() => setEditing({ name: '', logo_url: '', category: 'Sugar' })}>
              <Plus className="w-4 h-4 mr-1" /> Add Client
            </Button>
          </div>
        </div>

        {editing && (
          <div className="bg-card rounded-xl border border-border p-4 mb-6 space-y-3">
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label>Client Name</Label>
                <Input value={editing.name || ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label>Category</Label>
                <Select value={editing.category || 'Other'} onValueChange={(v) => setEditing({ ...editing, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {allCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Logo</Label>
                <div className="flex gap-2">
                  <Input
                    value={editing.logo_url || ''}
                    onChange={(e) => setEditing({ ...editing, logo_url: e.target.value })}
                    placeholder="URL or upload →"
                    className="flex-1"
                  />
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  <Button type="button" size="icon" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
            {editing.logo_url && (
              <div className="w-20 h-14 bg-muted rounded-lg flex items-center justify-center p-1">
                <img src={editing.logo_url} alt="Preview" className="max-w-full max-h-full object-contain" />
              </div>
            )}
            <div className="flex gap-2">
              <Button size="sm" onClick={saveClient}><Save className="w-3 h-3 mr-1" /> Save</Button>
              <Button size="sm" variant="ghost" onClick={() => setEditing(null)}><X className="w-3 h-3" /></Button>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {loading ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">Loading...</div>
          ) : filteredClients.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">No clients found.</div>
          ) : (
            filteredClients.map((client) => (
              <div
                key={client.id}
                draggable
                onDragStart={() => handleDragStart(client.id)}
                onDragOver={(e) => handleDragOver(e, client.id)}
                onDragLeave={handleDragLeave}
                onDrop={() => handleDrop(client.id)}
                onDragEnd={handleDragEnd}
                className={`bg-card rounded-xl border p-4 group cursor-grab active:cursor-grabbing transition-all ${
                  dragId === client.id ? 'opacity-40 scale-95' : ''
                } ${dragOverId === client.id ? 'border-primary ring-2 ring-primary/20' : 'border-border'}`}
              >
                <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-3 flex items-center justify-center p-2 relative">
                  <GripVertical className="w-4 h-4 text-muted-foreground/50 absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {client.logo_url ? (
                    <img src={client.logo_url} alt={client.name} className="max-h-full max-w-full object-contain" />
                  ) : (
                    <span className="text-muted-foreground text-xs">No logo</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <span className="text-sm font-heading font-semibold truncate block">{client.name}</span>
                    <span className="text-xs text-muted-foreground">{client.category || 'Uncategorized'}</span>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setEditing(client)} className="p-1 hover:text-accent"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => deleteClient(client.id)} className="p-1 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminClients;
