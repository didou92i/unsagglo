import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Spinner from "@/components/ui/Spinner";
import { useRightsContent } from "@/hooks/useRightsContent";
import RightsSources from "./RightsSources";

interface RightsContentViewProps {
  categorie: string;
  titre: string;
}

const RightsContentView = ({ categorie, titre }: RightsContentViewProps): JSX.Element => {
  const { content, sources, loading, error, refresh } = useRightsContent(categorie, titre);

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 py-16">
        <Spinner size="lg" />
        <p className="text-muted-foreground text-sm">Recherche en cours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center">
        <p className="text-destructive mb-4">{error}</p>
        <button onClick={refresh} className="text-primary font-semibold hover:underline">
          Reessayer
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="prose prose-sm max-w-none text-foreground">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
      <RightsSources sources={sources} />
      <button onClick={refresh} className="text-xs text-muted-foreground hover:text-primary transition-colors">
        Actualiser le contenu
      </button>
    </div>
  );
};

export default RightsContentView;
