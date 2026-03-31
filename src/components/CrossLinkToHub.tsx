import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CrossLinkToHubProps {
  hubPath: string;
  hubAnchor?: string;
  children: React.ReactNode;
  hubTitle?: string;
}

const CrossLinkToHub = ({
  hubPath,
  hubAnchor,
  children,
  hubTitle,
}: CrossLinkToHubProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const fullPath = hubAnchor ? `${hubPath}#${hubAnchor}` : hubPath;
    navigate(fullPath);

    if (hubAnchor) {
      // Wait for navigation and DOM render
      setTimeout(() => {
        const el = document.getElementById(hubAnchor);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          el.classList.add("highlight-flash");
          setTimeout(() => el.classList.remove("highlight-flash"), 1500);
        }
      }, 300);
    }
  };

  const link = (
    <span
      onClick={handleClick}
      className="inline-flex items-center gap-1 cursor-pointer text-[hsl(192,100%,50%)] hover:underline transition-all duration-200"
      style={{
        textShadow: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLSpanElement).style.textShadow =
          "0 0 8px rgba(0,212,255,0.3)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLSpanElement).style.textShadow = "none";
      }}
    >
      <ExternalLink className="inline w-3 h-3 flex-shrink-0" />
      {children}
    </span>
  );

  if (hubTitle) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent side="top" className="text-xs">
          {hubTitle}
        </TooltipContent>
      </Tooltip>
    );
  }

  return link;
};

export default CrossLinkToHub;
