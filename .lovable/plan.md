

## Audit qualite des implementations recentes

Apres revue complete du code de la plateforme participative et de l'admin sondages, voici les constats :

### Points positifs
- Typage TypeScript strict, interfaces declarees pour tous les props
- Hooks extraits correctement (logique metier hors TSX)
- Fichiers < 100 lignes respecte partout
- RLS policies coherentes (lecture publique sondages actifs, gestion admin)
- Fonction `vote_sondage` atomique avec protection contre les doublons
- Routing avec `PageGuard` et lazy loading en place
- `useEntryHover` redirige bien vers `/plateforme`

### Problemes identifies

**1. SondagesManager.tsx depasse 100 lignes (130 lignes)**
Le fichier contient trop de logique d'affichage avec les 4 vues (list/create/edit/results). Il faut extraire la vue liste dans un sous-composant.

**2. SondageForm.tsx depasse 100 lignes (113 lignes)**
Le formulaire est un peu long. La liste des themes est dupliquee entre `SondageForm.tsx` et `ContribSection.tsx` -- elle devrait etre centralisee dans un fichier de constantes partage.

**3. ContribSection.tsx depasse 100 lignes (103 lignes)**
Legere infraction. Le schema Zod + constantes pourraient etre extraits.

**4. Navbar.tsx est a 96 lignes**
Proche de la limite, mais acceptable.

**5. Themes dupliques**
La liste des themes (`remuneration`, `conditions_travail`, `carriere`, `rps`, `autre`) est definie en dur dans 3 fichiers : `SondageForm.tsx`, `ContribSection.tsx`, et potentiellement `elections/ContribForm.tsx`.

**6. Pas de toast/notification apres creation de sondage admin**
L'admin ne recoit aucun feedback visuel (toast) apres creation/modification/toggle d'un sondage.

**7. Pas de gestion d'erreur dans useAdminSondages**
Les appels Supabase dans `create`, `update`, `toggleActif` ne remontent pas les erreurs a l'utilisateur.

### Plan de correction

1. **Extraire les constantes themes** dans `src/constants/themes.ts` et les importer dans les 3 fichiers concernes
2. **Refactorer SondagesManager** : extraire la vue liste dans `SondagesList.tsx` pour passer sous 100 lignes
3. **Extraire le schema Zod** de ContribSection dans un fichier separe `src/pages/plateforme/contribSchema.ts`
4. **Ajouter des toasts** dans `useAdminSondages` pour le feedback utilisateur (succes/erreur)
5. **Gerer les erreurs** dans les operations CRUD du hook admin

### Fichiers a modifier
- Creer `src/constants/themes.ts`
- Creer `src/pages/admin/SondagesList.tsx` (extraction)
- Creer `src/pages/plateforme/contribSchema.ts`
- Modifier `src/pages/admin/SondagesManager.tsx` (refacto < 100 lignes)
- Modifier `src/pages/plateforme/ContribSection.tsx` (refacto < 100 lignes)
- Modifier `src/pages/admin/SondageForm.tsx` (import themes)
- Modifier `src/hooks/useAdminSondages.ts` (ajouter toasts + error handling)

