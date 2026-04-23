INSERT INTO public.site_settings (key, value)
VALUES ('page_aide_carburant', true)
ON CONFLICT (key) DO NOTHING;
