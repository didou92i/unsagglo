import { MetaTags } from "@/components/seo";
import PageWrapper from "@/components/layout/PageWrapper";
import unsaLogo from "@/assets/unsa-logo.png";
import cityBg from "@/assets/city-background.png";
import WaveBackground from "@/pages/home/WaveBackground";
import EntryButton from "@/pages/home/EntryButton";
import NewsPreview from "@/pages/home/NewsPreview";
import RightsGrid from "@/pages/home/RightsGrid";
import HomeCTA from "@/pages/home/HomeCTA";

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "UNSAgglo — Libres Ensemble",
  description:
    "Section syndicale UNSA Territoriaux représentant les agents de la Communauté d'Agglomération Roissy Pays de France",
  url: "https://unsagglo.fr",
  email: "unsagglo@roissypaysdefrance.fr",
  address: {
    "@type": "PostalAddress",
    streetAddress: "32 rue de la Briqueterie",
    postalCode: "95380",
    addressLocality: "Louvres",
    addressCountry: "FR",
  },
};

const Home = (): JSX.Element => (
  <PageWrapper className="pt-0">
    <MetaTags
      title="Accueil"
      description="UNSAgglo defend les droits des agents territoriaux de la Communaute Roissy Pays de France."
      schema={ORG_SCHEMA}
    />
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background [perspective:800px]">
      <img
        src={cityBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center opacity-35 pointer-events-none z-0"
      />
      <WaveBackground />
      <img
        src={unsaLogo}
        alt="Logo UNSAgglo"
        className="w-[240px] md:w-[320px] h-auto mb-14 animate-fade-in-up relative z-10 logo-glow hover:animate-[spin-y_0.8s_ease-in-out]"
      />
      <EntryButton />
    </div>

    <section className="py-16 px-4 bg-background space-y-16">
      <HomeCTA />
      <NewsPreview />
      <RightsGrid />
    </section>
  </PageWrapper>
);

export default Home;
