import { InputField } from "@/components/forms";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { CandidatFormData } from "./candidatSchema";

interface ListeElectoraleFieldsProps {
  register: UseFormRegister<CandidatFormData>;
  errors: FieldErrors<CandidatFormData>;
}

const ListeElectoraleFields = ({ register, errors }: ListeElectoraleFieldsProps): JSX.Element => (
  <>
    <InputField<CandidatFormData>
      label="Adresse e-mail professionnelle ou personnelle"
      name="email"
      register={register}
      error={errors.email}
      placeholder="prenom.nom@email.fr"
    />
    <InputField<CandidatFormData>
      label="Numero de telephone"
      name="telephone"
      register={register}
      error={errors.telephone}
      placeholder="06 12 34 56 78"
    />
    <InputField<CandidatFormData>
      label="Adresse de domicile"
      name="adresse"
      register={register}
      error={errors.adresse}
      placeholder="12 rue de la Republique, 75001 Paris"
    />
  </>
);

export default ListeElectoraleFields;
