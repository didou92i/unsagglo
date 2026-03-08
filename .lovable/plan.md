

## Ajouter le champ "Nom" a la candidature liste electorale

Le champ `nom` manque a tous les niveaux : base de donnees, schema de validation, formulaire et vue admin.

### Base de donnees

**Migration** : Ajouter la colonne `nom` (text, NOT NULL, default `''`) a la table `candidats_liste`.

### Frontend

**`src/pages/plateforme/contribSchema.ts`** :
- Ajouter `nom: z.string().optional()`
- Dans `superRefine`, valider que `nom` est renseigne (min 2 caracteres) quand `rejoindreListe` est coche

**`src/pages/plateforme/ListeElectoraleFields.tsx`** :
- Ajouter un `InputField` pour "Nom" avant l'email

**`src/pages/plateforme/ContribSection.tsx`** :
- Passer `data.nom` dans l'appel a `candidat.submit()`

**`src/hooks/useCandidatSubmit.ts`** :
- Ajouter `nom` dans `CandidatInput`

**`src/pages/admin/CandidatsManager.tsx`** :
- Ajouter la colonne "Nom" dans le tableau admin

