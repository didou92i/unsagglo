interface StepTitleProps {
  title: string;
  subtitle: string;
}

const StepTitle = ({ title, subtitle }: StepTitleProps): JSX.Element => (
  <div className="mb-6">
    <h3
      className="text-secondary font-display font-medium mb-2"
      style={{ fontSize: "20px" }}
    >
      {title}
    </h3>
    <p className="text-xs text-muted-foreground leading-relaxed">{subtitle}</p>
  </div>
);

export default StepTitle;
