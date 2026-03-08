import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TableCell } from "@/components/ui/table";

interface HoverContentCellProps {
  text: string;
  maxLength?: number;
  minWidth?: string;
}

const truncate = (text: string, max: number): string =>
  text.length > max ? `${text.slice(0, max)}...` : text;

const HoverContentCell = ({ text, maxLength = 80, minWidth = "240px" }: HoverContentCellProps): JSX.Element => {
  if (text.length <= maxLength) {
    return <TableCell style={{ minWidth }}>{text}</TableCell>;
  }

  return (
    <TableCell style={{ minWidth }}>
      <HoverCard openDelay={200} closeDelay={100}>
        <HoverCardTrigger asChild>
          <span className="cursor-help border-b border-dashed border-muted-foreground/40">
            {truncate(text, maxLength)}
          </span>
        </HoverCardTrigger>
        <HoverCardContent side="top" className="w-96 p-0">
          <ScrollArea className="max-h-60 p-4">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
          </ScrollArea>
        </HoverCardContent>
      </HoverCard>
    </TableCell>
  );
};

export default HoverContentCell;
