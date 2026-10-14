import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section aria-labelledby="em-hero-title" className="em em-hero">
      <div aria-hidden="true" className="em-hero__media">
        <video autoPlay loop muted playsInline poster="/ember/hero-poster.webp" preload="auto">
          <source src="/ember/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="em-wrap em-hero__inner">
        <div data-reveal="" style={{ '--d': '0' } as React.CSSProperties}>
          <span className="em-tag">
            <span className="em-tag__box">
              <svg aria-hidden="true" className="em-plus" viewBox="0 0 10 10">
                <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </span>
            Real-time 3D for product brands
          </span>
        </div>

        <h1 className="em-display em-hero__title" data-reveal="" id="em-hero-title" style={{ '--d': '1' } as React.CSSProperties}>
          You obsessed over every detail.<br />
          <span className="em-dim">Let customers build it in 3D.</span>
        </h1>

        <div className="em-hero__row">
          <ul className="em-hero__facts" data-reveal="" style={{ '--d': '3' } as React.CSSProperties}>
            <li className="em-chip">
              <svg aria-hidden="true" className="em-plus" viewBox="0 0 10 10">
                <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              No licence, no monthly fees
            </li>
            <li className="em-chip">
              <svg aria-hidden="true" className="em-plus" viewBox="0 0 10 10">
                <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              GLB and USDZ, yours to keep
            </li>
            <li className="em-chip">
              <svg aria-hidden="true" className="em-plus" viewBox="0 0 10 10">
                <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              First version in under 3 days
            </li>
          </ul>

          <div data-reveal="" style={{ '--d': '2' } as React.CSSProperties}>
            <p className="em-lead">
              Your customer explores your product, chooses every option and sees the price. And then they buy it.
            </p>
            <div className="em-hero__actions">
              <a className="em-btn em-btn--solid" data-cursor="ignore" href="#configurator">
                Explore in 3D
                <span className="em-btn__arrow">
                  <svg aria-hidden="true" viewBox="0 0 14 14">
                    <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
              </a>
              <a className="em-btn em-btn--ghost" data-cursor="ignore" href="#explainer">
                Watch the video (1:44)
                <span className="em-btn__arrow">
                  <svg aria-hidden="true" viewBox="0 0 14 14">
                    <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
              </a>
              <a className="em-btn em-btn--ghost" data-cursor="ignore" href="#work">
                See the work
                <span className="em-btn__arrow">
                  <svg aria-hidden="true" viewBox="0 0 14 14">
                    <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="em-trust" data-reveal="" style={{ '--d': '4' } as React.CSSProperties}>
          <span className="em-trust__label">Trusted by</span>
          <ul className="em-trust__list">
            <li>
              <a aria-label="Globe-Trotter, see it live in 3D" href="#configurator">
                <img alt="Globe-Trotter" decoding="async" loading="lazy" src="/logos/clients/globe-trotter.svg" style={{ height: 30 } as React.CSSProperties} />
              </a>
            </li>
            <li>
              <a aria-label="Dozze, see it live in 3D" href="#configurator">
                <img alt="Dozze" decoding="async" loading="lazy" src="/logos/clients/dozze.png" style={{ height: 17 } as React.CSSProperties} />
              </a>
            </li>
            <li>
              <a aria-label="Grau, see it live in 3D" href="#configurator">
                <img alt="Grau" decoding="async" loading="lazy" src="/logos/clients/grau.svg" style={{ height: 17 } as React.CSSProperties} />
              </a>
            </li>
            <li>
              <a aria-label="bOFFx, see it live in 3D" href="#configurator">
                <img alt="bOFFx" decoding="async" loading="lazy" src="/logos/clients/boffx.svg" style={{ height: 18 } as React.CSSProperties} />
              </a>
            </li>
            <li>
              <img alt="Baragoni" decoding="async" loading="lazy" src="/logos/clients/baragoni.svg" style={{ height: 19 } as React.CSSProperties} />
            </li>
            <li>
              <a aria-label="Andrejevic Zlatara, see it live in 3D" href="#configurator">
                <img alt="Andrejevic" decoding="async" loading="lazy" src="/logos/clients/andrejevic.svg" style={{ height: 30 } as React.CSSProperties} />
              </a>
            </li>
            <li>
              <a aria-label="Tvoj Pecat, see it live in 3D" href="#configurator">
                <img alt="Tvoj Pecat" decoding="async" loading="lazy" src="/logos/clients/tvoj-pecat.svg" style={{ height: 40 } as React.CSSProperties} />
              </a>
            </li>
            <li>
              <img alt="The Racquet Club" decoding="async" loading="lazy" src="/logos/clients/racquet-club.svg" style={{ height: 18 } as React.CSSProperties} />
            </li>
            <li>
              <img alt="Drive Commerce" decoding="async" loading="lazy" src="/logos/clients/drive-commerce.png" style={{ height: 22 } as React.CSSProperties} />
            </li>
            <li>
              <img alt="Threedium" decoding="async" loading="lazy" src="/logos/clients/threedium.svg" style={{ height: 30 } as React.CSSProperties} />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
