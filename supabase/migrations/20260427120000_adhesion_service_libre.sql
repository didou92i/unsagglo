-- =============================================
-- Champ 'service_libre' pour le cas "autre_service"
-- =============================================
-- Le formulaire d'adhésion utilise désormais un select structuré sur les
-- directions CARPF (cf. SERVICE_GROUPS dans le code). Quand l'agent
-- sélectionne "Autre service", un champ texte libre apparaît pour
-- préciser. La valeur de ce texte est stockée dans service_libre.
-- =============================================

ALTER TABLE public.adherents
  ADD COLUMN IF NOT EXISTS service_libre TEXT;

COMMENT ON COLUMN public.adherents.service_libre IS
  'Précision libre quand service = autre_service. Sinon NULL.';
