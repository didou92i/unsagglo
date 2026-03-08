

## Corriger la visibilite des avions en arriere-plan

Les avions sont presents dans le code mais invisibles a l'ecran car ils sont trop petits et trop transparents.

### Modifications dans `src/pages/home/FlyingPlanes.tsx`

- Augmenter les tailles : `w-10` vers `w-20`, `w-14` vers `w-28`, `w-8` vers `w-16`
- Augmenter les opacites : `0.08` vers `0.18`, `0.12` vers `0.25`, `0.10` vers `0.20`
- Augmenter le `strokeWidth` du SVG de `1.5` a `2` et le `fillOpacity` de `0.15` a `0.3` pour un trace plus visible

Cela rendra les avions subtils mais visibles, coherents avec l'esthetique existante.

