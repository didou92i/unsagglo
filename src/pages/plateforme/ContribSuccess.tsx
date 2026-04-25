import { CheckCircle2, ArrowRight } from "lucide-react";

interface ContribSuccessProps {
  candidature: boolean;
}

const ContribSuccess = ({ candidature }: ContribSuccessProps): JSX.Element => (
  <section id="contribution" className="px-4 md:px-6 py-16 bg-background">
    <div className="max-w-2xl mx-auto text-center">
      <div
        className="inline-flex items-center justify-center rounded-full mb-6 animate-wizard-pop"
        style={{
          width: "72px",
          height: "72px",
          backgroundColor: "#dcfce7",
        }}
      >
        <CheckCircle2 className="h-9 w-9" style={{ color: "#15803d" }} strokeWidth={1.75} />
      </div>

      <h3 className="font-display font-medium text-secondary text-2xl md:text-3xl leading-tight">
        Merci, votre voix vient de rejoindre le programme UNSAgglo 2026.
      </h3>
      <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed">
        Votre contribution est enregistrée. Le bureau UNSAgglo va l'analyser
        dans les prochains jours et la traiter en transparence — vous pourrez
        suivre son cheminement publiquement sur le mur ci-dessous.
      </p>

      {candidature && (
        <div
          className="rounded-md p-4 mt-6 max-w-md mx-auto text-sm text-secondary leading-relaxed"
          style={{ backgroundColor: "#eff9fe" }}
        >
          Votre candidature à la liste UNSAgglo 2026 a aussi été enregistrée.
          Le secrétaire général reviendra vers vous très rapidement.
        </div>
      )}

      <a
        href="#suivi"
        className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
      >
        Voir le mur des contributions
        <ArrowRight className="h-4 w-4" strokeWidth={2} />
      </a>
    </div>
  </section>
);

export default ContribSuccess;
