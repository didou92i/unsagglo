

## Bouton "Entrer" qui se dedouble au survol

### Comportement
Au hover sur le bouton "Entrer", celui-ci se transforme en deux boutons cote a cote :
- **Adherent** : redirige vers `/members` (espace membre)
- **Visiteur** : redirige vers `/news` (actualites)

### Implementation

**Nouveau composant `src/pages/home/EntryButton.tsx`** :
- Etat `hovered` (boolean) gere via `onMouseEnter` / `onMouseLeave` sur un conteneur
- Quand `hovered = false` : affiche un seul bouton "Entrer" (style actuel)
- Quand `hovered = true` : affiche deux boutons avec une animation de separation (scale/opacity transition)
- Les deux boutons gardent le meme style (transparent, border `#009de6`, rounded-full)
- Transition fluide via CSS (`transition-all duration-300`, opacite, largeur)

**Nouveau hook `src/pages/home/useEntryHover.ts`** :
- Gere l'etat `hovered` et les handlers `onMouseEnter` / `onMouseLeave`
- Retourne aussi les fonctions de navigation

**Modification de `src/pages/home/index.tsx`** :
- Remplacer le `<button>` par `<EntryButton />`

### Fichiers concernes
- `src/pages/home/EntryButton.tsx` (creation)
- `src/pages/home/useEntryHover.ts` (creation)
- `src/pages/home/index.tsx` (remplacement du bouton)

