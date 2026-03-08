import WaveBackground from "@/pages/home/WaveBackground";
import cityBg from "@/assets/city-background.png";
import unsaLogo from "@/assets/unsa-logo.png";
import { usePlatformStats } from "./usePlatformStats";

interface StatItemProps {
  value: number;
  label: string;
}

const StatItem = ({ value, label }: StatItemProps): JSX.Element => (
  <div className="text-center">
    <span className="font-display text-4xl md:text-5xl font-black text-primary">
      {value}
    </span>
    <p className="text-muted-foreground text-sm mt-1">{label}</p>
  </div>
);

const PlatformHero = (): JSX.Element => {
  const { stats } = usePlatformStats();

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-background">
      <img
        src={cityBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none z-0"
      />
      <WaveBackground />

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <img
          src={unsaLogo}
          alt="Logo UNSAgglo"
          className="w-[160px] md:w-[200px] h-auto mx-auto mb-8 animate-fade-in-up drop-shadow-2xl"
        />
        <h1 className="font-display text-4xl md:text-6xl font-black text-secondary animate-fade-in-up">
          Construisons Ensemble
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl mt-4 max-w-2xl mx-auto animate-fade-in-up">
          Votre expertise merite d&apos;etre entendue. Deposez vos idees
          et participez aux sondages pour construire le programme 2026.
        </p>

        <div className="flex items-center justify-center gap-12 mt-10 animate-fade-in-up">
          <StatItem value={stats.contributions} label="Contributions" />
          <StatItem value={stats.votes} label="Votes" />
        </div>

        <a
          href="#contribution"
          className="mt-8 inline-block px-8 py-3 bg-transparent border-2 border-primary text-primary font-display font-bold tracking-widest uppercase rounded-full transition-all duration-300 hover:bg-primary/10 hover:shadow-lg animate-fade-in-up"
        >
          Je contribue
        </a>
      </div>
    </section>
  );
};

export default PlatformHero;
