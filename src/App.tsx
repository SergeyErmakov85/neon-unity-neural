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
import MathRLModule3 from "./pages/MathRLModule3";
import MathRLModule4 from "./pages/MathRLModule4";
import MathRLModule5 from "./pages/MathRLModule5";
import PyTorchModule from "./pages/PyTorchModule";
import UnityMLAgentsModule from "./pages/UnityMLAgentsModule";
import AlgorithmsHub from "./pages/AlgorithmsHub";
import PPOModule from "./pages/PPOModule";
import SACModule from "./pages/SACModule";
import UnityProjectsHub from "./pages/UnityProjectsHub";
import BallBalanceProject from "./pages/BallBalanceProject";
import GridWorldProject from "./pages/GridWorldProject";
import QLearningViz from "./pages/QLearningViz";
import AdvancedTopics from "./pages/AdvancedTopics";
import Labs from "./pages/Labs";
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
          <Route path="/math-rl/module-3" element={<MathRLModule3 />} />
          <Route path="/math-rl/module-4" element={<MathRLModule4 />} />
          <Route path="/math-rl/module-5" element={<MathRLModule5 />} />
          <Route path="/pytorch" element={<PyTorchModule />} />
          <Route path="/unity-ml-agents" element={<UnityMLAgentsModule />} />
          <Route path="/algorithms" element={<AlgorithmsHub />} />
          <Route path="/algorithms/ppo" element={<PPOModule />} />
          <Route path="/algorithms/sac" element={<SACModule />} />
          <Route path="/unity-projects" element={<UnityProjectsHub />} />
          <Route path="/unity-projects/ball-balance" element={<BallBalanceProject />} />
          <Route path="/unity-projects/gridworld" element={<GridWorldProject />} />
          <Route path="/visualizations/q-learning" element={<QLearningViz />} />
          <Route path="/advanced" element={<AdvancedTopics />} />
          <Route path="/labs" element={<Labs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
