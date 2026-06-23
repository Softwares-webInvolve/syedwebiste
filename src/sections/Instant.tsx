import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { instantConfig } from "../config";

gsap.registerPlugin(ScrollTrigger);

// Deterministic falling-leaf layout for the mobile "INKED" backdrop.
// (CSS-animated so it keeps moving even in Low Power Mode.)
const LEAVES = [
  { left: "5%", size: 24, dur: 10, delay: 0, kind: "amber" },
  { left: "16%", size: 16, dur: 14, delay: 2.5, kind: "crimson" },
  { left: "27%", size: 20, dur: 11.5, delay: 1, kind: "gold" },
  { left: "38%", size: 14, dur: 16, delay: 4, kind: "rust" },
  { left: "49%", size: 26, dur: 9.5, delay: 0.8, kind: "amber" },
  { left: "60%", size: 18, dur: 13, delay: 3.2, kind: "crimson" },
  { left: "70%", size: 15, dur: 15.5, delay: 1.8, kind: "gold" },
  { left: "80%", size: 22, dur: 10.5, delay: 5, kind: "rust" },
  { left: "90%", size: 17, dur: 12.5, delay: 2, kind: "amber" },
  { left: "33%", size: 13, dur: 17, delay: 6, kind: "crimson" },
  { left: "55%", size: 19, dur: 12, delay: 7, kind: "gold" },
  { left: "74%", size: 14, dur: 15, delay: 3.6, kind: "rust" },
];

export default function Instant() {
  const rootRef = useRef<HTMLElement>(null);
  // Decide once, before paint, whether to load the heavy video at all.
  const [useVideo, setUseVideo] = useState(true);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData === true;
    // Skip the 6.5MB video only on mobile / data-saver (perf), not on
    // desktop — the ambient motion is part of the experience.
    setUseVideo(!mobile && !saveData);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".instant__big",
        { opacity: 0, scale: 0.92, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );
      gsap.fromTo(
        ".instant__phrase",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 65%" },
        }
      );
      gsap.fromTo(
        ".instant__caption",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 60%" },
        }
      );
      if (useVideo) {
        gsap.to(".instant__video", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, [useVideo]);

  const [big, phrase, caption] = instantConfig.textLines;

  return (
    <section id="instant" className="section instant" ref={rootRef}>
      {useVideo ? (
        <video
          className="instant__video"
          src={instantConfig.videoPath}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setUseVideo(false)}
        />
      ) : (
        // Lightweight animated paint fallback — no download cost
        <div className="instant__fallback" aria-hidden="true">
          <span className="instant__orb instant__orb--1" />
          <span className="instant__orb instant__orb--2" />
          <span className="instant__orb instant__orb--3" />
        </div>
      )}
      <div className="instant__veil" />

      {/* Falling chinar leaves — the mobile counterpart of the video */}
      {!useVideo && (
        <div className="instant__leaves" aria-hidden="true">
          {LEAVES.map((l, i) => (
            <span
              key={i}
              className={`leaf leaf--${l.kind}`}
              style={{
                left: l.left,
                width: `${l.size}px`,
                height: `${l.size}px`,
                animationDuration: `${l.dur}s`,
                animationDelay: `${l.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="instant__inner">
        <p className="room-label instant__room">{instantConfig.roomLabel}</p>
        <h2 className="instant__big">{big}</h2>
        <p className="instant__phrase">{phrase}</p>
        <p className="instant__caption">{caption}</p>
      </div>
    </section>
  );
}
