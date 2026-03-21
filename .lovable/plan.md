

## Plan : Veille automatisee IA avec Perplexity

Service de veille qui recherche automatiquement les actualites pertinentes pour les agents de la fonction publique territoriale (UNSA) et genere des brouillons d'articles tous les 2 jours.

---

### Architecture

```text
pg_cron (toutes les 48h)
  └─► net.http_post → veille-generator (edge function)
        ├─► Perplexity API (recherche actualites FPT/UNSA)
        └─► Lovable AI (redaction article structure)
              └─► INSERT into articles (publie = false, auteur = 'Veille IA')
```

---

### Etapes

**1. Connecter Perplexity**
Lier le connecteur Perplexity au projet pour injecter les credentials automatiquement.

**2. Migration SQL : activer pg_cron et pg_net**
Activer les extensions necessaires pour le job planifie.

**3. Creer l'edge function `veille-generator`**
- Recherche Perplexity (modele `sonar`) avec 3 requetes ciblees :
  - "actualites UNSA fonction publique territoriale"
  - "reforme agents collectivites territoriales"
  - "droits agents territoriaux actualite"
- Filtrage par date (`search_recency_filter: 'week'`) et domaines de confiance
- Envoi des resultats a Lovable AI (gemini-3-flash-preview) avec prompt systeme pour rediger un article syndical court et structure
- Insertion dans `articles` avec `publie: false`, `auteur: 'Veille IA UNSAgglo'`, slug auto-genere

**4. Planifier le cron job (SQL insert, pas migration)**
`cron.schedule` toutes les 48h appelant la fonction via `net.http_post`.

**5. Badge "IA" dans l'admin**
Ajouter un indicateur visuel dans `ArticlesManager.tsx` pour distinguer les articles generes automatiquement (auteur contenant "Veille IA").

**6. Bouton "Lancer la veille" dans l'admin**
Permettre a l'admin de declencher manuellement une veille depuis le panneau d'administration.

---

### Securite
- Articles inseres en `publie: false` : validation manuelle obligatoire
- Edge function protegee par verification du header Authorization
- Recherches filtrees par recence (derniere semaine)

### Cout estime
- ~15 appels Perplexity/mois + ~15 appels Lovable AI/mois

