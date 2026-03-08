

## Suggestions d'ameliorations pour le site UNSAgglo

Apres audit complet du code, voici les lacunes et ameliorations identifiees, classees par priorite.

---

### Priorite haute -- Fonctionnalites manquantes

**1. Creation d'articles depuis l'admin**
L'onglet Articles permet uniquement de publier/masquer des articles existants. Il n'y a aucun formulaire pour creer ou modifier un article. L'admin ne peut pas ajouter de contenu sans passer par la base de donnees directement.
- Ajouter un formulaire de creation (titre, slug, contenu, categorie, auteur)
- Ajouter une RLS policy INSERT pour les admins sur `articles`
- Ajouter un bouton "Modifier" par article

**2. Gestion des documents membres depuis l'admin**
L'espace membres affiche des documents depuis le storage, mais l'admin n'a aucun moyen d'uploader des fichiers (PV, tracts, modeles de recours) sans acces direct au backend.
- Ajouter un onglet "Documents" dans l'admin avec upload de fichiers
- Creer un bucket `documents` si inexistant avec les policies adequates

**3. Accents manquants sur plusieurs pages**
Les pages `/membership`, `/members`, `/rights`, `/news`, `/contact`, `/legal` et le Footer contiennent des textes sans accents ("Adherer", "legales", "Telecharger", "Deconnexion", "Actualites", etc.).

---

### Priorite moyenne -- UX et polish

**4. Page 404 personnalisee**
La page 404 est definie inline dans `App.tsx`. La deplacer dans son propre composant avec le layout du site (Navbar + Footer via PageWrapper).

**5. Etat vide sur la page Actualites**
Quand il n'y a aucun article, le message "Aucun article trouve" est minimaliste. Ajouter une illustration ou un CTA vers la plateforme.

**6. Profil utilisateur dans l'espace membres**
La table `profiles` existe mais n'est utilisee nulle part. L'espace membres affiche juste l'email. Ajouter un bloc profil (nom, prenom, service, grade) editable.

---

### Priorite basse -- Nice to have

**7. Export CSV des adherents et contributions**
Les admins n'ont aucun moyen d'exporter les donnees. Ajouter un bouton "Exporter CSV" dans les onglets Adherents et Contributions.

**8. Notifications toast de confirmation**
Certains formulaires (contribution, adhesion) n'affichent pas de feedback visuel apres soumission reussie.

---

### Recommandation

Je suggere de commencer par les points **1 + 2** (creation d'articles + upload documents) car ce sont les fonctionnalites bloquantes pour l'administrateur, puis enchainer avec le point **3** (accents) et **6** (profil membres).

Quelle(s) amelioration(s) souhaitez-vous que j'implemente ?

