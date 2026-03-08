import { useState } from "react";
import { z } from "zod";

export const contribSchema = z.object({
  prenom: z.string().min(2, "Prenom requis (2 car. minimum)"),
  service: z.string().min(2, "Service requis"),
  theme: z.enum(["remuneration", "conditions_travail", "carriere", "rps", "autre"], {
    errorMap: () => ({ message: "Selectionnez un theme" }),
  }),
  contenu: z.string().min(20, "Proposition trop courte (20 caracteres minimum)"),
});

export type ContribFormData = z.infer<typeof contribSchema>;

interface ContribState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

interface UseContribReturn extends ContribState {
  submit: (data: ContribFormData) => Promise<void>;
  reset: () => void;
}

export function useContrib(): UseContribReturn {
  const [state, setState] = useState<ContribState>({ loading: false, success: false, error: null });

  const submit = async (_data: ContribFormData): Promise<void> => {
    setState({ loading: true, success: false, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setState({ loading: false, success: true, error: null });
    } catch {
      setState({ loading: false, success: false, error: "Erreur lors de l'envoi." });
    }
  };

  const reset = (): void => {
    setState({ loading: false, success: false, error: null });
  };

  return { ...state, submit, reset };
}
