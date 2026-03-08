

## Audit qualite -- Implementation Services CARPF

### Bilan

L'implementation est **correcte et bien synchronisee**. Voici le detail :

### Base de donnees
- La colonne `service` sur `contributions_elections` est de type `text` sans contrainte -- compatible avec les nouvelles valeurs (`dgs`, `dgst`, `drh`, etc.).
- Pas de migration necessaire : le champ accepte n'importe quelle valeur texte.
- Les anciennes contributions avec les anciens codes service s'afficheront avec la valeur brute en fallback (comportement correct du `serviceLabel()` qui retourne `value` si pas de match).

### Formulaire public (`ContribForm.tsx`)
- Utilise `groups={SERVICE_GROUPS}` -- le `SelectField` rend des `<optgroup>` correctement.
- 57 lignes -- bien sous la limite de 100.
- Pas de logique metier dans le TSX -- conforme.

### Hook formulaire (`useContribForm.ts`)
- 85 lignes -- conforme.
- Le champ `service` est transmis via `contrib.submit({ ..., service: data.service, ... })` -- synchronise avec la base.

### Schema Zod (`contribSchema.ts`)
- `service: z.string().min(2, "Service requis")` -- valide car toutes les valeurs (`dgs`, `drh`, etc.) font 2+ caracteres.

### Insert Supabase (`useContribSubmit.ts`)
- Le champ `service` est bien inclus dans l'insert -- synchronise.

### Admin (`ContributionsManager.tsx`)
- `serviceLabel()` resout les valeurs brutes en labels lisibles via `SERVICES.find()`.
- Le tableau affiche le service avec `serviceLabel(c.service)`.
- L'export CSV utilise `serviceLabel(c.service)` -- correct.
- Filtre par service **manquant** : les filtres existent pour theme et statut, mais pas pour le service. Ce n'est pas bloquant mais serait coherent.
- 98 lignes -- sous la limite de 100 (l'ajout d'un filtre service le ferait depasser).

### Points d'attention mineurs

1. **Pas de filtre par service dans l'admin** : les filtres theme et statut sont presents, mais pas le service. Pour l'ajouter sans depasser 100 lignes, il faudrait extraire la barre de filtres dans un sous-composant `ContribFiltersBar.tsx`.

2. **Donnees historiques** : les contributions existantes avec les anciens codes service (ex: `mairie`, `technique`) afficheront la valeur brute au lieu d'un label lisible. C'est le comportement attendu du fallback mais a noter.

3. **Interfaces dupliquees** : `ContribHook` et `CandidatHook` sont definies a la fois dans `ContribForm.tsx` (lignes 13-23) et `useContribForm.ts` (lignes 6-16). Il faudrait les definir une seule fois dans un fichier de types partage.

### Plan de corrections (optionnel)

| Priorite | Tache | Impact |
|----------|-------|--------|
| Moyenne | Ajouter filtre service dans admin + extraire `ContribFiltersBar.tsx` | Coherence filtrage |
| Basse | Unifier `ContribHook`/`CandidatHook` dans un fichier type partage | DRY |

Aucun bug bloquant. L'implementation est fonctionnelle et synchronisee de bout en bout (formulaire -> base de donnees -> admin + export CSV).

