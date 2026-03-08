

## Audit qualite des deux dernieres implementations

### Bilan general

Les deux implementations (themes groupes + statuts) sont **coherentes et bien integrees**. Voici le detail :

### Base de donnees

- La colonne `statut` (type `text`, nullable) est bien presente sur `contributions_elections` -- confirme par le schema Supabase.
- Nullable = correct, car les contributions existantes n'ont pas de statut.
- Pas de migration necessaire pour les themes (le champ `theme` etait deja `text` sans contrainte).

### Fichiers admin

- **`ContributionsManager.tsx`** : colonne "Statut" ajoutee dans le tableau + export CSV. Utilise `statutLabel()` avec fallback sur la valeur brute. Correct.
- **`useAdminContributions.ts`** : interface `Contribution` inclut `statut: string | null`. Correct.
- **`SondageForm.tsx`** : utilise `THEME_GROUPS` avec `<optgroup>`. Correct.

### Formulaire public

- **`ContribForm.tsx`** : champ Statut present entre Service et Theme, avec `groups={STATUT_GROUPS}`. Correct.
- **`contribSchema.ts`** : validation `statut: z.string().min(1)`. Correct.
- **`useContribSubmit.ts`** : `statut` inclus dans l'insert et l'interface `ContribInput`. Correct.

### Points d'attention mineurs (corrections recommandees)

1. **`ContribForm.tsx` depasse 100 lignes** (104 lignes) -- la contrainte projet est 100 lignes max. Il faudrait extraire la logique du formulaire dans un hook `useContribForm.ts`.

2. **Interfaces dupliquees** : `StatutOption`/`StatutGroup` et `ThemeOption`/`ThemeGroup` sont identiques. On pourrait les unifier dans un type generique `GroupedOption` dans `src/types/` pour eviter la duplication.

3. **`SelectField.tsx`** : les interfaces `SelectOption` et `SelectOptionGroup` sont internes au composant mais identiques a celles de `themes.ts` et `statuts.ts`. Pas bloquant mais un type partage serait plus propre.

4. **Export CSV admin** : le label du statut n'est pas resolu dans l'export (exporte la valeur brute `c.statut ?? ""`). Il faudrait utiliser `statutLabel()` dans l'export aussi, comme c'est fait pour l'affichage.

5. **Export CSV admin** : meme probleme pour le theme -- exporte `c.theme` brut au lieu de `themeLabel(c.theme)`.

### Plan de corrections

**1. Extraire la logique de `ContribForm.tsx` dans `useContribForm.ts`**
- Deplacer les states (`anonyme`, `rejoindreListe`, `assistantOpen`), les handlers (`onAnonymeChange`, `onCheckedChange`, `onSubmit`, `handleUseProposal`) et le `useForm` dans un hook dedie.
- Le composant ne garde que le JSX.

**2. Corriger l'export CSV dans `ContributionsManager.tsx`**
- Remplacer `Statut: c.statut ?? ""` par `Statut: c.statut ? statutLabel(c.statut) : ""`
- Remplacer `Theme: c.theme` par `Theme: themeLabel(c.theme)`

**3. (Optionnel) Unifier les types `GroupedOption`**
- Creer un type partage `SelectOption` / `SelectOptionGroup` dans `src/types/` et l'utiliser dans `themes.ts`, `statuts.ts` et `SelectField.tsx`.

