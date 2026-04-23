export type HouseholdShares = "1" | "1.5" | "2" | "2.5" | "3+";

export type DistanceOption = "under15" | "over15" | "professional8000" | "unsure";

export type BlockingReason = "vehicle" | "income" | "companyCar" | "distance";

export interface SimulatorAnswers {
  hasVehicle?: boolean;
  household?: HouseholdShares;
  income?: number;
  companyCarFuel?: boolean;
  distance?: DistanceOption;
}

export const INCOME_THRESHOLDS: Record<HouseholdShares, number> = {
  "1": 17000,
  "1.5": 22000,
  "2": 30000,
  "2.5": 38000,
  "3+": 50000,
};

export const TOTAL_STEPS = 6;

export const STEP_TITLES: Record<number, string> = {
  1: "Véhicule",
  2: "Foyer fiscal",
  3: "Revenus",
  4: "Employeur",
  5: "Trajet",
  6: "Récapitulatif",
};

export const HOUSEHOLD_LABELS: Record<HouseholdShares, string> = {
  "1": "1 part",
  "1.5": "1,5 part",
  "2": "2 parts",
  "2.5": "2,5 parts",
  "3+": "3 parts ou plus",
};

export const DISTANCE_LABELS: Record<DistanceOption, string> = {
  under15: "Moins de 15 km (aller simple)",
  over15: "15 km ou plus (aller simple)",
  professional8000: "Plus de 8 000 km/an en déplacements professionnels",
  unsure: "Non déterminé",
};

export const BLOCKING_REASON_LABELS: Record<BlockingReason, string> = {
  vehicle: "Pas de véhicule",
  income: "Revenus",
  companyCar: "Véhicule employeur",
  distance: "Kilométrage",
};
