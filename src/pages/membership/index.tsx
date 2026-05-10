import type { ReactNode } from "react";
import { Scale, Users, Handshake, Network } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { HeroBanner, SectionTitle } from "@/components/sections";
import UCard from "@/components/ui/UCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PricingTable from "./PricingTable";
import AdhesionForm from "./AdhesionForm";

interface Reason {
  Icon: React.ComponentType<{ className?: string }>;
  titre: string;
  description: string;
}

interface FaqItem {
  id: string;
  question: string;
  answer: ReactNode;
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
      "Une organisation représentative dans la fonction publique territoriale : appui juridique national, formations, et relais régional de l'Union Régionale UNSA Territoriaux Île-de-France (URTIF) pour les dossiers transverses.",
  },
];

const ADHESION_FAQ: FaqItem[] = [
  {
    id: "cout",
    question: "Combien coûte l'adhésion ?",
    answer: (
      <p>
        La cotisation UNSAgglo est unique : 9,99 € par mois, soit 119,88 € par
        an. Elle ouvre droit au crédit d'impôt syndical de 66 %, ce qui ramène
        le coût net réel à environ 3,40 € par mois pour les agents imposables.
      </p>
    ),
  },
  {
    id: "employeur",
    question: "Mon employeur saura-t-il que j'adhère ?",
    answer: (
      <p>
        Non. L'adhésion est personnelle et confidentielle. UNSAgglo ne transmet
        pas la liste de ses adhérents à l'employeur. Seules les informations
        strictement nécessaires à la gestion interne du syndicat sont traitées.
      </p>
    ),
  },
  {
    id: "superieur",
    question: "Comment dois-je m'y prendre vis-à-vis de mon supérieur ?",
    answer: (
      <p>
        Vous n'avez aucune démarche à effectuer auprès de votre supérieur pour
        adhérer. L'adhésion à un syndicat relève de votre liberté individuelle.
        Vous pouvez solliciter UNSAgglo directement si vous souhaitez être
        accompagné avant un entretien ou une procédure.
      </p>
    ),
  },
  {
    id: "deduction",
    question: "La cotisation est-elle déductible des impôts ?",
    answer: (
      <div className="space-y-3">
        <p>
          Oui. Les cotisations syndicales ouvrent droit à un crédit d'impôt de
          66 % du montant versé, dans les conditions prévues par l'article 199
          quater C du Code général des impôts.
        </p>
        <p>
          Lors de votre déclaration, le montant annuel peut être reporté en
          case 7AC. UNSAgglo fournit les éléments utiles à ses adhérents pour
          conserver une trace claire de leur cotisation.
        </p>
      </div>
    ),
  },
  {
    id: "changement-employeur",
    question: "Que se passe-t-il si je change d'employeur ?",
    answer: (
      <p>
        Vous pouvez nous signaler votre changement de situation afin de mettre
        à jour votre dossier. Si vous quittez le périmètre de la CARPF, nous
        vous orienterons vers la structure UNSA Territoriaux la plus adaptée à
        votre nouvelle collectivité.
      </p>
    ),
  },
  {
    id: "resiliation",
    question: "Puis-je résilier à tout moment ?",
    answer: (
      <p>
        Oui. Vous pouvez demander la résiliation de votre adhésion à tout moment
        par simple écrit intitulé Démission UNSAgglo, envoyé depuis l'adresse
        email associée à votre adhésion.
      </p>
    ),
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
      <section className="px-4 md:px-6 py-16 bg-muted">
        <SectionTitle
          title="Questions fréquentes sur l'adhésion"
          subtitle="Les points essentiels avant de rejoindre UNSAgglo."
        />
        <div className="max-w-3xl mx-auto rounded-lg border border-border bg-background px-5 md:px-8">
          <Accordion type="single" collapsible>
            {ADHESION_FAQ.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-left font-display text-base font-bold text-secondary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </PageWrapper>
  );
};

export default MembershipPage;
