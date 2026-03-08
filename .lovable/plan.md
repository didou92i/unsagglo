

## Deplacer les vagues en haut (effet nuages mouvants)

### Modifications

**`src/pages/home/WaveBackground.tsx`** :
- Remplacer `bottom-0` par `top-0` sur les 3 SVG pour les ancrer en haut
- Inverser verticalement les paths SVG avec `scale-y-[-1]` (Tailwind) pour que les courbes ondulent vers le bas comme des nuages
- Les animations existantes restent identiques

**`src/index.css`** : aucun changement necessaire, les animations `wave-drift` fonctionnent deja horizontalement.

