import { z } from "zod";

export const contribSchema = z.object({
  prenom: z.string().optional(),
  service: z.string().min(2, "Service requis"),
  theme: z.enum(
    ["remuneration", "conditions_travail", "carriere", "rps", "autre"],
    { errorMap: () => ({ message: "Selectionnez un theme" }) }
  ),
  contenu: z.string().min(20, "Proposition trop courte (20 caracteres minimum)"),
});

export type ContribFormData = z.infer<typeof contribSchema>;
