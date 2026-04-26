import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

export function useContact(): UseContactReturn {
  const [state, setState] = useState<ContactState>({ loading: false, success: false, error: null });

  const submit = async (data: ContactFormData): Promise<void> => {
    setState({ loading: true, success: false, error: null });
    try {
      const { error: dbErr } = await supabase.from("contact_messages").insert([{
        nom: data.nom, email: data.email, objet: data.objet, message: data.message,
      }]);
      if (dbErr) throw new Error(dbErr.message);

      const webhookUrl = import.meta.env.VITE_N8N_CONTACT_WEBHOOK as string;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      setState({ loading: false, success: true, error: null });
      toast.success("Message envoye avec succes !");
    } catch {
      setState({ loading: false, success: false, error: "Envoi impossible. Reessayez ou ecrivez directement a unsagglo@roissypaysdefrance.fr" });
      toast.error("Erreur lors de l'envoi du message.");
    }
  };

  return { ...state, submit };
}
