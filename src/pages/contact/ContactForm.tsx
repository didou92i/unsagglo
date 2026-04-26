import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, useContact, type ContactFormData } from "./useContact";
import {
  InputField,
  SelectField,
  TextareaField,
  FormError,
  RGPDConsent,
} from "@/components/forms";
import UButton from "@/components/ui/UButton";
import SuccessCard from "@/components/ui/SuccessCard";

const OBJET_OPTIONS = [
  { value: "information", label: "Demande d'information" },
  { value: "adhesion", label: "Adhesion" },
  { value: "recours", label: "Aide pour un recours" },
  { value: "autre", label: "Autre" },
];

const ContactForm = (): JSX.Element => {
  const { submit, loading, success, error } = useContact();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });
  const [rgpdConsent, setRgpdConsent] = useState<boolean>(false);
  const [rgpdError, setRgpdError] = useState<string | null>(null);

  if (success) {
    return (
      <SuccessCard
        title="Message envoye !"
        message="Nous vous repondrons sous 48h."
      />
    );
  }

  const onSubmit = (data: ContactFormData): void => {
    if (!rgpdConsent) {
      setRgpdError(
        "Vous devez accepter la politique de confidentialité pour envoyer votre message.",
      );
      return;
    }
    setRgpdError(null);
    void submit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <FormError message={error} />}
      <InputField<ContactFormData>
        label="Nom"
        name="nom"
        register={register}
        error={errors.nom}
        required
      />
      <InputField<ContactFormData>
        label="Email"
        name="email"
        register={register}
        error={errors.email}
        type="email"
        required
      />
      <SelectField<ContactFormData>
        label="Objet"
        name="objet"
        register={register}
        error={errors.objet}
        options={OBJET_OPTIONS}
      />
      <TextareaField<ContactFormData>
        label="Message"
        name="message"
        register={register}
        error={errors.message}
        rows={5}
        placeholder="Votre message..."
      />
      <RGPDConsent
        id="contact-rgpd"
        variant="contact"
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
        Envoyer le message
      </UButton>
    </form>
  );
};

export default ContactForm;
