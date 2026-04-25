import { PenLine, Handshake } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import StepHeader from "./StepHeader";
import ChoiceCard from "./ChoiceCard";
import ListeElectoraleFields from "../ListeElectoraleFields";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { ContribFormData } from "../contribSchema";

interface StepListeProps {
  willJoin: boolean;
  onChange: (v: boolean) => void;
  register: UseFormRegister<ContribFormData>;
  errors: FieldErrors<ContribFormData>;
}

const StepListe = ({
  willJoin,
  onChange,
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
        <div className="flex items-start gap-2 mb-3">
          <Checkbox id="liste_confirm" checked disabled />
          <label htmlFor="liste_confirm" className="text-xs text-secondary leading-relaxed">
            En cochant, vous nous transmettez vos coordonnées (strictement
            confidentielles, accessibles uniquement aux responsables UNSAgglo
            habilités, jamais publiées ni transmises à des tiers).
          </label>
        </div>
        <ListeElectoraleFields register={register} errors={errors} />
      </div>
    )}
  </div>
);

export default StepListe;
