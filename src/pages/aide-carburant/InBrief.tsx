const RETAIN_POINTS: string[] = [
  "Forfait unique de 50 €, versé en juin 2026",
  "Aide rétroactive pour avril, mai et juin 2026",
  "Demande exclusivement sur impots.gouv.fr (espace particulier)",
  "Ouverture du formulaire officiel : fin mai 2026",
  "Aide non imposable, cumulable avec la prime transport employeur",
  "UNSAgglo accompagne les agents de la Communauté d'Agglomération Roissy Pays de France à chaque étape",
];

const CONDITIONS: string[] = [
  "Posséder un véhicule personnel (thermique, électrique ou hybride) utilisé pour vos trajets",
  "Revenu fiscal de référence sous le seuil indicatif (la plupart des agents territoriaux de la CARPF sont éligibles)",
  "Habiter à au moins 15 km de votre lieu de travail OU parcourir 8 000 km/an en mission professionnelle",
];

const InBrief = (): JSX.Element => (
  <section className="px-4 md:px-6 py-20 bg-white">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16">
      <div>
        <h2 className="text-secondary font-display font-medium text-lg mb-5">
          Ce qu'il faut retenir
        </h2>
        <ul className="space-y-3">
          {RETAIN_POINTS.map((point) => (
            <li key={point} className="flex gap-3 text-sm text-foreground/85">
              <span className="text-primary mt-1 leading-none">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-secondary font-display font-medium text-lg mb-2">
          Qui peut en bénéficier ?
        </h2>
        <p className="text-xs uppercase tracking-wider text-destructive font-semibold mb-5">
          Trois conditions cumulatives
        </p>
        <ol className="space-y-3">
          {CONDITIONS.map((cond, i) => (
            <li key={cond} className="flex gap-3 text-sm text-foreground/85">
              <span className="text-primary font-display font-medium leading-none">
                {i + 1}.
              </span>
              <span>{cond}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

export default InBrief;
