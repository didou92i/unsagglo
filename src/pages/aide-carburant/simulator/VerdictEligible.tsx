import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import EmailCaptureModal from "./EmailCaptureModal";

interface VerdictEligibleProps {
  onRestart: () => void;
  compositionFoyer: string | null;
  profilKilometrage: string | null;
}

const fireConfetti = (): void => {
  const duration = 2000;
  const end = Date.now() + duration;
  const colors = ["#009fe3", "#29235c", "#ffffff"];

  (function frame(): void {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

const VerdictEligible = ({
  onRestart,
  compositionFoyer,
  profilKilometrage,
}: VerdictEligibleProps): JSX.Element => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fireConfetti();
  }, []);

  return (
    <>
      <div
        className="rounded-lg text-white text-center px-6 md:px-10 py-12 md:py-16"
        style={{ backgroundColor: "#29235c" }}
      >
        <div className="flex justify-center mb-8">
          <div
            className="rounded-full flex items-center justify-center animate-simulator-fade"
            style={{
              backgroundColor: "#009fe3",
              width: "96px",
              height: "96px",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-12 h-12"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        <h3
          className="font-display font-medium"
          style={{ fontSize: "28px", lineHeight: 1.2 }}
        >
          🎉 Bonne nouvelle !
        </h3>
        <p className="text-white/90 mt-4" style={{ fontSize: "14px" }}>
          D'après vos réponses, vous êtes potentiellement éligible à l'aide
          carburant de 50 €.
        </p>
        <p
          className="text-white/75 mt-3 mx-auto"
          style={{ fontSize: "12px", maxWidth: "500px", lineHeight: 1.6 }}
        >
          Cette évaluation est indicative. Seule l'administration fiscale
          validera définitivement votre demande lors du dépôt sur
          impots.gouv.fr. Rappel : le décret d'application est attendu avant fin
          mai 2026.
        </p>

        <div
          className="rounded-lg text-left px-6 py-6 md:px-8 md:py-8 mt-10 max-w-xl mx-auto"
          style={{ backgroundColor: "#eff9fe" }}
        >
          <p
            className="font-display font-medium mb-4"
            style={{ color: "#29235c", fontSize: "16px" }}
          >
            Votre guide UNSAgglo personnalisé
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#29235c" }}>
            Téléchargez immédiatement votre guide PDF : synthèse de votre
            situation, étapes à suivre sur impots.gouv.fr, engagement sur
            l'honneur pré-rédigé, contacts UNSAgglo dédiés à la Communauté
            d'Agglomération Roissy Pays de France et courrier type en cas de
            refus. En échange, laissez-nous votre email pour être alerté dès
            l'ouverture officielle du portail fin mai 2026.
          </p>
        </div>

        <div className="mt-10">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="text-white font-display font-medium text-base md:text-lg rounded-[6px] px-8 py-4 transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#009fe3" }}
          >
            📄 Télécharger mon guide personnalisé
          </button>
        </div>

        <button
          type="button"
          onClick={onRestart}
          className="mt-8 text-xs text-white/70 underline underline-offset-2 hover:text-white transition-colors"
        >
          Refaire la simulation
        </button>
      </div>

      <EmailCaptureModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        compositionFoyer={compositionFoyer}
        profilKilometrage={profilKilometrage}
      />
    </>
  );
};

export default VerdictEligible;
