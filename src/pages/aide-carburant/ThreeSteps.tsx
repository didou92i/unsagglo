interface Step {
  number: string;
  text: string;
}

const STEPS: Step[] = [
  { number: "1", text: "Vous déclarez votre kilométrage sur impots.gouv.fr" },
  { number: "2", text: "L'administration vérifie automatiquement vos revenus et votre véhicule" },
  { number: "3", text: "Vous recevez 50 € sur votre compte en juin 2026" },
];

const ThreeSteps = (): JSX.Element => (
  <section className="bg-secondary text-white px-4 md:px-6 py-20">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="font-display font-medium text-4xl md:text-5xl">
        La démarche tient en 3 étapes
      </h2>
      <p className="text-white/85 mt-4 text-base md:text-lg">
        L'administration fiscale fait 80 % du travail pour vous.
      </p>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {STEPS.map((step) => (
          <div
            key={step.number}
            className="rounded-lg p-8 text-left"
            style={{
              backgroundColor: "transparent",
              border: "0.5px solid rgba(255, 255, 255, 0.4)",
            }}
          >
            <p className="font-display font-medium text-primary text-4xl leading-none mb-6">
              {step.number}
            </p>
            <p className="text-white/90 text-sm leading-relaxed">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ThreeSteps;
