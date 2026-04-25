import WaveBackground from "@/pages/home/WaveBackground";
import cityBg from "@/assets/city-background.png";
import unsaLogo from "@/assets/unsa-logo.png";

const PlatformHero = (): JSX.Element => (
  <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-background">
    <img
      src={cityBg}
      alt=""
      className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none z-0"
    />

    <WaveBackground />

    <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
      <img
        src={unsaLogo}
        alt="Logo UNSAgglo"
        className="w-[160px] md:w-[200px] h-auto mx-auto mb-8 animate-fade-in-up drop-shadow-2xl"
      />

      <h1 className="font-display text-4xl md:text-6xl font-medium text-secondary animate-fade-in-up">
        Construisons Ensemble
      </h1>
      <p className="text-muted-foreground text-lg md:text-xl mt-4 max-w-3xl mx-auto animate-fade-in-up">
        Votre expertise mérite d'être entendue. Déposez vos idées et participez
        aux sondages pour construire le programme 2026.
      </p>

      <div className="flex items-center justify-center gap-4 mt-10 animate-fade-in-up">
        <a
          href="#contribution"
          className="inline-block px-8 bg-primary text-primary-foreground font-display font-medium tracking-widest uppercase rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg py-[6px]"
        >
          Je contribue
        </a>
        <a
          href="#sondages"
          className="inline-block px-8 bg-transparent border-2 border-primary text-primary font-display font-medium tracking-widest uppercase rounded-full transition-all duration-300 hover:bg-primary/10 py-[5px]"
        >
          Voir les sondages
        </a>
      </div>
    </div>
  </section>
);

export default PlatformHero;
