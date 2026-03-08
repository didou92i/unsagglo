

## Refonte visuelle de la popup Visiteur

Le panneau actuel est mal positionne et visuellement desequilibre. Voici une approche plus elegante.

### Nouvelle approche

Au lieu d'un panneau qui s'etend a droite (decentre et coupe par l'ecran), utiliser un **AlertDialog/Modal** qui s'ouvre au centre de l'ecran au clic sur "Visiteur".

### Avantages
- Toujours centre et lisible
- Compatible mobile
- Plus professionnel et moins intrusif
- Meilleure hierarchie visuelle

### Modifications

**1. `VisiteurExpanded.tsx` (refonte complete)**
- Utiliser `AlertDialog` de Radix UI (deja installe)
- Design epure avec fond blanc, bordure subtile, ombrage leger
- Texte bien espace avec accents corrects
- Bouton CTA primaire en bas
- Bouton de fermeture discret

**2. `EntryButton.tsx`**
- Remplacer le hover par un clic pour ouvrir le dialog
- Supprimer les handlers `onVisiteurEnter` / `onVisiteurLeave`

**3. `useEntryHover.ts`**
- Remplacer `visiteurExpanded` par `visiteurOpen` / `setVisiteurOpen`
- Ajouter `openVisiteur` et `closeVisiteur` handlers

### Design du dialog
- Fond blanc avec backdrop blur
- Padding genereux (p-8)
- Texte centre avec bonne typographie
- Accents corrects dans le texte francais
- Bouton arrondi primaire avec icone fleche

