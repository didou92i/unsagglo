import { useState, useRef, useEffect, useCallback } from "react";
import { useProposalChat } from "@/hooks/useProposalChat";

interface UseProposalAssistantReturn {
  messages: ReturnType<typeof useProposalChat>["messages"];
  isLoading: boolean;
  input: string;
  setInput: (v: string) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
  handleSend: () => Promise<void>;
  handleUse: () => void;
  handleSuggestion: (text: string) => void;
  lastAssistant: { content: string } | undefined;
  lastIdx: number;
}

export function useProposalAssistant(
  theme: string,
  open: boolean,
  onUseProposal: (text: string) => void,
  onOpenChange: (open: boolean) => void,
): UseProposalAssistantReturn {
  const { messages, isLoading, send, reset } = useProposalChat(theme);
  const [input, setInput] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!open) { reset(); setInput(""); }
  }, [open, reset]);

  const handleSend = useCallback(async (): Promise<void> => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    await send(text);
  }, [input, isLoading, send]);

  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  const lastIdx = messages.length - 1;

  const handleUse = useCallback((): void => {
    if (!lastAssistant) return;
    const clean = lastAssistant.content.replace(/\[SUGGESTIONS].*?\[\/SUGGESTIONS]/s, "").trim();
    onUseProposal(clean);
    onOpenChange(false);
  }, [lastAssistant, onUseProposal, onOpenChange]);

  const handleSuggestion = useCallback((text: string): void => {
    if (isLoading) return;
    send(text);
  }, [isLoading, send]);

  return {
    messages, isLoading, input, setInput, scrollRef,
    handleSend, handleUse, handleSuggestion, lastAssistant, lastIdx,
  };
}
