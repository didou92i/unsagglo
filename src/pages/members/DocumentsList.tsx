import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import UCard from "@/components/ui/UCard";
import UBadge from "@/components/ui/UBadge";
import Spinner from "@/components/ui/Spinner";

interface DocItem {
  name: string;
  url: string;
  created_at: string;
  type: string;
}

const detectType = (name: string): string => {
  if (name.toLowerCase().includes("pv")) return "PV";
  if (name.toLowerCase().includes("tract")) return "Tract";
  if (name.toLowerCase().includes("modele") || name.toLowerCase().includes("recours")) return "Modele";
  return "Document";
};

const DocumentsList = (): JSX.Element => {
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDocs = async (): Promise<void> => {
      const { data, error } = await supabase.storage.from("documents").list();
      if (!error && data) {
        const items: DocItem[] = data
          .filter((f) => f.name !== ".emptyFolderPlaceholder")
          .map((f) => ({
            name: f.name,
            url: supabase.storage.from("documents").getPublicUrl(f.name).data.publicUrl,
            created_at: f.created_at ?? "",
            type: detectType(f.name),
          }));
        setDocs(items);
      }
      setLoading(false);
    };
    fetchDocs();
  }, []);

  if (loading) return <div className="flex justify-center py-8"><Spinner size="lg" /></div>;

  if (docs.length === 0) {
    return <p className="text-muted-foreground text-center py-8">Aucun document disponible pour le moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {docs.map((doc) => (
        <UCard key={doc.name} padding="sm">
          <div className="flex items-center justify-between">
            <div>
              <UBadge variant="info">{doc.type}</UBadge>
              <h4 className="font-display font-bold text-foreground mt-2">{doc.name}</h4>
              {doc.created_at && <p className="text-xs text-muted-foreground">{new Date(doc.created_at).toLocaleDateString("fr-FR")}</p>}
            </div>
            <a href={doc.url} target="_blank" rel="noopener noreferrer" className="border-2 border-primary text-primary font-display font-bold px-3 py-1.5 text-sm rounded-[var(--radius-sm)] hover:bg-primary hover:text-primary-foreground transition-all">
              Telecharger
            </a>
          </div>
        </UCard>
      ))}
    </div>
  );
};

export default DocumentsList;
