import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adhesionSchema, type AdhesionFormData } from "./adhesionSchema";
import { useAdhesionSubmit } from "@/hooks/useAdhesionSubmit";
import {
  InputField,
  SelectField,
  FormError,
  RGPDConsent,
} from "@/components/forms";
import { SERVICE_GROUPS } from "@/constants/services";
import UButton from "@/components/ui/UButton";
import SuccessCard from "@/components/ui/SuccessCard";

const AdhesionForm = (): JSX.Element => {
  const { submit, loading, success, error } = useAdhesionSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdhesionFormData>({
    resolver: zodResolver(adhesionSchema),
  });
  const [rgpdConsent, setRgpdConsent] = useState<boolean>(false);
  const [rgpdError, setRgpdError] = useState<string | null>(null);

  if (success) {
    return (
      <SuccessCard
        title="Demande envoyee !"
        message="Le bureau UNSAgglo reviendra vers vous sous 48h."
      />
    );
  }

  const onSubmit = (data: AdhesionFormData): void => {
    if (!rgpdConsent) {
      setRgpdError(
        "Vous devez accepter la politique de confidentialité pour adhérer.",
      );
      return;
    }
    setRgpdError(null);
    void submit(data);
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-green text-primary-foreground p-6 rounded-t-[var(--radius-lg)]">
        <h3 className="font-display text-2xl font-bold">
          Rejoindre UNSAgglo -- Libres Ensemble
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card p-6 rounded-b-[var(--radius-lg)] shadow-[var(--shadow-card)]"
      >
        {error && <FormError message={error} />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <InputField<AdhesionFormData>
            label="Nom"
            name="nom"
            register={register}
            error={errors.nom}
            required
          />
          <InputField<AdhesionFormData>
            label="Prenom"
            name="prenom"
            register={register}
            error={errors.prenom}
            required
          />
        </div>
        <InputField<AdhesionFormData>
          label="Email"
          name="email"
          register={register}
          error={errors.email}
          type="email"
          required
        />
        <SelectField<AdhesionFormData>
          label="Service"
          name="service"
          register={register}
          error={errors.service}
          groups={SERVICE_GROUPS}
          placeholder="Choisir votre service..."
        />
        <InputField<AdhesionFormData>
          label="Grade"
          name="grade"
          register={register}
          error={errors.grade}
          required
        />
        <InputField<AdhesionFormData>
          label="Telephone (optionnel)"
          name="telephone"
          register={register}
          error={errors.telephone}
          type="tel"
        />
        <RGPDConsent
          id="adhesion-rgpd"
          variant="adhesion"
          checked={rgpdConsent}
          onCheckedChange={(c) => {
            setRgpdConsent(c);
            if (c) setRgpdError(null);
          }}
          error={rgpdError ?? undefined}
        />
        <UButton
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full mt-4"
        >
          Envoyer ma demande d'adhesion
        </UButton>
      </form>
    </div>
  );
};

export default AdhesionForm;
