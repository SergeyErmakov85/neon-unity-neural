import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";

type Language = "python" | "csharp" | "pseudo";

interface CyberCodeBlockProps {
  children: string;
  language?: Language;
  filename?: string;
}

const highlightPython = (code: string): string => {
  // Order matters: comments first, then strings, then keywords, etc.
  return code
    // Comments
    .replace(/(#.*)/g, '<span class="cyber-comment">$1</span>')
    // Strings (double and single quoted)
    .replace(/(?<!class="cyber-comment">.*)("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, '<span class="cyber-string">$1</span>')
    // Keywords
    .replace(/\b(import|from|as|def|class|return|if|else|elif|for|while|in|not|and|or|is|None|True|False|with|try|except|finally|raise|yield|lambda|pass|break|continue|self|super)\b/g, '<span class="cyber-keyword">$1</span>')
    // Built-in functions
    .replace(/\b(print|range|len|int|float|str|list|dict|tuple|set|type|isinstance|enumerate|zip|map|filter|max|min|sum|abs|round|sorted|reversed|format|input|open|super)\b(?=\s*\()/g, '<span class="cyber-builtin">$1</span>')
    // Numbers
    .replace(/\b(\d+\.?\d*(?:e[+-]?\d+)?f?)\b/g, '<span class="cyber-number">$1</span>')
    // Decorators
    .replace(/(@\w+)/g, '<span class="cyber-decorator">$1</span>')
    // Class/function names after def/class
    .replace(/(?<=\bdef\s+)(\w+)/g, '<span class="cyber-funcname">$1</span>')
    .replace(/(?<=\bclass\s+)(\w+)/g, '<span class="cyber-classname">$1</span>');
};

const highlightCSharp = (code: string): string => {
  return code
    // Comments
    .replace(/(\/\/.*)/g, '<span class="cyber-comment">$1</span>')
    // Strings
    .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="cyber-string">$1</span>')
    // Keywords
    .replace(/\b(using|public|private|protected|class|override|void|new|if|else|for|while|return|float|int|bool|string|var|this|base|static|readonly|const|namespace|abstract|virtual|sealed|partial|get|set|true|false|null)\b/g, '<span class="cyber-keyword">$1</span>')
    // Types
    .replace(/\b(Vector3|Transform|Agent|VectorSensor|ActionBuffers|Time|Mathf|GameObject|MonoBehaviour|Rigidbody|Collider)\b/g, '<span class="cyber-type">$1</span>')
    // Numbers
    .replace(/\b(\d+\.?\d*f?)\b/g, '<span class="cyber-number">$1</span>')
    // Method calls
    .replace(/\.(\w+)(?=\s*\()/g, '.<span class="cyber-funcname">$1</span>');
};

const highlightPseudo = (code: string): string => {
  return code
    // Comments
    .replace(/(#.*)/g, '<span class="cyber-comment">$1</span>')
    // Keywords/operators in pseudo-code
    .replace(/\b(where|if|else|for|while|return|min|max|clip|log|E)\b/g, '<span class="cyber-keyword">$1</span>')
    // Arrows and special symbols
    .replace(/(←|→|∑|π|γ|α|ε|θ)/g, '<span class="cyber-type">$1</span>')
    // Numbers
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="cyber-number">$1</span>');
};

const highlight = (code: string, language: Language): string => {
  switch (language) {
    case "python": return highlightPython(code);
    case "csharp": return highlightCSharp(code);
    case "pseudo": return highlightPseudo(code);
    default: return code;
  }
};

const CyberCodeBlock = ({ children, language = "python", filename }: CyberCodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const highlighted = useMemo(() => highlight(children, language), [children, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    toast.success("Код скопирован");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-primary/20 shadow-[0_0_15px_hsl(180_100%_50%/0.1)]">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[hsl(230,30%,10%)] border-b border-primary/20">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[hsl(50,100%,50%)]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-primary/80" />
          {filename && (
            <span className="ml-3 text-xs font-mono text-muted-foreground">{filename}</span>
          )}
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCopy}
          className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-primary/10"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </Button>
      </div>

      {/* Code area */}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed bg-[hsl(230,30%,6%)]">
        <code
          className="font-mono"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
};

export default CyberCodeBlock;
