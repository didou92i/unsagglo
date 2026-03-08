import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { SectionTitle } from "@/components/sections";
import Divider from "@/components/ui/Divider";
import { Link } from "react-router-dom";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Qu'est-ce que le CITIS ?", acceptedAnswer: { "@type": "Answer", text: "Le Conge pour Invalidite Temporaire Imputable au Service (CITIS) est un conge accorde aux fonctionnaires victimes d'un accident de service ou d'une maladie professionnelle. Il garantit le maintien integral du traitement." } },
    { "@type": "Question", name: "L'IFSE est-elle maintenue pendant le CITIS ?", acceptedAnswer: { "@type": "Answer", text: "Oui, la jurisprudence recente confirme que l'IFSE (Indemnite de Fonctions, de Sujetions et d'Expertise) doit etre maintenue integralement pendant toute la duree du CITIS." } },
    { "@type": "Question", name: "Comment declarer un accident de service ?", acceptedAnswer: { "@type": "Answer", text: "Vous devez declarer l'accident dans les 48h aupres de votre autorite territoriale, remplir le formulaire de declaration et fournir un certificat medical initial." } },
  ],
};

const CitisPage = (): JSX.Element => {
  return (
    <PageWrapper>
      <MetaTags title="CITIS -- Conge invalidite imputable au service" description="Tout savoir sur le CITIS : definition, maintien du traitement et de l'IFSE, procedure de declaration, recours possibles." schema={FAQ_SCHEMA} />
      <article className="max-w-3xl mx-auto px-4 md:px-6 py-12">
        <SectionTitle title="CITIS" subtitle="Conge pour Invalidite Temporaire Imputable au Service" align="left" accentColor="var(--color-red)" />

        <h3 className="font-display text-xl font-bold text-foreground mt-8">Definition</h3>
        <p className="text-foreground mt-2 leading-relaxed">Le CITIS remplace l'ancien conge pour accident de service ou maladie professionnelle depuis le decret du 21 fevrier 2019. Il s'applique a tous les fonctionnaires titulaires et stagiaires.</p>

        <h3 className="font-display text-xl font-bold text-foreground mt-8">Principe : maintien integral du traitement</h3>
        <p className="text-foreground mt-2 leading-relaxed">Pendant toute la duree du CITIS, l'agent conserve l'integralite de son traitement indiciaire, de la NBI et du regime indemnitaire (IFSE). La jurisprudence recente des cours administratives d'appel a confirme ce principe.</p>

        <h3 className="font-display text-xl font-bold text-foreground mt-8">Procedure de declaration</h3>
        <ol className="list-decimal list-inside text-foreground mt-2 space-y-2 leading-relaxed">
          <li>Declarer l'accident dans les 48 heures</li>
          <li>Fournir le certificat medical initial</li>
          <li>L'administration dispose de 30 jours pour statuer</li>
          <li>En l'absence de reponse, le CITIS est repute accorde</li>
        </ol>

        <h3 className="font-display text-xl font-bold text-foreground mt-8">Recours possibles</h3>
        <p className="text-foreground mt-2 leading-relaxed">En cas de refus : recours administratif prealable obligatoire (RAPO) devant la commission de reforme, puis saisine du tribunal administratif. UNSAgglo vous accompagne dans ces demarches.</p>

        <Divider />
        <Link to="/rights" className="text-primary font-semibold hover:underline">&larr; Retour a Vos Droits</Link>
      </article>
    </PageWrapper>
  );
};

export default CitisPage;
