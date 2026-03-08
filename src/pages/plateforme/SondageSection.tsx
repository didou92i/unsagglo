import { SectionTitle } from "@/components/sections";
import { useSondages } from "./useSondages";
import SondageCard from "./SondageCard";
import PageLoader from "@/components/ui/PageLoader";

const SondageSection = (): JSX.Element => {
  const { sondages, loading, refresh } = useSondages();

  if (loading) return <PageLoader />;

  if (sondages.length === 0) {
    return (
      <section id="sondages" className="px-4 md:px-6 py-16 bg-muted">
        <SectionTitle title="Sondages" subtitle="Aucun sondage actif pour le moment." />
      </section>
    );
  }

  return (
    <section id="sondages" className="px-4 md:px-6 py-16 bg-muted">
      <SectionTitle
        title="Sondages th&eacute;matiques"
        subtitle={"Et si le syndicalisme se r\u00e9inventait \u00e0 Roissy Pays de France ?\nDepuis janvier 2026, UNSAgglo Libres Ensemble porte une conviction simple : les 800 agents de la CARPF m\u00e9ritent une repr\u00e9sentation syndicale moderne, ind\u00e9pendante et \u00e0 leur \u00e9coute.\nUn syndicalisme qui dialogue plut\u00f4t qu\u2019il n\u2019affronte. Qui construit plut\u00f4t qu\u2019il ne subit. Qui vous associe aux d\u00e9cisions plut\u00f4t qu\u2019il ne d\u00e9cide \u00e0 votre place.\nAlors, dites-nous ce que vous en pensez."}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
