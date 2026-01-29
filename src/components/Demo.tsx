import { TrendingUp, Play } from "lucide-react";

const Demo = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider">Demo</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            See RL in action
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch agents learn to solve complex tasks in real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Training Visualization */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Training Progress</h3>
              <div className="flex items-center gap-2 text-green-500 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live
              </div>
            </div>
            
            {/* Fake chart */}
            <div className="h-48 bg-secondary/50 rounded-xl flex items-end justify-around p-4 gap-2">
              {[30, 45, 35, 55, 48, 65, 58, 72, 68, 80, 75, 88].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-primary to-teal rounded-t transition-all duration-300 hover:opacity-80"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Episode: 847/1000</span>
              <div className="flex items-center gap-2 text-primary">
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">Reward: +234.5</span>
              </div>
            </div>
          </div>

          {/* Unity Environment */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Unity Environment</h3>
              <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">ML-Agents v2.0</span>
            </div>
            
            {/* Fake Unity viewport */}
            <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-dashed border-primary/50 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-teal/30 rounded-full" />
              </div>
              
              {/* Agent representation */}
              <div className="w-8 h-8 bg-primary rounded-lg animate-float shadow-glow" />
              
              {/* Target */}
              <div className="absolute bottom-8 right-8 w-6 h-6 bg-teal rounded-full animate-pulse" />
              
              {/* Play overlay */}
              <button className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </button>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">3D Ball Balance</span>
              <span className="text-teal font-medium">Agent: Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
