import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { Link } from "react-router-dom";

const PrivacyPage = (): JSX.Element => (
  <PageWrapper>
    <MetaTags
      title="Politique de confidentialité"
      description="Politique de confidentialité d'UNSAgglo — traitement des données personnelles, droits RGPD."
      noIndex
    />
    <article className="max-w-3xl mx-auto px-4 md:px-6 py-12 text-foreground">
      <h1 className="font-display text-3xl font-medium text-secondary mb-2">
        Politique de confidentialité
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        Dernière mise à jour : avril 2026
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        1. Responsable de traitement
      </h2>
      <p className="leading-relaxed">
        UNSAgglo — Libres Ensemble, section syndicale affiliée à UNSA
        Territoriaux, domiciliée 32 rue de la Briqueterie, 95380 Louvres, est
        responsable du traitement des données personnelles collectées via le
        présent site.
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        2. Référent RGPD
      </h2>
      <p className="leading-relaxed">
        Conformément à l'article 37 du Règlement (UE) 2016/679, UNSAgglo a
        désigné un référent RGPD :
      </p>
      <p className="leading-relaxed mt-2">
        <strong>Rhiad AZZABI</strong>, Secrétaire Général d'UNSAgglo.
        <br />
        Contact :{" "}
        <a
          href="mailto:unsagglo@roissypaysdefrance.fr"
          className="text-primary underline"
        >
          unsagglo@roissypaysdefrance.fr
        </a>{" "}
        (préciser « RGPD » dans l'objet).
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        3. Données collectées et finalités
      </h2>
      <p className="leading-relaxed mb-3">
        Les traitements suivants sont mis en œuvre :
      </p>

      <h3 className="font-display text-lg font-medium text-secondary mt-6 mb-2">
        3.1. Adhésion syndicale
      </h3>
      <ul className="list-disc list-inside space-y-1 leading-relaxed">
        <li>
          Données collectées : identité civile, coordonnées, données
          professionnelles (catégorie, grade, échelon, statut, site
          d'affectation, date d'entrée à la CARPF), coordonnées bancaires (si
          prélèvement SEPA).
        </li>
        <li>
          Finalité : gestion de l'adhésion, émission de la carte d'adhérent,
          recouvrement de la cotisation, communication syndicale, défense des
          intérêts de l'adhérent.
        </li>
        <li>
          Base légale : article 6.1.b RGPD (exécution du contrat d'adhésion) et
          article 9.2.d RGPD (traitement par une organisation syndicale).
        </li>
        <li>
          Durée de conservation : durée de l'adhésion, prolongée de 3 ans après
          la radiation pour conservation des justificatifs comptables et
          syndicaux.
        </li>
      </ul>

      <h3 className="font-display text-lg font-medium text-secondary mt-6 mb-2">
        3.2. Plateforme de participation collective
      </h3>
      <ul className="list-disc list-inside space-y-1 leading-relaxed">
        <li>
          Données collectées : prénom (ou anonymat), service, statut,
          contribution écrite. Optionnel : nom, courriel, téléphone si la
          personne souhaite être recontactée.
        </li>
        <li>
          Finalité : recueil des contributions au programme syndical 2026,
          suivi de traitement des idées, retour individuel si la personne le
          souhaite.
        </li>
        <li>Base légale : article 6.1.a RGPD (consentement).</li>
        <li>
          Durée de conservation : 3 ans à compter du dépôt, puis archivage
          anonymisé ou suppression. Les contributions anonymes ne sont pas
          associées à une personne identifiable.
        </li>
      </ul>

      <h3 className="font-display text-lg font-medium text-secondary mt-6 mb-2">
        3.3. Candidature à la liste électorale 2026
      </h3>
      <ul className="list-disc list-inside space-y-1 leading-relaxed">
        <li>Données collectées : identité civile, courriel, téléphone, service.</li>
        <li>
          Finalité : constitution de la liste UNSAgglo aux élections
          professionnelles de décembre 2026, prise de contact avec les
          candidats potentiels.
        </li>
        <li>Base légale : article 6.1.a RGPD (consentement).</li>
        <li>
          Accès : restreint aux responsables UNSAgglo habilités par mandat du
          bureau. Aucune transmission à des tiers, aucune publication sans
          accord préalable.
        </li>
        <li>
          Durée de conservation : jusqu'à la proclamation des résultats des
          élections de décembre 2026, prolongée d'un an pour gestion du
          contentieux électoral éventuel. Les candidats non retenus sur la
          liste finale peuvent demander la suppression immédiate de leurs
          données.
        </li>
      </ul>

      <h3 className="font-display text-lg font-medium text-secondary mt-6 mb-2">
        3.4. Demande de contact
      </h3>
      <ul className="list-disc list-inside space-y-1 leading-relaxed">
        <li>Données collectées : nom, courriel, message.</li>
        <li>Finalité : traiter la demande adressée à UNSAgglo.</li>
        <li>
          Base légale : article 6.1.f RGPD (intérêt légitime à répondre à une
          sollicitation).
        </li>
        <li>Durée de conservation : 3 ans à compter du dernier échange.</li>
      </ul>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        4. Destinataires des données
      </h2>
      <p className="leading-relaxed">
        Les données sont accessibles aux seuls membres du bureau UNSAgglo
        habilités, et le cas échéant aux instances fédérales UNSA Territoriaux
        dans le cadre strict du suivi de l'adhésion. Aucune donnée n'est
        cédée, vendue ou louée à des tiers commerciaux.
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        5. Sous-traitants et hébergement
      </h2>
      <p className="leading-relaxed mb-3">
        Les données sont traitées par les sous-traitants techniques suivants :
      </p>
      <ul className="list-disc list-inside space-y-2 leading-relaxed">
        <li>
          <strong>Lovable Labs AB</strong> (Box 190, 101 23 Stockholm, Suède)
          — hébergement frontend. Données traitées dans l'Union européenne.
        </li>
        <li>
          <strong>Supabase Inc.</strong> — base de données et fonctions
          serveur. Si le projet est hébergé hors UE, le transfert est encadré
          par les Clauses Contractuelles Types adoptées par la Commission
          européenne le 4 juin 2021.
        </li>
      </ul>
      <p className="leading-relaxed mt-3">
        Chaque sous-traitant est lié à UNSAgglo par un Data Processing
        Agreement conforme à l'article 28 RGPD.
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        6. Sécurité
      </h2>
      <p className="leading-relaxed">
        Les données sont protégées par chiffrement en transit (TLS) et au
        repos. Les accès en écriture sont restreints aux comptes
        administrateurs, identifiés et authentifiés. Aucune donnée bancaire
        n'est stockée sur le site : les mandats SEPA, le cas échéant, sont
        gérés via le circuit de la fédération.
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        7. Vos droits
      </h2>
      <p className="leading-relaxed mb-3">
        Conformément aux articles 15 à 22 du RGPD, vous disposez des droits
        suivants sur vos données :
      </p>
      <ul className="list-disc list-inside space-y-1 leading-relaxed">
        <li>Droit d'accès (article 15)</li>
        <li>Droit de rectification (article 16)</li>
        <li>Droit à l'effacement (article 17)</li>
        <li>Droit à la limitation du traitement (article 18)</li>
        <li>Droit à la portabilité (article 20)</li>
        <li>Droit d'opposition (article 21)</li>
        <li>
          Droit de retirer votre consentement à tout moment, sans que cela
          remette en cause la licéité du traitement antérieur (article 7.3)
        </li>
      </ul>
      <p className="leading-relaxed mt-3">
        Pour exercer ces droits, écrivez à{" "}
        <a
          href="mailto:unsagglo@roissypaysdefrance.fr"
          className="text-primary underline"
        >
          unsagglo@roissypaysdefrance.fr
        </a>{" "}
        en précisant « RGPD » dans l'objet. Une réponse vous sera apportée
        dans un délai d'un mois conformément à l'article 12.3 RGPD.
      </p>
      <p className="leading-relaxed mt-3">
        Vous disposez également du droit d'introduire une réclamation auprès
        de la Commission Nationale de l'Informatique et des Libertés (CNIL) :{" "}
        <a
          href="https://www.cnil.fr"
          className="text-primary underline"
          target="_blank"
          rel="noreferrer"
        >
          cnil.fr
        </a>
        .
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        8. Cookies
      </h2>
      <p className="leading-relaxed">
        Le site utilise un nombre minimal de cookies, strictement nécessaires
        à son fonctionnement (cookie de session, préférences d'affichage).
        Aucun cookie de mesure d'audience tierce, aucun cookie publicitaire
        et aucun cookie de réseaux sociaux ne sont déposés.
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        9. Données particulières au sens de l'article 9 RGPD
      </h2>
      <p className="leading-relaxed">
        L'adhésion à UNSAgglo et toute donnée révélant l'engagement syndical
        d'une personne constituent des données particulières au sens de
        l'article 9.1 du RGPD. Leur traitement est licitement fondé sur
        l'article 9.2.d RGPD (traitement par une organisation à finalité
        syndicale, dans le cadre de ses activités légitimes, et limité à ses
        adhérents et anciens adhérents). Ces données ne sont jamais transmises
        à un tiers sans le consentement explicite de la personne concernée.
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        10. Modifications
      </h2>
      <p className="leading-relaxed">
        La présente politique peut évoluer. La date de dernière mise à jour
        figure en tête de page. Les modifications substantielles seront
        signalées aux adhérents par courriel.
      </p>

      <p className="mt-10 text-sm text-muted-foreground">
        Voir aussi :{" "}
        <Link to="/mentions-legales" className="text-primary underline">
          Mentions légales
        </Link>
      </p>
    </article>
  </PageWrapper>
);

export default PrivacyPage;
