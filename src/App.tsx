import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

// Lazy-loaded pages for performance
const BeginnerCourse = lazy(() => import("./pages/BeginnerCourse"));
const CodeExamples = lazy(() => import("./pages/CodeExamples"));
const MathRL = lazy(() => import("./pages/MathRL"));
const MathRLModule1 = lazy(() => import("./pages/MathRLModule1"));
const MathRLModule2 = lazy(() => import("./pages/MathRLModule2"));
const MathRLModule3 = lazy(() => import("./pages/MathRLModule3"));
const MathRLModule4 = lazy(() => import("./pages/MathRLModule4"));
const MathRLModule5 = lazy(() => import("./pages/MathRLModule5"));
const PyTorchModule = lazy(() => import("./pages/PyTorchModule"));
const PyTorchCheatSheet = lazy(() => import("./pages/PyTorchCheatSheet"));
const UnityMLAgentsModule = lazy(() => import("./pages/UnityMLAgentsModule"));
const AlgorithmsHub = lazy(() => import("./pages/AlgorithmsHub"));
const PPOModule = lazy(() => import("./pages/PPOModule"));
const SACModule = lazy(() => import("./pages/SACModule"));
const DQNModule = lazy(() => import("./pages/DQNModule"));
const A3CModule = lazy(() => import("./pages/A3CModule"));
const UnityProjectsHub = lazy(() => import("./pages/UnityProjectsHub"));
const BallBalanceProject = lazy(() => import("./pages/BallBalanceProject"));
const GridWorldProject = lazy(() => import("./pages/GridWorldProject"));
const RacingCarProject = lazy(() => import("./pages/RacingCarProject"));
const SoccerProject = lazy(() => import("./pages/SoccerProject"));
const QLearningViz = lazy(() => import("./pages/QLearningViz"));
const Visualizations = lazy(() => import("./pages/Visualizations"));
const AdvancedTopics = lazy(() => import("./pages/AdvancedTopics"));
const Labs = lazy(() => import("./pages/Labs"));
const DemoProject = lazy(() => import("./pages/DemoProject"));
const DeepRLModule = lazy(() => import("./pages/DeepRLModule"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseLesson1_1 = lazy(() => import("./pages/CourseLesson1_1"));
const CourseLesson1_2 = lazy(() => import("./pages/CourseLesson1_2"));
const CourseLesson1_3 = lazy(() => import("./pages/CourseLesson1_3"));
const CourseLesson1_4 = lazy(() => import("./pages/CourseLesson1_4"));
const CourseProject1 = lazy(() => import("./pages/CourseProject1"));
const CourseLesson2_1 = lazy(() => import("./pages/CourseLesson2_1"));
const CourseLesson2_2 = lazy(() => import("./pages/CourseLesson2_2"));
const CourseLesson2_3 = lazy(() => import("./pages/CourseLesson2_3"));
const CourseLesson2_4 = lazy(() => import("./pages/CourseLesson2_4"));
const CourseLesson2_5 = lazy(() => import("./pages/CourseLesson2_5"));
const CourseLesson2_6 = lazy(() => import("./pages/CourseLesson2_6"));
const CourseProject2 = lazy(() => import("./pages/CourseProject2"));
const CourseProject3 = lazy(() => import("./pages/CourseProject3"));
const CourseLesson3_1 = lazy(() => import("./pages/CourseLesson3_1"));
const CourseLesson3_2 = lazy(() => import("./pages/CourseLesson3_2"));
const CourseLesson3_3 = lazy(() => import("./pages/CourseLesson3_3"));
const CourseLesson3_4 = lazy(() => import("./pages/CourseLesson3_4"));
const CourseLesson3_5 = lazy(() => import("./pages/CourseLesson3_5"));
const CourseLesson3_6 = lazy(() => import("./pages/CourseLesson3_6"));
const CourseLesson3_7 = lazy(() => import("./pages/CourseLesson3_7"));
const CourseFinalProject = lazy(() => import("./pages/CourseFinalProject"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPpoVsSac = lazy(() => import("./pages/BlogPpoVsSac"));
const BlogTop5Mistakes = lazy(() => import("./pages/BlogTop5Mistakes"));
const BlogParallelEnvs = lazy(() => import("./pages/BlogParallelEnvs"));
const BlogMapoca = lazy(() => import("./pages/BlogMapoca"));
const BlogJupyterToUnity = lazy(() => import("./pages/BlogJupyterToUnity"));
const Pricing = lazy(() => import("./pages/Pricing"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Community = lazy(() => import("./pages/Community"));
const OnboardingQuiz = lazy(() => import("./pages/OnboardingQuiz"));
const CertificatePreview = lazy(() => import("./pages/CertificatePreview"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="text-muted-foreground text-sm">Загрузка...</p>
    </div>
  </div>
);

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
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
            <Route path="/pytorch/cheatsheet" element={<PyTorchCheatSheet />} />
            <Route path="/unity-ml-agents" element={<UnityMLAgentsModule />} />
            <Route path="/algorithms" element={<AlgorithmsHub />} />
            <Route path="/algorithms/ppo" element={<PPOModule />} />
            <Route path="/algorithms/sac" element={<SACModule />} />
            <Route path="/algorithms/dqn" element={<DQNModule />} />
            <Route path="/algorithms/a3c" element={<A3CModule />} />
            <Route path="/unity-projects" element={<UnityProjectsHub />} />
            <Route path="/unity-projects/ball-balance" element={<BallBalanceProject />} />
            <Route path="/unity-projects/gridworld" element={<GridWorldProject />} />
            <Route path="/unity-projects/racing" element={<RacingCarProject />} />
            <Route path="/unity-projects/soccer" element={<SoccerProject />} />
            <Route path="/visualizations" element={<Visualizations />} />
            <Route path="/visualizations/q-learning" element={<QLearningViz />} />
            <Route path="/advanced" element={<AdvancedTopics />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/demo-project" element={<DemoProject />} />
            <Route path="/deep-rl" element={<DeepRLModule />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/1-1" element={<CourseLesson1_1 />} />
            <Route path="/courses/1-2" element={<CourseLesson1_2 />} />
            <Route path="/courses/1-3" element={<CourseLesson1_3 />} />
            <Route path="/courses/1-4" element={<CourseLesson1_4 />} />
            <Route path="/courses/project-1" element={<CourseProject1 />} />
            <Route path="/courses/2-1" element={<CourseLesson2_1 />} />
            <Route path="/courses/2-2" element={<CourseLesson2_2 />} />
            <Route path="/courses/2-3" element={<CourseLesson2_3 />} />
            <Route path="/courses/2-4" element={<CourseLesson2_4 />} />
            <Route path="/courses/2-5" element={<CourseLesson2_5 />} />
            <Route path="/courses/2-6" element={<CourseLesson2_6 />} />
            <Route path="/courses/project-2" element={<CourseProject2 />} />
            <Route path="/courses/project-3" element={<CourseProject3 />} />
            <Route path="/courses/3-1" element={<CourseLesson3_1 />} />
            <Route path="/courses/3-2" element={<CourseLesson3_2 />} />
            <Route path="/courses/3-3" element={<CourseLesson3_3 />} />
            <Route path="/courses/3-4" element={<CourseLesson3_4 />} />
            <Route path="/courses/3-5" element={<CourseLesson3_5 />} />
            <Route path="/courses/3-6" element={<CourseLesson3_6 />} />
            <Route path="/courses/3-7" element={<CourseLesson3_7 />} />
            <Route path="/courses/final-project" element={<CourseFinalProject />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/ppo-vs-sac" element={<BlogPpoVsSac />} />
            <Route path="/blog/top-5-mistakes" element={<BlogTop5Mistakes />} />
            <Route path="/blog/parallel-envs" element={<BlogParallelEnvs />} />
            <Route path="/blog/mapoca-guide" element={<BlogMapoca />} />
            <Route path="/blog/jupyter-to-unity" element={<BlogJupyterToUnity />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/community" element={<Community />} />
            <Route path="/onboarding" element={<OnboardingQuiz />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
