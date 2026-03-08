interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  accentColor?: string;
}

const SectionTitle = ({
  title,
  subtitle,
  align = "center",
  accentColor,
}: SectionTitleProps): JSX.Element => {
  const isCenter = align === "center";

  return (
    <div className={`mb-8 ${isCenter ? "text-center" : ""}`}>
      <h2
        className={`font-display text-3xl md:text-4xl font-black text-foreground ${!isCenter ? "border-l-[3px] pl-4" : ""}`}
        style={!isCenter && accentColor ? { borderColor: accentColor } : undefined}
      >
        {title}
      </h2>
      {isCenter && (
        <div
          className="mx-auto mt-3 w-16 h-[3px] rounded-full bg-primary"
          style={accentColor ? { backgroundColor: accentColor } : undefined}
        />
      )}
      {subtitle && (
        <p className="text-muted-foreground mt-2 text-lg max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
