import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminGuard from '@/components/admin/AdminGuard';
import { Package, Image, Users, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StatCard {
  label: string;
  count: number;
  icon: React.ElementType;
  href: string;
  color: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<StatCard[]>([
    { label: 'Products', count: 0, icon: Package, href: '/admin/products', color: 'bg-blue-500' },
    { label: 'Hero Slides', count: 0, icon: Image, href: '/admin/hero-slides', color: 'bg-emerald-500' },
    { label: 'Clients', count: 0, icon: Users, href: '/admin/clients', color: 'bg-amber-500' },
    { label: 'Page Content', count: 0, icon: FileText, href: '/admin/content', color: 'bg-purple-500' },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      const [products, slides, clients, content] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('hero_slides').select('id', { count: 'exact', head: true }),
        supabase.from('clients').select('id', { count: 'exact', head: true }),
        supabase.from('page_content').select('id', { count: 'exact', head: true }),
      ]);

      setStats((prev) =>
        prev.map((s, i) => ({
          ...s,
          count: [products, slides, clients, content][i].count ?? 0,
        }))
      );
    };
    fetchStats();
  }, []);

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="mb-6">
          <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Overview of your website content</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              to={stat.href}
              className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-3xl font-heading font-bold text-foreground">{stat.count}</span>
              </div>
              <p className="text-sm text-muted-foreground font-heading group-hover:text-accent transition-colors">
                {stat.label}
              </p>
            </Link>
          ))}
        </div>
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminDashboard;
