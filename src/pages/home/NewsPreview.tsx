import { Link } from "react-router-dom";
import UCard from "@/components/ui/UCard";
import UBadge from "@/components/ui/UBadge";
import Spinner from "@/components/ui/Spinner";
import { SectionTitle } from "@/components/sections";
import { useArticles } from "@/hooks/useArticles";

const CATEGORY_BADGE: Record<string, "info" | "success" | "warning" | "danger"> = {
  actualite: "info",
  tract: "warning",
  cr_cst: "success",
  fiche_droit: "danger",
};

const NewsPreview = (): JSX.Element => {
  const { articles, loading } = useArticles();
  const preview = articles.slice(0, 3);

  return (
    <div>
      <SectionTitle title="Dernieres actualites" />
      {loading ? (
        <div className="flex justify-center py-8"><Spinner size="lg" /></div>
      ) : preview.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">Aucune actualite pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {preview.map((article) => (
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
      )}
    </div>
  );
};

export default NewsPreview;
