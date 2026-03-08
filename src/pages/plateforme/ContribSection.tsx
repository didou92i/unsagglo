import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContribSubmit } from "@/hooks/useContribSubmit";
import { useCandidatSubmit } from "@/hooks/useCandidatSubmit";
import { contribSchema, type ContribFormData } from "./contribSchema";
import { InputField, SelectField, TextareaField, FormError } from "@/components/forms";
import { SectionTitle } from "@/components/sections";
import { THEMES } from "@/constants/themes";
import UButton from "@/components/ui/UButton";

import { Checkbox } from "@/components/ui/checkbox";
import ListeElectoraleInline from "./ListeElectoraleInline";
import ContribSuccess from "./ContribSuccess";

const SERVICES = [
  { value: "CARPF", label: "Agglo CRF (CARPF)" },
  { value: "DDT", label: "DDT" },
  { value: "DRIHL", label: "DRIHL" },
  { value: "Autre", label: "Autre" },
];

const ContribSection = (): JSX.Element => {
  const [anonyme, setAnonyme] = useState<boolean>(false);
  const [rejoindreListe, setRejoindreListe] = useState<boolean>(false);
  const contrib = useContribSubmit();
  const candidat = useCandidatSubmit();
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
    if (checked) {
      setAnonyme(false);
    }
  };

  const onSubmit = async (data: ContribFormData): Promise<void> => {
    const prenom = anonyme ? "Anonyme" : (data.prenom ?? "Anonyme");
    await contrib.submit({ prenom, service: data.service, theme: data.theme, contenu: data.contenu, anonyme });
    if (rejoindreListe && data.nom && data.email && data.telephone && data.adresse) {
      await candidat.submit({ prenom: data.prenom ?? "", nom: data.nom, service: data.service, email: data.email, telephone: data.telephone, adresse: data.adresse });
    }
  };

  if (contrib.success) return <ContribSuccess candidature={rejoindreListe && candidat.success} />;

  const loading = contrib.loading || candidat.loading;
  const error = contrib.error || candidat.error;

  return (
    <section id="contribution" className="px-4 md:px-6 py-16 bg-muted">
      <SectionTitle title="Deposez votre contribution" subtitle="Partagez vos idees pour le programme 2026." />
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
        {error && <FormError message={error} />}
        <div className="flex items-center gap-2 mb-4">
          <Checkbox id="anonyme" checked={anonyme} onCheckedChange={(checked) => onAnonymeChange(checked === true)} disabled={rejoindreListe} />
          <label htmlFor="anonyme" className="text-sm text-foreground cursor-pointer">Contribution anonyme</label>
        </div>
        {!anonyme && (
          <InputField<ContribFormData> label="Prenom" name="prenom" register={register} error={errors.prenom} placeholder="Votre prenom" required={rejoindreListe} />
        )}
        <SelectField<ContribFormData> label="Service" name="service" register={register} error={errors.service} options={SERVICES} />
        <SelectField<ContribFormData> label="Theme" name="theme" register={register} error={errors.theme} options={THEMES} />
        <TextareaField<ContribFormData> label="Votre proposition" name="contenu" register={register} error={errors.contenu} rows={5} placeholder="Decrivez votre proposition pour le programme..." />
        <ListeElectoraleInline checked={rejoindreListe} onCheckedChange={onCheckedChange} register={register} errors={errors} />
        <UButton type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-4">Envoyer ma contribution</UButton>
      </form>
    </section>
  );
};

export default ContribSection;
