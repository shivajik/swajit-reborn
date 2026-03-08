import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminGuard from '@/components/admin/AdminGuard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Client {
  id: string;
  name: string;
  logo_url: string;
  sort_order: number;
  is_active: boolean;
}

const AdminClients = () => {
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([]);
  const [editing, setEditing] = useState<Partial<Client> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    setLoading(true);
    const { data } = await supabase.from('clients').select('*').order('sort_order');
    if (data) setClients(data);
    setLoading(false);
  };

  useEffect(() => { fetchClients(); }, []);

  const saveClient = async () => {
    if (!editing?.name) return;
    if (editing.id) {
      const { error } = await supabase.from('clients').update({
        name: editing.name,
        logo_url: editing.logo_url || '',
        is_active: editing.is_active ?? true,
      }).eq('id', editing.id);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    } else {
      const { error } = await supabase.from('clients').insert({
        name: editing.name,
        logo_url: editing.logo_url || '',
        sort_order: clients.length,
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

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Clients</h1>
            <p className="text-muted-foreground text-sm">Manage client logos displayed on the website</p>
          </div>
          <Button onClick={() => setEditing({ name: '', logo_url: '' })}>
            <Plus className="w-4 h-4 mr-1" /> Add Client
          </Button>
        </div>

        {editing && (
          <div className="bg-card rounded-xl border border-border p-4 mb-6 space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Client Name</Label>
                <Input value={editing.name || ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label>Logo URL</Label>
                <Input value={editing.logo_url || ''} onChange={(e) => setEditing({ ...editing, logo_url: e.target.value })} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={saveClient}><Save className="w-3 h-3 mr-1" /> Save</Button>
              <Button size="sm" variant="ghost" onClick={() => setEditing(null)}><X className="w-3 h-3" /></Button>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {loading ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">Loading...</div>
          ) : clients.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">No clients yet.</div>
          ) : (
            clients.map((client) => (
              <div key={client.id} className="bg-card rounded-xl border border-border p-4 group">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-3 flex items-center justify-center p-2">
                  {client.logo_url ? (
                    <img src={client.logo_url} alt={client.name} className="max-h-full max-w-full object-contain" />
                  ) : (
                    <span className="text-muted-foreground text-xs">No logo</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-heading font-semibold truncate">{client.name}</span>
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
