import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import UButton from "@/components/ui/UButton";
import UBadge from "@/components/ui/UBadge";
import Spinner from "@/components/ui/Spinner";
import { toast } from "@/hooks/use-toast";
import { exportCsv } from "@/lib/exportCsv";
import { serviceLabel } from "@/lib/serviceLabel";
import { useAdherentFilters } from "@/hooks/useAdherentFilters";
import AdherentFiltersBar from "./AdherentFiltersBar";

interface AdherentRow {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  service: string | null;
  grade: string | null;
  statut: string;
  created_at: string;
}

const AdherentsManager = (): JSX.Element => {
  const [adherents, setAdherents] = useState<AdherentRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const filters = useAdherentFilters(adherents);

  const fetchAdherents = async (): Promise<void> => {
    setLoading(true);
    const { data, error } = await supabase
      .from("adherents")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setAdherents(data as AdherentRow[]);
    setLoading(false);
  };

  useEffect(() => { fetchAdherents(); }, []);

  const updateStatut = async (id: string, statut: string): Promise<void> => {
    const { error } = await supabase.from("adherents").update({ statut }).eq("id", id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Succes", description: `Adherent ${statut === "actif" ? "valide" : "refuse"}.` });
      fetchAdherents();
    }
  };

  const handleExport = (): void => {
    exportCsv(filters.filtered.map((a) => ({
      Nom: a.nom, Prenom: a.prenom, Email: a.email,
      Service: serviceLabel(a.service), Grade: a.grade ?? "",
      Statut: a.statut, Date: a.created_at,
    })), "adherents.csv");
  };

  if (loading) return <div className="flex justify-center py-8"><Spinner size="md" /></div>;

  return (
    <div className="space-y-4">
      <AdherentFiltersBar
        serviceFilter={filters.serviceFilter}
        statutFilter={filters.statutFilter}
        setServiceFilter={filters.setServiceFilter}
        setStatutFilter={filters.setStatutFilter}
        count={filters.filtered.length}
        onExport={handleExport}
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
