import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutConfig } from "../config";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from(".about__reveal", {
        opacity: 0,
        y: 36,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
      gsap.from(".about__media", {
        opacity: 0,
        scale: 1.05,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 78%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section about" ref={rootRef}>
      <div className="about__inner">
        <div className="about__media">
          <img src={aboutConfig.image} alt="" loading="lazy" />
          <span className="about__media-cap">{aboutConfig.imageCaption}</span>
        </div>

        <div className="about__body">
          <p className="eyebrow about__reveal">{aboutConfig.eyebrowLabel}</p>
          <h2 className="about__name about__reveal">{aboutConfig.heading}</h2>
          <p className="about__role about__reveal">{aboutConfig.roleLine}</p>

          {aboutConfig.paragraphs.map((p, i) => (
            <p key={i} className="about__para about__reveal">
              {p}
            </p>
          ))}

          <div className="about__works about__reveal">
            <span className="about__works-label">{aboutConfig.worksLabel}</span>
            <div className="about__tags">
              {aboutConfig.works.map((w) => (
                <span key={w} className="about__tag">
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
