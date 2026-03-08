import { useVisitsStats } from "@/hooks/useVisitsStats";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import Spinner from "@/components/ui/Spinner";

const VisitsStats = (): JSX.Element => {
  const { stats, total, loading } = useVisitsStats();

  if (loading) return <div className="flex justify-center py-8"><Spinner size="md" /></div>;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{total} visite(s) au total</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Page</TableHead>
            <TableHead className="text-right">Visites</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stats.map((s) => (
            <TableRow key={s.page_path}>
              <TableCell className="font-medium">{s.page_path}</TableCell>
              <TableCell className="text-right">{s.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VisitsStats;
