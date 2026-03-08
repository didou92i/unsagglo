import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// n8n WORKFLOW -- Adhesion:
// On Supabase INSERT, an n8n workflow is triggered externally (via Supabase webhook in n8n):
// Step 1: Gmail MCP -> Welcome email to adherent
// Step 2: Gmail MCP -> Notification to SG UNSAgglo
// Step 3: Notion MCP -> Add row to bureau adherents registry

interface AdhesionInput {
  nom: string;
  prenom: string;
  email: string;
  service: string;
  grade: string;
  telephone?: string;
}

interface UseAdhesionSubmitReturn {
  submit: (data: AdhesionInput) => Promise<void>;
  loading: boolean;
  success: boolean;
  error: string | null;
}

export function useAdhesionSubmit(): UseAdhesionSubmitReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: AdhesionInput): Promise<void> => {
    setLoading(true);
    setError(null);
    const { error: err } = await supabase.from("adherents").insert([{
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      service: data.service,
      grade: data.grade,
      telephone: data.telephone ?? null,
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
