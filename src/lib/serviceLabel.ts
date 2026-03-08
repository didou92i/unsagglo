import { SERVICES } from "@/constants/services";

export function serviceLabel(value: string | null): string {
  if (!value) return "\u2014";
  const match = SERVICES.find((s) => s.value === value);
  return match ? match.label : value;
}
