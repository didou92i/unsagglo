import HoverContentCell from "@/components/ui/HoverContentCell";

interface ContribContentCellProps {
  text: string;
  maxLength?: number;
}

const ContribContentCell = ({ text, maxLength = 80 }: ContribContentCellProps): JSX.Element => (
  <HoverContentCell text={text} maxLength={maxLength} />
);

export default ContribContentCell;
