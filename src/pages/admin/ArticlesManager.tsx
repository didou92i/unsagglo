import { useState } from "react";
import { useAdminArticles } from "@/hooks/useAdminArticles";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import UBadge from "@/components/ui/UBadge";
import UButton from "@/components/ui/UButton";
import Spinner from "@/components/ui/Spinner";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ArticleForm from "./ArticleForm";

const ArticlesManager = (): JSX.Element => {
  const { articles, loading, refresh, togglePublie, deleteArticle } = useAdminArticles();
  const [showForm, setShowForm] = useState<boolean>(false);

  if (loading) return <div className="flex justify-center py-8"><Spinner size="md" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{articles.length} article(s)</p>
        <UButton variant="primary" size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Fermer" : "Nouvel article"}
        </UButton>
      </div>
      {showForm && <ArticleForm onSuccess={() => { setShowForm(false); refresh(); }} onCancel={() => setShowForm(false)} />}
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
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <UButton variant="danger" size="sm">Supprimer</UButton>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                      <AlertDialogDescription>
                        Supprimer l'article &laquo; {a.titre} &raquo; ? Cette action est irreversible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteArticle(a.id)}>Supprimer</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArticlesManager;
