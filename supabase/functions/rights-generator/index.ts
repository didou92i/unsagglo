// Edge function neutralisée — UNSAgglo
//
// La génération automatique des fiches Rights par IA est désactivée.
// Les fiches juridiques sont désormais rédigées et validées manuellement
// par le bureau UNSAgglo avant publication.
//
// Cette fonction est conservée à l'état de stub pour journaliser tout appel
// résiduel pendant la phase de transition. Elle peut être supprimée
// définitivement après vérification de l'absence d'appels en logs.

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve((req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  return new Response(
    JSON.stringify({
      error: "Endpoint disabled",
      message:
        "La génération automatique de fiches Rights est désactivée. Les fiches juridiques UNSAgglo sont désormais rédigées et validées manuellement.",
    }),
    {
      status: 410,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
});
