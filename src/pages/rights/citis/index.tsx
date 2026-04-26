import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { SectionTitle } from "@/components/sections";
import UCard from "@/components/ui/UCard";
import Divider from "@/components/ui/Divider";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  Gavel,
  ShieldCheck,
} from "lucide-react";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qu'est-ce que le CITIS ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Le Congé pour Invalidité Temporaire Imputable au Service (CITIS) est un congé accordé au fonctionnaire territorial dont l'incapacité temporaire de travail résulte d'un accident de service, d'un accident de trajet ou d'une maladie professionnelle. Il est régi par les articles L.822-18 à L.822-25 du Code général de la fonction publique et le décret n° 87-602 du 30 juillet 1987.",
      },
    },
    {
      "@type": "Question",
      name: "Dans quel délai déclarer un accident de service ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "L'accident doit être déclaré à l'autorité territoriale dans un délai de 15 jours à compter de sa survenance (article 37-3-I du décret n° 87-602). L'arrêt de travail doit, par ailleurs, être transmis dans les 48 heures suivant son établissement (article 37-3-III). Ces deux délais sont distincts.",
      },
    },
    {
      "@type": "Question",
      name: "Le régime indemnitaire est-il maintenu pendant le CITIS ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Le traitement indiciaire est maintenu de plein droit (article L.822-22 du CGFP). Le maintien du régime indemnitaire (IFSE, IHTS forfait, astreintes, ISFE part fixe) n'est, en revanche, pas automatique : il dépend de la délibération de la collectivité et est actionnable sur le fondement de la jurisprudence du Conseil d'État Moya-Caville (CE, 4 juillet 2003, n° 211106) et de sa lignée.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles sont les voies de recours en cas de refus du CITIS ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "L'agent peut former un recours administratif préalable (gracieux ou hiérarchique) devant l'autorité territoriale, qui peut saisir le conseil médical en formation plénière pour un nouvel avis. Un recours contentieux peut ensuite être introduit devant le tribunal administratif dans un délai de deux mois à compter de la décision contestée. La commission de réforme n'existe plus depuis le décret n° 2022-350 du 11 mars 2022.",
      },
    },
  ],
};

const CitisPage = (): JSX.Element => {
  return (
    <PageWrapper>
      <MetaTags
        title="CITIS — Congé pour Invalidité Temporaire Imputable au Service"
        description="Le CITIS est le congé accordé au fonctionnaire territorial victime d'un accident de service, d'un accident de trajet ou d'une maladie professionnelle. Cadre juridique, délais, régime indemnitaire, voies de recours et accompagnement UNSAgglo."
        schema={FAQ_SCHEMA}
      />
      <article className="max-w-3xl mx-auto px-4 md:px-6 py-12">
        <SectionTitle
          title="CITIS"
          subtitle="Congé pour Invalidité Temporaire Imputable au Service"
          align="left"
          accentColor="var(--color-red)"
        />

        <h3 className="font-display text-xl font-bold text-foreground mt-10">
          Définition
        </h3>
        <p className="text-foreground mt-2 leading-relaxed">
          Le Congé pour Invalidité Temporaire Imputable au Service (CITIS) est
          accordé au fonctionnaire territorial en activité dont l'incapacité
          temporaire de travail est consécutive à :
        </p>
        <ul className="list-disc list-inside text-foreground mt-3 space-y-1 leading-relaxed">
          <li>un <strong>accident de service</strong> (article L.822-18 du CGFP) ;</li>
          <li>un <strong>accident de trajet</strong> (article L.822-19 du CGFP) ;</li>
          <li>une <strong>maladie professionnelle</strong> (article L.822-20 du CGFP).</li>
        </ul>
        <p className="text-foreground mt-3 leading-relaxed">
          Il s'applique aux fonctionnaires territoriaux titulaires et stagiaires
          affiliés à la CNRACL. Les agents contractuels et les fonctionnaires
          relevant du régime général (IRCANTEC) sont soumis à un régime
          indemnitaire distinct.
        </p>

        <UCard className="mt-6" padding="md">
          <div className="flex items-start gap-3">
            <FileText
              className="w-5 h-5 shrink-0 mt-0.5"
              style={{ color: "var(--color-cyan)" }}
            />
            <div>
              <h4 className="font-display font-bold text-foreground mb-2">
                Cadre juridique applicable à la FPT
              </h4>
              <ul className="text-sm text-foreground space-y-1 leading-relaxed">
                <li>Articles <strong>L.822-18 à L.822-25</strong> du Code général de la fonction publique (CGFP)</li>
                <li>Décret n° <strong>87-602</strong> du 30 juillet 1987, articles <strong>37-1 à 37-20</strong></li>
                <li>Décret n° <strong>2019-301</strong> du 10 avril 2019 (modalités CITIS pour la FPT)</li>
                <li>Décret n° <strong>2022-350</strong> du 11 mars 2022 (création des conseils médicaux, suppression des commissions de réforme)</li>
              </ul>
            </div>
          </div>
        </UCard>

        <h3 className="font-display text-xl font-bold text-foreground mt-10">
          Maintien de la rémunération
        </h3>
        <p className="text-foreground mt-2 leading-relaxed">
          Pendant toute la durée du CITIS, l'agent conserve son traitement
          indiciaire intégral. Le maintien du régime indemnitaire suit, en
          revanche, des règles différentes — c'est un point souvent méconnu, et
          un levier syndical concret sur lequel UNSAgglo accompagne les agents.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <UCard padding="md">
            <div className="flex items-start gap-3">
              <CheckCircle2
                className="w-5 h-5 shrink-0 mt-0.5"
                style={{ color: "#16a34a" }}
              />
              <div>
                <h4 className="font-display font-bold text-foreground mb-2">
                  Maintien automatique
                </h4>
                <p className="text-sm text-foreground leading-relaxed">
                  <strong>Traitement indiciaire</strong>, indemnité de résidence,
                  supplément familial de traitement, NBI : maintenus de plein
                  droit (article L.822-22 du CGFP).
                </p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  La période de CITIS est, par ailleurs, considérée comme du
                  service effectif pour l'avancement et la retraite.
                </p>
              </div>
            </div>
          </UCard>

          <UCard padding="md">
            <div className="flex items-start gap-3">
              <AlertCircle
                className="w-5 h-5 shrink-0 mt-0.5"
                style={{ color: "var(--color-red)" }}
              />
              <div>
                <h4 className="font-display font-bold text-foreground mb-2">
                  Maintien actionnable
                </h4>
                <p className="text-sm text-foreground leading-relaxed">
                  <strong>Régime indemnitaire</strong> (IFSE, IHTS forfait,
                  astreintes, ISFE part fixe) : le maintien dépend de la
                  délibération de la collectivité (décret n° 2010-997 et
                  délibérations CARPF applicables).
                </p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Une suspension fautive ouvre droit à une réparation sur le
                  fondement de la jurisprudence Conseil d'État{" "}
                  <strong>Moya-Caville</strong> (CE, 4 juillet 2003, n° 211106)
                  et de sa lignée.
                </p>
              </div>
            </div>
          </UCard>
        </div>

        <h3 className="font-display text-xl font-bold text-foreground mt-10">
          Procédure de déclaration
        </h3>
        <p className="text-foreground mt-2 leading-relaxed">
          Deux délais distincts s'imposent à l'agent — leur confusion conduit à
          des pertes de droits évitables.
        </p>

        <div className="space-y-3 mt-5">
          <UCard padding="md">
            <div className="flex items-start gap-3">
              <Clock
                className="w-5 h-5 shrink-0 mt-0.5"
                style={{ color: "var(--color-navy)" }}
              />
              <div>
                <h4 className="font-display font-bold text-foreground">
                  15 jours — Déclaration de l'accident
                </h4>
                <p className="text-sm text-foreground mt-1 leading-relaxed">
                  Adresser à l'autorité territoriale une <strong>déclaration
                  d'accident de service</strong> (formulaire type) accompagnée
                  d'un <strong>certificat médical initial</strong> (article
                  37-3-I du décret n° 87-602).
                </p>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  Si la lésion n'apparaît qu'après l'accident et qu'un certificat
                  médical de constatation est établi dans les deux ans, le délai
                  de quinze jours court à compter de cette constatation.
                </p>
              </div>
            </div>
          </UCard>

          <UCard padding="md">
            <div className="flex items-start gap-3">
              <Clock
                className="w-5 h-5 shrink-0 mt-0.5"
                style={{ color: "var(--color-navy)" }}
              />
              <div>
                <h4 className="font-display font-bold text-foreground">
                  48 heures — Transmission de l'arrêt de travail
                </h4>
                <p className="text-sm text-foreground mt-1 leading-relaxed">
                  Lorsqu'un arrêt de travail est prescrit, il doit être adressé
                  à l'administration <strong>dans les 48 heures suivant son
                  établissement</strong> (article 37-3-III du décret n° 87-602).
                </p>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  En cas d'envoi tardif, la rémunération afférente à la période
                  écoulée peut être réduite de moitié.
                </p>
              </div>
            </div>
          </UCard>
        </div>

        <h3 className="font-display text-xl font-bold text-foreground mt-10">
          Instruction par l'administration
        </h3>
        <p className="text-foreground mt-2 leading-relaxed">
          L'autorité territoriale dispose, en principe, d'un délai d'
          <strong>un mois</strong> pour statuer sur l'imputabilité. Ce délai est
          prorogeable de <strong>trois mois</strong> lorsqu'une expertise
          médicale, une enquête administrative ou l'avis du conseil médical sont
          nécessaires (article 37-4 du décret n° 87-602).
        </p>
        <p className="text-foreground mt-3 leading-relaxed">
          Pendant l'instruction, l'agent peut être placé en{" "}
          <strong>CITIS à titre provisoire</strong>. Si l'imputabilité n'est pas
          finalement reconnue, le placement provisoire est retiré et l'agent
          est placé rétroactivement en congé de maladie ordinaire.
        </p>

        <h3 className="font-display text-xl font-bold text-foreground mt-10">
          Voies de recours en cas de refus
        </h3>

        <UCard className="mt-4" padding="md">
          <div className="flex items-start gap-3">
            <Gavel
              className="w-5 h-5 shrink-0 mt-0.5"
              style={{ color: "var(--color-navy)" }}
            />
            <div className="space-y-3 text-sm text-foreground leading-relaxed">
              <p>
                <strong>1. Recours administratif préalable</strong> — gracieux
                (auprès de l'autorité territoriale qui a pris la décision) ou
                hiérarchique. L'autorité peut saisir le{" "}
                <strong>conseil médical en formation plénière</strong> pour un
                nouvel avis. Délai recommandé : deux mois à compter de la
                notification du refus.
              </p>
              <p>
                <strong>2. Recours contentieux</strong> — saisine du{" "}
                <strong>tribunal administratif</strong> dans un délai de deux
                mois à compter de la décision explicite ou implicite de refus.
                Le tribunal administratif compétent pour la CARPF est celui de{" "}
                <strong>Cergy-Pontoise</strong>.
              </p>
              <p className="text-muted-foreground italic text-xs pt-2 border-t border-border">
                La <strong>commission de réforme n'existe plus</strong> depuis
                le décret n° 2022-350 du 11 mars 2022. Elle a été remplacée par
                le conseil médical (formation restreinte ou plénière selon les
                cas), qui rend un avis consultatif et n'est pas l'instance
                d'examen du RAPO.
              </p>
            </div>
          </div>
        </UCard>

        <h3 className="font-display text-xl font-bold text-foreground mt-10">
          Accompagnement UNSAgglo
        </h3>
        <UCard className="mt-4" style={{ backgroundColor: "#eff9fe" }} padding="md">
          <div className="flex items-start gap-3">
            <ShieldCheck
              className="w-5 h-5 shrink-0 mt-0.5"
              style={{ color: "var(--color-cyan)" }}
            />
            <div className="space-y-2 text-sm text-foreground leading-relaxed">
              <p>UNSAgglo accompagne les agents de la CARPF sur l'ensemble du parcours CITIS :</p>
              <ul className="list-disc list-inside space-y-1 ml-1">
                <li>Vérification du respect des délais et de la complétude du dossier</li>
                <li>Analyse de la décision d'imputabilité et identification des motifs contestables</li>
                <li>
                  Évaluation du maintien du régime indemnitaire (IFSE, IHTS
                  forfait, astreintes, ISFE) au regard des délibérations CARPF
                </li>
                <li>Rédaction du recours gracieux ou hiérarchique le cas échéant</li>
                <li>Conseil sur les voies contentieuses et la jurisprudence applicable</li>
              </ul>
              <p className="pt-2">
                Pour solliciter un accompagnement, écrivez à{" "}
                <a
                  href="mailto:unsagglo@roissypaysdefrance.fr?subject=Accompagnement CITIS"
                  className="text-primary font-semibold underline"
                >
                  unsagglo@roissypaysdefrance.fr
                </a>{" "}
                en précisant « CITIS » dans l'objet.
              </p>
            </div>
          </div>
        </UCard>

        <h3 className="font-display text-xl font-bold text-foreground mt-10">
          Sources et références
        </h3>
        <ul className="text-sm text-muted-foreground mt-3 space-y-1 leading-relaxed">
          <li>
            Code général de la fonction publique, articles L.822-18 à L.822-25 —{" "}
            <a
              href="https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000044416551/LEGISCTA000044424563/"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline"
            >
              Légifrance
            </a>
          </li>
          <li>
            Décret n° 87-602 du 30 juillet 1987, articles 37-1 à 37-20 —{" "}
            <a
              href="https://www.legifrance.gouv.fr/loda/id/LEGITEXT000006066021/"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline"
            >
              Légifrance
            </a>
          </li>
          <li>
            Décret n° 2019-301 du 10 avril 2019 relatif au CITIS dans la FPT —{" "}
            <a
              href="https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000038362142"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline"
            >
              Légifrance
            </a>
          </li>
          <li>
            Décret n° 2022-350 du 11 mars 2022 portant création des conseils
            médicaux —{" "}
            <a
              href="https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000045344015"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline"
            >
              Légifrance
            </a>
          </li>
          <li>
            CE, 4 juillet 2003, Mme Moya-Caville, n° 211106 — fondement
            jurisprudentiel du préjudice patrimonial sans faute
          </li>
        </ul>

        <p className="text-xs text-muted-foreground mt-8 italic leading-relaxed">
          Cette fiche a une vocation informative. Elle n'a pas la valeur d'une
          consultation juridique individuelle et ne remplace pas l'analyse
          d'une situation concrète au regard des pièces du dossier. Pour un
          accompagnement personnalisé, contactez UNSAgglo.
        </p>
        <p className="text-xs text-muted-foreground mt-2 italic">
          Dernière mise à jour : avril 2026.
        </p>

        <Divider />
        <Link
          to="/rights"
          className="text-primary font-semibold hover:underline"
        >
          ← Retour à Vos Droits
        </Link>
      </article>
    </PageWrapper>
  );
};

export default CitisPage;
