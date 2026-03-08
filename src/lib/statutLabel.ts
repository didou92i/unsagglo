import { STATUTS } from "@/constants/statuts";

export function statutLabel(value: string): string {
  const match = STATUTS.find((s) => s.value === value);
  return match ? match.label : value;
}
