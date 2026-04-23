import OptionButton from "./OptionButton";
import StepTitle from "./StepTitle";

interface StepVehicleProps {
  value?: boolean;
  onChange: (value: boolean) => void;
}

const StepVehicle = ({ value, onChange }: StepVehicleProps): JSX.Element => (
  <div>
    <StepTitle
      title="Possédez-vous un véhicule personnel ?"
      subtitle="Voiture thermique, électrique ou hybride — immatriculée à votre nom ou celui de votre conjoint."
    />
    <div className="space-y-3">
      <OptionButton
        selected={value === true}
        onClick={() => onChange(true)}
        name="vehicle"
        value="yes"
      >
        <span className="text-lg">✅</span>
        <span>Oui, je possède un véhicule personnel</span>
      </OptionButton>
      <OptionButton
        selected={value === false}
        onClick={() => onChange(false)}
        name="vehicle"
        value="no"
      >
        <span className="text-lg">❌</span>
        <span>Non, je n'ai pas de véhicule</span>
      </OptionButton>
    </div>
  </div>
);

export default StepVehicle;
