import { PenLine, Handshake } from "lucide-react";
import StepHeader from "./StepHeader";
import ChoiceCard from "./ChoiceCard";
import ListeElectoraleFields from "../ListeElectoraleFields";
import { RGPDConsent } from "@/components/forms";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { ContribFormData } from "../contribSchema";

interface StepListeProps {
  willJoin: boolean;
  onChange: (v: boolean) => void;
  listeConsent: boolean;
  onListeConsentChange: (v: boolean) => void;
  listeConsentError?: string | null;
  register: UseFormRegister<ContribFormData>;
  errors: FieldErrors<ContribFormData>;
}

const StepListe = ({
  willJoin,
  onChange,
  listeConsent,
  onListeConsentChange,
  listeConsentError,
  register,
  errors,
}: StepListeProps): JSX.Element => (
  <div>
    <StepHeader
      eyebrow="Question 5 (facultative)"
      title="Et si vous nous rejoigniez sur la liste 2026 ?"
      subtitle="Pas obligatoire — vous pouvez contribuer sans rejoindre la liste. Mais si l'envie est là, c'est ici que ça commence."
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
      <ChoiceCard
        selected={!willJoin}
        onClick={() => onChange(false)}
        icon={PenLine}
        title="Juste contribuer"
        description="Je dépose mon idée, sans m'engager au-delà."
      />
      <ChoiceCard
        selected={willJoin}
        onClick={() => onChange(true)}
        icon={Handshake}
        title="Rejoindre la liste UNSAgglo 2026"
        description="Je veux candidater aux élections de décembre 2026."
      />
    </div>

    {willJoin && (
      <div className="rounded-md p-4" style={{ backgroundColor: "#eff9fe" }}>
        <ListeElectoraleFields register={register} errors={errors} />
        <RGPDConsent
          id="liste-rgpd"
          variant="candidature"
          checked={listeConsent}
          onCheckedChange={onListeConsentChange}
          error={listeConsentError ?? undefined}
        />
      </div>
    )}
  </div>
);

export default StepListe;
