import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ExplainerSection } from './components/ExplainerSection';
import { ProblemSection } from './components/ProblemSection';
import { Interactive3DSection } from './components/Interactive3DSection';
import { ServicesSection } from './components/ServicesSection';
import { ParametricSection } from './components/ParametricSection';
import { OutcomesSection } from './components/OutcomesSection';
import { CaseStoriesSection } from './components/CaseStoriesSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] relative selection:bg-brand-gold selection:text-black">
      {/* Ambient background lighting */}
      <div className="atmosphere" />
      {/* Film grain texture */}
      <div className="grain" />

      {/* Navigation Header */}
      <Header />

      {/* Main Sections */}
      <main id="hero">
        <HeroSection />
        <ExplainerSection />
        <ProblemSection />
        <Interactive3DSection />
        <ServicesSection />
        <ParametricSection />
        <OutcomesSection />
        <CaseStoriesSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
