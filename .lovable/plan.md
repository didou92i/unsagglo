

## Ajouter des suggestions cliquables dans le chatbot

### Approche

Quand l'assistant pose une question de clarification, il inclura dans sa reponse un bloc JSON structure contenant 5-6 propositions. Le frontend detectera ce bloc et affichera des chips/boutons cliquables sous le message. Un clic envoie automatiquement le texte choisi comme message utilisateur.

### Modifications

**1. System prompt (`supabase/functions/proposal-assistant/index.ts`)**
Ajouter une regle au prompt :
- Quand la demande est vague ou necessite clarification, inclure un bloc `[SUGGESTIONS]` suivi de 5-6 options courtes separees par des `|`, puis `[/SUGGESTIONS]`.
- Exemple : `[SUGGESTIONS]Teletravail|Primes|Formation|Mobilite|Conditions de travail|Egalite professionnelle[/SUGGESTIONS]`

**2. Nouveau composant `src/pages/plateforme/SuggestionChips.tsx`**
- Props : `suggestions: string[]`, `onSelect: (text: string) => void`, `disabled: boolean`
- Affiche une rangee de boutons/chips (style outline, petite taille) en flex-wrap
- Au clic, appelle `onSelect` avec le texte du chip

**3. Modifier `ChatMessage.tsx`**
- Parser le contenu assistant pour extraire le bloc `[SUGGESTIONS]...[/SUGGESTIONS]`
- Afficher le texte sans le bloc de suggestions
- Passer les suggestions extraites via une nouvelle prop `onSuggestionClick`
- Afficher `SuggestionChips` sous le message assistant uniquement pour le dernier message

**4. Modifier `ProposalAssistant.tsx`**
- Passer un callback `onSuggestionClick` a `ChatMessage` pour le dernier message assistant
- Ce callback appelle `send(suggestion)` directement (comme si l'utilisateur avait tape le texte)
- Desactiver les chips quand `isLoading` est true

### Flux utilisateur

1. L'utilisateur dit "je veux proposer quelque chose"
2. L'assistant repond : "Quel domaine vous interesse ?" + 6 chips cliquables (Teletravail, Primes, Formation, etc.)
3. L'utilisateur clique sur "Teletravail" → envoie comme message
4. L'assistant pose une question plus precise avec de nouvelles suggestions adaptees

