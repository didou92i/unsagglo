import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { HeroBanner, SectionTitle } from "@/components/sections";
import UCard from "@/components/ui/UCard";
import ProgramSection from "./ProgramSection";
import ContribForm from "./ContribForm";

const ENGAGEMENTS = [
  { titre: "Remuneration", description: "Defense du RIFSEEP, revalorisation du point d'indice, NBI." },
  { titre: "Conditions de travail", description: "Teletravail, amenagement horaires, locaux adaptes." },
  { titre: "Carriere", description: "Avancement equitable, promotion interne, formation." },
  { titre: "Risques psychosociaux", description: "Prevention, droit d'alerte, accompagnement." },
];

const ElectionsPage = (): JSX.Element => {
  return (
    <PageWrapper>
      <MetaTags title="Elections 2026" description="UNSAgglo se prepare aux elections professionnelles de decembre 2026. Contribuez a notre programme." />
      <HeroBanner
        title="Elections "
        highlight="2026"
        subtitle="Construisons ensemble le programme qui defend vos interets."
        badge="Decembre 2026"
        ctaPrimaryLabel="Je contribue"
        ctaPrimaryHref="#contribution"
        ctaSecondaryLabel="Notre programme"
        ctaSecondaryHref="#programme"
      />
      <section className="px-4 md:px-6 py-16">
        <SectionTitle title="Nos engagements" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {ENGAGEMENTS.map((e) => (
            <UCard key={e.titre}>
              <h3 className="font-display text-lg font-bold text-foreground">{e.titre}</h3>
              <p className="text-muted-foreground text-sm mt-2">{e.description}</p>
            </UCard>
          ))}
        </div>
      </section>
      <section id="programme" className="px-4 md:px-6 py-16 bg-muted">
        <SectionTitle title="Calendrier electoral" />
        <ProgramSection />
      </section>
      <section id="contribution" className="px-4 md:px-6 py-16">
        <SectionTitle title="Faites entendre votre voix" subtitle="Proposez vos idees pour construire notre programme." />
        <ContribForm />
      </section>
    </PageWrapper>
  );
};

export default ElectionsPage;
