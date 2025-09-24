
import { Card, CardContent } from "@/components/ui/card";
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface ChatMessageProps {
  message: string;
  role: "user" | "assistant" | "system";
}

export function ChatMessage({ message, role }: ChatMessageProps) {
  if (role === "system") return null;

  const formatMessage = (text: string): string => {
    const textStr = typeof text === 'string' ? text : String(text || '');
    let formattedText = textStr;

    // Replace markdown list items with HTML list items
    formattedText = formattedText.replace(/\n- /g, "\n• ");

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

    // Handle display math \[...\] first (LaTeX style)
    formattedText = formattedText.replace(/\\\[([\s\S]*?)\\\]/g, (match, latex) => {
      if (!latex.trim()) return match;
      
      try {
        const rendered = katex.renderToString(latex.trim(), {
          displayMode: true,
          throwOnError: false,
          output: 'html',
          strict: false,
          trust: true,
          fleqn: false
        });
        return `<div class="katex-display-wrapper">${rendered}</div>`;
      } catch (error) {
        console.warn('KaTeX display math error:', error);
        return `<div class="math-fallback">\\[${latex}\\]</div>`;
      }
    });

    // Handle display math ($$...$$) second
    formattedText = formattedText.replace(/\$\$([\s\S]*?)\$\$/g, (match, latex) => {
      if (!latex.trim()) return match;
      
      try {
        const rendered = katex.renderToString(latex.trim(), {
          displayMode: true,
          throwOnError: false,
          output: 'html',
          strict: false,
          trust: true,
          fleqn: false
        });
        return `<div class="katex-display-wrapper">${rendered}</div>`;
      } catch (error) {
        console.warn('KaTeX display math error:', error);
        return `<div class="math-fallback">$$${latex}$$</div>`;
      }
    });

    // Handle inline math \(...\) first (LaTeX style)
    formattedText = formattedText.replace(/\\\(((?:[^\\]|\\(?!\)))*?)\\\)/g, (match, latex) => {
      if (!latex.trim()) return match;

      try {
        const rendered = katex.renderToString(latex.trim(), {
          displayMode: false,
          throwOnError: false,
          output: 'html',
          strict: false,
          trust: true
        });
        return `<span class="katex-inline-wrapper">${rendered}</span>`;
      } catch (error) {
        console.warn('KaTeX inline math error:', error);
        return `<span class="math-fallback">\\(${latex}\\)</span>`;
      }
    });

    // Handle inline math ($...$) second
    formattedText = formattedText.replace(/\$([^$\n\r]{1,100}?)\$/g, (match, latex) => {
      if (!latex.trim() || latex.includes('$$') || latex.length < 1) return match;

      try {
        const rendered = katex.renderToString(latex.trim(), {
          displayMode: false,
          throwOnError: false,
          output: 'html',
          strict: false,
          trust: true
        });
        return `<span class="katex-inline-wrapper">${rendered}</span>`;
      } catch (error) {
        console.warn('KaTeX inline math error:', error);
        return `<span class="math-fallback">$${latex}$</span>`;
      }
    });

    // Replace newlines with <br>
    formattedText = formattedText.replace(/\n/g, "<br>");

    return formattedText;
  };

  return (
    <div className={`flex mb-4 ${role === "user" ? "justify-end" : ""}`}>
      {role === "assistant" && (
        <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center mr-2 flex-shrink-0">
          <span className="text-sm">🤖</span>
        </div>
      )}

      <Card className={`chat-message ${role === "assistant" ? "bg-primary-light" : "bg-white"} shadow-sm max-w-full overflow-hidden`}>
        <CardContent className="p-3">
          <div
            className={`${role === "user" ? "text-black" : ""} overflow-x-auto katex-message-content`}
            style={{
              maxWidth: '100%',
              wordWrap: 'break-word',
              overflowWrap: 'break-word'
            }}
            dangerouslySetInnerHTML={{ __html: formatMessage(message) }}
          />
        </CardContent>
      </Card>

      {role === "user" && (
        <div className="h-8 w-8 rounded-full bg-neutral-300 text-white flex items-center justify-center ml-2 flex-shrink-0">
          <span className="text-sm">👤</span>
        </div>
      )}
    </div>
  );
}
