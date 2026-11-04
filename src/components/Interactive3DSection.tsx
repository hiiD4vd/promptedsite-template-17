import { mediaUrl } from '../config/media';
import {useProductConfigurator} from '../hooks/useProductConfigurator';
import {PRODUCT_MODELS} from '../data/modelsData';
export function Interactive3DSection() {
  const { sectionRef, containerRef, handlePointerUp, handlePointerDown, handlePointerMove, isInteractive, isPointerDownState, currentItem, localProgress, isLoading, activeLoadError, retryActiveModel, modelScaleFactor, activeModelIndex, deltaChips, calculatedChairPrice, totalWeight } = useProductConfigurator();
  return (
    <section
      ref={sectionRef}
      aria-label="What we build"
      className="relative w-full bg-[var(--bg)]"
      data-section="SC"
      data-section-name="Koncept vertikale"
      id="configurator"
      style={{ height: `${360 * totalWeight}vh` }}
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none"
        onPointerCancel={handlePointerUp}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ cursor: isInteractive ? (isPointerDownState ? 'grabbing' : 'grab') : 'default' }}
      >
        {/* AR Room backdrop for Furniture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-700"
          style={{ opacity: currentItem.key === 'furniture' && localProgress > 0.4 ? 0.85 : 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1815] via-[#141311] to-[#0f0e0c]" />
          <div className="absolute left-0 top-0 overflow-hidden rounded-[40px] w-full h-full">
            <img alt="" className="absolute inset-0 h-full w-full object-cover" src={mediaUrl("/models/ar-room.webp")} />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0e0d0c]/40" />
            <div className="absolute left-1/2 top-[22%] h-[60%] w-[70%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,217,166,0.16)_0%,rgba(255,217,166,0.05)_45%,transparent_72%)]" />
            <div className="absolute inset-x-0 bottom-0 h-[46%]" style={{ perspective: '520px' }}>
              <div
                className="absolute inset-x-[-40%] top-0 h-[220%] origin-top"
                style={{
                  transform: 'rotateX(62deg)',
                  backgroundImage:
                    'linear-gradient(to right, rgba(202,160,92,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(202,160,92,0.16) 1px, transparent 1px)',
                  backgroundSize: '56px 56px',
                  maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 100%)'
                }}
              />
            </div>
          </div>
        </div>

        {/* WebGL Canvas Container */}
        <div ref={containerRef} className="absolute inset-0 pointer-events-none" />

        {/* Top Interactive Cue Pill */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[7%] inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-brand-border bg-[var(--bg)]/70 backdrop-blur-md px-3.5 py-1.5 transition-opacity duration-500 z-20"
          style={{ opacity: isInteractive ? 1 : 0 }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse" />
          <span className="spec text-[var(--ink)]">Drag to rotate 360°</span>
        </div>

        {/* Center Loading Indicator */}
        {isLoading && !activeLoadError && (
          <div
            aria-live="polite"
            className="pointer-events-none absolute left-1/2 top-[42%] inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-brand-border bg-[var(--bg)]/80 px-4 py-2 backdrop-blur-md z-20"
            role="status"
          >
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand-gold animate-ping" />
            <span className="spec text-[var(--ink)]">Loading 3D model</span>
          </div>
        )}

        {activeLoadError && (
          <div
            className="pointer-events-auto absolute left-1/2 top-[42%] z-20 flex -translate-x-1/2 flex-col items-center gap-3 rounded-sm border border-[var(--line-strong)] bg-[var(--bg)]/90 px-5 py-4 text-center backdrop-blur-md"
            role="alert"
          >
            <span className="spec text-[var(--ink)]">{activeLoadError}</span>
            <button className="rounded-full border border-[var(--line-strong)] px-4 py-2 text-sm hover:border-[var(--ink-dim)]" onClick={retryActiveModel} type="button">
              Try again
            </button>
          </div>
        )}


        {/* Bottom HUD: Specs & Details with Parallax Translation */}
        <div
          className="pointer-events-none relative z-10 p-6 sm:p-10 lg:p-16 flex justify-between items-end w-full transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${(0.5 - localProgress) * 22}px)`,
            opacity: Math.min(modelScaleFactor, 1)
          }}
        >
          <div className="max-w-xl">
            {/* Center Scroll Cue */}
            <div
              aria-hidden="true"
              className="inline-flex items-center gap-2.5 rounded-full border border-brand-border bg-[var(--bg)]/70 px-3.5 py-1.5 mb-4 backdrop-blur-md transition-opacity duration-500"
              style={{ opacity: !isInteractive && !isLoading ? 1 : 0 }}
            >
              <span className="relative h-3.5 w-px overflow-hidden bg-[var(--line-strong)]">
                <span className="vc-scroll-cue absolute inset-x-0 top-0 h-1.5 bg-brand-gold" />
              </span>
              <span className="spec whitespace-nowrap text-[var(--ink)]">Keep scrolling</span>
            </div>

            <p className="section-label w-fit flex items-center border border-brand-border rounded-full px-4 py-1.5 mb-3 bg-[var(--bg)]/40 backdrop-blur-sm">
              <span className="text-brand-gold mr-2" aria-hidden="true">•</span>
              WHAT WE BUILD · {String(activeModelIndex + 1).padStart(2, '0')} / {String(PRODUCT_MODELS.length).padStart(2, '0')}
            </p>

            <h2 className="t-headline text-[var(--ink)] tracking-tight text-4xl sm:text-5xl lg:text-6xl font-normal">
              {currentItem.label}
            </h2>

            <p className="t-lead mt-3 max-w-[52ch] text-[var(--ink-dim)] text-base sm:text-lg">
              {currentItem.line}
            </p>

            <p className="spec mt-4 text-xs font-mono text-[var(--ink-dim)] opacity-80">
              {currentItem.spec}
              {currentItem.dims && <span> · {currentItem.dims.w} × {currentItem.dims.h} × {currentItem.dims.d} {currentItem.dims.unit}</span>}
            </p>

            {currentItem.arDemo && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand-border px-3.5 py-1.5 text-[var(--ink)]">
                <span className="text-brand-gold text-xs">◆</span>
                <span className="spec text-[var(--ink)] text-xs">AR · iPhone and Android, the same model</span>
              </div>
            )}
          </div>

          {/* Bottom Right: Live Chair Options Stack & Pricing */}
          {currentItem.key === 'chairs' && (
            <div className="pointer-events-none flex flex-col items-end">
              {/* Floating Animated Delta Badges */}
              <div className="relative mb-2 flex h-[80px] w-[280px] flex-col items-end justify-end overflow-hidden">
                {deltaChips.map((chip, idx) => (
                  <div
                    key={chip.id}
                    className="absolute right-0 flex items-baseline gap-2 whitespace-nowrap transition-all duration-700 ease-out"
                    style={{
                      bottom: `${idx * 26}px`,
                      opacity: 1
                    }}
                  >
                    <span className="t-small text-[var(--ink-dim)] text-xs font-medium">{chip.label}</span>
                    <span className="spec tabular-nums text-brand-gold font-mono font-bold text-sm">
                      {chip.amount >= 0 ? '+' : '−'} €{Math.abs(chip.amount)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Label */}
              <div className="section-label text-[var(--ink-dim)] text-[11px] uppercase tracking-wider font-mono">
                CONFIGURED PRICE
              </div>

              {/* Price Total */}
              <div className="t-headline mt-1 tabular-nums text-[var(--ink)] text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight">
                <span className="text-brand-gold mr-1">€</span>
                {calculatedChairPrice.toLocaleString()}
              </div>

              <div className="t-small mt-1 text-[var(--ink-dim)] opacity-70 text-xs">
                example prices, not a price list
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Interactive3DSection;
