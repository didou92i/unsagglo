import type { ReactNode } from "react";

type BadgeVariant = "info" | "success" | "warning" | "danger" | "neutral" | "urgent";

interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  info: "bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-semibold",
  success: "bg-green/10 text-green rounded-full px-2.5 py-0.5 text-xs font-semibold",
  warning: "bg-yellow/10 text-amber-700 rounded-full px-2.5 py-0.5 text-xs font-semibold",
  danger: "bg-destructive/10 text-destructive rounded-full px-2.5 py-0.5 text-xs font-semibold",
  neutral: "bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs font-semibold",
  urgent: "bg-[#e74124] text-white rounded-[3px] px-1.5 py-0.5 text-[10px] font-semibold tracking-wide",
};

const UBadge = ({ variant, children, className = "" }: BadgeProps): JSX.Element => {
  return (
    <span className={`inline-block ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default UBadge;
