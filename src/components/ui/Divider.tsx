interface DividerProps {
  className?: string;
}

const Divider = ({ className = "" }: DividerProps): JSX.Element => (
  <hr className={`border-border my-6 ${className}`} />
);

export default Divider;
