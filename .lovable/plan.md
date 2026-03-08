

## Plateforme pleine largeur

Le probleme vient du formulaire de contribution contraint a `max-w-lg` (32rem / 512px) et des sondages a `max-w-4xl` (56rem / 896px). Le `PageWrapper` et les sections elles-memes n'ont pas de contrainte de largeur -- c'est bien les contenus internes qui sont etroits.

### Modifications

**1. `ContribSection.tsx`** -- Elargir le formulaire
- Remplacer `max-w-lg` par `max-w-2xl` sur le `UCard` pour que le formulaire occupe plus d'espace

**2. `SondageSection.tsx`** -- Elargir la grille
- Remplacer `max-w-4xl` par `max-w-6xl` sur la grille des sondages
- Passer a 3 colonnes sur grand ecran : `lg:grid-cols-3`

**3. `PlatformHero.tsx`** -- Elargir le contenu du hero
- Remplacer `max-w-3xl` par `max-w-5xl` sur le conteneur texte
- Remplacer `max-w-2xl` par `max-w-3xl` sur le paragraphe descriptif

Ces changements permettent au contenu de respirer sur toute la largeur disponible sans supprimer le centrage.

