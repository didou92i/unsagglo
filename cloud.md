# Cloud UNSAgglo

Dernière mise à jour : 2026-05-10

Ce fichier sert de mémoire vivante pour finaliser le site UNSAgglo. Il doit garder une trace claire du contexte, des décisions, des évolutions réalisées, des points à vérifier et des prochaines priorités.

## Résumé du projet

UNSAgglo est le site du syndicat UNSA Roissy Pays de France. L'application couvre à la fois la vitrine publique, l'adhésion, les droits des agents, les élections professionnelles 2026, une plateforme participative, un simulateur d'aide carburant, l'espace membres et un back-office d'administration.

Objectif fonctionnel principal : offrir un outil public et administrable pour informer les agents, collecter des adhésions, recueillir des contributions, piloter les contenus et soutenir la campagne syndicale 2026.

## Stack et outils

- Frontend : React 18, TypeScript, Vite.
- UI : Tailwind CSS, shadcn-ui/Radix UI, lucide-react, composants locaux `UButton`, `UCard`, `UBadge`, `UInput`.
- Données et auth : Supabase, RLS, Edge Functions.
- Formulaires : react-hook-form, zod.
- Data fetching/cache : TanStack Query.
- PDF : jsPDF pour le bulletin d'adhésion.
- SEO : react-helmet-async, `MetaTags`, sitemap et robots dans `public`.
- Tests : Vitest + Testing Library, avec tests existants sur la logique du simulateur aide carburant.
- Déploiement attendu : Lovable / Vite, avec port local configuré sur `8080`.

Scripts utiles :

```bash
npm run dev
npm run build
npm run lint
npm run test
npm run preview
```

Note de contexte : le dépôt contient à la fois `package-lock.json`, `bun.lock` et `bun.lockb`. Avant d'installer ou mettre à jour des dépendances, décider quel gestionnaire de paquets devient la référence.

## État technique de référence

Dernière passe : 2026-05-10.

- Dépendances installées avec `npm install` à partir de `package-lock.json`.
- `npm run test -- --run` : OK, 5 fichiers de test, 23 tests passés.
- `npm run build` : OK, build Vite généré.
- `npm run lint` : OK, 0 erreur, 7 avertissements restants liés aux exports de composants UI shadcn (`react-refresh/only-export-components`).
- `npm audit --omit=dev` : 10 vulnérabilités production signalées, dont 7 hautes et 3 modérées. À traiter dans une passe dédiée de mise à jour dépendances.
- Avertissement build : base Browserslist/caniuse-lite âgée de 11 mois.

## Structure applicative

- `src/App.tsx` : définition des routes et lazy-loading des pages.
- `src/main.tsx` : montage React, providers Helmet et styles globaux.
- `src/pages/home` : accueil, logo, animation, aperçu actualités, CTA et droits.
- `src/pages/about` : présentation institutionnelle UNSAgglo, bureau syndical, objet, valeurs et affiliation.
- `src/pages/news` : liste, filtres, cartes et détail des articles.
- `src/pages/rights` : fiches droits, dont CITIS, avec contenu juridique désormais manuel.
- `src/pages/elections` : page campagne élections 2026.
- `src/pages/plateforme` : plateforme participative, assistant IA, mur public, sondages, campagnes et wizard de contribution.
- `src/pages/membership` : adhésion, validation, cotisation, génération du bulletin PDF.
- `src/pages/members` : espace membre protégé.
- `src/pages/aide-carburant` : page dispositif 50 €, simulateur d'éligibilité, captation e-mail, suivi tunnel.
- `src/pages/admin` : back-office pour captations, campagnes, contributions, adhérents, articles, documents, sondages, candidats, contact, stats et pages.
- `src/hooks` : accès Supabase et logique métier partagée.
- `src/components/layout` : navigation, menu mobile, footer, wrapper avec tracking des visites.
- `src/components/ui` : composants UI shadcn et composants UNSAgglo.
- `src/styles/tokens.css` et `src/index.css` : tokens de marque, couleurs, animations.
- `supabase/migrations` : schéma, RLS, fonctions SQL, vues publiques.
- `supabase/functions` : Edge Functions IA et veille.

## Routes principales

- `/` : accueil.
- `/qui-sommes-nous` : présentation institutionnelle UNSAgglo.
- `/news`, `/news/:slug` : actualités.
- `/rights`, `/rights/citis` : droits des agents. Les autres catégories restent visibles comme fiches en rédaction, mais ne sont pas indexées tant qu'elles ne sont pas publiées.
- `/elections` : élections 2026.
- `/plateforme` : contributions, mur public, sondages.
- `/adhesion` : adhésion.
- `/adhesion/confirmation` : confirmation d'adhésion.
- `/members` : espace membres protégé.
- `/aide-carburant` : dispositif et simulateur carburant.
- `/contact` : contact.
- `/admin/login`, `/admin`, `/admin/*` : administration.
- `/mentions-legales`, `/politique-confidentialite` : pages légales.

Les pages publiques sont pilotées par `site_settings` via `PageGuard`, la navigation et le footer.

Routes de compatibilité conservées en redirection :

- `/membership` -> `/adhesion`.
- `/membership/confirmation` -> `/adhesion/confirmation`.
- `/confirmation` -> `/adhesion/confirmation`.
- `/privacy` -> `/politique-confidentialite`.
- `/about` -> `/qui-sommes-nous`.

Routes volontairement non créées à ce stade :

- `/desinscription` : à créer seulement si une fonctionnalité de désinscription/newsletter existe.

## Lecture visuelle actuelle

Source : captures Lovable Preview fournies le 2026-05-10, principalement en affichage desktop.

Le site porte déjà une identité cohérente : un syndicat local, institutionnel mais moderne, qui se présente comme un outil concret pour les agents de la CARPF. Le sens général est clair : informer, rassurer, collecter des adhésions, faire participer les agents, préparer les élections professionnelles 2026 et accompagner les démarches pratiques.

Système visuel repéré :

- Navigation fixe bleu nuit, logo `UNSAgglo` à gauche, liens principaux centrés, CTA `Adhérer` et `Espace membres` à droite.
- Palette dominante : bleu nuit/violet institutionnel, cyan UNSA en accent principal, blanc et gris très clair pour les zones de contenu, orange pour les badges urgents ou datés.
- Titres très marqués en fonte condensée, avec hiérarchie forte et mots clés en cyan.
- Sections héro en grands aplats dégradés bleu nuit vers bleu, souvent associées à un CTA clair.
- Cartes blanches à bord supérieur coloré, icônes lucide, coins modérément arrondis, ombres légères.
- Formulaires sobres, centrés, avec grands champs blancs et boutons cyan.
- Accordéons FAQ minimalistes avec séparateurs fins.
- Footer sombre en dégradé, colonnes de liens et contact, cohérent avec les héros sombres.
- Motif territorial fort : fond illustré/aérien de Roissy Pays de France, logo rond et ancrage local.

Intention à préserver pendant les améliorations :

- rester sérieux, lisible et crédible pour des agents territoriaux ;
- garder le sentiment de proximité locale CARPF ;
- éviter de transformer le site en simple vitrine marketing ;
- maintenir la promesse de transparence, co-construction et accompagnement individuel ;
- distinguer clairement les contenus validés juridiquement des contenus provisoires ou en cours.

## Parcours observés dans les captures

- Accueil : expérience d'entrée visuelle, fond territorial clair, logo rond central, bouton `Entrer`.
- Actualités : grille de cartes filtrables (`Tous`, `Actualités`, `Tracts`, `CR CST`, `Fiches droits`) et recherche. Plusieurs articles semblent issus de la `Veille IA UNSAgglo`.
- Vos Droits : six fiches prévues, une seule disponible (`Maladie, accident, CITIS`), les autres en cours de rédaction et validation juridique.
- Élections 2026 : héro de campagne, badge `Décembre 2026`, compteur de jours, CTA vers la contribution au programme, axes `Co-construction`, `Transparence totale`, `100 % local`, `Modernes & accessibles`, puis modalités de vote CARPF.
- Plateforme : une version héro immersive `Construisons Ensemble` avec fond territorial, logo et CTA ; une version plus basse/état suivant montre le wizard participatif en 7 étapes.
- Aide carburant : page dispositif `Aide carburant 50 €`, bandeau de prudence sur le caractère préliminaire, chiffres clés, simulateur d'éligibilité, FAQ, CTA contact et footer.
- Adhésion : héro `Rejoignez UNSAgglo`, quatre raisons d'adhérer, bloc cotisation `9,99 € / mois`, formulaire long par sections, engagement RGPD/statuts et FAQ.
- Contact : formulaire de contact, consentement RGPD, carte de coordonnées et permanences.
- Auth : page `/auth/login` simple pour l'espace membres, avec lien d'adhésion.
- Footer : liens rapides, droits, contact, mentions légales, confidentialité et parfois liens `Qui sommes-nous` / `Newsletter` visibles selon capture.

## Supabase et données

Tables et vues importantes repérées :

- `site_settings` : activation/désactivation des pages visibles.
- `profiles`, `user_roles` : auth, rôles, vérification admin via RPC `has_role`.
- `adherents` : demandes d'adhésion enrichies, statut de traitement, consentements RGPD/statuts, coordonnées et situation professionnelle.
- `articles` : actualités, tracts, fiches droit.
- `contributions_elections` : contributions au programme, multi-thèmes, statut de traitement, boucle de retour.
- `public_contributions_feed` : vue publique filtrée pour le mur des contributions.
- `campaigns` : campagnes thématiques reliées aux contributions.
- `sondages`, `sondage_options`, `sondage_votes` : sondages participatifs.
- `candidats_liste` : volontaires pour rejoindre la liste.
- `contact_messages` : messages de contact.
- `captations_aide_carburant` : captations issues du simulateur carburant.
- `simulator_funnel_events` : événements de tunnel du simulateur.
- `page_visits` : statistiques de visites.
- `rights_content` : contenus droits publics.
- bucket `documents` : documents publics et administrables.

Variables d'environnement attendues d'après le code :

- Frontend : `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`.
- Edge Functions : `LOVABLE_API_KEY`, `PERPLEXITY_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.

Ne jamais consigner de secret réel dans ce fichier.

## Automatisations et IA

- `proposal-assistant` : assistant IA de reformulation des contributions via le gateway Lovable. Répond en français, format court, suggestions cliquables.
- `veille-generator` : veille syndicale via Perplexity + Lovable AI, création d'articles non publiés.
- `rights-generator` : endpoint neutralisé, retourne `410`, car les fiches juridiques doivent être rédigées et validées manuellement.
- Commentaire métier dans `useAdhesionSubmit.ts` : un workflow n8n externe est prévu sur insertion Supabase pour e-mail de bienvenue, notification UNSAgglo et registre Notion. Le formulaire d'adhésion principal utilise toutefois `AdhesionForm.tsx`, donc vérifier si ce hook est encore actif ou historique.

## Identité et contenu

- Organisation : `UNSAgglo — Roissy Pays de France`.
- Devise : `Libres Ensemble`.
- Adresse : `32 rue de la Briqueterie, 95380 Louvres`.
- E-mail public : `unsagglo@roissypaysdefrance.fr`.
- Affiliation : UNSA Territoriaux / URTIF.
- Cotisation actuelle : `9,99 €` mensuels, soit `119,88 €` annuels.
- RIB : à compléter dans `src/lib/orgInfo.ts` dès ouverture du compte bancaire.

## Sources de contenu disponibles

Le porteur du projet dispose d'un volume important d'archives. Si un contenu manque pour alimenter le site, enrichir une rubrique, documenter une fiche droit, publier une actualité, constituer une page campagne ou compléter une page institutionnelle, demander les éléments d'archive avant d'inventer ou de laisser un contenu générique.

Le livrable racine `UNSAgglo_contenu_site_v2.md` est la source de suivi éditoriale du plan P1/P2/P3. Il doit rester versionné dans le dépôt pour éviter les sorties de route.

Ces archives peuvent servir notamment à :

- documenter les fiches droits et les positions UNSAgglo ;
- alimenter les actualités, tracts et pages élections 2026 ;
- enrichir les pages adhésion, contact, plateforme participative et espace membres ;
- vérifier les formulations sensibles avant publication ;
- produire des contenus plus précis que les textes actuellement génériques.

## Points d'attention repérés

- `README.md` est encore le README générique Lovable avec `REPLACE_WITH_PROJECT_ID`.
- Le RIB UNSAgglo est volontairement vide dans `src/lib/orgInfo.ts`.
- `src/pages/membership/sitesCARPF.ts` mentionne une liste de sites CARPF à compléter/vérifier.
- Certains libellés visibles sont sans accents (`Actualites`, `Adherer`, `Adherents`) : arbitrer entre contrainte technique, cohérence SEO et finition éditoriale.
- `useAdhesionSubmit.ts` semble potentiellement ancien par rapport au nouveau formulaire complet `AdhesionForm.tsx`.
- La veille IA peut générer des brouillons, mais toute publication devrait rester validée humainement.
- Le tracking `usePageVisits` insère une visite à chaque page wrappée par `PageWrapper`; vérifier le niveau de bruit souhaité en production.
- Les migrations Supabase contiennent plusieurs vagues de création/refonte de tables similaires, notamment captations et campagnes. Prudence avant toute migration supplémentaire.
- Coordonnées publiques : source de vérité `src/lib/orgInfo.ts`, siège social UNSAgglo `32 rue de la Briqueterie, 95380 Louvres`. L'ancienne adresse CARPF vue dans les captures ne doit pas être utilisée comme adresse du syndicat.
- La suggestion de route Lovable `/desinscription` n'est pas ouverte dans l'application. La conserver comme piste future tant qu'aucune fonctionnalité de désinscription/newsletter n'est validée.
- Certaines captures montrent de grands blancs verticaux sur les pages formulaire/FAQ. Vérifier sur desktop et mobile si c'est un choix de respiration ou un problème d'espacement.
- La navigation desktop est riche et contient plusieurs badges (`Dec. 2026`, `50 €`). Tester en largeur intermédiaire/tablette pour éviter les chevauchements.
- Les blocs gris dans certaines sections sombres, notamment les étapes de l'aide carburant, peuvent manquer de contraste perçu. À vérifier visuellement avant finalisation.
- `npm audit --omit=dev` signale des vulnérabilités production dans plusieurs dépendances, notamment `react-router-dom`/`react-router`, `lodash`, `postcss`, `glob`, `minimatch`, `picomatch` et `yaml`. Ne pas lancer `npm audit fix` sans vérifier l'impact fonctionnel.

## Backlog initial proposé

1. Personnaliser le `README.md` avec le vrai contexte UNSAgglo, installation, variables d'environnement, scripts et déploiement.
2. Lancer une passe de build/lint/tests pour établir un état de référence technique.
3. Vérifier les parcours critiques : accueil, adhésion, contribution, aide carburant, contact, admin.
4. Compléter les données métier manquantes : RIB, sites CARPF, permanences, pages légales si besoin.
5. Harmoniser les libellés et accents de navigation/footer/admin.
6. Surveiller que tous les nouveaux liens d'adhésion utilisent l'URL canonique `/adhesion`.
7. Clarifier le gestionnaire de paquets de référence : npm ou bun.
8. Auditer les Edge Functions IA et les coûts/quotas avant mise en production.
9. Vérifier les politiques RLS sur les données sensibles : adhérents, captations, candidats, contacts.
10. Élargir les tests autour des formulaires et hooks critiques.
11. Formaliser une mini charte UI à partir de l'existant : couleurs, titres, boutons, cartes, héros, footer, règles d'espacement.
12. Aligner les coordonnées publiques entre contact, mentions légales, footer, PDF d'adhésion et `ORG_INFO`.
13. Décider plus tard si la route visible dans Lovable mais absente du routeur (`/desinscription`) devient une vraie page.
14. Traiter l'audit npm dans une branche dédiée : mise à jour dépendances, vérification React Router, tests, build et parcours critiques.

## Journal des évolutions

### 2026-05-10 — Création de la mémoire projet

Contexte :
- Prise de connaissance initiale du dépôt.
- Worktree propre avant création de `cloud.md` sur `main...origin/main`.
- Dépôt distant : `https://github.com/didou92i/unsagglo.git`.
- Derniers commits orientés correction CITIS et ajustements membership.

Évolution :
- Création de `cloud.md` à la racine du projet.
- Synthèse du contexte fonctionnel, technique et Supabase.
- Ajout d'un backlog initial de finalisation.

Fichiers créés :
- `cloud.md`

Vérification :
- `sed -n '1,260p' cloud.md` : relecture du fichier créé.
- `git status --short --branch` : `cloud.md` apparaît comme nouveau fichier non suivi.
- `git diff --check` : aucune erreur de whitespace sur les fichiers suivis.
- `git diff --no-index --check /dev/null cloud.md` : sortie vide, aucune alerte whitespace sur le nouveau fichier.
- Tests applicatifs non lancés : changement documentaire uniquement.

### 2026-05-10 — Ajout du contexte archives

Contexte :
- Le porteur du projet indique disposer d'un volume important d'archives exploitables.

Évolution :
- Ajout d'une section `Sources de contenu disponibles` pour rappeler que les archives doivent être sollicitées lorsqu'un contenu manque.

Fichiers touchés :
- `cloud.md`

Vérification :
- `sed -n '95,190p' cloud.md` : relecture de la section ajoutée et du journal.
- `git diff --no-index --check /dev/null cloud.md` : sortie vide, aucune alerte whitespace sur le nouveau fichier.
- Tests applicatifs non lancés : changement documentaire uniquement.

### 2026-05-10 — Ajout de la lecture visuelle

Contexte :
- Le porteur du projet fournit une série de captures Lovable Preview montrant l'apparence actuelle du site.

Évolution :
- Ajout d'une section `Lecture visuelle actuelle`.
- Ajout d'une section `Parcours observés dans les captures`.
- Ajout de points d'attention visuels et éditoriaux : coordonnées incohérentes, routes suggérées non confirmées, espacements, navigation, contraste.
- Extension du backlog avec la charte UI, l'alignement des coordonnées et la clarification des routes.

Fichiers touchés :
- `cloud.md`

Vérification :
- `sed -n '55,185p' cloud.md` : relecture des sections `Lecture visuelle actuelle` et `Parcours observés dans les captures`.
- `sed -n '150,250p' cloud.md` : relecture des points d'attention, du backlog et du journal.
- `git diff --no-index --check /dev/null cloud.md` : sortie vide, aucune alerte whitespace sur le nouveau fichier.
- Tests applicatifs non lancés : changement documentaire uniquement.

### 2026-05-10 — État de référence et lint débloqué

Contexte :
- Début des améliorations par une passe technique de référence.
- Les premières commandes échouaient car `node_modules` était absent.

Évolution :
- Installation des dépendances avec `npm install`.
- Correction des 5 erreurs ESLint bloquantes.
- Conservation du BOM CSV via `\uFEFF` au lieu d'un caractère invisible.
- Remplacement de deux interfaces vides par des alias de type.
- Passage du plugin Tailwind `tailwindcss-animate` en import ESM.
- Correction du compteur de jours élections pour satisfaire `react-hooks/exhaustive-deps`.
- Remplacement d'un `let` inutile par `const` dans le générateur PDF aide carburant.

Fichiers touchés :
- `src/components/ui/command.tsx`
- `src/components/ui/textarea.tsx`
- `src/pages/admin/captations/csvExport.ts`
- `src/pages/aide-carburant/simulator/pdfGenerator.ts`
- `src/pages/elections/Hero.tsx`
- `tailwind.config.ts`
- `cloud.md`

Vérification :
- `npm run test` : 2 fichiers, 16 tests passés.
- `npm run lint` : 0 erreur, 7 avertissements restants liés aux exports shadcn/fast-refresh.
- `npm run build` : build Vite OK.
- `npm audit --omit=dev` : 10 vulnérabilités production signalées, à traiter séparément.

Suite :
- Ne pas considérer les vulnérabilités npm comme résolues.
- Décider si les avertissements fast-refresh des composants shadcn doivent être corrigés ou tolérés.

### 2026-05-10 — Arborescence canonique

Contexte :
- Audit demandé pour supprimer doublons et redondances dans l'arborescence publique.

Évolution :
- Définition de `/adhesion` comme URL canonique de l'adhésion.
- Ajout de `/adhesion/confirmation` comme URL canonique de confirmation.
- Redirection de compatibilité depuis `/membership`, `/membership/confirmation` et `/confirmation`.
- Redirection de compatibilité depuis `/privacy` vers `/politique-confidentialite`.
- Mise à jour des liens internes d'adhésion pour pointer vers `/adhesion`.
- Mise à jour de `MetaTags` pour générer une canonical par défaut basée sur la route courante.
- Nettoyage de `public/sitemap.xml` : retrait des fiches droits non publiées, ajout de `/plateforme`, `/aide-carburant`, `/adhesion` et `/politique-confidentialite`.
- Mise à jour de `public/llm.html` pour référencer `/adhesion` et la cotisation actuelle.

Fichiers touchés :
- `src/App.tsx`
- `src/components/seo/MetaTags.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/MobileMenu.tsx`
- `src/components/layout/Footer.tsx`
- `src/pages/home/HomeCTA.tsx`
- `src/pages/auth/login/index.tsx`
- `src/pages/membership/AdhesionForm.tsx`
- `src/pages/membership/ConfirmationPage.tsx`
- `src/pages/admin/PagesManager.tsx`
- `public/sitemap.xml`
- `public/llm.html`
- `cloud.md`

Vérification :
- Script local de contrôle des liens statiques : 25 routes déclarées, 52 références statiques, 0 lien interne manquant.
- `rg` sur `/membership` et `/privacy` : seules les routes de redirection et imports de dossier restent.
- `npm run test` : 2 fichiers, 16 tests passés.
- `npm run lint` : 0 erreur, 7 avertissements shadcn/fast-refresh restants.
- `npm run build` : build Vite OK.

Suite :
- Ne pas indexer les futures fiches droits tant que `published` n'est pas `true`.
- Créer `/qui-sommes-nous`, `/about` ou `/desinscription` uniquement après validation du besoin et du contenu.

### 2026-05-10 — P1 sécurisation juridique

Objectif :
- Intégrer la priorité P1 du livrable `UNSAgglo_contenu_site_v2.md` avant publication publique.

Évolution :
- Remplacement des contenus de `/mentions-legales` et `/politique-confidentialite` par les versions consolidées du livrable v2.
- Centralisation de l'identité légale dans `src/lib/orgInfo.ts` : syndicat professionnel, constitution du 9 janvier 2026, siège social, affiliation, directeur de publication.
- Correction de `/contact` pour afficher le siège social UNSAgglo à Louvres et ajouter la mention de confidentialité.
- Ajout d'un bandeau réutilisable de transparence électorale sur l'accueil, `/elections` et `/plateforme`.
- Correction de `public/llm.html` : périmètre CARPF uniquement, retrait DDT/DRIHL, qualification comme syndicat professionnel constitué.

Fichiers touchés :
- `src/lib/orgInfo.ts`
- `src/pages/legal/index.tsx`
- `src/pages/legal/PrivacyPage.tsx`
- `src/pages/contact/index.tsx`
- `src/components/sections/ElectoralTransparencyBanner.tsx`
- `src/pages/home/index.tsx`
- `src/pages/elections/index.tsx`
- `src/pages/elections/HowToVote.tsx`
- `src/pages/elections/WhyUnsagglo.tsx`
- `src/pages/membership/index.tsx`
- `src/pages/plateforme/ContribSection.tsx`
- `src/pages/plateforme/wall/ContributionsWall.tsx`
- `src/test/p1LegalContent.test.ts`
- `public/llm.html`
- `cloud.md`

Décisions :
- `/privacy` reste une redirection de compatibilité vers `/politique-confidentialite`.
- Les éléments P2/P3 du livrable restent hors de cette passe.

Vérification :
- Test TDD `src/test/p1LegalContent.test.ts` ajouté : rouge avant correction, vert après correction.
- Validations complètes à relancer avant push.

Suite :
- Traiter ensuite P2 : page `Qui sommes-nous`, FAQ adhésion, espace membres et sélecteur contact enrichi.

### 2026-05-10 — P2 contenus publics

Objectif :
- Intégrer la première tranche P2 sans migration Supabase : mieux présenter le syndicat, clarifier l'adhésion et rendre le formulaire contact plus exploitable.

Évolution :
- Création de `/qui-sommes-nous` avec présentation institutionnelle, bureau syndical, objet, valeurs et affiliation UNSA Territoriaux / URTIF.
- Redirection de compatibilité `/about` vers `/qui-sommes-nous`.
- Ajout de la page dans la navigation, le footer, le sitemap et `public/llm.html`.
- Ajout d'une FAQ détaillée sur `/adhesion`.
- Remplacement du sélecteur d'objet contact par une liste structurée couvrant accompagnement individuel, droits, adhésion, élections, programme et demandes institutionnelles.

Fichiers touchés :
- `src/pages/about/index.tsx`
- `src/App.tsx`
- `src/components/layout/useNavbar.ts`
- `src/components/layout/Footer.tsx`
- `src/pages/membership/index.tsx`
- `src/pages/contact/contactOptions.ts`
- `src/pages/contact/ContactForm.tsx`
- `src/pages/contact/useContact.ts`
- `src/pages/admin/ContactManager.tsx`
- `src/test/p2PublicContent.test.ts`
- `public/sitemap.xml`
- `public/llm.html`
- `cloud.md`

Décisions :
- `/qui-sommes-nous` devient la page canonique.
- `/about` reste une redirection de compatibilité et n'est pas indexée.
- Le RIB et les enrichissements espace membres restent hors de cette tranche.

Vérification :
- Test TDD `src/test/p2PublicContent.test.ts` ajouté : rouge avant correction, vert après intégration.
- `npm run lint` : OK, 0 erreur, 7 avertissements shadcn/fast-refresh déjà connus.
- `npm run test -- --run` : OK, 4 fichiers, 21 tests passés.
- `npm run build` : OK, build Vite généré.
- Audit statique des liens internes : 27 routes déclarées, 43 références contrôlées, 0 lien manquant.
- Recherche anti-régression publique : aucune occurrence de `6 bis avenue Charles de Gaulle`, `DDT`, `DRIHL` ou anciennes formulations électorales trompeuses dans `src` et `public`.
- Vérification locale via Vite : `/`, `/qui-sommes-nous`, `/about`, `/adhesion`, `/contact`, `/elections`, `/plateforme`, `/mentions-legales` et `/politique-confidentialite` répondent en 200.

Suite :
- Compléter plus tard le RIB et les contenus droits restants avec les archives disponibles.

### 2026-05-10 — P2 espace adhérent

Objectif :
- Finaliser la partie P2 du livrable v2 consacrée à `/members`, sans migration Supabase.

Évolution :
- Ajout du livrable `UNSAgglo_contenu_site_v2.md` à la racine comme source de suivi versionnée.
- Refonte de l'espace adhérent avec un bandeau de bienvenue, des services d'accompagnement et des accès rapides.
- Ajout des entrées : permanence, plateforme participative, veille juridique, accompagnement disciplinaire, CITIS, RPS et documentation utile.
- Ajout d'un bloc confidentialité rappelant que les échanges restent strictement confidentiels et ne sont pas transmis à la direction sans accord écrit.
- Conservation du profil adhérent existant et de la liste des documents Supabase existante.

Fichiers touchés :
- `UNSAgglo_contenu_site_v2.md`
- `src/pages/members/index.tsx`
- `src/test/p2MembersContent.test.ts`
- `cloud.md`

Décisions :
- Pas de nouvelle table Supabase pour cette tranche.
- Les boutons d'action s'appuient sur les routes existantes ou sur des liens mailto vers l'adresse UNSAgglo.

Vérification :
- Test TDD `src/test/p2MembersContent.test.ts` ajouté : rouge avant correction, vert après intégration.
- `npm run lint` : OK, 0 erreur, 7 avertissements shadcn/fast-refresh déjà connus.
- `npm run test -- --run` : OK, 5 fichiers, 23 tests passés.
- `npm run build` : OK, build Vite généré.
- Audit statique des liens internes : 27 routes déclarées, 43 références contrôlées, 0 lien manquant.
- Recherche anti-régression publique : aucune occurrence de `6 bis avenue Charles de Gaulle`, `DDT`, `DRIHL` ou anciennes formulations électorales trompeuses dans `src` et `public`.

Suite :
- Passer ensuite à la P3 du livrable : fiche CITIS détaillée, ligne éditoriale actualités, puis corrections branding.

## Convention pour les prochaines entrées

Copier ce modèle à chaque intervention significative :

```markdown
### YYYY-MM-DD — Titre court

Objectif :
- Pourquoi on modifie le projet.

Évolution :
- Ce qui a changé concrètement.

Fichiers touchés :
- `chemin/du/fichier`

Décisions :
- Choix structurants ou arbitrages.

Vérification :
- Commandes lancées et résultat.

Suite :
- Ce qui reste à faire.
```
