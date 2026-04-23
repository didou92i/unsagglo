import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import WarningBanner from "./WarningBanner";
import Hero from "./Hero";
import KeyFigures from "./KeyFigures";
import InBrief from "./InBrief";
import ThreeSteps from "./ThreeSteps";
import SimulatorPlaceholder from "./SimulatorPlaceholder";
import Faq from "./Faq";
import ContactCta from "./ContactCta";

const AideCarburantPage = (): JSX.Element => (
  <PageWrapper>
    <MetaTags
      title="Aide carburant 50 €"
      description="Dispositif État avril–juin 2026 : vérifiez votre éligibilité au forfait carburant de 50 €. UNSAgglo vous accompagne."
      canonical="https://unsagglo.fr/aide-carburant"
    />
    <WarningBanner />
    <Hero />
    <KeyFigures />
    <InBrief />
    <ThreeSteps />
    <SimulatorPlaceholder />
    <Faq />
    <ContactCta />
  </PageWrapper>
);

export default AideCarburantPage;
