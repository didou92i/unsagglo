import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import PlatformHero from "./PlatformHero";
import ContribSection from "./ContribSection";
import WallSection from "./WallSection";
import SondageSection from "./SondageSection";
import WaveDivider from "./WaveDivider";

const PlateformePage = (): JSX.Element => (
  <PageWrapper>
    <MetaTags
      title="Plateforme Participative | UNSAgglo"
      description="Contribuez au programme 2026. Déposez vos idées et suivez en temps réel comment UNSAgglo les porte au CST."
    />
    <PlatformHero />
    <WaveDivider />
    <ContribSection />
    <WallSection />
    <WaveDivider />
    <SondageSection />
  </PageWrapper>
);

export default PlateformePage;
