

## Effets d'arriere-plan bleu sur la page d'accueil

Ajouter plusieurs formes decoratives floues en arriere-plan utilisant la couleur bleue du logo (`--color-cyan` / `#47b6a8`) pour creer de la profondeur et du dynamisme, tout en gardant le fond blanc.

### Modifications sur `src/pages/home/index.tsx`

Ajouter 3-4 cercles/ellipses decoratifs en position absolute avec des proprietes variees :

1. **Grand cercle en haut a droite** : ~600px, cyan, opacity-10, blur-[100px]
2. **Cercle moyen en bas a gauche** : ~400px, cyan, opacity-8, blur-[80px]
3. **Petit cercle en haut a gauche** : ~250px, cyan, opacity-6, blur-[60px]
4. **Remplacer** le cercle existant (ligne 25) par ces nouvelles formes

Chaque forme aura des positions differentes pour un rendu organique et vivant. Toutes en `pointer-events-none` et `z-0`.

Fichier unique : `src/pages/home/index.tsx`

