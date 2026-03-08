import type { FieldError, UseFormRegister, FieldValues, Path } from "react-hook-form";

interface TextareaFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  placeholder?: string;
  rows?: number;
  className?: string;
}

function TextareaField<T extends FieldValues>({
  label,
  name,
  register,
  error,
  placeholder,
  rows = 4,
  className = "",
}: TextareaFieldProps<T>): JSX.Element {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-sm font-semibold text-foreground mb-1">
        {label}
      </label>
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full px-4 py-2.5 rounded-[var(--radius-sm)] border bg-background text-foreground resize-y transition-all focus:ring-2 focus:ring-primary focus:border-primary outline-none ${error ? "border-destructive" : "border-border"}`}
      />
      {error && <p className="text-destructive text-sm mt-1">{error.message}</p>}
    </div>
  );
}

export default TextareaField;
