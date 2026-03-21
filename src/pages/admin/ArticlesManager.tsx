import { useState } from "react";
import { useAdminArticles } from "@/hooks/useAdminArticles";
import { useVeille } from "@/hooks/useVeille";
import Spinner from "@/components/ui/Spinner";
import UButton from "@/components/ui/UButton";
import ArticleForm from "./ArticleForm";
import ArticlesTable from "./ArticlesTable";

const ArticlesManager = (): JSX.Element => {
  const { articles, loading, refresh, togglePublie, deleteArticle } = useAdminArticles();
  const { triggerVeille, loading: veilleLoading } = useVeille();
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleVeille = async (): Promise<void> => {
    await triggerVeille();
    refresh();
  };

  if (loading) return <div className="flex justify-center py-8"><Spinner size="md" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <p className="text-sm text-muted-foreground">{articles.length} article(s)</p>
        <div className="flex gap-2">
          <UButton variant="outline" size="sm" onClick={handleVeille} loading={veilleLoading}>
            Lancer la veille IA
          </UButton>
          <UButton variant="primary" size="sm" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Fermer" : "Nouvel article"}
          </UButton>
        </div>
      </div>
      {showForm && (
        <ArticleForm
          onSuccess={() => { setShowForm(false); refresh(); }}
          onCancel={() => setShowForm(false)}
        />
      )}
      <ArticlesTable
        articles={articles}
        togglePublie={togglePublie}
        deleteArticle={deleteArticle}
      />
    </div>
  );
};

export default ArticlesManager;
