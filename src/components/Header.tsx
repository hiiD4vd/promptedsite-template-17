import React, { useEffect, useRef, useState } from 'react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstMenuLinkRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`em em-nav ${isScrolled ? 'is-scrolled' : ''} ${mobileMenuOpen ? 'is-open' : ''}`}>
        <nav aria-label="Main menu" className="em-nav__bar">
          <a aria-label="Promptedsite" className="em-nav__brand" data-analytics-target="nav.logo.home" href="#hero">
            <span className="t-wordmark text-[15px]">Promptedsite</span>
          </a>
          <ul className="em-nav__links">
            <li>
              <a aria-current="page" className="em-nav__link is-active" data-analytics-target="nav.desktop.home" href="#hero">
                <svg aria-hidden="true" className="em-plus" viewBox="0 0 10 10">
                  <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                Home
              </a>
            </li>
            <li>
              <a className="em-nav__link" data-analytics-target="nav.desktop.configurator" href="#configurator">
                Configurators
              </a>
            </li>
            <li>
              <a className="em-nav__link" data-analytics-target="nav.desktop.explainer" href="#explainer">
                Explainer
              </a>
            </li>
            <li>
              <a className="em-nav__link" data-analytics-target="nav.desktop.services" href="#services">
                Services
              </a>
            </li>
            <li>
              <a className="em-nav__link" data-analytics-target="nav.desktop.work" href="#work">
                Projects
              </a>
            </li>
          </ul>
          <div className="em-nav__end">
            <div className="em-nav__cta">
              <a className="em-btn em-btn--solid" data-analytics-target="cta.header.explore_3d" data-cursor="ignore" href="#configurator">
                Explore 3D
                <span className="em-btn__arrow">
                  <svg aria-hidden="true" viewBox="0 0 14 14">
                    <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
              </a>
            </div>
            <button
              ref={menuButtonRef}
              aria-controls="em-sheet"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="em-nav__burger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-analytics-target="nav.mobile.open"
              type="button"
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div aria-label="Mobile menu" className="em em-sheet is-open" id="em-sheet" role="dialog">
          <div className="em-sheet__inner">
            <ul className="em-sheet__links">
              <li><a ref={firstMenuLinkRef} className="em-nav__link" href="#hero" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
              <li><a className="em-nav__link" href="#configurator" onClick={() => setMobileMenuOpen(false)}>Configurators</a></li>
              <li><a className="em-nav__link" href="#explainer" onClick={() => setMobileMenuOpen(false)}>Explainer</a></li>
              <li><a className="em-nav__link" href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a></li>
              <li><a className="em-nav__link" href="#work" onClick={() => setMobileMenuOpen(false)}>Projects</a></li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
