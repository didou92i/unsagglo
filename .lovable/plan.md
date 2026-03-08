

## Analyse qualite -- Dernier passage

Le code est maintenant bien structure. Voici les derniers points identifes apres revue exhaustive.

---

### 1. Page d'accueil sans PageWrapper (priorite haute)

`src/pages/home/index.tsx` n'utilise pas `PageWrapper` : pas de Navbar, pas de Footer, pas de tracking de visites. C'est la seule page du site dans cette situation (toutes les autres utilisent `PageWrapper`). L'utilisateur arrive sur un ecran splash sans navigation visible.

**Correction** : Envelopper le contenu de la Home dans `PageWrapper`.

---

### 2. VisitsStats : aggregation cote client (priorite moyenne)

`VisitsStats.tsx` charge TOUTES les lignes de `page_visits` puis compte en JS. Avec la limite Supabase de 1000 lignes, les stats seront fausses des que le site depasse 1000 visites.

**Correction** : Creer une fonction SQL (ou une vue) `get_visit_stats()` qui fait le `GROUP BY` / `COUNT` cote base, et l'appeler via `supabase.rpc()`.

---

### 3. CandidatsManager : service non resolu (priorite moyenne)

`CandidatsManager.tsx` affiche `c.service` en brut au lieu d'utiliser `serviceLabel()` comme les autres managers.

**Correction** : Importer et appliquer `serviceLabel`.

---

### 4. Pas d'etat vide sur NewsPreview (priorite basse)

`NewsPreview` sur la home affiche un spinner si loading, mais si `articles` est vide (aucun article publie), il affiche une grille vide sans message.

**Correction** : Ajouter un texte "Aucune actualite pour le moment" quand `preview.length === 0`.

---

### 5. Footer liens vers pages desactivees (priorite basse)

Le Footer affiche des liens statiques (Actualites, Elections, etc.) sans verifier `useSiteSettings`. Si un admin desactive une page, le lien reste dans le footer.

**Correction** : Filtrer les liens du footer avec les settings, comme fait dans la Navbar.

---

### Plan d'implementation

| Fichier | Action |
|---------|--------|
| `src/pages/home/index.tsx` | Envelopper dans `PageWrapper` |
| `src/pages/admin/VisitsStats.tsx` | Extraire logique dans un hook `useVisitsStats`, creer une migration SQL pour `get_visit_stats()` |
| `src/pages/admin/CandidatsManager.tsx` | Appliquer `serviceLabel()` sur la colonne service |
| `src/pages/home/NewsPreview.tsx` | Ajouter etat vide quand aucun article |
| `src/components/layout/Footer.tsx` | Filtrer les liens avec `useSiteSettings` |

