

## Audit de synchronisation Admin / Donnees

### Ce qui fonctionne correctement

| Donnee collectee | Table DB | Onglet Admin | Statut |
|---|---|---|---|
| Adhesions (`/membership`) | `adherents` | AdherentsManager | OK |
| Articles | `articles` | ArticlesManager | OK |
| Sondages + votes | `sondages`, `sondage_options`, `sondage_votes` | SondagesManager | OK |
| Candidats liste electorale (`/plateforme`) | `candidats_liste` | CandidatsManager | OK |
| Visites pages | `page_visits` | VisitsStats | OK |
| Visibilite pages | `site_settings` | PagesManager | OK |

### Ce qui manque

**1. Onglet Contributions manquant**
La table `contributions_elections` recoit les contributions du formulaire `/plateforme`, mais il n'existe **aucun onglet admin** pour les consulter. Les donnees arrivent en base mais sont invisibles pour l'administrateur.

**2. Toggle "Plateforme" manquant dans PagesManager**
Le `site_settings` contient bien la cle `page_plateforme` (visible dans les requetes reseau), mais le composant `PagesManager.tsx` ne l'inclut pas dans sa liste `PAGES`. L'admin ne peut donc pas desactiver la page `/plateforme`.

**3. Contact non stocke (par conception)**
Le formulaire de contact envoie vers un webhook externe (n8n) et ne stocke rien en base. C'est un choix d'architecture -- pas un bug -- mais a noter.

### Plan de correction

#### Tache 1 : Creer un onglet "Contributions" dans l'admin

- Creer `src/hooks/useAdminContributions.ts` : hook qui charge `contributions_elections` avec tri par date
- Creer `src/pages/admin/ContributionsManager.tsx` : tableau affichant prenom, service, theme, contenu (tronque), anonyme (badge), date
- Ajouter l'onglet dans `src/pages/admin/index.tsx` entre "Candidats liste" et "Statistiques"

#### Tache 2 : Ajouter le toggle "Plateforme" dans PagesManager

- Ajouter `{ key: "page_plateforme", label: "Plateforme participative", description: "/plateforme" }` dans le tableau `PAGES` de `PagesManager.tsx`

### Fichiers concernes

| Fichier | Action |
|---|---|
| `src/hooks/useAdminContributions.ts` | Nouveau |
| `src/pages/admin/ContributionsManager.tsx` | Nouveau |
| `src/pages/admin/index.tsx` | Ajouter onglet Contributions |
| `src/pages/admin/PagesManager.tsx` | Ajouter toggle page_plateforme |

