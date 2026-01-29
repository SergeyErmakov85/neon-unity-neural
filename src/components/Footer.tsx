import { Github, Twitter, MessageCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">RL</span>
              </div>
              <span className="font-bold text-foreground">RL Academy</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Master reinforcement learning with hands-on projects and real game environments.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/SergeyErmakov85" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Learning */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Learning</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/beginner-course" className="text-muted-foreground hover:text-foreground transition-colors">
                  Beginner Course
                </Link>
              </li>
              <li>
                <Link to="/code-examples" className="text-muted-foreground hover:text-foreground transition-colors">
                  Code Examples
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground/60">Advanced Topics (Soon)</span>
              </li>
              <li>
                <span className="text-muted-foreground/60">Projects (Soon)</span>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://github.com/SergeyErmakov85/My_First_NPC" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  GitHub Repository
                </a>
              </li>
              <li>
                <span className="text-muted-foreground/60">Documentation (Soon)</span>
              </li>
              <li>
                <span className="text-muted-foreground/60">Blog (Soon)</span>
              </li>
              <li>
                <span className="text-muted-foreground/60">Community Forum (Soon)</span>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="text-muted-foreground/60">FAQ (Soon)</span>
              </li>
              <li>
                <a href="mailto:contact@example.com" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Us
                </a>
              </li>
              <li>
                <span className="text-muted-foreground/60">Discord (Soon)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 RL Academy. Built with PyTorch & Unity ML-Agents.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
