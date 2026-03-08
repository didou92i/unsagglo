

## Ameliorations pour la page /elections

Apres analyse, voici les points a ameliorer :

### 1. Accents manquants dans les textes
Tous les textes sont sans accents ("Decembre", "Remuneration", "equitable", "Selectionnez", etc.). Corriger les accents partout : titre hero, badge, engagements, timeline, formulaire, schema de validation.

### 2. Les ancres `#contribution` et `#programme` ne scrollent pas en douceur
Les CTA du hero pointent vers `#programme` et `#contribution` mais le `HeroBanner` utilise `<Link to=...>` de react-router, ce qui ne gere pas le scroll vers les ancres internes. Remplacer par un `onClick` avec `document.getElementById().scrollIntoView({ behavior: 'smooth' })` ou ajouter `scroll-behavior: smooth` au CSS global et utiliser des `<a href>` classiques.

### 3. Icones sur les cartes d'engagements
Les 4 cartes d'engagements sont du texte brut sans element visuel. Ajouter une icone Lucide pertinente par engagement (Euro, Building2, TrendingUp, ShieldAlert) pour rendre la section plus lisible.

### 4. Legende du calendrier
La timeline utilise des pastilles colorees (vert/bleu/gris) sans legende. Ajouter une petite legende sous la timeline : "En cours / A venir / Passe".

### 5. Bouton reset apres succes du formulaire
Apres l'envoi reussi, l'utilisateur voit le message de confirmation mais ne peut pas envoyer une nouvelle contribution. Ajouter un bouton "Envoyer une autre contribution" qui reset le formulaire.

### 6. Doublon de formulaire avec /plateforme
Le `ContribForm` de `/elections` utilise `useContribSubmit` (Supabase) mais le schema `contribSchema` de `useContrib.ts` est un doublon simplifie du schema de `/plateforme/contribSchema.ts`. Idealement, un seul schema partage -- mais cela peut etre traite separement.

### Fichiers concernes
- `src/pages/elections/index.tsx` -- accents, icones engagements, scroll smooth
- `src/pages/elections/ProgramSection.tsx` -- accents, legende timeline
- `src/pages/elections/ContribForm.tsx` -- accents, bouton reset
- `src/pages/elections/useContrib.ts` -- accents messages d'erreur
- `src/components/sections/HeroBanner.tsx` -- gestion ancres internes (scroll smooth)

### Detail technique

**HeroBanner** : detecter si `ctaPrimaryHref` commence par `#` ; si oui, rendre un `<button>` avec `scrollIntoView` au lieu d'un `<Link>`.

**Engagements** : ajouter un champ `icon` au tableau `ENGAGEMENTS` avec le nom du composant Lucide, et le rendre dans chaque `UCard`.

**Timeline legende** : un flex row sous la timeline avec 3 pastilles + labels.

**Reset formulaire** : dans l'ecran de succes, ajouter un `UButton` variant outline qui appelle un `reset()` remettant `success` a `false` et reinitialisant le formulaire via `useForm.reset()`.

