import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BeginnerCourse from "./pages/BeginnerCourse";
import CodeExamples from "./pages/CodeExamples";
import MathRL from "./pages/MathRL";
import MathRLModule1 from "./pages/MathRLModule1";
import MathRLModule2 from "./pages/MathRLModule2";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/beginner-course" element={<BeginnerCourse />} />
          <Route path="/code-examples" element={<CodeExamples />} />
          <Route path="/math-rl" element={<MathRL />} />
          <Route path="/math-rl/module-1" element={<MathRLModule1 />} />
          <Route path="/math-rl/module-2" element={<MathRLModule2 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
