import { Sparkles, MessageCircle, Users } from "lucide-react";
import StepHeader from "./StepHeader";
import { useCountUp } from "@/hooks/useCountUp";

interface StepWelcomeProps {
  totalContributions: number;
}

const FEATURES: Array<{ icon: typeof Sparkles; title: string; body: string }> = [
  {
    icon: MessageCircle,
    title: "5 minutes, pas plus",
    body: "On vous pose 5 ou 6 questions courtes — vous répondez à votre rythme.",
  },
  {
    icon: Users,
    title: "Anonyme si vous préférez",
    body: "Vous pouvez signer ou non. Dans tous les cas, votre voix compte.",
  },
  {
    icon: Sparkles,
    title: "Portée au CST",
    body: "Vos meilleures idées sont défendues directement par UNSAgglo.",
  },
];

const StepWelcome = ({ totalContributions }: StepWelcomeProps): JSX.Element => {
  const animated = useCountUp({ end: totalContributions, duration: 1200 });

  return (
    <div>
      <StepHeader
        eyebrow="Plateforme participative"
        title="Construisons le programme 2026, ensemble."
        subtitle="UNSAgglo recueille votre vécu d'agent de la Communauté d'Agglomération Roissy Pays de France pour porter vos idées en CST. Chaque contribution est lue, classée et défendue."
      />

      <div className="space-y-4">
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.title} className="flex items-start gap-3">
              <div
                className="flex-shrink-0 rounded-md flex items-center justify-center transition-transform duration-200 hover:scale-105"
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "#eff9fe",
                }}
              >
                <Icon
                  className="h-4 w-4"
                  style={{ color: "#009fe3" }}
                  strokeWidth={1.75}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-secondary">{f.title}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {f.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {totalContributions > 0 && (
        <div
          className="rounded-md p-3 mt-6 text-xs leading-relaxed text-secondary"
          style={{ backgroundColor: "#eff9fe" }}
        >
          Déjà{" "}
          <span
            className="font-display font-medium text-base tabular-nums tracking-tight"
            style={{ color: "#009fe3" }}
          >
            {animated}
          </span>{" "}
          agent
          {totalContributions > 1 ? "s ont" : " a"} déposé une contribution.
          Rejoignez le mouvement.
        </div>
      )}
    </div>
  );
};

export default StepWelcome;
