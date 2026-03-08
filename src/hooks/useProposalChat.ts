import { useState, useCallback, useRef } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface UseProposalChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  send: (text: string) => Promise<void>;
  reset: () => void;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/proposal-assistant`;

function parseSSELines(
  buffer: string,
  onDelta: (t: string) => void
): { remaining: string; done: boolean } {
  let remaining = buffer;
  let done = false;
  let idx: number;

  while ((idx = remaining.indexOf("\n")) !== -1) {
    let line = remaining.slice(0, idx);
    remaining = remaining.slice(idx + 1);
    if (line.endsWith("\r")) line = line.slice(0, -1);
    if (line.startsWith(":") || line.trim() === "") continue;
    if (!line.startsWith("data: ")) continue;

    const json = line.slice(6).trim();
    if (json === "[DONE]") { done = true; break; }

    try {
      const parsed = JSON.parse(json);
      const c = parsed.choices?.[0]?.delta?.content as string | undefined;
      if (c) onDelta(c);
    } catch {
      remaining = line + "\n" + remaining;
      break;
    }
  }
  return { remaining, done };
}

export function useProposalChat(theme: string): UseProposalChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const abortRef = useRef<AbortController | null>(null);

  const send = useCallback(async (text: string): Promise<void> => {
    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    let accumulated = "";

    const updateAssistant = (chunk: string): void => {
      accumulated += chunk;
      const snap = accumulated;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: snap } : m));
        }
        return [...prev, { role: "assistant", content: snap }];
      });
    };

    try {
      abortRef.current = new AbortController();
      const allMessages = [...messages, userMsg].map(({ role, content }) => ({ role, content }));

      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: allMessages, theme }),
        signal: abortRef.current.signal,
      });

      if (!resp.ok || !resp.body) {
        const err = await resp.json().catch(() => ({ error: "Erreur reseau" }));
        throw new Error(err.error ?? `Erreur ${resp.status}`);
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const result = parseSSELines(buf, updateAssistant);
        buf = result.remaining;
        if (result.done) break;
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        const errMsg = e instanceof Error ? e.message : "Erreur inconnue";
        setMessages((prev) => [...prev, { role: "assistant", content: `Erreur : ${errMsg}` }]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [messages, theme]);

  const reset = useCallback((): void => {
    abortRef.current?.abort();
    setMessages([]);
    setIsLoading(false);
  }, []);

  return { messages, isLoading, send, reset };
}
