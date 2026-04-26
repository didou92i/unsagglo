import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { serviceLabel } from "@/lib/serviceLabel";
import type { AdherentRow } from "@/hooks/useAdminAdherents";

interface AdherentDetailModalProps {
  adherent: AdherentRow;
  onClose: () => void;
}

const STATUT_PRO_LABEL: Record<string, string> = {
  titulaire: "Titulaire",
  stagiaire: "Stagiaire",
  contractuel_cdi: "Contractuel CDI",
  contractuel_cdd: "Contractuel CDD",
  apprenti: "Apprenti",
  retraite: "Retraité de la CARPF",
};

const MODE_LABEL: Record<string, string> = {
  cheque: "Chèque",
  virement: "Virement",
  sepa: "SEPA",
  stripe_mensuel: "Carte (mensuel)",
  stripe_annuel: "Carte (annuel)",
};

const formatDate = (iso: string | null): string => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatDateTime = (iso: string | null): string => {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Field = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}): JSX.Element => (
  <div className="flex flex-col gap-0.5 text-sm">
    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
      {label}
    </span>
    <span className="text-foreground">
      {value === null || value === undefined || value === "" ? "—" : value}
    </span>
  </div>
);

const SectionHeader = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => (
  <h3 className="font-display font-bold text-foreground border-b border-border pb-1 mb-3 mt-5 first:mt-0">
    {children}
  </h3>
);

const AdherentDetailModal = ({
  adherent: a,
  onClose,
}: AdherentDetailModalProps): JSX.Element => {
  const adresse = [
    a.adresse_ligne1,
    a.adresse_ligne2,
    [a.adresse_cp, a.adresse_ville].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join("\n");

  const service =
    a.service === "autre_service" && a.service_libre
      ? `Autre : ${a.service_libre}`
      : serviceLabel(a.service);

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {a.prenom} {a.nom}
          </DialogTitle>
        </DialogHeader>

        <SectionHeader>Identité civile</SectionHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Prénom" value={a.prenom} />
          <Field label="Nom" value={a.nom} />
          <Field
            label="Date de naissance"
            value={formatDate(a.date_naissance)}
          />
        </div>

        <SectionHeader>Coordonnées</SectionHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Email" value={a.email} />
          <Field label="Téléphone" value={a.telephone} />
        </div>
        <div className="mt-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Adresse postale
          </span>
          <pre className="text-sm text-foreground whitespace-pre-wrap font-sans mt-0.5">
            {adresse || "—"}
          </pre>
        </div>

        <SectionHeader>Situation professionnelle</SectionHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Statut"
            value={a.statut_pro ? STATUT_PRO_LABEL[a.statut_pro] : null}
          />
          <Field
            label="Catégorie"
            value={a.categorie ? `Catégorie ${a.categorie}` : null}
          />
          <Field label="Grade" value={a.grade} />
          <Field label="Échelon" value={a.echelon} />
          <Field label="Service / direction" value={service} />
          <Field label="Site d'affectation" value={a.site_affectation} />
          <Field
            label="Date d'entrée à la CARPF"
            value={formatDate(a.date_entree_carpf)}
          />
        </div>

        <SectionHeader>Cotisation</SectionHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Mode de paiement"
            value={a.mode_paiement ? MODE_LABEL[a.mode_paiement] : null}
          />
          <Field label="Périodicité" value={a.periodicite_paiement} />
        </div>

        <SectionHeader>Traçabilité</SectionHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Demande créée le"
            value={formatDateTime(a.created_at)}
          />
          <Field label="Mise à jour" value={formatDateTime(a.updated_at)} />
          <Field
            label="Consentement RGPD"
            value={formatDateTime(a.rgpd_consent_at)}
          />
          <Field
            label="Acceptation des statuts"
            value={formatDateTime(a.statuts_acceptes_at)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdherentDetailModal;
