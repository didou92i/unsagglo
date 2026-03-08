

## Deplier le contenu au survol dans le tableau des contributions

### Approche

Utiliser un `HoverCard` (Radix, deja installe) sur la cellule "Contenu" du tableau admin. Au survol du texte tronque, un popover s'affiche avec le contenu integral.

### Modifications

**1. Extraire un composant `ContribContentCell.tsx`** (nouveau fichier dans `src/pages/admin/`)
- Importe `HoverCard`, `HoverCardTrigger`, `HoverCardContent` depuis `@/components/ui/hover-card`
- Le trigger affiche le texte tronque (80 chars)
- Le content affiche le texte complet dans un `ScrollArea` (max-h-60) avec largeur confortable (w-96)
- Si le texte fait moins de 80 chars, pas de HoverCard, affichage direct

**2. Modifier `ContributionsManager.tsx`**
- Remplacer `<TableCell>{truncate(c.contenu)}</TableCell>` par `<ContribContentCell text={c.contenu} />`
- Supprimer la fonction `truncate` (deplacee dans le nouveau composant)

Resultat : au survol d'un contenu tronque, une carte apparait avec le texte integral, sans clic necessaire.

