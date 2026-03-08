import { Bot } from "lucide-react";
import { THEME_GROUPS } from "@/constants/themes";
import { STATUT_GROUPS } from "@/constants/statuts";
import { InputField, SelectField, TextareaField, FormError } from "@/components/forms";
import UButton from "@/components/ui/UButton";
import { Checkbox } from "@/components/ui/checkbox";
import ListeElectoraleInline from "./ListeElectoraleInline";
import ProposalAssistant from "./ProposalAssistant";
import { useContribForm } from "./useContribForm";
import type { ContribFormData } from "./contribSchema";

interface ContribHook {
  loading: boolean;
  error: string | null;
  submit: (data: { prenom: string; service: string; statut: string; theme: string; contenu: string; anonyme: boolean }) => Promise<void>;
}

interface CandidatHook {
  loading: boolean;
  error: string | null;
  submit: (data: { prenom: string; nom: string; service: string; email: string; telephone: string; adresse: string }) => Promise<void>;
}

interface ContribFormProps {
  contrib: ContribHook;
  candidat: CandidatHook;
}

const SERVICES = [
  { value: "CARPF", label: "Agglo CRF (CARPF)" },
  { value: "DDT", label: "DDT" },
  { value: "DRIHL", label: "DRIHL" },
  { value: "Autre", label: "Autre" },
];

const ContribForm = ({ contrib, candidat }: ContribFormProps): JSX.Element => {
  const f = useContribForm(contrib, candidat);

  return (
    <form onSubmit={f.handleSubmit(f.onSubmit)}>
      {f.error && <FormError message={f.error} />}
      <div className="flex items-center gap-2 mb-4">
        <Checkbox id="anonyme" checked={f.anonyme} onCheckedChange={(c) => f.onAnonymeChange(c === true)} disabled={f.rejoindreListe} />
        <label htmlFor="anonyme" className="text-sm text-foreground cursor-pointer">Contribution anonyme</label>
      </div>
      {!f.anonyme && (
        <InputField<ContribFormData> label="Prenom" name="prenom" register={f.register} error={f.errors.prenom} placeholder="Votre prenom" required={f.rejoindreListe} />
      )}
      <SelectField<ContribFormData> label="Service" name="service" register={f.register} error={f.errors.service} options={SERVICES} />
      <SelectField<ContribFormData> label="Statut" name="statut" register={f.register} error={f.errors.statut} groups={STATUT_GROUPS} />
      <SelectField<ContribFormData> label="Theme" name="theme" register={f.register} error={f.errors.theme} groups={THEME_GROUPS} />
      <TextareaField<ContribFormData> label="Votre proposition" name="contenu" register={f.register} error={f.errors.contenu} rows={5} placeholder="Decrivez votre proposition..." />
      <UButton type="button" variant="outline" size="sm" onClick={() => f.setAssistantOpen(true)} className="mb-4 gap-2">
        <Bot className="h-4 w-4" /> Assistant IA
      </UButton>
      <ProposalAssistant open={f.assistantOpen} onOpenChange={f.setAssistantOpen} theme={f.currentTheme} onUseProposal={f.handleUseProposal} />
      <ListeElectoraleInline checked={f.rejoindreListe} onCheckedChange={f.onCheckedChange} register={f.register} errors={f.errors} />
      <UButton type="submit" variant="primary" size="lg" loading={f.loading} className="w-full mt-4">Envoyer ma contribution</UButton>
    </form>
  );
};

export default ContribForm;
