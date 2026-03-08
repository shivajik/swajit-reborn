import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import PageLayout from '@/components/PageLayout';
import PageBanner from '@/components/PageBanner';

interface PageData {
  title: string;
  content: string;
  image_url: string;
}

const CustomPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from('page_content')
      .select('*')
      .eq('page_key', `custom_${slug}`)
      .eq('section_key', 'main')
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setPage({ title: data.title, content: data.content, image_url: data.image_url });
        }
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <PageLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </PageLayout>
    );
  }

  if (!page) {
    return (
      <PageLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Page Not Found</h1>
            <p className="text-muted-foreground">This page does not exist.</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageBanner title={page.title} subtitle="" breadcrumb={page.title} />
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          {page.image_url && (
            <img
              src={page.image_url}
              alt={page.title}
              className="w-full max-h-96 object-cover rounded-xl mb-8"
            />
          )}
          <div className="prose prose-lg max-w-none text-foreground/80 whitespace-pre-line">
            {page.content}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CustomPage;
