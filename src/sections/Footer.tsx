import { footerConfig } from "../config";

function isInternal(href?: string) {
  return !!href && href.startsWith("#");
}

export default function Footer() {
  return (
    <footer id="footer" className="section footer">
      <div className="footer__inner">
        <div>
          <div className="footer__brand">{footerConfig.brandText}</div>
          <div className="footer__tagline">
            {footerConfig.taglineLines.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </div>
        </div>

        <div className="footer__col">
          <h4>{footerConfig.navigationHeading}</h4>
          <ul>
            {footerConfig.navigationLinks.map((link) => (
              <li key={link.label}>
                <a className="interactive" href={link.href || "#"}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>{footerConfig.contactHeading}</h4>
          <ul>
            {footerConfig.contactLinks.map((link) => (
              <li key={link.label}>
                <a
                  className="interactive"
                  href={link.href || "#"}
                  target={isInternal(link.href) ? undefined : "_blank"}
                  rel={isInternal(link.href) ? undefined : "noopener noreferrer"}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <span>{footerConfig.copyright}</span>
        <span>{footerConfig.creditText}</span>
      </div>
    </footer>
  );
}
