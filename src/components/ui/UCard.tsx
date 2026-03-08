import type { ReactNode } from "react";

interface UCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: "sm" | "md" | "lg";
}

const padStyles: Record<string, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const UCard = ({ children, className = "", onClick, padding = "md" }: UCardProps): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className={`bg-card rounded-[var(--radius-md)] shadow-[var(--shadow-card)] ${padStyles[padding]} ${onClick ? "cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

export default UCard;
