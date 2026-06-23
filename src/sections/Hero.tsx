import { lazy, Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { heroConfig } from "../config";

// Three.js shader is lazy-loaded so it stays out of the critical path.
// A CSS paint gradient renders instantly underneath while it boots.
const FluidSubconscious = lazy(() => import("./FluidSubconscious"));

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance — staggered fade/slide-up. Runs on every device.
      gsap.from(".hero__inner > *", {
        y: 34,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
      });
      gsap.from(".hero__scroll", {
        opacity: 0,
        duration: 1,
        delay: 1.1,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const scrollToGallery = () => {
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="section hero" ref={rootRef}>
      {/* Instant-paint fallback (also the Suspense fallback) */}
      <div className="hero__canvas hero__paint" aria-hidden="true" />
      <Suspense fallback={null}>
        <FluidSubconscious imagePath={heroConfig.fluidImagePath} />
      </Suspense>

      <div className="hero__veil" />

      <div className="hero__inner">
        <p className="room-label hero__room">{heroConfig.roomLabel}</p>

        <h1 className="hero__title">{heroConfig.titleText}</h1>

        <p className="hero__subtitle">
          {heroConfig.subtitleLines.map((line, i) => (
            <span key={i}>{line} </span>
          ))}
        </p>

        <button className="hero__cta interactive" onClick={scrollToGallery}>
          {heroConfig.ctaLabel} <span>→</span>
        </button>
      </div>

      <div className="hero__scroll">Scroll</div>
    </section>
  );
}
