import OptionButton from "./OptionButton";
import StepTitle from "./StepTitle";

interface StepCompanyCarProps {
  value?: boolean;
  onChange: (value: boolean) => void;
}

const StepCompanyCar = ({ value, onChange }: StepCompanyCarProps): JSX.Element => (
  <div>
    <StepTitle
      title="Disposez-vous d'un véhicule de service avec carte carburant employeur ?"
      subtitle="La quasi-totalité des agents territoriaux paient leur carburant eux-mêmes. Cette question concerne uniquement les quelques agents dotés d'un véhicule de fonction avec carte carburant (cadres de direction, certains chefs de service)."
    />
    <div className="space-y-3">
      <OptionButton
        selected={value === false}
        onClick={() => onChange(false)}
        name="companyCar"
        value="no"
      >
        <span className="text-lg">⛽</span>
        <span>Non, je paie mon carburant moi-même (cas général)</span>
      </OptionButton>
      <OptionButton
        selected={value === true}
        onClick={() => onChange(true)}
        name="companyCar"
        value="yes"
      >
        <span className="text-lg">🚙</span>
        <span>
          Oui, mon employeur prend en charge intégralement mon carburant (carte
          carburant de fonction)
        </span>
      </OptionButton>
    </div>
  </div>
);

export default StepCompanyCar;
