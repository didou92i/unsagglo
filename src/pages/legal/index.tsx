import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { Link } from "react-router-dom";

const LegalPage = (): JSX.Element => (
  <PageWrapper>
    <MetaTags
      title="Mentions légales"
      description="Mentions légales du site UNSAgglo — Libres Ensemble."
      noIndex
    />
    <article className="max-w-3xl mx-auto px-4 md:px-6 py-12 text-foreground">
      <h1 className="font-display text-3xl font-medium text-secondary mb-8">
        Mentions légales
      </h1>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Éditeur du site
      </h2>
      <p className="leading-relaxed">
        <strong>UNSAgglo — Libres Ensemble</strong>
        <br />
        Section syndicale affiliée à UNSA Territoriaux (Union Nationale des
        Syndicats Autonomes — Fédération des Territoriaux), rattachée à
        l'URTIF (Union Régionale Territoriaux Île-de-France).
      </p>
      <p className="leading-relaxed mt-3">
        <strong>Adresse</strong> : 32 rue de la Briqueterie, 95380 Louvres
        <br />
        <strong>Courriel</strong> :{" "}
        <a
          href="mailto:unsagglo@roissypaysdefrance.fr"
          className="text-primary underline"
        >
          unsagglo@roissypaysdefrance.fr
        </a>
        <br />
        <strong>Champ de représentation</strong> : agents de la Communauté
        d'Agglomération Roissy Pays de France (CARPF), Val-d'Oise (95) et
        Seine-et-Marne (77).
      </p>
      <p className="leading-relaxed mt-3">
        <strong>Directeur de la publication</strong> : Rhiad AZZABI, Secrétaire
        Général d'UNSAgglo.
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Hébergeur
      </h2>
      <p className="leading-relaxed">
        <strong>Lovable Labs AB</strong>
        <br />
        Box 190, 101 23 Stockholm, Suède
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

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Sous-traitants techniques
      </h2>
      <p className="leading-relaxed mb-3">
        Le site fait appel aux prestataires suivants pour son fonctionnement :
      </p>
      <ul className="list-disc list-inside space-y-2 leading-relaxed">
        <li>
          <strong>Lovable Labs AB</strong> — hébergement frontend (Suède, UE).
        </li>
        <li>
          <strong>Supabase Inc.</strong> — base de données et fonctions
          serveur. La région du projet est précisée dans la politique de
          confidentialité.
        </li>
      </ul>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Propriété intellectuelle
      </h2>
      <p className="leading-relaxed">
        L'ensemble des contenus (textes, fiches juridiques, charte graphique,
        logo) est la propriété d'UNSAgglo, à l'exception du logo UNSA
        Territoriaux (propriété de la fédération UNSA Territoriaux, utilisé
        dans le cadre de l'affiliation) et des éléments cités sous référence.
        Toute reproduction, représentation, modification ou diffusion, totale
        ou partielle, est subordonnée à l'autorisation préalable d'UNSAgglo,
        sauf usage légitime au sens de l'article L.122-5 du Code de la
        propriété intellectuelle.
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Crédits
      </h2>
      <p className="leading-relaxed">
        Site conçu et développé pour UNSAgglo. Iconographie : Lucide (licence
        ISC). Cartographie : OpenStreetMap (licence ODbL).
      </p>

      <h2 className="font-display text-xl font-medium text-secondary mt-8 mb-3">
        Loi applicable et juridiction
      </h2>
      <p className="leading-relaxed">
        Le présent site est soumis au droit français. En cas de litige, et
        après tentative de résolution amiable, le tribunal judiciaire de
        Pontoise est seul compétent.
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
