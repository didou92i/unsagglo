import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, useContact, type ContactFormData } from "./useContact";
import { InputField, SelectField, TextareaField, FormError } from "@/components/forms";
import UButton from "@/components/ui/UButton";
import UCard from "@/components/ui/UCard";

const OBJET_OPTIONS = [
  { value: "information", label: "Demande d'information" },
  { value: "adhesion", label: "Adhesion" },
  { value: "recours", label: "Aide pour un recours" },
  { value: "autre", label: "Autre" },
];

const ContactForm = (): JSX.Element => {
  const { submit, loading, success, error } = useContact();
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  if (success) {
    return (
      <UCard className="text-center border-2 border-green">
        <svg className="h-12 w-12 text-green mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        <h3 className="font-display text-xl font-bold text-foreground">Message envoye !</h3>
        <p className="text-muted-foreground mt-2">Nous vous repondrons sous 48h.</p>
      </UCard>
    );
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      {error && <FormError message={error} />}
      <InputField<ContactFormData> label="Nom" name="nom" register={register} error={errors.nom} required />
      <InputField<ContactFormData> label="Email" name="email" register={register} error={errors.email} type="email" required />
      <SelectField<ContactFormData> label="Objet" name="objet" register={register} error={errors.objet} options={OBJET_OPTIONS} />
      <TextareaField<ContactFormData> label="Message" name="message" register={register} error={errors.message} rows={5} placeholder="Votre message..." />
      <UButton type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-2">
        Envoyer le message
      </UButton>
    </form>
  );
};

export default ContactForm;
