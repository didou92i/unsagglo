import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SEARCH_QUERIES = [
  "actualites UNSA fonction publique territoriale 2025 2026",
  "reforme agents collectivites territoriales droit carriere",
  "droits agents territoriaux actualite syndicat",
];

async function searchPerplexity(
  query: string,
  apiKey: string
): Promise<{ content: string; citations: string[] }> {
  const res = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "sonar",
      messages: [
        {
          role: "system",
          content:
            "Tu es un assistant de veille syndicale. Resume les actualites recentes pertinentes pour les agents de la fonction publique territoriale et l'UNSA. Sois factuel et concis.",
        },
        { role: "user", content: query },
      ],
      search_recency_filter: "week",
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Perplexity error ${res.status}: ${txt}`);
  }

  const data = await res.json();
  return {
    content: data.choices?.[0]?.message?.content ?? "",
    citations: data.citations ?? [],
  };
}

function makeSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

async function generateArticle(
  searchResult: string,
  citations: string[],
  lovableKey: string
): Promise<{ titre: string; contenu: string; categorie: string }> {
  const sourcesText = citations.length
    ? `\n\nSources :\n${citations.map((c, i) => `[${i + 1}] ${c}`).join("\n")}`
    : "";

  const res = await fetch(
    "https://ai.gateway.lovable.dev/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Tu es redacteur syndical pour l'UNSA Territoriaux. A partir d'un resume de veille, redige un article court et structure.

Regles :
- Titre accrocheur de moins de 80 caracteres
- Corps de 8 a 15 lignes maximum en markdown
- Ton professionnel et syndical
- Inclure les sources en fin d'article
- Categorie parmi : actualite, tract, fiche_droit

Reponds UNIQUEMENT en JSON valide :
{"titre": "...", "contenu": "...", "categorie": "actualite"}`,
          },
          {
            role: "user",
            content: `Resume de veille :\n${searchResult}${sourcesText}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "create_article",
              description: "Cree un article syndical structure",
              parameters: {
                type: "object",
                properties: {
                  titre: { type: "string" },
                  contenu: { type: "string" },
                  categorie: {
                    type: "string",
                    enum: ["actualite", "tract", "fiche_droit"],
                  },
                },
                required: ["titre", "contenu", "categorie"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: {
          type: "function",
          function: { name: "create_article" },
        },
      }),
    }
  );

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Lovable AI error ${res.status}: ${txt}`);
  }

  const data = await res.json();
  const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
  if (!toolCall) throw new Error("No tool call in AI response");

  return JSON.parse(toolCall.function.arguments);
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY missing");

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const results: string[] = [];
    const query =
      SEARCH_QUERIES[Math.floor(Math.random() * SEARCH_QUERIES.length)];

    console.log(`Veille: searching "${query}"`);
    const search = await searchPerplexity(query, PERPLEXITY_API_KEY);

    if (!search.content || search.content.length < 50) {
      return new Response(
        JSON.stringify({ message: "Pas de contenu pertinent trouve" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Veille: generating article...");
    const article = await generateArticle(
      search.content,
      search.citations,
      LOVABLE_API_KEY
    );

    const slug =
      makeSlug(article.titre) + "-" + Date.now().toString(36);

    const { error } = await supabase.from("articles").insert({
      titre: article.titre,
      contenu: article.contenu,
      categorie: article.categorie,
      slug,
      auteur: "Veille IA UNSAgglo",
      publie: false,
    });

    if (error) throw new Error(`DB insert error: ${error.message}`);

    results.push(article.titre);
    console.log(`Veille: article created - "${article.titre}"`);

    return new Response(
      JSON.stringify({
        success: true,
        articles_created: results.length,
        titles: results,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error("veille-generator error:", e);
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "Erreur inconnue",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
