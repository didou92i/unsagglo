import type { FieldError, UseFormRegister, FieldValues, Path } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

function InputField<T extends FieldValues>({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
  required,
  className = "",
}: InputFieldProps<T>): JSX.Element {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-sm font-semibold text-foreground mb-1">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full px-4 py-2.5 min-h-[44px] rounded-[var(--radius-sm)] border bg-background text-foreground transition-all focus:ring-2 focus:ring-primary focus:border-primary outline-none ${error ? "border-destructive" : "border-border"}`}
      />
      {error && <p className="text-destructive text-sm mt-1">{error.message}</p>}
    </div>
  );
}

export default InputField;
