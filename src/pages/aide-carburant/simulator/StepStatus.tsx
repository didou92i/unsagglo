import OptionButton from "./OptionButton";
import StepTitle from "./StepTitle";

interface StepStatusProps {
  value?: boolean;
  onChange: (value: boolean) => void;
}

const StepStatus = ({ value, onChange }: StepStatusProps): JSX.Element => (
  <div>
    <StepTitle
      title="Êtes-vous actuellement en activité professionnelle ?"
      subtitle="Cette deuxième condition détermine votre éligibilité de base."
    />
    <div className="space-y-3">
      <OptionButton
        selected={value === true}
        onClick={() => onChange(true)}
        name="status"
        value="active"
      >
        <span className="text-lg">✅</span>
        <span>
          <span className="block font-medium text-secondary">
            Oui, je suis en activité
          </span>
          <span className="block text-xs text-muted-foreground mt-1">
            Salarié, fonctionnaire, indépendant, apprenti, stagiaire rémunéré,
            contractuel
          </span>
        </span>
      </OptionButton>
      <OptionButton
        selected={value === false}
        onClick={() => onChange(false)}
        name="status"
        value="inactive"
      >
        <span className="text-lg">❌</span>
        <span>
          <span className="block font-medium text-secondary">Non</span>
          <span className="block text-xs text-muted-foreground mt-1">
            Retraité, demandeur d'emploi, étudiant sans activité
          </span>
        </span>
      </OptionButton>
    </div>
  </div>
);

export default StepStatus;
