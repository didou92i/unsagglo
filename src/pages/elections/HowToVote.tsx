import { Vote } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface QA {
  id: string;
  question: string;
  answer: string;
}

const QUESTIONS: QA[] = [
  {
    id: "qui",
    question: "Qui peut voter ?",
    answer:
      "Tous les agents de la Communauté d'Agglomération Roissy Pays de France ayant au moins trois mois d'ancienneté à la date du scrutin : titulaires, stagiaires, contractuels (CDI / CDD), apprentis, vacataires régulièrement employés. Aucun choix politique ou syndical n'est demandé pour voter.",
  },
  {
    id: "quand",
    question: "Quand a lieu le vote ?",
    answer:
      "Élections professionnelles de la fonction publique territoriale : scrutin unique en décembre 2026 (date précise fixée par décret, traditionnellement la première semaine de décembre). UNSAgglo mettra à jour cette page dès la publication officielle.",
  },
  {
    id: "comment",
    question: "Comment se déroule le vote ?",
    answer:
      "Le vote est organisé par l'employeur (la CARPF). Selon les modalités retenues : vote à l'urne dans votre site d'affectation, vote par correspondance, ou vote électronique. Un courrier individuel vous parviendra plusieurs semaines avant pour vous indiquer la procédure exacte qui s'applique à vous.",
  },
  {
    id: "instances",
    question: "Pour quelles instances vote-t-on ?",
    answer:
      "Principalement le Comité Social Territorial (CST), instance qui traite des conditions générales d'organisation et de fonctionnement de la collectivité (rémunération, conditions de travail, formation, télétravail, etc.). Suivant votre catégorie, vous voterez aussi pour les Commissions Administratives Paritaires (CAP — avancement, mutation, discipline) et la Commission Consultative Paritaire (CCP — pour les contractuels).",
  },
  {
    id: "documents",
    question: "Quels documents apporter ?",
    answer:
      "Une pièce d'identité avec photo (carte d'identité, passeport, permis, badge professionnel CARPF). Le matériel de vote (bulletins, enveloppes, profession de foi de chaque liste) vous est remis sur place ou par courrier selon la modalité retenue.",
  },
  {
    id: "absent",
    question: "Je serai absent le jour du vote, que faire ?",
    answer:
      "Vous pouvez voter par correspondance si la modalité a été retenue par votre employeur. Le matériel de vote vous est alors envoyé à domicile en amont. Renvoyez votre bulletin par voie postale dans les délais impartis. Le vote par procuration n'est pas possible pour ce type de scrutin.",
  },
  {
    id: "pourquoi-voter",
    question: "Pourquoi est-ce important de voter ?",
    answer:
      "Les résultats déterminent la représentativité syndicale dans votre collectivité pour quatre ans. Plus la participation est forte, plus la voix des agents pèse face à la direction. Voter prend cinq minutes et engage les quatre prochaines années de votre vie au travail.",
  },
  {
    id: "premiere",
    question: "Pourquoi UNSAgglo se présente pour la première fois ?",
    answer:
      "UNSAgglo est née d'un constat partagé : il manquait à la CARPF une voix syndicale 100 % locale, transparente et co-construite avec les agents. Notre section syndicale (bureau, statuts, affiliation UNSA Territoriaux) est opérationnelle depuis plusieurs mois ; les élections de décembre 2026 nous permettront de porter officiellement vos idées au CST.",
  },
];

const HowToVote = (): JSX.Element => (
  <section
    id="comment-voter"
    className="px-4 md:px-6 py-20"
    style={{ backgroundColor: "#f5f5f7" }}
  >
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-primary">
          <Vote className="h-3.5 w-3.5" strokeWidth={2} />
          Mode d'emploi
        </p>
        <h2 className="font-display font-medium text-secondary text-3xl md:text-4xl leading-tight">
          Comment voter ?
        </h2>
        <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto leading-relaxed">
          Tout ce qu'il faut savoir sur le scrutin de décembre 2026 — date,
          modalités, documents, instances. Les questions qu'on entend tous les
          jours.
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        className="bg-white rounded-lg px-6 md:px-8"
      >
        {QUESTIONS.map((qa) => (
          <AccordionItem key={qa.id} value={qa.id}>
            <AccordionTrigger className="text-left text-secondary font-medium text-base hover:no-underline">
              {qa.question}
            </AccordionTrigger>
            <AccordionContent className="text-foreground/80 leading-relaxed">
              {qa.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <p className="text-center text-xs text-muted-foreground mt-6 italic">
        Une question qui ne figure pas ici ? Écrivez à{" "}
        <a
          href="mailto:unsagglo@roissypaysdefrance.fr"
          className="text-primary underline underline-offset-2 hover:opacity-80"
        >
          unsagglo@roissypaysdefrance.fr
        </a>
      </p>
    </div>
  </section>
);

export default HowToVote;
