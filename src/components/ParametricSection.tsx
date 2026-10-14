import React, { useState } from 'react';

export const ParametricSection: React.FC = () => {
  const [width, setWidth] = useState<number>(240);
  const [height, setHeight] = useState<number>(236);

  // Dynamic calculations based on wardrobe size
  const sections = Math.ceil(width / 80);
  const sectionWidth = (width / sections).toFixed(1);
  const doors = sections * 2;
  const doorWidth = (width / doors - 0.3).toFixed(1);
  const doorHeight = (height - 8.4).toFixed(1);
  const shelves = sections * 5;
  const shelfWidth = (width / sections - 2.4).toFixed(1);
  const hinges = sections * 8;
  const boardArea = ((width * height * 2 + width * 60 * 4 + height * 60 * (sections + 1) * 2) / 10000).toFixed(1);
  const weight = Math.round(width * height * 0.00475);
  const price = Math.round((width * 6.5 + height * 2.6) * 1.05);

  const pPercent = ((width - 100) / 260);

  return (
    <div className="relative bg-[var(--bg)] overflow-hidden py-20 md:py-28" data-section="SQ" data-section-name="Made to measure" id="parametric">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          aria-hidden="true"
          className="page-grid pointer-events-none absolute inset-0 z-0"
          style={{
            opacity: 0.45,
            backgroundImage: `linear-gradient(rgba(202,160,92,0.16) 1px, transparent 1px),
              linear-gradient(90deg, rgba(202,160,92,0.16) 1px, transparent 1px),
              linear-gradient(rgba(202,160,92,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(202,160,92,0.05) 1px, transparent 1px)`,
            backgroundSize: '64px 64px, 64px 64px, 16px 16px, 16px 16px',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0px, #000 180px, #000 calc(100% - 180px), rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0px, #000 180px, #000 calc(100% - 180px), rgba(0,0,0,0) 100%)'
          }}
        />
      </div>
      <div className="relative z-10 px-4 sm:px-6 md:px-12 xl:px-16 max-w-[1500px] mx-auto">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-10 md:mb-14">
          <p className="section-label w-fit flex items-center border border-brand-border rounded-full px-4 py-1.5">
            <span aria-hidden="true" className="text-brand-gold mr-2">•</span>
            <span>MADE TO MEASURE</span>
          </p>
          <h2 className="t-headline text-[var(--ink)] mt-4 max-w-[900px]">
            Your customer sets the size.<br />
            <span className="text-brand-gold">The price and the build sheet follow.</span>
          </h2>
          <p className="t-lead text-[var(--ink-dim)] mt-4 max-w-[640px]">
            Drag the width. Every size is checked against your rules, priced from your price list and written out as a sheet your workshop can build from.
          </p>
        </div>
        <div className="grid gap-10 lg:gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <p className="section-label mb-4">Your customer sets the size</p>
            <div className="relative w-full border border-[var(--line)] rounded-[2px] bg-[var(--bg)]" style={{ aspectRatio: '720 / 520' }}>
              <svg aria-hidden="true" className="mtm-svg absolute inset-0 h-full w-full" fill="none" viewBox="0 0 720 520">
                <line stroke="var(--line)" x1="24" x2="696" y1="450" y2="450" />
                <polygon fill="var(--bg-raise)" points="543.5,96 580.4,70.1 580.4,424.1 543.5,450" stroke="var(--ink-dim)" />
                <polygon fill="var(--line)" points="183.5,96 220.4,70.1 580.4,70.1 543.5,96" stroke="var(--ink-dim)" />
                <rect fill="var(--bg-raise)" height="354" stroke="var(--ink)" width="360" x="183.5" y="96" />
                <line stroke="var(--line-strong)" x1="183.5" x2="543.5" y1="438" y2="438" />
                <line stroke="var(--line-strong)" x1="543.5" x2="580.4" y1="438" y2="412.1" />
                <g>
                  <line stroke="var(--line-strong)" x1="243.5" x2="243.5" y1="96" y2="438" />
                  <line stroke="var(--ink)" x1="237.5" x2="237.5" y1="272.5" y2="312.5" />
                  <line stroke="var(--ink)" x1="249.5" x2="249.5" y1="272.5" y2="312.5" />
                  <line stroke="var(--ink-dim)" x1="303.5" x2="303.5" y1="96" y2="438" />
                </g>
                <g>
                  <line stroke="var(--line-strong)" x1="363.5" x2="363.5" y1="96" y2="438" />
                  <line stroke="var(--ink)" x1="357.5" x2="357.5" y1="272.5" y2="312.5" />
                  <line stroke="var(--ink)" x1="369.5" x2="369.5" y1="272.5" y2="312.5" />
                  <line stroke="var(--ink-dim)" x1="423.5" x2="423.5" y1="96" y2="438" />
                </g>
                <g stroke="#caa05c">
                  <line x1="183.5" x2="543.5" y1="484" y2="484" />
                  <line x1="183.5" x2="183.5" y1="477" y2="491" />
                  <line x1="543.5" x2="543.5" y1="477" y2="491" />
                </g>
                <g stroke="#caa05c">
                  <line x1="153.5" x2="153.5" y1="96" y2="450" />
                  <line x1="146.5" x2="160.5" y1="96" y2="96" />
                  <line x1="146.5" x2="160.5" y1="450" y2="450" />
                </g>
              </svg>
              <p className="absolute right-3 top-3 text-right sm:right-5 sm:top-4">
                <span className="section-label block">Price</span>
                <span className="t-subhead mt-1 block tabular-nums text-[var(--ink)]">€{price.toLocaleString()}</span>
              </p>
              <span className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-[var(--bg)] px-2 text-[12px] font-medium tabular-nums text-brand-gold" style={{ left: '50.5%', top: '93.1%' }}>
                {width} cm
              </span>
              <span className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: '21.3%', top: '52.5%' }}>
                <span className="block rotate-180 whitespace-nowrap bg-[var(--bg)] py-2 text-[12px] font-medium tabular-nums text-brand-gold [writing-mode:vertical-rl]">
                  {height} cm
                </span>
              </span>
            </div>
            <p className="spec mt-3">
              {sections} sections × {sectionWidth} cm. No section is wider than 100 cm.
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-10">
              <div>
                <div className="flex items-baseline justify-between">
                  <label className="section-label" htmlFor="mtm-width">Width</label>
                  <span className="t-small tabular-nums text-[var(--ink)]">
                    {width} cm
                    <span className="text-[var(--ink-dim)]"> · {(width / 2.54).toFixed(1)} in</span>
                  </span>
                </div>
                <input
                  aria-label="Wardrobe width in centimetres"
                  aria-valuetext={`${width} cm`}
                  className="mtm-range w-full cursor-pointer accent-[#caa05c]"
                  id="mtm-width"
                  max="360"
                  min="100"
                  step="2"
                  style={{ '--p': pPercent } as React.CSSProperties}
                  type="range"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                />
              </div>
              <div>
                <p className="section-label mb-3">Height</p>
                <div className="flex gap-2">
                  {[210, 236, 260].map((h) => (
                    <button
                      key={h}
                      type="button"
                      aria-pressed={height === h}
                      onClick={() => setHeight(h)}
                      className={`t-small tabular-nums rounded-full border px-4 py-2 transition-colors duration-300 cursor-pointer ${
                        height === h
                          ? 'border-[var(--ink)] text-[var(--ink)] bg-[var(--bg-raise)]'
                          : 'border-[var(--line-strong)] text-[var(--ink-dim)] hover:border-[var(--ink-dim)] hover:text-[var(--ink)]'
                      }`}
                    >
                      {h} cm
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="section-label mb-4">Your workshop gets this</p>
            <div className="border border-[var(--line)] rounded-[2px] bg-[var(--bg-raise)]">
              <div className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] px-5 py-4">
                <p className="t-small font-medium text-[var(--ink)]">Build sheet</p>
                <p className="spec whitespace-nowrap">{width} × {height} × 60 cm</p>
              </div>
              <dl>
                <div className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] px-5 py-3">
                  <dt className="t-small text-[var(--ink-dim)]">Carcass</dt>
                  <dd className="t-small tabular-nums text-right text-[var(--ink)]">
                    {sections} sections<span className="text-[var(--ink-dim)]"> · {sectionWidth} cm each</span>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] px-5 py-3">
                  <dt className="t-small text-[var(--ink-dim)]">Doors</dt>
                  <dd className="t-small tabular-nums text-right text-[var(--ink)]">
                    {doors}<span className="text-[var(--ink-dim)]"> · {doorWidth} × {doorHeight} cm</span>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] px-5 py-3">
                  <dt className="t-small text-[var(--ink-dim)]">Shelves</dt>
                  <dd className="t-small tabular-nums text-right text-[var(--ink)]">
                    {shelves}<span className="text-[var(--ink-dim)]"> · {shelfWidth} × 57 cm</span>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] px-5 py-3">
                  <dt className="t-small text-[var(--ink-dim)]">Hinges</dt>
                  <dd className="t-small tabular-nums text-right text-[var(--ink)]">{hinges}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] px-5 py-3">
                  <dt className="t-small text-[var(--ink-dim)]">Board, 18 mm</dt>
                  <dd className="t-small tabular-nums text-right text-[var(--ink)]">{boardArea} m²</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] px-5 py-3">
                  <dt className="t-small text-[var(--ink-dim)]">Weight</dt>
                  <dd className="t-small tabular-nums text-right text-[var(--ink)]">{weight} kg</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] px-5 py-3">
                  <dt className="t-small text-[var(--ink-dim)]">Delivery</dt>
                  <dd className="t-small tabular-nums text-right text-[var(--ink)]">One unit</dd>
                </div>
              </dl>
              <div className="flex items-end justify-between gap-4 px-5 py-5">
                <div>
                  <p className="t-small text-[var(--ink-dim)]">Price</p>
                  <p className="spec mt-1">Example price, before tax</p>
                </div>
                <p className="t-figure text-[var(--ink)]">€{price.toLocaleString()}</p>
              </div>
            </div>
            <p className="t-small text-[var(--ink-dim)] mt-5 max-w-[46ch]">
              The numbers that draw the piece also fill the sheet, so the workshop builds exactly what the customer saw.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
