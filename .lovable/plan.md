

## Ajouter l'onglet "Sondages" dans /admin

L'admin `/admin` a deja 4 onglets. On ajoute un 5e onglet "Sondages" pour le CRUD des sondages et leurs options.

### Fichiers a creer

**`src/pages/admin/SondagesManager.tsx`** -- Composant principal :
- Liste les sondages existants (question, theme, actif/inactif, nombre de votes)
- Bouton "Nouveau sondage" ouvrant un formulaire
- Pour chaque sondage : boutons Modifier / Desactiver / Voir resultats

**`src/pages/admin/SondageForm.tsx`** -- Formulaire creation/edition :
- Champs : question (textarea), theme (select parmi les themes existants)
- Section dynamique pour ajouter/supprimer des options de reponse
- Toggle actif/inactif

**`src/pages/admin/SondageResults.tsx`** -- Vue resultats detailles :
- Barres de progression avec nombre de votes par option
- Total des votes

**`src/hooks/useAdminSondages.ts`** -- Hook CRUD :
- Fetch tous les sondages (actifs et inactifs) avec leurs options
- Create/update sondage + options
- Toggle actif/inactif

### Fichier a modifier

**`src/pages/admin/index.tsx`** :
- Importer `SondagesManager`
- Ajouter `<TabsTrigger value="sondages">Sondages</TabsTrigger>`
- Ajouter `<TabsContent value="sondages"><SondagesManager /></TabsContent>`

### Base de donnees

Aucune migration necessaire -- les tables `sondages`, `sondage_options` et les policies admin existent deja.

