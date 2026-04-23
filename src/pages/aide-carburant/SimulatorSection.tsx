import Simulator from "./simulator/Simulator";

const SimulatorSection = (): JSX.Element => (
  <section id="simulateur" className="px-4 md:px-6 py-20 bg-white scroll-mt-24">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-secondary font-display font-medium text-3xl md:text-4xl text-center mb-10">
        Vérifiez votre éligibilité en 3 minutes
      </h2>
      <Simulator />
    </div>
  </section>
);

export default SimulatorSection;
