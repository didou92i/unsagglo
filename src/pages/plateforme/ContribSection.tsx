import { MessageSquarePlus } from "lucide-react";
import { useContribSubmit } from "@/hooks/useContribSubmit";
import { useCandidatSubmit } from "@/hooks/useCandidatSubmit";
import { SectionTitle } from "@/components/sections";
import UCard from "@/components/ui/UCard";
import ContribSuccess from "./ContribSuccess";
import ContribForm from "./ContribForm";

const ContribSection = (): JSX.Element => {
  const contrib = useContribSubmit();
  const candidat = useCandidatSubmit();

  if (contrib.success) {
    return <ContribSuccess candidature={candidat.success} />;
  }

  return (
    <section id="contribution" className="px-4 md:px-6 py-16 bg-background">
      <div className="flex items-center justify-center gap-3 mb-2">
        <MessageSquarePlus className="h-7 w-7 text-primary" />
        <SectionTitle
          title="D&eacute;posez votre contribution"
          subtitle="Partagez vos id&eacute;es pour le programme 2026."
        />
      </div>
      <UCard className="max-w-2xl mx-auto border-l-4 border-l-primary">
        <ContribForm contrib={contrib} candidat={candidat} />
      </UCard>
    </section>
  );
};

export default ContribSection;
