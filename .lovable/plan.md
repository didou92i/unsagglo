
## Remplacer le SVG des avions par la version transparente

Le nouveau SVG fourni n'a plus les rectangles blancs de fond qui masquaient les avions.

### Actions

1. **Copier le nouveau SVG** dans `src/assets/flying-planes.svg` (remplace l'ancien)

2. **Ajuster le composant `FlyingPlanes.tsx`** si necessaire pour optimiser l'affichage:
   - Verifier que l'opacite est suffisante (actuellement 30%)
   - Conserver l'animation `animate-fly-1` existante

### Fichiers concernes
- `src/assets/flying-planes.svg` (remplacement)
- `src/pages/home/FlyingPlanes.tsx` (ajustements mineurs si necessaire)
