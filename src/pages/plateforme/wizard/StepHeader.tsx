interface StepHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

const StepHeader = ({ eyebrow, title, subtitle }: StepHeaderProps): JSX.Element => (
  <div className="mb-7">
    {eyebrow && (
      <p
        className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
        style={{ color: "#009fe3" }}
      >
        {eyebrow}
      </p>
    )}
    <h2
      className="text-secondary font-display font-medium leading-tight"
      style={{ fontSize: "26px" }}
    >
      {title}
    </h2>
    {subtitle && (
      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

export default StepHeader;
