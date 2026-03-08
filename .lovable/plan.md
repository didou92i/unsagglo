

# Plan : Page Administrateur

## Ce qui sera construit

Une page `/admin` accessible uniquement aux administrateurs, avec 3 fonctionnalites :

1. **Gestion des adherents** : Liste des adherents avec boutons pour valider (statut "actif") ou refuser (statut "resilie") chaque demande en attente
2. **Gestion des pages/articles** : Possibilite de publier ou masquer chaque article (toggle `publie`)
3. **Statistiques de visites** : Compteur de visites par page, stocke en base

## Modifications techniques

### 1. Base de donnees (migrations)

- **Table `user_roles`** : Creer une table de roles avec enum `app_role` (admin, user) + fonction `has_role()` SECURITY DEFINER pour eviter les boucles RLS
- **Table `page_visits`** : Creer une table pour tracker les visites (colonnes : page_path, visited_at, id)
- **RLS policies** : 
  - Admins peuvent UPDATE `adherents.statut` et `articles.publie`
  - Admins peuvent SELECT toutes les tables
  - `page_visits` : INSERT public (anon), SELECT admin seulement
- **Assigner le role admin** : INSERT initial du role admin pour votre user_id (vous devrez fournir votre user_id apres inscription)

### 2. Nouveaux fichiers

- `src/hooks/useAdmin.ts` : Hook qui verifie le role admin via `has_role()` RPC
- `src/hooks/usePageVisits.ts` : Hook qui enregistre une visite a chaque navigation
- `src/pages/admin/index.tsx` : Page principale admin avec 3 onglets (Tabs)
- `src/pages/admin/AdherentsManager.tsx` : Table des adherents avec boutons Valider/Refuser
- `src/pages/admin/ArticlesManager.tsx` : Table des articles avec toggle publier/masquer
- `src/pages/admin/VisitsStats.tsx` : Tableau de stats de visites par page

### 3. Fichiers modifies

- `src/App.tsx` : Ajouter route `/admin` protegee par `ProtectedRoute` + verification admin
- `src/components/layout/PageWrapper.tsx` : Appeler `usePageVisits` pour tracker chaque page vue
- `src/components/layout/Navbar.tsx` : Ajouter lien "Admin" visible uniquement pour les admins

### 4. Flux utilisateur

```text
Connexion → Verification role admin → /admin
  ├── Onglet "Adherents"  → Liste + Valider/Refuser
  ├── Onglet "Articles"   → Liste + Publier/Masquer
  └── Onglet "Statistiques" → Visites par page
```

