

## Moderniser le design de la page d'accueil

La page actuelle est fonctionnelle mais trop basique (fond blanc uni, logo + bouton sans style). Voici les ameliorations proposees :

### Modifications sur `src/pages/home/index.tsx`

1. **Fond avec degradee subtil** : remplacer le fond blanc par un degradee radial navy-vers-bleu-fonce pour un effet premium
2. **Logo avec effet glow** : ajouter une ombre lumineuse (drop-shadow cyan) autour du logo pour le faire ressortir sur le fond sombre
3. **Logo plus grand** : passer a 240px mobile / 320px desktop
4. **Bouton modernise** : style outline blanc/transparent avec bordure, effet hover lumineux, lettres espacees (tracking-widest), taille plus imposante
5. **Animation d'entree** : ajouter une animation CSS fade-in + slide-up sur le logo et le bouton (avec un leger delai entre les deux)
6. **Particule decorative** : un cercle flou en arriere-plan (blur) en couleur cyan pour ajouter de la profondeur

### Fichier `src/index.css`
- Ajouter les keyframes pour l'animation fade-in-up

### Resultat visuel
- Fond sombre elegant (navy)
- Logo lumineux centre
- Bouton "Entrer" aerien avec bordure blanche
- Animations douces au chargement

