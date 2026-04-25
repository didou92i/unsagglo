import { STATUS_META, type StatutTraitement } from "./types";

interface StatusBadgeProps {
  statut: StatutTraitement;
  size?: "sm" | "md";
}

const StatusBadge = ({ statut, size = "md" }: StatusBadgeProps): JSX.Element => {
  const meta = STATUS_META[statut];
  const Icon = meta.icon;
  const sizeStyles =
    size === "sm"
      ? { padding: "3px 8px", fontSize: "10px", iconSize: "h-3 w-3" }
      : { padding: "5px 12px", fontSize: "12px", iconSize: "h-3.5 w-3.5" };

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full font-medium"
      style={{
        backgroundColor: meta.bg,
        color: meta.color,
        padding: sizeStyles.padding,
        fontSize: sizeStyles.fontSize,
      }}
    >
      <Icon className={sizeStyles.iconSize} strokeWidth={2} aria-hidden="true" />
      {meta.label}
    </span>
  );
};

export default StatusBadge;
