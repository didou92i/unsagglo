import { Sparkles, Info } from "lucide-react";
import ContribWizard from "./wizard/ContribWizard";

const ContribSection = (): JSX.Element => (
  <section
    id="contribution"
    className="px-4 md:px-6 py-20"
    style={{ backgroundColor: "#ffffff" }}
  >
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Plateforme participative
        </p>
        <h2 className="font-display font-medium text-secondary text-3xl md:text-4xl leading-tight">
          Construisons ensemble notre programme 2026
        </h2>
        <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto leading-relaxed">
          UNSAgglo recueille le vécu des agents de la Communauté d'Agglomération
          Roissy Pays de France pour bâtir un programme syndical fidèle à votre
          quotidien.
        </p>
      </div>

      <div
        className="mb-10 mx-auto rounded-md p-4 text-xs text-muted-foreground leading-relaxed flex items-start gap-3 max-w-2xl"
        style={{ backgroundColor: "#eff9fe" }}
      >
        <Info
          className="h-4 w-4 flex-shrink-0 mt-0.5"
          style={{ color: "#009fe3" }}
          strokeWidth={1.75}
        />
        <span>
          UNSAgglo se présente pour la première fois aux élections
          professionnelles de décembre 2026. Notre section syndicale est
          opérationnelle (bureau, statuts, affiliation UNSA Territoriaux), mais
          nous n'avons pas encore d'élu au CST de la CARPF. Nous nous engageons
          à porter vos idées si vous nous accordez votre confiance, et à vous
          accompagner individuellement dès aujourd'hui en cas de besoin.
        </span>
      </div>

      <ContribWizard />
    </div>
  </section>
);

export default ContribSection;
