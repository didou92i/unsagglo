import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { ElectoralTransparencyBanner, SectionTitle } from "@/components/sections";
import Hero from "./Hero";
import WhyUnsagglo from "./WhyUnsagglo";
import HowToVote from "./HowToVote";
import ProgramSection from "./ProgramSection";

const ElectionsPage = (): JSX.Element => (
  <PageWrapper>
    <MetaTags
      title="Élections 2026"
      description="UNSAgglo se présente pour la première fois aux élections professionnelles de la CARPF en décembre 2026. Programme co-construit avec les agents, transparence totale."
    />
    <Hero />
    <section className="px-4 md:px-6 py-10 bg-white">
      <div className="max-w-3xl mx-auto">
        <ElectoralTransparencyBanner />
      </div>
    </section>
    <WhyUnsagglo />
    <HowToVote />

    <section
      id="programme"
      className="px-4 md:px-6 py-20 bg-white scroll-mt-24"
    >
      <SectionTitle title="Calendrier électoral" />
      <ProgramSection />
    </section>

    <section
      id="contribution"
      className="px-4 md:px-6 py-20"
      style={{ backgroundColor: "#29235c" }}
    >
      <div className="max-w-3xl mx-auto text-center text-white">
        <h2 className="font-display font-medium text-3xl md:text-4xl leading-tight">
          Faites entendre votre voix
        </h2>
        <p className="text-sm md:text-base text-white/85 mt-4 max-w-xl mx-auto leading-relaxed">
          Le programme UNSAgglo se construit en ce moment, contribution après
          contribution. Déposez la vôtre — anonymement si vous préférez.
        </p>
        <div className="mt-8 flex justify-center">
          <Link to="/plateforme#contribution">
            <button
              type="button"
              className="group inline-flex items-center gap-2 text-white text-sm font-medium rounded-[6px] px-7 py-3 transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#009fe3" }}
            >
              Accéder à la plateforme
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </button>
          </Link>
        </div>
      </div>
    </section>
  </PageWrapper>
);

export default ElectionsPage;
