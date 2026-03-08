import { z } from "zod";
import { THEMES } from "@/constants/themes";

const themeValues = THEMES.map((t) => t.value) as [string, ...string[]];

export const contribSchema = z.object({
  prenom: z.string().optional(),
  nom: z.string().optional(),
  service: z.string().min(2, "Service requis"),
  theme: z.enum(themeValues, {
    errorMap: () => ({ message: "Selectionnez un theme" }),
  }),
  contenu: z.string().min(20, "Proposition trop courte (20 caracteres minimum)"),
  rejoindreListe: z.boolean().optional(),
  email: z.string().optional(),
  telephone: z.string().optional(),
  adresse: z.string().optional(),
}).superRefine((data, ctx) => {
  if (!data.rejoindreListe) return;
  if (!data.nom || data.nom.length < 2) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Nom requis (2 caracteres minimum)", path: ["nom"] });
  }
  if (!data.email || !z.string().email().safeParse(data.email).success) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Adresse e-mail invalide", path: ["email"] });
  }
  if (!data.telephone || data.telephone.length < 10) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Numero de telephone invalide", path: ["telephone"] });
  }
  if (!data.adresse || data.adresse.length < 5) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Adresse requise", path: ["adresse"] });
  }
});

export type ContribFormData = z.infer<typeof contribSchema>;
