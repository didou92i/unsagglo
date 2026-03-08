import { useNavigate } from "react-router-dom";
import { MetaTags } from "@/components/seo";
import UButton from "@/components/ui/UButton";
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <img
          src={unsaLogo}
          alt="Logo UNSAgglo"
          className="w-[200px] md:w-[280px] h-auto mb-12"
        />
        <UButton
          variant="primary"
          size="lg"
          onClick={() => navigate("/news")}
        >
          Entrer
        </UButton>
      </div>
    </>
  );
};

export default Home;
