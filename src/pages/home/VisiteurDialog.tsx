import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface VisiteurDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCta: () => void;
}

const VisiteurDialog = ({ open, onOpenChange, onCta }: VisiteurDialogProps): JSX.Element => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-lg bg-card border-border">
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle className="text-xl font-display font-bold text-foreground">
            Bienvenue sur UNSAgglo
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-muted-foreground leading-relaxed pt-4">
            UNSAgglo ne décide pas à votre place. Nous construisons notre programme
            avec vos idées et votre expertise — parce que vous connaissez mieux que
            quiconque la réalité du terrain. Toutes les contributions seront étudiées
            et intégrées à notre projet commun.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <p className="text-center text-base font-semibold text-foreground py-2">
          Votre expertise mérite d&apos;être entendue.
          <br />
          Contribuez dès maintenant.
        </p>
        <AlertDialogFooter className="flex-col gap-3 sm:flex-col">
          <button
            type="button"
            onClick={onCta}
            className="w-full px-6 py-3 bg-primary text-primary-foreground font-display font-bold text-base rounded-full transition-all duration-200 hover:opacity-90 cursor-pointer"
          >
            J&apos;accède à la plateforme participative
          </button>
          <AlertDialogCancel className="w-full rounded-full border-border">
            Fermer
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default VisiteurDialog;
