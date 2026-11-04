import { mediaUrl } from '../config/media';
import React from 'react';

export const CaseStoriesSection: React.FC = () => {
  return (
    <section aria-labelledby="em-stories-title" className="em em-section" id="work" style={{ paddingTop: 0 } as React.CSSProperties}>
      <div className="em-wrap">
        <div className="em-section__head">
          <div>
            <span data-reveal="" style={{ '--d': '0' } as React.CSSProperties}>
              <span className="em-tag">
                <span className="em-tag__box">
                  <svg aria-hidden="true" className="em-plus" viewBox="0 0 10 10">
                    <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </span>
                Projects
              </span>
            </span>
            <h2 className="em-h2" data-reveal="" id="em-stories-title" style={{ '--d': '1' } as React.CSSProperties}>
              Brands that decided their product deserves 3D.
            </h2>
          </div>
          <div className="em-section__side" data-reveal="" style={{ '--d': '2' } as React.CSSProperties}>
            <a className="em-link" href="#configurator">
              All 3D models
              <svg aria-hidden="true" viewBox="0 0 14 14">
                <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
          </div>
        </div>

        <article className="em-feature" data-reveal="" style={{ '--d': '0' } as React.CSSProperties}>
          <div className="em-feature__media">
            <img
              alt="Dozze bottle in 3D"
              decoding="async"
              loading="lazy"
              src={mediaUrl("/renders/dozze-bottle.webp")}
              style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' } as React.CSSProperties}
            />
          </div>
          <div className="em-feature__body">
            <div className="em-feature__stats">
              <div>
                <b>Dozze</b>
                <span className="em-body">Water bottles and tumblers</span>
              </div>
              <div>
                <b>3D + AR</b>
                <span className="em-body">Configurator on Shopify</span>
              </div>
            </div>
            <blockquote className="em-quote">
              “Promptedsite built the 3D and AR configurator for our Shopify store, and it's become one of the standout features of our product pages.”
            </blockquote>
            <div className="em-person">
              <b>Andreas Venizelos</b>
              <span>Founder and CEO, Dozze · Google review</span>
            </div>
            <div>
              <a className="em-link" href="#configurator">
                Explore in 3D
                <svg aria-hidden="true" viewBox="0 0 14 14">
                  <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </a>
            </div>
          </div>
        </article>

        <div className="em-cards">
          <a className="em-card-link" data-reveal="" href="#configurator" style={{ '--d': '1' } as React.CSSProperties}>
            <div className="em-card-link__img">
              <img
                alt="Globe-Trotter"
                decoding="async"
                loading="lazy"
                src={mediaUrl("/renders/globe-trotter.webp")}
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' } as React.CSSProperties}
              />
            </div>
            <div className="em-card-link__body">
              <span className="em-card-link__kicker">Custom luggage configurator</span>
              <h3 className="em-h3">Globe-Trotter</h3>
              <p className="em-body">
                Every shell colour, leather, lining and initial chosen on one model, then sent to the workshop.
              </p>
              <span className="em-card-link__foot">
                Explore in 3D
                <svg aria-hidden="true" viewBox="0 0 14 14">
                  <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
            </div>
          </a>

          <a className="em-card-link" data-reveal="" href="#configurator" style={{ '--d': '2' } as React.CSSProperties}>
            <div className="em-card-link__img">
              <img
                alt="Grau"
                decoding="async"
                loading="lazy"
                src={mediaUrl("/renders/grau-salt.webp")}
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' } as React.CSSProperties}
              />
            </div>
            <div className="em-card-link__body">
              <span className="em-card-link__kicker">AR viewer</span>
              <h3 className="em-h3">Grau</h3>
              <p className="em-body">
                Grau lets the customer place a lamp in the room before buying.
              </p>
              <span className="em-card-link__foot">
                Explore in 3D
                <svg aria-hidden="true" viewBox="0 0 14 14">
                  <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
            </div>
          </a>

          <a className="em-card-link" data-reveal="" href="#configurator" style={{ '--d': '3' } as React.CSSProperties}>
            <div className="em-card-link__img">
              <img
                alt="Baragoni"
                decoding="async"
                loading="lazy"
                src={mediaUrl("/renders/baragoni-bag.webp")}
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' } as React.CSSProperties}
              />
            </div>
            <div className="em-card-link__body">
              <span className="em-card-link__kicker">3D product viewer</span>
              <h3 className="em-h3">Baragoni</h3>
              <p className="em-body">
                Baragoni shows its leather bags in 3D, stitching and hardware included.
              </p>
              <span className="em-card-link__foot">
                Explore in 3D
                <svg aria-hidden="true" viewBox="0 0 14 14">
                  <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
