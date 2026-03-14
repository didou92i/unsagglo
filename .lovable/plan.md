

## Erreurs critiques identifiees

Apres scan de securite complet et verification de la base, voici les problemes classes par severite.

---

### 1. Triggers toujours absents (CRITIQUE)

La requete sur `information_schema.triggers` retourne **zero resultat**. La migration precedente n'a pas ete appliquee. Consequence :
- **Les nouveaux inscrits n'ont pas de profil** : `handle_new_user()` n'est jamais appelee
- **`updated_at` ne se met jamais a jour** sur `profiles`

**Correction** : Recreer la migration SQL pour attacher les deux triggers.

---

### 2. Donnees personnelles des adherents exposees (CRITIQUE -- securite)

La politique RLS `"Authenticated users can view adherents"` avec `USING (true)` permet a **tout utilisateur connecte** de lire les noms, emails et telephones de tous les adherents. Seuls les admins devraient y avoir acces.

**Correction** : Supprimer la politique `"Authenticated users can view adherents"`. La politique `"Admins can select all adherents"` existante suffit.

---

### 3. Contributions anonymes visibles par tous (SECURITE -- moyen)

La politique `"Authenticated users can view contributions"` avec `USING (true)` expose le prenom et service des contributions marquees comme anonymes a tout utilisateur connecte.

**Correction** : Restreindre le SELECT aux admins uniquement, ou filtrer pour masquer les champs identifiants quand `anonyme = true`.

---

### 4. Protection mots de passe compromis desactivee (SECURITE -- moyen)

La verification des mots de passe compromis (leaked password protection) est desactivee dans la configuration d'authentification.

**Correction** : Activer via la configuration auth.

---

### 5. Politiques INSERT trop permissives (SECURITE -- faible)

6 politiques INSERT utilisent `WITH CHECK (true)` sur les tables publiques (`contact_messages`, `page_visits`, `candidats_liste`, `sondage_votes`, `adherents`, `contributions_elections`). C'est intentionnel pour les formulaires publics, mais a documenter.

---

### Plan d'implementation

| # | Severite | Action | Type |
|---|----------|--------|------|
| 1 | CRITIQUE | Creer migration SQL pour les 2 triggers (`on_auth_user_created` + `update_profiles_updated_at`) | Migration SQL |
| 2 | CRITIQUE | Supprimer la politique `"Authenticated users can view adherents"` | Migration SQL |
| 3 | MOYEN | Remplacer la politique contributions par un acces admin-only ou filtrer les anonymes | Migration SQL |
| 4 | MOYEN | Activer leaked password protection | Config auth |
| 5 | FAIBLE | Aucune action requise (comportement voulu pour formulaires publics) | -- |

**Estimation** : 1 migration SQL (points 1-3), 1 appel config auth (point 4), zero changement frontend.

