import { Card, CardContent } from "@/components/ui/card";

interface ChatMessageProps {
  message: string;
  role: "user" | "assistant" | "system";
}

export function ChatMessage({ message, role }: ChatMessageProps) {
  if (role === "system") return null;

  // Convert newlines to <br> and handle Markdown-style lists
  const formatMessage = (text: string) => {
    // Replace markdown list items with HTML list items
    let formattedText = text.replace(/\n- /g, "\n• ");
    
    // Convert URLs to links
    formattedText = formattedText.replace(
      /(https?:\/\/[^\s]+)/g, 
      '<a href="$1" class="text-primary underline" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Bold text between ** or __
    formattedText = formattedText.replace(
      /(\*\*|__)(.*?)\1/g,
      '<strong>$2</strong>'
    );
    
    // Replace newlines with <br>
    formattedText = formattedText.replace(/\n/g, "<br>");
    
    return formattedText;
  };

  return (
    <div className={`flex mb-4 ${role === "user" ? "justify-end" : ""}`}>
      {role === "assistant" && (
        <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center mr-2">
          <span className="text-sm">🤖</span>
        </div>
      )}
      
      <Card 
        className={`chat-message ${
          role === "assistant" 
            ? "bg-primary-light" 
            : "bg-white"
        } shadow-sm`}
      >
        <CardContent className="p-3">
          <div dangerouslySetInnerHTML={{ __html: formatMessage(message) }} />
        </CardContent>
      </Card>
      
      {role === "user" && (
        <div className="h-8 w-8 rounded-full bg-neutral-300 text-white flex items-center justify-center ml-2">
          <span className="text-sm">👤</span>
        </div>
      )}
    </div>
  );
}
