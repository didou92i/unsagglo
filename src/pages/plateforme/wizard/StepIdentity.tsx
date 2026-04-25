import { SelectField, InputField } from "@/components/forms";
import { SERVICE_GROUPS } from "@/constants/services";
import { STATUT_GROUPS } from "@/constants/statuts";
import { Checkbox } from "@/components/ui/checkbox";
import StepHeader from "./StepHeader";
import ChoiceCard from "./ChoiceCard";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { ContribFormData } from "../contribSchema";

interface StepIdentityProps {
  anonyme: boolean;
  onAnonymeChange: (v: boolean) => void;
  register: UseFormRegister<ContribFormData>;
  errors: FieldErrors<ContribFormData>;
  willJoinList: boolean;
}

const StepIdentity = ({
  anonyme,
  onAnonymeChange,
  register,
  errors,
  willJoinList,
}: StepIdentityProps): JSX.Element => (
  <div>
    <StepHeader
      eyebrow="Question 4"
      title="Comment voulez-vous être identifié·e ?"
      subtitle="Vous décidez. UNSAgglo n'utilise vos coordonnées que pour assurer le suivi de votre contribution — jamais à des fins commerciales."
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
      <ChoiceCard
        selected={anonyme && !willJoinList}
        onClick={() => !willJoinList && onAnonymeChange(true)}
        emoji="🕶️"
        title="Anonyme"
        description="Aucune information identifiante n'est conservée."
      />
      <ChoiceCard
        selected={!anonyme}
        onClick={() => onAnonymeChange(false)}
        emoji="✋"
        title="Avec mon prénom"
        description="UNSAgglo peut revenir vers vous si besoin."
      />
    </div>

    {willJoinList && (
      <p className="text-xs text-muted-foreground mb-4 italic">
        Anonymat désactivé : vous avez choisi de rejoindre la liste 2026 à
        l'étape précédente.
      </p>
    )}

    {!anonyme && (
      <InputField<ContribFormData>
        label="Prénom"
        name="prenom"
        register={register}
        error={errors.prenom}
        placeholder="Votre prénom"
        required={willJoinList}
      />
    )}
    <SelectField<ContribFormData>
      label="Service / Direction"
      name="service"
      register={register}
      error={errors.service}
      groups={SERVICE_GROUPS}
    />
    <SelectField<ContribFormData>
      label="Votre statut"
      name="statut"
      register={register}
      error={errors.statut}
      groups={STATUT_GROUPS}
    />

    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
      <Checkbox
        id="confirm_anon_pref"
        checked={anonyme}
        onCheckedChange={(c) => !willJoinList && onAnonymeChange(c === true)}
        disabled={willJoinList}
      />
      <label htmlFor="confirm_anon_pref" className="cursor-pointer">
        Garder ma contribution anonyme
      </label>
    </div>
  </div>
);

export default StepIdentity;
