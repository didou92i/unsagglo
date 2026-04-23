const SimulatorPlaceholder = (): JSX.Element => (
  <section id="simulateur" className="px-4 md:px-6 py-20 bg-white scroll-mt-24">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-secondary font-display font-medium text-3xl md:text-4xl text-center mb-10">
        Vérifiez votre éligibilité en 3 minutes
      </h2>
      <div className="border-2 border-dashed border-muted-foreground/40 rounded-lg p-12 md:p-16 text-center text-muted-foreground">
        <p className="text-sm md:text-base">
          Le simulateur sera intégré au prochain prompt.
        </p>
      </div>
    </div>
  </section>
);

export default SimulatorPlaceholder;
