import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CandidatInput {
  prenom: string;
  nom: string;
  service: string;
  email: string;
  telephone: string;
  adresse: string;
}

interface UseCandidatSubmitReturn {
  submit: (data: CandidatInput) => Promise<void>;
  loading: boolean;
  success: boolean;
  error: string | null;
}

export function useCandidatSubmit(): UseCandidatSubmitReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: CandidatInput): Promise<void> => {
    setLoading(true);
    setError(null);
    const { error: err } = await supabase
      .from("candidats_liste")
      .insert([data]);
    if (err) {
      setError(err.message);
      toast.error("Erreur lors de l'envoi de la candidature.");
    } else {
      setSuccess(true);
      toast.success("Candidature envoyee avec succes !");
    }
    setLoading(false);
  };

  return { submit, loading, success, error };
}
