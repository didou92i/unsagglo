interface VisiteurExpandedProps {
  expanded: boolean;
  onCta: () => void;
}

const VisiteurExpanded = ({ expanded, onCta }: VisiteurExpandedProps): JSX.Element => {
  return (
    <div
      className={`absolute left-full top-1/2 -translate-y-1/2 ml-4 flex items-center transition-all duration-500 ease-out origin-left ${
        expanded
          ? "opacity-100 scale-100 translate-x-0"
          : "opacity-0 scale-95 -translate-x-4 pointer-events-none"
      }`}
    >
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-xl max-w-md">
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          UNSAgglo ne decide pas a votre place. Nous construisons notre programme
          avec vos idees et votre expertise — parce que vous connaissez mieux que
          quiconque la realite du terrain. Toutes les contributions seront etudiees
          et integrees a notre projet commun.
        </p>
        <p className="text-sm font-semibold text-foreground mb-4">
          Votre expertise merite d&apos;etre entendue. Contribuez des maintenant.
        </p>
        <button
          type="button"
          onClick={onCta}
          className="w-full px-4 py-2.5 bg-primary text-primary-foreground font-display font-bold text-sm rounded-full transition-all duration-200 hover:opacity-90 cursor-pointer"
        >
          J&apos;accede a la plateforme participative
        </button>
      </div>
    </div>
  );
};

export default VisiteurExpanded;
