import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { exportCsv } from "@/lib/exportCsv";
import { serviceLabel } from "@/lib/serviceLabel";

export interface AdherentRow {
  id: string;
  // Identité civile
  nom: string;
  prenom: string;
  date_naissance: string | null;
  // Coordonnées
  email: string;
  telephone: string | null;
  adresse_ligne1: string | null;
  adresse_ligne2: string | null;
  adresse_cp: string | null;
  adresse_ville: string | null;
  // Situation professionnelle
  service: string | null;
  service_libre: string | null;
  grade: string | null;
  categorie: string | null;
  echelon: number | null;
  statut_pro: string | null;
  site_affectation: string | null;
  date_entree_carpf: string | null;
  // Modalités
  mode_paiement: string | null;
  periodicite_paiement: string | null;
  // Traçabilité
  rgpd_consent_at: string | null;
  statuts_acceptes_at: string | null;
  // Workflow
  statut: string;
  created_at: string;
  updated_at: string | null;
}

interface UseAdminAdherentsReturn {
  adherents: AdherentRow[];
  loading: boolean;
  updateStatut: (id: string, statut: string) => Promise<void>;
  handleExport: (filtered: AdherentRow[]) => void;
  refresh: () => Promise<void>;
}

const STATUT_LABEL: Record<string, string> = {
  pending_validation: "remis en attente",
  actif: "validé",
  resilie: "résilié",
};

export function useAdminAdherents(): UseAdminAdherentsReturn {
  const [adherents, setAdherents] = useState<AdherentRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAll = useCallback(async (): Promise<void> => {
    setLoading(true);
    const { data, error } = await supabase
      .from("adherents")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setAdherents(data as unknown as AdherentRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  const updateStatut = useCallback(
    async (id: string, statut: string): Promise<void> => {
      const { error } = await supabase
        .from("adherents")
        .update({ statut })
        .eq("id", id);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success(`Adhérent ${STATUT_LABEL[statut] ?? "mis à jour"}.`);
      void fetchAll();
    },
    [fetchAll],
  );

  const handleExport = useCallback((filtered: AdherentRow[]): void => {
    exportCsv(
      filtered.map((a) => ({
        Prénom: a.prenom,
        Nom: a.nom,
        "Date de naissance": a.date_naissance ?? "",
        Email: a.email,
        Téléphone: a.telephone ?? "",
        Adresse: [a.adresse_ligne1, a.adresse_ligne2, a.adresse_cp, a.adresse_ville]
          .filter(Boolean)
          .join(" "),
        Catégorie: a.categorie ?? "",
        Grade: a.grade ?? "",
        Échelon: a.echelon ?? "",
        "Statut pro": a.statut_pro ?? "",
        Service:
          a.service === "autre_service"
            ? `Autre : ${a.service_libre ?? ""}`
            : serviceLabel(a.service),
        "Site d'affectation": a.site_affectation ?? "",
        "Entrée CARPF": a.date_entree_carpf ?? "",
        "Mode paiement": a.mode_paiement ?? "",
        "Statut adhésion": a.statut,
        "Consentement RGPD": a.rgpd_consent_at ?? "",
        "Acceptation statuts": a.statuts_acceptes_at ?? "",
        "Demande créée le": a.created_at,
      })),
      `adherents-unsagglo-${new Date().toISOString().slice(0, 10)}.csv`,
    );
  }, []);

  return {
    adherents,
    loading,
    updateStatut,
    handleExport,
    refresh: fetchAll,
  };
}
