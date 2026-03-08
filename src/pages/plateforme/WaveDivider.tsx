interface WaveDividerProps {
  flip?: boolean;
  className?: string;
}

const WaveDivider = ({ flip = false, className = "" }: WaveDividerProps): JSX.Element => (
  <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className}`}>
    <svg
      className="w-full h-[60px] md:h-[80px]"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
    >
      <path
        d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
        className="fill-muted"
      />
    </svg>
  </div>
);

export default WaveDivider;
