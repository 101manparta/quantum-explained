import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Atom, Sparkles } from 'lucide-react';

export const TransitionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-quantum-purple/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-quantum-cyan/10 blur-3xl"
        />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Animated atom */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative w-32 h-32 mx-auto mb-12"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-quantum-cyan animate-pulse-glow" />
            </div>
            {/* Electron orbits */}
            {[0, 60, 120].map((rotation, index) => (
              <motion.div
                key={index}
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 3 + index, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: index * 0.5
                }}
                style={{ transform: `rotate(${rotation}deg)` }}
                className="absolute inset-0"
              >
                <div 
                  className="absolute w-full h-full border border-primary/30 rounded-full"
                  style={{ transform: `rotateX(60deg)` }}
                />
                <motion.div
                  className="absolute w-3 h-3 rounded-full bg-quantum-purple"
                  style={{
                    top: '0%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 10px hsl(var(--quantum-purple))'
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <Sparkles className="w-5 h-5 text-secondary" />
            <span className="text-secondary font-medium">Entering the Quantum Realm</span>
            <Sparkles className="w-5 h-5 text-secondary" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-display text-4xl md:text-6xl font-bold mb-6"
          >
            When Classical Rules Fail
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-2xl md:text-3xl quantum-gradient-text font-display font-semibold"
          >
            Quantum Rules Begin
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-muted-foreground mt-8 max-w-xl mx-auto"
          >
            At the atomic scale, particles don't behave like tiny billiard balls. 
            They exist in probability waves — until we measure them.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
