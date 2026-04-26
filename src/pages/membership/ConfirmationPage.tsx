import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Download, Mail, MapPin, AlertTriangle } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import UButton from "@/components/ui/UButton";
import { ORG_INFO } from "@/lib/orgInfo";

interface StoredAdhesion {
  prenom: string;
  nom: string;
  email: string;
  mode_paiement: "cheque" | "virement";
  pdfUrl: string;
}

const ConfirmationPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [data, setData] = useState<StoredAdhesion | null>(null);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("unsagglo:lastAdhesion");
    if (!raw) {
      navigate("/membership", { replace: true });
      return;
    }
    try {
      setData(JSON.parse(raw) as StoredAdhesion);
    } catch {
      navigate("/membership", { replace: true });
    }
  }, [navigate]);

  // Libère l'objet URL à la sortie de la page (évite la fuite mémoire si
  // l'utilisateur revient ou navigue ailleurs).
  useEffect(() => {
    return () => {
      if (data?.pdfUrl) URL.revokeObjectURL(data.pdfUrl);
    };
  }, [data]);

  const handleDownload = (): void => {
    if (!data) return;
    const link = document.createElement("a");
    link.href = data.pdfUrl;
    link.download = `Bulletin_adhesion_UNSAgglo_${data.nom}_${data.prenom}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
  };

  if (!data) {
    return (
      <PageWrapper>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Chargement…</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <MetaTags
        title="Demande d'adhésion enregistrée"
        description="Votre demande d'adhésion à UNSAgglo a été enregistrée. Téléchargez votre bulletin signé."
        noIndex
      />

      <article className="max-w-3xl mx-auto px-4 md:px-6 py-12">
        <div
          className="rounded-lg p-6 mb-8 border-l-4"
          style={{ backgroundColor: "#eff9fe", borderLeftColor: "#009fe3" }}
        >
          <h1 className="font-display text-2xl md:text-3xl font-medium text-secondary mb-2">
            Merci, {data.prenom}.
          </h1>
          <p className="text-foreground leading-relaxed">
            Votre demande d'adhésion à UNSAgglo a bien été enregistrée. Pour la
            finaliser, il vous reste deux étapes simples.
          </p>
        </div>

        {/* Étape 1 : téléchargement */}
        <section className="mb-10">
          <h2 className="font-display text-xl font-medium text-secondary mb-3">
            Étape 1 — Télécharger et signer votre bulletin
          </h2>
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            Votre bulletin a été pré-rempli avec les informations que vous avez
            saisies. Téléchargez-le, imprimez-le, et apposez votre signature
            manuscrite précédée de la mention « Lu et approuvé ».
          </p>

          <UButton
            type="button"
            variant="primary"
            size="lg"
            onClick={handleDownload}
            className="inline-flex items-center"
          >
            <Download className="w-4 h-4 mr-2" strokeWidth={2} />
            Télécharger mon bulletin (PDF)
          </UButton>

          {downloaded && (
            <p className="text-xs mt-3" style={{ color: "#009fe3" }}>
              Bulletin téléchargé. Pensez à le signer avant de le retourner.
            </p>
          )}
        </section>

        {/* Étape 2 : retour */}
        <section className="mb-10">
          <h2 className="font-display text-xl font-medium text-secondary mb-3">
            Étape 2 — Retourner votre bulletin signé
          </h2>
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            Deux options au choix :
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-border p-5">
              <div className="flex items-center gap-2 mb-3">
                <Mail
                  className="w-5 h-5"
                  style={{ color: "#009fe3" }}
                  strokeWidth={1.75}
                />
                <h3 className="font-display font-medium text-secondary">
                  Par e-mail (rapide)
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                Scannez ou photographiez votre bulletin signé et envoyez-le à :
              </p>
              <a
                href={`mailto:${ORG_INFO.email}?subject=Bulletin d'adhésion signé — ${data.nom} ${data.prenom}`}
                className="text-primary font-semibold underline text-sm break-all"
              >
                {ORG_INFO.email}
              </a>
            </div>

            <div className="rounded-lg border border-border p-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin
                  className="w-5 h-5"
                  style={{ color: "#009fe3" }}
                  strokeWidth={1.75}
                />
                <h3 className="font-display font-medium text-secondary">
                  Par courrier postal
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                Adresse de retour :
              </p>
              <address className="text-sm text-foreground not-italic leading-relaxed">
                <strong>UNSAgglo</strong>
                <br />
                {ORG_INFO.adresse.ligne1}
                <br />
                {ORG_INFO.adresse.cp} {ORG_INFO.adresse.ville}
              </address>
            </div>
          </div>
        </section>

        {/* Étape 3 : paiement */}
        <section className="mb-10">
          <h2 className="font-display text-xl font-medium text-secondary mb-3">
            Étape 3 — Régler votre cotisation
          </h2>

          {data.mode_paiement === "virement" ? (
            <p className="text-muted-foreground text-sm leading-relaxed">
              Vous avez choisi le <strong>virement bancaire</strong>. Le RIB
              UNSAgglo vous sera transmis par e-mail dès validation de votre
              bulletin par le bureau syndical. Aucune action n'est requise de
              votre part à ce stade.
            </p>
          ) : (
            <p className="text-muted-foreground text-sm leading-relaxed">
              Vous avez choisi le règlement par <strong>chèque</strong>.
              Joignez votre chèque (à l'ordre d'<strong>UNSAgglo</strong>) à
              votre bulletin signé lors du retour postal. Une cotisation
              annuelle (119,88 €) ou un règlement fractionné peut être discuté
              avec le trésorier.
            </p>
          )}
        </section>

        <div
          className="rounded-lg p-4 mb-10 flex gap-3 items-start"
          style={{
            backgroundColor: "#fff4e6",
            borderLeft: "4px solid #e74124",
          }}
        >
          <AlertTriangle
            className="w-5 h-5 shrink-0 mt-0.5"
            style={{ color: "#e74124" }}
            strokeWidth={1.75}
          />
          <p className="text-sm text-foreground leading-relaxed">
            <strong>
              Le paiement en ligne par carte ou prélèvement SEPA
            </strong>{" "}
            sera disponible prochainement, dès l'activation des moyens de
            paiement d'UNSAgglo. Vous recevrez alors une notification.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Link to="/">
            <UButton variant="outline">Retour à l'accueil</UButton>
          </Link>
          <Link to="/plateforme">
            <UButton variant="outline">Découvrir la plateforme</UButton>
          </Link>
        </div>
      </article>
    </PageWrapper>
  );
};

export default ConfirmationPage;
