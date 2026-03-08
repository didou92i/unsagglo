import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UseVoteReturn {
  vote: (sondageId: string, optionId: string) => Promise<boolean>;
  hasVoted: (sondageId: string) => boolean;
  loading: boolean;
}

function getFingerprint(sondageId: string): string {
  const key = `vote_${sondageId}`;
  const existing = localStorage.getItem(key);
  if (existing) return existing;
  const fp = crypto.randomUUID();
  localStorage.setItem(key, fp);
  return fp;
}

export function useVote(): UseVoteReturn {
  const [loading, setLoading] = useState<boolean>(false);

  const hasVoted = useCallback((sondageId: string): boolean => {
    return localStorage.getItem(`vote_${sondageId}`) !== null;
  }, []);

  const vote = useCallback(
    async (sondageId: string, optionId: string): Promise<boolean> => {
      if (hasVoted(sondageId)) return false;
      setLoading(true);
      const fp = getFingerprint(sondageId);
      const { data } = await supabase.rpc("vote_sondage", {
        p_sondage_id: sondageId,
        p_option_id: optionId,
        p_fingerprint: fp,
      });
      setLoading(false);
      return data === true;
    },
    [hasVoted]
  );

  return { vote, hasVoted, loading };
}
