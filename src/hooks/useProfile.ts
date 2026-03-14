import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface ProfileData {
  nom: string;
  prenom: string;
  service: string | null;
  grade: string | null;
  telephone: string | null;
}

interface UseProfileReturn {
  profile: ProfileData | null;
  loading: boolean;
  saving: boolean;
  save: (data: ProfileData) => Promise<void>;
}

export function useProfile(): UseProfileReturn {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  const fetch = useCallback(async (): Promise<void> => {
    if (!user) { setLoading(false); return; }
    const { data } = await supabase
      .from("profiles")
      .select("nom, prenom, service, grade, telephone")
      .eq("user_id", user.id)
      .single();
    if (data) setProfile(data as ProfileData);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetch(); }, [fetch]);

  const save = async (data: ProfileData): Promise<void> => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update(data)
      .eq("user_id", user.id);
    setSaving(false);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      setProfile(data);
      toast({ title: "Profil mis a jour" });
    }
  };

  return { profile, loading, saving, save };
}
