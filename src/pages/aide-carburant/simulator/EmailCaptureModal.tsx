import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useCaptationSubmit } from "./useCaptationSubmit";
import { generateAidePdf } from "./pdfGenerator";

interface EmailCaptureModalProps {
  open: boolean;
  onClose: () => void;
  compositionFoyer: string | null;
  profilKilometrage: string | null;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EmailCaptureModal = ({
  open,
  onClose,
  compositionFoyer,
  profilKilometrage,
}: EmailCaptureModalProps): JSX.Element | null => {
  const [email, setEmail] = useState<string>("");
  const [consentRequired, setConsentRequired] = useState<boolean>(false);
  const [consentNewsletter, setConsentNewsletter] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { submit, markPdfDownloaded, loading } = useCaptationSubmit();

  if (!open) return null;

  const isEmailValid = EMAIL_REGEX.test(email.trim());
  const canSubmit = isEmailValid && consentRequired && !loading && !processing;

  const reset = (): void => {
    setEmail("");
    setConsentRequired(false);
    setConsentNewsletter(false);
    setErrorMessage(null);
    setProcessing(false);
  };

  const handleClose = (): void => {
    reset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!canSubmit) return;

    setErrorMessage(null);
    setProcessing(true);
    const normalized = email.trim().toLowerCase();

    const result = await submit({
      email: normalized,
      opt_in_newsletter: consentNewsletter,
      eligibilite: "Éligible",
      critere_bloquant: null,
      composition_foyer: compositionFoyer,
      profil_kilometrage: profilKilometrage,
    });

    if (!result.ok) {
      setProcessing(false);
      setErrorMessage(
        result.error ??
          "Une erreur est survenue, merci de réessayer ou de contacter unsagglo@roissypaysdefrance.fr",
      );
      return;
    }

    try {
      await generateAidePdf({ compositionFoyer, profilKilometrage });
      await markPdfDownloaded(normalized);
      toast.success("Votre guide UNSAgglo est téléchargé.");
      reset();
      onClose();
    } catch {
      setProcessing(false);
      setErrorMessage(
        "Votre inscription est enregistrée, mais la génération du PDF a échoué. Réessayez ou contactez unsagglo@roissypaysdefrance.fr.",
      );
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-capture-title"
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(41, 35, 92, 0.7)" }}
      onClick={handleClose}
    >
      <div
        className="relative bg-white rounded-xl w-full"
        style={{
          maxWidth: "480px",
          padding: "32px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-secondary transition-colors"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </button>

        <form onSubmit={handleSubmit}>
          <h3
            id="email-capture-title"
            className="font-display font-medium text-secondary"
            style={{ fontSize: "20px", lineHeight: 1.3 }}
          >
            Téléchargez votre guide UNSAgglo
          </h3>
          <p className="text-muted-foreground mt-2" style={{ fontSize: "13px" }}>
            Recevez immédiatement votre guide PDF complet — personnalisé pour
            votre situation et prêt à suivre pour votre demande sur
            impots.gouv.fr. En échange, renseignez votre adresse email pour
            être tenu informé des mises à jour UNSAgglo.
          </p>

          <div className="mt-6">
            <label className="block">
              <span className="sr-only">Adresse email</span>
              <input
                type="email"
                required
                placeholder="votre.email@exemple.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                style={{ borderColor: "#e6eaf0" }}
              />
            </label>
          </div>

          <div className="mt-5 space-y-3">
            <label className="flex items-start gap-3 text-xs text-foreground/90 leading-relaxed cursor-pointer">
              <input
                type="checkbox"
                required
                checked={consentRequired}
                onChange={(e) => setConsentRequired(e.target.checked)}
                className="mt-0.5 flex-shrink-0 h-4 w-4 accent-primary"
              />
              <span>
                J'accepte que UNSAgglo conserve mon e-mail pour me tenir
                informé de l'ouverture du portail officiel et des mises à jour
                du dispositif.
              </span>
            </label>

            <label className="flex items-start gap-3 text-xs text-foreground/90 leading-relaxed cursor-pointer">
              <input
                type="checkbox"
                checked={consentNewsletter}
                onChange={(e) => setConsentNewsletter(e.target.checked)}
                className="mt-0.5 flex-shrink-0 h-4 w-4 accent-primary"
              />
              <span>
                Je souhaite recevoir la newsletter mensuelle UNSAgglo.
              </span>
            </label>
          </div>

          <p
            className="mt-4 italic text-muted-foreground leading-relaxed"
            style={{ fontSize: "11px" }}
          >
            Vos données sont traitées par UNSAgglo – Roissy Pays de France pour
            les finalités ci-dessus. Vous disposez d'un droit d'accès, de
            rectification, d'opposition et de suppression via
            unsagglo@roissypaysdefrance.fr. Données conservées 3 ans maximum.
          </p>

          {errorMessage && (
            <p
              className="mt-4 rounded-md p-3 text-xs"
              style={{ backgroundColor: "#fff4f1", color: "#a04000" }}
              role="alert"
            >
              {errorMessage}
            </p>
          )}

          <div className="mt-6 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="text-sm text-muted-foreground hover:text-secondary transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className="text-white text-sm font-medium px-6 py-3 rounded-[6px] transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#009fe3" }}
            >
              {processing ? "Génération du PDF..." : "Télécharger le guide →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailCaptureModal;
