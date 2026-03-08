import { z } from "zod";

export const contribSchema = z.object({
  prenom: z.string().min(2, "Prénom requis (2 car. minimum)"),
  service: z.string().min(2, "Service requis"),
  theme: z.enum(["remuneration", "conditions_travail", "carriere", "rps", "autre"], {
    errorMap: () => ({ message: "Sélectionnez un thème" }),
  }),
  contenu: z.string().min(20, "Proposition trop courte (20 caractères minimum)"),
});

export type ContribFormData = z.infer<typeof contribSchema>;
