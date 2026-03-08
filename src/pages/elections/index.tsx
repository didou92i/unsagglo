import { Euro, Building2, TrendingUp, ShieldAlert } from "lucide-react";
import type { ElementType } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { HeroBanner, SectionTitle } from "@/components/sections";
import UCard from "@/components/ui/UCard";
import UButton from "@/components/ui/UButton";
import ProgramSection from "./ProgramSection";

interface Engagement {
  titre: string;
  description: string;
  icon: ElementType;
}

const ENGAGEMENTS: Engagement[] = [
  { titre: "Rémunération", description: "Défense du RIFSEEP, revalorisation du point d'indice, NBI.", icon: Euro },
  { titre: "Conditions de travail", description: "Télétravail, aménagement horaires, locaux adaptés.", icon: Building2 },
  { titre: "Carrière", description: "Avancement équitable, promotion interne, formation.", icon: TrendingUp },
  { titre: "Risques psychosociaux", description: "Prévention, droit d'alerte, accompagnement.", icon: ShieldAlert },
];

const ElectionsPage = (): JSX.Element => {
  return (
    <PageWrapper>
      <MetaTags title="Élections 2026" description="UNSAgglo se prépare aux élections professionnelles de décembre 2026. Contribuez à notre programme." />
      <HeroBanner
        title="Élections "
        highlight="2026"
        subtitle="Construisons ensemble le programme qui défend vos intérêts."
        badge="Décembre 2026"
        ctaPrimaryLabel="Je contribue"
        ctaPrimaryHref="/plateforme#contribution"
        ctaSecondaryLabel="Notre programme"
        ctaSecondaryHref="#programme"
      />
      <section className="px-4 md:px-6 py-16">
        <SectionTitle title="Nos engagements" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {ENGAGEMENTS.map((e) => (
            <UCard key={e.titre}>
              <div className="flex items-start gap-4">
                <div className="rounded-[var(--radius-md)] bg-primary/10 p-3 flex-shrink-0">
                  <e.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">{e.titre}</h3>
                  <p className="text-muted-foreground text-sm mt-2">{e.description}</p>
                </div>
              </div>
            </UCard>
          ))}
        </div>
      </section>
      <section id="programme" className="px-4 md:px-6 py-16 bg-muted">
        <SectionTitle title="Calendrier électoral" />
        <ProgramSection />
      </section>
      <section id="contribution" className="px-4 md:px-6 py-16">
        <SectionTitle title="Faites entendre votre voix" subtitle="Proposez vos idées sur notre plateforme participative." />
        <div className="text-center max-w-lg mx-auto">
          <p className="text-muted-foreground mb-6">
            Toutes les contributions sont centralisées sur notre plateforme participative. Partagez vos propositions et participez aux sondages thématiques.
          </p>
          <Link to="/plateforme#contribution">
            <UButton variant="primary" size="lg">Accéder à la plateforme</UButton>
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
};

export default ElectionsPage;
