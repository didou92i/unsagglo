import { MetaTags } from "@/components/seo";
import unsaLogo from "@/assets/unsa-logo.png";
import cityBg from "@/assets/city-background.png";
import WaveBackground from "@/pages/home/WaveBackground";
import EntryButton from "@/pages/home/EntryButton";

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "UNSAgglo -- Libres Ensemble",
  description: "Syndicat UNSA representant les agents de la Communaute Roissy Pays de France",
  url: "https://unsagglo.fr",
  email: "unsagglo@unsa.org",
};

const Home = (): JSX.Element => (
    <>
      <MetaTags
        title="Accueil"
        description="UNSAgglo defend les droits des agents territoriaux de la Communaute Roissy Pays de France."
        schema={ORG_SCHEMA}
      />
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background">
        <img
          src={cityBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center opacity-20 pointer-events-none z-0"
        />
        <WaveBackground />

        <img
          src={unsaLogo}
          alt="Logo UNSAgglo"
          className="w-[240px] md:w-[320px] h-auto mb-14 animate-fade-in-up relative z-10 drop-shadow-2xl transition-transform duration-500 hover:scale-105"
          style={{ filter: "drop-shadow(0 0 12px rgba(0,157,230,0.35)) drop-shadow(0 4px 24px rgba(0,157,230,0.18))" }}
        />

        <EntryButton />
      </div>
    </>
);


export default Home;
