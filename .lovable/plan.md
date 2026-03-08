

## Page d'accueil -- Landing epuree avec logo central

### Concept
Remplacer le contenu actuel de la page d'accueil par une page de type "landing" minimaliste : fond clair/blanc, le logo UNSAgglo centre au milieu de l'ecran, et un unique bouton "Entrer" en dessous. Pas de Navbar, pas de Footer, pas de sections supplementaires.

### Implementation

1. **Copier le logo** depuis `user-uploads://UNSA_1.png` vers `src/assets/unsa-logo.png`

2. **Recrire `src/pages/home/index.tsx`**
   - Supprimer PageWrapper (donc pas de Navbar/Footer sur cette page)
   - Plein ecran (`min-h-screen`), fond blanc, centrage vertical + horizontal via flexbox
   - Import du logo depuis `@/assets/unsa-logo.png`
   - Logo affiche en grande taille (environ 280px sur desktop, 200px sur mobile)
   - Bouton "Entrer" en dessous, style primary, qui redirige vers `/news` (ou la premiere page active)
   - Conserver les MetaTags pour le SEO

3. **Fichiers concernes**
   - `src/assets/unsa-logo.png` -- nouveau (copie du logo)
   - `src/pages/home/index.tsx` -- reecrit en landing minimale

Le reste du site (Navbar, Footer, autres pages) reste inchange. Seule la page d'accueil devient cette vitrine epuree.

