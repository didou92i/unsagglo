
-- 1. Re-create trigger on auth.users for profile creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 2. Fix RLS policies: drop restrictive, recreate as permissive
DROP POLICY IF EXISTS "Public adhesion insert" ON public.adherents;
CREATE POLICY "Public adhesion insert" ON public.adherents
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public contribution insert" ON public.contributions_elections;
CREATE POLICY "Public contribution insert" ON public.contributions_elections
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);
