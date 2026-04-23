interface Figure {
  value: string;
  caption: string;
}

const FIGURES: Figure[] = [
  { value: "50 €", caption: "Forfait unique versé en juin" },
  { value: "1", caption: "Seule information à déclarer : votre kilométrage" },
  { value: "2,9 M", caption: "Bénéficiaires attendus en France" },
];

const KeyFigures = (): JSX.Element => (
  <section className="px-4 md:px-6 py-20 bg-white">
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {FIGURES.map((f) => (
        <div
          key={f.caption}
          className="rounded-lg p-8 text-center"
          style={{ backgroundColor: "#f5f5f7" }}
        >
          <p className="font-display font-medium text-secondary text-5xl md:text-6xl leading-none">
            {f.value}
          </p>
          <p className="text-sm text-muted-foreground mt-4">{f.caption}</p>
        </div>
      ))}
    </div>
  </section>
);

export default KeyFigures;
