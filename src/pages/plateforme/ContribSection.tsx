import { Sparkles } from "lucide-react";
import { ElectoralTransparencyBanner } from "@/components/sections";
import ContribWizard from "./wizard/ContribWizard";
import CampaignBanner from "./campaign/CampaignBanner";

const ContribSection = (): JSX.Element => (
  <section
    id="contribution"
    className="px-4 md:px-6 py-20"
    style={{ backgroundColor: "#ffffff" }}
  >
    <CampaignBanner />

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

      <ElectoralTransparencyBanner className="mb-10 mx-auto max-w-2xl" />

      <ContribWizard />
    </div>
  </section>
);

export default ContribSection;
