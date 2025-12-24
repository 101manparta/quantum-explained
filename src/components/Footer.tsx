import { Atom, Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Atom className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="font-display font-semibold">Quantum Education</span>
              <p className="text-xs text-muted-foreground">From Bit to Qubit</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Built for education. No pseudoscience. Just physics.
          </p>

          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/101manparta" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
