import type { StatItem } from "@/types";

interface StatsBarProps {
  stats: StatItem[];
}

const StatsBar = ({ stats }: StatsBarProps): JSX.Element => {
  return (
    <section className="bg-primary/5 border-y border-primary/20 py-8 px-4 md:px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="font-display text-3xl md:text-4xl font-black text-primary">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
