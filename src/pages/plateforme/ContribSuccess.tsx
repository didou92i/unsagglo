import UCard from "@/components/ui/UCard";

interface ContribSuccessProps {
  candidature: boolean;
}

const ContribSuccess = ({ candidature }: ContribSuccessProps): JSX.Element => (
  <section id="contribution" className="px-4 md:px-6 py-16 bg-muted">
    <UCard className="text-center border-2 border-[var(--color-green)] max-w-lg mx-auto">
      <svg className="h-12 w-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="var(--color-green)">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <h3 className="font-display text-xl font-bold text-foreground">Contribution envoyee</h3>
      <p className="text-muted-foreground mt-2">Merci ! Votre proposition sera etudiee.</p>
      {candidature && (
        <p className="text-muted-foreground mt-2">Votre candidature a la liste electorale a aussi ete enregistree.</p>
      )}
    </UCard>
  </section>
);

export default ContribSuccess;
