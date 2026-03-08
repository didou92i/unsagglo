import { useState } from "react";
import type { Article, CategorieArticle } from "@/types";
import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { SectionTitle } from "@/components/sections";
import ArticleCard from "./ArticleCard";
import ArticleFilters from "./ArticleFilters";

const MOCK_ARTICLES: Article[] = [
  { id: "1", slug: "citis-maintien-ifse", titre: "CITIS : maintien de l'IFSE garanti", contenu: "La jurisprudence recente confirme le maintien integral du regime indemnitaire (IFSE) pendant toute la duree du CITIS.", categorie: "fiche_droit", auteur: "Bureau UNSAgglo", publie: true, created_at: "2026-02-15" },
  { id: "2", slug: "refus-conges-recours", titre: "Refus de conge : comment exercer votre recours", contenu: "Procedure detaillee pour contester un refus de conge annuel ou de RTT aupres de votre administration.", categorie: "actualite", auteur: "Bureau UNSAgglo", publie: true, created_at: "2026-02-01" },
  { id: "3", slug: "creation-unsagglo", titre: "Creation d'UNSAgglo -- Libres Ensemble", contenu: "Retour sur la creation de notre section syndicale inter-structures sur le territoire Roissy Pays de France.", categorie: "actualite", auteur: "Bureau UNSAgglo", publie: true, created_at: "2026-01-10" },
  { id: "4", slug: "tract-elections-2026", titre: "Tract : Preparez les elections 2026", contenu: "Decouvrez nos engagements pour les elections professionnelles de decembre 2026.", categorie: "tract", auteur: "Bureau UNSAgglo", publie: true, created_at: "2026-03-01" },
  { id: "5", slug: "cr-cst-fevrier", titre: "Compte-rendu CST de fevrier 2026", contenu: "Les points abordes lors du comite social territorial : conditions de travail, RIFSEEP, mobilite.", categorie: "cr_cst", auteur: "Bureau UNSAgglo", publie: true, created_at: "2026-02-20" },
  { id: "6", slug: "temps-partiel-droits", titre: "Temps partiel : vos droits en detail", contenu: "Tout savoir sur le temps partiel de droit et sur autorisation dans la fonction publique territoriale.", categorie: "fiche_droit", auteur: "Bureau UNSAgglo", publie: true, created_at: "2026-01-25" },
];

const NewsPage = (): JSX.Element => {
  const [filter, setFilter] = useState<CategorieArticle | "tous">("tous");
  const [search, setSearch] = useState<string>("");

  const filtered = MOCK_ARTICLES.filter((a) => {
    if (filter !== "tous" && a.categorie !== filter) return false;
    if (search && !a.titre.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <PageWrapper>
      <MetaTags title="Actualites" description="Toutes les actualites syndicales UNSAgglo : tracts, comptes-rendus CST, fiches droits et actualites du territoire." />
      <section className="px-4 md:px-6 py-12 max-w-6xl mx-auto">
        <SectionTitle title="Actualites" />
        <ArticleFilters activeFilter={filter} onFilter={setFilter} search={search} onSearch={setSearch} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">Aucun article trouve.</p>
        )}
      </section>
    </PageWrapper>
  );
};

export default NewsPage;
