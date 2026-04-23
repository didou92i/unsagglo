import { useState } from "react";
import ProgressHeader from "./ProgressHeader";
import NavButtons from "./NavButtons";
import StepVehicle from "./StepVehicle";
import StepHousehold from "./StepHousehold";
import StepIncome from "./StepIncome";
import StepCompanyCar from "./StepCompanyCar";
import StepDistance from "./StepDistance";
import StepSummary from "./StepSummary";
import VerdictEligible from "./VerdictEligible";
import VerdictNotEligible from "./VerdictNotEligible";
import { evaluateCriteria, primaryBlockingReason } from "./logic";
import type {
  DistanceOption,
  HouseholdShares,
  SimulatorAnswers,
} from "./types";
import {
  DISTANCE_LABELS,
  HOUSEHOLD_LABELS,
  TOTAL_STEPS,
} from "./types";

type Screen = number | "verdict";

const INITIAL_ANSWERS: SimulatorAnswers = {};

const Simulator = (): JSX.Element => {
  const [screen, setScreen] = useState<Screen>(1);
  const [answers, setAnswers] = useState<SimulatorAnswers>(INITIAL_ANSWERS);

  const update = <K extends keyof SimulatorAnswers>(
    key: K,
    value: SimulatorAnswers[K],
  ): void => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const canContinue = ((): boolean => {
    if (screen === 1) return answers.hasVehicle !== undefined;
    if (screen === 2) return answers.household !== undefined;
    if (screen === 3) return typeof answers.income === "number" && answers.income >= 0;
    if (screen === 4) return answers.companyCarFuel !== undefined;
    if (screen === 5) return answers.distance !== undefined;
    return true;
  })();

  const goToVerdict = (): void => setScreen("verdict");

  const handleNext = (): void => {
    if (screen === 1 && answers.hasVehicle === false) {
      goToVerdict();
      return;
    }
    if (typeof screen === "number" && screen < TOTAL_STEPS) {
      setScreen((screen + 1) as Screen);
    }
  };

  const handlePrevious = (): void => {
    if (screen === "verdict") {
      setScreen(TOTAL_STEPS);
      return;
    }
    if (typeof screen === "number" && screen > 1) {
      setScreen((screen - 1) as Screen);
    }
  };

  const handleRestart = (): void => {
    setAnswers(INITIAL_ANSWERS);
    setScreen(1);
  };

  if (screen === "verdict") {
    const criteria = evaluateCriteria(answers);
    const blocking = primaryBlockingReason(criteria);
    const compositionFoyer = answers.household
      ? HOUSEHOLD_LABELS[answers.household]
      : null;
    const profilKilometrage = answers.distance
      ? DISTANCE_LABELS[answers.distance]
      : null;
    return (
      <div key="verdict" className="animate-simulator-fade">
        {blocking === null ? (
          <VerdictEligible
            onRestart={handleRestart}
            compositionFoyer={compositionFoyer}
            profilKilometrage={profilKilometrage}
          />
        ) : (
          <VerdictNotEligible reason={blocking} onRestart={handleRestart} />
        )}
      </div>
    );
  }

  const stepNumber = screen;

  return (
    <div
      className="rounded-lg border bg-white"
      style={{ borderColor: "#e6eaf0", padding: "32px" }}
    >
      <ProgressHeader step={stepNumber} />

      <div key={stepNumber} className="animate-simulator-fade mt-8">
        {stepNumber === 1 && (
          <StepVehicle
            value={answers.hasVehicle}
            onChange={(v: boolean) => update("hasVehicle", v)}
          />
        )}
        {stepNumber === 2 && (
          <StepHousehold
            value={answers.household}
            onChange={(v: HouseholdShares) => update("household", v)}
          />
        )}
        {stepNumber === 3 && (
          <StepIncome
            value={answers.income}
            onChange={(v: number | undefined) => update("income", v)}
          />
        )}
        {stepNumber === 4 && (
          <StepCompanyCar
            value={answers.companyCarFuel}
            onChange={(v: boolean) => update("companyCarFuel", v)}
          />
        )}
        {stepNumber === 5 && (
          <StepDistance
            value={answers.distance}
            onChange={(v: DistanceOption) => update("distance", v)}
          />
        )}
        {stepNumber === 6 && (
          <StepSummary
            criteria={evaluateCriteria(answers)}
            onReveal={goToVerdict}
          />
        )}
      </div>

      {stepNumber < TOTAL_STEPS && (
        <NavButtons
          onPrevious={handlePrevious}
          onNext={handleNext}
          nextDisabled={!canContinue}
          showPrevious={stepNumber > 1}
        />
      )}
      {stepNumber === TOTAL_STEPS && (
        <div className="mt-6 flex justify-start">
          <button
            type="button"
            onClick={handlePrevious}
            className="text-secondary border border-secondary px-6 py-2.5 rounded-[6px] text-sm font-medium hover:bg-secondary hover:text-white transition-colors"
          >
            ← Précédent
          </button>
        </div>
      )}
    </div>
  );
};

export default Simulator;
