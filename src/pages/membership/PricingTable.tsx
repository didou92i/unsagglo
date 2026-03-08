interface PricingRow {
  grade: string;
  mensuel: string;
  annuel: string;
}

const PRICING_ROWS: PricingRow[] = [
  { grade: "Categorie C (echelle 3-4-5)", mensuel: "6 EUR", annuel: "72 EUR" },
  { grade: "Categorie C (echelle 6+)", mensuel: "7 EUR", annuel: "84 EUR" },
  { grade: "Categorie B", mensuel: "9 EUR", annuel: "108 EUR" },
  { grade: "Categorie A (attache, ingenieur)", mensuel: "12 EUR", annuel: "144 EUR" },
  { grade: "Categorie A+ (directeur)", mensuel: "15 EUR", annuel: "180 EUR" },
];

const PricingTable = (): JSX.Element => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="overflow-x-auto rounded-[var(--radius-md)] border border-border">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary text-secondary-foreground">
              <th className="font-display font-bold text-left px-4 py-3 text-sm">Grade / Categorie</th>
              <th className="font-display font-bold text-center px-4 py-3 text-sm">Mensuel</th>
              <th className="font-display font-bold text-center px-4 py-3 text-sm">Annuel</th>
            </tr>
          </thead>
          <tbody>
            {PRICING_ROWS.map((row) => (
              <tr key={row.grade} className="border-t border-border bg-muted/50">
                <td className="px-4 py-3 text-sm text-foreground">{row.grade}</td>
                <td className="px-4 py-3 text-sm text-center font-semibold text-foreground">{row.mensuel}</td>
                <td className="px-4 py-3 text-sm text-center font-semibold text-primary">{row.annuel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-muted-foreground text-sm italic mt-3 text-center">
        Cotisation deductible des impots a 66 %
      </p>
    </div>
  );
};

export default PricingTable;
