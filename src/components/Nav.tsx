import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { siteConfig, footerConfig } from "../config";

/**
 * Sticky, minimal navigation. Transparent over the hero, becomes a
 * blurred bar after scroll. On mobile it collapses into a fullscreen
 * overlay menu. Links are driven from config (footer navigation +
 * contact links), so content stays single-source.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the overlay menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href?: string) => {
    setOpen(false);
    if (!href) return;
    if (href.startsWith("#")) {
      const id = href.slice(1);
      const scroll = () =>
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(scroll, 80);
      } else {
        scroll();
      }
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <header className={`nav ${scrolled ? "nav--solid" : ""}`}>
      <button
        className="nav__brand interactive"
        onClick={() => go("#hero")}
        aria-label="Back to top"
      >
        {siteConfig.brandName}
      </button>

      {/* Desktop links */}
      <nav className="nav__links">
        {footerConfig.navigationLinks.map((l) => (
          <button
            key={l.label}
            className="nav__link interactive"
            onClick={() => go(l.href)}
          >
            {l.label}
          </button>
        ))}
      </nav>

      {/* Mobile toggle */}
      <button
        className={`nav__toggle interactive ${open ? "is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <span />
        <span />
      </button>

      {/* Fullscreen overlay menu */}
      <div className={`nav__overlay ${open ? "is-open" : ""}`} role="dialog" aria-modal="true">
        <nav className="nav__overlay-links">
          {footerConfig.navigationLinks.map((l, i) => (
            <button
              key={l.label}
              className="nav__overlay-link interactive"
              style={{ transitionDelay: `${0.06 * i + 0.1}s` }}
              onClick={() => go(l.href)}
            >
              <span className="nav__overlay-index">0{i + 1}</span>
              {l.label}
            </button>
          ))}
        </nav>
        <div className="nav__overlay-social">
          {footerConfig.contactLinks.map((l) => (
            <a
              key={l.label}
              className="interactive"
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
