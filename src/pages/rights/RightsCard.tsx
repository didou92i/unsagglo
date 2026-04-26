import { Link } from "react-router-dom";
import UCard from "@/components/ui/UCard";
import type { RightCategory } from "./rightsData";

interface RightsCardProps {
  category: RightCategory;
}

const RightsCard = ({ category }: RightsCardProps): JSX.Element => {
  if (!category.published) {
    return (
      <UCard
        className="opacity-60 cursor-not-allowed select-none"
        padding="md"
        aria-disabled="true"
      >
        <div className="border-l-4 pl-4" style={{ borderColor: category.color }}>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-bold text-foreground">
              {category.titre}
            </h3>
            <span className="shrink-0 inline-flex items-center rounded-full bg-muted text-muted-foreground text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5">
              En cours
            </span>
          </div>
          <p className="text-muted-foreground text-sm mt-1">{category.description}</p>
          <p className="text-muted-foreground text-xs italic mt-2">
            Fiche en cours de rédaction.
          </p>
        </div>
      </UCard>
    );
  }

  return (
    <Link to={`/rights/${category.id}`}>
      <UCard
        className="hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
        padding="md"
      >
        <div className="border-l-4 pl-4" style={{ borderColor: category.color }}>
          <h3 className="font-display text-lg font-bold text-foreground">
            {category.titre}
          </h3>
          <p className="text-muted-foreground text-sm mt-1">
            {category.description}
          </p>
        </div>
      </UCard>
    </Link>
  );
};

export default RightsCard;
