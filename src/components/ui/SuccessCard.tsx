import UCard from "@/components/ui/UCard";

interface SuccessCardProps {
  title: string;
  message: string;
}

const SuccessCard = ({ title, message }: SuccessCardProps): JSX.Element => (
  <UCard className="text-center border-2 border-green">
    <svg className="h-12 w-12 text-green mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
    <h3 className="font-display text-xl font-bold text-foreground">{title}</h3>
    <p className="text-muted-foreground mt-2">{message}</p>
  </UCard>
);

export default SuccessCard;
