import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

export type RGPDVariant = "adhesion" | "contribution" | "candidature" | "contact";

interface RGPDConsentProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  variant: RGPDVariant;
  error?: string;
}

const TEXTS: Record<RGPDVariant, JSX.Element> = {
  adhesion: (
    <>
      J'autorise UNSAgglo à traiter mes données pour la gestion de mon
      adhésion, conformément à la{" "}
      <Link
        to="/politique-confidentialite"
        className="text-primary underline"
        target="_blank"
      >
        politique de confidentialité
      </Link>
      . Je déclare avoir pris connaissance des statuts d'UNSAgglo et y adhérer
      sans réserve.
    </>
  ),
  contribution: (
    <>
      J'autorise UNSAgglo à conserver ma contribution et, le cas échéant, à
      m'identifier au moyen des informations renseignées, conformément à la{" "}
      <Link
        to="/politique-confidentialite"
        className="text-primary underline"
        target="_blank"
      >
        politique de confidentialité
      </Link>
      . Je peux retirer mon consentement à tout moment.
    </>
  ),
  candidature: (
    <>
      J'autorise UNSAgglo à conserver mes coordonnées dans le cadre de la
      constitution de la liste électorale UNSAgglo aux élections
      professionnelles de décembre 2026, conformément à la{" "}
      <Link
        to="/politique-confidentialite"
        className="text-primary underline"
        target="_blank"
      >
        politique de confidentialité
      </Link>
      . Mes coordonnées sont accessibles uniquement aux responsables habilités
      et ne sont jamais publiées sans mon accord.
    </>
  ),
  contact: (
    <>
      J'autorise UNSAgglo à utiliser mes coordonnées pour répondre à ma
      demande, conformément à la{" "}
      <Link
        to="/politique-confidentialite"
        className="text-primary underline"
        target="_blank"
      >
        politique de confidentialité
      </Link>
      .
    </>
  ),
};

const RGPDConsent = ({
  id,
  checked,
  onCheckedChange,
  variant,
  error,
}: RGPDConsentProps): JSX.Element => (
  <div className="mt-4">
    <div className="flex items-start gap-3">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(c) => onCheckedChange(c === true)}
        className="mt-0.5"
      />
      <label
        htmlFor={id}
        className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
      >
        {TEXTS[variant]}
      </label>
    </div>
    {error && <p className="text-destructive text-xs mt-2 ml-7">{error}</p>}
  </div>
);

export default RGPDConsent;
