import { useState } from "react";
import StepTitle from "./StepTitle";

interface StepIncomeProps {
  value?: number;
  onChange: (value: number | undefined) => void;
}

const StepIncome = ({ value, onChange }: StepIncomeProps): JSX.Element => {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const raw = e.target.value.trim();
    if (raw === "") {
      onChange(undefined);
      return;
    }
    const parsed = Number(raw);
    if (!Number.isNaN(parsed)) onChange(parsed);
  };

  return (
    <div>
      <StepTitle
        title="Quel est votre revenu fiscal de référence annuel ?"
        subtitle="Indiqué sur votre dernier avis d'imposition (revenus 2024)."
      />

      <button
        type="button"
        onClick={() => setTooltipOpen((v) => !v)}
        className="text-xs text-primary underline underline-offset-2 hover:opacity-80 mb-3"
        aria-expanded={tooltipOpen}
      >
        💡 Où trouver ce chiffre ?
      </button>

      {tooltipOpen && (
        <div
          className="rounded-md p-3 mb-4 text-xs leading-relaxed"
          style={{ backgroundColor: "#eff9fe", color: "#29235c" }}
        >
          Le revenu fiscal de référence figure sur votre avis d'imposition, en
          haut à droite, dans le cadre « Vos références ». Si vous êtes en ligne
          sur impots.gouv.fr, il apparaît sur votre page d'accueil.
        </div>
      )}

      <label className="block">
        <input
          type="number"
          inputMode="numeric"
          min={0}
          step={100}
          placeholder="Ex : 22 000 €"
          value={value ?? ""}
          onChange={handleInput}
          className="w-full rounded-md border px-4 py-3 text-base text-secondary placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2"
          style={{
            borderColor: "#e6eaf0",
            backgroundColor: "#ffffff",
          }}
        />
      </label>

      <div
        className="mt-4 rounded-md p-3 text-xs leading-relaxed"
        style={{ backgroundColor: "#f5f5f7", color: "#555" }}
      >
        <span aria-hidden="true">ⓘ</span> Cette information n'est PAS conservée
        par UNSAgglo. Elle sert uniquement au calcul d'éligibilité en local dans
        votre navigateur.
      </div>
    </div>
  );
};

export default StepIncome;
