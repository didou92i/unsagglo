import { z } from "zod";

const PHONE_REGEX = /^(?:\+33|0)[1-9](?:[\s.-]?\d{2}){4}$/;
const CP_REGEX = /^\d{5}$/;

const todayMinusYears = (years: number): Date => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - years);
  return d;
};

export const adhesionSchema = z
  .object({
  // ----- Identité civile -----
  nom: z
    .string()
    .min(2, "Le nom est requis (minimum 2 caractères).")
    .max(80, "Le nom ne peut pas dépasser 80 caractères.")
    .trim(),
  prenom: z
    .string()
    .min(2, "Le prénom est requis (minimum 2 caractères).")
    .max(80, "Le prénom ne peut pas dépasser 80 caractères.")
    .trim(),
  date_naissance: z
    .string()
    .min(1, "La date de naissance est requise.")
    .refine(
      (v) => {
        const d = new Date(v);
        return (
          !isNaN(d.getTime()) &&
          d <= todayMinusYears(16) &&
          d >= todayMinusYears(80)
        );
      },
      "Date de naissance invalide (entre 16 et 80 ans).",
    ),

  // ----- Coordonnées -----
  email: z
    .string()
    .min(1, "L'adresse e-mail est requise.")
    .email("Adresse e-mail invalide.")
    .max(150, "Adresse e-mail trop longue."),
  telephone: z
    .string()
    .min(1, "Le téléphone est requis.")
    .regex(PHONE_REGEX, "Numéro de téléphone français invalide."),
  adresse_ligne1: z
    .string()
    .min(2, "L'adresse est requise.")
    .max(150, "Adresse trop longue."),
  adresse_ligne2: z
    .string()
    .max(150, "Complément d'adresse trop long.")
    .optional()
    .or(z.literal("")),
  adresse_cp: z
    .string()
    .regex(CP_REGEX, "Code postal invalide (5 chiffres attendus)."),
  adresse_ville: z
    .string()
    .min(2, "La ville est requise.")
    .max(80, "Ville trop longue."),

  // ----- Situation professionnelle -----
  categorie: z.enum(["A", "B", "C"], {
    errorMap: () => ({ message: "Sélectionnez votre catégorie statutaire." }),
  }),
  grade: z
    .string()
    .min(2, "Indiquez votre grade.")
    .max(120, "Grade trop long."),
  echelon: z
    .number({ invalid_type_error: "L'échelon doit être un nombre." })
    .int("L'échelon doit être un nombre entier.")
    .min(1, "Échelon minimum : 1.")
    .max(20, "Échelon maximum : 20."),
  statut_pro: z.enum(
    [
      "titulaire",
      "stagiaire",
      "contractuel_cdi",
      "contractuel_cdd",
      "apprenti",
      "retraite",
    ],
    {
      errorMap: () => ({
        message: "Sélectionnez votre statut professionnel.",
      }),
    },
  ),
  service: z
    .string()
    .min(1, "Sélectionnez votre service ou direction."),
  service_libre: z
    .string()
    .max(120, "Précision trop longue.")
    .optional()
    .or(z.literal("")),
  site_affectation: z
    .string()
    .min(2, "Indiquez votre site d'affectation.")
    .max(120, "Site trop long."),
  date_entree_carpf: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (v) =>
        !v ||
        (() => {
          const d = new Date(v);
          return !isNaN(d.getTime()) && d <= new Date();
        })(),
      "Date d'entrée invalide.",
    ),

  // ----- Adhésion -----
  mode_paiement: z.enum(["cheque", "virement"], {
    errorMap: () => ({ message: "Sélectionnez un mode de paiement." }),
  }),
  // Périodicité figée à 'mensuel' en Phase 1.
  // Réintroduire le choix mensuel/annuel en Phase 2 (Stripe).

  // ----- Engagement -----
  rgpd_consent: z.literal(true, {
    errorMap: () => ({
      message:
        "Vous devez accepter la politique de confidentialité pour adhérer.",
    }),
  }),
  statuts_acceptes: z.literal(true, {
    errorMap: () => ({
      message: "Vous devez déclarer adhérer aux statuts d'UNSAgglo.",
    }),
  }),
  })
  .superRefine((values, ctx) => {
    if (values.service === "autre_service") {
      const v = values.service_libre?.trim();
      if (!v || v.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["service_libre"],
          message: "Précisez votre service.",
        });
      }
    }
  });

export type AdhesionFormValues = z.infer<typeof adhesionSchema>;

// Backward-compat alias used by code paths that imported the old name.
export type AdhesionFormData = AdhesionFormValues;
