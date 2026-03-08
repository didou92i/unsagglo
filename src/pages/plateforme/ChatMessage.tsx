import ReactMarkdown from "react-markdown";
import { Bot, User } from "lucide-react";
import SuggestionChips from "./SuggestionChips";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  onSuggestionClick?: (text: string) => void;
  disableSuggestions?: boolean;
}

function parseSuggestions(text: string): { clean: string; suggestions: string[] } {
  const regex = /\[SUGGESTIONS](.*?)\[\/SUGGESTIONS]/s;
  const match = text.match(regex);
  if (!match) return { clean: text, suggestions: [] };
  const clean = text.replace(regex, "").trim();
  const suggestions = match[1].split("|").map((s) => s.trim()).filter(Boolean);
  return { clean, suggestions };
}

const ChatMessage = ({ role, content, onSuggestionClick, disableSuggestions }: ChatMessageProps): JSX.Element => {
  const isUser = role === "user";
  const { clean, suggestions } = isUser ? { clean: content, suggestions: [] } : parseSuggestions(content);

  return (
    <div className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div className={`flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center ${isUser ? "bg-primary/10 text-primary" : "bg-accent text-accent-foreground"}`}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className="max-w-[80%]">
        <div className={`rounded-lg px-3 py-2 text-sm ${isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
          {isUser ? (
            <p>{clean}</p>
          ) : (
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown>{clean}</ReactMarkdown>
            </div>
          )}
        </div>
        {suggestions.length > 0 && onSuggestionClick && (
          <SuggestionChips suggestions={suggestions} onSelect={onSuggestionClick} disabled={disableSuggestions ?? false} />
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
