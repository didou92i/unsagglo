import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SondageOption {
  id: string;
  label: string;
  votes: number;
}

interface Sondage {
  id: string;
  question: string;
  theme: string;
  options: SondageOption[];
}

interface UseSondagesReturn {
  sondages: Sondage[];
  loading: boolean;
  refresh: () => Promise<void>;
}

export function useSondages(): UseSondagesReturn {
  const [sondages, setSondages] = useState<Sondage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetch = async (): Promise<void> => {
    const { data: sondageRows } = await supabase
      .from("sondages")
      .select("id, question, theme")
      .eq("actif", true);

    if (!sondageRows?.length) {
      setSondages([]);
      setLoading(false);
      return;
    }

    const ids = sondageRows.map((s) => s.id);
    const { data: optionRows } = await supabase
      .from("sondage_options")
      .select("id, sondage_id, label, votes")
      .in("sondage_id", ids);

    const mapped: Sondage[] = sondageRows.map((s) => ({
      id: s.id,
      question: s.question,
      theme: s.theme,
      options: (optionRows ?? [])
        .filter((o) => o.sondage_id === s.id)
        .map((o) => ({ id: o.id, label: o.label, votes: o.votes })),
    }));

    setSondages(mapped);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  return { sondages, loading, refresh: fetch };
}
