import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import Spinner from "@/components/ui/Spinner";

interface VisitStat {
  page_path: string;
  count: number;
}

const VisitsStats = (): JSX.Element => {
  const [stats, setStats] = useState<VisitStat[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async (): Promise<void> => {
      setLoading(true);
      const { data, error } = await supabase
        .from("page_visits")
        .select("page_path");

      if (!error && data) {
        const counts: Record<string, number> = {};
        for (const row of data) {
          counts[row.page_path] = (counts[row.page_path] ?? 0) + 1;
        }
        const sorted = Object.entries(counts)
          .map(([page_path, count]) => ({ page_path, count }))
          .sort((a, b) => b.count - a.count);
        setStats(sorted);
        setTotal(data.length);
      }
      setLoading(false);
    };

    fetchStats();
  }, []);

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
