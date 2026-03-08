

## Ajouter le champ "Statut" au formulaire de contribution

### Contexte

Le formulaire de contribution sur `/plateforme` ne comporte pas de champ permettant a l'agent d'indiquer son statut (fonctionnaire, contractuel, etc.). La table `contributions_elections` en base ne possede pas non plus de colonne `statut`.

### Modifications

**1. Nouveau fichier `src/constants/statuts.ts`**
Creer un fichier similaire a `themes.ts` avec `STATUT_GROUPS` (5 groupes : Fonctionnaires, Contractuels permanents, Contractuels non permanents, Situations particulieres, Autre) et `STATUTS` (liste plate). Meme pattern `ThemeGroup`/`ThemeOption` reutilise via des interfaces generiques.

**2. Migration DB : ajouter colonne `statut` a `contributions_elections`**
```sql
ALTER TABLE public.contributions_elections ADD COLUMN statut text;
```
Colonne nullable pour ne pas casser les contributions existantes.

**3. Schema Zod (`contribSchema.ts`)**
Ajouter `statut: z.string().min(1, "Selectionnez votre statut")` au schema.

**4. Formulaire (`ContribForm.tsx`)**
Ajouter un `SelectField` avec `groups={STATUT_GROUPS}` entre le champ Service et le champ Theme.

**5. Hook submit (`useContribSubmit.ts`)**
Ajouter `statut` dans l'objet insere en base et dans l'interface `ContribInput`.

**6. Admin (`ContributionsManager.tsx`)**
Afficher la colonne statut dans le tableau et l'export CSV si elle existe.

