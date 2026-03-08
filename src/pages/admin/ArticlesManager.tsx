import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import UBadge from "@/components/ui/UBadge";
import UButton from "@/components/ui/UButton";
import Spinner from "@/components/ui/Spinner";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import ArticleForm from "./ArticleForm";

interface ArticleRow {
  id: string;
  titre: string;
  categorie: string;
  auteur: string;
  publie: boolean;
  created_at: string;
}

const ArticlesManager = (): JSX.Element => {
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);

  const fetchArticles = async (): Promise<void> => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setArticles(data as ArticleRow[]);
    setLoading(false);
  };

  useEffect(() => { fetchArticles(); }, []);

  const togglePublie = async (id: string, current: boolean): Promise<void> => {
    const { error } = await supabase.from("articles").update({ publie: !current }).eq("id", id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Succes", description: `Article ${!current ? "publie" : "masque"}.` });
      fetchArticles();
    }
  };

  const deleteArticle = async (id: string): Promise<void> => {
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Succes", description: "Article supprime." });
      fetchArticles();
    }
  };

  if (loading) return <div className="flex justify-center py-8"><Spinner size="md" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{articles.length} article(s)</p>
        <UButton variant="primary" size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Fermer" : "Nouvel article"}
        </UButton>
      </div>
      {showForm && <ArticleForm onSuccess={() => { setShowForm(false); fetchArticles(); }} onCancel={() => setShowForm(false)} />}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Categorie</TableHead>
            <TableHead>Auteur</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Publier</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((a) => (
            <TableRow key={a.id}>
              <TableCell className="font-medium max-w-xs truncate">{a.titre}</TableCell>
              <TableCell><UBadge variant="info">{a.categorie}</UBadge></TableCell>
              <TableCell>{a.auteur}</TableCell>
              <TableCell>
                <UBadge variant={a.publie ? "success" : "warning"}>
                  {a.publie ? "Publie" : "Masque"}
                </UBadge>
              </TableCell>
              <TableCell>
                <Switch checked={a.publie} onCheckedChange={() => togglePublie(a.id, a.publie)} />
              </TableCell>
              <TableCell>
                <UButton variant="danger" size="sm" onClick={() => deleteArticle(a.id)}>Supprimer</UButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArticlesManager;
