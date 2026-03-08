import { useState, useRef, useEffect } from "react";
import { Bot, Send, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import UButton from "@/components/ui/UButton";
import ChatMessage from "./ChatMessage";
import { useProposalChat } from "@/hooks/useProposalChat";

interface ProposalAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  theme: string;
  onUseProposal: (text: string) => void;
}

const ProposalAssistant = ({ open, onOpenChange, theme, onUseProposal }: ProposalAssistantProps): JSX.Element => {
  const { messages, isLoading, send, reset } = useProposalChat(theme);
  const [input, setInput] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!open) { reset(); setInput(""); }
  }, [open, reset]);

  const handleSend = async (): Promise<void> => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    await send(text);
  };

  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");

  const handleUse = (): void => {
    if (!lastAssistant) return;
    onUseProposal(lastAssistant.content);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[70vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Assistant de proposition
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6" ref={scrollRef}>
          <div className="flex flex-col gap-3 py-2">
            {messages.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                Decrivez votre idee et je vous aiderai a la formuler en proposition claire.
              </p>
            )}
            {messages.map((m, i) => (
              <ChatMessage key={i} role={m.role} content={m.content} />
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-2">
                <div className="h-7 w-7 rounded-full bg-accent flex items-center justify-center">
                  <Bot className="h-4 w-4 text-accent-foreground animate-pulse" />
                </div>
                <div className="bg-muted rounded-lg px-3 py-2 text-sm text-muted-foreground">Reflexion...</div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t px-6 py-3 flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Decrivez votre idee..."
              className="flex-1 px-3 py-2 rounded-md border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
            <UButton variant="primary" size="sm" onClick={handleSend} loading={isLoading} aria-label="Envoyer">
              <Send className="h-4 w-4" />
            </UButton>
          </div>
          {lastAssistant && (
            <UButton variant="secondary" size="sm" onClick={handleUse} className="w-full">
              <Check className="h-4 w-4 mr-1" /> Utiliser cette proposition
            </UButton>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProposalAssistant;
