

## Modifications sur `src/pages/home/index.tsx`

### 1. Bouton "Entrer" transparent avec contour #009de6
- Fond transparent, bordure 2px `#009de6`, texte `#009de6`
- Hover : leger remplissage semi-transparent

### 2. Effets de fond : vagues dynamiques en #009de6
Remplacer les 3 cercles statiques par un effet de vague anime :
- Creer un composant `src/pages/home/WaveBackground.tsx` avec des formes ondulees animees via CSS keyframes
- Utiliser `#009de6` au lieu de `var(--color-cyan)`
- Animations CSS de mouvement lateral lent pour simuler des vagues dynamiques (2-3 couches avec des vitesses differentes)

### 3. Animations CSS dans `src/index.css`
Ajouter les keyframes `wave-drift` pour le mouvement horizontal oscillant des vagues.

### Fichiers concernes
- `src/pages/home/index.tsx` : bouton + integration vagues
- `src/pages/home/WaveBackground.tsx` : nouveau composant vagues animees
- `src/index.css` : keyframes wave

