

## Animation d'expansion du bouton "Visiteur"

Ajouter une animation qui etend le bouton "Visiteur" vers la droite au survol, affichant un panneau de texte avec un message participatif et un CTA.

### Architecture

```text
┌──────────────┐     hover      ┌───────────────────────────────────────────┐
│   Visiteur   │  ───────────►  │   Visiteur  │  Message + CTA              │
└──────────────┘                └───────────────────────────────────────────┘
```

### Modifications

**1. Hook `useEntryHover.ts`**
- Ajouter un etat `visiteurExpanded` pour gerer l'expansion du bouton Visiteur
- Ajouter handlers `onVisiteurEnter` / `onVisiteurLeave`
- Ajouter navigation vers `/elections` pour le CTA participatif

**2. Composant `EntryButton.tsx`**
- Envelopper le bouton "Visiteur" dans un conteneur avec gestion du hover
- Afficher conditionnellement un panneau de texte a droite avec:
  - Le message sur la participation
  - Un bouton CTA "J'accede a la plateforme participative"
- Animation fluide d'expansion (width + opacity)

### Comportement
- Au survol de "Visiteur": le panneau s'etend vers la droite avec le texte
- Au clic sur le CTA: navigation vers `/elections`
- Au sortie du survol: le panneau se retracte

