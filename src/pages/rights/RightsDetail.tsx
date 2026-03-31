import { useParams, Link } from "react-router-dom";
import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { SectionTitle } from "@/components/sections";
import { RIGHTS_CATEGORIES } from "./rightsData";
import { useRightsContent } from "@/hooks/useRightsContent";
import RightsContentView from "./RightsContentView";

const RightsDetail = (): JSX.Element => {
  const { categorie } = useParams<{ categorie: string }>();
  const cat = RIGHTS_CATEGORIES.find((c) => c.id === categorie);

  if (!cat) {
    return (
      <PageWrapper>
        <MetaTags title="Droit introuvable" description="" noIndex />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-black text-foreground">
            Categorie introuvable
          </h1>
          <Link to="/rights" className="text-primary font-semibold mt-4 inline-block hover:underline">
            Retour a Vos Droits
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <MetaTags title={cat.titre} description={cat.description} />
      <article className="max-w-3xl mx-auto px-4 md:px-6 py-12">
        <SectionTitle title={cat.titre} subtitle={cat.description} align="left" accentColor={cat.color} />
        <RightsContentView categorie={cat.id} titre={cat.titre} />
        <Link to="/rights" className="text-primary font-semibold mt-8 inline-block hover:underline">
          &larr; Retour a Vos Droits
        </Link>
      </article>
    </PageWrapper>
  );
};

export default RightsDetail;
