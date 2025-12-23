import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

const myths = [
  {
    myth: '"Quantum energy attracts wealth and success"',
    reality: 'Quantum mechanics describes subatomic particle behavior. It has nothing to do with your bank account or life goals.',
    keyword: 'Misuse of scientific terminology'
  },
  {
    myth: '"Observation creates reality with your mind"',
    reality: 'In physics, "observation" means measurement with instruments, not consciousness. A photon detector, not your thoughts, collapses wave functions.',
    keyword: 'Misunderstood physics'
  },
  {
    myth: '"We are all connected through quantum entanglement"',
    reality: 'Entanglement requires precise laboratory conditions with isolated particles. Human bodies are too warm and chaotic to maintain quantum coherence.',
    keyword: 'False extrapolation'
  },
  {
    myth: '"Quantum healing can cure diseases"',
    reality: 'There is zero scientific evidence for "quantum healing." Medicine works through chemistry and biology, not quantum woo.',
    keyword: 'Pseudoscience'
  },
];

export const MythBusterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-destructive/5 to-transparent" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-destructive/30 bg-destructive/10 mb-6">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">Myth Buster</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Quantum <span className="text-destructive">Misinformation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't let pseudoscience hijack real physics. Here's what's actually true.
          </p>
        </motion.div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {myths.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card overflow-hidden"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full p-6 text-left flex items-start gap-4 hover:bg-muted/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center flex-shrink-0">
                  <X className="w-5 h-5 text-destructive" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-medium text-destructive/70 uppercase tracking-wider">
                    {item.keyword}
                  </span>
                  <h3 className="font-display text-lg font-semibold mt-1 text-foreground">
                    {item.myth}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  className="text-muted-foreground"
                >
                  ↓
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{ 
                  height: expandedIndex === index ? 'auto' : 0,
                  opacity: expandedIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-0">
                  <div className="pl-14 border-l-2 border-primary/30 ml-5">
                    <p className="text-muted-foreground leading-relaxed">
                      <span className="text-primary font-semibold">Reality: </span>
                      {item.reality}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real quantum physics is fascinating enough without the mysticism. 
            <span className="text-primary font-medium"> Stick to the science.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
