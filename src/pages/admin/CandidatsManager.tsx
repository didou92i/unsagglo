import { useAdminCandidats } from "@/hooks/useAdminCandidats";
import Spinner from "@/components/ui/Spinner";
import {
  Table, TableHeader, TableHead, TableBody, TableRow, TableCell,
} from "@/components/ui/table";

const CandidatsManager = (): JSX.Element => {
  const { candidats, loading } = useAdminCandidats();

  if (loading) return <Spinner />;

  if (candidats.length === 0) {
    return <p className="text-muted-foreground">Aucun candidat pour le moment.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Prenom</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Telephone</TableHead>
          <TableHead>Adresse</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {candidats.map((c) => (
          <TableRow key={c.id}>
            <TableCell>{c.prenom}</TableCell>
            <TableCell>{c.nom}</TableCell>
            <TableCell>{c.service}</TableCell>
            <TableCell>{c.email}</TableCell>
            <TableCell>{c.telephone}</TableCell>
            <TableCell>{c.adresse}</TableCell>
            <TableCell>{new Date(c.created_at).toLocaleDateString("fr-FR")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CandidatsManager;
