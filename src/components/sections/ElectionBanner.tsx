import { Link } from "react-router-dom";
import UButton from "@/components/ui/UButton";
import UBadge from "@/components/ui/UBadge";

const ElectionBanner = (): JSX.Element => {
  return (
    <div className="bg-gradient-to-r from-orange to-destructive rounded-[var(--radius-lg)] p-8 md:p-12 text-center max-w-4xl mx-auto">
      <UBadge variant="neutral" className="mb-4 bg-primary-foreground/20 text-primary-foreground">
        Elections Professionnelles
      </UBadge>
      <h2 className="font-display text-3xl md:text-4xl font-black text-primary-foreground">
        Decembre 2026 -- Votez UNSAgglo
      </h2>
      <p className="text-primary-foreground/80 mt-3 text-lg max-w-lg mx-auto">
        Faites entendre votre voix. Participez a notre programme collectif.
      </p>
      <Link to="/elections" className="inline-block mt-6">
        <UButton variant="primary" size="lg">Je contribue au programme</UButton>
      </Link>
    </div>
  );
};

export default ElectionBanner;
