import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface DBCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon_name: string;
  sort_order: number;
}

export interface DBProduct {
  id: string;
  name: string;
  image_url: string;
  category_id: string;
  sort_order: number;
}

export interface DBHeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  cta_text: string;
  cta_link: string;
  sort_order: number;
  is_active: boolean;
}

export interface DBClient {
  id: string;
  name: string;
  logo_url: string;
  category: string;
  sort_order: number;
  is_active: boolean;
}

export interface DBPageContent {
  id: string;
  page_key: string;
  section_key: string;
  title: string;
  content: string;
  image_url: string;
  metadata: Record<string, any>;
}

export function useCategories() {
  const [categories, setCategories] = useState<DBCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('categories')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        if (data && data.length > 0) setCategories(data);
        setLoading(false);
      });
  }, []);

  return { categories, loading };
}

export function useProductsByCategory(categorySlug: string) {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [category, setCategory] = useState<DBCategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      // Get category by slug
      const { data: catData } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', categorySlug)
        .maybeSingle();

      if (catData) {
        setCategory(catData);
        const { data: prodData } = await supabase
          .from('products')
          .select('*')
          .eq('category_id', catData.id)
          .order('sort_order');
        if (prodData) setProducts(prodData);
      }
      setLoading(false);
    };
    fetch();
  }, [categorySlug]);

  return { products, category, loading };
}

export function useHeroSlides() {
  const [slides, setSlides] = useState<DBHeroSlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('hero_slides')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')
      .then(({ data }) => {
        if (data && data.length > 0) setSlides(data);
        setLoading(false);
      });
  }, []);

  return { slides, loading };
}

export function useClients() {
  const [clients, setClients] = useState<DBClient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('clients')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')
      .then(({ data }) => {
        if (data && data.length > 0) setClients(data as DBClient[]);
        setLoading(false);
      });
  }, []);

  return { clients, loading };
}

export function usePageContent(pageKey: string) {
  const [sections, setSections] = useState<DBPageContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('page_content')
      .select('*')
      .eq('page_key', pageKey)
      .order('section_key')
      .then(({ data }) => {
        if (data && data.length > 0) setSections(data);
        setLoading(false);
      });
  }, [pageKey]);

  return { sections, loading };
}
