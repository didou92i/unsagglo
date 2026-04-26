-- Correctif : ajout du statut "retraite" exigé par l'Art. 4 des statuts UNSAgglo
ALTER TABLE public.adherents
  DROP CONSTRAINT IF EXISTS adherents_statut_pro_check;

ALTER TABLE public.adherents
  ADD CONSTRAINT adherents_statut_pro_check
    CHECK (statut_pro IN (
      'titulaire',
      'stagiaire',
      'contractuel_cdi',
      'contractuel_cdd',
      'apprenti',
      'retraite'
    ));
