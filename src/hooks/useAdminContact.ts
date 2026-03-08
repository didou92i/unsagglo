import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ContactMessage {
  id: string;
  nom: string;
  email: string;
  objet: string;
  message: string;
  created_at: string;
}

interface UseAdminContactReturn {
  messages: ContactMessage[];
  loading: boolean;
}

export function useAdminContact(): UseAdminContactReturn {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      const { data } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setMessages(data as ContactMessage[]);
      setLoading(false);
    };
    fetch();
  }, []);

  return { messages, loading };
}
