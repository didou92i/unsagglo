import { useState } from "react";
import { useArticleForm } from "@/hooks/useArticleForm";
import UButton from "@/components/ui/UButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";


interface ArticleFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const CATEGORIES = [
  { value: "actualite", label: "Actualite" },
  { value: "tract", label: "Tract" },
  { value: "cr_cst", label: "CR CST" },
  { value: "fiche_droit", label: "Fiche droit" },
];

const slugify = (text: string): string =>
  text.toLowerCase().normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const ArticleForm = ({ onSuccess, onCancel }: ArticleFormProps): JSX.Element => {
  const { submit, loading } = useArticleForm();
  const [titre, setTitre] = useState<string>("");
  const [contenu, setContenu] = useState<string>("");
  const [categorie, setCategorie] = useState<string>("actualite");
  const [auteur, setAuteur] = useState<string>("Bureau UNSAgglo");

  const handleSubmit = async (): Promise<void> => {
    if (!titre.trim() || !contenu.trim()) return;
    const ok = await submit({
      titre,
      slug: slugify(titre),
      contenu,
      categorie,
      auteur,
    });
    if (ok) onSuccess();
  };

  return (
    <div className="space-y-4 border border-border rounded-[var(--radius-md)] p-6 bg-card">
      <h3 className="font-display text-lg font-bold text-foreground">Nouvel article</h3>
      <div>
        <Label>Titre</Label>
        <Input value={titre} onChange={(e) => setTitre(e.target.value)} placeholder="Titre de l'article" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Categorie</Label>
          <select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <Label>Auteur</Label>
          <Input value={auteur} onChange={(e) => setAuteur(e.target.value)} />
        </div>
      </div>
      <div>
        <Label>Contenu</Label>
        <Textarea value={contenu} onChange={(e) => setContenu(e.target.value)} rows={8} placeholder="Contenu de l'article..." />
      </div>
      <div className="flex gap-3">
        <UButton variant="primary" onClick={handleSubmit} loading={loading}>Creer</UButton>
        <UButton variant="outline" onClick={onCancel}>Annuler</UButton>
      </div>
    </div>
  );
};

export default ArticleForm;
