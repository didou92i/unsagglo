

## Ajouter une rotation 360 au survol du logo

Le logo a deja `transition-transform duration-500 hover:scale-105`. Il suffit de remplacer `hover:scale-105` par une animation CSS personnalisee qui effectue une rotation Y 360 (effet "flip 3D") au survol, tout en conservant le scale subtil.

### Approche

**`src/index.css`** (ou `tailwind.config.ts`) : Ajouter une animation keyframe `spin-y` qui fait `rotateY(0)` vers `rotateY(360deg)`.

**`src/pages/home/index.tsx`** ligne 34 : Remplacer `hover:scale-105` par `hover:animate-spin-y` et ajouter `perspective` sur le parent ou via style pour l'effet 3D.

### Alternative plus simple (CSS pure via Tailwind)

Utiliser `hover:[transform:rotateY(360deg)]` avec `transition-transform duration-700` directement dans le className -- pas besoin de keyframes, la transition gere le mouvement fluide.

### Fichiers concernes
- `src/pages/home/index.tsx` (modifier className du logo)

