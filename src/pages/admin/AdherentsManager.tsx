import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import UButton from "@/components/ui/UButton";
import UBadge from "@/components/ui/UBadge";
import Spinner from "@/components/ui/Spinner";
import { serviceLabel } from "@/lib/serviceLabel";
import { useAdminAdherents, type AdherentRow } from "@/hooks/useAdminAdherents";
import { useAdherentFilters } from "@/hooks/useAdherentFilters";
import AdherentFiltersBar from "./AdherentFiltersBar";
import AdherentDetailModal from "./AdherentDetailModal";

type BadgeVariant = "success" | "warning" | "danger" | "neutral";

const STATUT_BADGE: Record<string, { variant: BadgeVariant; label: string }> = {
  pending_validation: { variant: "warning", label: "En attente" },
  actif: { variant: "success", label: "Actif" },
  resilie: { variant: "danger", label: "Résilié" },
};

const formatDateShort = (iso: string | null): string => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};

const resolveServiceDisplay = (a: AdherentRow): string => {
  if (a.service === "autre_service" && a.service_libre) {
    return `Autre : ${a.service_libre}`;
  }
  return serviceLabel(a.service);
};

const AdherentsManager = (): JSX.Element => {
  const { adherents, loading, updateStatut, handleExport } = useAdminAdherents();
  const filters = useAdherentFilters(adherents);
  const [detail, setDetail] = useState<AdherentRow | null>(null);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner size="md" />
      </div>
    );
  }

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
            <TableHead>Adhérent</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Reçue le</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filters.filtered.map((a) => {
            const badge = STATUT_BADGE[a.statut] ?? {
              variant: "neutral" as BadgeVariant,
              label: a.statut,
            };
            return (
              <TableRow key={a.id}>
                <TableCell className="font-medium">
                  {a.prenom} {a.nom}
                </TableCell>
                <TableCell className="text-sm">{a.email}</TableCell>
                <TableCell className="text-sm">
                  {a.categorie ? `Cat. ${a.categorie}` : "—"}
                </TableCell>
                <TableCell className="text-sm max-w-[220px] truncate">
                  {resolveServiceDisplay(a)}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap">
                  {formatDateShort(a.created_at)}
                </TableCell>
                <TableCell>
                  <UBadge variant={badge.variant}>{badge.label}</UBadge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2 flex-wrap">
                    <UButton
                      size="sm"
                      variant="outline"
                      onClick={() => setDetail(a)}
                    >
                      Détail
                    </UButton>
                    {a.statut === "pending_validation" && (
                      <>
                        <UButton
                          size="sm"
                          variant="primary"
                          onClick={() => updateStatut(a.id, "actif")}
                        >
                          Valider
                        </UButton>
                        <UButton
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatut(a.id, "resilie")}
                        >
                          Refuser
                        </UButton>
                      </>
                    )}
                    {a.statut === "actif" && (
                      <UButton
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatut(a.id, "resilie")}
                      >
                        Résilier
                      </UButton>
                    )}
                    {a.statut === "resilie" && (
                      <UButton
                        size="sm"
                        variant="primary"
                        onClick={() => updateStatut(a.id, "actif")}
                      >
                        Réactiver
                      </UButton>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {detail && (
        <AdherentDetailModal adherent={detail} onClose={() => setDetail(null)} />
      )}
    </div>
  );
};

export default AdherentsManager;
