import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  visible: boolean;
  is_custom: boolean;
  sort_order: number;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '/', visible: true, is_custom: false, sort_order: 0 },
  { id: 'about', label: 'About', href: '/about', visible: true, is_custom: false, sort_order: 1 },
  { id: 'infrastructure', label: 'Infrastructure', href: '/infrastructure', visible: true, is_custom: false, sort_order: 2 },
  { id: 'products', label: 'Products', href: '/products', visible: true, is_custom: false, sort_order: 3 },
  { id: 'clients', label: 'Clients', href: '/clients', visible: true, is_custom: false, sort_order: 4 },
  { id: 'contact', label: 'Contact', href: '/contact', visible: true, is_custom: false, sort_order: 5 },
];

let cachedNavItems: NavItem[] | null = null;

export function useNavItems() {
  const [navItems, setNavItems] = useState<NavItem[]>(cachedNavItems || DEFAULT_NAV_ITEMS);
  const [loading, setLoading] = useState(!cachedNavItems);

  useEffect(() => {
    if (cachedNavItems) return;

    supabase
      .from('site_settings')
      .select('setting_value')
      .eq('setting_key', 'nav_items')
      .maybeSingle()
      .then(({ data }) => {
        if (data?.setting_value) {
          try {
            const parsed: NavItem[] = JSON.parse(data.setting_value);
            if (Array.isArray(parsed) && parsed.length > 0) {
              cachedNavItems = parsed.sort((a, b) => a.sort_order - b.sort_order);
              setNavItems(cachedNavItems);
            }
          } catch {
            // keep defaults
          }
        }
        setLoading(false);
      });
  }, []);

  return { navItems, loading };
}

export function clearNavCache() {
  cachedNavItems = null;
}

export { DEFAULT_NAV_ITEMS };
