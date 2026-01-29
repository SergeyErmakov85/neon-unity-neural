import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Chen",
    role: "ML Engineer at TechCorp",
    avatar: "AC",
    content: "Finally, an RL course that bridges theory and practice. The Unity ML-Agents integration is exactly what I needed for my game AI projects.",
    rating: 5,
  },
  {
    name: "Sarah Miller",
    role: "PhD Candidate, Stanford",
    avatar: "SM",
    content: "The code quality is exceptional. I can actually reproduce the experiments from papers now, which has accelerated my research significantly.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Game Developer",
    avatar: "JW",
    content: "I went from zero RL knowledge to training my first game agent in just two weeks. The step-by-step approach really works.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Loved by learners worldwide
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students who have transformed their RL skills with our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">{testimonial.avatar}</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
