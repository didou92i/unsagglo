

## Plan : Alimenter les fiches "Vos Droits" via Perplexity

Quand un utilisateur clique sur une categorie (CITIS, Conges, Carriere, etc.), la page de detail interroge Perplexity pour generer du contenu juridique pertinent, le stocke en base pour eviter les appels repetitifs, et l'affiche en markdown.

---

### Architecture

```text
RightsDetail.tsx
  └─► useRightsContent(categorie)
        ├─► SELECT from rights_content (cache DB)
        └─► Si vide : supabase.functions.invoke("rights-generator")
              └─► Edge Function
                    ├─► Perplexity API (sonar-pro, recherche juridique FPT)
                    └─► INSERT into rights_content
                          └─► Retour contenu au frontend
```

---

### Etapes

**1. Migration SQL : table `rights_content`**

Nouvelle table pour stocker le contenu genere par categorie :
- `id` (uuid, PK)
- `categorie` (text, unique) -- correspond a CategoriesDroit
- `contenu` (text) -- markdown genere
- `sources` (text[]) -- URLs des citations Perplexity
- `created_at`, `updated_at` (timestamps)

RLS : lecture publique, ecriture service_role uniquement.

**2. Edge Function `rights-generator`**

- Recoit `{ categorie, titre }` en body
- Appelle Perplexity (`sonar-pro`) avec un prompt cible :
  - "Redige une fiche pratique complete sur [titre] pour les agents de la fonction publique territoriale en France. Inclus : definition, droits, procedure, recours, textes de reference."
  - `search_recency_filter: 'year'`
- Insere le resultat en markdown dans `rights_content`
- Retourne le contenu + sources

**3. Hook `useRightsContent(categorie)`**

- Verifie d'abord si un contenu existe en base (`rights_content`)
- Si oui, retourne le cache
- Sinon, appelle l'edge function, puis retourne le resultat
- Expose : `content`, `sources`, `loading`, `error`, `refresh`

**4. Mise a jour de `RightsDetail.tsx`**

- Utilise `useRightsContent` pour afficher le contenu en markdown
- Affiche un spinner pendant le chargement (premier appel Perplexity ~5s)
- Affiche les sources en bas de page
- Bouton "Actualiser" pour forcer une regeneration
- Rendu markdown via `react-markdown` + `remark-gfm`

**5. Page CITIS existante**

La route `/rights/citis` pointe deja vers une page statique dediee. Elle sera conservee telle quelle (contenu ecrit manuellement). Seules les autres categories utiliseront le contenu genere.

---

### Securite
- Contenu stocke en base apres generation (1 appel Perplexity par categorie, pas par visite)
- Edge function accessible sans JWT (contenu public)
- Rate limiting naturel : le cache DB empeche les appels repetitifs

### Fichiers crees/modifies

| Fichier | Action |
|---|---|
| `supabase/migrations/...rights_content.sql` | Migration : table + RLS |
| `supabase/functions/rights-generator/index.ts` | Edge function Perplexity |
| `src/hooks/useRightsContent.ts` | Hook de chargement/cache |
| `src/pages/rights/RightsDetail.tsx` | Affichage markdown + sources |
| `package.json` | Ajout `react-markdown`, `remark-gfm` |

