import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { ContribFormData } from "./contribSchema";
import { Checkbox } from "@/components/ui/checkbox";
import ListeElectoraleFields from "./ListeElectoraleFields";

interface ListeElectoraleInlineProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  register: UseFormRegister<ContribFormData>;
  errors: FieldErrors<ContribFormData>;
}

const ListeElectoraleInline = ({
  checked,
  onCheckedChange,
  register,
  errors,
}: ListeElectoraleInlineProps): JSX.Element => (
  <div className="mt-6 pt-6 border-t border-border">
    <div className="flex items-start gap-2 mb-4">
      <Checkbox
        id="rejoindreListe"
        checked={checked}
        onCheckedChange={(v) => onCheckedChange(v === true)}
      />
      <label htmlFor="rejoindreListe" className="text-sm font-medium text-foreground cursor-pointer leading-tight">
        Je souhaite rejoindre la liste electorale UNSAgglo
      </label>
    </div>
    {checked && (
      <>
        <p className="text-muted-foreground text-sm mb-4">
          En cochant cette case, les champs suivants sont obligatoires :
        </p>
        <ListeElectoraleFields register={register} errors={errors} />
        <p className="text-xs text-muted-foreground mt-2">
          Conformement au RGPD, ces informations sont strictement confidentielles,
          reservees a l'usage interne d'UNSAgglo et accessibles uniquement aux
          responsables habilites. Elles ne seront ni transmises ni publiees.
        </p>
      </>
    )}
  </div>
);

export default ListeElectoraleInline;
