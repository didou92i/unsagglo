export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectOptionGroup {
  group: string;
  options: SelectOption[];
}
