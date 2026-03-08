import { useRef } from "react";
import { useDocumentsAdmin } from "@/hooks/useDocumentsAdmin";
import UButton from "@/components/ui/UButton";
import Spinner from "@/components/ui/Spinner";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

const DocumentsManager = (): JSX.Element => {
  const { docs, loading, uploading, upload, remove } = useDocumentsAdmin();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) upload(file);
    if (inputRef.current) inputRef.current.value = "";
  };

  if (loading) return <div className="flex justify-center py-8"><Spinner size="md" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{docs.length} document(s)</p>
        <div>
          <input ref={inputRef} type="file" className="hidden" onChange={handleFile} accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg" />
          <UButton variant="primary" size="sm" onClick={() => inputRef.current?.click()} loading={uploading}>
            Uploader un document
          </UButton>
        </div>
      </div>
      {docs.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">Aucun document.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {docs.map((d) => (
              <TableRow key={d.name}>
                <TableCell className="font-medium">
                  <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-primary underline">{d.name}</a>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {d.created_at ? new Date(d.created_at).toLocaleDateString("fr-FR") : "—"}
                </TableCell>
                <TableCell>
                  <UButton variant="danger" size="sm" onClick={() => remove(d.name)}>Supprimer</UButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default DocumentsManager;
