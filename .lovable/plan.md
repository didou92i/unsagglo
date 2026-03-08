

## Supprimer l'animation des avions

L'animation ne fonctionne pas correctement. Suppression propre sans impact sur le reste de la page d'accueil.

### Actions

1. **Supprimer le fichier SVG**
   - `src/assets/flying-planes.svg`

2. **Supprimer le composant FlyingPlanes**
   - `src/pages/home/FlyingPlanes.tsx`

3. **Retirer l'import et l'utilisation dans la page d'accueil**
   - `src/pages/home/index.tsx` : supprimer l'import de `FlyingPlanes` et le composant `<FlyingPlanes />`

4. **Nettoyer les animations inutilisees dans le CSS**
   - `src/index.css` : supprimer les keyframes `fly-across` et les classes `.animate-fly-1/2/3`

### Fichiers concernes
- `src/assets/flying-planes.svg` (suppression)
- `src/pages/home/FlyingPlanes.tsx` (suppression)
- `src/pages/home/index.tsx` (modification)
- `src/index.css` (nettoyage)

