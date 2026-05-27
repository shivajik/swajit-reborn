import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  visible: boolean;
  is_custom: boolean;
  sort_order: number;
  parent_label?: string | null;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '/', visible: true, is_custom: false, sort_order: 0 },
  { id: 'about', label: 'About', href: '/about', visible: true, is_custom: false, sort_order: 1, parent_label: 'Corporate' },
  { id: 'management-team', label: 'Management Team', href: '/management-team', visible: true, is_custom: false, sort_order: 2, parent_label: 'Corporate' },
  { id: 'mission-vision', label: 'Mission And Vision', href: '/mission-vision', visible: true, is_custom: false, sort_order: 3, parent_label: 'Corporate' },
  { id: 'milestone', label: 'Milestone', href: '/milestone', visible: true, is_custom: false, sort_order: 4, parent_label: 'Corporate' },
  { id: 'products', label: 'Products', href: '/products', visible: true, is_custom: false, sort_order: 4 },
  { id: 'photo-gallery', label: 'Photo Gallery', href: '/photo-gallery', visible: true, is_custom: false, sort_order: 5 },
  { id: 'infrastructure', label: 'Infrastructure', href: '/infrastructure', visible: true, is_custom: false, sort_order: 6, parent_label: 'Resources' },
  { id: 'iso-certification', label: 'ISO Certification', href: '/iso-certification', visible: true, is_custom: false, sort_order: 7, parent_label: 'Resources' },
  { id: 'quality-policy', label: 'Quality Policy', href: '/quality-policy', visible: true, is_custom: false, sort_order: 8, parent_label: 'Resources' },
  { id: 'safety-policy', label: 'Safety Policy', href: '/safety-policy', visible: true, is_custom: false, sort_order: 9, parent_label: 'Resources' },
  { id: 'overseas-market', label: 'Overseas Market', href: '/overseas-market', visible: true, is_custom: false, sort_order: 10, parent_label: 'Resources' },
  { id: 'download', label: 'Download', href: '/download', visible: true, is_custom: false, sort_order: 11, parent_label: 'Resources' },
  { id: 'application-videos', label: 'Application Videos', href: '/application-videos', visible: true, is_custom: false, sort_order: 12, parent_label: 'Resources' },
  { id: 'csr', label: 'CSR', href: '/csr', visible: true, is_custom: false, sort_order: 13 },
  { id: 'clients', label: 'Clients', href: '/clients', visible: true, is_custom: false, sort_order: 14 },
  { id: 'contact', label: 'Contact Us', href: '/contact', visible: true, is_custom: false, sort_order: 15 },
];

let cachedNavItems: NavItem[] | null = null;

const defaultByKey = new Map(
  DEFAULT_NAV_ITEMS.flatMap((item) => [
    [item.id, item],
    [item.href, item],
  ]),
);

export function normalizeNavItems(items: NavItem[]) {
  return items
    .map((item, index) => {
      const defaultItem = defaultByKey.get(item.id) || defaultByKey.get(item.href);

      return {
        ...defaultItem,
        ...item,
        parent_label: item.parent_label ?? defaultItem?.parent_label ?? null,
        sort_order: typeof item.sort_order === 'number' ? item.sort_order : index,
      } as NavItem;
    })
    .sort((a, b) => a.sort_order - b.sort_order);
}

export function useNavItems() {
  const [navItems, setNavItems] = useState<NavItem[]>(cachedNavItems || DEFAULT_NAV_ITEMS);
  const [loading, setLoading] = useState(!cachedNavItems);

  useEffect(() => {
    let isMounted = true;

    const fetchNavItems = async () => {
      const { data } = await supabase
        .from('site_settings')
        .select('setting_value')
        .eq('setting_key', 'nav_items')
        .maybeSingle();

      if (!isMounted) {
        return;
      }

      if (data?.setting_value) {
        try {
          const parsed: NavItem[] = JSON.parse(data.setting_value);
          if (Array.isArray(parsed) && parsed.length > 0) {
            cachedNavItems = normalizeNavItems(parsed);
            setNavItems(cachedNavItems);
          } else {
            cachedNavItems = DEFAULT_NAV_ITEMS;
            setNavItems(DEFAULT_NAV_ITEMS);
          }
        } catch {
          cachedNavItems = DEFAULT_NAV_ITEMS;
          setNavItems(DEFAULT_NAV_ITEMS);
        }
      } else {
        cachedNavItems = DEFAULT_NAV_ITEMS;
        setNavItems(DEFAULT_NAV_ITEMS);
      }

      setLoading(false);
    };

    if (!cachedNavItems) {
      fetchNavItems();
    }

    const channel = supabase
      .channel(`site-settings-nav-items-${Math.random().toString(36).slice(2)}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'site_settings' },
        (payload) => {
          const changedKey = (payload.new as { setting_key?: string } | null)?.setting_key
            ?? (payload.old as { setting_key?: string } | null)?.setting_key;

          if (changedKey === 'nav_items') {
            clearNavCache();
            fetchNavItems();
          }
        },
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return { navItems, loading };
}

export function clearNavCache() {
  cachedNavItems = null;
}

export { DEFAULT_NAV_ITEMS };
