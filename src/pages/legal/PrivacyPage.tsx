import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { ORG_INFO, orgAddressLine } from "@/lib/orgInfo";

const PrivacyPage = (): JSX.Element => (
  <PageWrapper>
    <MetaTags
      title="Politique de confidentialité"
      description="Politique de confidentialité d'UNSAgglo — données personnelles, finalités, durées de conservation et droits RGPD."
    />
    <article className="max-w-4xl mx-auto px-4 md:px-6 py-12 text-foreground">
      <h1 className="font-display text-3xl font-medium text-secondary mb-2">
        Politique de confidentialité
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        Dernière mise à jour : 10 mai 2026
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Préambule
      </h2>
      <p className="leading-relaxed">
        UNSAgglo est responsable des traitements de données personnelles
        effectués via le présent site, conformément au Règlement (UE) 2016/679
        du 27 avril 2016 (« RGPD ») et à la loi n°78-17 du 6 janvier 1978
        modifiée relative à l'informatique, aux fichiers et aux libertés.
      </p>
      <p className="leading-relaxed mt-3">
        La présente politique informe les visiteurs, contributeurs et adhérents
        du syndicat sur la nature des données collectées, leurs finalités, leur
        durée de conservation et leurs droits.
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Identité du responsable de traitement
      </h2>
      <p className="leading-relaxed">
        <strong>{ORG_INFO.nom}</strong>
        <br />
        {orgAddressLine()}
        <br />
        <a
          href={`mailto:${ORG_INFO.email}`}
          className="text-primary underline"
        >
          {ORG_INFO.email}
        </a>
      </p>
      <p className="leading-relaxed mt-3">
        Le Secrétaire général est le point de contact unique pour toute question
        relative aux données personnelles.
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Données collectées et finalités
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm border border-border">
          <thead className="bg-muted text-secondary">
            <tr>
              <th className="p-3 text-left">Finalité</th>
              <th className="p-3 text-left">Données collectées</th>
              <th className="p-3 text-left">Base légale</th>
              <th className="p-3 text-left">Durée</th>
            </tr>
          </thead>
          <tbody className="[&_td]:border-t [&_td]:border-border [&_td]:p-3 [&_td]:align-top">
            <tr>
              <td>Adhésion au syndicat</td>
              <td>
                Identité civile, coordonnées, statut, filière, grade, échelon,
                service, site d'affectation, date d'entrée à la CARPF
                facultative, mode de paiement.
              </td>
              <td>Exécution du contrat d'adhésion (art. 6.1.b RGPD)</td>
              <td>
                Durée de l'adhésion + 5 ans pour les obligations comptables et
                fiscales.
              </td>
            </tr>
            <tr>
              <td>Traitement des cotisations</td>
              <td>Coordonnées bancaires ou références chèque, historique de paiement.</td>
              <td>Exécution du contrat et obligations légales (art. 6.1.b et 6.1.c)</td>
              <td>10 ans, durée légale comptable.</td>
            </tr>
            <tr>
              <td>Reçu fiscal</td>
              <td>Identité, montant cotisé annuel.</td>
              <td>Obligation légale (art. 6.1.c)</td>
              <td>6 ans, délai de reprise fiscale.</td>
            </tr>
            <tr>
              <td>Contact général</td>
              <td>Nom facultatif, email, message, objet.</td>
              <td>Intérêt légitime à répondre aux sollicitations (art. 6.1.f)</td>
              <td>3 ans après le dernier échange.</td>
            </tr>
            <tr>
              <td>Plateforme de participation collective</td>
              <td>Contributions anonymes par défaut, signature optionnelle.</td>
              <td>Intérêt légitime à représenter les agents (art. 6.1.f)</td>
              <td>Durée du mandat en cours, archivage anonymisé ensuite.</td>
            </tr>
            <tr>
              <td>Espace adhérent</td>
              <td>Identifiants, journal de connexion.</td>
              <td>Exécution du contrat d'adhésion (art. 6.1.b)</td>
              <td>Durée de l'adhésion + 1 an.</td>
            </tr>
            <tr>
              <td>Newsletter, le cas échéant</td>
              <td>Email.</td>
              <td>Consentement (art. 6.1.a)</td>
              <td>Jusqu'au retrait du consentement.</td>
            </tr>
            <tr>
              <td>Cookies techniques</td>
              <td>Données de navigation strictement nécessaires.</td>
              <td>Intérêt légitime (art. 6.1.f)</td>
              <td>13 mois maximum.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Destinataires des données
      </h2>
      <p className="leading-relaxed">
        Les données collectées sont destinées exclusivement aux membres habilités
        du bureau syndical UNSAgglo, dans le cadre strict de la gestion du
        syndicat et de la défense des adhérents.
      </p>
      <p className="leading-relaxed mt-3 font-semibold">
        Aucune donnée personnelle n'est transmise à l'employeur (CARPF), à des
        tiers commerciaux ou à des services de profilage publicitaire.
      </p>
      <p className="leading-relaxed mt-3">
        Certaines données peuvent être communiquées à la Fédération UNSA
        Territoriaux et à l'URTIF dans la stricte mesure nécessaire à la gestion
        fédérale des adhésions, à l'administration fiscale pour les reçus
        fiscaux, ou à une juridiction sur réquisition judiciaire dûment motivée.
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Hébergement et transferts hors UE
      </h2>
      <p className="leading-relaxed">
        Le site est hébergé par Lovable Labs AB (Suède) pour le frontend et par
        Supabase (région Francfort, Allemagne) pour le backend et la base de
        données.
      </p>
      <p className="leading-relaxed mt-3">
        L'ensemble du traitement et du stockage des données s'effectue au sein
        de l'Espace économique européen. Aucun transfert hors UE n'est effectué
        de manière régulière. Si une opération ponctuelle nécessitait un tel
        transfert, elle serait encadrée par les clauses contractuelles types
        adoptées par la Commission européenne.
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Sécurité
      </h2>
      <p className="leading-relaxed">
        UNSAgglo met en œuvre des mesures techniques et organisationnelles
        appropriées pour protéger les données personnelles : authentification
        renforcée pour les accès administrateurs, chiffrement HTTPS/TLS,
        Row Level Security sur les tables Supabase, sauvegardes régulières,
        journalisation des accès sensibles et formation des membres habilités à
        la confidentialité.
      </p>
      <p className="leading-relaxed mt-3">
        En cas de violation de données susceptible d'entraîner un risque pour
        vos droits et libertés, UNSAgglo s'engage à notifier la CNIL dans un
        délai de 72 heures et à vous informer si le risque est élevé.
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Vos droits
      </h2>
      <p className="leading-relaxed mb-3">
        Conformément aux articles 15 à 22 du RGPD, vous disposez des droits
        suivants : accès, rectification, effacement, limitation du traitement,
        portabilité, opposition, retrait du consentement et directives relatives
        au sort de vos données après votre décès.
      </p>
      <p className="leading-relaxed">
        Adressez votre demande à{" "}
        <a
          href={`mailto:${ORG_INFO.email}`}
          className="text-primary underline"
        >
          {ORG_INFO.email}
        </a>{" "}
        en précisant l'objet de votre demande et les données concernées si
        possible. Une copie d'une pièce d'identité pourra être demandée en cas
        de doute raisonnable sur votre identité. UNSAgglo répond dans un délai
        d'un mois, susceptible d'être prolongé de deux mois pour les demandes
        complexes.
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Réclamation auprès de la CNIL
      </h2>
      <p className="leading-relaxed">
        Si vous estimez, après nous avoir contactés, que vos droits ne sont pas
        respectés, vous pouvez introduire une réclamation auprès de la
        Commission Nationale de l'Informatique et des Libertés (CNIL), 3 place
        de Fontenoy, TSA 80715, 75334 Paris Cedex 07, téléphone 01 53 73 22 22,
        ou sur{" "}
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
        Cookies et traceurs
      </h2>
      <p className="leading-relaxed">
        Le site utilise exclusivement des cookies techniques strictement
        nécessaires à son fonctionnement (session, sécurité, préférences). Aucun
        cookie publicitaire, ni traceur tiers à des fins de mesure d'audience
        commerciale ou de profilage, n'est déposé sans votre consentement
        explicite.
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Modifications de la présente politique
      </h2>
      <p className="leading-relaxed">
        UNSAgglo se réserve le droit de modifier la présente politique de
        confidentialité pour l'adapter aux évolutions législatives,
        jurisprudentielles ou techniques. Toute modification substantielle sera
        portée à la connaissance des adhérents par courriel et signalée par un
        encart visible sur le site pendant 30 jours.
      </p>
    </article>
  </PageWrapper>
);

export default PrivacyPage;
