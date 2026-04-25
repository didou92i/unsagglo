import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface ChoiceCardProps {
  selected: boolean;
  onClick: () => void;
  icon?: LucideIcon;
  title: string;
  description?: string;
  children?: ReactNode;
}

const ChoiceCard = ({
  selected,
  onClick,
  icon: Icon,
  title,
  description,
  children,
}: ChoiceCardProps): JSX.Element => (
  <button
    type="button"
    onClick={onClick}
    className="group relative text-left rounded-lg w-full transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary will-change-transform hover:-translate-y-0.5"
    style={{
      borderColor: selected ? "#009fe3" : "#e6eaf0",
      borderWidth: selected ? "2px" : "1px",
      borderStyle: "solid",
      backgroundColor: selected ? "#eff9fe" : "#ffffff",
      padding: selected ? "15px 19px" : "16px 20px",
    }}
    aria-pressed={selected}
  >
    <div className="flex items-start gap-4">
      {Icon && (
        <div
          className="flex-shrink-0 rounded-md flex items-center justify-center transition-colors duration-200"
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: selected ? "#009fe3" : "#f5f5f7",
          }}
        >
          <Icon
            className="h-5 w-5 transition-colors duration-200"
            style={{ color: selected ? "#ffffff" : "#29235c" }}
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-secondary text-sm leading-snug">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>

    <span
      aria-hidden="true"
      className="absolute top-3 right-3 rounded-full flex items-center justify-center transition-all duration-200 ease-out"
      style={{
        width: "20px",
        height: "20px",
        backgroundColor: "#009fe3",
        opacity: selected ? 1 : 0,
        transform: selected ? "scale(1)" : "scale(0.6)",
      }}
    >
      <Check className="h-3 w-3" style={{ color: "#ffffff" }} strokeWidth={3} />
    </span>
  </button>
);

export default ChoiceCard;
