import { useAdminContributions } from "@/hooks/useAdminContributions";
import Spinner from "@/components/ui/Spinner";
import UButton from "@/components/ui/UButton";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableHeader, TableHead, TableBody, TableRow, TableCell,
} from "@/components/ui/table";
import { THEMES } from "@/constants/themes";
import { STATUTS } from "@/constants/statuts";
import { exportCsv } from "@/lib/exportCsv";

const themeLabel = (value: string): string =>
  THEMES.find((t) => t.value === value)?.label ?? value;

const statutLabel = (value: string): string =>
  STATUTS.find((s) => s.value === value)?.label ?? value;

const truncate = (text: string, max = 80): string =>
  text.length > max ? `${text.slice(0, max)}...` : text;

const ContributionsManager = (): JSX.Element => {
  const { contributions, loading } = useAdminContributions();

  if (loading) return <Spinner />;

  const handleExport = (): void => {
    exportCsv(contributions.map((c) => ({
      Prenom: c.anonyme ? "" : c.prenom,
      Service: c.anonyme ? "" : c.service,
      Statut: c.statut ? statutLabel(c.statut) : "",
      Theme: themeLabel(c.theme),
      Contenu: c.contenu,
      Anonyme: c.anonyme ? "Oui" : "Non",
      Date: c.created_at,
    })), "contributions.csv");
  };

  if (contributions.length === 0) {
    return <p className="text-muted-foreground text-center py-8">Aucune contribution pour le moment.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{contributions.length} contribution(s)</p>
        <UButton variant="outline" size="sm" onClick={handleExport}>Exporter CSV</UButton>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Prenom</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Theme</TableHead>
            <TableHead className="min-w-[240px]">Contenu</TableHead>
            <TableHead>Anonyme</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contributions.map((c) => (
            <TableRow key={c.id}>
              <TableCell className="font-medium">{c.anonyme ? "\u2014" : c.prenom}</TableCell>
              <TableCell>{c.anonyme ? "\u2014" : c.service}</TableCell>
              <TableCell>{c.statut ? statutLabel(c.statut) : "\u2014"}</TableCell>
              <TableCell><Badge variant="outline">{themeLabel(c.theme)}</Badge></TableCell>
              <TableCell>{truncate(c.contenu)}</TableCell>
              <TableCell>{c.anonyme ? <Badge variant="secondary">Oui</Badge> : "Non"}</TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {new Date(c.created_at).toLocaleDateString("fr-FR")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContributionsManager;
