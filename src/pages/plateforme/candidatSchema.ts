import { z } from "zod";

export const candidatSchema = z.object({
  prenom: z.string().min(2, "Prenom requis"),
  service: z.string().min(2, "Service requis"),
  email: z.string().email("Adresse e-mail invalide"),
  telephone: z.string().min(10, "Numero de telephone invalide"),
  adresse: z.string().min(5, "Adresse requise"),
});

export type CandidatFormData = z.infer<typeof candidatSchema>;
