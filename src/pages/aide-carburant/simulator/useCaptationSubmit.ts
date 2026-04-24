import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * IMPORTANT RGPD — never pass the revenu fiscal de référence (RFR) here. The
 * RFR stays in client-side React state only. This payload intentionally omits it.
 */
export interface CaptationPayload {
  email: string;
  opt_in_newsletter: boolean;
  eligibilite: "Éligible" | "Non-éligible" | "À vérifier";
  critere_bloquant: string | null;
  composition_foyer: string | null;
  profil_kilometrage: string | null;
}

interface UseCaptationSubmitReturn {
  submit: (payload: CaptationPayload) => Promise<{ ok: boolean; error?: string }>;
  markPdfDownloaded: (email: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const GENERIC_ERROR =
  "Une erreur est survenue, merci de réessayer ou de contacter unsagglo@roissypaysdefrance.fr";

export function useCaptationSubmit(): UseCaptationSubmitReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (
    payload: CaptationPayload,
  ): Promise<{ ok: boolean; error?: string }> => {
    setLoading(true);
    setError(null);

    const { error: err } = await supabase.rpc("capture_aide_carburant_email", {
      p_email: payload.email.trim().toLowerCase(),
      p_eligibilite: payload.eligibilite,
      p_critere_bloquant: payload.critere_bloquant ?? "",
      p_opt_in_newsletter: payload.opt_in_newsletter,
      p_composition_foyer: payload.composition_foyer ?? "",
      p_profil_kilometrage: payload.profil_kilometrage ?? "",
    });

    setLoading(false);

    if (err) {
      setError(GENERIC_ERROR);
      return { ok: false, error: GENERIC_ERROR };
    }
    return { ok: true };
  };

  const markPdfDownloaded = async (email: string): Promise<void> => {
    await supabase.rpc("mark_aide_carburant_pdf_downloaded", {
      p_email: email.trim().toLowerCase(),
    });
  };

  return { submit, markPdfDownloaded, loading, error };
}
