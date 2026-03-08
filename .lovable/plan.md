

## Plateforme Participative "Construisons Ensemble"

Page `/plateforme` respectant la charte graphique UNSAgglo (fond blanc, vagues SVG bleues animees, typographie Barlow Condensed / Source Sans Pro, couleurs navy/cyan/primary).

### Base de donnees (3 migrations)

**Migration 1** -- Tables sondages :
- `sondages` (id, question, theme, actif, created_at) avec RLS lecture publique si actif, gestion admin
- `sondage_options` (id, sondage_id FK, label, votes default 0) avec RLS lecture publique, gestion admin
- `sondage_votes` (id, sondage_id FK, option_id FK, fingerprint, created_at, UNIQUE sondage_id+fingerprint) avec RLS insert public, select admin

**Migration 2** -- Fonction atomique de vote :
- `vote_sondage(p_sondage_id, p_option_id, p_fingerprint)` SECURITY DEFINER, insere le vote + incremente le compteur, retourne false sur doublon

**Migration 3** -- Ajouter `anonyme boolean DEFAULT false` a `contributions_elections` + setting `page_plateforme` dans `site_settings`

### Design visuel (style page d'accueil)

La page reprend le style immersif de la home :
- **Hero plein ecran** : fond blanc, image ville en arriere-plan a 20% opacite, vagues SVG animees en bas (reutilisation de `WaveBackground`), logo UNSAgglo centre, titre "Construisons Ensemble" en `font-display` navy, sous-titre en `text-muted-foreground`
- **Section Contributions** : fond `bg-muted`, cards blanches avec ombre `shadow-card`, formulaire avec toggle anonymat
- **Section Sondages** : fond blanc, cards avec barre de progression `bg-primary` apres vote, boutons arrondis style home (`border-2 border-primary rounded-full`)
- Pas de Navbar/Footer (comme la home) OU avec PageWrapper selon le contexte -- puisque c'est une page interne, on utilise `PageWrapper` mais on garde les elements visuels (vagues, couleurs)

### Structure des fichiers

```text
src/pages/plateforme/
  index.tsx              -- Page avec PageWrapper + 3 sections
  PlatformHero.tsx       -- Hero avec vagues + titre
  ContribSection.tsx     -- Formulaire contribution + toggle anonymat
  SondageSection.tsx     -- Liste sondages actifs
  SondageCard.tsx        -- Card sondage avec vote + resultats
  useSondages.ts         -- Hook fetch sondages + options
  useVote.ts             -- Hook vote avec fingerprint localStorage
  usePlatformStats.ts    -- Hook compteurs (nb contributions, nb votes)
```

### Routing et navigation

- Route `/plateforme` dans `App.tsx` avec `PageGuard` settingKey `page_plateforme`
- Lien "Plateforme" dans `Navbar.tsx` (avec badge "Nouveau")
- `VisiteurDialog` CTA pointe vers `/plateforme` au lieu de `/elections`
- `useEntryHover` : renommer `goToElections` en `goToPlateforme` avec navigation `/plateforme`

### Admin

- Nouvel onglet "Sondages" dans `/admin` pour CRUD sondages + options
- Vue resultats votes dans l'onglet existant ou nouveau

### Composants detailles

**PlatformHero** : section plein ecran avec `WaveBackground`, titre centre "Construisons Ensemble" en navy `text-4xl md:text-6xl font-display font-black`, sous-titre explicatif, compteurs animes (contributions + votes), bouton CTA scroll vers section contributions

**SondageCard** : UCard avec question en `font-display font-bold`, options comme boutons `rounded-full border-2 border-primary`. Apres vote, les boutons deviennent des barres de progression avec pourcentage. Vote stocke en `localStorage` avec cle `vote_{sondage_id}` comme fingerprint.

**ContribSection** : Reutilise le `ContribForm` existant enrichi d'une checkbox "Contribution anonyme" qui masque le champ prenom quand active. Adapte `useContribSubmit` pour le champ `anonyme`.

