import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, X } from 'lucide-react';

const capabilities = [
  { 
    text: 'Cryptography (Shor\'s Algorithm)', 
    canDo: true,
    description: 'Can break current encryption by factoring large numbers exponentially faster'
  },
  { 
    text: 'Molecular Simulation', 
    canDo: true,
    description: 'Simulate quantum systems for drug discovery and materials science'
  },
  { 
    text: 'Optimization Problems', 
    canDo: true,
    description: 'Find optimal solutions in complex systems like logistics and finance'
  },
  { 
    text: 'General-purpose faster computing', 
    canDo: false,
    description: 'Quantum computers are NOT faster at everyday tasks like browsing or editing'
  },
  { 
    text: 'Consciousness or thinking', 
    canDo: false,
    description: 'Quantum computers are machines, not minds. They compute, not contemplate.'
  },
  { 
    text: 'Manifestation or mindset claims', 
    canDo: false,
    description: '"Quantum" in self-help is pseudoscience, not physics.'
  },
];

export const CapabilitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            What Quantum Computers <span className="quantum-gradient-text">Can & Cannot</span> Do
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Separating real capabilities from science fiction.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card p-6 transition-all duration-300 hover:scale-[1.02] ${
                item.canDo 
                  ? 'hover:border-primary/50' 
                  : 'hover:border-destructive/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  item.canDo 
                    ? 'bg-primary/20' 
                    : 'bg-destructive/20'
                }`}>
                  {item.canDo ? (
                    <Check className="w-5 h-5 text-primary" />
                  ) : (
                    <X className="w-5 h-5 text-destructive" />
                  )}
                </div>
                <div>
                  <h3 className={`font-semibold mb-2 ${
                    item.canDo ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {item.text}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-muted-foreground mt-12 max-w-2xl mx-auto"
        >
          Quantum computers are <span className="text-primary font-medium">specialized tools</span>, 
          not magical replacements for classical computers. They excel at specific problems 
          where quantum properties provide an advantage.
        </motion.p>
      </div>
    </section>
  );
};
