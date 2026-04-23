import StepTitle from "./StepTitle";
import type { CriterionStatus } from "./logic";

interface StepSummaryProps {
  criteria: CriterionStatus[];
  onReveal: () => void;
}

const StepSummary = ({ criteria, onReveal }: StepSummaryProps): JSX.Element => (
  <div>
    <StepTitle
      title="Récapitulatif de votre situation"
      subtitle="Vérifiez vos réponses avant de connaître votre résultat."
    />
    <ul className="space-y-3 mb-8">
      {criteria.map((c, i) => (
        <li
          key={c.id}
          className="flex items-start gap-3 rounded-md p-3 border"
          style={{
            borderColor: c.passed ? "#009fe3" : "#e74124",
            backgroundColor: c.passed ? "#eff9fe" : "#fff4f1",
          }}
        >
          <span className="text-lg leading-none">{c.passed ? "✅" : "❌"}</span>
          <span className="flex-1 text-sm">
            <span className="block font-medium text-secondary">
              Critère {i + 1} · {c.label}
            </span>
          </span>
        </li>
      ))}
    </ul>
    <div className="flex justify-center">
      <button
        type="button"
        onClick={onReveal}
        className="text-white font-display font-medium text-lg rounded-[6px] px-8 py-4 transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#009fe3" }}
      >
        Voir mon résultat 🎯
      </button>
    </div>
  </div>
);

export default StepSummary;
