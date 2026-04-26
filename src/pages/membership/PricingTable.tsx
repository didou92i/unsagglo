import { COTISATION_MENSUELLE, COTISATION_ANNUELLE } from "@/lib/orgInfo";

const formatEur = (n: number): string =>
  n.toFixed(2).replace(".", ",") + " €";

const PricingTable = (): JSX.Element => {
  // 66 % du montant ouvre droit à un crédit d'impôt sur le revenu
  // (article 199 quater C du Code général des impôts).
  // Le coût net réel pour l'agent est donc 34 % du montant brut.
  const coutMensuelNet = COTISATION_MENSUELLE * 0.34;
  const coutAnnuelNet = COTISATION_ANNUELLE * 0.34;

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className="rounded-lg border-2 p-8 text-center"
        style={{
          borderColor: "#009fe3",
          backgroundColor: "#eff9fe",
        }}
      >
        <p
          className="font-display text-xs font-bold uppercase tracking-widest mb-2"
          style={{ color: "#009fe3" }}
        >
          Cotisation unique
        </p>

        <div className="mb-1">
          <span
            className="font-display text-5xl md:text-6xl font-medium"
            style={{ color: "#29235c" }}
          >
            {formatEur(COTISATION_MENSUELLE)}
          </span>
          <span className="text-xl text-muted-foreground ml-2">/ mois</span>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          soit {formatEur(COTISATION_ANNUELLE)} par an
        </p>

        <div className="border-t border-border pt-5 mt-2">
          <p className="text-sm text-foreground leading-relaxed">
            <strong>66 % déductibles de vos impôts</strong> au titre du crédit
            d'impôt syndical (article 199 quater C du Code général des impôts).
          </p>
          <p
            className="text-sm font-semibold mt-2"
            style={{ color: "#29235c" }}
          >
            Coût net réel : environ {formatEur(coutMensuelNet)} / mois
            {" "}({formatEur(coutAnnuelNet)} / an)
          </p>
        </div>
      </div>

      <p className="text-muted-foreground text-xs italic mt-4 text-center">
        Cotisation unique pour toutes les catégories statutaires (A, B, C),
        votée en assemblée générale constitutive du 9 janvier 2026 (Article 17
        des statuts UNSAgglo).
      </p>
    </div>
  );
};

export default PricingTable;
