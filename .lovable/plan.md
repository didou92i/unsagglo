

## Audit qualite -- Dernieres implementations

### Bilan global

Le code est de bonne qualite. Tous les fichiers respectent la limite de 100 lignes, le typage est strict, les hooks sont correctement extraits, et les constantes sont centralisees.

### Problemes identifies

**1. `useContribSubmit.ts` -- Pas de toast de confirmation**
Contrairement a `useCandidatSubmit` qui affiche un toast succes/erreur, `useContribSubmit` ne donne aucun feedback visuel a l'utilisateur en cas d'erreur. Incoherence entre les deux hooks.

**Correction** : Ajouter `toast.success` et `toast.error` dans `useContribSubmit`.

**2. `useAdminSondages.ts` -- Import toast incoherent**
Ce hook importe `toast` depuis `@/hooks/use-toast` (shadcn toast avec objet), tandis que `useCandidatSubmit` utilise `toast` depuis `sonner` (appel direct string). Deux systemes de toast differents coexistent dans le projet.

**Correction** : Unifier sur `sonner` (plus simple, deja utilise ailleurs) ou sur `use-toast` -- mais pas les deux.

**3. `SondagesManager.tsx` ligne 28 -- Typage douteux**
```typescript
const handleCreate = async (data: EditState extends never ? never : Omit<EditState, "id">): Promise<void> => {
```
Le type conditionnel `EditState extends never ? never : ...` est inutile et confus. `EditState` n'est jamais `never`. Cela equivaut simplement a `Omit<EditState, "id">`.

**Correction** : Simplifier en `Omit<EditState, "id">`.

**4. `SondagesManager.tsx` lignes 29, 35 -- Cast `as` evitable**
Les `as Parameters<typeof create>[0]` et `as Parameters<typeof update>[1]` sont des contournements de typage. Le type `SondageFormData` et `CreateSondagePayload` sont identiques en structure -- il suffit d'aligner les interfaces.

**Correction** : Aligner le type `SondageFormData` du formulaire avec `CreateSondagePayload` du hook, ou utiliser un type partage.

**5. `useAdminCandidats.ts` ligne 29 -- Cast `as Candidat[]`**
Le cast force le typage au lieu de s'appuyer sur le type genere par la base de donnees. Risque de desynchronisation si la table evolue.

**Correction** : Utiliser le type genere depuis `@/integrations/supabase/types.ts` ou au minimum typer le `.select()`.

**6. `contribSchema.ts` -- Themes en dur dans le schema**
Les valeurs de l'enum Zod (`"remuneration"`, `"conditions_travail"`, etc.) sont ecrites en dur alors qu'elles existent deja dans `THEMES` de `constants/themes.ts`. Si on ajoute un theme, il faut le modifier a deux endroits.

**Correction** : Deriver l'enum Zod depuis `THEMES` :
```typescript
const themeValues = THEMES.map(t => t.value) as [string, ...string[]];
// puis z.enum(themeValues, ...)
```

### Aucun probleme

- Limite 100 lignes : respectee partout
- Pas de `any` : correct
- Imports `@/` : correct
- Interfaces declarees pour tous les props : correct
- RLS `candidats_liste` : INSERT public, SELECT admin uniquement -- correct
- Pas de styles inline : correct

### Plan de correction

1. Ajouter les toasts dans `useContribSubmit`
2. Unifier les imports toast sur `sonner` dans `useAdminSondages`
3. Simplifier le typage dans `SondagesManager` (supprimer le conditionnel inutile et les casts `as`)
4. Deriver l'enum Zod du schema depuis `THEMES`
5. Supprimer le cast `as Candidat[]` dans `useAdminCandidats` en utilisant un typage plus propre

### Fichiers concernes
- `src/hooks/useContribSubmit.ts` (ajouter toasts)
- `src/hooks/useAdminSondages.ts` (migrer vers sonner)
- `src/pages/admin/SondagesManager.tsx` (simplifier types)
- `src/pages/plateforme/contribSchema.ts` (deriver enum de THEMES)
- `src/hooks/useAdminCandidats.ts` (supprimer cast)

