import { useAdminAdherents } from "@/hooks/useAdminAdherents";
import { useAdherentFilters } from "@/hooks/useAdherentFilters";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import UButton from "@/components/ui/UButton";
import UBadge from "@/components/ui/UBadge";
import Spinner from "@/components/ui/Spinner";
import { serviceLabel } from "@/lib/serviceLabel";
import AdherentFiltersBar from "./AdherentFiltersBar";

const AdherentsManager = (): JSX.Element => {
  const { adherents, loading, updateStatut, handleExport } = useAdminAdherents();
  const filters = useAdherentFilters(adherents);

  if (loading) return <div className="flex justify-center py-8"><Spinner size="md" /></div>;

  return (
    <div className="space-y-4">
      <AdherentFiltersBar
        serviceFilter={filters.serviceFilter}
        statutFilter={filters.statutFilter}
        setServiceFilter={filters.setServiceFilter}
        setStatutFilter={filters.setStatutFilter}
        count={filters.filtered.length}
        onExport={() => handleExport(filters.filtered)}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filters.filtered.map((a) => (
            <TableRow key={a.id}>
              <TableCell className="font-medium">{a.prenom} {a.nom}</TableCell>
              <TableCell>{a.email}</TableCell>
              <TableCell>{serviceLabel(a.service)}</TableCell>
              <TableCell>
                <UBadge variant={a.statut === "actif" ? "success" : a.statut === "en_attente" ? "warning" : "danger"}>
                  {a.statut}
                </UBadge>
              </TableCell>
              <TableCell>
                {a.statut === "en_attente" && (
                  <div className="flex gap-2">
                    <UButton size="sm" variant="primary" onClick={() => updateStatut(a.id, "actif")}>Valider</UButton>
                    <UButton size="sm" variant="outline" onClick={() => updateStatut(a.id, "resilie")}>Refuser</UButton>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdherentsManager;
