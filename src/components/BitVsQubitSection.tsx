import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Minus, Zap } from 'lucide-react';

export const BitVsQubitSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-radial-glow opacity-20" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Bit vs <span className="quantum-gradient-text">Qubit</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            A side-by-side comparison of classical and quantum information.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Classical Bit */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <Minus className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold">Classical Bit</h3>
                <p className="text-muted-foreground">Deterministic</p>
              </div>
            </div>

            {/* Static bit visualization */}
            <div className="flex justify-center gap-8 my-8">
              <div className="text-center">
                <div className="w-20 h-20 rounded-xl bg-muted border-2 border-border flex items-center justify-center mb-2">
                  <span className="font-mono text-4xl font-bold text-muted-foreground">0</span>
                </div>
                <span className="text-sm text-muted-foreground">OFF</span>
              </div>
              <div className="flex items-center text-muted-foreground">or</div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-xl bg-primary/20 border-2 border-primary flex items-center justify-center mb-2 shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
                  <span className="font-mono text-4xl font-bold text-primary">1</span>
                </div>
                <span className="text-sm text-primary">ON</span>
              </div>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">Exists in exactly <span className="text-foreground font-medium">one state</span> at any time</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">Based on <span className="text-foreground font-medium">electrical voltage</span></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">Same input → <span className="text-foreground font-medium">always same output</span></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">Copying is <span className="text-foreground font-medium">trivial</span></span>
              </li>
            </ul>
          </motion.div>

          {/* Quantum Qubit */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-8 glow-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold">Quantum Qubit</h3>
                <p className="text-primary">Probabilistic</p>
              </div>
            </div>

            {/* Wave visualization */}
            <div className="flex justify-center my-8">
              <div className="relative w-40 h-20">
                <svg viewBox="0 0 160 80" className="w-full h-full">
                  <defs>
                    <linearGradient id="qubitWave" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--quantum-cyan))" />
                      <stop offset="50%" stopColor="hsl(var(--quantum-purple))" />
                      <stop offset="100%" stopColor="hsl(var(--quantum-cyan))" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M 0 40 Q 20 10 40 40 Q 60 70 80 40 Q 100 10 120 40 Q 140 70 160 40"
                    fill="none"
                    stroke="url(#qubitWave)"
                    strokeWidth="3"
                    animate={{
                      d: [
                        "M 0 40 Q 20 10 40 40 Q 60 70 80 40 Q 100 10 120 40 Q 140 70 160 40",
                        "M 0 40 Q 20 70 40 40 Q 60 10 80 40 Q 100 70 120 40 Q 140 10 160 40",
                        "M 0 40 Q 20 10 40 40 Q 60 70 80 40 Q 100 10 120 40 Q 140 70 160 40",
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </svg>
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 font-mono text-sm text-primary">|0⟩</div>
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 font-mono text-sm text-secondary">|1⟩</div>
              </div>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span className="text-muted-foreground">Exists in <span className="text-primary font-medium">superposition</span> of both states</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span className="text-muted-foreground">Based on <span className="text-primary font-medium">quantum properties</span> (spin, photon polarization)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span className="text-muted-foreground">Measurement <span className="text-primary font-medium">collapses</span> to one result</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span className="text-muted-foreground">Cannot be copied (<span className="text-primary font-medium">no-cloning theorem</span>)</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
