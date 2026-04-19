import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

declare global {
  interface Window {
    hljs: any;
  }
}

export default function CodeBlock({ code, language = "cpp", title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const [highlightedCode, setHighlightedCode] = useState<string>(code);
  const [isLoading, setIsLoading] = useState(true);

  // Carica Highlight.js dal CDN e applica syntax highlighting
  useEffect(() => {
    const loadAndHighlight = async () => {
      try {
        // Se highlight.js non è ancora caricato, caricalo dal CDN
        if (!window.hljs) {
          // Carica lo script
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js";
          script.async = true;

          script.onload = () => {
            // Carica il CSS del tema in base al tema corrente
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href =
              theme === "dark"
                ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"
                : "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-light.min.css";
            document.head.appendChild(link);

            performHighlight();
          };

          script.onerror = () => {
            console.error("Errore nel caricamento di Highlight.js dal CDN");
            setHighlightedCode(code);
            setIsLoading(false);
          };

          document.head.appendChild(script);
        } else {
          performHighlight();
        }
      } catch (error) {
        console.error("Errore nel caricamento di Highlight.js:", error);
        setHighlightedCode(code);
        setIsLoading(false);
      }
    };

    const performHighlight = () => {
      try {
        if (window.hljs) {
          const result = window.hljs.highlight(code, {
            language: language || "cpp",
            ignoreIllegals: true,
          });
          setHighlightedCode(result.value);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Errore nell'evidenziazione del codice:", error);
        setHighlightedCode(code);
        setIsLoading(false);
      }
    };

    loadAndHighlight();
  }, [code, language, theme]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Errore nella copia del codice:", error);
    }
  };

  return (
    <div className="my-6 rounded-lg border overflow-hidden" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--code-bg)' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--code-bg)' }}>
        {title && <p className="text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>{title}</p>}
        {!title && <p className="text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>{language || "cpp"}</p>}
        <Button
          onClick={handleCopy}
          variant="ghost"
          size="sm"
          className="ml-auto"
          style={{ color: 'var(--link-color)' }}
          disabled={isLoading}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              Copiato!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1" />
              Copia
            </>
          )}
        </Button>
      </div>
      <div className="relative overflow-x-auto">
        <pre className="p-4 m-0" style={{ backgroundColor: 'var(--code-bg)', color: 'var(--code-text)' }}>
          <code
            className={`language-${language} hljs text-sm leading-relaxed`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
    </div>
  );
}
