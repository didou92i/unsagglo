

## Analyse qualite du code -- Rapport

Le code est globalement bien structure. Voici les problemes identifies, classes par severite.

---

### Problemes a corriger

| # | Severite | Fichier | Probleme |
|---|----------|---------|----------|
| 1 | **Haute** | `ArticlesManager.tsx` | **125 lignes** -- depasse la limite de 100 lignes du projet. La logique fetch/toggle/delete est dans le composant au lieu d'un hook dedie. |
| 2 | **Haute** | `AdherentsManager.tsx` | **108 lignes** -- meme probleme. La logique Supabase (fetch, updateStatut, export) est directement dans le composant. |
| 3 | **Moyenne** | `ContributionsManager.tsx` | **Duplication** : `serviceLabel` est redefini localement (ligne 21) alors qu'il existe deja dans `@/lib/serviceLabel.ts`. Idem pour `themeLabel` et `statutLabel` qui pourraient etre dans `@/lib/`. |
| 4 | **Moyenne** | `RightsGrid.tsx` | `border-l-4` sans couleur dynamique -- la propriete `color` de chaque `RightItem` est declaree mais jamais utilisee dans le JSX. Code mort. |
| 5 | **Basse** | `ArticleForm.tsx` | N'utilise pas le pattern `useForm` + `zodResolver` du reste du projet. Validation manuelle avec `!titre.trim()`. Incoherent avec `AdhesionForm` et `ContribForm`. |
| 6 | **Basse** | `DocumentsManager.tsx` | **85 lignes** -- OK mais proche de la limite. Le `AlertDialog` inline est verbose. |

---

### Plan de correction

**Etape 1 -- Extraire les hooks admin manquants**
- Creer `useAdminArticles.ts` : fetch, togglePublie, deleteArticle
- Creer `useAdminAdherents.ts` : fetch, updateStatut, handleExport
- `ArticlesManager.tsx` et `AdherentsManager.tsx` deviennent des composants de presentation pure (< 80 lignes)

**Etape 2 -- Centraliser les fonctions label**
- Deplacer `themeLabel` et `statutLabel` dans `@/lib/` (comme `serviceLabel.ts`)
- Supprimer les redefinitions locales dans `ContributionsManager.tsx`
- Importer depuis `@/lib/` partout

**Etape 3 -- Corriger le code mort dans RightsGrid**
- Appliquer la propriete `color` comme `style={{ borderColor: item.color }}` sur le `border-l-4` du `UCard`, ou supprimer le champ `color` de l'interface

**Etape 4 -- Harmoniser ArticleForm avec le pattern projet**
- Migrer vers `useForm` + `zodResolver` + schema Zod (comme les autres formulaires)

| Fichier | Action |
|---------|--------|
| `src/hooks/useAdminArticles.ts` | Nouveau -- logique extraite de ArticlesManager |
| `src/hooks/useAdminAdherents.ts` | Nouveau -- logique extraite de AdherentsManager |
| `src/pages/admin/ArticlesManager.tsx` | Refactor -- presentation seule |
| `src/pages/admin/AdherentsManager.tsx` | Refactor -- presentation seule |
| `src/lib/themeLabel.ts` | Nouveau |
| `src/lib/statutLabel.ts` | Nouveau |
| `src/pages/admin/ContributionsManager.tsx` | Supprimer labels locaux, importer depuis lib |
| `src/pages/home/RightsGrid.tsx` | Appliquer `borderColor` dynamique |
| `src/pages/admin/ArticleForm.tsx` | Migrer vers useForm + Zod |

