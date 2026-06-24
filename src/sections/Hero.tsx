import { lazy, Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { heroConfig } from "../config";

// Three.js shader is lazy-loaded and used on desktop only — mobile gets a
// pure-CSS animated hero that stays smooth even in Low Power Mode (where
// Safari throttles requestAnimationFrame / WebGL to a near standstill).
const FluidSubconscious = lazy(() => import("./FluidSubconscious"));

// Decide once, synchronously, so we never mount WebGL on phones.
const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 768px)").matches;

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero__inner > *", {
        y: 34,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
      });
      gsap.from(".hero__scroll", { opacity: 0, duration: 1, delay: 1.1 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const scrollToGallery = () => {
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="section hero" ref={rootRef}>
      {isMobile ? (
        // CSS-only animated hero — guaranteed motion on every phone
        <div className="hero__canvas hero__cssart" aria-hidden="true">
          <div
            className="hero__kenburns"
            style={{ backgroundImage: `url(${heroConfig.fluidImagePath})` }}
          />
          <span className="hero__orb hero__orb--1" />
          <span className="hero__orb hero__orb--2" />
        </div>
      ) : (
        <>
          <div className="hero__canvas hero__paint" aria-hidden="true" />
          <Suspense fallback={null}>
            <FluidSubconscious imagePath={heroConfig.fluidImagePath} />
          </Suspense>
        </>
      )}

      <div className="hero__veil" />

      <div className="hero__inner">
        <p className="room-label hero__room">{heroConfig.roomLabel}</p>

        <h1 className="hero__title">{heroConfig.titleText}</h1>

        <div className="hero__subtitle">
          {heroConfig.subtitleLines.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </div>

        <button className="hero__cta interactive" onClick={scrollToGallery}>
          {heroConfig.ctaLabel} <span>→</span>
        </button>
      </div>

      <div className="hero__scroll">Scroll</div>
    </section>
  );
}
