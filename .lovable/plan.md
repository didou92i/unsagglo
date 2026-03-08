

## Fusionner la candidature liste electorale dans le formulaire de contribution

Bonne idee : au lieu d'avoir deux sections separees, on integre la case "Je souhaite rejoindre la liste electorale UNSAgglo" directement en bas du formulaire de contribution. Quand l'utilisateur coche, les champs supplementaires (email, telephone, adresse) se deplient sous la case.

### Logique

- A la soumission du formulaire, on envoie la contribution normalement
- Si la case liste electorale est cochee, on envoie aussi une insertion dans `candidats_liste` avec les champs supplementaires + le prenom et service deja saisis
- Les deux inserts sont independants (contribution + candidature)
- La mention RGPD s'affiche uniquement quand la case est cochee

### Fichiers a modifier

**`src/pages/plateforme/ContribSection.tsx`** :
- Ajouter un state `rejoindreListe` (boolean)
- Apres le textarea, ajouter la checkbox "Je souhaite rejoindre la liste electorale UNSAgglo"
- Quand cochee, afficher les 3 champs supplementaires (email, telephone, adresse) via `ListeElectoraleFields` + mention RGPD
- Au submit : envoyer la contribution, puis si `rejoindreListe` est coche, appeler aussi `useCandidatSubmit`

Comme le fichier risque de depasser 100 lignes, on extraira la partie checkbox + champs depliants dans un sous-composant :

**`src/pages/plateforme/ListeElectoraleInline.tsx`** (nouveau) :
- Recoit `register`, `errors`, `checked`, `onCheckedChange` en props
- Affiche la checkbox, les champs conditionnels et la mention RGPD
- Reutilise `ListeElectoraleFields` existant

**`src/pages/plateforme/contribSchema.ts`** :
- Etendre le schema pour inclure les champs optionnels `email`, `telephone`, `adresse` (requis seulement si la case est cochee -- validation conditionnelle avec `superRefine`)

**`src/pages/plateforme/index.tsx`** :
- Retirer `<ListeElectoraleSection />` (plus besoin d'une section separee)

**Fichiers a supprimer** :
- `src/pages/plateforme/ListeElectoraleSection.tsx` (fusionne dans ContribSection)
- `src/pages/plateforme/candidatSchema.ts` (fusionne dans contribSchema)

### Aucune modification base de donnees
Les tables `contributions_elections` et `candidats_liste` restent inchangees.

