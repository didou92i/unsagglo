import { z } from "zod";

export const articleSchema = z.object({
  titre: z.string().min(2, "Titre requis"),
  contenu: z.string().min(10, "Contenu trop court"),
  categorie: z.string().min(1, "Categorie requise"),
  auteur: z.string().min(2, "Auteur requis"),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
