import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TableCell } from "@/components/ui/table";

interface ContribContentCellProps {
  text: string;
  maxLength?: number;
}

const truncate = (text: string, max: number): string =>
  text.length > max ? `${text.slice(0, max)}...` : text;

const ContribContentCell = ({ text, maxLength = 80 }: ContribContentCellProps): JSX.Element => {
  if (text.length <= maxLength) {
    return <TableCell className="min-w-[240px]">{text}</TableCell>;
  }

  return (
    <TableCell className="min-w-[240px]">
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

export default ContribContentCell;
