

## Gestion de la visibilite des pages depuis l'admin

### Objectif
Permettre a l'admin d'activer/desactiver certaines pages du site (Elections, Actualites, Vos Droits, Contact, Adhesion, Espace membres) via des toggles dans un nouvel onglet admin.

### 1. Creation d'une table `site_settings` en base

Migration SQL :
```sql
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Lecture publique (tout le monde doit savoir si une page est active)
CREATE POLICY "Public read site_settings" ON public.site_settings
  FOR SELECT TO anon, authenticated USING (true);

-- Seuls les admins peuvent modifier
CREATE POLICY "Admins can update site_settings" ON public.site_settings
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Insertion des pages configurables
INSERT INTO public.site_settings (key, value) VALUES
  ('page_news', true),
  ('page_rights', true),
  ('page_elections', true),
  ('page_contact', true),
  ('page_membership', true),
  ('page_members', true);
```

### 2. Hook `useSiteSettings`
- Charge les settings au demarrage (query `site_settings`)
- Expose un objet `{ page_news: true, page_elections: false, ... }` et un `loading`
- Fonction `toggleSetting(key)` pour les admins

### 3. Nouvel onglet admin "Pages"
- Ajouter un 4e onglet "Pages" dans `/admin`
- Creer `src/pages/admin/PagesManager.tsx` : liste des pages avec un Switch pour chacune
- Utilise `useSiteSettings` pour lire/ecrire

### 4. Masquer les pages desactivees
- Dans `Navbar.tsx` : filtrer `NAV_LINKS` selon les settings actifs
- Dans `App.tsx` : rediriger les routes desactivees vers `/` (ou afficher un message "Page indisponible")

### 5. Fichiers concernes
| Fichier | Action |
|---|---|
| Migration SQL | Creer table `site_settings` + RLS + donnees initiales |
| `src/hooks/useSiteSettings.ts` | Nouveau hook |
| `src/pages/admin/PagesManager.tsx` | Nouveau composant |
| `src/pages/admin/index.tsx` | Ajouter onglet "Pages" |
| `src/components/layout/Navbar.tsx` | Filtrer liens selon settings |
| `src/App.tsx` | Garder les routes mais rediriger si desactive |

