import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { CategorieArticle } from "@/types";

interface ArticleRow {
  id: string;
  slug: string;
  titre: string;
  contenu: string;
  categorie: string;
  auteur: string;
  publie: boolean;
  created_at: string;
}

interface UseArticlesReturn {
  articles: ArticleRow[];
  loading: boolean;
  error: string | null;
}

export function useArticles(categorie?: CategorieArticle): UseArticlesReturn {
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async (): Promise<void> => {
      setLoading(true);
      let query = supabase
        .from("articles")
        .select("*")
        .eq("publie", true)
        .order("created_at", { ascending: false });

      if (categorie) {
        query = query.eq("categorie", categorie);
      }

      const { data, error: err } = await query;
      if (err) {
        setError(err.message);
      } else {
        setArticles((data as ArticleRow[]) ?? []);
      }
      setLoading(false);
    };

    fetchArticles();
  }, [categorie]);

  return { articles, loading, error };
}
