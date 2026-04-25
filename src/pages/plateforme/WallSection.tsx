import { Activity } from "lucide-react";
import ContributionsWall from "./wall/ContributionsWall";

const WallSection = (): JSX.Element => (
  <section
    id="suivi"
    className="px-4 md:px-6 py-20"
    style={{ backgroundColor: "#f5f5f7" }}
  >
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-primary">
          <Activity className="h-3.5 w-3.5" strokeWidth={2} />
          Suivi en temps réel
        </p>
        <h2 className="font-display font-medium text-secondary text-3xl md:text-4xl leading-tight">
          Le suivi des contributions UNSAgglo
        </h2>
        <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
          Chaque contribution est suivie publiquement de la réception au verdict
          en CST. Aucune ne disparaît dans une boîte noire — vous voyez où en
          est la vôtre, et celle de vos collègues.
        </p>
      </div>

      <ContributionsWall />
    </div>
  </section>
);

export default WallSection;
