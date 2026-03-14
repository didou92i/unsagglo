

## Resultat de la verification des triggers

La requete sur `information_schema.triggers` retourne **zero resultat**. Aucun trigger n'est attache dans toute la base, malgre deux fonctions qui en necessitent un.

---

### Triggers manquants

| # | Fonction existante | Table cible | Trigger attendu | Impact |
|---|---|---|---|---|
| 1 | `handle_new_user()` | `auth.users` | `ON INSERT` | **Critique** -- les nouveaux inscrits ne recoivent PAS de ligne dans `profiles`. Le profil membre est vide apres inscription. |
| 2 | `update_updated_at_column()` | `profiles` | `BEFORE UPDATE` | **Mineur** -- `updated_at` ne se rafraichit jamais lors d'une modification de profil. |

---

### Plan de correction (1 seule migration SQL)

```sql
-- 1. Trigger pour creer automatiquement un profil a l'inscription
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 2. Trigger pour mettre a jour updated_at sur profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
```

Aucun changement de code frontend. Deux triggers, une migration.

