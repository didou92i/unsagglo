import { InputField } from "@/components/forms";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { ContribFormData } from "./contribSchema";

interface ListeElectoraleFieldsProps {
  register: UseFormRegister<ContribFormData>;
  errors: FieldErrors<ContribFormData>;
}

const ListeElectoraleFields = ({ register, errors }: ListeElectoraleFieldsProps): JSX.Element => (
  <>
    <InputField<ContribFormData>
      label="Nom"
      name="nom"
      register={register}
      error={errors.nom}
      placeholder="Votre nom de famille"
    />
    <InputField<ContribFormData>
      label="Adresse e-mail professionnelle ou personnelle"
      name="email"
      register={register}
      error={errors.email}
      placeholder="prenom.nom@email.fr"
    />
    <InputField<ContribFormData>
      label="Numero de telephone"
      name="telephone"
      register={register}
      error={errors.telephone}
      placeholder="06 12 34 56 78"
    />
    <InputField<ContribFormData>
      label="Adresse de domicile"
      name="adresse"
      register={register}
      error={errors.adresse}
      placeholder="12 rue de la Republique, 75001 Paris"
    />
  </>
);

export default ListeElectoraleFields;
