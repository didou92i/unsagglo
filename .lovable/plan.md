

## Remplacer le formulaire doublon par un renvoi vers /plateforme

### Constat

La section "Faites entendre votre voix" sur `/elections` contient un `ContribForm` qui fait exactement la meme chose que le formulaire de `/plateforme`. Deux formulaires identiques alimentant la meme table = confusion pour l'utilisateur.

### Solution

Remplacer la section formulaire par un bloc d'appel a l'action (CTA) qui redirige vers `/plateforme#contribution`. Cela :
- Supprime la duplication
- Centralise les contributions en un seul endroit
- Simplifie la maintenance

### Fichiers concernes

**`src/pages/elections/index.tsx`** :
- Supprimer l'import de `ContribForm`
- Remplacer la section `#contribution` par un texte explicatif + un `UButton` (lien vers `/plateforme#contribution`)

**Fichiers a supprimer (optionnel)** :
- `src/pages/elections/ContribForm.tsx` -- plus utilise
- `src/pages/elections/useContrib.ts` -- plus utilise (le schema est un doublon de `plateforme/contribSchema.ts`)

### Rendu final de la section

Un bloc centre avec :
- Titre "Faites entendre votre voix"
- Sous-titre "Proposez vos idees sur notre plateforme participative."
- Bouton "Acceder a la plateforme" pointant vers `/plateforme#contribution`

