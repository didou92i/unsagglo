import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { HeroBanner, StatsBar, ElectionBanner } from "@/components/sections";
import NewsPreview from "./NewsPreview";
import RightsGrid from "./RightsGrid";

const STATS = [
  { value: "3", label: "Structures representees" },
  { value: "150+", label: "Adherents" },
  { value: "2026", label: "Elections a preparer" },
  { value: "6", label: "Domaines de droits" },
];

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "UNSAgglo -- Libres Ensemble",
  description: "Syndicat UNSA representant les agents de la Communaute Roissy Pays de France",
  url: "https://unsagglo.fr",
  email: "unsagglo@unsa.org",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Roissy-en-France",
    addressRegion: "Val-d'Oise",
    addressCountry: "FR",
  },
};

const Home = (): JSX.Element => {
  return (
    <PageWrapper>
      <MetaTags
        title="Accueil"
        description="UNSAgglo defend les droits des agents territoriaux de la Communaute Roissy Pays de France. Adherez, informez-vous, agissez pour les elections 2026."
        schema={ORG_SCHEMA}
      />
      <HeroBanner
        badge="Syndicat UNSA -- Agglo CRF - DDT - DRIHL"
        title="Defendons ensemble "
        highlight="vos droits"
        subtitle="UNSAgglo -- Libres Ensemble. Le syndicat qui agit pour les agents du territoire Roissy Pays de France."
        ctaPrimaryLabel="Adherer maintenant"
        ctaPrimaryHref="/membership"
        ctaSecondaryLabel="Decouvrir nos actions"
        ctaSecondaryHref="/news"
      />
      <StatsBar stats={STATS} />
      <section className="px-4 md:px-6 py-16 bg-muted">
        <NewsPreview />
      </section>
      <section className="px-4 md:px-6 py-16">
        <RightsGrid />
      </section>
      <section className="px-4 md:px-6 py-16 bg-muted">
        <ElectionBanner />
      </section>
    </PageWrapper>
  );
};

export default Home;
