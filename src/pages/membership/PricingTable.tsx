import { COTISATION_MENSUELLE, COTISATION_ANNUELLE } from "@/lib/orgInfo";

const formatEuro = (n: number): string =>
  n.toFixed(2).replace(".", ",") + " €";

const PricingTable = (): JSX.Element => (
  <div className="max-w-2xl mx-auto">
    <div
      className="rounded-lg border p-8 text-center"
      style={{ borderColor: "#e6eaf0", backgroundColor: "#eff9fe" }}
    >
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
        Cotisation unique 2026
      </p>
      <p className="font-display font-medium text-secondary text-5xl md:text-6xl leading-none">
        {formatEuro(COTISATION_MENSUELLE)}
      </p>
      <p className="text-sm text-muted-foreground mt-2">
        par mois · soit {formatEuro(COTISATION_ANNUELLE)} par an
      </p>
      <p className="text-sm text-foreground/85 mt-5 max-w-md mx-auto leading-relaxed">
        Tarif unique pour toutes les catégories (A, B, C, retraités), voté en
        Assemblée Générale Constitutive du 9 janvier 2026.
      </p>
      <p className="text-xs text-muted-foreground mt-4 italic">
        Cotisation déductible des impôts à 66 % (article 199 quater C du Code
        général des impôts).
      </p>
    </div>
  </div>
);

export default PricingTable;
