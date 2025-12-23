import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Cpu, Zap, ArrowRight } from 'lucide-react';

const TransistorVisual = ({ isOn, delay = 0 }: { isOn: boolean; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={`relative w-16 h-20 rounded-lg border-2 transition-all duration-500 ${
        isOn 
          ? 'border-primary bg-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.5)]' 
          : 'border-muted bg-muted/20'
      }`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={isOn ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.3 }}
          transition={{ duration: 1, repeat: Infinity }}
          className={`w-8 h-8 rounded-full ${isOn ? 'bg-primary' : 'bg-muted'}`}
        />
      </div>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-sm font-bold">
        {isOn ? '1' : '0'}
      </div>
      {isOn && (
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4"
        >
          <Zap className="w-4 h-4 text-primary" />
        </motion.div>
      )}
    </motion.div>
  );
};

const LogicGateFlow = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-4 py-8">
      {/* Input */}
      <motion.div
        animate={{ opacity: step >= 0 ? 1 : 0.3 }}
        className="glass-card p-4 text-center"
      >
        <div className="text-sm text-muted-foreground mb-2">Input</div>
        <div className="font-mono text-2xl font-bold text-primary">1 0 1</div>
      </motion.div>

      <motion.div animate={{ opacity: step >= 1 ? 1 : 0.3 }}>
        <ArrowRight className="w-6 h-6 text-primary" />
      </motion.div>

      {/* Logic Gates */}
      <motion.div
        animate={{ 
          opacity: step >= 1 ? 1 : 0.3,
          boxShadow: step === 1 ? '0 0 30px hsl(var(--primary)/0.5)' : 'none'
        }}
        className="glass-card p-4 text-center"
      >
        <div className="text-sm text-muted-foreground mb-2">Logic Gates</div>
        <div className="flex gap-2 justify-center">
          <span className="px-2 py-1 bg-primary/20 rounded text-xs font-mono">AND</span>
          <span className="px-2 py-1 bg-secondary/20 rounded text-xs font-mono">OR</span>
          <span className="px-2 py-1 bg-accent/20 rounded text-xs font-mono">NOT</span>
        </div>
      </motion.div>

      <motion.div animate={{ opacity: step >= 2 ? 1 : 0.3 }}>
        <ArrowRight className="w-6 h-6 text-primary" />
      </motion.div>

      {/* Output */}
      <motion.div
        animate={{ 
          opacity: step >= 2 ? 1 : 0.3,
          boxShadow: step >= 2 ? '0 0 30px hsl(var(--primary)/0.5)' : 'none'
        }}
        className="glass-card p-4 text-center"
      >
        <div className="text-sm text-muted-foreground mb-2">Output</div>
        <div className="font-mono text-2xl font-bold text-primary">0 1 0</div>
      </motion.div>
    </div>
  );
};

export const ClassicalComputingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [transistorStates, setTransistorStates] = useState([true, false, true, false, true, false, true, true]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransistorStates(prev => prev.map(() => Math.random() > 0.5));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="classical-computing" className="py-24 relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Classical Computing</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            How <span className="quantum-gradient-text">Classical Computers</span> Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Computers do not understand. They only switch states.
          </p>
        </motion.div>

        {/* Transistor Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 mb-12"
        >
          <h3 className="font-display text-xl font-semibold mb-6 text-center">
            Transistors: The Building Blocks
          </h3>
          <p className="text-muted-foreground text-center mb-8">
            Each transistor is either ON (1) or OFF (0) — controlled by electrical voltage.
          </p>
          <div className="flex justify-center gap-8 flex-wrap pb-8">
            {transistorStates.map((isOn, index) => (
              <TransistorVisual key={index} isOn={isOn} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Logic Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card p-8"
        >
          <h3 className="font-display text-xl font-semibold mb-6 text-center">
            Information Flow: Input → Logic → Output
          </h3>
          <LogicGateFlow />
          <p className="text-muted-foreground text-center mt-6 text-sm">
            All operations are <span className="text-primary font-semibold">deterministic</span> — 
            the same input always produces the same output.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
