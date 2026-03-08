import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";

const LegalPage = (): JSX.Element => {
  return (
    <PageWrapper>
      <MetaTags title="Mentions legales" description="Mentions legales et politique de confidentialite du site UNSAgglo." noIndex />
      <article className="max-w-3xl mx-auto px-4 md:px-6 py-12">
        <h1 className="font-display text-3xl font-black text-foreground mb-8">Mentions legales</h1>

        <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">Editeur</h2>
        <p className="text-foreground leading-relaxed">UNSAgglo -- Libres Ensemble, section syndicale UNSA du territoire Roissy Pays de France. Couvre les agents de la Communaute d'Agglomeration Roissy Pays de France (CARPF), de la DDT et de la DRIHL.</p>

        <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">Hebergeur</h2>
        <p className="text-foreground leading-relaxed">Site heberge par Lovable / Netlify.</p>

        <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">Collecte de donnees</h2>
        <p className="text-foreground leading-relaxed">Les donnees collectees via les formulaires (adhesion : nom, prenom, email, service, grade ; contact : nom, email, message) sont traitees dans le respect du RGPD.</p>

        <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">Base legale</h2>
        <p className="text-foreground leading-relaxed">Art. 6.1.b RGPD (execution d'un contrat d'adhesion) et Art. 6.1.f RGPD (interet legitime pour la representation syndicale).</p>

        <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">Vos droits</h2>
        <p className="text-foreground leading-relaxed">Conformement aux articles 13 et 14 du RGPD, vous disposez d'un droit d'acces, de rectification et de suppression de vos donnees. Contactez : unsagglo@unsa.org</p>

        <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">Conservation</h2>
        <p className="text-foreground leading-relaxed">Les donnees sont conservees pendant la duree de l'adhesion + 3 ans.</p>

        <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3">Cookies</h2>
        <p className="text-foreground leading-relaxed">Ce site n'utilise aucun cookie tiers. Aucun tracking publicitaire n'est mis en oeuvre.</p>
      </article>
    </PageWrapper>
  );
};

export default LegalPage;
