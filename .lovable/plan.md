

## Page d'accueil -- Fond blanc + bouton turquoise

Modifier `src/pages/home/index.tsx` :

1. Fond : `bg-white` au lieu de `bg-[var(--color-navy)]`
2. Particule decorative : garder le cercle flou cyan mais avec opacite tres faible (opacity-5)
3. Logo : retirer le drop-shadow cyan (inutile sur fond clair), garder la taille actuelle
4. Bouton "Entrer" : fond `bg-[var(--color-cyan)]` texte blanc, bordure supprimee, coins arrondis (rounded-full), hover avec opacite ou shadow subtile
5. Conserver les animations fade-in-up

Fichier unique : `src/pages/home/index.tsx`

