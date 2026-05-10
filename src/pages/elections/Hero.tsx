import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

// Date prévisionnelle des élections professionnelles FPT — à ajuster dès
// publication du décret officiel.
const ELECTION_DATE = new Date("2026-12-08T08:00:00");

const computeDaysUntil = (target: Date): number => {
  const diff = target.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

const useDaysUntil = (target: Date): number => {
  const [days, setDays] = useState<number>(() => computeDaysUntil(target));

  useEffect(() => {
    const update = (): void => setDays(computeDaysUntil(target));
    update();
    const id = window.setInterval(update, 60 * 60 * 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return days;
};

const scrollToSection = (id: string): void => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Hero = (): JSX.Element => {
  const daysLeft = useDaysUntil(ELECTION_DATE);

  return (
    <section
      className="px-4 md:px-6 py-20 md:py-28 text-white"
      style={{ backgroundColor: "#29235c" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span
            className="inline-block rounded-[3px] px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase"
            style={{ backgroundColor: "#e74124", color: "#ffffff" }}
          >
            Décembre 2026
          </span>
          <span className="text-xs text-white/70 tabular-nums">
            J - {daysLeft} jours avant le scrutin
          </span>
        </div>

        <h1
          className="font-display font-medium leading-[1.05]"
          style={{ fontSize: "clamp(40px, 7vw, 72px)" }}
        >
          Élections <span style={{ color: "#009fe3" }}>2026</span>
        </h1>

        <p className="text-base md:text-lg text-white/85 mt-6 max-w-2xl leading-relaxed">
          Première candidature UNSAgglo à la Communauté d'Agglomération Roissy
          Pays de France. Notre programme se construit avec vous, et la liste
          se constitue maintenant.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="/plateforme#contribution"
            className="group inline-flex items-center gap-2 text-white text-sm font-medium rounded-[6px] px-7 py-3 transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#009fe3" }}
          >
            Je contribue au programme
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={2}
            />
          </a>
          <button
            type="button"
            onClick={() => scrollToSection("pourquoi")}
            className="inline-flex items-center gap-2 text-white text-sm font-medium rounded-[6px] px-7 py-3 border transition-colors hover:bg-white hover:text-secondary"
            style={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
          >
            Pourquoi UNSAgglo&nbsp;?
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
