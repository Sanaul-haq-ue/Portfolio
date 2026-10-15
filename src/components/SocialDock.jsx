import { useState } from "react";

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/", icon: "fa-brands fa-facebook-f" },
  { label: "GitHub", href: "https://github.com/Sanaul-haq-ue", icon: "fa-brands fa-github" },
  { label: "WhatsApp", href: "https://wa.me/saim_haque?text=Hi%20there", icon: "fa-brands fa-whatsapp" },
  { label: "Email", href: "mailto:saimhaque55@gmail.com", icon: "fa-solid fa-envelope" },
  { label: "Instagram", href: "https://www.instagram.com/", icon: "fa-brands fa-instagram" },
];

export default function SocialDock() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      className={`cf-social-dock${isOpen ? " is-open" : ""}`}
      aria-label="Social links"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="cf-social-dock__toggle"
        type="button"
        aria-label={isOpen ? "Close social links" : "Open social links"}
        aria-expanded={isOpen}
        onClick={event => {
          setIsOpen(open => !open);
          if (isOpen) event.currentTarget.blur();
        }}
      >
        <i className="fa-solid fa-share-nodes" aria-hidden="true"></i>
      </button>
      <nav className="cf-social-dock__links" aria-label="Social media">
        {socialLinks.map(link => (
          <a
            href={link.href}
            key={link.label}
            aria-label={link.label}
            title={link.label}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            <i className={link.icon} aria-hidden="true"></i>
          </a>
        ))}
      </nav>
    </aside>
  );
}
