import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { Link } from "react-router-dom";
import UButton from "@/components/ui/UButton";

interface StoredAdhesion {
  prenom: string;
  email: string;
}

const ConfirmationPage = (): JSX.Element => {
  let data: StoredAdhesion | null = null;
  if (typeof window !== "undefined") {
    const stored = sessionStorage.getItem("unsagglo:lastAdhesion");
    if (stored) {
      try {
        data = JSON.parse(stored) as StoredAdhesion;
      } catch {
        data = null;
      }
    }
  }

  return (
    <PageWrapper>
      <MetaTags
        title="Demande d'adhésion enregistrée"
        description="Votre demande d'adhésion à UNSAgglo a été enregistrée."
        noIndex
      />
      <article className="max-w-2xl mx-auto px-4 md:px-6 py-16 text-center">
        <h1 className="font-display text-3xl font-medium text-secondary mb-4">
          Demande enregistrée
        </h1>
        {data && (
          <p className="text-foreground mb-2">Merci, {data.prenom}.</p>
        )}
        <p className="text-muted-foreground leading-relaxed">
          Votre demande d'adhésion à UNSAgglo a bien été reçue et sera examinée
          par le bureau dans les meilleurs délais. Vous recevrez une
          confirmation et les modalités de versement de votre cotisation à
          l'adresse indiquée
          {data?.email && <> ({data.email})</>}.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/">
            <UButton variant="outline">Retour à l'accueil</UButton>
          </Link>
          <Link to="/plateforme">
            <UButton variant="primary">Découvrir la plateforme</UButton>
          </Link>
        </div>
      </article>
    </PageWrapper>
  );
};

export default ConfirmationPage;
