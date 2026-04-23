import UButton from "@/components/ui/UButton";

const scrollToSimulateur = (): void => {
  const el = document.getElementById("simulateur");
  el?.scrollIntoView({ behavior: "smooth" });
};

const Hero = (): JSX.Element => (
  <section className="bg-secondary px-4 md:px-6 py-20 md:py-28">
    <div className="max-w-4xl mx-auto text-center">
      <p className="text-destructive text-xs font-semibold tracking-[0.2em] uppercase mb-6">
        Dispositif État · Avril–Juin 2026
      </p>
      <h1 className="font-display font-medium text-white leading-[1.05] text-5xl sm:text-6xl md:text-7xl">
        Aide carburant
        <span className="text-primary ml-3 md:ml-4">50 €</span>
      </h1>
      <p className="text-white/85 text-base md:text-lg mt-6 max-w-xl mx-auto leading-relaxed">
        1 seul chiffre à déclarer. 3 minutes pour vérifier votre éligibilité.
        50 € versés en juin 2026. UNSAgglo vous accompagne.
      </p>
      <div className="mt-10 flex justify-center">
        <UButton variant="primary" size="lg" onClick={scrollToSimulateur}>
          Vérifier mon éligibilité →
        </UButton>
      </div>
    </div>
  </section>
);

export default Hero;
