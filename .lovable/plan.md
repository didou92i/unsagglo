

## Le hover sur le logo ne fonctionne pas

Le probleme : `transition-transform` + `hover:[transform:rotateY(360deg)]` ne produit pas d'effet visible car :
1. Il n'y a pas de `perspective` sur le conteneur parent, donc la rotation 3D est aplatie
2. Une transition CSS de `rotateY(0)` a `rotateY(360deg)` est interpretee comme "pas de changement" par le navigateur (0 et 360 sont visuellement identiques)

### Correction

**`src/index.css`** : Ajouter un keyframe `spin-y` qui fait une rotation Y complete.

```css
@keyframes spin-y {
  from { transform: rotateY(0deg); }
  to { transform: rotateY(360deg); }
}
```

**`tailwind.config.ts`** : Ajouter l'animation `spin-y` dans `extend.animation` et `extend.keyframes`.

**`src/pages/home/index.tsx`** :
- Remplacer `transition-transform duration-700 hover:[transform:rotateY(360deg)]` par `hover:animate-[spin-y_0.8s_ease-in-out]`
- Ajouter `[perspective:800px]` sur le `div` parent pour l'effet 3D

### Fichiers concernes
- `src/index.css` (keyframe)
- `src/pages/home/index.tsx` (classes du logo et perspective parent)

