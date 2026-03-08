

## Remplacer la liste plate des services par une liste groupee CARPF

### Contexte
Le champ "Service" dans `ContribForm.tsx` utilise actuellement une liste plate de 4 options (`SERVICES` en dur). Il faut la remplacer par une liste hierarchique de 6 groupes et 22 options, suivant le meme pattern que `statuts.ts` et `themes.ts`.

### Modifications

**1. Nouveau fichier `src/constants/services.ts`**
Creer `SERVICE_GROUPS` (6 groupes) et `SERVICES` (liste plate) avec le meme pattern `SelectOptionGroup` / `SelectOption` :
- Direction Generale et Pilotage (6 options)
- Services a la Population (4 options)
- Securite (2 options)
- Ressources et Support (6 options)
- Amenagement et Technique (6 options)
- Autre (1 option)

**2. Modifier `ContribForm.tsx`**
- Supprimer la constante `SERVICES` locale
- Importer `SERVICE_GROUPS` depuis `@/constants/services`
- Remplacer `options={SERVICES}` par `groups={SERVICE_GROUPS}` sur le `SelectField` du service

**3. Modifier `ContributionsManager.tsx`**
- Importer `SERVICES` depuis `@/constants/services`
- Ajouter un helper `serviceLabel()` pour resoudre le label dans le tableau et l'export CSV (meme pattern que `statutLabel` et `themeLabel`)

