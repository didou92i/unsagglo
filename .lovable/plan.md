

## BLOC 2 -- Rejoindre la liste electorale UNSAgglo

Ajout d'une section optionnelle dans la plateforme participative permettant aux agents de candidater pour la liste electorale, avec stockage securise des donnees personnelles et vue admin dediee.

### Base de donnees

**Migration** -- Table `candidats_liste` :
- `id` uuid PK default gen_random_uuid()
- `prenom` text NOT NULL
- `service` text NOT NULL
- `email` text NOT NULL
- `telephone` text NOT NULL
- `adresse` text NOT NULL
- `created_at` timestamptz default now()

RLS :
- SELECT : uniquement admin (`has_role(auth.uid(), 'admin')`)
- INSERT : public (`true`) -- formulaire ouvert
- Pas de UPDATE/DELETE public

### Frontend

**Nouveau composant `src/pages/plateforme/ListeElectoraleSection.tsx`** :
- Titre "Rejoindre la liste UNSAgglo"
- Texte explicatif + mention RGPD
- Checkbox "Je souhaite rejoindre la liste electorale UNSAgglo"
- Quand cochee, affiche 3 champs obligatoires : email pro/perso, telephone, adresse domicile
- Les champs prenom + service sont repris du formulaire contribution (ou saisis independamment)
- Bouton "Envoyer ma candidature"
- Message de confirmation apres envoi

**Nouveau hook `src/hooks/useCandidatSubmit.ts`** :
- Insert dans `candidats_liste`
- Gestion loading/success/error

**Nouveau schema `src/pages/plateforme/candidatSchema.ts`** :
- Validation Zod : prenom, service, email (format email), telephone, adresse (tous requis)

**Modifier `src/pages/plateforme/index.tsx`** :
- Ajouter `<ListeElectoraleSection />` entre ContribSection et SondageSection

### Admin

**Nouveau composant `src/pages/admin/CandidatsManager.tsx`** :
- Liste des candidats (prenom, service, email, telephone, adresse, date)
- Tableau simple lecture seule
- Acces restreint (deja protege par RLS admin)

**Modifier `src/pages/admin/index.tsx`** :
- Ajouter un 6e onglet "Candidats liste" avec `CandidatsManager`

**Nouveau hook `src/hooks/useAdminCandidats.ts`** :
- Fetch tous les candidats depuis `candidats_liste`

### Securite
- Donnees personnelles (email, telephone, adresse) accessibles uniquement aux admins via RLS
- Mention RGPD visible dans le formulaire avec reference au contact UNSAgglo
- Pas d'affichage public des candidatures

