import { Navigate, useParams } from "react-router-dom";
import { RIGHTS_CATEGORIES } from "./rightsData";

const RightsDetail = (): JSX.Element => {
  const { categorie } = useParams<{ categorie: string }>();
  const cat = RIGHTS_CATEGORIES.find((c) => c.id === categorie);

  // Catégorie inconnue ou fiche non publiée : retour à la page d'index.
  // Le rendu d'une fiche est strictement conditionné à published === true.
  if (!cat || !cat.published) {
    return <Navigate to="/rights" replace />;
  }

  // Une catégorie publiée doit avoir son propre composant dédié et sa propre
  // route avant cette route paramétrée dans App.tsx (cf. /rights/citis).
  // Si on arrive ici alors que la fiche est marquée publiée, c'est une
  // incohérence de configuration — on redirige par sécurité.
  return <Navigate to="/rights" replace />;
};

export default RightsDetail;
