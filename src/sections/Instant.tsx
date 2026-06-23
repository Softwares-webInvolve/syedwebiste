import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { instantConfig } from "../config";

gsap.registerPlugin(ScrollTrigger);

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

      <div className="instant__inner">
        <p className="room-label instant__room">{instantConfig.roomLabel}</p>
        <h2 className="instant__big">{big}</h2>
        <p className="instant__phrase">{phrase}</p>
        <p className="instant__caption">{caption}</p>
      </div>
    </section>
  );
}
