import { useAdminContributions } from "@/hooks/useAdminContributions";
import { useContribFilters } from "@/hooks/useContribFilters";
import Spinner from "@/components/ui/Spinner";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableHeader, TableHead, TableBody, TableRow, TableCell,
} from "@/components/ui/table";
import { themeLabel } from "@/lib/themeLabel";
import { statutLabel } from "@/lib/statutLabel";
import { serviceLabel } from "@/lib/serviceLabel";
import { exportCsv } from "@/lib/exportCsv";
import ContribFiltersBar from "./ContribFiltersBar";
import ContribContentCell from "./ContribContentCell";

const ContributionsManager = (): JSX.Element => {
  const { contributions, loading } = useAdminContributions();
  const filters = useContribFilters(contributions);

  if (loading) return <Spinner />;

  const handleExport = (): void => {
    exportCsv(filters.filtered.map((c) => ({
      Prenom: c.anonyme ? "" : c.prenom,
      Service: c.anonyme ? "" : serviceLabel(c.service),
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
      <ContribFiltersBar {...filters} count={filters.filtered.length} onExport={handleExport} />
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
          {filters.filtered.map((c) => (
            <TableRow key={c.id}>
              <TableCell className="font-medium">{c.anonyme ? "\u2014" : c.prenom}</TableCell>
              <TableCell>{c.anonyme ? "\u2014" : serviceLabel(c.service)}</TableCell>
              <TableCell>{c.statut ? statutLabel(c.statut) : "\u2014"}</TableCell>
              <TableCell><Badge variant="outline">{themeLabel(c.theme)}</Badge></TableCell>
              <ContribContentCell text={c.contenu} />
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
