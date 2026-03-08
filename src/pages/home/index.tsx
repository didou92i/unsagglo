import { useNavigate } from "react-router-dom";
import { MetaTags } from "@/components/seo";
import unsaLogo from "@/assets/unsa-logo.png";
import WaveBackground from "@/pages/home/WaveBackground";

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "UNSAgglo -- Libres Ensemble",
  description: "Syndicat UNSA representant les agents de la Communaute Roissy Pays de France",
  url: "https://unsagglo.fr",
  email: "unsagglo@unsa.org",
};

const Home = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <>
      <MetaTags
        title="Accueil"
        description="UNSAgglo defend les droits des agents territoriaux de la Communaute Roissy Pays de France."
        schema={ORG_SCHEMA}
      />
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background">
        <WaveBackground />

        <img
          src={unsaLogo}
          alt="Logo UNSAgglo"
          className="w-[240px] md:w-[320px] h-auto mb-14 animate-fade-in-up relative z-10 drop-shadow-2xl transition-transform duration-500 hover:scale-105"
          style={{ filter: "drop-shadow(0 0 12px rgba(0,157,230,0.35)) drop-shadow(0 4px 24px rgba(0,157,230,0.18))" }}
        />

        <button
          type="button"
          onClick={() => navigate("/news")}
          className="relative z-10 px-12 py-3.5 text-lg font-display font-bold tracking-widest uppercase bg-transparent border-2 border-[#009de6] text-[#009de6] rounded-full transition-all duration-300 hover:bg-[#009de6]/10 hover:shadow-lg cursor-pointer animate-fade-in-up [animation-delay:200ms]"
        >
          Entrer
        </button>
      </div>
    </>
  );
};

export default Home;
