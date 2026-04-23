import { toast } from "sonner";
import type { BlockingReason } from "./types";

interface VerdictNotEligibleProps {
  reason: BlockingReason;
  onRestart: () => void;
}

const REASON_MESSAGES: Record<BlockingReason, string> = {
  vehicle:
    "Ce dispositif s'adresse aux travailleurs possédant un véhicule personnel (thermique, électrique ou hybride). D'autres aides au transport peuvent néanmoins vous concerner.",
  status:
    "Ce dispositif est réservé aux travailleurs actifs. Les retraités, les demandeurs d'emploi et les étudiants sans activité ne sont pas concernés.",
  income:
    "Vos revenus déclarés dépassent le seuil indicatif fixé par le gouvernement pour votre composition de foyer. Ce seuil sera précisé par décret avant la fin mai 2026 — il pourra évoluer à la marge.",
  companyCar:
    "Les salariés dont le carburant est intégralement pris en charge par leur employeur (véhicule de fonction, carte carburant) ne sont pas éligibles à ce dispositif.",
  distance:
    "Pour être éligible, vous devez habiter à au moins 15 km de votre lieu de travail, ou parcourir plus de 8 000 km/an dans le cadre professionnel.",
};

const handleShare = async (): Promise<void> => {
  const shareData = {
    title: "Aide carburant 50 € — UNSAgglo",
    text: "Vérifiez votre éligibilité à l'aide carburant de 50 €.",
    url: window.location.href,
  };
  try {
    if (typeof navigator.share === "function") {
      await navigator.share(shareData);
      return;
    }
    await navigator.clipboard.writeText(shareData.url);
    toast.success("Lien copié dans le presse-papier");
  } catch {
    toast.error("Impossible de partager. Copiez l'URL manuellement.");
  }
};

const VerdictNotEligible = ({ reason, onRestart }: VerdictNotEligibleProps): JSX.Element => (
  <div
    className="rounded-lg text-white px-6 md:px-10 py-10 md:py-12"
    style={{ backgroundColor: "#29235c" }}
  >
    <h3
      className="font-display font-medium text-center"
      style={{ fontSize: "24px", lineHeight: 1.3 }}
    >
      Il semble que vous ne soyez pas éligible à cette aide
    </h3>
    <p className="text-white/85 text-sm mt-5 max-w-xl mx-auto leading-relaxed text-center">
      {REASON_MESSAGES[reason]}
    </p>

    <div
      className="rounded-lg text-left px-6 py-6 mt-8 text-sm leading-relaxed"
      style={{ backgroundColor: "#f5f5f7", color: "#333" }}
    >
      <p className="font-medium text-secondary mb-3">
        D'autres dispositifs peuvent néanmoins vous concerner :
      </p>
      <ul className="space-y-2">
        <li className="flex gap-2">
          <span style={{ color: "#009fe3" }}>•</span>
          <span>Forfait mobilités durables (vélo, covoiturage, transports en commun)</span>
        </li>
        <li className="flex gap-2">
          <span style={{ color: "#009fe3" }}>•</span>
          <span>Prime transport employeur (facultative)</span>
        </li>
        <li className="flex gap-2">
          <span style={{ color: "#009fe3" }}>•</span>
          <span>Indemnités kilométriques pour vos missions professionnelles</span>
        </li>
      </ul>
      <p className="mt-4 text-xs text-muted-foreground">
        Pour en savoir plus, contactez UNSAgglo.
      </p>
    </div>

    <div className="mt-8 flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => {
          void handleShare();
        }}
        className="text-secondary border px-6 py-2.5 rounded-[6px] text-sm font-medium bg-white hover:opacity-90 transition-opacity"
        style={{ borderColor: "#ffffff" }}
      >
        📤 Partager cette page à un collègue éligible
      </button>
      <button
        type="button"
        onClick={onRestart}
        className="text-xs text-white/70 underline underline-offset-2 hover:text-white transition-colors mt-2"
      >
        Refaire la simulation
      </button>
    </div>
  </div>
);

export default VerdictNotEligible;
