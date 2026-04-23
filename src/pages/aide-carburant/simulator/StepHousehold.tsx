import OptionButton from "./OptionButton";
import StepTitle from "./StepTitle";
import type { HouseholdShares } from "./types";

interface Option {
  value: HouseholdShares;
  label: string;
  description: string;
}

const OPTIONS: Option[] = [
  { value: "1", label: "1 part", description: "Célibataire, divorcé, veuf sans enfant" },
  { value: "1.5", label: "1,5 part", description: "Célibataire avec 1 enfant" },
  { value: "2", label: "2 parts", description: "Couple marié ou pacsé sans enfant, ou célibataire avec 2 enfants" },
  { value: "2.5", label: "2,5 parts", description: "Couple avec 1 enfant" },
  { value: "3+", label: "3 parts ou plus", description: "Couple avec 2 enfants et +" },
];

interface StepHouseholdProps {
  value?: HouseholdShares;
  onChange: (value: HouseholdShares) => void;
}

const StepHousehold = ({ value, onChange }: StepHouseholdProps): JSX.Element => (
  <div>
    <StepTitle
      title="Quelle est la composition de votre foyer fiscal ?"
      subtitle="Nous utilisons cette information pour calibrer le seuil de revenus applicable à votre situation."
    />
    <div className="space-y-3">
      {OPTIONS.map((opt) => (
        <OptionButton
          key={opt.value}
          selected={value === opt.value}
          onClick={() => onChange(opt.value)}
          name="household"
          value={opt.value}
        >
          <span>
            <span className="block font-medium text-secondary">{opt.label}</span>
            <span className="block text-xs text-muted-foreground mt-1">
              {opt.description}
            </span>
          </span>
        </OptionButton>
      ))}
    </div>
  </div>
);

export default StepHousehold;
