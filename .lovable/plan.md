

## Ameliorations restantes identifiees

Apres analyse du code actuel, voici les points a corriger ou ameliorer :

---

### 1. Confirmation avant suppression d'articles (priorite haute)
`ArticlesManager.tsx` supprime les articles sans confirmation -- meme probleme que DocumentsManager avant correction. Risque de suppression accidentelle.
- Ajouter un `AlertDialog` comme fait pour DocumentsManager.

### 2. HoverCard sur les messages contact (priorite haute)
`ContactManager.tsx` utilise encore un `truncate` local sur le message. Incoherent avec les contributions qui ont maintenant le `ContribContentCell` au survol.
- Reutiliser `ContribContentCell` (renomme en composant generique `HoverContentCell`) ou dupliquer le pattern dans ContactManager.

### 3. Page d'accueil minimaliste (priorite moyenne)
La home reste un ecran splash (logo + bouton Entrer). Les composants `NewsPreview` et `RightsGrid` existent deja mais ne sont pas utilises. `StatsBar` aussi.
- Apres le splash, ajouter une section scrollable avec : preview des actualites, grille des droits, barre de stats, call-to-action vers la plateforme et l'adhesion.

### 4. Pas de pagination admin (priorite basse)
Les listes admin (adherents, contributions, articles, contact) chargent tout sans pagination. Limite Supabase a 1000 lignes.
- A terme, ajouter une pagination simple (page precedente/suivante).

### 5. Interface DocItem dupliquee (priorite basse)
`DocumentsList.tsx` et `useDocumentsAdmin.ts` definissent chacun leur propre `DocItem` avec des champs differents.
- Extraire un type partage dans `src/types/`.

---

### Plan d'implementation recommande

**Etape 1** -- Confirmation suppression articles : ajouter AlertDialog dans `ArticlesManager.tsx` (meme pattern que DocumentsManager).

**Etape 2** -- HoverCard messages contact : appliquer `ContribContentCell` (ou un composant generique `HoverContentCell`) dans `ContactManager.tsx`.

**Etape 3** -- Enrichir la page d'accueil : integrer `NewsPreview`, `RightsGrid` et des CTA sous le hero splash actuel.

**Etape 4** -- Unifier le type `DocItem` dans `src/types/`.

| Fichier | Action |
|---------|--------|
| `src/pages/admin/ArticlesManager.tsx` | Ajouter AlertDialog avant suppression |
| `src/pages/admin/ContribContentCell.tsx` | Renommer en `HoverContentCell` (composant generique) ou le reutiliser tel quel |
| `src/pages/admin/ContactManager.tsx` | Remplacer truncate par HoverContentCell |
| `src/pages/home/index.tsx` | Ajouter sections NewsPreview, RightsGrid, CTA apres le hero |
| `src/types/document.ts` | Nouveau fichier, type DocItem partage |

