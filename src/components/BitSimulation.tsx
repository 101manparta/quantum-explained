import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Binary, ToggleLeft, ToggleRight } from 'lucide-react';

interface BitProps {
  value: boolean;
  onToggle: () => void;
  label: string;
}

const Bit = ({ value, onToggle, label }: BitProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className="flex flex-col items-center gap-3"
    >
      <span className="text-sm text-muted-foreground">{label}</span>
      <div
        className={`bit-indicator cursor-pointer ${value ? 'bit-on' : 'bit-off'}`}
      >
        {value ? '1' : '0'}
      </div>
      <motion.div
        animate={{ opacity: value ? 1 : 0.3 }}
        className="flex items-center gap-1"
      >
        {value ? (
          <ToggleRight className="w-6 h-6 text-primary" />
        ) : (
          <ToggleLeft className="w-6 h-6 text-muted-foreground" />
        )}
      </motion.div>
    </motion.button>
  );
};

const LogicGateDemo = ({ 
  gate, 
  input1, 
  input2, 
  result 
}: { 
  gate: string; 
  input1: boolean; 
  input2: boolean; 
  result: boolean;
}) => {
  return (
    <div className="glass-card p-6 text-center">
      <h4 className="font-display font-semibold mb-4 text-lg">{gate} Gate</h4>
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col gap-2">
          <span className={`bit-indicator w-10 h-10 text-lg ${input1 ? 'bit-on' : 'bit-off'}`}>
            {input1 ? '1' : '0'}
          </span>
          <span className={`bit-indicator w-10 h-10 text-lg ${input2 ? 'bit-on' : 'bit-off'}`}>
            {input2 ? '1' : '0'}
          </span>
        </div>
        <span className="text-muted-foreground">→</span>
        <div className={`bit-indicator ${result ? 'bit-on' : 'bit-off'}`}>
          {result ? '1' : '0'}
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        {gate === 'AND' && 'Output is 1 only if BOTH inputs are 1'}
        {gate === 'OR' && 'Output is 1 if ANY input is 1'}
        {gate === 'XOR' && 'Output is 1 if inputs are DIFFERENT'}
      </p>
    </div>
  );
};

export const BitSimulation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [bits, setBits] = useState([false, true, false, true]);

  const toggleBit = (index: number) => {
    setBits(prev => prev.map((bit, i) => i === index ? !bit : bit));
  };

  const andResult = bits[0] && bits[1];
  const orResult = bits[0] || bits[1];
  const xorResult = bits[2] !== bits[3];

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/10 mb-6">
            <Binary className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Interactive Simulation</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Try It: <span className="quantum-gradient-text">Toggle the Bits</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Click on any bit to switch between 0 and 1. Watch how logic gates process your input.
          </p>
        </motion.div>

        {/* Interactive Bits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 mb-12"
        >
          <h3 className="font-display text-xl font-semibold mb-8 text-center">
            Click to Toggle Each Bit
          </h3>
          <div className="flex justify-center gap-8 flex-wrap">
            {bits.map((bit, index) => (
              <Bit
                key={index}
                value={bit}
                onToggle={() => toggleBit(index)}
                label={`Bit ${index + 1}`}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Binary value: <span className="font-mono text-primary font-bold text-xl">
                {bits.map(b => b ? '1' : '0').join('')}
              </span>
              <span className="mx-4">=</span>
              Decimal: <span className="font-mono text-secondary font-bold text-xl">
                {parseInt(bits.map(b => b ? '1' : '0').join(''), 2)}
              </span>
            </p>
          </div>
        </motion.div>

        {/* Logic Gates */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-display text-xl font-semibold mb-8 text-center">
            Logic Gates in Action
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <LogicGateDemo gate="AND" input1={bits[0]} input2={bits[1]} result={andResult} />
            <LogicGateDemo gate="OR" input1={bits[0]} input2={bits[1]} result={orResult} />
            <LogicGateDemo gate="XOR" input1={bits[2]} input2={bits[3]} result={xorResult} />
          </div>
          <p className="text-center text-muted-foreground mt-8">
            Everything is <span className="text-primary font-semibold">deterministic</span>: 
            same inputs → same outputs. Always.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
