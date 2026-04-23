import { Link } from "react-router-dom";
import UButton from "@/components/ui/UButton";

const ContactCta = (): JSX.Element => (
  <section className="bg-secondary text-white text-center px-4 md:px-6 py-16">
    <div className="max-w-3xl mx-auto">
      <h2 className="font-display font-medium text-2xl md:text-3xl">
        Une question sur votre dossier ?
      </h2>
      <p className="text-white/85 mt-3">
        L'équipe UNSAgglo est là pour vous accompagner dans vos démarches.
      </p>
      <div className="mt-8 flex justify-center">
        <Link to="/contact">
          <UButton variant="primary" size="lg">Nous écrire</UButton>
        </Link>
      </div>
    </div>
  </section>
);

export default ContactCta;
