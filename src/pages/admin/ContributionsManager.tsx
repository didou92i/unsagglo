import { useAdminContributions } from "@/hooks/useAdminContributions";
import Spinner from "@/components/ui/Spinner";
import { UBadge } from "@/components/ui/UBadge";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { THEMES } from "@/constants/themes";

const themeLabel = (value: string): string =>
  THEMES.find((t) => t.value === value)?.label ?? value;

const truncate = (text: string, max = 80): string =>
  text.length > max ? `${text.slice(0, max)}...` : text;

const ContributionsManager = (): JSX.Element => {
  const { contributions, loading } = useAdminContributions();

  if (loading) return <Spinner />;

  if (contributions.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-8">
        Aucune contribution pour le moment.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Prenom</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Theme</TableHead>
          <TableHead className="min-w-[240px]">Contenu</TableHead>
          <TableHead>Anonyme</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contributions.map((c) => (
          <TableRow key={c.id}>
            <TableCell className="font-medium">
              {c.anonyme ? "—" : c.prenom}
            </TableCell>
            <TableCell>{c.anonyme ? "—" : c.service}</TableCell>
            <TableCell>
              <UBadge variant="outline">{themeLabel(c.theme)}</UBadge>
            </TableCell>
            <TableCell>{truncate(c.contenu)}</TableCell>
            <TableCell>
              {c.anonyme ? (
                <UBadge variant="secondary">Oui</UBadge>
              ) : (
                "Non"
              )}
            </TableCell>
            <TableCell className="text-muted-foreground text-sm">
              {new Date(c.created_at).toLocaleDateString("fr-FR")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ContributionsManager;
