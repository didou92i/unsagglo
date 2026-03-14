import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { exportCsv } from "@/lib/exportCsv";
import { serviceLabel } from "@/lib/serviceLabel";

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

interface UseAdminAdherentsReturn {
  adherents: AdherentRow[];
  loading: boolean;
  updateStatut: (id: string, statut: string) => Promise<void>;
  handleExport: (filtered: AdherentRow[]) => void;
}

export function useAdminAdherents(): UseAdminAdherentsReturn {
  const [adherents, setAdherents] = useState<AdherentRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetch = async (): Promise<void> => {
    setLoading(true);
    const { data, error } = await supabase
      .from("adherents")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setAdherents(data as AdherentRow[]);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const updateStatut = async (id: string, statut: string): Promise<void> => {
    const { error } = await supabase.from("adherents").update({ statut }).eq("id", id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Succes", description: `Adherent ${statut === "actif" ? "valide" : "refuse"}.` });
      fetch();
    }
  };

  const handleExport = (filtered: AdherentRow[]): void => {
    exportCsv(filtered.map((a) => ({
      Nom: a.nom, Prenom: a.prenom, Email: a.email,
      Service: serviceLabel(a.service), Grade: a.grade ?? "",
      Statut: a.statut, Date: a.created_at,
    })), "adherents.csv");
  };

  return { adherents, loading, updateStatut, handleExport };
}
