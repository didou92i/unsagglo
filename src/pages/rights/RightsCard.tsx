import { Link } from "react-router-dom";
import UCard from "@/components/ui/UCard";
import type { RightCategory } from "./rightsData";

interface RightsCardProps {
  category: RightCategory;
}

const RightsCard = ({ category }: RightsCardProps): JSX.Element => {
  return (
    <Link to={`/rights/${category.id}`}>
      <UCard className="hover:shadow-lg hover:-translate-y-1 transition-all duration-200" padding="md">
        <div className="border-l-4 pl-4" style={{ borderColor: category.color }}>
          <h3 className="font-display text-lg font-bold text-foreground">{category.titre}</h3>
          <p className="text-muted-foreground text-sm mt-1">{category.description}</p>
        </div>
      </UCard>
    </Link>
  );
};

export default RightsCard;
