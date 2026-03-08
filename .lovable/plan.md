

## Diagnostic

Le replay de session montre que le logo et le bouton s'affichent bien. Le probleme concerne les **effets d'arriere-plan** : avec des opacites de 6-10% sur fond blanc et un flou de 60-100px, ils sont quasiment invisibles.

## Correction sur `src/pages/home/index.tsx`

Augmenter significativement la visibilite des cercles decoratifs :

1. **Grand cercle (haut droite)** : passer de `opacity-10` a `opacity-20`, reduire le blur a `blur-[80px]`
2. **Cercle moyen (bas gauche)** : passer de `opacity-[0.08]` a `opacity-[0.18]`, reduire le blur a `blur-[60px]`
3. **Petit cercle (haut gauche)** : passer de `opacity-[0.06]` a `opacity-[0.15]`, reduire le blur a `blur-[50px]`

Cela rendra les effets bleus nettement visibles tout en restant subtils et elegants sur le fond blanc.

Fichier unique : `src/pages/home/index.tsx` (lignes 25-27)

