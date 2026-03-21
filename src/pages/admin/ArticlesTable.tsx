import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import UBadge from "@/components/ui/UBadge";
import UButton from "@/components/ui/UButton";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ArticleRow {
  id: string;
  titre: string;
  categorie: string;
  auteur: string;
  publie: boolean;
}

interface ArticlesTableProps {
  articles: ArticleRow[];
  togglePublie: (id: string, current: boolean) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
}

const isVeilleIA = (auteur: string): boolean => auteur.toLowerCase().includes("veille ia");

const ArticlesTable = ({ articles, togglePublie, deleteArticle }: ArticlesTableProps): JSX.Element => (
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
          <TableCell>
            <div className="flex items-center gap-1.5">
              <UBadge variant="info">{a.categorie}</UBadge>
              {isVeilleIA(a.auteur) && <UBadge variant="neutral">IA</UBadge>}
            </div>
          </TableCell>
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
                    Supprimer l&apos;article &laquo; {a.titre} &raquo; ? Cette action est irreversible.
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
);

export default ArticlesTable;
