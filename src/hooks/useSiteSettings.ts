import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SiteSettings {
  page_news: boolean;
  page_rights: boolean;
  page_elections: boolean;
  page_contact: boolean;
  page_membership: boolean;
  page_members: boolean;
  page_plateforme: boolean;
  page_aide_carburant: boolean;
}

interface UseSiteSettingsReturn {
  settings: SiteSettings;
  loading: boolean;
  toggleSetting: (key: keyof SiteSettings) => Promise<void>;
}

const DEFAULT_SETTINGS: SiteSettings = {
  page_news: true,
  page_rights: true,
  page_elections: true,
  page_contact: true,
  page_membership: true,
  page_members: true,
  page_plateforme: true,
  page_aide_carburant: true,
};

export function useSiteSettings(): UseSiteSettingsReturn {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");

      if (!error && data) {
        const mapped = { ...DEFAULT_SETTINGS };
        data.forEach((row) => {
          const k = row.key as keyof SiteSettings;
          if (k in mapped) mapped[k] = row.value;
        });
        setSettings(mapped);
      }
      setLoading(false);
    };

    fetch();
  }, []);

  const toggleSetting = useCallback(
    async (key: keyof SiteSettings): Promise<void> => {
      const newValue = !settings[key];
      setSettings((prev) => ({ ...prev, [key]: newValue }));

      const { error } = await supabase
        .from("site_settings")
        .update({ value: newValue, updated_at: new Date().toISOString() })
        .eq("key", key);

      if (error) {
        setSettings((prev) => ({ ...prev, [key]: !newValue }));
      }
    },
    [settings]
  );

  return { settings, loading, toggleSetting };
}
