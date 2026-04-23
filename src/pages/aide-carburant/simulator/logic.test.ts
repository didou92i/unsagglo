import { describe, it, expect } from "vitest";
import {
  evaluateCriteria,
  isEligible,
  primaryBlockingReason,
} from "./logic";
import { INCOME_THRESHOLDS } from "./types";
import type { SimulatorAnswers } from "./types";

const FULL_PASS: SimulatorAnswers = {
  hasVehicle: true,
  household: "1.5",
  income: 20000,
  companyCarFuel: false,
  distance: "over15",
};

describe("evaluateCriteria", () => {
  it("marks every criterion as passed for a fully valid profile", () => {
    const criteria = evaluateCriteria(FULL_PASS);
    expect(criteria.every((c) => c.passed)).toBe(true);
    expect(criteria.map((c) => c.id)).toEqual([
      "vehicle",
      "income",
      "companyCar",
      "distance",
    ]);
  });

  it("blocks on vehicle when hasVehicle is false", () => {
    const criteria = evaluateCriteria({ ...FULL_PASS, hasVehicle: false });
    const vehicle = criteria.find((c) => c.id === "vehicle");
    expect(vehicle?.passed).toBe(false);
  });

  it("blocks on income when RFR is strictly above the household threshold", () => {
    const threshold = INCOME_THRESHOLDS["1.5"];
    const criteria = evaluateCriteria({
      ...FULL_PASS,
      household: "1.5",
      income: threshold + 1,
    });
    expect(criteria.find((c) => c.id === "income")?.passed).toBe(false);
  });

  it("allows income that equals the threshold exactly", () => {
    const threshold = INCOME_THRESHOLDS["2"];
    const criteria = evaluateCriteria({
      ...FULL_PASS,
      household: "2",
      income: threshold,
    });
    expect(criteria.find((c) => c.id === "income")?.passed).toBe(true);
  });

  it("blocks on companyCar when employer fully funds fuel", () => {
    const criteria = evaluateCriteria({ ...FULL_PASS, companyCarFuel: true });
    expect(criteria.find((c) => c.id === "companyCar")?.passed).toBe(false);
  });

  it("blocks on distance when under15 km", () => {
    const criteria = evaluateCriteria({ ...FULL_PASS, distance: "under15" });
    expect(criteria.find((c) => c.id === "distance")?.passed).toBe(false);
  });

  it("blocks on distance when the agent is unsure", () => {
    const criteria = evaluateCriteria({ ...FULL_PASS, distance: "unsure" });
    expect(criteria.find((c) => c.id === "distance")?.passed).toBe(false);
  });

  it("accepts 15 km or more as a passing distance", () => {
    const criteria = evaluateCriteria({ ...FULL_PASS, distance: "over15" });
    expect(criteria.find((c) => c.id === "distance")?.passed).toBe(true);
  });

  it("accepts 8000+ km/year professional as a passing distance", () => {
    const criteria = evaluateCriteria({ ...FULL_PASS, distance: "professional8000" });
    expect(criteria.find((c) => c.id === "distance")?.passed).toBe(true);
  });

  it("marks income as not passed when household or income are missing", () => {
    const criteriaNoHousehold = evaluateCriteria({
      ...FULL_PASS,
      household: undefined,
    });
    expect(criteriaNoHousehold.find((c) => c.id === "income")?.passed).toBe(false);

    const criteriaNoIncome = evaluateCriteria({ ...FULL_PASS, income: undefined });
    expect(criteriaNoIncome.find((c) => c.id === "income")?.passed).toBe(false);
  });
});

describe("primaryBlockingReason", () => {
  it("returns null when every criterion passes", () => {
    const criteria = evaluateCriteria(FULL_PASS);
    expect(primaryBlockingReason(criteria)).toBeNull();
  });

  it("returns the first failing criterion in canonical order", () => {
    const criteria = evaluateCriteria({
      ...FULL_PASS,
      hasVehicle: false,
      companyCarFuel: true,
    });
    expect(primaryBlockingReason(criteria)).toBe("vehicle");
  });

  it("returns income before companyCar and distance when both fail", () => {
    const threshold = INCOME_THRESHOLDS["1"];
    const criteria = evaluateCriteria({
      ...FULL_PASS,
      household: "1",
      income: threshold + 10_000,
      companyCarFuel: true,
    });
    expect(primaryBlockingReason(criteria)).toBe("income");
  });
});

describe("isEligible", () => {
  it("is true only when every criterion passes", () => {
    expect(isEligible(FULL_PASS)).toBe(true);
    expect(isEligible({ ...FULL_PASS, hasVehicle: false })).toBe(false);
    expect(isEligible({ ...FULL_PASS, distance: "unsure" })).toBe(false);
  });
});

describe("INCOME_THRESHOLDS", () => {
  it("grows monotonically with household size", () => {
    const order: Array<keyof typeof INCOME_THRESHOLDS> = ["1", "1.5", "2", "2.5", "3+"];
    for (let i = 1; i < order.length; i += 1) {
      expect(INCOME_THRESHOLDS[order[i]!]).toBeGreaterThan(
        INCOME_THRESHOLDS[order[i - 1]!],
      );
    }
  });
});
