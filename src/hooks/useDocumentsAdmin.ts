import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { DocItem } from "@/types/document";

interface UseDocumentsAdminReturn {
  docs: DocItem[];
  loading: boolean;
  uploading: boolean;
  upload: (file: File) => Promise<void>;
  remove: (name: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useDocumentsAdmin(): UseDocumentsAdminReturn {
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);

  const refresh = useCallback(async (): Promise<void> => {
    setLoading(true);
    const { data, error } = await supabase.storage.from("documents").list();
    if (!error && data) {
      setDocs(
        data
          .filter((f) => f.name !== ".emptyFolderPlaceholder")
          .map((f) => ({
            name: f.name,
            created_at: f.created_at ?? "",
            url: supabase.storage.from("documents").getPublicUrl(f.name).data.publicUrl,
          }))
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const upload = async (file: File): Promise<void> => {
    setUploading(true);
    const { error } = await supabase.storage.from("documents").upload(file.name, file, { upsert: true });
    setUploading(false);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Succes", description: "Document uploade." });
      refresh();
    }
  };

  const remove = async (name: string): Promise<void> => {
    const { error } = await supabase.storage.from("documents").remove([name]);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Succes", description: "Document supprime." });
      refresh();
    }
  };

  return { docs, loading, uploading, upload, remove, refresh };
}
