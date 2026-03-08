import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contribSchema, type ContribFormData } from "./useContrib";
import { useContribSubmit } from "@/hooks/useContribSubmit";
import { InputField, SelectField, TextareaField, FormError } from "@/components/forms";
import { THEMES } from "@/constants/themes";
import UButton from "@/components/ui/UButton";
import UCard from "@/components/ui/UCard";

const ContribForm = (): JSX.Element => {
  const { submit, loading, success, error, reset: resetSubmit } = useContribSubmit();
  const { register, handleSubmit, reset: resetForm, formState: { errors } } = useForm<ContribFormData>({
    resolver: zodResolver(contribSchema),
  });

  const onSubmit = async (data: ContribFormData): Promise<void> => {
    await submit({
      prenom: data.prenom,
      service: data.service,
      theme: data.theme,
      contenu: data.contenu,
    });
  };

  const handleReset = (): void => {
    resetSubmit();
    resetForm();
  };

  if (success) {
    return (
      <UCard className="text-center border-2 border-green max-w-lg mx-auto">
        <svg className="h-12 w-12 text-green mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h3 className="font-display text-xl font-bold text-foreground">Contribution envoyée -- merci !</h3>
        <p className="text-muted-foreground mt-2">Votre proposition sera étudiée par le bureau UNSAgglo.</p>
        <UButton variant="outline" size="md" onClick={handleReset} className="mt-4">
          Envoyer une autre contribution
        </UButton>
      </UCard>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
      {error && <FormError message={error} />}
      <InputField<ContribFormData> label="Prénom" name="prenom" register={register} error={errors.prenom} placeholder="Votre prénom" />
      <SelectField<ContribFormData> label="Service" name="service" register={register} error={errors.service} options={[
        { value: "CARPF", label: "Agglo CRF (CARPF)" },
        { value: "DDT", label: "DDT" },
        { value: "DRIHL", label: "DRIHL" },
        { value: "Autre", label: "Autre" },
      ]} />
      <SelectField<ContribFormData> label="Thème" name="theme" register={register} error={errors.theme} options={THEMES} />
      <TextareaField<ContribFormData> label="Votre proposition" name="contenu" register={register} error={errors.contenu} rows={5} placeholder="Décrivez votre proposition pour le programme..." />
      <UButton type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-2">
        Envoyer ma contribution
      </UButton>
    </form>
  );
};

export default ContribForm;
