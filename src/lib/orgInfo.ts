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
  nomCourt: "UNSAgglo",
  devise: "Libres Ensemble",
  nature: "Syndicat professionnel",
  cadreLegal:
    "Syndicat professionnel régi par la loi du 21 mars 1884 et le Code du travail",
  constitution: "Constitué le 9 janvier 2026 en assemblée générale constitutive à Louvres",
  statuts:
    "Statuts déposés à la mairie de Louvres et transmis à l'URTIF ainsi qu'à la Fédération UNSA Territoriaux",
  adresse: {
    ligne1: "32 rue de la Briqueterie",
    cp: "95380",
    ville: "Louvres",
  },
  email: "unsagglo@roissypaysdefrance.fr",
  directeurPublication: "Rhiad AZZABI",
  federation: "Fédération UNSA Territoriaux",
  unionRegionale: "Union Régionale UNSA Territoriaux Île-de-France (URTIF)",
  federationSiege: "21 rue Jules Ferry, 93177 Bagnolet",
  perimetre:
    "Agents de la Communauté d'Agglomération Roissy Pays de France (CARPF), Val-d'Oise (95) et Seine-et-Marne (77)",
  affiliation:
    "Affilié à la Fédération UNSA Territoriaux et à l'Union Régionale UNSA Territoriaux Île-de-France (URTIF)",
  // Coordonnées bancaires (à compléter dès ouverture du compte)
  iban: "" as string,
  bic: "" as string,
  titulaire: "" as string,
} as const;

export const orgAddressLine = (): string =>
  `${ORG_INFO.adresse.ligne1}, ${ORG_INFO.adresse.cp} ${ORG_INFO.adresse.ville}`;

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
