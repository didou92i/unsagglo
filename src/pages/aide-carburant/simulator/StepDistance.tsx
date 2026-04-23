import OptionButton from "./OptionButton";
import StepTitle from "./StepTitle";
import type { DistanceOption } from "./types";

interface Option {
  value: DistanceOption;
  icon: string;
  text: string;
}

const OPTIONS: Option[] = [
  {
    value: "under15",
    icon: "🏠➡️🏢",
    text: "Moins de 15 km (aller simple) de mon domicile à mon lieu de travail",
  },
  {
    value: "over15",
    icon: "🏠➡️🏢",
    text: "15 km ou plus (aller simple) de mon domicile à mon lieu de travail",
  },
  {
    value: "professional8000",
    icon: "🚗",
    text: "Je parcours plus de 8 000 km/an en déplacements professionnels (profession itinérante)",
  },
  { value: "unsure", icon: "❓", text: "Je ne suis pas sûr(e)" },
];

interface StepDistanceProps {
  value?: DistanceOption;
  onChange: (value: DistanceOption) => void;
}

const StepDistance = ({ value, onChange }: StepDistanceProps): JSX.Element => (
  <div>
    <StepTitle
      title="À quelle distance habitez-vous de votre lieu de travail ?"
      subtitle="Au moins une des conditions suivantes doit être remplie pour être éligible."
    />
    <div className="space-y-3">
      {OPTIONS.map((opt) => (
        <OptionButton
          key={opt.value}
          selected={value === opt.value}
          onClick={() => onChange(opt.value)}
          name="distance"
          value={opt.value}
        >
          <span className="text-lg">{opt.icon}</span>
          <span>{opt.text}</span>
        </OptionButton>
      ))}
    </div>
  </div>
);

export default StepDistance;
