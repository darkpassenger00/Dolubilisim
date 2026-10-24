"use client";

import { useRef, useState, type KeyboardEvent } from "react";

const links = [
  ["Çözümler", "#cozumler"],
  ["Bireysel", "#bireysel"],
  ["Kurumsal", "#kurumsal"],
  ["Hizmetler", "#hizmetler"],
  ["Rehberler", "#rehberler"],
  ["Sık sorulan sorular", "#sss"],
  ["İletişim", "#iletisim"],
] as const;

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  }

  return (
    <div className="mobile-nav">
      <button
        ref={buttonRef}
        type="button"
        className={`mobile-nav-toggle${isOpen ? " is-open" : ""}`}
        aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="mobile-menu-icon" aria-hidden="true"><i /><i /><i /></span>
      </button>
      <nav
        id="mobile-navigation"
        className="mobile-nav-panel"
        aria-label="Mobil menü"
        hidden={!isOpen}
        onKeyDown={handleKeyDown}
      >
        {links.map(([label, href]) => (
          <a href={href} key={href} onClick={() => setIsOpen(false)}>{label}<span aria-hidden="true">↗</span></a>
        ))}
      </nav>
    </div>
  );
}
