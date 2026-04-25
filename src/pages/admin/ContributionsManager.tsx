import { useState } from "react";
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
import ContribTreatmentModal from "./ContribTreatmentModal";
import StatusBadge from "@/pages/plateforme/wall/StatusBadge";
import { STATUS_META, type StatutTraitement } from "@/pages/plateforme/wall/types";
import { toast } from "sonner";

const ContributionsManager = (): JSX.Element => {
  const { contributions, loading, updateTreatment } = useAdminContributions();
  const filters = useContribFilters(contributions);
  const [editing, setEditing] = useState<string | null>(null);

  if (loading) return <Spinner />;

  const handleExport = (): void => {
    exportCsv(filters.filtered.map((c) => ({
      Prenom: c.anonyme ? "" : c.prenom,
      Service: c.anonyme ? "" : serviceLabel(c.service),
      Statut: c.statut ? statutLabel(c.statut) : "",
      Theme: themeLabel(c.theme),
      Themes: (c.themes ?? []).map(themeLabel).join(" | "),
      Contenu: c.contenu,
      Anonyme: c.anonyme ? "Oui" : "Non",
      Suivi: STATUS_META[c.statut_traitement as StatutTraitement]?.label ?? c.statut_traitement,
      ActionUNSAgglo: c.action_unsagglo ?? "",
      EngagementUNSAgglo: c.reponse_direction ?? "",
      Date: c.created_at,
    })), "contributions.csv");
  };

  const handleSave = async (
    id: string,
    data: {
      statut_traitement: string;
      reponse_direction: string | null;
      action_unsagglo: string | null;
    },
  ): Promise<boolean> => {
    const ok = await updateTreatment(id, data);
    if (ok) toast.success("Suivi mis à jour.");
    else toast.error("Impossible de mettre à jour le suivi.");
    return ok;
  };

  if (contributions.length === 0) {
    return <p className="text-muted-foreground text-center py-8">Aucune contribution pour le moment.</p>;
  }

  const editingContrib = contributions.find((c) => c.id === editing) ?? null;

  return (
    <div className="space-y-4">
      <ContribFiltersBar {...filters} count={filters.filtered.length} onExport={handleExport} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Prenom</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Theme</TableHead>
            <TableHead className="min-w-[240px]">Contenu</TableHead>
            <TableHead>Suivi CST</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filters.filtered.map((c) => (
            <TableRow key={c.id}>
              <TableCell className="font-medium">{c.anonyme ? "—" : c.prenom}</TableCell>
              <TableCell>{c.anonyme ? "—" : serviceLabel(c.service)}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1 max-w-[220px]">
                  {(c.themes && c.themes.length > 0 ? c.themes : [c.theme]).map((t) => (
                    <Badge key={t} variant="outline" className="text-xs">
                      {themeLabel(t)}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <ContribContentCell text={c.contenu} />
              <TableCell>
                <StatusBadge
                  statut={c.statut_traitement as StatutTraitement}
                  size="sm"
                />
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {new Date(c.created_at).toLocaleDateString("fr-FR")}
              </TableCell>
              <TableCell className="text-right">
                <button
                  type="button"
                  onClick={() => setEditing(c.id)}
                  className="text-xs text-primary hover:underline"
                >
                  Modifier le suivi
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ContribTreatmentModal
        contribution={editingContrib}
        onClose={() => setEditing(null)}
        onSave={handleSave}
      />
    </div>
  );
};

export default ContributionsManager;
