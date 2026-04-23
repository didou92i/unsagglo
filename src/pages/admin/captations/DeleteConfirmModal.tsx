import { X } from "lucide-react";
import { useState } from "react";

interface DeleteConfirmModalProps {
  email: string | null;
  onClose: () => void;
  onConfirm: () => Promise<boolean>;
}

const DeleteConfirmModal = ({
  email,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps): JSX.Element | null => {
  const [deleting, setDeleting] = useState<boolean>(false);

  if (!email) return null;

  const handleConfirm = async (): Promise<void> => {
    setDeleting(true);
    const ok = await onConfirm();
    setDeleting(false);
    if (ok) onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(41, 35, 92, 0.7)" }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl w-full"
        style={{ maxWidth: "480px", padding: "32px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-secondary transition-colors"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </button>

        <h3 className="font-display font-medium text-secondary" style={{ fontSize: "20px" }}>
          Confirmer la suppression RGPD
        </h3>
        <p className="text-sm text-foreground/80 mt-4 leading-relaxed">
          Vous êtes sur le point de supprimer définitivement la captation de{" "}
          <span className="font-medium text-secondary">{email}</span>. Cette
          action est irréversible et sera tracée dans les notes internes.
          Confirmez-vous cette suppression ?
        </p>

        <div className="mt-8 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-muted-foreground hover:text-secondary transition-colors"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={() => void handleConfirm()}
            disabled={deleting}
            className="text-white text-sm font-medium rounded-[6px] px-6 py-3 transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#e74124" }}
          >
            {deleting ? "Suppression..." : "Supprimer définitivement"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
