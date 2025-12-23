import { Helmet } from 'react-helmet-async';
import { ParticleBackground } from '@/components/ParticleBackground';
import { HeroSection } from '@/components/HeroSection';
import { ClassicalComputingSection } from '@/components/ClassicalComputingSection';
import { BitSimulation } from '@/components/BitSimulation';
import { TransitionSection } from '@/components/TransitionSection';
import { QuantumConceptsSection } from '@/components/QuantumConceptsSection';
import { BitVsQubitSection } from '@/components/BitVsQubitSection';
import { QuantumSearchSection } from '@/components/QuantumSearchSection';
import { CapabilitiesSection } from '@/components/CapabilitiesSection';
import { MythBusterSection } from '@/components/MythBusterSection';
import { TakeawaySection } from '@/components/TakeawaySection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Quantum Is Not Magic — Understanding Quantum Mechanics & Computing</title>
        <meta 
          name="description" 
          content="Learn quantum mechanics and quantum computing fundamentals. Interactive educational website explaining the difference between bits and qubits, superposition, entanglement, and debunking quantum myths." 
        />
        <meta name="keywords" content="quantum computing, quantum mechanics, qubits, superposition, entanglement, educational" />
        <link rel="canonical" href="https://quantum-education.example.com" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        
        <main>
          <HeroSection />
          <ClassicalComputingSection />
          <BitSimulation />
          <TransitionSection />
          <QuantumConceptsSection />
          <BitVsQubitSection />
          <QuantumSearchSection />
          <CapabilitiesSection />
          <MythBusterSection />
          <TakeawaySection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
