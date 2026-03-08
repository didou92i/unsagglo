import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adhesionSchema, type AdhesionFormData } from "./useAdhesion";
import { useAdhesionSubmit } from "@/hooks/useAdhesionSubmit";
import { InputField, FormError } from "@/components/forms";
import UButton from "@/components/ui/UButton";
import SuccessCard from "@/components/ui/SuccessCard";

const AdhesionForm = (): JSX.Element => {
  const { submit, loading, success, error } = useAdhesionSubmit();
  const { register, handleSubmit, formState: { errors } } = useForm<AdhesionFormData>({
    resolver: zodResolver(adhesionSchema),
  });

  if (success) {
    return <SuccessCard title="Demande envoyee !" message="Le bureau UNSAgglo reviendra vers vous sous 48h." />;
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-green text-primary-foreground p-6 rounded-t-[var(--radius-lg)]">
        <h3 className="font-display text-2xl font-bold">Rejoindre UNSAgglo -- Libres Ensemble</h3>
      </div>
      <form onSubmit={handleSubmit(submit)} className="bg-card p-6 rounded-b-[var(--radius-lg)] shadow-[var(--shadow-card)]">
        {error && <FormError message={error} />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <InputField<AdhesionFormData> label="Nom" name="nom" register={register} error={errors.nom} required />
          <InputField<AdhesionFormData> label="Prenom" name="prenom" register={register} error={errors.prenom} required />
        </div>
        <InputField<AdhesionFormData> label="Email" name="email" register={register} error={errors.email} type="email" required />
        <InputField<AdhesionFormData> label="Service" name="service" register={register} error={errors.service} required />
        <InputField<AdhesionFormData> label="Grade" name="grade" register={register} error={errors.grade} required />
        <InputField<AdhesionFormData> label="Telephone (optionnel)" name="telephone" register={register} error={errors.telephone} type="tel" />
        <UButton type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-2">
          Envoyer ma demande d'adhesion
        </UButton>
      </form>
    </div>
  );
};

export default AdhesionForm;
