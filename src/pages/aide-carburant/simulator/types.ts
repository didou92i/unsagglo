export type HouseholdShares = "1" | "1.5" | "2" | "2.5" | "3+";

export type DistanceOption = "under15" | "over15" | "professional8000" | "unsure";

export type BlockingReason = "vehicle" | "status" | "income" | "companyCar" | "distance";

export interface SimulatorAnswers {
  hasVehicle?: boolean;
  isActive?: boolean;
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

export const TOTAL_STEPS = 7;

export const STEP_TITLES: Record<number, string> = {
  1: "Véhicule",
  2: "Statut",
  3: "Foyer fiscal",
  4: "Revenus",
  5: "Employeur",
  6: "Trajet",
  7: "Récapitulatif",
};
