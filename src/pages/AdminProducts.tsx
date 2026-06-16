import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminGuard from '@/components/admin/AdminGuard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Trash2, Save, X, ArrowUp, ArrowDown, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/admin/ImageUpload';

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
  description?: string;
  is_visible?: boolean;
}

const AdminProducts = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    const [catRes, prodRes] = await Promise.all([
      supabase.from('categories').select('*').order('sort_order'),
      supabase.from('products').select('*').order('sort_order'),
    ]);
    if (catRes.data) setCategories(catRes.data);
    if (prodRes.data) setProducts(prodRes.data);
    if (showLoading) setLoading(false);
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
      const { data, error } = await supabase.from('categories').update({
        name: editingCategory.name,
        slug,
        description: editingCategory.description || '',
        icon_name: editingCategory.icon_name || '',
      }).eq('id', editingCategory.id).select().single();
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
      if (data) setCategories(prev => prev.map(c => c.id === data.id ? data : c));
    } else {
      const { data, error } = await supabase.from('categories').insert({
        name: editingCategory.name,
        slug,
        description: editingCategory.description || '',
        icon_name: editingCategory.icon_name || '',
        sort_order: categories.length,
      }).select().single();
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
      if (data) setCategories(prev => [...prev, data]);
    }

    setEditingCategory(null);
    toast({ title: 'Saved', description: 'Category saved successfully.' });
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('Delete this category and all its products?')) return;
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    setCategories(prev => prev.filter(c => c.id !== id));
    setProducts(prev => prev.filter(p => p.category_id !== id));
    toast({ title: 'Deleted', description: 'Category deleted.' });
  };

  // Product CRUD
  const saveProduct = async () => {
    if (!editingProduct?.name || !editingProduct?.category_id) return;

    if (editingProduct.id) {
      const { data, error } = await supabase.from('products').update({
        name: editingProduct.name,
        image_url: editingProduct.image_url || '',
        category_id: editingProduct.category_id,
        description: editingProduct.description || '',
        sort_order: Number.isFinite(editingProduct.sort_order as number)
          ? (editingProduct.sort_order as number)
          : 0,
      }).eq('id', editingProduct.id).select().single();
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
      if (!data) {
        toast({ title: 'Update blocked', description: 'No row updated. Check RLS policies — run docs/storage-and-rls-setup.sql.', variant: 'destructive' });
        return;
      }
      setProducts(prev => prev.map(p => p.id === data.id ? data : p));
    } else {
      const { data, error } = await supabase.from('products').insert({
        name: editingProduct.name,
        image_url: editingProduct.image_url || '',
        category_id: editingProduct.category_id,
        description: editingProduct.description || '',
        is_visible: true,
        sort_order: Number.isFinite(editingProduct.sort_order as number)
          ? (editingProduct.sort_order as number)
          : filteredProducts.length,
      }).select().single();
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
      if (data) setProducts(prev => [...prev, data]);
    }

    setEditingProduct(null);
    toast({ title: 'Saved', description: 'Product saved successfully.' });
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    setProducts(prev => prev.filter(p => p.id !== id));
    toast({ title: 'Deleted', description: 'Product deleted.' });
  };

  const toggleVisibility = async (product: Product) => {
    const next = !(product.is_visible ?? true);
    const { data, error } = await supabase
      .from('products')
      .update({ is_visible: next })
      .eq('id', product.id)
      .select()
      .single();
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    if (data) setProducts(prev => prev.map(p => p.id === data.id ? data : p));
  };

  const moveProduct = async (product: Product, direction: -1 | 1) => {
    const siblings = products
      .filter(p => p.category_id === product.category_id)
      .sort((a, b) => a.sort_order - b.sort_order);
    const idx = siblings.findIndex(p => p.id === product.id);
    const swapIdx = idx + direction;
    if (swapIdx < 0 || swapIdx >= siblings.length) return;
    const other = siblings[swapIdx];
    const a = product.sort_order;
    const b = other.sort_order;
    // If sort_orders are equal, force a delta
    const newA = a === b ? b + direction : b;
    const newB = a === b ? a : a;
    const [r1, r2] = await Promise.all([
      supabase.from('products').update({ sort_order: newA }).eq('id', product.id).select().single(),
      supabase.from('products').update({ sort_order: newB }).eq('id', other.id).select().single(),
    ]);
    if (r1.error || r2.error) {
      toast({ title: 'Error', description: (r1.error || r2.error)?.message || 'Reorder failed', variant: 'destructive' });
      return;
    }
    setProducts(prev => prev.map(p => {
      if (p.id === product.id) return { ...p, sort_order: newA };
      if (p.id === other.id) return { ...p, sort_order: newB };
      return p;
    }));
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
                <div className="space-y-1 max-w-[200px]">
                  <Label>Order Number</Label>
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={
                      editingProduct.sort_order === undefined || editingProduct.sort_order === null
                        ? ''
                        : String(editingProduct.sort_order)
                    }
                    onChange={(e) => {
                      const v = e.target.value;
                      setEditingProduct({
                        ...editingProduct,
                        sort_order: v === '' ? undefined : Number(v),
                      });
                    }}
                    placeholder="e.g. 1, 2, 3..."
                  />
                  <p className="text-xs text-muted-foreground">Lower numbers appear first on the website.</p>
                </div>
                <div className="space-y-1">
                  <Label>Product Image</Label>
                  <ImageUpload
                    value={editingProduct.image_url || ''}
                    onChange={(url) => setEditingProduct({ ...editingProduct, image_url: url })}
                    bucket="products"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Description</Label>
                  <Textarea
                    rows={5}
                    placeholder="Product description shown in the popup on the website"
                    value={editingProduct.description || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
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
                {[...filteredProducts].sort((a, b) => a.sort_order - b.sort_order).map((product, idx, arr) => (
                  <div
                    key={product.id}
                    className={`border border-border rounded-lg overflow-hidden group ${
                      product.is_visible === false ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="aspect-square bg-muted flex items-center justify-center p-2">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="max-h-full max-w-full object-contain" />
                      ) : (
                        <span className="text-muted-foreground text-xs">No image</span>
                      )}
                    </div>
                    <div className="p-2 border-t border-border space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground tabular-nums">#{idx + 1}</span>
                        <span className="text-sm font-heading font-semibold text-foreground truncate flex-1">{product.name}</span>
                      </div>
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex gap-1">
                          <button
                            onClick={() => moveProduct(product, -1)}
                            disabled={idx === 0}
                            title="Move up"
                            className="p-1 rounded hover:bg-muted disabled:opacity-30"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => moveProduct(product, 1)}
                            disabled={idx === arr.length - 1}
                            title="Move down"
                            className="p-1 rounded hover:bg-muted disabled:opacity-30"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => toggleVisibility(product)}
                            title={product.is_visible === false ? 'Show on website' : 'Hide from website'}
                            className="p-1 rounded hover:bg-muted"
                          >
                            {product.is_visible === false
                              ? <EyeOff className="w-3.5 h-3.5 text-red-500" />
                              : <Eye className="w-3.5 h-3.5 text-green-600" />}
                          </button>
                        </div>
                        <div className="flex gap-1">
                          <button onClick={() => setEditingProduct(product)} className="p-1 hover:text-accent" title="Edit">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => deleteProduct(product.id)} className="p-1 hover:text-red-500" title="Delete">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
