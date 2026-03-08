import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import UBadge from "@/components/ui/UBadge";
import Divider from "@/components/ui/Divider";
import Spinner from "@/components/ui/Spinner";

interface ArticleRow {
  id: string;
  slug: string;
  titre: string;
  contenu: string;
  categorie: string;
  auteur: string;
  created_at: string;
}

const ArticleDetail = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleRow | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      const { data } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug ?? "")
        .eq("publie", true)
        .maybeSingle();
      setArticle(data as ArticleRow | null);
      setLoading(false);
    };
    fetch();
  }, [slug]);

  if (loading) return <PageWrapper><div className="flex justify-center py-20"><Spinner size="lg" /></div></PageWrapper>;

  if (!article) {
    return (
      <PageWrapper>
        <MetaTags title="Article introuvable" description="" noIndex />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
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
