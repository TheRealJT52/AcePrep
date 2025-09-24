
import { Card, CardContent } from "@/components/ui/card";
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface ChatMessageProps {
  message: string;
  role: "user" | "assistant" | "system";
}

export function ChatMessage({ message, role }: ChatMessageProps) {
  if (role === "system") return null;

  // Convert newlines to <br> and handle Markdown-style lists
  const formatMessage = (text: string) => {
    // Ensure text is a string
    const textStr = typeof text === 'string' ? text : String(text || '');
    
    // Replace markdown list items with HTML list items
    let formattedText = textStr.replace(/\n- /g, "\n• ");
    
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
    
    // Render LaTeX expressions
    // Handle display math ($$...$$) first to avoid conflicts - use non-greedy matching and handle multiline
    formattedText = formattedText.replace(/\$\$([\s\S]*?)\$\$/g, (match, latex) => {
      // Skip empty or whitespace-only latex
      if (!latex.trim()) return match;
      
      try {
        const rendered = katex.renderToString(latex.trim(), {
          displayMode: true,
          throwOnError: false,
          output: 'html',
          strict: false,
          trust: true
        });
        return `<div class="katex-display-container" style="margin: 1em 0; text-align: center; overflow-x: auto;">${rendered}</div>`;
      } catch (e) {
        console.warn('KaTeX display math render error:', e);
        return match; // Return original if rendering fails
      }
    });
    
    // Handle inline math ($...$) - improved regex to avoid matching across line breaks and empty content
    formattedText = formattedText.replace(/\$([^$\n\r]+?)\$/g, (match, latex) => {
      // Skip if latex is empty, just whitespace, or contains problematic characters
      if (!latex.trim() || latex.includes('$$')) return match;
      
      try {
        const rendered = katex.renderToString(latex.trim(), {
          displayMode: false,
          throwOnError: false,
          output: 'html',
          strict: false,
          trust: true
        });
        return `<span class="katex-inline-container">${rendered}</span>`;
      } catch (e) {
        console.warn('KaTeX inline math render error:', e);
        return match; // Return original if rendering fails
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
      
      <Card 
        className={`chat-message ${
          role === "assistant" 
            ? "bg-primary-light" 
            : "bg-white"
        } shadow-sm max-w-full overflow-hidden`}
      >
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
      
      <style jsx>{`
        .katex-message-content .katex {
          font-size: 1.1em !important;
          color: inherit !important;
        }
        
        .katex-message-content .katex-display {
          margin: 0.5em 0 !important;
          text-align: center !important;
        }
        
        .katex-message-content .katex-display-container {
          overflow-x: auto !important;
          max-width: 100% !important;
          scrollbar-width: thin;
        }
        
        .katex-message-content .katex-display-container::-webkit-scrollbar {
          height: 4px;
        }
        
        .katex-message-content .katex-display-container::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
          border-radius: 2px;
        }
        
        .katex-message-content .katex-display-container::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.3);
          border-radius: 2px;
        }
        
        .katex-message-content .katex-inline-container .katex {
          font-size: 1em !important;
        }
        
        .katex-message-content .katex .base {
          display: inline-block !important;
        }
        
        .katex-message-content .katex-html {
          overflow: visible !important;
        }
        
        .katex-message-content .katex .mord,
        .katex-message-content .katex .mop,
        .katex-message-content .katex .mbin,
        .katex-message-content .katex .mrel {
          color: inherit !important;
        }
      `}</style>
    </div>
  );
}
