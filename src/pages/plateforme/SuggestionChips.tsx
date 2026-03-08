interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (text: string) => void;
  disabled: boolean;
}

const SuggestionChips = ({ suggestions, onSelect, disabled }: SuggestionChipsProps): JSX.Element => (
  <div className="flex flex-wrap gap-1.5 mt-2">
    {suggestions.map((s) => (
      <button
        key={s}
        type="button"
        disabled={disabled}
        onClick={() => onSelect(s)}
        className="px-2.5 py-1 text-xs rounded-full border border-primary/40 text-primary bg-primary/5 hover:bg-primary/15 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {s}
      </button>
    ))}
  </div>
);

export default SuggestionChips;
