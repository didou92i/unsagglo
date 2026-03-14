import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ArticleInput {
  titre: string;
  slug: string;
  contenu: string;
  categorie: string;
  auteur: string;
}

interface UseArticleFormReturn {
  submit: (data: ArticleInput) => Promise<boolean>;
  loading: boolean;
}

export function useArticleForm(): UseArticleFormReturn {
  const [loading, setLoading] = useState<boolean>(false);

  const submit = async (data: ArticleInput): Promise<boolean> => {
    setLoading(true);
    const { error } = await supabase.from("articles").insert([{
      titre: data.titre,
      slug: data.slug,
      contenu: data.contenu,
      categorie: data.categorie,
      auteur: data.auteur,
      publie: false,
    }]);
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return false;
    }
    toast.success("Article cree.");
    return true;
  };

  return { submit, loading };
}
