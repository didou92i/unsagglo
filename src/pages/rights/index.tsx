import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { SectionTitle } from "@/components/sections";
import RightsCard from "./RightsCard";
import { RIGHTS_CATEGORIES } from "./rightsData";

const RightsPage = (): JSX.Element => {
  return (
    <PageWrapper>
      <MetaTags title="Vos Droits" description="Retrouvez toutes les fiches pratiques sur vos droits : CITIS, conges, carriere, discipline, RPS, temps partiel." />
      <section className="px-4 md:px-6 py-12 max-w-6xl mx-auto">
        <SectionTitle title="Vos Droits" subtitle="Fiches pratiques pour connaitre et defendre vos droits dans la fonction publique." />
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
