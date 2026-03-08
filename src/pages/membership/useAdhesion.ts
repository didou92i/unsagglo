import { useState } from "react";
import { z } from "zod";

export const adhesionSchema = z.object({
  nom: z.string().min(2, "Nom requis"),
  prenom: z.string().min(2, "Prenom requis"),
  email: z.string().email("Email invalide"),
  service: z.string().min(2, "Service requis"),
  grade: z.string().min(2, "Grade requis"),
  telephone: z.string().optional(),
});

export type AdhesionFormData = z.infer<typeof adhesionSchema>;

interface AdhesionState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

interface UseAdhesionReturn extends AdhesionState {
  submit: (data: AdhesionFormData) => Promise<void>;
}

export function useAdhesion(): UseAdhesionReturn {
  const [state, setState] = useState<AdhesionState>({ loading: false, success: false, error: null });

  const submit = async (_data: AdhesionFormData): Promise<void> => {
    setState({ loading: true, success: false, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setState({ loading: false, success: true, error: null });
    } catch {
      setState({ loading: false, success: false, error: "Erreur lors de l'envoi." });
    }
  };

  return { ...state, submit };
}
