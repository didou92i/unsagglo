import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface RightsContentState {
  content: string;
  sources: string[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useRightsContent(
  categorie: string | undefined,
  titre: string,
): RightsContentState {
  const [content, setContent] = useState("");
  const [sources, setSources] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async () => {
    if (!categorie) return;
    setLoading(true);
    setError(null);

    const { data, error: fnErr } = await supabase.functions.invoke(
      "rights-generator",
      { body: { categorie, titre } },
    );

    if (fnErr) {
      setError("Impossible de generer le contenu.");
      setLoading(false);
      return;
    }
    setContent(data.contenu ?? "");
    setSources(data.sources ?? []);
    setLoading(false);
  }, [categorie, titre]);

  const load = useCallback(async () => {
    if (!categorie) return;
    setLoading(true);
    setError(null);

    const { data } = await supabase
      .from("rights_content" as never)
      .select("contenu, sources")
      .eq("categorie", categorie)
      .maybeSingle();

    const row = data as { contenu: string; sources: string[] } | null;

    if (row?.contenu) {
      setContent(row.contenu);
      setSources(row.sources ?? []);
      setLoading(false);
      return;
    }

    await generate();
  }, [categorie, generate]);

  useEffect(() => {
    load();
  }, [load]);

  return { content, sources, loading, error, refresh: generate };
}
