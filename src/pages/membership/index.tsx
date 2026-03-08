import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { HeroBanner, SectionTitle } from "@/components/sections";
import UCard from "@/components/ui/UCard";
import PricingTable from "./PricingTable";
import AdhesionForm from "./AdhesionForm";

const REASONS = [
  { titre: "Defense juridique individuelle", description: "Accompagnement en cas de litige avec votre administration." },
  { titre: "Information sur vos droits", description: "Fiches pratiques regulierement mises a jour." },
  { titre: "Representation en CST et F3SCT", description: "Votre voix dans les instances du dialogue social." },
  { titre: "Reseau syndical national UNSA", description: "La force du 3eme syndicat de France a votre service." },
];

const MembershipPage = (): JSX.Element => {
  return (
    <PageWrapper>
      <MetaTags title="Adherer" description="Rejoignez UNSAgglo. Cotisations accessibles, syndicat independant, defense de vos droits a Roissy Pays de France." />
      <HeroBanner
        title="Rejoignez "
        highlight="UNSAgglo"
        subtitle="Un syndicat independant pour defendre vos droits au quotidien."
        ctaPrimaryLabel="Adherer maintenant"
        ctaPrimaryHref="#adhesion"
      />
      <section className="px-4 md:px-6 py-16">
        <SectionTitle title="Pourquoi adherer ?" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {REASONS.map((r) => (
            <UCard key={r.titre}>
              <h3 className="font-display text-lg font-bold text-foreground">{r.titre}</h3>
              <p className="text-muted-foreground text-sm mt-2">{r.description}</p>
            </UCard>
          ))}
        </div>
      </section>
      <section className="px-4 md:px-6 py-16 bg-muted">
        <SectionTitle title="Nos cotisations" />
        <PricingTable />
      </section>
      <section id="adhesion" className="px-4 md:px-6 py-16">
        <SectionTitle title="Rejoindre UNSAgglo" />
        <AdhesionForm />
      </section>
    </PageWrapper>
  );
};

export default MembershipPage;
