import { mediaUrl } from '../config/media';
import React, { useRef, useState } from 'react';

export const ExplainerSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  return (
    <section aria-labelledby="em-explainer-title" className="em em-section em-explainer" id="explainer">
      <div className="em-wrap">
        <div className="em-section__head">
          <div>
            <span data-reveal="" style={{ '--d': 0 } as React.CSSProperties}>
              <span className="em-tag">
                <span className="em-tag__box">
                  <svg aria-hidden="true" className="em-plus" viewBox="0 0 10 10">
                    <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </span>
                The video
              </span>
            </span>
            <h2 className="em-h2" data-reveal="" id="em-explainer-title" style={{ '--d': 1 } as React.CSSProperties}>
              What we do, in under two minutes
            </h2>
          </div>
          <div className="em-section__side" data-reveal="" style={{ '--d': 2 } as React.CSSProperties}>
            <p className="em-lead">A product, a configurator and a price, shown the way your customer will see them.</p>
          </div>
        </div>
        <div className="em-explainer__frame relative group cursor-pointer" data-reveal="" style={{ '--d': 3 } as React.CSSProperties} onClick={togglePlay}>
          <video
            ref={videoRef}
            playsInline
            controls={isPlaying}
            poster={mediaUrl("/video/poster.jpg")}
            src={mediaUrl("/video/pilot.mp4")}
            className="w-full h-auto aspect-video object-cover rounded-2xl"
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          />
          {!isPlaying && (
            <button aria-label="Play the video" className="em-explainer__play" data-cursor="ignore" type="button">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
