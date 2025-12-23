import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Waves, Target, Link2 } from 'lucide-react';

const SuperpositionDemo = () => {
  const [probability, setProbability] = useState(50);
  const [measured, setMeasured] = useState<null | 0 | 1>(null);

  const handleMeasure = () => {
    const result = Math.random() * 100 < probability ? 1 : 0;
    setMeasured(result);
    setTimeout(() => setMeasured(null), 2000);
  };

  return (
    <div className="glass-card p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Waves className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-display text-xl font-semibold">Superposition</h3>
      </div>

      <p className="text-muted-foreground mb-6">
        A qubit exists in a <span className="text-primary">combination</span> of both |0⟩ and |1⟩ states 
        simultaneously — until measured.
      </p>

      {/* Wave visualization */}
      <div className="relative h-32 mb-6 overflow-hidden rounded-lg bg-background/50">
        <svg viewBox="0 0 400 100" className="w-full h-full">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--quantum-cyan))" />
              <stop offset="50%" stopColor="hsl(var(--quantum-purple))" />
              <stop offset="100%" stopColor="hsl(var(--quantum-pink))" />
            </linearGradient>
          </defs>
          <motion.path
            d={`M 0 50 Q 50 ${30 - (probability - 50) * 0.4} 100 50 Q 150 ${70 + (probability - 50) * 0.4} 200 50 Q 250 ${30 - (probability - 50) * 0.4} 300 50 Q 350 ${70 + (probability - 50) * 0.4} 400 50`}
            fill="none"
            stroke="url(#waveGradient)"
            strokeWidth="3"
            animate={{
              d: [
                `M 0 50 Q 50 ${30 - (probability - 50) * 0.4} 100 50 Q 150 ${70 + (probability - 50) * 0.4} 200 50 Q 250 ${30 - (probability - 50) * 0.4} 300 50 Q 350 ${70 + (probability - 50) * 0.4} 400 50`,
                `M 0 50 Q 50 ${70 + (probability - 50) * 0.4} 100 50 Q 150 ${30 - (probability - 50) * 0.4} 200 50 Q 250 ${70 + (probability - 50) * 0.4} 300 50 Q 350 ${30 - (probability - 50) * 0.4} 400 50`,
                `M 0 50 Q 50 ${30 - (probability - 50) * 0.4} 100 50 Q 150 ${70 + (probability - 50) * 0.4} 200 50 Q 250 ${30 - (probability - 50) * 0.4} 300 50 Q 350 ${70 + (probability - 50) * 0.4} 400 50`,
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
        {measured !== null && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-background/80"
          >
            <span className="font-mono text-6xl font-bold text-primary glow-text">
              |{measured}⟩
            </span>
          </motion.div>
        )}
      </div>

      {/* Probability slider */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">|0⟩ probability: {100 - probability}%</span>
          <span className="text-muted-foreground">|1⟩ probability: {probability}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={probability}
          onChange={(e) => setProbability(Number(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
        />
      </div>

      <button
        onClick={handleMeasure}
        className="w-full quantum-button text-primary-foreground font-semibold"
      >
        <span className="relative z-10">Measure Qubit</span>
      </button>
    </div>
  );
};

const EntanglementDemo = () => {
  const [qubit1, setQubit1] = useState<0 | 1 | null>(null);
  const [qubit2, setQubit2] = useState<0 | 1 | null>(null);
  const [isEntangled, setIsEntangled] = useState(true);

  const measureEntangled = () => {
    const value = Math.random() > 0.5 ? 1 : 0;
    setQubit1(value);
    if (isEntangled) {
      setQubit2(value); // In entanglement, both collapse to same state
    } else {
      setQubit2(Math.random() > 0.5 ? 1 : 0);
    }
    setTimeout(() => {
      setQubit1(null);
      setQubit2(null);
    }, 3000);
  };

  return (
    <div className="glass-card p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
          <Link2 className="w-5 h-5 text-secondary" />
        </div>
        <h3 className="font-display text-xl font-semibold">Entanglement</h3>
      </div>

      <p className="text-muted-foreground mb-6">
        Two entangled qubits share a <span className="text-secondary">correlated</span> quantum state — 
        measuring one instantly determines the other, regardless of distance.
      </p>

      {/* Entangled qubits visualization */}
      <div className="flex items-center justify-center gap-8 mb-8">
        <motion.div
          animate={qubit1 === null ? { 
            boxShadow: ['0 0 20px hsl(var(--quantum-cyan)/0.3)', '0 0 40px hsl(var(--quantum-cyan)/0.6)', '0 0 20px hsl(var(--quantum-cyan)/0.3)']
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
          className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-mono font-bold border-2 ${
            qubit1 !== null 
              ? 'bg-primary/20 border-primary' 
              : 'bg-muted/20 border-muted'
          }`}
        >
          {qubit1 !== null ? `|${qubit1}⟩` : '?'}
        </motion.div>

        {/* Connection line */}
        <div className="relative w-24">
          <motion.div
            animate={isEntangled ? {
              opacity: [0.3, 1, 0.3],
              scaleX: [0.8, 1, 0.8]
            } : { opacity: 0.3 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="h-0.5 bg-gradient-to-r from-primary via-secondary to-primary"
          />
          {isEntangled && (
            <motion.div
              animate={{ x: [-20, 44] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-secondary shadow-[0_0_10px_hsl(var(--quantum-purple))]"
            />
          )}
        </div>

        <motion.div
          animate={qubit2 === null ? { 
            boxShadow: ['0 0 20px hsl(var(--quantum-purple)/0.3)', '0 0 40px hsl(var(--quantum-purple)/0.6)', '0 0 20px hsl(var(--quantum-purple)/0.3)']
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-mono font-bold border-2 ${
            qubit2 !== null 
              ? 'bg-secondary/20 border-secondary' 
              : 'bg-muted/20 border-muted'
          }`}
        >
          {qubit2 !== null ? `|${qubit2}⟩` : '?'}
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => setIsEntangled(!isEntangled)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            isEntangled 
              ? 'bg-secondary/20 text-secondary border border-secondary/50' 
              : 'bg-muted text-muted-foreground border border-border'
          }`}
        >
          {isEntangled ? 'Entangled' : 'Not Entangled'}
        </button>
      </div>

      <button
        onClick={measureEntangled}
        className="w-full py-3 rounded-xl bg-secondary/20 border border-secondary/50 text-secondary font-semibold hover:bg-secondary/30 transition-all"
      >
        Measure Both Qubits
      </button>
    </div>
  );
};

export const QuantumConceptsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="quantum-concepts" className="py-24 relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 mb-6">
            <Waves className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Quantum Mechanics</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Core <span className="quantum-gradient-text">Quantum Concepts</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The strange but mathematically precise rules that govern the quantum world.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SuperpositionDemo />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <EntanglementDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
