import type { ReactNode } from "react";

interface ChoiceCardProps {
  selected: boolean;
  onClick: () => void;
  emoji?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

const ChoiceCard = ({
  selected,
  onClick,
  emoji,
  title,
  description,
  children,
}: ChoiceCardProps): JSX.Element => (
  <button
    type="button"
    onClick={onClick}
    className="text-left rounded-lg p-4 md:p-5 transition-all duration-150 w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    style={{
      borderColor: selected ? "#009fe3" : "#e6eaf0",
      borderWidth: selected ? "2px" : "1px",
      borderStyle: "solid",
      backgroundColor: selected ? "#eff9fe" : "#ffffff",
      padding: selected ? "15px 19px" : "16px 20px",
    }}
    aria-pressed={selected}
  >
    <div className="flex items-start gap-3">
      {emoji && (
        <span aria-hidden="true" className="text-2xl leading-none flex-shrink-0">
          {emoji}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-secondary text-sm">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {children}
      </div>
    </div>
  </button>
);

export default ChoiceCard;
