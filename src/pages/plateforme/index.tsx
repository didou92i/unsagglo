import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import PlatformHero from "./PlatformHero";
import ContribSection from "./ContribSection";
import ListeElectoraleSection from "./ListeElectoraleSection";
import SondageSection from "./SondageSection";

const PlateformePage = (): JSX.Element => (
  <PageWrapper>
    <MetaTags
      title="Plateforme Participative | UNSAgglo"
      description="Contribuez au programme 2026. Deposez vos idees et participez aux sondages thematiques."
    />
    <PlatformHero />
    <ContribSection />
    <ListeElectoraleSection />
    <SondageSection />
  </PageWrapper>
);

export default PlateformePage;
