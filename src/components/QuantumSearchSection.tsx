import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Search, Zap } from 'lucide-react';

export const QuantumSearchSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [classicalStep, setClassicalStep] = useState(0);
  const [quantumPhase, setQuantumPhase] = useState<'superposition' | 'interference' | 'found'>('superposition');
  const [isRunning, setIsRunning] = useState(false);

  const items = Array(16).fill(null).map((_, i) => i === 7); // Target is at index 7
  const targetIndex = 7;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setClassicalStep(prev => {
          if (prev >= targetIndex) {
            setIsRunning(false);
            return prev;
          }
          return prev + 1;
        });

        // Quantum phases
        setTimeout(() => setQuantumPhase('interference'), 500);
        setTimeout(() => setQuantumPhase('found'), 1000);
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startSearch = () => {
    setClassicalStep(0);
    setQuantumPhase('superposition');
    setIsRunning(true);
  };

  const resetSearch = () => {
    setClassicalStep(0);
    setQuantumPhase('superposition');
    setIsRunning(false);
  };

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/10 mb-6">
            <Search className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Interactive Demo</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Classical vs <span className="quantum-gradient-text">Quantum</span> Search
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch how quantum parallelism can find solutions differently than classical sequential search.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Classical Search */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8"
          >
            <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Search className="w-4 h-4 text-muted-foreground" />
              </div>
              Classical Search
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Checks one item at a time. Worst case: N steps.
            </p>

            <div className="grid grid-cols-4 gap-2 mb-6">
              {items.map((isTarget, i) => (
                <div
                  key={i}
                  className={`h-12 rounded-lg flex items-center justify-center text-sm font-mono transition-all duration-200 ${
                    i < classicalStep
                      ? 'bg-muted/50 text-muted-foreground'
                      : i === classicalStep
                      ? isTarget
                        ? 'bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.5)]'
                        : 'bg-destructive/30 text-destructive animate-pulse'
                      : 'bg-muted/20 border border-border text-muted-foreground'
                  }`}
                >
                  {i === targetIndex ? '★' : i}
                </div>
              ))}
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Steps taken: <span className="font-mono text-foreground">{classicalStep}</span>
              {classicalStep >= targetIndex && (
                <span className="text-primary ml-2">Found!</span>
              )}
            </div>
          </motion.div>

          {/* Quantum Search */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-8 glow-border"
          >
            <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              Quantum Approach
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Explores all possibilities, amplifies correct answer. ~√N steps.
            </p>

            <div className="grid grid-cols-4 gap-2 mb-6">
              {items.map((isTarget, i) => (
                <motion.div
                  key={i}
                  animate={
                    quantumPhase === 'superposition'
                      ? { opacity: [0.3, 0.7, 0.3] }
                      : quantumPhase === 'interference'
                      ? { 
                          opacity: isTarget ? 1 : [0.5, 0.2, 0.5],
                          scale: isTarget ? [1, 1.1, 1] : 1
                        }
                      : { opacity: isTarget ? 1 : 0.2 }
                  }
                  transition={{ duration: 0.5, repeat: quantumPhase === 'superposition' ? Infinity : 0 }}
                  className={`h-12 rounded-lg flex items-center justify-center text-sm font-mono ${
                    quantumPhase === 'found' && isTarget
                      ? 'bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.5)]'
                      : 'bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30'
                  }`}
                >
                  {quantumPhase === 'superposition' ? '?' : i === targetIndex ? '★' : i}
                </motion.div>
              ))}
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Phase: <span className="font-mono text-primary capitalize">{quantumPhase}</span>
              {quantumPhase === 'found' && (
                <span className="text-primary ml-2">Amplified & Found!</span>
              )}
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={startSearch}
            disabled={isRunning}
            className="quantum-button text-primary-foreground font-semibold disabled:opacity-50"
          >
            <span className="relative z-10">Start Search</span>
          </button>
          <button
            onClick={resetSearch}
            className="px-8 py-4 rounded-xl border border-border bg-muted/20 text-foreground font-semibold hover:bg-muted/40 transition-all"
          >
            Reset
          </button>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto"
        >
          <span className="text-primary font-semibold">Key insight:</span> Quantum computers don't "try everything at once" — 
          they use interference to <span className="text-secondary">amplify correct probabilities</span> and 
          cancel wrong ones.
        </motion.p>
      </div>
    </section>
  );
};
