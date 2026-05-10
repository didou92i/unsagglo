import { useAdminContact } from "@/hooks/useAdminContact";
import Spinner from "@/components/ui/Spinner";
import { Badge } from "@/components/ui/badge";
import HoverContentCell from "@/components/ui/HoverContentCell";
import { contactObjectLabel } from "@/pages/contact/contactOptions";
import {
  Table, TableHeader, TableHead, TableBody, TableRow, TableCell,
} from "@/components/ui/table";

const ContactManager = (): JSX.Element => {
  const { messages, loading } = useAdminContact();

  if (loading) return <Spinner />;

  if (messages.length === 0) {
    return <p className="text-muted-foreground text-center py-8">Aucun message pour le moment.</p>;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{messages.length} message(s)</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Objet</TableHead>
            <TableHead className="min-w-[240px]">Message</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((m) => (
            <TableRow key={m.id}>
              <TableCell className="font-medium">{m.nom}</TableCell>
              <TableCell>{m.email}</TableCell>
              <TableCell><Badge variant="outline">{contactObjectLabel(m.objet)}</Badge></TableCell>
              <HoverContentCell text={m.message} maxLength={120} />
              <TableCell className="text-muted-foreground text-sm">
                {new Date(m.created_at).toLocaleDateString("fr-FR")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContactManager;
