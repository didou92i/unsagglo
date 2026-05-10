import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  BookOpenCheck,
  CalendarCheck,
  Clock,
  FileText,
  FolderOpen,
  HeartPulse,
  LockKeyhole,
  Mail,
  MessageSquareText,
  ShieldAlert,
  Siren,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { SectionTitle } from "@/components/sections";
import UButton from "@/components/ui/UButton";
import UCard from "@/components/ui/UCard";
import { ORG_INFO } from "@/lib/orgInfo";
import DocumentsList from "./DocumentsList";
import ProfileCard from "./ProfileCard";

interface MemberService {
  Icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
  to?: string;
  href?: string;
}

const contactSubject = (subject: string): string =>
  `mailto:${ORG_INFO.email}?subject=${encodeURIComponent(subject)}`;

const MEMBER_SERVICES: MemberService[] = [
  {
    Icon: CalendarCheck,
    title: "Permanence et accompagnement individuel",
    description:
      "Une question, un dossier, un doute : prenez rendez-vous avec un membre du bureau. Pour les situations urgentes, un délai de réponse rapide est garanti.",
    cta: "Demander un rendez-vous",
    href: contactSubject("Demande de rendez-vous adhérent UNSAgglo"),
  },
  {
    Icon: MessageSquareText,
    title: "Plateforme de participation collective",
    description:
      "Déposez vos questions, signalements et propositions, anonymement si vous le souhaitez. Vos contributions alimentent les positions UNSAgglo.",
    cta: "Accéder à la plateforme",
    to: "/plateforme",
  },
  {
    Icon: BookOpenCheck,
    title: "Veille juridique et statutaire",
    description:
      "Retrouvez les notes utiles sur le CGFP, les protocoles CARPF, les délibérations et les évolutions statutaires qui concernent les agents.",
    cta: "Consulter les actualités",
    to: "/news",
  },
  {
    Icon: ShieldAlert,
    title: "Accompagnement disciplinaire",
    description:
      "Préparation de votre défense, lecture du dossier, rédaction d'observations et accompagnement en conseil de discipline si nécessaire.",
    cta: "Signaler une procédure",
    href: contactSubject("Procédure disciplinaire - accompagnement adhérent"),
  },
  {
    Icon: Siren,
    title: "Suivi CITIS et accident de service / trajet",
    description:
      "Constitution du dossier, vérification du maintien des compléments indemnitaires et recours en cas de refus d'imputabilité.",
    cta: "Ouvrir un dossier CITIS",
    to: "/rights/citis",
  },
  {
    Icon: HeartPulse,
    title: "Risques psychosociaux et conditions de travail",
    description:
      "Accompagnement dans la formalisation d'un signalement, lien avec la médecine de prévention et saisine de la F3SCT le cas échéant.",
    cta: "Signaler une situation RPS",
    href: contactSubject("Signalement RPS ou conditions de travail"),
  },
  {
    Icon: FolderOpen,
    title: "Documentation utile",
    description:
      "Statuts UNSAgglo, charte UNSA, modèles de courriers, fiches pratiques et documents syndicaux mis à disposition des adhérents.",
    cta: "Voir les documents",
    to: "#documents",
  },
];

const actionClass =
  "inline-flex items-center justify-center rounded-[var(--radius-sm)] border-2 border-primary px-3 py-1.5 font-display text-sm font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground";

const MembersPage = (): JSX.Element => {
  const { user, logout } = useAuth();
  const { profile } = useProfile();

  const handleLogout = async (): Promise<void> => {
    await logout();
  };

  const displayName = profile?.prenom && profile?.nom
    ? `${profile.prenom} ${profile.nom}`
    : user?.email ?? "";

  return (
    <PageWrapper>
      <MetaTags
        title="Espace adhérent"
        description="Espace confidentiel réservé aux adhérents UNSAgglo."
        noIndex
      />
      <section className="px-4 md:px-6 py-10 max-w-6xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <p className="text-sm font-semibold text-primary">Espace adhérent</p>
            <h1 className="font-display text-2xl md:text-3xl font-black text-secondary">
              Bonjour{displayName ? `, ${displayName}` : ""}
            </h1>
            <p className="text-muted-foreground text-sm">
              Espace réservé aux adhérents UNSAgglo à jour de cotisation.
            </p>
          </div>
          <UButton variant="outline" size="sm" onClick={handleLogout}>
            Déconnexion
          </UButton>
        </div>

        <div
          className="rounded-lg px-6 md:px-8 py-8 mb-8 text-white"
          style={{ backgroundColor: "#29235c" }}
        >
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl font-medium">
              Bienvenue dans votre espace UNSAgglo.
            </h2>
            <p className="text-white/85 leading-relaxed mt-3">
              Cet espace rassemble les services concrets que vous pouvez
              mobiliser tout au long de votre adhésion, dans un cadre
              strictement confidentiel.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-6 mb-12">
          <ProfileCard />
          <UCard>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-display text-lg font-bold text-secondary">
                  Coordonnées rapides
                </h3>
                <p className="text-sm text-muted-foreground mt-3">
                  Email dédié adhérents :
                  {" "}
                  <a href={`mailto:${ORG_INFO.email}`} className="text-primary font-semibold underline">
                    {ORG_INFO.email}
                  </a>
                </p>
                <div className="flex items-start gap-2 text-sm text-muted-foreground mt-4">
                  <Clock className="w-4 h-4 text-primary mt-0.5" />
                  <p>
                    Permanences : lundi 12h00-13h00, jeudi 17h00-18h00.
                    <br />
                    Sur rendez-vous en dehors de ces créneaux.
                  </p>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <SectionTitle
          title="Vos services"
          subtitle="Les points d'entrée utiles pour demander de l'aide, contribuer et retrouver vos documents."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-12">
          {MEMBER_SERVICES.map(({ Icon, title, description, cta, to, href }) => (
            <UCard key={title} padding="md">
              <div className="flex flex-col h-full">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-secondary">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2 flex-1">
                  {description}
                </p>
                {to ? (
                  <Link to={to} className={`${actionClass} mt-4`}>
                    {cta}
                  </Link>
                ) : (
                  <a href={href} className={`${actionClass} mt-4`}>
                    {cta}
                  </a>
                )}
              </div>
            </UCard>
          ))}
        </div>

        <section className="rounded-lg border border-primary/20 bg-primary/5 px-5 md:px-6 py-6 mb-12">
          <div className="flex items-start gap-3">
            <LockKeyhole className="w-6 h-6 text-primary mt-0.5" />
            <div>
              <h2 className="font-display text-xl font-bold text-secondary">
                Confidentialité
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                Tous vos échanges avec UNSAgglo sont strictement confidentiels.
                Aucune information transmise au syndicat n'est communiquée à la
                direction de la CARPF sans votre accord écrit. La liste des
                adhérents n'est ni publiée ni transmise à l'employeur.
              </p>
            </div>
          </div>
        </section>

        <section id="documents">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-5 h-5 text-primary" />
            <SectionTitle title="Documents syndicaux" align="left" />
          </div>
          <DocumentsList />
        </section>
      </section>
    </PageWrapper>
  );
};

export default MembersPage;
