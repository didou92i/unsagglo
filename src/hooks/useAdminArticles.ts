import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ArticleRow {
  id: string;
  titre: string;
  categorie: string;
  auteur: string;
  publie: boolean;
  created_at: string;
}

interface UseAdminArticlesReturn {
  articles: ArticleRow[];
  loading: boolean;
  refresh: () => Promise<void>;
  togglePublie: (id: string, current: boolean) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
}

export function useAdminArticles(): UseAdminArticlesReturn {
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const refresh = async (): Promise<void> => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setArticles(data as ArticleRow[]);
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const togglePublie = async (id: string, current: boolean): Promise<void> => {
    const { error } = await supabase.from("articles").update({ publie: !current }).eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(`Article ${!current ? "publie" : "masque"}.`);
      refresh();
    }
  };

  const deleteArticle = async (id: string): Promise<void> => {
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Succes", description: "Article supprime." });
      refresh();
    }
  };

  return { articles, loading, refresh, togglePublie, deleteArticle };
}
