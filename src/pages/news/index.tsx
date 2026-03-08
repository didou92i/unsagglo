import { useState } from "react";
import type { CategorieArticle } from "@/types";
import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { SectionTitle } from "@/components/sections";
import Spinner from "@/components/ui/Spinner";
import ArticleCard from "./ArticleCard";
import ArticleFilters from "./ArticleFilters";
import { useArticles } from "@/hooks/useArticles";

const NewsPage = (): JSX.Element => {
  const [filter, setFilter] = useState<CategorieArticle | "tous">("tous");
  const [search, setSearch] = useState<string>("");
  const { articles, loading } = useArticles(filter === "tous" ? undefined : filter);

  const filtered = articles.filter((a) => {
    if (search && !a.titre.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <PageWrapper>
      <MetaTags title="Actualites" description="Toutes les actualites syndicales UNSAgglo : tracts, comptes-rendus CST, fiches droits et actualites du territoire." />
      <section className="px-4 md:px-6 py-12 max-w-6xl mx-auto">
        <SectionTitle title="Actualites" />
        <ArticleFilters activeFilter={filter} onFilter={setFilter} search={search} onSearch={setSearch} />
        {loading ? (
          <div className="flex justify-center py-12"><Spinner size="lg" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={{ ...article, categorie: article.categorie as CategorieArticle, publie: true }} />
            ))}
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">Aucun article trouve.</p>
        )}
      </section>
    </PageWrapper>
  );
};

export default NewsPage;
