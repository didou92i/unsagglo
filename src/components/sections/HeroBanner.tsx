import { Link } from "react-router-dom";
import UButton from "@/components/ui/UButton";
import UBadge from "@/components/ui/UBadge";

interface HeroBannerProps {
  title: string;
  highlight: string;
  subtitle: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  badge?: string;
}

const scrollTo = (hash: string): void => {
  const el = document.getElementById(hash.replace("#", ""));
  el?.scrollIntoView({ behavior: "smooth" });
};

const isAnchor = (href: string): boolean => href.startsWith("#");

const HeroBanner = ({
  title,
  highlight,
  subtitle,
  ctaPrimaryLabel,
  ctaPrimaryHref,
  ctaSecondaryLabel,
  ctaSecondaryHref,
  badge,
}: HeroBannerProps): JSX.Element => {
  return (
    <section className="bg-secondary w-full min-h-[420px] flex items-center px-4 md:px-6 py-20 bg-gradient-to-br from-secondary to-secondary/90">
      <div className="max-w-4xl mx-auto">
        {badge && (
          <UBadge variant="warning" className="mb-4">{badge}</UBadge>
        )}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-secondary-foreground leading-tight">
          {title}<span className="text-primary">{highlight}</span>
        </h1>
        <p className="text-lg md:text-xl text-secondary-foreground/80 mt-4 max-w-2xl">
          {subtitle}
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          {isAnchor(ctaPrimaryHref) ? (
            <UButton variant="primary" size="lg" onClick={() => scrollTo(ctaPrimaryHref)}>
              {ctaPrimaryLabel}
            </UButton>
          ) : (
            <Link to={ctaPrimaryHref}>
              <UButton variant="primary" size="lg">{ctaPrimaryLabel}</UButton>
            </Link>
          )}
          {ctaSecondaryLabel && ctaSecondaryHref && (
            isAnchor(ctaSecondaryHref) ? (
              <UButton variant="outline" size="lg" onClick={() => scrollTo(ctaSecondaryHref)}>
                {ctaSecondaryLabel}
              </UButton>
            ) : (
              <Link to={ctaSecondaryHref}>
                <UButton variant="outline" size="lg">{ctaSecondaryLabel}</UButton>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
