interface NavButtonsProps {
  onPrevious?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showPrevious?: boolean;
}

const NavButtons = ({
  onPrevious,
  onNext,
  nextLabel = "Continuer →",
  nextDisabled = false,
  showPrevious = true,
}: NavButtonsProps): JSX.Element => (
  <div className="flex items-center justify-between gap-4 mt-10">
    {showPrevious ? (
      <button
        type="button"
        onClick={onPrevious}
        className="text-secondary border border-secondary px-6 py-2.5 rounded-[6px] text-sm font-medium hover:bg-secondary hover:text-white transition-colors"
      >
        ← Précédent
      </button>
    ) : (
      <span />
    )}
    <button
      type="button"
      onClick={onNext}
      disabled={nextDisabled}
      className="text-white px-7 py-3 rounded-[6px] text-sm font-medium transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ backgroundColor: "#009fe3" }}
    >
      {nextLabel}
    </button>
  </div>
);

export default NavButtons;
