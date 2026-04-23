import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import WarningBanner from "./WarningBanner";
import Hero from "./Hero";
import KeyFigures from "./KeyFigures";
import InBrief from "./InBrief";
import ThreeSteps from "./ThreeSteps";
import SimulatorSection from "./SimulatorSection";
import Faq from "./Faq";
import ContactCta from "./ContactCta";
import { FAQ_ITEMS } from "./faqData";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const AideCarburantPage = (): JSX.Element => (
  <PageWrapper>
    <MetaTags
      title="Aide carburant 50 €"
      description="Dispositif État avril–juin 2026 : vérifiez votre éligibilité au forfait carburant de 50 €. UNSAgglo vous accompagne."
      canonical="https://unsagglo.fr/aide-carburant"
      schema={faqSchema}
    />
    <WarningBanner />
    <Hero />
    <KeyFigures />
    <InBrief />
    <ThreeSteps />
    <SimulatorSection />
    <Faq />
    <ContactCta />
  </PageWrapper>
);

export default AideCarburantPage;
