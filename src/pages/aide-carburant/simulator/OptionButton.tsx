import type { ReactNode } from "react";

interface OptionButtonProps {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  name: string;
  value: string;
}

const OptionButton = ({
  selected,
  onClick,
  children,
  name,
  value,
}: OptionButtonProps): JSX.Element => (
  <label
    className="block cursor-pointer rounded-lg border p-4 md:p-5 transition-colors"
    style={{
      borderColor: selected ? "#009fe3" : "#e6eaf0",
      borderWidth: selected ? "2px" : "1px",
      backgroundColor: selected ? "#eff9fe" : "#ffffff",
      padding: selected ? "15px 19px" : "16px 20px",
    }}
  >
    <input
      type="radio"
      name={name}
      value={value}
      checked={selected}
      onChange={onClick}
      className="sr-only"
    />
    <span className="flex items-start gap-3 text-sm text-foreground/90">
      {children}
    </span>
  </label>
);

export default OptionButton;
