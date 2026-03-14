

## Dernier rapport qualite

Le code est globalement propre. Voici les derniers points notables.

---

### 1. Double systeme de toast (priorite haute -- coherence)

Deux sources de `toast` coexistent dans le projet :
- `import { toast } from "sonner"` : utilise dans `useContact`, `useContribSubmit`, `useCandidatSubmit`, `useAdhesionSubmit`, `useAdminSondages`
- `import { toast } from "@/hooks/use-toast"` : utilise dans `useAdminArticles`, `useAdminAdherents`, `useArticleForm`, `useProfile`, `useDocumentsAdmin`

Cela cree une incoherence UX (deux styles de notifications differents) et complique la maintenance.

**Correction** : Standardiser sur un seul systeme. Le projet charge les deux (`Toaster` et `Sonner`) dans `App.tsx`, donc les deux marchent, mais il faut choisir un seul. Recommandation : migrer tout vers `sonner` (plus moderne, API plus simple) et supprimer le `Toaster` shadcn/ui inutilise.

---

### 2. `sonner.tsx` importe `next-themes` (priorite haute -- bug potentiel)

`src/components/ui/sonner.tsx` ligne 1 fait `import { useTheme } from "next-themes"`. Ce projet utilise Vite, pas Next.js. Si `next-themes` n'est pas installe, ce fichier crashera au runtime. Si installe, c'est une dependance inutile.

**Correction** : Remplacer par une detection de theme locale ou supprimer l'import.

---

### 3. Pas de gestion d'erreur sur `usePageVisits` (priorite basse)

Le hook insere dans `page_visits` sans verifier le resultat (`.then()` vide). Si l'insert echoue (RLS, table manquante), l'erreur est silencieusement avalee. Acceptable pour du tracking non-critique, mais un `catch` avec un `console.warn` serait plus propre.

---

### 4. `useSiteSettings` appele dans chaque composant individuellement (priorite basse -- optimisation future)

`useSiteSettings` est appele dans `Navbar`, `Footer`, `PageGuard`, et potentiellement d'autres composants. Chaque instance fait un appel Supabase independant. A terme, un `SiteSettingsProvider` (React Context) eviterait les appels dupliques.

---

### Plan d'implementation

| # | Fichier(s) | Action |
|---|-----------|--------|
| 1 | 5 hooks (`useContact`, `useContribSubmit`, `useCandidatSubmit`, `useAdhesionSubmit`, `useAdminSondages`) | Migrer `import { toast } from "sonner"` vers `import { toast } from "@/hooks/use-toast"` **OU** l'inverse (tout vers sonner) |
| 2 | `src/components/ui/sonner.tsx` | Supprimer l'import `next-themes`, utiliser une classe CSS ou un fallback |
| 3 | `src/App.tsx` | Supprimer le `Toaster` devenu inutile si on standardise sur sonner (ou inversement) |
| 4 | `src/hooks/usePageVisits.ts` | Ajouter `.catch(console.warn)` sur l'insert |

**Estimation** : 4 fichiers modifies, aucun fichier cree, aucune migration SQL.

