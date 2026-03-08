import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useContribSubmit } from "@/hooks/useContribSubmit";
import { InputField, SelectField, TextareaField, FormError } from "@/components/forms";
import { SectionTitle } from "@/components/sections";
import UButton from "@/components/ui/UButton";
import UCard from "@/components/ui/UCard";
import { Checkbox } from "@/components/ui/checkbox";

const schema = z.object({
  prenom: z.string().optional(),
  service: z.string().min(2, "Service requis"),
  theme: z.enum(["remuneration", "conditions_travail", "carriere", "rps", "autre"], {
    errorMap: () => ({ message: "Selectionnez un theme" }),
  }),
  contenu: z.string().min(20, "Proposition trop courte (20 caracteres minimum)"),
});

type FormData = z.infer<typeof schema>;

const THEMES = [
  { value: "remuneration", label: "Remuneration" },
  { value: "conditions_travail", label: "Conditions de travail" },
  { value: "carriere", label: "Carriere" },
  { value: "rps", label: "Risques psychosociaux" },
  { value: "autre", label: "Autre" },
];

const SERVICES = [
  { value: "CARPF", label: "Agglo CRF (CARPF)" },
  { value: "DDT", label: "DDT" },
  { value: "DRIHL", label: "DRIHL" },
  { value: "Autre", label: "Autre" },
];

const ContribSection = (): JSX.Element => {
  const [anonyme, setAnonyme] = useState<boolean>(false);
  const { submit, loading, success, error } = useContribSubmit();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData): Promise<void> => {
    await submit({
      prenom: anonyme ? "Anonyme" : (data.prenom ?? "Anonyme"),
      service: data.service,
      theme: data.theme,
      contenu: data.contenu,
      anonyme,
    });
  };

  if (success) {
    return (
      <section id="contribution" className="px-4 md:px-6 py-16 bg-muted">
        <UCard className="text-center border-2 border-[var(--color-green)] max-w-lg mx-auto">
          <svg className="h-12 w-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="var(--color-green)">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h3 className="font-display text-xl font-bold text-foreground">Contribution envoyee</h3>
          <p className="text-muted-foreground mt-2">Merci ! Votre proposition sera etudiee.</p>
        </UCard>
      </section>
    );
  }

  return (
    <section id="contribution" className="px-4 md:px-6 py-16 bg-muted">
      <SectionTitle title="Deposez votre contribution" subtitle="Partagez vos idees pour le programme 2026." />
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
        {error && <FormError message={error} />}

        <div className="flex items-center gap-2 mb-4">
          <Checkbox
            id="anonyme"
            checked={anonyme}
            onCheckedChange={(checked) => setAnonyme(checked === true)}
          />
          <label htmlFor="anonyme" className="text-sm text-foreground cursor-pointer">
            Contribution anonyme
          </label>
        </div>

        {!anonyme && (
          <InputField<FormData>
            label="Prenom"
            name="prenom"
            register={register}
            error={errors.prenom}
            placeholder="Votre prenom"
          />
        )}

        <SelectField<FormData> label="Service" name="service" register={register} error={errors.service} options={SERVICES} />
        <SelectField<FormData> label="Theme" name="theme" register={register} error={errors.theme} options={THEMES} />
        <TextareaField<FormData>
          label="Votre proposition"
          name="contenu"
          register={register}
          error={errors.contenu}
          rows={5}
          placeholder="Decrivez votre proposition pour le programme..."
        />
        <UButton type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-2">
          Envoyer ma contribution
        </UButton>
      </form>
    </section>
  );
};

export default ContribSection;
