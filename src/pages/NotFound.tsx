import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import UButton from "@/components/ui/UButton";
import { Link } from "react-router-dom";

const NotFoundPage = (): JSX.Element => {
  return (
    <PageWrapper>
      <MetaTags title="Page introuvable | UNSAgglo" description="La page demandee n'existe pas." noIndex />
      <section className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <h1 className="font-display text-6xl font-black text-primary mb-4">404</h1>
        <p className="text-xl text-foreground mb-2">Page introuvable</p>
        <p className="text-muted-foreground mb-8">La page que vous cherchez n'existe pas ou a ete deplacee.</p>
        <Link to="/">
          <UButton variant="primary" size="lg">Retour a l'accueil</UButton>
        </Link>
      </section>
    </PageWrapper>
  );
};

export default NotFoundPage;
