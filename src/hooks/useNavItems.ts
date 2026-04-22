import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type NavGroupKey = 'corporate' | 'resources';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  visible: boolean;
  is_custom: boolean;
  sort_order: number;
  group?: NavGroupKey | null;
}

export const NAV_GROUP_LABELS: Record<NavGroupKey, string> = {
  corporate: 'Corporate',
  resources: 'Resources',
};

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '/', visible: true, is_custom: false, sort_order: 0, group: null },
  { id: 'about', label: 'About Us', href: '/about', visible: true, is_custom: false, sort_order: 1, group: 'corporate' },
  { id: 'mission-vision', label: 'Mission And Vision', href: '/mission-vision', visible: true, is_custom: false, sort_order: 2, group: 'corporate' },
  { id: 'milestone', label: 'Milestone', href: '/milestone', visible: true, is_custom: false, sort_order: 3, group: 'corporate' },
  { id: 'products', label: 'Products', href: '/products', visible: true, is_custom: false, sort_order: 4, group: null },
  { id: 'infrastructure', label: 'Infrastructure', href: '/infrastructure', visible: true, is_custom: false, sort_order: 5, group: 'resources' },
  { id: 'iso-certification', label: 'ISO Certification', href: '/iso-certification', visible: true, is_custom: false, sort_order: 6, group: 'resources' },
  { id: 'quality-policy', label: 'Quality Policy', href: '/quality-policy', visible: true, is_custom: false, sort_order: 7, group: 'resources' },
  { id: 'safety-policy', label: 'Safety Policy', href: '/safety-policy', visible: true, is_custom: false, sort_order: 8, group: 'resources' },
  { id: 'overseas-market', label: 'Overseas Market', href: '/overseas-market', visible: true, is_custom: false, sort_order: 9, group: 'resources' },
  { id: 'download', label: 'Download', href: '/download', visible: true, is_custom: false, sort_order: 10, group: 'resources' },
  { id: 'application-videos', label: 'Application Videos', href: '/application-videos', visible: true, is_custom: false, sort_order: 11, group: 'resources' },
  { id: 'photo-gallery', label: 'Photo Gallery', href: '/photo-gallery', visible: true, is_custom: false, sort_order: 12, group: null },
  { id: 'careers', label: 'Careers', href: '/careers', visible: true, is_custom: false, sort_order: 13, group: null },
  { id: 'csr', label: 'CSR', href: '/csr', visible: true, is_custom: false, sort_order: 14, group: null },
  { id: 'clients', label: 'Clients', href: '/clients', visible: true, is_custom: false, sort_order: 15, group: null },
  { id: 'contact', label: 'Contact', href: '/contact', visible: true, is_custom: false, sort_order: 16, group: null },
];

let cachedNavItems: NavItem[] | null = null;

const normalizeNavItem = (item: Partial<NavItem>, fallback?: NavItem): NavItem => ({
  id: item.id || fallback?.id || item.href || crypto.randomUUID(),
  label: item.label || fallback?.label || 'Untitled',
  href: item.href || fallback?.href || '/',
  visible: item.visible ?? fallback?.visible ?? true,
  is_custom: item.is_custom ?? fallback?.is_custom ?? false,
  sort_order: item.sort_order ?? fallback?.sort_order ?? 0,
  group: (item.group ?? fallback?.group ?? null) as NavGroupKey | null,
});

export const mergeWithDefaultNavItems = (items: Partial<NavItem>[] = []): NavItem[] => {
  const existingByHref = new Map(items.filter((item) => item.href).map((item) => [item.href as string, item]));

  const mergedDefaults = DEFAULT_NAV_ITEMS.map((defaultItem) =>
    normalizeNavItem(existingByHref.get(defaultItem.href) || {}, defaultItem)
  );

  const customItems = items
    .filter((item) => item.href && !DEFAULT_NAV_ITEMS.some((defaultItem) => defaultItem.href === item.href))
    .map((item) => normalizeNavItem(item));

  return [...mergedDefaults, ...customItems]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((item, index) => ({ ...item, sort_order: index }));
};

export const parseNavItems = (value?: string | null): NavItem[] => {
  if (!value) return DEFAULT_NAV_ITEMS;

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return mergeWithDefaultNavItems(parsed);
    }
  } catch {
    // keep defaults
  }

  return DEFAULT_NAV_ITEMS;
};

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
        cachedNavItems = parseNavItems(data?.setting_value);
        setNavItems(cachedNavItems);
        setLoading(false);
      });
  }, []);

  return { navItems, loading };
}

export function clearNavCache() {
  cachedNavItems = null;
}

export { DEFAULT_NAV_ITEMS };
