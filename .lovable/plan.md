

# Audit de conformite -- Master Plan v4 vs Implementation actuelle

## Resultats de l'audit

### CONFORME

| Element | Statut |
|---------|--------|
| Structure dossiers `src/pages/`, `src/hooks/`, `src/components/ui/`, etc. | OK |
| Types dans `src/types/index.ts` (StatutAdherent, CategorieArticle, etc.) | OK |
| CSS tokens dans `src/styles/tokens.css` (toutes les couleurs, fonts, radius, shadows) | OK |
| Google Fonts dans `index.html` (Barlow Condensed + Source Sans Pro) | OK |
| `main.tsx` importe `tokens.css` avant `index.css` | OK |
| `HelmetProvider` dans `main.tsx` | OK |
| MetaTags avec Open Graph, Twitter, JSON-LD, canonical | OK |
| Tailwind config avec `font-display`, `font-body`, couleurs custom | OK |
| UButton : 4 variants, 3 sizes, loading spinner, interface typee | OK |
| UBadge : 5 variants, interface typee | OK |
| UCard : hover transition avec onClick, 3 paddings | OK |
| Spinner : SVG, 3 sizes | OK |
| Divider : simple HR | OK |
| InputField, TextareaField, SelectField : generics TypeScript, zod | OK |
| FormError avec icone | OK |
| Navbar : fixed, hamburger mobile, badge Elections, lien Adherer | OK |
| Footer : 3 colonnes, liens droits, contact, annee dynamique | OK |
| PageWrapper : scroll to top, pt-16, Navbar + Footer | OK |
| HeroBanner : 8 props, badge conditionnel, CTAs | OK |
| SectionTitle, StatsBar, ElectionBanner | OK |
| Routes : toutes les 12 routes du plan (/, /news, /news/:slug, etc.) | OK |
| Supabase : 4 tables (profiles, adherents, articles, contributions_elections) | OK |
| RLS : policies sur toutes les tables | OK |
| Storage bucket `documents` | OK |
| Auth : login, register, ProtectedRoute, useAuth hook | OK |
| Espace membres avec DocumentsList | OK |
| `sitemap.xml` et `llm.html` | OK |
| Aucun fichier ne depasse 100 lignes | OK |
| Zero fichier `.js` ou `.jsx` | OK |
| Zero type `any` dans le code applicatif | OK |
| Tous les imports utilisent `@/` | OK |

---

### NON CONFORME -- Corrections a apporter

#### 1. BLOCKING -- Trigger `on_auth_user_created` absent en BDD
La migration SQL definit le trigger mais la requete `information_schema.triggers` retourne 0 resultats. Le trigger qui cree automatiquement un profil a l'inscription ne fonctionne pas. Il faut re-creer le trigger via une nouvelle migration.

#### 2. BLOCKING -- `robots.txt` incomplet
Le plan exige : AI bots autorises (GPTBot, PerplexityBot, Claude-Web) + reference au Sitemap. Le fichier actuel ne contient ni les bots AI, ni la ligne `Sitemap:`.

#### 3. BLOCKING -- `index.html` titre et OG par defaut "Lovable"
Le `<title>` est "Lovable App", les og:image pointent vers lovable.dev. Doivent etre mis a jour pour UNSAgglo.

#### 4. BLOCKING -- `tsconfig.json` non strict
Le plan exige `strict: true`, `noImplicitAny: true`, `strictNullChecks: true`, `noUnusedLocals: true`. Actuellement : `noImplicitAny: false`, `strictNullChecks: false`, `noUnusedLocals: false`.

#### 5. WARNING -- `RightsGrid.tsx` utilise un inline style
Ligne 30 : `style={{ borderColor: item.color }}`. Le plan interdit les inline styles.

#### 6. WARNING -- RLS policies sur `adherents` et `contributions_elections` sont `RESTRICTIVE` (Permissive: No)
Les policies INSERT sont definies comme restrictives, ce qui signifie qu'un utilisateur anonyme ne peut inserer que si TOUTES les policies sont satisfaites. Il faudrait les rendre permissives pour que les formulaires publics fonctionnent.

#### 7. WARNING -- Contact page sans OpenStreetMap fonctionnel
L'iframe OpenStreetMap utilise des coordonnees generiques. Non bloquant mais a ajuster.

---

### Plan de corrections

1. **Nouvelle migration SQL** : Re-creer le trigger `on_auth_user_created` sur `auth.users`
2. **`robots.txt`** : Ajouter GPTBot, PerplexityBot, Claude-Web + ligne Sitemap
3. **`index.html`** : Corriger titre, description, og:image pour UNSAgglo
4. **`tsconfig.json`** : Activer strict mode (attention : peut reveler des erreurs TS a corriger)
5. **`RightsGrid.tsx`** : Remplacer l'inline style par une classe Tailwind dynamique
6. **Verifier les RLS policies** : S'assurer que les INSERT anonymes fonctionnent sur adherents et contributions

