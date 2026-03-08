

## Propositions d'ameliorations

Apres audit du code existant, voici les axes d'amelioration identifies, classes par priorite :

---

### 1. Navbar depasse 96 lignes et contient de la logique inline
Le composant `Navbar.tsx` melange filtrage de liens, gestion du menu mobile et rendu. Extraire un hook `useNavbar.ts` (gestion `isOpen`, `visibleLinks`) et un sous-composant `MobileMenu.tsx` pour respecter la contrainte des 100 lignes et la separation logique/rendu.

### 2. Style inline sur la page Home
`src/pages/home/index.tsx` (ligne 36) utilise un `style={{ filter: ... }}` en dur, ce qui viole la contrainte "zero inline styles". Remplacer par une classe Tailwind custom (via `tailwind.config.ts` extend ou `@layer utilities` dans `index.css`).

### 3. Formulaire de contact sans persistance en base
`useContact.ts` envoie un webhook n8n ou simule un delai, mais ne stocke rien en base. Si le webhook echoue, le message est perdu. Ajouter une table `contact_messages` pour persister les demandes et les afficher dans l'admin.

### 4. Formulaire d'adhesion sans notification toast
`useAdhesionSubmit.ts` ne montre pas de toast en cas de succes/erreur (contrairement a `useContribSubmit.ts` qui le fait). Harmoniser en ajoutant `toast.success()` et `toast.error()`.

### 5. Admin : pas de filtres sur les contributions
Le tableau des contributions affiche tout sans filtre. Ajouter des filtres par theme (groupe) et par statut pour faciliter l'exploitation des donnees quand le volume augmentera.

### 6. ProposalAssistant depasse 100 lignes
Le fichier fait 99 lignes mais est a la limite. Il melange logique (gestion input, handlers) et UI. Extraire un hook `useProposalAssistant.ts` pour anticiper toute evolution.

### 7. Composant succes duplique
`AdhesionForm.tsx` et `ContactForm.tsx` affichent chacun un bloc succes quasi-identique (SVG check + titre + sous-titre). Factoriser dans un composant `SuccessCard.tsx` reutilisable.

---

### Plan de realisation recommande

| Priorite | Tache | Fichiers concernes |
|----------|-------|--------------------|
| Haute | Supprimer le style inline sur Home | `home/index.tsx`, `index.css` ou `tailwind.config.ts` |
| Haute | Ajouter toasts a l'adhesion | `useAdhesionSubmit.ts` |
| Moyenne | Factoriser SuccessCard | Nouveau `SuccessCard.tsx`, `AdhesionForm.tsx`, `ContactForm.tsx` |
| Moyenne | Refactorer Navbar (hook + MobileMenu) | `Navbar.tsx`, nouveau `useNavbar.ts`, nouveau `MobileMenu.tsx` |
| Moyenne | Filtres admin contributions | `ContributionsManager.tsx`, nouveau `useContribFilters.ts` |
| Basse | Persister les messages contact en base | Migration DB, `useContact.ts`, admin |
| Basse | Extraire hook ProposalAssistant | `ProposalAssistant.tsx`, nouveau hook |

