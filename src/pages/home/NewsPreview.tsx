import { Link } from "react-router-dom";
import type { Article } from "@/types";
import UCard from "@/components/ui/UCard";
import UBadge from "@/components/ui/UBadge";
import { SectionTitle } from "@/components/sections";

const MOCK_ARTICLES: Article[] = [
  { id: "1", slug: "citis-maintien-ifse", titre: "CITIS : maintien de l'IFSE garanti", contenu: "La jurisprudence recente confirme le maintien integral du regime indemnitaire (IFSE) pendant toute la duree du CITIS. Une avancee majeure pour les agents victimes d'accidents de service.", categorie: "fiche_droit", auteur: "Bureau UNSAgglo", publie: true, created_at: "2026-02-15" },
  { id: "2", slug: "refus-conges-recours", titre: "Refus de conge : comment exercer votre recours", contenu: "Procedure detaillee pour contester un refus de conge annuel ou de RTT. Connaitre vos droits et les delais de recours administratif.", categorie: "actualite", auteur: "Bureau UNSAgglo", publie: true, created_at: "2026-02-01" },
  { id: "3", slug: "creation-unsagglo", titre: "Creation d'UNSAgglo -- Libres Ensemble", contenu: "Retour sur la creation de notre section syndicale inter-structures couvrant l'Agglo CRF, la DDT et la DRIHL sur le territoire Roissy Pays de France.", categorie: "actualite", auteur: "Bureau UNSAgglo", publie: true, created_at: "2026-01-10" },
];

const CATEGORY_BADGE: Record<string, "info" | "success" | "warning" | "danger"> = {
  actualite: "info",
  tract: "warning",
  cr_cst: "success",
  fiche_droit: "danger",
};

const NewsPreview = (): JSX.Element => {
  return (
    <div>
      <SectionTitle title="Dernieres actualites" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {MOCK_ARTICLES.map((article) => (
          <UCard key={article.id}>
            <UBadge variant={CATEGORY_BADGE[article.categorie] ?? "neutral"}>
              {article.categorie.replace("_", " ")}
            </UBadge>
            <h3 className="font-display text-xl font-bold text-foreground mt-3">
              {article.titre}
            </h3>
            <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
              {article.contenu}
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              {new Date(article.created_at).toLocaleDateString("fr-FR")}
            </p>
            <Link to={`/news/${article.slug}`} className="text-primary font-semibold text-sm mt-2 inline-block hover:underline">
              Lire la suite &rarr;
            </Link>
          </UCard>
        ))}
      </div>
    </div>
  );
};

export default NewsPreview;
