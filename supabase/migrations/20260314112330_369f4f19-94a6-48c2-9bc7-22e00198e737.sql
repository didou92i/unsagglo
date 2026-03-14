-- 1. Trigger profiles updated_at (le trigger on_auth_user_created existe deja)
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 2. Remove permissive policy exposing all adherents
DROP POLICY IF EXISTS "Authenticated users can view adherents" ON public.adherents;

-- 3. Replace contributions policy with admin-only
DROP POLICY IF EXISTS "Authenticated users can view contributions" ON public.contributions_elections;
CREATE POLICY "Admins can view contributions"
  ON public.contributions_elections
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));