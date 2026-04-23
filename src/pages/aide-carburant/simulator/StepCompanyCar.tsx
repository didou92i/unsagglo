import OptionButton from "./OptionButton";
import StepTitle from "./StepTitle";

interface StepCompanyCarProps {
  value?: boolean;
  onChange: (value: boolean) => void;
}

const StepCompanyCar = ({ value, onChange }: StepCompanyCarProps): JSX.Element => (
  <div>
    <StepTitle
      title="Votre employeur vous fournit-il un véhicule de fonction dont les frais de carburant sont pris en charge ?"
      subtitle="Les agents disposant d'un véhicule de service avec carte carburant employeur ne sont pas éligibles."
    />
    <div className="space-y-3">
      <OptionButton
        selected={value === false}
        onClick={() => onChange(false)}
        name="companyCar"
        value="no"
      >
        <span className="text-lg">❌</span>
        <span>Non, je paie mon carburant moi-même</span>
      </OptionButton>
      <OptionButton
        selected={value === true}
        onClick={() => onChange(true)}
        name="companyCar"
        value="yes"
      >
        <span className="text-lg">✅</span>
        <span>
          Oui, mon employeur prend en charge le carburant de mon véhicule
          professionnel
        </span>
      </OptionButton>
    </div>
  </div>
);

export default StepCompanyCar;
