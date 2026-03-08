import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useArticleForm } from "@/hooks/useArticleForm";
import { articleSchema } from "./articleSchema";
import type { ArticleFormData } from "./articleSchema";
import UButton from "@/components/ui/UButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

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
  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: { titre: "", contenu: "", categorie: "actualite", auteur: "Bureau UNSAgglo" },
  });

  const handleSubmit = async (data: ArticleFormData): Promise<void> => {
    const ok = await submit({ ...data, slug: slugify(data.titre) });
    if (ok) onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 border border-border rounded-[var(--radius-md)] p-6 bg-card">
        <h3 className="font-display text-lg font-bold text-foreground">Nouvel article</h3>
        <FormField control={form.control} name="titre" render={({ field }) => (
          <FormItem>
            <FormLabel>Titre</FormLabel>
            <FormControl><Input {...field} placeholder="Titre de l'article" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="categorie" render={({ field }) => (
            <FormItem>
              <FormLabel>Categorie</FormLabel>
              <FormControl>
                <select {...field} className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground">
                  {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="auteur" render={({ field }) => (
            <FormItem>
              <FormLabel>Auteur</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name="contenu" render={({ field }) => (
          <FormItem>
            <FormLabel>Contenu</FormLabel>
            <FormControl><Textarea {...field} rows={8} placeholder="Contenu de l'article..." /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="flex gap-3">
          <UButton variant="primary" type="submit" loading={loading}>Creer</UButton>
          <UButton variant="outline" type="button" onClick={onCancel}>Annuler</UButton>
        </div>
      </form>
    </Form>
  );
};

export default ArticleForm;
