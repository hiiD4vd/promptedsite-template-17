import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="em em-footer" data-cursor="ignore" id="footer">
      <div aria-hidden="true" className="em-footer__bg" />
      <div className="em-wrap">
        <div className="em-footer__top">
          <div className="em-footer__brand">
            <a aria-label="Promptedsite" data-analytics-target="footer.logo.home" href="#hero">
              <span className="t-wordmark text-[22px]">Promptedsite</span>
            </a>
            <p className="em-footer__tagline">
              3D web systems for product visualization, configurators, and personalization. Built once, yours to keep.
            </p>
            <p className="em-body text-xs text-[var(--ink-dim)]">
              Worldwide · High-Performance 3D Web Studio
            </p>
          </div>
          <div className="em-footer__cols">
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-dim)]">Navigation</span>
              <a className="text-sm text-[var(--ink)] hover:text-brand-gold transition-colors" href="#hero">Home</a>
              <a className="text-sm text-[var(--ink)] hover:text-brand-gold transition-colors" href="#configurator">3D Configurator</a>
              <a className="text-sm text-[var(--ink)] hover:text-brand-gold transition-colors" href="#explainer">Explainer</a>
              <a className="text-sm text-[var(--ink)] hover:text-brand-gold transition-colors" href="#services">Services</a>
              <a className="text-sm text-[var(--ink)] hover:text-brand-gold transition-colors" href="#work">Projects</a>
            </div>
          </div>
        </div>
        <div className="em-footer__bottom">
          <p>© 2026 Promptedsite. All rights reserved.</p>
          <p>Real-time 3D for product brands</p>
        </div>
      </div>
    </footer>
  );
};
