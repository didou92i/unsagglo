interface PlaneConfig {
  top: string;
  opacity: number;
  size: string;
  animClass: string;
}

const PLANES: PlaneConfig[] = [
  { top: "15%", opacity: 0.18, size: "w-20", animClass: "animate-fly-1" },
  { top: "32%", opacity: 0.25, size: "w-28", animClass: "animate-fly-2" },
  { top: "48%", opacity: 0.20, size: "w-16", animClass: "animate-fly-3" },
];

const PlaneSvg = (): JSX.Element => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 34L24 30L44 18L56 14L60 16L50 28L30 34L24 48L18 48L22 34L4 38Z"
      stroke="hsl(var(--primary))"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="hsl(var(--primary))"
      fillOpacity="0.3"
    />
  </svg>
);

const FlyingPlanes = (): JSX.Element => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
    {PLANES.map((plane) => (
      <div
        key={plane.top}
        className={`absolute ${plane.size} ${plane.animClass}`}
        style={{ top: plane.top, opacity: plane.opacity }}
      >
        <PlaneSvg />
      </div>
    ))}
  </div>
);

export default FlyingPlanes;
