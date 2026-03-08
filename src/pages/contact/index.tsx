import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { SectionTitle } from "@/components/sections";
import ContactForm from "./ContactForm";

const ContactPage = (): JSX.Element => {
  return (
    <PageWrapper>
      <MetaTags title="Contact" description="Contactez UNSAgglo. Permanences lundi 12h-13h et jeudi 17h-18h." />
      <section className="px-4 md:px-6 py-12 max-w-6xl mx-auto">
        <SectionTitle title="Nous contacter" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ContactForm />
          <div className="bg-muted p-8 rounded-[var(--radius-lg)]">
            <h3 className="font-display text-xl font-bold text-foreground mb-4">Coordonnees</h3>
            <p className="text-foreground text-sm mb-2">
              Email : <a href="mailto:unsagglo@unsa.org" className="text-primary underline">unsagglo@unsa.org</a>
            </p>
            <p className="text-foreground text-sm mb-6">
              Permanences : Lundi 12h--13h / Jeudi 17h--18h
            </p>
            <p className="text-sm font-semibold text-secondary mb-2">Localisation</p>
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=2.50%2C49.00%2C2.60%2C49.01&layer=mapnik"
              className="w-full h-48 rounded-[var(--radius-md)] border-0"
              title="Localisation UNSAgglo"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default ContactPage;
