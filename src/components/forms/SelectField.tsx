import type { FieldError, UseFormRegister, FieldValues, Path } from "react-hook-form";
import type { SelectOption, SelectOptionGroup } from "@/types/select";

interface SelectFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  options?: SelectOption[];
  groups?: SelectOptionGroup[];
  placeholder?: string;
}

function SelectField<T extends FieldValues>({
  label,
  name,
  register,
  error,
  options,
  groups,
  placeholder = "Choisir...",
}: SelectFieldProps<T>): JSX.Element {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-semibold text-foreground mb-1">
        {label}
      </label>
      <div className="relative">
        <select
          id={name}
          {...register(name)}
          className={`w-full px-4 py-2.5 min-h-[44px] rounded-[var(--radius-sm)] border bg-background text-foreground appearance-none transition-all focus:ring-2 focus:ring-primary focus:border-primary outline-none pr-10 ${error ? "border-destructive" : "border-border"}`}
        >
          <option value="">{placeholder}</option>
          {groups
            ? groups.map((g) => (
                <optgroup key={g.group} label={g.group}>
                  {g.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </optgroup>
              ))
            : options?.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
        </select>
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </div>
      {error && <p className="text-destructive text-sm mt-1">{error.message}</p>}
    </div>
  );
}

export default SelectField;
