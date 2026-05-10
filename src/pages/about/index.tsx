import {
  CheckCircle2,
  Landmark,
  MapPin,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { SectionTitle } from "@/components/sections";
import UCard from "@/components/ui/UCard";
import { ORG_INFO, orgAddressLine } from "@/lib/orgInfo";

interface ValueItem {
  title: string;
  body: string;
}

const VALUES: ValueItem[] = [
  {
    title: "Laïcité, démocratie et libertés",
    body: "Nous défendons un syndicalisme indépendant, attaché aux principes républicains et aux libertés individuelles.",
  },
  {
    title: "Justice sociale et solidarité",
    body: "Notre action vise à protéger les droits professionnels, matériels et moraux des agents de la CARPF.",
  },
  {
    title: "Service public",
    body: "UNSAgglo défend les conditions de travail de celles et ceux qui font vivre le service public local.",
  },
  {
    title: "Indépendance syndicale",
    body: "Le syndicat s'interdit toute discussion ou intervention à caractère politique ou religieux.",
  },
];

const OBJECTS = [
  "Défendre les intérêts professionnels, matériels et moraux, individuels et collectifs, des agents de la CARPF.",
  "Étudier toutes les questions susceptibles d'améliorer les conditions de vie au travail.",
  "Représenter les agents auprès des instances représentatives du personnel : CST, CAP, F3SCT.",
  "Promouvoir le dialogue social et la concertation avec l'employeur.",
  "Lutter contre toutes les formes de discrimination et d'exclusion.",
];

const AboutPage = (): JSX.Element => (
  <PageWrapper>
    <MetaTags
      title="Qui sommes-nous"
      description="UNSAgglo est le syndicat des agents de la Communauté d'Agglomération Roissy Pays de France, constitué le 9 janvier 2026 à Louvres."
    />

    <section
      className="px-4 md:px-6 py-20 text-white"
      style={{ backgroundColor: "#29235c" }}
    >
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4 text-primary">
          Qui sommes-nous
        </p>
        <h1 className="font-display font-medium text-4xl md:text-6xl leading-tight max-w-4xl">
          UNSAgglo, le syndicat des agents de la CARPF
        </h1>
        <p className="text-white/85 text-base md:text-lg leading-relaxed mt-6 max-w-3xl">
          Constitué le 9 janvier 2026 à Louvres, UNSAgglo réunit les agents
          stagiaires, titulaires, contractuels et retraités de la Communauté
          d'Agglomération Roissy Pays de France, sur l'ensemble du territoire
          intercommunal du Val-d'Oise et de Seine-et-Marne.
        </p>
      </div>
    </section>

    <section className="px-4 md:px-6 py-16 bg-white">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
        <div>
          <SectionTitle title="Notre identité" align="left" />
          <div className="space-y-4 text-foreground leading-relaxed">
            <p>
              UNSAgglo est un syndicat professionnel régi par la loi du 21 mars
              1884 et par les dispositions du Code du travail relatives aux
              syndicats. Notre devise, <strong>« Libres Ensemble »</strong>,
              résume notre méthode : l'autonomie de chaque agent, la force du
              collectif.
            </p>
            <p>
              Nous sommes affiliés à la <strong>{ORG_INFO.federation}</strong>,
              elle-même membre de l'Union Nationale des Syndicats Autonomes
              (UNSA). À l'échelle régionale, nous appartenons à l'<strong>{ORG_INFO.unionRegionale}</strong>.
            </p>
            <p>
              UNSAgglo conserve sa personnalité juridique et son autonomie
              d'action dans son domaine de compétence.
            </p>
          </div>
        </div>

        <UCard>
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-display font-bold text-secondary">Bureau syndical</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Secrétaire général : Rhiad AZZABI
                  <br />
                  Trésorier : Didier CARRETTE
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-display font-bold text-secondary">Siège social</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {orgAddressLine()}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-display font-bold text-secondary">Périmètre</p>
                <p className="text-sm text-muted-foreground mt-1">
                  42 communes, environ 800 agents, toutes filières confondues.
                </p>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </section>

    <section className="px-4 md:px-6 py-16" style={{ backgroundColor: "#f5f5f7" }}>
      <div className="max-w-5xl mx-auto">
        <SectionTitle title="Notre objet" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OBJECTS.map((item) => (
            <UCard key={item} padding="md">
              <div className="flex items-start gap-3">
                <Scale className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-foreground leading-relaxed">{item}</p>
              </div>
            </UCard>
          ))}
        </div>
      </div>
    </section>

    <section className="px-4 md:px-6 py-16 bg-white">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title="Nos valeurs" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VALUES.map((value) => (
            <UCard key={value.title} padding="md">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-display font-bold text-secondary">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {value.body}
                  </p>
                </div>
              </div>
            </UCard>
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center mt-8 max-w-3xl mx-auto">
          Nous refusons toute forme de discrimination au sens de l'article
          L.1132-1 du Code du travail.
        </p>
      </div>
    </section>

    <section className="px-4 md:px-6 py-16" style={{ backgroundColor: "#eff9fe" }}>
      <div className="max-w-4xl mx-auto text-center">
        <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-4" />
        <h2 className="font-display text-3xl font-medium text-secondary">
          Un ancrage local, une affiliation nationale
        </h2>
        <p className="text-muted-foreground leading-relaxed mt-4">
          UNSAgglo agit au plus près des agents de la CARPF tout en bénéficiant
          de l'appui juridique, de la formation et du relais fédéral de l'UNSA
          Territoriaux et de l'URTIF.
        </p>
      </div>
    </section>
  </PageWrapper>
);

export default AboutPage;
