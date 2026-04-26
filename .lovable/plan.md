## Audit complet UNSAgglo — état vérifié en lecture seule

Périmètre contrôlé : migrations présentes dans le repo, état réel de la base Lovable Cloud, tables/RLS/indexes, RPC, fonctions backend, routing, pages clés, formulaire d’adhésion, admin, conformité graphique/éditoriale, TypeScript et tests.

Limite de l’audit : je suis en mode lecture seule. Je peux diagnostiquer précisément, mais les correctifs listés en P0/P1 devront être appliqués après approbation.

---

## 1. Base de données Lovable Cloud

### A. Migrations appliquées

- KO — Les migrations récentes attendues ne sont pas jouées en production.
  - Dans le repo, les fichiers existent :
    - `20260426120000_adhesion_v2_enrichment.sql`
    - `20260426130000_adhesion_v2_retraite.sql`
    - `20260427100000_adhesion_v2_retraite_fix.sql`
    - `20260427120000_adhesion_service_libre.sql`
    - migrations plateforme/campaigns des 25/04
  - Dans `supabase_migrations.schema_migrations`, la production s’arrête à `20260424064659`.
  - Diagnostic : la base réelle n’a pas reçu les vagues S1 1C / adhésion v2 / plateforme refit / campaigns.
  - Correctif proposé : appliquer une migration de rattrapage idempotente qui reprend les changements manquants et sécurise les contraintes existantes.

### B. Table `adherents`

- KO — Les 23 colonnes attendues ne sont pas présentes en production.
  - Colonnes réelles : `id`, `email`, `nom`, `prenom`, `service`, `grade`, `telephone`, `statut`, `created_at`.
  - Manquent notamment : `date_naissance`, `adresse_ligne1`, `adresse_ligne2`, `adresse_cp`, `adresse_ville`, `service_libre`, `categorie`, `echelon`, `statut_pro`, `site_affectation`, `date_entree_carpf`, `mode_paiement`, `periodicite_paiement`, `rgpd_consent_at`, `statuts_acceptes_at`, `updated_at`.
  - Impact : le formulaire d’adhésion refondu ne peut pas insérer ses données en production.

- KO — Contrainte `statut_pro` absente en production.
  - La colonne `statut_pro` n’existe pas encore.
  - Impact : le statut `retraite` ne peut pas être inséré, non pas à cause de la CHECK legacy, mais parce que toute la refonte adhésion v2 manque.

- KO — Contrainte `statut` encore legacy.
  - Réel : `CHECK (statut IN ('actif', 'en_attente', 'resilie'))`.
  - Attendu : `pending_validation`, `actif`, `resilie`.
  - Le code front insère `pending_validation`, donc l’insert échouera avec une violation CHECK (`23514`).

- KO — RLS INSERT trop permissive et pas conforme au besoin RGPD.
  - Réel : `Public adhesion insert WITH CHECK (true)`.
  - Attendu : insertion publique uniquement si consentements horodatés non nulls.
  - Correctif : mettre à jour la policy INSERT avec `rgpd_consent_at IS NOT NULL AND statuts_acceptes_at IS NOT NULL`, après ajout des colonnes.

- OK — RLS admin SELECT/UPDATE existe.
  - Policies admin basées sur `has_role(auth.uid(), 'admin')`.

### C. Autres tables métier

- OK — Tables réellement présentes et utilisées actuellement :
  - `articles`
  - `sondages`
  - `sondage_options`
  - `sondage_votes`
  - `contributions_elections`
  - `captations_aide_carburant`
  - `contact_messages`
  - `candidats_liste`
  - `page_visits`
  - `site_settings`
  - `rights_content`
  - `profiles`
  - `user_roles`
  - `simulator_funnel_events`
  - vue `simulator_funnel_stats`

- KO — Tables demandées mais absentes sous ces noms :
  - `aide_carburant_simulations`
  - `contributions`
  - `themes`
  - `campaigns`
  - `pages`
  - `sondage_responses`
  - `captations`
  - `contacts`
  - `candidats`
  - `documents`
  - `visits`
  - `admins`
  - `public_contributions_feed`

- Nuance importante : plusieurs noms demandés semblent correspondre à des noms applicatifs différents déjà existants :
  - `contacts` → `contact_messages`
  - `candidats` → `candidats_liste`
  - `visits` → `page_visits`
  - `captations` → `captations_aide_carburant`
  - `contributions` → `contributions_elections`
  - `pages` → `site_settings`
  - `documents` → bucket Storage public `documents`, pas table SQL

- KO — `campaigns` et `public_contributions_feed` sont utilisés par le code/types, mais absents de la base réelle.
  - Le repo contient les migrations `campaigns` et `public_contributions_feed`, mais elles ne sont pas appliquées.
  - Impact : `/plateforme` et l’admin campagnes risquent des erreurs runtime.

- OK — Captation aide carburant : table, RLS et indexes présents.
  - `captations_aide_carburant` existe.
  - Indexes `email` et `created_at DESC` présents.
  - RLS admin SELECT/UPDATE/DELETE uniquement, pas d’INSERT client direct.

- OK — Funnel simulateur : table, RLS et indexes présents.
  - `simulator_funnel_events` existe.
  - INSERT public autorisé.
  - SELECT admin uniquement.
  - Indexes `session_id` et `created_at DESC` présents.

- À surveiller — Indexes `created_at DESC` pas généralisés.
  - Ils existent sur captations/funnel.
  - Ils manquent sur plusieurs tables listées comme métier (`articles`, `contact_messages`, `contributions_elections`, `candidats_liste`, `page_visits`, etc.).
  - Correctif P1 : ajouter les indexes de tri admin les plus utilisés.

### D. Fonctions SECURITY DEFINER / RPC

- OK — RPC aide carburant présentes :
  - `capture_aide_carburant_email`
  - `mark_aide_carburant_pdf_downloaded`

- OK — `has_role`, `vote_sondage`, `get_visit_stats` présents.

- KO — `get_active_campaign` absent en production.
  - Le code l’appelle via `useActiveCampaign`.
  - La migration existe dans le repo mais n’est pas appliquée.

- À surveiller — Grants EXECUTE trop larges.
  - Toutes les fonctions publiques ont `EXECUTE` accordé à `PUBLIC`.
  - `capture_aide_carburant_email`, `mark_aide_carburant_pdf_downloaded`, `vote_sondage`, `get_visit_stats`, `has_role` sont exposées publiquement.
  - Certaines expositions sont voulues côté front, mais il faut restreindre explicitement ce qui n’est pas nécessaire, idéalement `REVOKE EXECUTE FROM PUBLIC` puis `GRANT` ciblé à `anon`/`authenticated`.

- OK — Pas de RPC détectée exposant directement des listes sensibles aux non-admins.
  - Les lectures sensibles restent protégées par RLS/admin.

- À surveiller — Linter sécurité : 25 warnings.
  - Plusieurs policies `WITH CHECK (true)` sur inserts publics.
  - Bucket public listable.
  - Objets publics visibles via introspection GraphQL.
  - Pas nécessairement bloquant, mais à durcir.

---

## 2. Fonctions backend / services

- OK — Fonctions présentes dans le repo :
  - `proposal-assistant`
  - `veille-generator`
  - `rights-generator`

- À vérifier — Parité “déployé = repo”.
  - Je peux lire le code et les logs, mais pas prouver la parité exacte de déploiement sans redéployer ou comparer les checksums côté plateforme.

- OK — Secrets nécessaires présents :
  - `LOVABLE_API_KEY`
  - `PERPLEXITY_API_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `SUPABASE_URL`
  - clés publiques backend

- À surveiller — Pas de secrets Resend/Stripe détectés.
  - Aucun code actuel ne semble exiger Resend ou Stripe en production.
  - Si l’adhésion doit envoyer des emails transactionnels ou paiement Stripe, ce n’est pas branché.

- OK — CORS configuré sur les fonctions.
  - `proposal-assistant` et `veille-generator` incluent les headers modernes nécessaires.
  - `rights-generator` est un stub 410, CORS minimal mais suffisant pour son état neutralisé.

- OK — Logs fonctions backend : pas d’erreurs récurrentes trouvées sur les dernières 24h.
  - Logs vides pour les 3 fonctions.
  - Logs edge globaux 24h : aucune entrée remontée.

- À surveiller — `rights-generator` est encore présent mais neutralisé.
  - C’est cohérent si volontaire.
  - Peut être supprimé plus tard si aucun appel résiduel.

---

## 3. Routing / pages

### Routes attendues

- OK — `/` existe et lazy-load `Home`.
- OK — `/elections` existe.
- OK — `/aide-carburant` existe.
- OK — `/plateforme` existe.
- KO — `/adhesion` n’existe pas.
  - Route réelle : `/membership`.
  - Correctif : ajouter alias `/adhesion` vers la page d’adhésion, ou renommer proprement la route.

- KO — `/confirmation` n’existe pas.
  - Route réelle : `/membership/confirmation`.
  - Correctif : ajouter alias `/confirmation` si c’est l’URL attendue.

- KO — `/privacy` n’existe pas.
  - Route réelle : `/politique-confidentialite`.
  - Correctif : ajouter alias `/privacy` si requis.

- KO — `/admin/*` n’existe pas.
  - Route réelle : `/admin` uniquement.
  - Correctif : si URLs profondes attendues, ajouter routing enfant ou fallback admin.

- OK — 404 fallback présent.

### MetaTags / SEO

- OK — `MetaTags` présent sur les pages principales auditées : Home, Elections, Aide Carburant, Plateforme, Membership, Confirmation, Privacy, Admin, Auth, News, Contact, Rights, 404.

- KO — JSON-LD FAQ sur `/elections` absent.
  - `/aide-carburant` a bien un schema `FAQPage`.
  - `/elections` n’injecte pas de schema FAQ.
  - Correctif : créer une FAQ élections ou injecter le JSON-LD correspondant.

- KO — Erreurs/warnings console au chargement initial connus.
  - Warning React : refs passées à des function components.
  - Source : `MembershipPage` → `AdhesionForm`, et `AdhesionForm` → `UButton`.
  - Diagnostic : `AdhesionForm` n’est pas `forwardRef`, et `UButton` non plus, alors qu’ils reçoivent/reforwardent probablement des refs via wrapper/router/UI.
  - Correctif : convertir `UButton` et, si nécessaire, `AdhesionForm` en `forwardRef` ou supprimer la ref côté appelant.

---

## 4. Formulaire d’adhésion

- OK — Le select service utilise bien des `optgroup`.
  - 6 groupes présents dans `SERVICE_GROUPS`.

- OK — “Autre service” affiche un champ libre.
  - Condition : `watch("service") === "autre_service"`.

- OK — `service_libre` obligatoire via `zod.superRefine` si `autre_service`.

- OK côté code — Si autre service non sélectionné, `service_libre` envoyé à `null`.

- KO en production — L’insert ne peut pas fonctionner avec le schéma actuel.
  - Le front insère des colonnes absentes de la table réelle.
  - Le front insère `statut: "pending_validation"`, refusé par la CHECK actuelle.

- KO — `statut_pro = retraite` sélectionnable côté front, mais non opérationnel en production.
  - Cause : migrations adhésion v2 non appliquées.

- OK côté code — RGPD et acceptation statuts sont envoyés comme timestamps ISO (`now`), pas booléens.

- KO — Lien `/statuts.pdf` pointe vers un fichier absent.
  - `public/statuts.pdf` n’existe pas.
  - Correctif : ajouter le fichier PDF ou modifier le lien.

- OK — Toast d’erreur clair si insert KO.
  - Cas `23505`, `23514`, `23502`, fallback générique.

- OK côté code — PDF bulletin utilise `jsPDF`, police `helvetica`, accents/€ via WinAnsi.

- OK côté code — `service_libre` rendu dans le PDF si `autre_service`.

- KO — Build TypeScript actuellement signalé par l’environnement comme cassé sur 4 points.
  - `AdhesionForm.tsx` lignes ~600 et ~636 : `boolean` non assignable à `true` pour les champs Zod littéraux.
  - `ContributionsWall.tsx` : import `STATUS_META` inutilisé.
  - `usePublicContributions.ts` : `action_unsagglo` manquant dans l’objet sanitizé.
  - Correctif : typer proprement les consentements dans React Hook Form, retirer l’import inutilisé, ajouter `action_unsagglo` dans `sanitize`.

- À noter — Une exécution locale `bunx tsc --noEmit` lancée pendant l’audit est sortie sans erreur, mais l’environnement a malgré tout remonté ces build errors comme état post-édition. Je les considère P0 car ils sont explicitement signalés par la plateforme.

---

## 5. Admin `/admin/adherents`

- À surveiller — Auth gate en deux niveaux.
  - `AdminProtectedRoute` bloque seulement les non-connectés.
  - `AdminPage` vérifie ensuite `isAdmin` via `has_role` et redirige `/`.
  - Fonctionnel, mais l’app charge le composant admin avant décision finale.

- OK — Tableau 7 colonnes :
  - Adhérent
  - Email
  - Catégorie
  - Service
  - Reçue le
  - Statut
  - Actions

- OK — Filtres service + statut présents.
  - Libellé `Résilié` avec accent.

- OK — Actions conditionnelles présentes :
  - `pending_validation` → Valider / Refuser
  - `actif` → Résilier
  - `resilie` → Réactiver
  - Détail sur toutes les lignes

- OK — Modale détail avec 5 sections :
  - Identité civile
  - Coordonnées
  - Situation professionnelle
  - Cotisation
  - Traçabilité

- OK côté code — Affichage `Autre : <texte libre>` si `service === autre_service`.

- OK — Export CSV inclut 18+ colonnes avec RGPD/statuts timestamps.

- OK — Toasts statuts cohérents : validé / résilié / remis en attente.

- KO en production — Tout ce module adhérents est partiellement inutilisable tant que la table réelle n’a pas les colonnes v2.
  - `useAdminAdherents` lit `*`, mais les champs v2 seront absents/null au runtime.
  - Les updates de statut vers `pending_validation` peuvent échouer avec la contrainte legacy.

- KO — Onglet admin libellé `Adherents` sans accent.
  - Correctif qualité : `Adhérents`.

---

## 6. Charte graphique

- OK — Tokens couleurs présents :
  - marine `#29235c`
  - blue UNSA `#009fe3`
  - red UNSA `#e74124`

- KO — Règle “zéro inline styles” non respectée.
  - Plusieurs pages/composants utilisent `style={{ ... }}` : élections, confirmation adhésion, aide carburant, plateforme, UI générique.
  - Correctif : remplacer par classes Tailwind + variables CSS.

- KO — Gradients présents.
  - `HeroBanner` utilise `bg-gradient-to-br`.
  - `ElectionBanner` utilise `bg-gradient-to-r`.
  - Correctif : fonds pleins via tokens.

- KO — Ombres lourdes présentes.
  - Plusieurs composants shadcn/ui utilisent `shadow-lg`, `shadow-xl`.
  - `UCard` a aussi `hover:shadow-lg`.
  - Correctif : limiter aux composants applicatifs et remplacer par `shadow-[var(--shadow-card)]`; laisser éventuellement les primitives shadcn si accepté.

- KO — `font-black` présent dans plusieurs composants.
  - `Navbar`, `HeroBanner`, `SectionTitle`, `StatsBar`, `ElectionBanner`, `ErrorBoundary`.
  - Correctif : remplacer par `font-bold` ou `font-medium` selon contexte.

- OK — Pas d’emoji UI détecté dans les fichiers applicatifs principaux.
  - Les pictos sont majoritairement Lucide React.

- À surveiller — Accents français.
  - Plusieurs textes historiques dans `public/llm.html` et certains metadata utilisent encore des formes sans accents (`adhesion`, `actualites`, `Creer`).
  - Correctif P1 : harmonisation linguistique.

---

## 7. Positionnement éditorial campagne

- OK — Plusieurs formulations respectent bien le conditionnel :
  - `Une fois élus...`
  - `si nous sommes élus...`
  - `les élections de décembre 2026 nous permettront...`

- KO — Formulations trop présentes / ambiguës détectées :
  - `/plateforme` Meta description : “suivez en temps réel comment UNSAgglo les porte au CST” — laisse entendre une capacité actuelle.
  - `ContribSection` : “nous nous engageons...” à vérifier dans le contexte exact, probablement acceptable si formulé comme engagement futur.
  - `ContributionsWall` : “nous lisons et analysons chaque contribution, intégrons les meilleures à notre programme 2026, et vous accompagnons individuellement si nécessaire dès aujourd'hui” — acceptable pour l’activité interne, mais “section syndicale opérationnelle” peut être perçu comme présent institutionnel fort.
  - `/membership` Hero : “pour défendre vos droits au quotidien” — trop présent au regard de la consigne stricte.
  - `/rights` : “pour connaître et défendre vos droits” — générique, mais à reformuler si règle stricte.

- OK — Pas d’attaque explicite CFDT/CGT/FO détectée.

- À surveiller — Mentions de compteurs publics.
  - Recherche textuelle sur “adhérents/signatures” ne révèle pas de compteur public évident.
  - `PrivacyPage` mentionne “adhérents et anciens adhérents” dans un contexte RGPD, acceptable.

---

## 8. Orchestration transverse

- KO — Types backend en décalage avec la base réelle.
  - `src/integrations/supabase/types.ts` contient `campaigns`, `public_contributions_feed`, `service_libre`, champs adhérents v2, etc.
  - La base réelle ne les contient pas encore.
  - Impact : le TypeScript “croit” que le schéma est prêt alors que les requêtes runtime échouent.

- À surveiller — Ne pas modifier manuellement `src/integrations/supabase/types.ts`.
  - Il a été édité précédemment selon l’historique, alors que ce fichier doit rester généré automatiquement.
  - Correctif : réaligner la base par migration, puis laisser les types se régénérer automatiquement.

- OK — `bunx tsc --noEmit --pretty false` a terminé sans sortie dans mon contrôle local.

- OK — Tests Vitest existants : 2 fichiers, 16 tests, tous verts.

- À vérifier — `npm run build` / `bun run build`.
  - Non lancé en mode audit pour éviter d’ajouter des artefacts `dist` ; en mode correction il faudra le lancer.
  - La plateforme signale malgré tout des build errors TypeScript à corriger en priorité.

- À vérifier — Dead code / imports cassés.
  - Un import inutilisé `STATUS_META` est signalé par la plateforme.
  - Pas d’autre import cassé confirmé par les recherches.

- À vérifier — Lazy chunks dist.
  - Pas de build produit pendant cet audit, donc taille des chunks non vérifiée.

---

## Synthèse P0 / P1

### P0 — Bloquants production

1. Appliquer un rattrapage de migrations en production :
   - adhésion v2 complète
   - `statut = pending_validation | actif | resilie`
   - `statut_pro` avec `retraite`
   - `service_libre`
   - indexes utiles
   - policies RLS RGPD sur `adherents`

2. Appliquer les migrations plateforme non jouées :
   - `themes` multi-sélection sur contributions
   - feedback loop (`statut_traitement`, `action_unsagglo`)
   - vue `public_contributions_feed`
   - table `campaigns`
   - RPC `get_active_campaign`

3. Corriger les 4 build errors signalées :
   - consentements `true` dans `AdhesionForm`
   - import `STATUS_META` inutilisé
   - `action_unsagglo` dans `sanitize`
   - vérifier compilation après correction

4. Ajouter `public/statuts.pdf` ou changer le lien.

5. Ajouter les alias de routes attendus si les URLs cibles sont contractuelles :
   - `/adhesion` → adhésion
   - `/confirmation` → confirmation
   - `/privacy` → confidentialité
   - `/admin/*` → admin ou sous-routes admin

### P1 — Qualité / conformité / durcissement

1. Ajouter JSON-LD FAQ sur `/elections`.
2. Corriger les warnings React refs (`UButton`, éventuellement `AdhesionForm`).
3. Durcir les grants RPC (`REVOKE FROM PUBLIC`, grants ciblés).
4. Traiter les warnings linter Lovable Cloud : policies `true`, bucket listable, introspection publique.
5. Supprimer les styles inline des pages applicatives.
6. Retirer gradients, `font-black`, ombres lourdes hors token `shadow-card`.
7. Reformuler les textes au présent trop affirmatifs en conditionnel campagne.
8. Harmoniser les accents français dans metadata/libellés.
9. Ajouter indexes `created_at DESC` sur les tables admin fréquemment triées.
10. Vérifier `npm/bun build` et taille des chunks après corrections.

---

## Plan de correction proposé après approbation

1. Créer une migration de rattrapage idempotente pour réaligner la base réelle avec le code actuel.
2. Corriger les erreurs TypeScript P0 dans `AdhesionForm`, `ContributionsWall`, `usePublicContributions`.
3. Ajouter les alias de routes et le JSON-LD élections.
4. Ajouter ou intégrer le PDF des statuts.
5. Corriger les warnings React refs.
6. Nettoyer les principaux écarts charte/éditorial P1 sur les pages publiques.
7. Lancer validation : typecheck, tests, build, linter backend, vérification des routes critiques.