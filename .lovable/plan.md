

## Plan : Finaliser l'enregistrement des emails et la génération PDF (page `/aide-carburant`)

### Contexte
La page `/aide-carburant` propose un simulateur d'éligibilité. À la fin, l'utilisateur éligible doit :
1. Saisir son email (avec consentement RGPD)
2. Recevoir son guide PDF personnalisé

Aujourd'hui, le composant `EmailCaptureModal` appelle deux RPC qui n'existent pas, la table de captation est manquante, et un build error bloque la compilation.

---

### État actuel

| Élément | Statut |
|---|---|
| Modal de captation email (`EmailCaptureModal.tsx`) | Présent |
| Générateur PDF complet 3 pages (`pdfGenerator.ts`) | Présent et complet |
| Hook `useCaptationSubmit` appelant 2 RPC Supabase | Présent mais RPC manquantes |
| Table `captations_aide_carburant` | **Manquante** |
| Table `simulator_funnel_events` (utilisée par `useFunnelTracking`) | **Manquante** |
| RPC `capture_aide_carburant_email` | **Manquante** |
| RPC `mark_aide_carburant_pdf_downloaded` | **Manquante** |
| Admin `CaptationsManager` qui lit `captations_aide_carburant` | Présent mais inutilisable |
| Build error `BlockingReason` ne contient pas `"status"` | **À corriger** |

---

### Étapes

**1. Migration SQL — créer les tables manquantes**

`captations_aide_carburant` :
- `id` (uuid, PK), `email` (text, lowercase, indexé)
- `eligibilite` (text : "Éligible" / "Non-éligible" / "À vérifier")
- `critere_bloquant` (text, nullable)
- `composition_foyer` (text, nullable), `profil_kilometrage` (text, nullable)
- `opt_in_newsletter` (boolean, default false)
- `pdf_telecharge` (boolean, default false), `pdf_telecharge_at` (timestamptz, nullable)
- `source` (text, default `"simulateur_aide_carburant"`)
- `statut_relance` (text, default `"Non contacté"`)
- `notes_internes` (text, nullable)
- `created_at`, `updated_at` (timestamptz)
- Contrainte unique sur `email` (un seul enregistrement par email — upsert)
- Trigger `update_updated_at_column` sur UPDATE

`simulator_funnel_events` :
- `id` (uuid), `session_id` (text, indexé), `step` (text), `created_at` (timestamptz)

**RLS** :
- `captations_aide_carburant` : `INSERT` et `UPDATE` interdits aux clients (seules les RPC SECURITY DEFINER écrivent). `SELECT/UPDATE/DELETE` réservés aux admins (`has_role(auth.uid(), 'admin')`).
- `simulator_funnel_events` : `INSERT` public (`anon` + `authenticated`), `SELECT` admin seulement.

**2. Migration SQL — créer les 2 RPC SECURITY DEFINER**

`capture_aide_carburant_email(p_email, p_eligibilite, p_critere_bloquant, p_opt_in_newsletter, p_composition_foyer, p_profil_kilometrage)` :
- Upsert sur `email` (conflit → mise à jour des champs sauf `pdf_telecharge` et `statut_relance`)
- Aucun RFR stocké (RGPD : commentaire dans la fonction le rappelle)

`mark_aide_carburant_pdf_downloaded(p_email)` :
- Met à jour `pdf_telecharge = true`, `pdf_telecharge_at = now()` pour l'email donné

**3. Corriger le build error TypeScript**

Dans `VerdictNotEligible.tsx`, retirer la clé `status` du `REASON_MESSAGES` car `BlockingReason` (défini dans `types.ts`) ne contient que `"vehicle" | "income" | "companyCar" | "distance"`. La référence à "Statut" dans les filtres admin est conservée (option historique).

**4. Régénérer les types Supabase**

Les types `src/integrations/supabase/types.ts` se mettent à jour automatiquement après migration — aucune action manuelle. Le hook `useCaptationSubmit` et `useCaptationsAdmin` deviendront alors typés correctement.

**5. Validation post-implémentation**

- Refaire le simulateur jusqu'au verdict éligible
- Saisir un email + cocher la case obligatoire → vérifier l'insertion dans `captations_aide_carburant`
- Vérifier que le PDF se télécharge (3 pages : synthèse, checklist, courrier type)
- Vérifier que `pdf_telecharge` passe à `true` après génération
- Vérifier que la page admin `/admin/captations` affiche bien la nouvelle entrée

---

### Fichiers créés/modifiés

| Fichier | Action |
|---|---|
| `supabase/migrations/...captations.sql` | Création tables + RPC + RLS |
| `src/pages/aide-carburant/simulator/VerdictNotEligible.tsx` | Retirer la clé `status` (build fix) |

Aucun autre fichier frontend ne nécessite de modification — le hook `useCaptationSubmit`, le modal `EmailCaptureModal`, et le générateur PDF sont déjà câblés correctement.

---

### Sécurité & RGPD
- RFR (revenu fiscal) jamais transmis ni stocké (commentaire RGPD préservé dans `useCaptationSubmit`)
- Email normalisé en minuscules avant insertion
- Écriture cliente uniquement via RPC SECURITY DEFINER (pas d'INSERT direct possible)
- Lecture des captations strictement réservée aux admins

