

## Ameliorations visuelles de la page /plateforme

### Constats actuels

1. **Hero** : visuellement correct avec waves + stats, mais les compteurs sont statiques (pas d'animation de comptage), le bouton CTA manque de poids visuel
2. **Section Contribution** : formulaire brut sur fond `bg-muted`, pas d'element graphique, pas d'icone, textes sans accents
3. **Section Sondages** : grille basique de cartes, pas de distinction visuelle entre themes, pas d'icone
4. **Transitions entre sections** : pas de separateur visuel ni de transition douce
5. **Accents manquants** dans les textes ("Deposez", "idees", "thematiques", "cles")

### Plan d'ameliorations

#### 1. Compteurs animes dans le Hero
Creer un hook `useCountUp.ts` qui anime un nombre de 0 a la valeur cible sur ~1.5s. L'utiliser dans `StatItem` de `PlatformHero.tsx` pour que les chiffres s'incrementent a l'affichage.

#### 2. CTA Hero plus visible
Remplacer le bouton outline transparent par un bouton plein `bg-primary text-white` avec un effet hover (scale + shadow). Ajouter un second CTA outline "Voir les sondages" pointant vers `#sondages`.

#### 3. Section Contribution : habillage visuel
- Ajouter une icone Lucide `MessageSquarePlus` a cote du titre
- Encadrer le formulaire dans une `UCard` avec une bordure subtile a gauche en `--color-primary`
- Corriger tous les accents manquants

#### 4. Section Sondages : icones par theme + fond alterne
- Ajouter `id="sondages"` sur la section pour l'ancre
- Fond `bg-muted` pour alterner visuellement avec la section contribution (fond blanc)
- Ajouter une icone Lucide dans chaque `SondageCard` selon le theme (mapping theme -> icone)
- Corriger les accents

#### 5. Separateurs entre sections
Ajouter un composant `WaveDivider` (SVG simple) entre Hero/Contrib et Contrib/Sondages pour des transitions fluides.

#### 6. Accents
Corriger les textes dans `PlatformHero`, `ContribSection`, `SondageSection`, `ContribSuccess`, `ListeElectoraleInline`.

### Fichiers concernes

| Fichier | Modifications |
|---------|--------------|
| `src/hooks/useCountUp.ts` | Nouveau hook animation compteur |
| `src/pages/plateforme/PlatformHero.tsx` | Compteurs animes, double CTA, accents |
| `src/pages/plateforme/ContribSection.tsx` | Icone titre, formulaire en UCard, accents |
| `src/pages/plateforme/SondageSection.tsx` | Fond alterne, id ancre, accents |
| `src/pages/plateforme/SondageCard.tsx` | Icone par theme |
| `src/pages/plateforme/ContribSuccess.tsx` | Accents |
| `src/pages/plateforme/ListeElectoraleInline.tsx` | Accents |
| `src/pages/plateforme/WaveDivider.tsx` | Nouveau composant separateur SVG |
| `src/pages/plateforme/index.tsx` | Integrer les WaveDivider entre sections |

