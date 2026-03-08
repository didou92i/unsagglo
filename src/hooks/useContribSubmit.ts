import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ContribInput {
  prenom: string;
  service: string;
  theme: string;
  contenu: string;
}

interface UseContribSubmitReturn {
  submit: (data: ContribInput) => Promise<void>;
  loading: boolean;
  success: boolean;
  error: string | null;
}

export function useContribSubmit(): UseContribSubmitReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: ContribInput): Promise<void> => {
    setLoading(true);
    setError(null);
    const { error: err } = await supabase.from("contributions_elections").insert([{
      prenom: data.prenom,
      service: data.service,
      theme: data.theme,
      contenu: data.contenu,
    }]);
    if (err) {
      setError(err.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return { submit, loading, success, error };
}
