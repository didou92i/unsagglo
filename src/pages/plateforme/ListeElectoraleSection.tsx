import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { candidatSchema, type CandidatFormData } from "./candidatSchema";
import { useCandidatSubmit } from "@/hooks/useCandidatSubmit";
import { InputField, SelectField, FormError } from "@/components/forms";
import { SectionTitle } from "@/components/sections";
import { Checkbox } from "@/components/ui/checkbox";
import UButton from "@/components/ui/UButton";
import UCard from "@/components/ui/UCard";
import ListeElectoraleFields from "./ListeElectoraleFields";

const SERVICES = [
  { value: "CARPF", label: "Agglo CRF (CARPF)" },
  { value: "DDT", label: "DDT" },
  { value: "DRIHL", label: "DRIHL" },
  { value: "Autre", label: "Autre" },
];

const ListeElectoraleSection = (): JSX.Element => {
  const [checked, setChecked] = useState<boolean>(false);
  const { submit, loading, success, error } = useCandidatSubmit();
  const { register, handleSubmit, formState: { errors } } = useForm<CandidatFormData>({
    resolver: zodResolver(candidatSchema),
  });

  if (success) {
    return (
      <section id="liste-electorale" className="px-4 md:px-6 py-16">
        <UCard className="text-center border-2 border-[var(--color-green)] max-w-lg mx-auto">
          <h3 className="font-display text-xl font-bold text-foreground">Candidature envoyee</h3>
          <p className="text-muted-foreground mt-2">Merci ! Votre candidature sera examinee.</p>
        </UCard>
      </section>
    );
  }

  return (
    <section id="liste-electorale" className="px-4 md:px-6 py-16">
      <SectionTitle
        title="Rejoindre la liste UNSAgglo"
        subtitle="Vous souhaitez aller plus loin ? Rejoignez notre liste electorale."
      />
      <div className="max-w-lg mx-auto">
        <p className="text-muted-foreground text-sm mb-4">
          Vous partagez nos valeurs et souhaitez vous engager activement aux cotes
          d'UNSAgglo pour les elections de decembre 2026 ? Candidatez pour figurer
          sur notre liste en cochant la case ci-dessous.
        </p>
        <div className="flex items-start gap-2 mb-6">
          <Checkbox
            id="liste"
            checked={checked}
            onCheckedChange={(v) => setChecked(v === true)}
          />
          <label htmlFor="liste" className="text-sm font-medium text-foreground cursor-pointer leading-tight">
            Je souhaite rejoindre la liste electorale UNSAgglo
          </label>
        </div>
        {checked && (
          <form onSubmit={handleSubmit((d) => submit(d))} className="space-y-1">
            {error && <FormError message={error} />}
            <InputField<CandidatFormData> label="Prenom" name="prenom" register={register} error={errors.prenom} />
            <SelectField<CandidatFormData> label="Service" name="service" register={register} error={errors.service} options={SERVICES} />
            <ListeElectoraleFields register={register} errors={errors} />
            <p className="text-xs text-muted-foreground mt-4">
              Conformement au RGPD, ces informations sont strictement confidentielles,
              reservees a l'usage interne d'UNSAgglo et accessibles uniquement aux
              responsables habilites. Elles ne seront ni transmises ni publiees.
            </p>
            <UButton type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-4">
              Envoyer ma candidature
            </UButton>
          </form>
        )}
      </div>
    </section>
  );
};

export default ListeElectoraleSection;
