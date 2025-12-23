import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lightbulb, ArrowUp } from 'lucide-react';

export const TakeawaySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-radial-glow opacity-30" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Key Takeaways</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            What We've <span className="quantum-gradient-text">Learned</span>
          </h2>
        </motion.div>

        {/* Summary cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-8 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted mx-auto mb-6 flex items-center justify-center">
              <span className="font-mono text-3xl font-bold text-muted-foreground">01</span>
            </div>
            <h3 className="font-display text-xl font-semibold mb-3">Classical Bit</h3>
            <p className="text-muted-foreground">
              <span className="text-foreground font-medium">Electrical state</span> — 
              deterministic switching between 0 and 1 based on voltage.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-8 text-center glow-border"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/20 mx-auto mb-6 flex items-center justify-center">
              <span className="font-mono text-3xl font-bold text-primary">|ψ⟩</span>
            </div>
            <h3 className="font-display text-xl font-semibold mb-3">Quantum Qubit</h3>
            <p className="text-muted-foreground">
              <span className="text-primary font-medium">Quantum state</span> — 
              superposition of probabilities that collapse upon measurement.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-8 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-secondary/20 mx-auto mb-6 flex items-center justify-center">
              <span className="font-mono text-3xl font-bold text-secondary">≡</span>
            </div>
            <h3 className="font-display text-xl font-semibold mb-3">Meaning</h3>
            <p className="text-muted-foreground">
              <span className="text-secondary font-medium">Comes from humans</span> — 
              computers process, but we interpret. Machines don't "understand."
            </p>
          </motion.div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="glass-card p-12 max-w-3xl mx-auto">
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Understand Technology.
              <br />
              <span className="quantum-gradient-text">Don't Mythologize It.</span>
            </h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Quantum computing is revolutionary — but for scientific and computational reasons, 
              not spiritual ones. Real understanding comes from curiosity, not wishful thinking.
            </p>
            <button
              onClick={scrollToTop}
              className="quantum-button text-primary-foreground font-display inline-flex items-center gap-2"
            >
              <span className="relative z-10">Back to Top</span>
              <ArrowUp className="w-5 h-5 relative z-10" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
