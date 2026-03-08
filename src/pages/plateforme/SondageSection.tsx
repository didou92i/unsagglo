import { SectionTitle } from "@/components/sections";
import { useSondages } from "./useSondages";
import SondageCard from "./SondageCard";
import PageLoader from "@/components/ui/PageLoader";

const SondageSection = (): JSX.Element => {
  const { sondages, loading, refresh } = useSondages();

  if (loading) return <PageLoader />;

  if (sondages.length === 0) {
    return (
      <section className="px-4 md:px-6 py-16">
        <SectionTitle title="Sondages" subtitle="Aucun sondage actif pour le moment." />
      </section>
    );
  }

  return (
    <section className="px-4 md:px-6 py-16">
      <SectionTitle
        title="Sondages thematiques"
        subtitle="Donnez votre avis sur les sujets cles."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {sondages.map((s) => (
          <SondageCard
            key={s.id}
            id={s.id}
            question={s.question}
            theme={s.theme}
            options={s.options}
            onVoted={refresh}
          />
        ))}
      </div>
    </section>
  );
};

export default SondageSection;
