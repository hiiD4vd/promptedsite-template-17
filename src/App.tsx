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
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

export const App: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    });

    let animationFrameId = 0;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] relative selection:bg-brand-gold selection:text-black">
      {/* Ambient background lighting */}
      <div className="atmosphere" />
      {/* Film grain texture */}
      <div className="grain" />

      <a className="skip-link" href="#hero">Skip to content</a>

      {/* Navigation Header */}
      <Header />

      {/* Main Sections */}
      <main id="hero" tabIndex={-1}>
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
