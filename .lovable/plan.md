

## Etat des lieux et ameliorations possibles

Apres audit complet du site, voici les axes d'amelioration identifies, classes par priorite :

---

### Priorite haute -- Fonctionnalites manquantes ou incompletes

| # | Constat | Impact |
|---|---------|--------|
| 1 | **Formulaire d'adhesion : champ Service est un simple texte libre** alors que le formulaire de contribution utilise le menu deroulant CARPF hierarchique (`SERVICE_GROUPS`). Incoherence UX et donnees non normalisees en base. | Donnees admin difficiles a filtrer/exploiter |
| 2 | **Adhesion : `useAdhesion.ts` est un mock** (setTimeout 1500ms, jamais utilise). Le vrai hook `useAdhesionSubmit.ts` existe et insere en base, mais `useAdhesion.ts` reste present et exporte un schema Zod duplique. Fichier mort a supprimer. | Code mort, confusion |
| 3 | **Admin AdherentsManager : pas de filtre par service/statut**, contrairement aux contributions qui ont maintenant 3 filtres. Les adherents n'ont que le compteur + export CSV. | Gestion difficile avec beaucoup d'adherents |
| 4 | **Admin AdherentsManager : le service affiche la valeur brute** (texte libre saisi par l'utilisateur) au lieu d'un label lisible. Si on normalise le champ service (point 1), il faudra un `serviceLabel()` comme pour les contributions. | Coherence affichage |

### Priorite moyenne -- UX et coherence

| # | Constat | Impact |
|---|---------|--------|
| 5 | **Pas de confirmation avant suppression** dans DocumentsManager (suppression directe au clic). | Risque de suppression accidentelle |
| 6 | **Espace membres : affiche `user.email`** au lieu du prenom/nom du profil. Le `ProfileCard` existe mais le header de la page utilise l'email brut. | UX impersonnelle |
| 7 | **Page d'accueil minimaliste** : logo + bouton "Entrer". Pas de preview des actualites, pas de stats, pas de call-to-action vers la plateforme ou l'adhesion. | Engagement faible |
| 8 | **`src/pages/Index.tsx` est un fichier mort** (fallback "Welcome to Your Blank App") jamais route. | Code mort |

### Priorite basse -- Technique

| # | Constat | Impact |
|---|---------|--------|
| 9 | **`DocItem` interface dupliquee** entre `DocumentsList.tsx` et `useDocumentsAdmin.ts` (champs differents). | DRY |
| 10 | **Pas de pagination** sur les listes admin (adherents, contributions, articles). Le max Supabase est 1000 lignes. | Scalabilite |

---

### Recommandation de prochaines etapes

**Etape 1** : Normaliser le champ Service du formulaire d'adhesion (remplacer le texte libre par le SelectField avec SERVICE_GROUPS, comme le formulaire de contribution). C'est le changement le plus impactant pour la qualite des donnees.

**Etape 2** : Nettoyer le code mort (`useAdhesion.ts`, `Index.tsx`).

**Etape 3** : Ajouter des filtres dans AdherentsManager (service, statut) en reutilisant le pattern de ContribFiltersBar.

**Etape 4** : Enrichir la page d'accueil avec des sections d'appel a l'action.

