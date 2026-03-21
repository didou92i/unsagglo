import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UseVeilleReturn {
  triggerVeille: () => Promise<void>;
  loading: boolean;
}

export function useVeille(): UseVeilleReturn {
  const [loading, setLoading] = useState<boolean>(false);

  const triggerVeille = async (): Promise<void> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("veille-generator");
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast.success(`Veille terminee : ${data?.articles_created ?? 0} article(s) genere(s).`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur inconnue";
      toast.error(`Erreur veille : ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return { triggerVeille, loading };
}
