import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adhesionSchema, useAdhesion, type AdhesionFormData } from "./useAdhesion";
import { InputField, FormError } from "@/components/forms";
import UButton from "@/components/ui/UButton";
import UCard from "@/components/ui/UCard";

const AdhesionForm = (): JSX.Element => {
  const { submit, loading, success, error } = useAdhesion();
  const { register, handleSubmit, formState: { errors } } = useForm<AdhesionFormData>({
    resolver: zodResolver(adhesionSchema),
  });

  if (success) {
    return (
      <UCard className="text-center border-2 border-green">
        <svg className="h-12 w-12 text-green mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        <h3 className="font-display text-xl font-bold text-foreground">Demande envoyee !</h3>
        <p className="text-muted-foreground mt-2">Le bureau UNSAgglo reviendra vers vous sous 48h.</p>
      </UCard>
    );
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
