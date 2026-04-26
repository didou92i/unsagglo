import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

const UInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      {...props}
      className={`w-full px-4 py-2.5 min-h-[44px] rounded-[var(--radius-sm)] border border-border bg-background text-foreground transition-all focus:ring-2 focus:ring-primary focus:border-primary outline-none aria-[invalid=true]:border-destructive ${className}`}
    />
  ),
);
UInput.displayName = "UInput";

export default UInput;
