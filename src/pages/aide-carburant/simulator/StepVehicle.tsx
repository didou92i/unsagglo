import OptionButton from "./OptionButton";
import StepTitle from "./StepTitle";

interface StepVehicleProps {
  value?: boolean;
  onChange: (value: boolean) => void;
}

const StepVehicle = ({ value, onChange }: StepVehicleProps): JSX.Element => (
  <div>
    <StepTitle
      title="Utilisez-vous un véhicule personnel pour vous rendre au travail ?"
      subtitle="Voiture thermique, électrique ou hybride, immatriculée à votre nom ou à celui de votre conjoint."
    />
    <div className="space-y-3">
      <OptionButton
        selected={value === true}
        onClick={() => onChange(true)}
        name="vehicle"
        value="yes"
      >
        <span className="text-lg">✅</span>
        <span>Oui, j'utilise mon véhicule personnel pour venir travailler à la CARPF</span>
      </OptionButton>
      <OptionButton
        selected={value === false}
        onClick={() => onChange(false)}
        name="vehicle"
        value="no"
      >
        <span className="text-lg">❌</span>
        <span>Non, je n'utilise pas de véhicule personnel (transports en commun, covoiturage, vélo…)</span>
      </OptionButton>
    </div>
  </div>
);

export default StepVehicle;
