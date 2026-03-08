

## Enrichir les thematiques de la plateforme

### Structure des donnees

Remplacer la liste plate de 5 themes par 6 groupes contenant 22 sous-themes au total. Le `theme` stocke en base reste un `string` simple (pas de changement DB necessaire).

### Fichiers a modifier

**1. `src/constants/themes.ts`**
- Ajouter une interface `ThemeGroup` avec `group: string` et `options: ThemeOption[]`
- Exporter `THEME_GROUPS: ThemeGroup[]` avec les 6 groupes :
  - Remuneration et Pouvoir d'achat (4 sous-themes)
  - Conditions de travail (4 sous-themes)
  - Carriere et Formation (4 sous-themes)
  - Sante et Securite (4 sous-themes)
  - Droits et Statut (4 sous-themes)
  - Autre (1 sous-theme)
- Conserver `THEMES` comme liste plate (concatenation de tous les sous-themes) pour la retro-compatibilite avec `contribSchema.ts`, `ContributionsManager.tsx`, `SondageForm.tsx`

**2. `src/components/forms/SelectField.tsx`**
- Ajouter une prop optionnelle `groups?: { group: string; options: SelectOption[] }[]`
- Si `groups` est fourni, rendre des `<optgroup>` au lieu de la liste plate
- Sinon, comportement inchange

**3. `src/pages/plateforme/ContribForm.tsx`**
- Importer `THEME_GROUPS` au lieu de `THEMES`
- Passer `groups={THEME_GROUPS}` au `SelectField` du theme

**4. `src/types/index.ts`**
- Elargir `ThemeElection` en `string` (union trop longue a 22 valeurs) ou la supprimer et utiliser `string` directement

**5. `src/pages/admin/SondageForm.tsx`**
- Utiliser `THEME_GROUPS` avec `<optgroup>` pour le select natif du theme

**6. `src/pages/admin/ContributionsManager.tsx`**
- `themeLabel()` continue a fonctionner via `THEMES` (liste plate toujours exportee)

### Aucune migration DB necessaire
Le champ `theme` est deja `text` sans contrainte.

