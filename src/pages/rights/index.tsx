import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { SectionTitle } from "@/components/sections";
import RightsCard from "./RightsCard";
import { RIGHTS_CATEGORIES } from "./rightsData";

const RightsPage = (): JSX.Element => {
  const publishedCount = RIGHTS_CATEGORIES.filter((c) => c.published).length;
  const totalCount = RIGHTS_CATEGORIES.length;

  return (
    <PageWrapper>
      <MetaTags
        title="Vos Droits"
        description="Fiches pratiques sur vos droits dans la fonction publique territoriale : CITIS, congés, carrière, discipline, RPS, temps partiel."
      />
      <section className="px-4 md:px-6 py-12 max-w-6xl mx-auto">
        <SectionTitle
          title="Vos Droits"
          subtitle="Fiches pratiques pour connaître et défendre vos droits dans la fonction publique territoriale."
        />

        <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto -mt-4 mb-10">
          {publishedCount} fiche{publishedCount > 1 ? "s" : ""} disponible
          {publishedCount > 1 ? "s" : ""} sur {totalCount}. Les fiches restantes
          sont en cours de rédaction et seront publiées progressivement après
          validation juridique.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RIGHTS_CATEGORIES.map((cat) => (
            <RightsCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default RightsPage;
