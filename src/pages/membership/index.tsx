import { Scale, Users, Handshake, Network } from "lucide-react";
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
    titre: "Accompagnement individuel sur vos droits",
    description:
      "Conseil et appui en cas de litige : entretien préalable, sanction, mobilité contrainte, accident de service. Décryptage des Lignes Directrices de Gestion (LDG) de la CARPF, invocables en recours individuel devant la CAP.",
  },
  {
    Icon: Users,
    titre: "Représentation aux instances CARPF",
    description:
      "Objectif décembre 2026 : porter votre voix au CST et à la F3SCT de la Communauté d'Agglomération Roissy Pays de France. Une fois élus, vos représentants UNSAgglo défendront les agents de tous les sites — Roissy, Goussainville, Villepinte, Tremblay, Le Mesnil-Amelot.",
  },
  {
    Icon: Handshake,
    titre: "Programme co-construit avec les agents",
    description:
      "Notre programme s'écrit avec vous, en continu, sur la plateforme participative. Chaque idée déposée rejoint un programme collectif que vous voyez s'écrire au fil de l'eau.",
  },
  {
    Icon: Network,
    titre: "Affiliation UNSA Territoriaux + URTIF",
    description:
      "La force du 3ᵉ syndicat de France : appui juridique national, formations, et le relais régional de l'Union Régionale des Territoriaux d'Île-de-France (URTIF) pour les dossiers transverses.",
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
        subtitle="Un syndicat indépendant, fédérant et participatif pour les agents de la CARPF — Val-d'Oise et Seine-et-Marne."
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
