

## Corriger la logique anonyme / liste electorale

Le probleme : actuellement, un utilisateur peut cocher "Contribution anonyme" ET "Rejoindre la liste electorale" en meme temps, ce qui est incoherent -- on ne peut pas rejoindre une liste electorale de facon anonyme puisqu'il faut obligatoirement nom et prenom.

### Corrections

**`src/pages/plateforme/ContribSection.tsx`** :
- Quand `rejoindreListe` est coche, forcer `anonyme` a `false` et desactiver la checkbox anonyme
- Quand `anonyme` est coche, forcer `rejoindreListe` a `false` et desactiver la checkbox liste
- Rendre le champ "Prenom" obligatoire quand `rejoindreListe` est coche (il est actuellement masque en mode anonyme)
- Au submit : utiliser `data.prenom` (plus de fallback "Anonyme" si liste cochee)

**`src/pages/plateforme/contribSchema.ts`** :
- Dans `superRefine`, ajouter une validation sur `prenom` (min 2 caracteres) quand `rejoindreListe` est coche

**`src/pages/plateforme/ListeElectoraleFields.tsx`** :
- Le champ "Nom" est deja present, pas de changement necessaire

### Comportement attendu

- Case "Anonyme" cochee : prenom masque, case liste desactivee
- Case "Rejoindre la liste" cochee : case anonyme desactivee, prenom et nom obligatoires, champs contact depliés
- Aucune case cochee : prenom optionnel, fonctionnement normal

### Fichiers concernes
- `src/pages/plateforme/ContribSection.tsx` (logique d'exclusion mutuelle)
- `src/pages/plateforme/contribSchema.ts` (validation prenom conditionnelle)

