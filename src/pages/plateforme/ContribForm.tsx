import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contribSchema, type ContribFormData } from "./contribSchema";
import { InputField, SelectField, TextareaField, FormError } from "@/components/forms";
import { THEMES } from "@/constants/themes";
import UButton from "@/components/ui/UButton";
import { Checkbox } from "@/components/ui/checkbox";
import ListeElectoraleInline from "./ListeElectoraleInline";

interface SubmitHook {
  loading: boolean;
  error: string | null;
  submit: (data: Record<string, unknown>) => Promise<void>;
}

interface ContribFormProps {
  contrib: SubmitHook;
  candidat: SubmitHook;
}

const SERVICES = [
  { value: "CARPF", label: "Agglo CRF (CARPF)" },
  { value: "DDT", label: "DDT" },
  { value: "DRIHL", label: "DRIHL" },
  { value: "Autre", label: "Autre" },
];

const ContribForm = ({ contrib, candidat }: ContribFormProps): JSX.Element => {
  const [anonyme, setAnonyme] = useState<boolean>(false);
  const [rejoindreListe, setRejoindreListe] = useState<boolean>(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ContribFormData>({
    resolver: zodResolver(contribSchema),
  });

  const onAnonymeChange = (checked: boolean): void => {
    setAnonyme(checked);
    if (checked) {
      setRejoindreListe(false);
      setValue("rejoindreListe", false);
    }
  };

  const onCheckedChange = (checked: boolean): void => {
    setRejoindreListe(checked);
    setValue("rejoindreListe", checked);
    if (checked) setAnonyme(false);
  };

  const onSubmit = async (data: ContribFormData): Promise<void> => {
    const prenom = anonyme ? "Anonyme" : (data.prenom ?? "Anonyme");
    await contrib.submit({ prenom, service: data.service, theme: data.theme, contenu: data.contenu, anonyme });
    if (rejoindreListe && data.nom && data.email && data.telephone && data.adresse) {
      await candidat.submit({
        prenom: data.prenom ?? "", nom: data.nom, service: data.service,
        email: data.email, telephone: data.telephone, adresse: data.adresse,
      });
    }
  };

  const loading = contrib.loading || candidat.loading;
  const error = contrib.error || candidat.error;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <FormError message={error} />}
      <div className="flex items-center gap-2 mb-4">
        <Checkbox id="anonyme" checked={anonyme} onCheckedChange={(c) => onAnonymeChange(c === true)} disabled={rejoindreListe} />
        <label htmlFor="anonyme" className="text-sm text-foreground cursor-pointer">Contribution anonyme</label>
      </div>
      {!anonyme && (
        <InputField<ContribFormData> label="Pr&eacute;nom" name="prenom" register={register} error={errors.prenom} placeholder="Votre pr&eacute;nom" required={rejoindreListe} />
      )}
      <SelectField<ContribFormData> label="Service" name="service" register={register} error={errors.service} options={SERVICES} />
      <SelectField<ContribFormData> label="Th&egrave;me" name="theme" register={register} error={errors.theme} options={THEMES} />
      <TextareaField<ContribFormData> label="Votre proposition" name="contenu" register={register} error={errors.contenu} rows={5} placeholder="D&eacute;crivez votre proposition pour le programme..." />
      <ListeElectoraleInline checked={rejoindreListe} onCheckedChange={onCheckedChange} register={register} errors={errors} />
      <UButton type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-4">Envoyer ma contribution</UButton>
    </form>
  );
};

export default ContribForm;
