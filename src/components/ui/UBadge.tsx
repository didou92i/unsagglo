import type { ReactNode } from "react";

interface BadgeProps {
  variant: "info" | "success" | "warning" | "danger" | "neutral";
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<string, string> = {
  info: "bg-primary/10 text-primary",
  success: "bg-green/10 text-green",
  warning: "bg-yellow/10 text-amber-700",
  danger: "bg-destructive/10 text-destructive",
  neutral: "bg-muted text-muted-foreground",
};

const UBadge = ({ variant, children, className = "" }: BadgeProps): JSX.Element => {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default UBadge;
