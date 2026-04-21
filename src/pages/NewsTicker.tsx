import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Megaphone } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
}

const NewsTicker = () => {
  const [items, setItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    supabase
      .from("news")
      .select("id, title, slug")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(20)
      .then(({ data }) => {
        if (data) setItems(data as NewsItem[]);
      });
  }, []);

  if (items.length === 0) return null;

  // duplicate for seamless marquee
  const loop = [...items, ...items, ...items];

  return (
    <section className="bg-primary text-primary-foreground border-y border-accent/30 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-stretch">
        <div className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 font-heading font-bold uppercase text-xs tracking-wider shrink-0">
          <Megaphone className="w-4 h-4" />
          Latest News
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap py-2">
            {loop.map((item, i) => (
              <Link
                key={`${item.id}-${i}`}
                to={`/news/${item.slug}`}
                className="px-6 text-sm font-medium hover:text-accent transition-colors border-r border-primary-foreground/20"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsTicker;
