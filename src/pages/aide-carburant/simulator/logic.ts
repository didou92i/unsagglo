import type { BlockingReason, SimulatorAnswers } from "./types";
import { INCOME_THRESHOLDS } from "./types";

export interface CriterionStatus {
  id: BlockingReason;
  label: string;
  passed: boolean;
}

export function evaluateCriteria(a: SimulatorAnswers): CriterionStatus[] {
  const incomeThreshold = a.household ? INCOME_THRESHOLDS[a.household] : undefined;

  return [
    {
      id: "vehicle",
      label: "Possession d'un véhicule personnel",
      passed: a.hasVehicle === true,
    },
    {
      id: "income",
      label: "Revenus sous le seuil",
      passed:
        a.income !== undefined &&
        incomeThreshold !== undefined &&
        a.income <= incomeThreshold,
    },
    {
      id: "companyCar",
      label: "Pas de véhicule de fonction avec carburant",
      passed: a.companyCarFuel === false,
    },
    {
      id: "distance",
      label: "Kilométrage validé",
      passed: a.distance === "over15" || a.distance === "professional8000",
    },
  ];
}

export function primaryBlockingReason(
  criteria: CriterionStatus[],
): BlockingReason | null {
  const first = criteria.find((c) => !c.passed);
  return first ? first.id : null;
}

export function isEligible(a: SimulatorAnswers): boolean {
  return evaluateCriteria(a).every((c) => c.passed);
}
