import { useState } from "react";
import { z } from "zod";

export const contactSchema = z.object({
  nom: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  objet: z.enum(["information", "adhesion", "recours", "autre"], {
    errorMap: () => ({ message: "Selectionnez un objet" }),
  }),
  message: z.string().min(10, "Message trop court (10 car. minimum)"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

interface ContactState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

interface UseContactReturn extends ContactState {
  submit: (data: ContactFormData) => Promise<void>;
}

// n8n WORKFLOW -- Contact Form:
// Trigger: POST webhook from this function
// Step 1: Gmail MCP -> Forward message to SG UNSAgglo
// (Configure webhook URL in n8n dashboard and set VITE_N8N_CONTACT_WEBHOOK in .env)

export function useContact(): UseContactReturn {
  const [state, setState] = useState<ContactState>({ loading: false, success: false, error: null });

  const submit = async (data: ContactFormData): Promise<void> => {
    setState({ loading: true, success: false, error: null });
    try {
      const webhookUrl = import.meta.env.VITE_N8N_CONTACT_WEBHOOK as string;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      setState({ loading: false, success: true, error: null });
    } catch {
      setState({ loading: false, success: false, error: "Envoi impossible. Reessayez ou ecrivez directement a unsagglo@unsa.org" });
    }
  };

  return { ...state, submit };
}
