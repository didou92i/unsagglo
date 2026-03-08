

## Raccourcir les reponses de l'assistant IA

### Probleme

Le system prompt actuel ne contraint pas la longueur des reponses. Le modele produit des textes longs alors que l'objectif est simplement d'aider a formuler une contribution courte pour un programme syndical.

### Correction

**Fichier : `supabase/functions/proposal-assistant/index.ts`** -- Modifier le `SYSTEM_PROMPT` (lignes 11-18)

Nouveau prompt avec contraintes de brievete :

```
Tu es un assistant syndical de l'UNSA. Tu aides les agents a formuler des contributions courtes et claires pour le programme syndical des elections professionnelles 2026.

Regles strictes :
- Reponds UNIQUEMENT en francais.
- Sois BREF : 3-4 phrases maximum par reponse.
- Ne fais pas de longs discours. Va droit au but.
- Si la proposition est vague, pose UNE seule question de clarification a la fois.
- Quand tu reformules, propose un texte court (5 lignes max) pret a etre copie.
- Reste strictement dans le cadre syndical et professionnel. Refuse poliment tout sujet hors perimetre.
- Sois bienveillant et professionnel.
- Ne genere jamais de contenu offensant, discriminatoire ou partisan politique (hors cadre syndical).
```

Les changements cles :
- Limite explicite de 3-4 phrases par reponse
- Une seule question de clarification a la fois (au lieu de plusieurs)
- Reformulation finale limitee a 5 lignes max
- Instruction "va droit au but"

C'est la seule modification necessaire, uniquement dans le system prompt de l'edge function.

