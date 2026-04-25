import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ContribInput {
  prenom: string;
  service: string;
  statut: string;
  theme: string;
  themes?: string[];
  contenu: string;
  anonyme?: boolean;
}

interface UseContribSubmitReturn {
  submit: (data: ContribInput) => Promise<void>;
  loading: boolean;
  success: boolean;
  error: string | null;
  reset: () => void;
}

export function useContribSubmit(): UseContribSubmitReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: ContribInput): Promise<void> => {
    setLoading(true);
    setError(null);
    const themes =
      data.themes && data.themes.length > 0 ? data.themes : [data.theme];
    const { error: err } = await supabase.from("contributions_elections").insert([{
      prenom: data.prenom,
      service: data.service,
      statut: data.statut,
      theme: data.theme,
      themes,
      contenu: data.contenu,
      anonyme: data.anonyme ?? false,
    }]);
    if (err) {
      setError(err.message);
      toast.error("Erreur lors de l'envoi de la contribution.");
    } else {
      setSuccess(true);
      toast.success("Contribution envoyée avec succès !");
    }
    setLoading(false);
  };

  const reset = (): void => {
    setSuccess(false);
    setError(null);
  };

  return { submit, loading, success, error, reset };
}
