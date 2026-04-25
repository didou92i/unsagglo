import { STATUS_META, type StatutTraitement } from "./types";

interface StatusBadgeProps {
  statut: StatutTraitement;
  cstDate?: string | null;
  size?: "sm" | "md";
}

const formatDateFr = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const pad = (n: number): string => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const StatusBadge = ({
  statut,
  cstDate,
  size = "md",
}: StatusBadgeProps): JSX.Element => {
  const meta = STATUS_META[statut];
  const Icon = meta.icon;
  const sizeStyles =
    size === "sm"
      ? { padding: "3px 8px", fontSize: "10px", iconSize: "h-3 w-3" }
      : { padding: "5px 12px", fontSize: "12px", iconSize: "h-3.5 w-3.5" };

  let label = meta.label;
  if (statut === "portee_cst" && cstDate) {
    label = `Portée au CST du ${formatDateFr(cstDate)}`;
  }

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
      {label}
    </span>
  );
};

export default StatusBadge;
