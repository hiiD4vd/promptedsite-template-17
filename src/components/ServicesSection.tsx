import React from 'react';

export const ServicesSection: React.FC = () => {
  return (
    <section aria-labelledby="em-services-title" className="em em-section em-light" id="services">
      <div aria-hidden="true" className="em-light__bg" />
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
                What we build
              </span>
            </span>
            <h2 className="em-h2" data-reveal="" id="em-services-title" style={{ '--d': '1' } as React.CSSProperties}>
              One model of your product. Every job it does after that.
            </h2>
          </div>
          <div className="em-section__side" data-reveal="" style={{ '--d': '2' } as React.CSSProperties}>
            <p className="em-lead">
              Built from your physical sample and your colour references, then put to work wherever your customer decides.
            </p>
            <a className="em-link" href="#configurator">
              Explore 3D models
              <svg aria-hidden="true" viewBox="0 0 14 14">
                <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
          </div>
        </div>
        <div className="em-groups">
          <article className="em-group" data-reveal="" style={{ '--d': '0' } as React.CSSProperties}>
            <header className="em-group__head">
              <span className="em-group__kicker">Build</span>
              <h3 className="em-h3">Your product, in 3D</h3>
            </header>
            <ul>
              <li><b>3D model</b><span>GLB · USDZ</span></li>
              <li><b>Materials and finishes</b><span>matched to the sample</span></li>
              <li><b>AR, in their room</b><span>iOS · Android</span></li>
            </ul>
            <p className="em-group__note">Everything else starts here. Source files included.</p>
          </article>
          <article className="em-group" data-reveal="" style={{ '--d': '1' } as React.CSSProperties}>
            <header className="em-group__head">
              <span className="em-group__kicker">Sell</span>
              <h3 className="em-h3">On the product page</h3>
            </header>
            <ul>
              <li><b>Configurators</b><span>options · live price</span></li>
              <li><b>Personalisation</b><span>engraving · monogram</span></li>
              <li><b>Made to measure</b><span>size · price · build sheet</span></li>
              <li><b>Scroll stories</b><span>opens · moves</span></li>
            </ul>
            <p className="em-group__note">The price updates as the customer builds.</p>
          </article>
          <article className="em-group" data-reveal="" style={{ '--d': '2' } as React.CSSProperties}>
            <header className="em-group__head">
              <span className="em-group__kicker">Run</span>
              <h3 className="em-h3">Inside your business</h3>
            </header>
            <ul>
              <li><b>Store integration</b><span>Shopify · Magento · API</span></li>
              <li><b>Sales tools</b><span>showroom · planners</span></li>
              <li><b>Team extension</b><span>your pipeline</span></li>
            </ul>
            <p className="em-group__note">For brands with more products than hands, and 3D platforms that need production capacity.</p>
          </article>
        </div>
      </div>
    </section>
  );
};
