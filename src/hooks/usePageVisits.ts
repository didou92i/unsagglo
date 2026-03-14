import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function usePageVisits(): void {
  const { pathname } = useLocation();

  useEffect(() => {
    supabase
      .from("page_visits")
      .insert({ page_path: pathname })
      .then(undefined, console.warn);
  }, [pathname]);
}
