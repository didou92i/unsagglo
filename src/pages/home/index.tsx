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
        <div className="absolute -top-20 -right-40 w-[600px] h-[600px] rounded-full bg-[var(--color-cyan)] opacity-20 blur-[80px] pointer-events-none z-0" />
        <div className="absolute -bottom-32 -left-28 w-[400px] h-[400px] rounded-full bg-[var(--color-cyan)] opacity-[0.18] blur-[60px] pointer-events-none z-0" />
        <div className="absolute top-10 -left-20 w-[250px] h-[250px] rounded-full bg-[var(--color-cyan)] opacity-[0.15] blur-[50px] pointer-events-none z-0" />

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
