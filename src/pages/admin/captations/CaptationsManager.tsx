import { useMemo, useState } from "react";
import { toast } from "sonner";
import Spinner from "@/components/ui/Spinner";
import KpiCards from "./KpiCards";
import FunnelStats from "./FunnelStats";
import CaptationsFilters from "./CaptationsFilters";
import CaptationsTable from "./CaptationsTable";
import CaptationDetailModal from "./CaptationDetailModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { useCaptationsAdmin } from "./useCaptationsAdmin";
import { exportCaptationsCsv } from "./csvExport";
import type { CaptationFilters, CaptationRow } from "./types";
import { DEFAULT_FILTERS } from "./types";

const PAGE_SIZE = 25;

const applyFilters = (
  rows: CaptationRow[],
  filters: CaptationFilters,
): CaptationRow[] => {
  const search = filters.search.trim().toLowerCase();
  return rows.filter((r) => {
    if (filters.eligibilite !== "all" && r.eligibilite !== filters.eligibilite) return false;
    if (
      filters.critereBloquant !== "all" &&
      r.critere_bloquant !== filters.critereBloquant
    )
      return false;
    if (filters.newsletter === "yes" && !r.opt_in_newsletter) return false;
    if (filters.newsletter === "no" && r.opt_in_newsletter) return false;
    if (filters.statutRelance !== "all" && r.statut_relance !== filters.statutRelance)
      return false;
    if (search && !r.email.toLowerCase().includes(search)) return false;
    return true;
  });
};

const CaptationsManager = (): JSX.Element => {
  const {
    rows,
    loading,
    error,
    updateStatutRelance,
    updateNotes,
    deleteRow,
  } = useCaptationsAdmin();

  const [filters, setFilters] = useState<CaptationFilters>(DEFAULT_FILTERS);
  const [page, setPage] = useState<number>(1);
  const [detailRow, setDetailRow] = useState<CaptationRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CaptationRow | null>(null);

  const filtered = useMemo(() => applyFilters(rows, filters), [rows, filters]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = useMemo(
    () =>
      filtered.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE,
      ),
    [filtered, currentPage],
  );

  const handleFilterChange = (next: CaptationFilters): void => {
    setFilters(next);
    setPage(1);
  };

  const handleStatutChange = async (id: string, statut: string): Promise<void> => {
    const ok = await updateStatutRelance(id, statut);
    if (!ok) toast.error("Impossible de mettre à jour le statut.");
  };

  const handleDetailStatut = async (id: string, statut: string): Promise<boolean> => {
    const ok = await updateStatutRelance(id, statut);
    if (!ok) toast.error("Impossible de mettre à jour le statut.");
    return ok;
  };

  const handleSaveNotes = async (id: string, notes: string): Promise<boolean> => {
    const ok = await updateNotes(id, notes);
    if (!ok) toast.error("Impossible d'enregistrer les notes.");
    return ok;
  };

  const handleDelete = async (): Promise<boolean> => {
    if (!deleteTarget) return false;
    const ok = await deleteRow(deleteTarget.id);
    if (ok) toast.success("Captation supprimée.");
    else toast.error("Impossible de supprimer la captation.");
    return ok;
  };

  const handleExport = (): void => {
    if (filtered.length === 0) {
      toast.info("Aucune ligne à exporter.");
      return;
    }
    exportCaptationsCsv(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md p-4 text-sm text-destructive bg-destructive/10">
        Erreur lors du chargement des captations : {error}
      </div>
    );
  }

  return (
    <div>
      <KpiCards rows={rows} />
      <FunnelStats />

      <div className="flex items-center justify-between gap-4 mb-2">
        <h2 className="font-display font-medium text-secondary text-lg">
          Captations ({filtered.length})
        </h2>
        <button
          type="button"
          onClick={handleExport}
          className="text-white text-sm font-medium rounded-[6px] px-4 py-2 transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#009fe3" }}
        >
          Export CSV
        </button>
      </div>

      <CaptationsFilters filters={filters} onChange={handleFilterChange} />

      <div
        className="rounded-lg border bg-white"
        style={{ borderColor: "#e6eaf0" }}
      >
        <CaptationsTable
          rows={pageRows}
          onDetail={setDetailRow}
          onDelete={setDeleteTarget}
          onStatutChange={(id, statut) => void handleStatutChange(id, statut)}
        />
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-muted-foreground">
            Page {currentPage} / {totalPages} · {filtered.length} résultats
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="text-sm text-secondary border border-secondary rounded-[6px] px-3 py-1.5 hover:bg-secondary hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Précédent
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="text-sm text-secondary border border-secondary rounded-[6px] px-3 py-1.5 hover:bg-secondary hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Suivant →
            </button>
          </div>
        </div>
      )}

      <CaptationDetailModal
        row={detailRow}
        onClose={() => setDetailRow(null)}
        onSaveNotes={handleSaveNotes}
        onStatutChange={handleDetailStatut}
      />

      <DeleteConfirmModal
        email={deleteTarget?.email ?? null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default CaptationsManager;
