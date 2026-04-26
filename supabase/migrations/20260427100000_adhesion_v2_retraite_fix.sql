-- Hotfix Lot 1C-2 — fiabilise l'ajout du statut "retraite"
--
-- Le hotfix précédent (20260426130000_adhesion_v2_retraite.sql) faisait
-- DROP CONSTRAINT IF EXISTS adherents_statut_pro_check, mais Postgres
-- nomme automatiquement les contraintes CHECK inline, et le nom auto-
-- généré peut ne pas correspondre à ce nom canonique. Résultat possible :
-- la contrainte d'origine reste, on ajoute une seconde contrainte qui
-- accepte 'retraite', mais Postgres applique TOUTES les contraintes en
-- AND → 'retraite' échoue toujours sur la première contrainte.
--
-- Cette migration scanne pg_constraint pour droper toutes les contraintes
-- CHECK qui mentionnent 'statut_pro' sur la table adherents, puis recrée
-- la bonne contrainte avec un nom explicite.

DO $$
DECLARE
  cname text;
BEGIN
  FOR cname IN
    SELECT con.conname
    FROM pg_constraint con
    JOIN pg_class cl ON cl.oid = con.conrelid
    JOIN pg_namespace ns ON ns.oid = cl.relnamespace
    WHERE ns.nspname = 'public'
      AND cl.relname = 'adherents'
      AND con.contype = 'c'
      AND pg_get_constraintdef(con.oid) ILIKE '%statut_pro%'
  LOOP
    EXECUTE format('ALTER TABLE public.adherents DROP CONSTRAINT %I', cname);
  END LOOP;
END $$;

ALTER TABLE public.adherents
  ADD CONSTRAINT adherents_statut_pro_check
    CHECK (statut_pro IS NULL OR statut_pro IN (
      'titulaire',
      'stagiaire',
      'contractuel_cdi',
      'contractuel_cdd',
      'apprenti',
      'retraite'
    ));
