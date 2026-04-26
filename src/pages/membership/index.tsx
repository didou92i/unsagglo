import { Scale, BookOpen, Users, Network } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { HeroBanner, SectionTitle } from "@/components/sections";
import UCard from "@/components/ui/UCard";
import PricingTable from "./PricingTable";
import AdhesionForm from "./AdhesionForm";

interface Reason {
  Icon: React.ComponentType<{ className?: string }>;
  titre: string;
  description: string;
}

const REASONS: Reason[] = [
  {
    Icon: Scale,
    titre: "Défense juridique individuelle",
    description:
      "Accompagnement et conseil en cas de litige avec votre administration : entretien préalable, sanction, mobilité contrainte, accident de service.",
  },
  {
    Icon: BookOpen,
    titre: "Information sur vos droits",
    description:
      "Fiches pratiques mises à jour, veille statutaire, réponses personnalisées sur les régimes indemnitaires, congés et carrière.",
  },
  {
    Icon: Users,
    titre: "Représentation en CST et F3SCT",
    description:
      "Une fois élus, vos représentants UNSAgglo porteront votre voix dans les instances du dialogue social de la CARPF.",
  },
  {
    Icon: Network,
    titre: "Réseau syndical national UNSA",
    description:
      "La force du 3ème syndicat de France : appui juridique national, formations, ressources fédérales mutualisées.",
  },
];

const MembershipPage = (): JSX.Element => {
  return (
    <PageWrapper>
      <MetaTags
        title="Adhérer"
        description="Rejoignez UNSAgglo. Cotisation accessible, syndicat indépendant, défense de vos droits à la Communauté d'Agglomération Roissy Pays de France."
      />
      <HeroBanner
        title="Rejoignez "
        highlight="UNSAgglo"
        subtitle="Un syndicat indépendant et de proximité pour défendre vos droits au quotidien."
        ctaPrimaryLabel="Demande d'adhésion"
        ctaPrimaryHref="#adhesion"
      />
      <section className="px-4 md:px-6 py-16">
        <SectionTitle title="Pourquoi adhérer ?" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {REASONS.map(({ Icon, titre, description }) => (
            <UCard key={titre}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {titre}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-2">
                    {description}
                  </p>
                </div>
              </div>
            </UCard>
          ))}
        </div>
      </section>
      <section className="px-4 md:px-6 py-16 bg-muted">
        <SectionTitle title="Notre cotisation" />
        <PricingTable />
      </section>
      <section id="adhesion" className="px-4 md:px-6 py-16">
        <SectionTitle title="Demande d'adhésion" />
        <AdhesionForm />
      </section>
    </PageWrapper>
  );
};

export default MembershipPage;
