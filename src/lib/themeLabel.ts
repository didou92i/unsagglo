import { THEMES } from "@/constants/themes";

export function themeLabel(value: string): string {
  const match = THEMES.find((t) => t.value === value);
  return match ? match.label : value;
}
