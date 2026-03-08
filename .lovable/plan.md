

## Avions en arriere-plan -- plan revise pour coherence visuelle

### Principe
3 avions SVG minimalistes traversant l'ecran horizontalement, en bleu `#009de6` (couleur primaire de la charte) avec une opacite tres faible (8-15%), coherent avec les vagues existantes.

### Fichiers

**Nouveau `src/pages/home/FlyingPlanes.tsx`** (~50 lignes)
- 3 avions SVG inline (silhouette simple, stroke uniquement, couleur `#009de6`)
- Positionnement absolu, `pointer-events-none`, `z-[1]`
- Chaque avion a un `top` different (15%, 30%, 45%) et une opacite differente (0.08, 0.12, 0.10)
- Tailles variees (w-8, w-12, w-6)
- Classes d'animation `animate-fly-1`, `animate-fly-2`, `animate-fly-3`

**`src/index.css`** -- ajouter keyframes et classes
- Keyframe `fly-across`: `translateX(-10vw)` vers `translateX(110vw)` lineaire infini
- 3 classes avec durees decalees (18s, 25s, 22s) et delais (0s, -8s, -15s)

**`src/pages/home/index.tsx`**
- Importer et inserer `<FlyingPlanes />` apres `<WaveBackground />`

