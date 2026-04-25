import { Users, Eye, MapPin, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Pillar {
  icon: LucideIcon;
  title: string;
  body: string;
}

const PILLARS: Pillar[] = [
  {
    icon: Users,
    title: "Co-construction",
    body: "Notre programme s'écrit avec vous, pas pour vous. Chaque idée déposée sur la plateforme est lue, classée et défendue. Le syndicalisme top-down, c'est terminé.",
  },
  {
    icon: Eye,
    title: "Transparence totale",
    body: "Chaque contribution est suivie publiquement de la réception au verdict. Vous voyez ce qu'elle devient — pas de boîte noire, pas de promesses oubliées.",
  },
  {
    icon: MapPin,
    title: "100 % local",
    body: "Une section dédiée à la CARPF, jamais une voix nationale au-dessus de la vôtre. Nos engagements collent au terrain de Roissy Pays de France.",
  },
  {
    icon: Sparkles,
    title: "Modernes & accessibles",
    body: "Une plateforme participative, des simulateurs, un contact direct. Le syndicat à hauteur d'agent — pas de jargon, pas de formulaires papier.",
  },
];

const WhyUnsagglo = (): JSX.Element => (
  <section
    id="pourquoi"
    className="px-4 md:px-6 py-20 bg-white scroll-mt-24"
  >
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-primary">
          Notre différence
        </p>
        <h2 className="font-display font-medium text-secondary text-3xl md:text-4xl leading-tight">
          Pourquoi UNSAgglo ?
        </h2>
        <p className="text-sm text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
          Trois syndicats sont déjà élus à la CARPF. UNSAgglo se présente pour
          la première fois — avec une méthode différente, taillée pour notre
          collectivité.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {PILLARS.map((p) => {
          const Icon = p.icon;
          return (
            <article
              key={p.title}
              className="group rounded-lg border bg-white p-6 transition-all duration-200 hover:-translate-y-0.5"
              style={{ borderColor: "#e6eaf0" }}
            >
              <div
                className="rounded-md flex items-center justify-center mb-4 transition-colors duration-200"
                style={{
                  width: "44px",
                  height: "44px",
                  backgroundColor: "#eff9fe",
                }}
              >
                <Icon
                  className="h-5 w-5 transition-transform duration-200 group-hover:scale-110"
                  style={{ color: "#009fe3" }}
                  strokeWidth={1.75}
                />
              </div>
              <h3 className="font-display font-medium text-secondary text-lg leading-tight">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {p.body}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhyUnsagglo;
