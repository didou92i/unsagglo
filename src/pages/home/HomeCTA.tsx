import { Link } from "react-router-dom";
import UButton from "@/components/ui/UButton";

const HomeCTA = (): JSX.Element => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
    <Link to="/plateforme">
      <UButton variant="primary" size="lg">Plateforme participative</UButton>
    </Link>
    <Link to="/adhesion">
      <UButton variant="outline" size="lg">Rejoindre l'UNSA</UButton>
    </Link>
  </div>
);

export default HomeCTA;
