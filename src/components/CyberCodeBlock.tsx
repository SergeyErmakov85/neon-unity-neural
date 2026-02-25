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

const tokenize = (code: string, patterns: [RegExp, string][]): string => {
  // Build a combined regex from all patterns
  const combined = new RegExp(patterns.map(([re]) => `(${re.source})`).join('|'), 'gm');
  const classes = patterns.map(([, cls]) => cls);

  return code.replace(combined, (...args) => {
    // args: full match, then one group per pattern, then offset, then string
    for (let i = 0; i < classes.length; i++) {
      if (args[i + 1] !== undefined) {
        return `<span class="${classes[i]}">${args[i + 1]}</span>`;
      }
    }
    return args[0];
  });
};

const highlightPython = (code: string): string => {
  return tokenize(code, [
    [/#.*/, 'cyber-comment'],
    [/"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/, 'cyber-string'],
    [/@\w+/, 'cyber-decorator'],
    [/\b(?:import|from|as|def|class|return|if|else|elif|for|while|in|not|and|or|is|None|True|False|with|try|except|finally|raise|yield|lambda|pass|break|continue|self|super)\b/, 'cyber-keyword'],
    [/\b(?:print|range|len|int|float|str|list|dict|tuple|set|type|isinstance|enumerate|zip|map|filter|max|min|sum|abs|round|sorted|reversed|format|input|open|super)\s*(?=\()/, 'cyber-builtin'],
    [/\b\d+\.?\d*(?:e[+-]?\d+)?f?\b/, 'cyber-number'],
  ]);
};

const highlightCSharp = (code: string): string => {
  return tokenize(code, [
    [/\/\/.*/, 'cyber-comment'],
    [/"(?:[^"\\]|\\.)*"/, 'cyber-string'],
    [/\b(?:using|public|private|protected|class|override|void|new|if|else|for|while|return|float|int|bool|string|var|this|base|static|readonly|const|namespace|abstract|virtual|sealed|partial|get|set|true|false|null)\b/, 'cyber-keyword'],
    [/\b(?:Vector3|Transform|Agent|VectorSensor|ActionBuffers|Time|Mathf|GameObject|MonoBehaviour|Rigidbody|Collider)\b/, 'cyber-type'],
    [/\b\d+\.?\d*f?\b/, 'cyber-number'],
  ]);
};

const highlightPseudo = (code: string): string => {
  return tokenize(code, [
    [/#.*/, 'cyber-comment'],
    [/\b(?:where|if|else|for|while|return|min|max|clip|log|E)\b/, 'cyber-keyword'],
    [/[←→∑πγαεθ]/, 'cyber-type'],
    [/\b\d+\.?\d*\b/, 'cyber-number'],
  ]);
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
