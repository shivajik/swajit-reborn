import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminGuard from '@/components/admin/AdminGuard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Trash2, Save, X, GripVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon_name: string;
  sort_order: number;
}

interface Product {
  id: string;
  name: string;
  image_url: string;
  category_id: string;
  sort_order: number;
}

const AdminProducts = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const [catRes, prodRes] = await Promise.all([
      supabase.from('categories').select('*').order('sort_order'),
      supabase.from('products').select('*').order('sort_order'),
    ]);
    if (catRes.data) setCategories(catRes.data);
    if (prodRes.data) setProducts(prodRes.data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category_id === selectedCategory)
    : products;

  // Category CRUD
  const saveCategory = async () => {
    if (!editingCategory?.name) return;
    const slug = editingCategory.slug || editingCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    if (editingCategory.id) {
      const { error } = await supabase.from('categories').update({
        name: editingCategory.name,
        slug,
        description: editingCategory.description || '',
        icon_name: editingCategory.icon_name || '',
      }).eq('id', editingCategory.id);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    } else {
      const { error } = await supabase.from('categories').insert({
        name: editingCategory.name,
        slug,
        description: editingCategory.description || '',
        icon_name: editingCategory.icon_name || '',
        sort_order: categories.length,
      });
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    }
    
    setEditingCategory(null);
    fetchData();
    toast({ title: 'Saved', description: 'Category saved successfully.' });
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('Delete this category and all its products?')) return;
    await supabase.from('products').delete().eq('category_id', id);
    await supabase.from('categories').delete().eq('id', id);
    fetchData();
    toast({ title: 'Deleted', description: 'Category deleted.' });
  };

  // Product CRUD
  const saveProduct = async () => {
    if (!editingProduct?.name || !editingProduct?.category_id) return;
    
    if (editingProduct.id) {
      const { error } = await supabase.from('products').update({
        name: editingProduct.name,
        image_url: editingProduct.image_url || '',
        category_id: editingProduct.category_id,
      }).eq('id', editingProduct.id);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    } else {
      const { error } = await supabase.from('products').insert({
        name: editingProduct.name,
        image_url: editingProduct.image_url || '',
        category_id: editingProduct.category_id,
        sort_order: filteredProducts.length,
      });
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    }
    
    setEditingProduct(null);
    fetchData();
    toast({ title: 'Saved', description: 'Product saved successfully.' });
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await supabase.from('products').delete().eq('id', id);
    fetchData();
    toast({ title: 'Deleted', description: 'Product deleted.' });
  };

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Products & Categories</h1>
            <p className="text-muted-foreground text-sm">Manage your product catalog</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Categories Panel */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-bold text-foreground">Categories</h2>
              <Button size="sm" onClick={() => setEditingCategory({ name: '', slug: '', description: '', icon_name: '' })}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>

            {editingCategory && (
              <div className="bg-muted/50 rounded-lg p-3 mb-3 space-y-2">
                <Input
                  placeholder="Category name"
                  value={editingCategory.name || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                />
                <Input
                  placeholder="Slug (auto-generated)"
                  value={editingCategory.slug || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                />
                <Input
                  placeholder="Description"
                  value={editingCategory.description || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={saveCategory}><Save className="w-3 h-3 mr-1" /> Save</Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditingCategory(null)}><X className="w-3 h-3" /></Button>
                </div>
              </div>
            )}

            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  !selectedCategory ? 'bg-accent text-accent-foreground font-bold' : 'hover:bg-muted'
                }`}
              >
                All Products ({products.length})
              </button>
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center group">
                  <button
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex-1 text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat.id ? 'bg-accent text-accent-foreground font-bold' : 'hover:bg-muted'
                    }`}
                  >
                    {cat.name} ({products.filter((p) => p.category_id === cat.id).length})
                  </button>
                  <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                    <button onClick={() => setEditingCategory(cat)} className="p-1 hover:text-accent">
                      <Pencil className="w-3 h-3" />
                    </button>
                    <button onClick={() => deleteCategory(cat.id)} className="p-1 hover:text-red-500">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Products Panel */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-bold text-foreground">
                Products {selectedCategory && `- ${categories.find((c) => c.id === selectedCategory)?.name}`}
              </h2>
              <Button
                size="sm"
                onClick={() =>
                  setEditingProduct({
                    name: '',
                    image_url: '',
                    category_id: selectedCategory || (categories[0]?.id ?? ''),
                  })
                }
                disabled={categories.length === 0}
              >
                <Plus className="w-4 h-4 mr-1" /> Add Product
              </Button>
            </div>

            {editingProduct && (
              <div className="bg-muted/50 rounded-lg p-4 mb-4 space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>Product Name</Label>
                    <Input
                      value={editingProduct.name || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Category</Label>
                    <select
                      className="w-full h-10 rounded-md border border-border bg-background px-3 text-sm"
                      value={editingProduct.category_id || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category_id: e.target.value })}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Image URL</Label>
                  <Input
                    value={editingProduct.image_url || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                    placeholder="https://... or /path/to/image.jpg"
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={saveProduct}><Save className="w-3 h-3 mr-1" /> Save</Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditingProduct(null)}><X className="w-3 h-3" /></Button>
                </div>
              </div>
            )}

            {loading ? (
              <div className="text-center py-12 text-muted-foreground">Loading...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No products found. Add your first product above.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="border border-border rounded-lg overflow-hidden group">
                    <div className="aspect-square bg-muted flex items-center justify-center p-2">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="max-h-full max-w-full object-contain" />
                      ) : (
                        <span className="text-muted-foreground text-xs">No image</span>
                      )}
                    </div>
                    <div className="p-3 border-t border-border flex items-center justify-between">
                      <span className="text-sm font-heading font-semibold text-foreground truncate">{product.name}</span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setEditingProduct(product)} className="p-1 hover:text-accent">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => deleteProduct(product.id)} className="p-1 hover:text-red-500">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminProducts;
