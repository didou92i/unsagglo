

## Assistant IA pour les contributions -- avec `google/gemini-3.1-pro-preview`

### Fichiers a creer

**1. Edge function `supabase/functions/proposal-assistant/index.ts`**
- CORS + streaming SSE
- Modele : `google/gemini-3.1-pro-preview`
- System prompt specialise : assistant syndical qui aide a formuler des propositions claires pour un programme syndical. Pose des questions, reformule, refuse le hors-sujet. Francais uniquement.
- Recoit : `messages` (historique) + `theme` (contexte)
- Gestion erreurs 429/402

**2. `supabase/config.toml`** -- Ajouter la fonction
```toml
[functions.proposal-assistant]
verify_jwt = false
```

**3. `src/hooks/useProposalChat.ts`**
- Gere `messages[]` (role user/assistant), `isLoading`, `send(text)`
- Streaming SSE token par token vers le dernier message assistant
- Envoie le theme comme contexte dans le system prompt cote edge function

**4. `src/pages/plateforme/ChatMessage.tsx`**
- Affiche un message (bulle user a droite, assistant a gauche)
- Rendu markdown via `react-markdown` pour les reponses assistant

**5. `src/pages/plateforme/ProposalAssistant.tsx`**
- Dialog (max-w-2xl) avec :
  - Liste de messages scrollable
  - Input + bouton envoyer
  - Bouton "Utiliser cette proposition" qui injecte le dernier message assistant dans le formulaire et ferme le dialog

**6. Modifier `src/pages/plateforme/ContribForm.tsx`**
- Ajouter bouton "Assistant IA" (icone Bot) sous le textarea
- Ouvrir ProposalAssistant en dialog
- Passer `theme` et `contenu` actuels comme contexte
- Callback `onUseProposal(text)` qui fait `setValue("contenu", text)`

### Dependance a installer
- `react-markdown`

