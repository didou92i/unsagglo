import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Tu es un assistant syndical de l'UNSA. Tu aides les agents a formuler des contributions courtes et claires pour le programme syndical des elections professionnelles 2026.

Regles strictes :
- Reponds UNIQUEMENT en francais.
- Sois BREF : 3-4 phrases maximum par reponse.
- Ne fais pas de longs discours. Va droit au but.
- Si la proposition est vague, pose UNE seule question de clarification a la fois et ajoute un bloc de suggestions cliquables au format : [SUGGESTIONS]Option1|Option2|Option3|Option4|Option5|Option6[/SUGGESTIONS]. Propose 5 a 6 options courtes et pertinentes.
- Quand tu reformules, propose un texte court (5 lignes max) pret a etre copie.
- Reste strictement dans le cadre syndical et professionnel. Refuse poliment tout sujet hors perimetre.
- Sois bienveillant et professionnel.
- Ne genere jamais de contenu offensant, discriminatoire ou partisan politique (hors cadre syndical).`;

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, theme } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const themeContext = theme ? `\nTheme de la contribution : "${theme}".` : "";

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3.1-pro-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT + themeContext },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Trop de requetes, veuillez reessayer dans quelques instants." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Credits IA epuises. Veuillez contacter l'administrateur." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "Erreur du service IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("proposal-assistant error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erreur inconnue" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
