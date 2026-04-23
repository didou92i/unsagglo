export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "q1",
    question: "L'aide est-elle imposable ?",
    answer:
      "Non, le forfait de 50 € n'est pas imposable et ne sera pas soumis à cotisations sociales.",
  },
  {
    id: "q2",
    question: "Puis-je la cumuler avec la prime transport versée par mon employeur ?",
    answer:
      "Oui, l'aide grands rouleurs de l'État est cumulable avec la prime transport employeur, le forfait mobilités durables et le bonus covoiturage.",
  },
  {
    id: "q3",
    question: "Je suis à temps partiel, ai-je droit à l'aide complète ?",
    answer:
      "Oui, le montant de 50 € est forfaitaire et identique pour tous les bénéficiaires éligibles, quelle que soit leur quotité de travail.",
  },
  {
    id: "q4",
    question: "Je suis apprenti, stagiaire ou contractuel : suis-je concerné ?",
    answer:
      "Oui, dès lors que vous êtes en activité professionnelle et remplissez les trois conditions cumulatives, votre statut contractuel n'est pas un motif d'exclusion.",
  },
  {
    id: "q5",
    question: "Que faire si le portail impots.gouv.fr n'est pas encore ouvert ?",
    answer:
      "Le formulaire officiel ouvrira fin mai 2026. UNSAgglo vous alertera par email dès son ouverture si vous avez souhaité être tenu informé.",
  },
  {
    id: "q6",
    question: "Mon conjoint et moi avons une seule voiture, avons-nous droit à deux aides ?",
    answer:
      "L'aide est individuelle. Chaque membre du foyer en activité et remplissant les conditions peut la demander.",
  },
  {
    id: "q7",
    question: "Qui contacter si ma demande est refusée ou si j'ai un doute ?",
    answer:
      "Pour toute question sur votre situation, contactez UNSAgglo : unsagglo@roissypaysdefrance.fr",
  },
  {
    id: "q8",
    question: "Le dispositif est-il définitivement confirmé ?",
    answer:
      "Les grandes lignes ont été annoncées par le gouvernement le 21 avril 2026 et présentées par le ministre Roland Lescure. Le décret d'application, qui fixera les seuils exacts de revenus par composition de foyer et les modalités précises, est attendu avant fin mai 2026. La mesure reste également soumise à l'approbation de la Commission européenne avant sa mise en œuvre définitive. UNSAgglo met à jour cette page dès publication des textes officiels.",
  },
  {
    id: "q9",
    question: "Quelle information dois-je fournir lors de ma demande sur impots.gouv.fr ?",
    answer:
      "Une seule : votre kilométrage professionnel annuel (distance domicile-travail ou kilomètres parcourus en mission). L'administration fiscale vérifie automatiquement vos revenus (via la DGFIP) et la possession de votre véhicule (via la carte grise) — vous n'avez aucun justificatif à fournir.",
  },
];
