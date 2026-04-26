import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<string, string> = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
  outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
  danger: "bg-destructive text-destructive-foreground hover:opacity-90",
};

const sizeStyles: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-8 py-3 text-lg",
};

const UButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading = false, type = "button", children, className = "", disabled = false, ...props }, ref): JSX.Element => (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={`font-display font-bold tracking-wide rounded-[var(--radius-md)] transition-all duration-200 inline-flex items-center justify-center gap-2 ${variantStyles[variant]} ${sizeStyles[size]} ${loading || disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  ),
);
UButton.displayName = "UButton";

export default UButton;
