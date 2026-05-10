import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { Link } from "react-router-dom";
import { ORG_INFO, orgAddressLine } from "@/lib/orgInfo";

const LegalPage = (): JSX.Element => (
  <PageWrapper>
    <MetaTags
      title="Mentions légales"
      description="Mentions légales du site UNSAgglo — Roissy Pays de France."
    />
    <article className="max-w-3xl mx-auto px-4 md:px-6 py-12 text-foreground">
      <h1 className="font-display text-3xl font-medium text-secondary mb-2">
        Mentions légales
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        Dernière mise à jour : 10 mai 2026
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Éditeur du site
      </h2>
      <p className="leading-relaxed">
        <strong>{ORG_INFO.nom}</strong>
        <br />
        {ORG_INFO.nature} régi par la loi du 21 mars 1884 et le Code du
        travail.
        <br />
        {ORG_INFO.constitution}.
        <br />
        {ORG_INFO.statuts}.
      </p>
      <p className="leading-relaxed mt-3">
        <strong>Siège social</strong> : {orgAddressLine()}
        <br />
        <strong>Email</strong> :{" "}
        <a
          href={`mailto:${ORG_INFO.email}`}
          className="text-primary underline"
        >
          {ORG_INFO.email}
        </a>
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Directeur de la publication
      </h2>
      <p className="leading-relaxed">
        {ORG_INFO.directeurPublication}, Secrétaire général d'UNSAgglo.
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Hébergeur du site
      </h2>
      <p className="leading-relaxed">
        <strong>Lovable Labs AB</strong> — hébergement frontend.
        <br />
        Société immatriculée en Suède.
        <br />
        Site :{" "}
        <a
          href="https://lovable.dev"
          className="text-primary underline"
          target="_blank"
          rel="noreferrer"
        >
          lovable.dev
        </a>
      </p>
      <p className="leading-relaxed mt-3">
        <strong>Supabase</strong> — hébergement backend et base de données.
        <br />
        Données stockées sur l'infrastructure européenne, région Francfort,
        Allemagne.
        <br />
        Site :{" "}
        <a
          href="https://supabase.com"
          className="text-primary underline"
          target="_blank"
          rel="noreferrer"
        >
          supabase.com
        </a>
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Conception et développement
      </h2>
      <p className="leading-relaxed">
        Site conçu et développé pour le compte d'UNSAgglo. L'ensemble des
        contenus éditoriaux relève de la responsabilité du Secrétaire général.
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Propriété intellectuelle
      </h2>
      <p className="leading-relaxed">
        L'ensemble des contenus du site (textes, logos, graphismes,
        photographies, vidéos, code source) est protégé par le droit de la
        propriété intellectuelle. Toute reproduction, représentation,
        modification, publication ou adaptation, totale ou partielle, sans
        autorisation écrite préalable d'UNSAgglo est interdite, sous réserve
        des exceptions prévues par la loi.
      </p>
      <p className="leading-relaxed mt-3">
        Le sigle « UNSA », le logo « UNSA Territoriaux » et les éléments
        graphiques associés sont la propriété de l'Union Nationale des
        Syndicats Autonomes et de ses entités affiliées. Leur usage est régi
        par la charte graphique UNSA.
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Liens hypertextes
      </h2>
      <p className="leading-relaxed">
        Le site peut contenir des liens vers des sites tiers (Légifrance,
        services publics, organisations syndicales, presse). UNSAgglo n'exerce
        aucun contrôle sur ces sites et décline toute responsabilité quant à
        leur contenu.
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Limitation de responsabilité
      </h2>
      <p className="leading-relaxed">
        Les informations diffusées sur le site sont fournies à titre indicatif.
        UNSAgglo s'efforce d'en garantir l'exactitude et la mise à jour, mais
        ne peut être tenu responsable des erreurs ou omissions, ni des
        conséquences d'une utilisation erronée ou d'une interprétation
        personnelle. Toute situation individuelle doit être vérifiée avec un
        membre du bureau ou un professionnel du droit.
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Loi applicable et juridictions compétentes
      </h2>
      <p className="leading-relaxed">
        Les présentes mentions sont régies par le droit français. Tout litige
        relatif à l'utilisation du site relève de la compétence exclusive des
        juridictions françaises.
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Contact
      </h2>
      <p className="leading-relaxed">
        Pour toute question relative aux présentes mentions ou au fonctionnement
        du site, écrire à{" "}
        <a
          href={`mailto:${ORG_INFO.email}`}
          className="text-primary underline"
        >
          {ORG_INFO.email}
        </a>
        .
      </p>

      <p className="mt-10 text-sm text-muted-foreground">
        Voir aussi :{" "}
        <Link
          to="/politique-confidentialite"
          className="text-primary underline"
        >
          Politique de confidentialité
        </Link>
      </p>
    </article>
  </PageWrapper>
);

export default LegalPage;
