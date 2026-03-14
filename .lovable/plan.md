

## Plan : Réduire l'opacité de l'image de fond

L'opacité actuelle de l'image de ville en arrière-plan est à **20%** (`opacity-20`). Tu souhaites la diminuer de 10%, soit passer à **10%** d'opacité (`opacity-10`).

### Changement à effectuer

Fichier : `src/pages/home/index.tsx`

```tsx
// AVANT (ligne ~25)
className="absolute inset-0 w-full h-full object-cover object-center opacity-20 pointer-events-none z-0"

// APRÈS
className="absolute inset-0 w-full h-full object-cover object-center opacity-10 pointer-events-none z-0"
```

Ce changement rendra l'image de ville plus discrète, laissant davantage le blanc du fond dominer visuellement.

