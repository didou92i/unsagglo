

## Diagnostic

Sur la capture, le hero occupe 100vh (`min-h-screen`) avec le logo centré verticalement. Le ciel blanc de l'image de fond domine la moitié supérieure, créant un vide froid entre la navbar et le logo.

## Ce qu'un web designer ferait

Un designer casserait cette monotonie blanche avec **un bandeau navy/secondary en haut qui prolonge visuellement la navbar**, créant une transition douce vers l'image de fond. Concrètement :

### Solution proposée : Dégradé overlay du haut vers le bas

Ajouter un **overlay en dégradé** par-dessus l'image de fond, allant du `secondary` (navy) en haut vers transparent en bas. Cela :
- Prolonge visuellement la navbar dans le hero
- Casse le blanc froid du ciel
- Crée une ambiance plus chaleureuse et cohérente avec l'identité navy/cyan
- Fait mieux ressortir le logo grâce au contraste

### Changements techniques

**Fichier : `src/pages/home/index.tsx`**

Ajouter un `div` overlay avec un dégradé entre l'image de fond et le contenu :

```tsx
{/* Après l'image cityBg, avant WaveBackground */}
<div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-secondary/80 via-secondary/30 to-transparent" />
```

Et ajuster le z-index du logo et bouton pour qu'ils restent au-dessus (déjà `z-10`, c'est bon).

### Résultat visuel attendu

```text
┌──────────────────────────────┐
│  NAVBAR (navy)               │
├──────────────────────────────┤
│  ████ Navy 80% ████████████  │  ← dégradé navy dense
│  ████ Navy 30% ████████████  │  ← transition
│         LOGO                 │  ← logo bien visible
│       [ENTRER]               │
│  ░░░ transparent ░░░░░░░░░░  │  ← image de ville visible
│  ≈≈≈ vagues SVG ≈≈≈≈≈≈≈≈≈≈  │
└──────────────────────────────┘
```

Un seul div à ajouter, zero changement structurel.

