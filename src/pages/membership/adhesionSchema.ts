import { z } from "zod";

export const adhesionSchema = z.object({
  nom: z.string().min(2, "Nom requis"),
  prenom: z.string().min(2, "Prenom requis"),
  email: z.string().email("Email invalide"),
  service: z.string().min(1, "Service requis"),
  grade: z.string().min(2, "Grade requis"),
  telephone: z.string().optional(),
});

export type AdhesionFormData = z.infer<typeof adhesionSchema>;
