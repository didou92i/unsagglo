import { useNavigate } from "react-router-dom";
import { MetaTags } from "@/components/seo";
import unsaLogo from "@/assets/unsa-logo.png";

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
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--color-cyan)] opacity-5 blur-[120px] pointer-events-none" />

        <img
          src={unsaLogo}
          alt="Logo UNSAgglo"
          className="w-[240px] md:w-[320px] h-auto mb-14 animate-fade-in-up relative z-10"
        />

        <button
          type="button"
          onClick={() => navigate("/news")}
          className="relative z-10 px-12 py-3.5 text-lg font-display font-bold tracking-widest uppercase bg-[var(--color-cyan)] text-primary-foreground rounded-full transition-all duration-300 hover:opacity-90 hover:shadow-lg cursor-pointer animate-fade-in-up [animation-delay:200ms]"
        >
          Entrer
        </button>
      </div>
    </>
  );
};

export default Home;
