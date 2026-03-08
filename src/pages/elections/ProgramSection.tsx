interface TimelineStep {
  date: string;
  titre: string;
  description: string;
  statut: "passe" | "en_cours" | "a_venir";
}

const TIMELINE: TimelineStep[] = [
  { date: "Mars -- Juin 2026", titre: "Construction du programme", description: "Recueil des contributions des agents.", statut: "en_cours" },
  { date: "Juillet 2026", titre: "Finalisation des listes", description: "Depot officiel des candidatures.", statut: "a_venir" },
  { date: "Septembre 2026", titre: "Campagne electorale", description: "Reunions de section, tractage.", statut: "a_venir" },
  { date: "Decembre 2026", titre: "Vote", description: "Scrutin professionnel -- tous agents convoques.", statut: "a_venir" },
];

const STATUT_COLORS: Record<string, string> = {
  passe: "bg-green",
  en_cours: "bg-primary",
  a_venir: "bg-muted-foreground/30",
};

const ProgramSection = (): JSX.Element => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        {TIMELINE.map((step, i) => (
          <div key={step.titre} className="flex gap-4 mb-8 last:mb-0">
            <div className="flex flex-col items-center">
              <div className={`w-4 h-4 rounded-full ${STATUT_COLORS[step.statut]} flex-shrink-0 mt-1`} />
              {i < TIMELINE.length - 1 && <div className="w-0.5 flex-1 bg-border mt-2" />}
            </div>
            <div className="pb-2">
              <p className="text-sm font-semibold text-primary">{step.date}</p>
              <h3 className="font-display text-lg font-bold text-foreground">{step.titre}</h3>
              <p className="text-muted-foreground text-sm mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramSection;
