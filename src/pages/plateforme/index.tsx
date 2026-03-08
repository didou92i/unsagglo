import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import PlatformHero from "./PlatformHero";
import ContribSection from "./ContribSection";
import SondageSection from "./SondageSection";
import WaveDivider from "./WaveDivider";

const PlateformePage = (): JSX.Element => (
  <PageWrapper>
    <MetaTags
      title="Plateforme Participative | UNSAgglo"
      description="Contribuez au programme 2026. D&eacute;posez vos id&eacute;es et participez aux sondages th&eacute;matiques."
    />
    <PlatformHero />
    <WaveDivider />
    <ContribSection />
    <WaveDivider />
    <SondageSection />
  </PageWrapper>
);

export default PlateformePage;
