interface WizardNavProps {
  onPrevious?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showPrevious?: boolean;
  loading?: boolean;
}

const WizardNav = ({
  onPrevious,
  onNext,
  nextLabel = "Continuer →",
  nextDisabled = false,
  showPrevious = true,
  loading = false,
}: WizardNavProps): JSX.Element => (
  <div className="flex items-center justify-between gap-4 mt-10">
    {showPrevious ? (
      <button
        type="button"
        onClick={onPrevious}
        disabled={loading}
        className="text-secondary border border-secondary px-6 py-2.5 rounded-[6px] text-sm font-medium hover:bg-secondary hover:text-white transition-colors disabled:opacity-40"
      >
        ← Précédent
      </button>
    ) : (
      <span />
    )}
    <button
      type="button"
      onClick={onNext}
      disabled={nextDisabled || loading}
      className="text-white px-7 py-3 rounded-[6px] text-sm font-medium transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ backgroundColor: "#009fe3" }}
    >
      {loading ? "Envoi en cours..." : nextLabel}
    </button>
  </div>
);

export default WizardNav;
