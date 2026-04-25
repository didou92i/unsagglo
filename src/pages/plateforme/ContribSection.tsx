import { Sparkles } from "lucide-react";
import ContribWizard from "./wizard/ContribWizard";

const ContribSection = (): JSX.Element => (
  <section
    id="contribution"
    className="px-4 md:px-6 py-20"
    style={{ backgroundColor: "#ffffff" }}
  >
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Plateforme participative
        </p>
        <h2 className="font-display font-medium text-secondary text-3xl md:text-4xl leading-tight">
          Déposez votre contribution en quelques minutes
        </h2>
        <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto leading-relaxed">
          UNSAgglo recueille votre vécu d'agent de la Communauté d'Agglomération
          Roissy Pays de France pour porter vos idées au prochain CST.
        </p>
      </div>

      <ContribWizard />
    </div>
  </section>
);

export default ContribSection;
