import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/PageLayout";
import PageBanner from "@/components/PageBanner";
import { Calendar, ArrowLeft } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  cover_image_url: string;
  published_at: string | null;
}

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("news")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle()
      .then(({ data }) => {
        setArticle(data as NewsArticle | null);
        setLoading(false);
      });
  }, [slug]);

  return (
    <PageLayout>
      <PageBanner
        title={article?.title || (loading ? "Loading..." : "News")}
        subtitle=""
        breadcrumb="News"
      />
      <article className="section-padding bg-background">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          {loading && <p className="text-muted-foreground">Loading article...</p>}

          {!loading && !article && (
            <div className="text-center py-16">
              <h2 className="text-2xl font-heading font-bold mb-3">Article not found</h2>
              <p className="text-muted-foreground">This news item may have been removed or unpublished.</p>
            </div>
          )}

          {article && (
            <>
              {article.published_at && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.published_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              )}

              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                {article.title}
              </h1>

              {article.summary && (
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {article.summary}
                </p>
              )}

              {article.cover_image_url && (
                <img
                  src={article.cover_image_url}
                  alt={article.title}
                  className="w-full rounded-lg mb-8 border border-border"
                />
              )}

              <div
                className="prose prose-lg max-w-none text-foreground prose-headings:font-heading prose-headings:text-foreground prose-a:text-accent prose-strong:text-foreground"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </>
          )}
        </div>
      </article>
    </PageLayout>
  );
};

export default NewsDetail;
