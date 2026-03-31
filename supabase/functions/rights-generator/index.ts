import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
  if (!PERPLEXITY_API_KEY) {
    return new Response(JSON.stringify({ error: "PERPLEXITY_API_KEY not set" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  try {
    const { categorie, titre } = await req.json();
    if (!categorie || !titre) {
      return new Response(JSON.stringify({ error: "categorie and titre required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const prompt = `Redige une fiche pratique complete et detaillee sur "${titre}" pour les agents de la fonction publique territoriale en France.

Structure la fiche ainsi :
## Definition
## Droits des agents
## Procedure a suivre
## Voies de recours
## Textes de reference

Sois precis, cite les articles de loi et decrets applicables. Utilise le format Markdown.`;

    const pxRes = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          { role: "system", content: "Tu es un juriste specialise en droit de la fonction publique territoriale francaise. Reponds en francais uniquement." },
          { role: "user", content: prompt },
        ],
        search_recency_filter: "year",
      }),
    });

    if (!pxRes.ok) {
      const err = await pxRes.text();
      throw new Error(`Perplexity error [${pxRes.status}]: ${err}`);
    }

    const pxData = await pxRes.json();
    const contenu = pxData.choices?.[0]?.message?.content ?? "";
    const sources: string[] = pxData.citations ?? [];

    await supabase.from("rights_content").upsert(
      { categorie, contenu, sources },
      { onConflict: "categorie" },
    );

    return new Response(JSON.stringify({ contenu, sources }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("rights-generator error:", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
