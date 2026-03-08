import { useParams, Link } from "react-router-dom";
import type { Article } from "@/types";
import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import UBadge from "@/components/ui/UBadge";
import Divider from "@/components/ui/Divider";

const MOCK_ARTICLES: Article[] = [
  { id: "1", slug: "citis-maintien-ifse", titre: "CITIS : maintien de l'IFSE garanti", contenu: "La jurisprudence recente confirme le maintien integral du regime indemnitaire (IFSE) pendant toute la duree du CITIS. Cette decision fait suite a plusieurs arrets de cours administratives d'appel qui ont juge que le regime indemnitaire, y compris l'IFSE, devait etre maintenu dans son integralite pendant la periode de conge pour invalidite temporaire imputable au service.\n\nCette avancee est majeure pour les agents victimes d'accidents de service ou de maladies professionnelles. Elle met fin a une pratique de certaines collectivites qui suspendaient le versement de l'IFSE pendant le CITIS.\n\nUNSAgglo vous accompagne dans vos demarches de recours si votre collectivite ne respecte pas cette obligation.", categorie: "fiche_droit", auteur: "Bureau UNSAgglo", publie: true, created_at: "2026-02-15" },
  { id: "2", slug: "refus-conges-recours", titre: "Refus de conge : comment exercer votre recours", contenu: "Vous avez formule une demande de conge annuel ou de RTT et celle-ci a ete refusee ? Voici la procedure a suivre.\n\n1. Demandez une notification ecrite du refus avec les motifs\n2. Verifiez que les motifs invoques sont conformes a la reglementation\n3. Deposez un recours gracieux aupres de votre autorite territoriale dans un delai de 2 mois\n4. En cas de rejet, saisissez le tribunal administratif\n\nUNSAgglo peut vous accompagner a chaque etape de cette procedure.", categorie: "actualite", auteur: "Bureau UNSAgglo", publie: true, created_at: "2026-02-01" },
  { id: "3", slug: "creation-unsagglo", titre: "Creation d'UNSAgglo -- Libres Ensemble", contenu: "UNSAgglo est ne de la volonte de creer une representation syndicale forte et unifiee sur le territoire Roissy Pays de France. Notre section couvre trois structures : la Communaute d'Agglomeration Roissy Pays de France (CARPF), la Direction Departementale des Territoires (DDT) et la Direction Regionale et Interdepartementale de l'Hebergement et du Logement (DRIHL).\n\nNotre devise 'Libres Ensemble' traduit notre engagement pour une action syndicale independante, transparente et au service de tous les agents.", categorie: "actualite", auteur: "Bureau UNSAgglo", publie: true, created_at: "2026-01-10" },
  { id: "4", slug: "tract-elections-2026", titre: "Tract : Preparez les elections 2026", contenu: "Les elections professionnelles de decembre 2026 approchent. UNSAgglo se prepare activement pour vous representer au mieux dans les instances du dialogue social.\n\nNos engagements portent sur la remuneration, les conditions de travail, la prevention des risques psychosociaux et l'evolution de carriere.", categorie: "tract", auteur: "Bureau UNSAgglo", publie: true, created_at: "2026-03-01" },
  { id: "5", slug: "cr-cst-fevrier", titre: "Compte-rendu CST de fevrier 2026", contenu: "Lors du comite social territorial de fevrier 2026, les sujets suivants ont ete abordes : conditions de travail dans les services techniques, mise en oeuvre du RIFSEEP, mobilite inter-services et plan de formation 2026.", categorie: "cr_cst", auteur: "Bureau UNSAgglo", publie: true, created_at: "2026-02-20" },
  { id: "6", slug: "temps-partiel-droits", titre: "Temps partiel : vos droits en detail", contenu: "Le temps partiel dans la fonction publique territoriale peut etre de droit (pour certaines situations familiales) ou sur autorisation. Decouvrez vos droits, les quotites possibles (50%, 60%, 70%, 80%, 90%) et l'impact sur votre remuneration et vos droits a la retraite.", categorie: "fiche_droit", auteur: "Bureau UNSAgglo", publie: true, created_at: "2026-01-25" },
];

const ArticleDetail = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();
  const article = MOCK_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <PageWrapper>
        <MetaTags title="Article introuvable" description="Cet article n'existe pas." noIndex />
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-20 text-center">
          <h1 className="font-display text-3xl font-black text-foreground">Article introuvable</h1>
          <Link to="/news" className="text-primary font-semibold mt-4 inline-block hover:underline">Retour aux actualites</Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <MetaTags
        title={article.titre}
        description={article.contenu.slice(0, 160)}
        schema={{ "@context": "https://schema.org", "@type": "Article", headline: article.titre, author: { "@type": "Organization", name: article.auteur }, datePublished: article.created_at, publisher: { "@type": "Organization", name: "UNSAgglo -- Libres Ensemble" } }}
      />
      <article className="max-w-3xl mx-auto px-4 md:px-6 py-12">
        <UBadge variant="info">{article.categorie.replace("_", " ")}</UBadge>
        <span className="text-muted-foreground text-sm ml-3">{new Date(article.created_at).toLocaleDateString("fr-FR")}</span>
        <h1 className="font-display text-3xl md:text-4xl font-black text-foreground mt-4">{article.titre}</h1>
        <p className="text-muted-foreground text-sm mt-2">Par {article.auteur}</p>
        <Divider />
        <div className="text-lg leading-relaxed text-foreground whitespace-pre-line">{article.contenu}</div>
        <Divider />
        <Link to="/news" className="text-primary font-semibold hover:underline">&larr; Retour aux actualites</Link>
      </article>
    </PageWrapper>
  );
};

export default ArticleDetail;
