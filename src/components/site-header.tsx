"use client";

import { useEffect, useRef, useState } from "react";
import { getWhatsAppUrl, salon } from "@/content/salon";

const navigation = [
  { href: "#servicios", label: "Servicios" },
  { href: "#trabajos", label: "Trabajos" },
  { href: "#contacto", label: "Contacto" },
];
const firstName = salon.name.split(" ")[0] || salon.name;

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  const links = navigation.map((item) => (
    <a href={item.href} key={item.href} onClick={closeMenu}>
      {item.label}
    </a>
  ));

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#inicio" onClick={closeMenu}>
          <span className="brand-monogram" aria-hidden="true">
            {salon.monogram}
          </span>
          <span className="brand-copy">
            <span className="brand-name">{salon.name}</span>
            <span className="brand-detail">
              {salon.location.city} · {salon.location.province}
            </span>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {links}
        </nav>

        <div className="header-actions">
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((open) => !open)}
            ref={menuButtonRef}
          >
            <span aria-hidden="true">{menuOpen ? "Cerrar" : "Menú"}</span>
          </button>
          <a
            className="header-whatsapp"
            href={getWhatsAppUrl(`Hola, ${firstName}. Quisiera consultar por un turno.`)}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <nav
        className="mobile-nav"
        id="mobile-navigation"
        aria-label="Navegación móvil"
        hidden={!menuOpen}
      >
        {links}
      </nav>
    </header>
  );
}
