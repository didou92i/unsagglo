
Objectif: vous débloquer immédiatement l’accès à `/admin`.

Constat actuel (vérifié):
- Votre compte existe bien (`user_id = 2b079782-92e0-4213-aba6-97f7d6d01bed`).
- Votre profil existe dans `profiles`.
- Il n’existe **aucune ligne** dans `user_roles` pour ce `user_id`.
- Donc `has_role(..., 'admin')` renvoie `false`, ce qui masque le bouton Admin et bloque la page.

Plan d’implémentation:
1. Ajouter votre rôle admin en base
   - Créer une migration SQL idempotente qui insère:
     - `user_id = 2b079782-92e0-4213-aba6-97f7d6d01bed`
     - `role = 'admin'`
   - Utiliser `ON CONFLICT (user_id, role) DO NOTHING` pour éviter les doublons.

2. Vérifier la prise en compte côté application
   - Contrôler que `has_role('...','admin')` retourne `true`.
   - Recharger la session côté front (refresh ou reconnexion) pour afficher le bouton Admin.

3. Validation fonctionnelle
   - Vérifier l’accès à `/admin`.
   - Vérifier l’affichage des 3 onglets (Adhérents, Articles, Statistiques).
   - Vérifier qu’un non-admin reste redirigé vers `/`.

Détails techniques:
- La sécurité RBAC actuelle est correcte (table `user_roles` + fonction `has_role` + RLS admin).
- Le problème n’est pas dans le code React principal, mais dans la donnée de rôle manquante.
- Le trigger de création de profil n’est pas bloquant ici (le profil est déjà créé); seule l’affectation du rôle admin manque.
