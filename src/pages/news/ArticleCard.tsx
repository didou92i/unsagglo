import type { Article, CategorieArticle } from "@/types";
import { Link } from "react-router-dom";
import UCard from "@/components/ui/UCard";
import UBadge from "@/components/ui/UBadge";

interface ArticleCardProps {
  article: Article;
}

const CATEGORY_LABELS: Record<CategorieArticle, string> = {
  actualite: "Actualite",
  tract: "Tract",
  cr_cst: "CR CST",
  fiche_droit: "Fiche droits",
};

const CATEGORY_VARIANT: Record<CategorieArticle, "info" | "success" | "warning" | "danger"> = {
  actualite: "info",
  tract: "warning",
  cr_cst: "success",
  fiche_droit: "danger",
};

const ArticleCard = ({ article }: ArticleCardProps): JSX.Element => {
  return (
    <UCard>
      <UBadge variant={CATEGORY_VARIANT[article.categorie]}>
        {CATEGORY_LABELS[article.categorie]}
      </UBadge>
      <h3 className="font-display text-xl font-bold text-foreground mt-3">
        {article.titre}
      </h3>
      <p className="text-muted-foreground text-sm mt-2 line-clamp-3">
        {article.contenu.slice(0, 120)}...
      </p>
      <p className="text-xs text-muted-foreground mt-4">
        {article.auteur} - {new Date(article.created_at).toLocaleDateString("fr-FR")}
      </p>
      <Link to={`/news/${article.slug}`} className="text-primary font-semibold text-sm mt-2 inline-block hover:underline">
        Lire l'article &rarr;
      </Link>
    </UCard>
  );
};

export default ArticleCard;
