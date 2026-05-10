import { Clock, Mail, MapPin, Network } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { SectionTitle } from "@/components/sections";
import { ORG_INFO, orgAddressLine } from "@/lib/orgInfo";
import ContactForm from "./ContactForm";

const ContactPage = (): JSX.Element => {
  return (
    <PageWrapper>
      <MetaTags
        title="Contact"
        description="Contactez UNSAgglo. Permanences lundi 12h-13h et jeudi 17h-18h."
      />
      <section className="px-4 md:px-6 py-12 max-w-6xl mx-auto">
        <SectionTitle
          title="Nous contacter"
          subtitle="Une question, un dossier à signaler, une envie de rejoindre l'équipe ? Écrivez-nous."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <ContactForm />
            <p className="text-xs text-muted-foreground leading-relaxed mt-4">
              <strong>Confidentialité</strong> : votre message est traité
              exclusivement par les membres habilités du bureau UNSAgglo. Aucune
              information n'est transmise à votre hiérarchie ni à la direction
              de la CARPF sans votre accord écrit. Pour les situations urgentes,
              indiquez « URGENT » en début de message.
            </p>
          </div>

          <aside className="border border-border rounded-lg p-8">
            <h3 className="font-display text-xl font-bold text-foreground mb-6">
              Coordonnées
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-primary mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-secondary text-sm">Email</p>
                  <a
                    href={`mailto:${ORG_INFO.email}`}
                    className="text-primary underline text-sm"
                  >
                    {ORG_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-secondary text-sm">
                    Siège social UNSAgglo
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {ORG_INFO.adresse.ligne1}
                    <br />
                    {ORG_INFO.adresse.cp} {ORG_INFO.adresse.ville}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-primary mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-secondary text-sm">
                    Permanences syndicales
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Lundi 12h00 – 13h00
                    <br />
                    Jeudi 17h00 – 18h00
                    <br />
                    <span className="italic">
                      Sur rendez-vous en dehors de ces créneaux.
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Network className="w-5 h-5 text-primary mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-secondary text-sm">
                    Affiliation
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {ORG_INFO.federation}
                    <br />
                    {ORG_INFO.unionRegionale}
                  </p>
                </div>
              </div>
            </div>
            <p className="sr-only">{orgAddressLine()}</p>
          </aside>
        </div>
      </section>
    </PageWrapper>
  );
};

export default ContactPage;
