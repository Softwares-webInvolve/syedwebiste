import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { galleryConfig } from "../config";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Don't refresh triggers when the mobile address bar shows/hides —
    // prevents jumpy parallax on phones.
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      // Reveal cards on scroll
      gsap.utils.toArray<HTMLElement>(".work-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: (i % 3) * 0.08,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
            },
          }
        );
      });

      // Image parallax (±4–12% range) driven by scroll position
      gsap.utils.toArray<HTMLElement>(".work-card__img").forEach((img, i) => {
        const range = 4 + ((i * 2.5) % 9); // 4% → ~12%
        gsap.fromTo(
          img,
          { yPercent: -range },
          {
            yPercent: range,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".work-card"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // Heading reveal
      gsap.fromTo(
        ".gallery__head > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".gallery__head", start: "top 85%" },
        }
      );
    }, root);

    // Recalculate trigger positions once images/fonts settle (mobile-safe).
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 600);

    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section id="gallery" className="section gallery" ref={rootRef}>
      <div className="gallery__head">
        <div>
          <p className="eyebrow">{galleryConfig.eyebrowLabel}</p>
          <h2 className="gallery__title">
            {galleryConfig.titleLines.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </h2>
        </div>

        <div className="gallery__stats">
          {galleryConfig.stats.map((stat) => (
            <div key={stat.label} className="stat">
              <div className="stat__label">{stat.label}</div>
              <div className="stat__value">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="gallery__grid">
        {galleryConfig.works.map((work) => {
          const soon = work.status.toUpperCase().includes("SOON");
          return (
            <Link
              key={work.id}
              to={`/work/${work.id.toLowerCase()}`}
              className="work-card interactive"
            >
              <div className="work-card__frame">
                <span className="work-card__status" data-soon={soon}>
                  {work.status}
                </span>
                <span className="work-card__meta-id">{work.id}</span>
                <img
                  className="work-card__img"
                  src={work.image}
                  alt={work.title}
                  loading="lazy"
                />
                <div className="work-card__overlay" />
                <div className="work-card__caption">
                  <h3 className="work-card__title">{work.title}</h3>
                  <div className="work-card__sub">
                    <span>{work.type.replace(/-/g, " ")}</span>
                    <span>{work.metrics}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <span className="gallery__sidelabel">{galleryConfig.sideLabel}</span>
    </section>
  );
}
