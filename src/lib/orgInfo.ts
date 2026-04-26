/**
 * Coordonnées institutionnelles UNSAgglo.
 * Source unique de vérité pour les mentions légales, les contacts publics
 * et la génération du bulletin d'adhésion.
 *
 * IBAN : à compléter dès l'ouverture du compte bancaire UNSAgglo. Tant que
 * la chaîne est vide, le bulletin PDF mentionne "à transmettre par UNSAgglo
 * après validation de votre demande" plutôt qu'un IBAN factice.
 */
export const ORG_INFO = {
  nom: "UNSAgglo — Roissy Pays de France",
  devise: "Libres Ensemble",
  adresse: {
    ligne1: "32 rue de la Briqueterie",
    cp: "95380",
    ville: "Louvres",
  },
  email: "unsagglo@roissypaysdefrance.fr",
  affiliation:
    "Section affiliée à UNSA Territoriaux — Union Régionale Île-de-France (URTIF)",
  // Coordonnées bancaires (à compléter dès ouverture du compte)
  iban: "" as string,
  bic: "" as string,
  titulaire: "" as string,
} as const;

export const COTISATION_MENSUELLE = 9.99;
export const COTISATION_ANNUELLE = COTISATION_MENSUELLE * 12;

/**
 * Renvoie une chaîne lisible pour le RIB UNSAgglo si ouvert,
 * ou un message factuel si l'ouverture est en cours.
 */
export const ribDisplayLines = (): string[] => {
  if (!ORG_INFO.iban || !ORG_INFO.titulaire) {
    return [
      "Le RIB UNSAgglo (compte bancaire en cours d'ouverture)",
      "vous sera transmis par e-mail dès validation de votre demande",
      "d'adhésion par le bureau syndical.",
    ];
  }
  return [
    `Titulaire : ${ORG_INFO.titulaire}`,
    `IBAN : ${ORG_INFO.iban}`,
    ORG_INFO.bic ? `BIC : ${ORG_INFO.bic}` : "",
  ].filter(Boolean);
};
