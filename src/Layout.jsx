import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  RobotIcon, PaletteIcon, CodeIcon, RocketLaunchIcon,
  ChatCircleDotsIcon, ArrowRightIcon, ListIcon, XIcon,
  WhatsappLogoIcon, GlobeIcon,
} from "@phosphor-icons/react";
import { useLang } from "./LangContext";

const WA_NUMBER = "2290160008046";

const T_NAV = {
  fr: {
    ia: "IA", creative: "Créatif", web: "Web",
    products: "Produits", demo: "Démo Alex", how: "Comment ça marche",
    pricing: "Tarifs", reviews: "Témoignages", faq: "FAQ", start: "Démarrer",
    wa_bubble: "Discutez avec nous sur WhatsApp",
    footer_copy: "Digital Horizon Agency · Cotonou, Bénin · © 2026 DHA"
  },
  en: {
    ia: "AI", creative: "Creative", web: "Web",
    products: "Products", demo: "Demo Alex", how: "How it works",
    pricing: "Pricing", reviews: "Reviews", faq: "FAQ", start: "Get started",
    wa_bubble: "Chat with us on WhatsApp",
    footer_copy: "Digital Horizon Agency · Cotonou, Benin · © 2026 DHA"
  }
};

export default function Layout() {
  const { lang, setLang } = useLang();
  const t = T_NAV[lang] || T_NAV.fr;
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pulse, setPulse] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    const bubbleTimer = setTimeout(() => setPulse(false), 5000);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(bubbleTimer);
    };
  }, []);

  const scrollTo = id => {
    setMenuOpen(false);
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, [location]);

  const pageLinks = [
    { to: "/", label: t.ia, Icon: RobotIcon, active: location.pathname === "/" },
    { to: "/creative", label: t.creative, Icon: PaletteIcon, active: location.pathname === "/creative" },
    { to: "/web", label: t.web, Icon: CodeIcon, active: location.pathname === "/web" },
  ];

  const navLinks = [
    ["produits", t.products],
    ["demo", t.demo],
    ["comment", t.how],
    ["tarifs", t.pricing],
    ["temoignages", t.reviews],
    ["faq", t.faq],
  ];

  return (
    <div className="layout-root">
      <style>{NAV_CSS}</style>
      <header>
        <nav className={`main-nav ${scrollY > 30 ? "is-scrolled" : ""}`}>
          <div className="nav-inner">
            <Link to="/" className="brand">
              <span className="brand-mark">D</span>HA
              <span className="brand-suffix">AGENCY</span>
            </Link>

            <div className="desk-nav page-links">
              {pageLinks.map(({ to, label, Icon, active }) => (
                <Link key={to} to={to} className={`page-link ${active ? "is-active" : ""}`}>
                  <Icon size={15} weight={active ? "fill" : "regular"} />{label}
                </Link>
              ))}
              <div className="nav-sep" />
              {navLinks.map(([id, label]) => (
                <button key={id} onClick={() => scrollTo(id)} className={`nav-link ${id === "demo" ? "is-accent" : ""}`}>
                  {label}
                </button>
              ))}
            </div>

            <div className="desk-nav" style={{ alignItems: "center", gap: 10 }}>
              <div className="lang-switch">
                {["fr", "en"].map(code => (
                  <button key={code} onClick={() => setLang(code)} className={`lang-btn ${lang === code ? "is-active" : ""}`}>
                    {code.toUpperCase()}
                  </button>
                ))}
              </div>
              <a href={`https://wa.me/${WA_NUMBER}`} className="nav-cta-btn">
                {t.start}<ArrowRightIcon size={14} weight="bold" />
              </a>
            </div>

            <button className="burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? <XIcon size={22} /> : <ListIcon size={22} />}
            </button>
          </div>

          {menuOpen && (
            <div className="mobile-panel">
              <div className="mobile-pagelinks">
                {pageLinks.map(({ to, label, Icon, active }) => (
                  <Link key={to} to={to} onClick={() => setMenuOpen(false)} className={`mobile-pagelink ${active ? "is-active" : ""}`}>
                    <Icon size={16} weight={active ? "fill" : "regular"} />{label}
                  </Link>
                ))}
              </div>
              <div className="mobile-divider" />
              {navLinks.map(([id, label]) => (
                <button key={id} onClick={() => scrollTo(id)} className={`mobile-navlink ${id === "demo" ? "is-accent" : ""}`}>
                  {label}
                </button>
              ))}
              <div className="mobile-lang-row">
                <div className="lang-switch">
                  {["fr", "en"].map(code => (
                    <button key={code} onClick={() => { setLang(code); setMenuOpen(false); }} className={`lang-btn ${lang === code ? "is-active" : ""}`}>
                      {code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ padding: "4px 20px 4px" }}>
                <a href={`https://wa.me/${WA_NUMBER}`} className="mobile-cta">
                  {t.start}<ArrowRightIcon size={15} weight="bold" />
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main style={{ minHeight: "calc(100vh - 180px)" }}>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="brand footer-brand"><span className="brand-mark">D</span>HA</div>
        <div className="footer-links">
          {pageLinks.map(({ to, label, Icon }) => (
            <Link key={to} to={to} className="footer-link"><Icon size={14} />{label}</Link>
          ))}
        </div>
        <p className="footer-copy">{t.footer_copy}</p>
      </footer>

      <div className="wa-float">
        {pulse && (
          <div className="wa-bubble">
            <GlobeIcon size={13} weight="bold" />{t.wa_bubble}
          </div>
        )}
        <a href={`https://wa.me/${WA_NUMBER}?text=Bonjour%20Alex%20!%20Je%20veux%20en%20savoir%20plus%20sur%20DHA.`} target="_blank" rel="noopener noreferrer" className="wa-button">
          <WhatsappLogoIcon size={28} weight="fill" color="#fff" />
        </a>
      </div>
    </div>
  );
}

const NAV_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');

  :root {
    --bg: #F6F8FC;
    --bg-alt: #EEF2FA;
    --ink: #0F172A;
    --ink-soft: #475569;
    --ink-faint: #94A3B8;
    --glass: rgba(255,255,255,0.55);
    --glass-strong: rgba(255,255,255,0.72);
    --glass-border: rgba(15,23,42,0.08);
    --cyan: #06B6D4;
    --violet: #8B5CF6;
    --green: #22D97A;
    --indigo: #6366F1;
    --grad-primary: linear-gradient(135deg, var(--cyan), var(--indigo));
    --grad-secondary: linear-gradient(135deg, var(--violet), var(--indigo));
    --grad-accent: linear-gradient(135deg, var(--green), var(--cyan));
    --grad-full: linear-gradient(120deg, var(--cyan), var(--indigo) 45%, var(--violet) 75%, var(--green));
    --shadow-glass: 0 8px 32px rgba(99,102,241,0.08), 0 2px 8px rgba(15,23,42,0.04);
    --shadow-glass-lg: 0 20px 60px rgba(99,102,241,0.12), 0 4px 16px rgba(15,23,42,0.06);
    --font-display: 'Space Grotesk', sans-serif;
    --font-body: 'Inter', sans-serif;
  }

  * { box-sizing: border-box; }
  body { background: var(--bg); color: var(--ink); font-family: var(--font-body); margin:0; }
  h1, h2, h3, h4 { font-family: var(--font-display); }
  ::selection { background: rgba(139,92,246,0.18); }

  .glass-card {
    background: var(--glass);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    border: 1px solid var(--glass-border);
    box-shadow: var(--shadow-glass);
  }
  .glass-card:hover { box-shadow: var(--shadow-glass-lg); }

  .desk-nav { display: none !important; }
  .burger { display: flex !important; }
  @media(min-width: 900px) {
    .desk-nav { display: flex !important; }
    .burger { display: none !important; }
  }

  .main-nav {
    position: fixed; top: 14px; left: 14px; right: 14px; z-index: 1000;
    transition: all 0.5s cubic-bezier(0.16,1,0.3,1);
    background: transparent; border: 1px solid transparent; border-radius: 22px;
    max-width: 1180px; margin: 0 auto;
  }
  .main-nav.is-scrolled {
    background: rgba(255,255,255,0.65);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border-color: rgba(15,23,42,0.06);
    box-shadow: 0 8px 32px rgba(99,102,241,0.10);
  }
  .nav-inner { padding: 0 22px; height: 62px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }

  .brand { font-size: 19px; font-weight: 800; color: var(--ink); text-decoration: none; letter-spacing: -0.5px; font-family: var(--font-display); display:flex; align-items:baseline; gap:6px; }
  .brand-mark { background: var(--grad-full); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .brand-suffix { font-size: 9px; color: var(--ink-faint); font-weight: 600; letter-spacing: 1.5px; font-family: var(--font-body); }

  .page-links { align-items: center; gap: 4px; }
  .page-link {
    background: transparent; border: 1px solid transparent; color: var(--ink-soft);
    font-size: 12.5px; padding: 8px 13px; border-radius: 11px; text-decoration: none;
    font-weight: 500; display: flex; align-items: center; gap: 6px;
    transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
  }
  .page-link:hover { background: rgba(99,102,241,0.06); color: var(--indigo); }
  .page-link.is-active { background: rgba(99,102,241,0.09); border-color: rgba(99,102,241,0.18); color: var(--indigo); font-weight: 700; }

  .nav-sep { width: 1px; height: 16px; background: rgba(15,23,42,0.08); margin: 0 8px; }

  .nav-link { background: none; border: none; color: var(--ink-soft); font-size: 12.5px; cursor: pointer; padding: 6px 10px; border-radius: 10px; font-weight: 500; transition: color 0.2s; font-family: var(--font-body); }
  .nav-link:hover { color: var(--indigo); }
  .nav-link.is-accent { color: var(--violet); font-weight: 700; }

  .lang-switch { display: flex; background: rgba(15,23,42,0.04); border: 1px solid rgba(15,23,42,0.07); border-radius: 9px; overflow: hidden; padding: 2px; }
  .lang-btn { background: none; border: none; padding: 6px 11px; font-size: 11px; color: var(--ink-faint); cursor: pointer; font-weight: 600; border-radius: 7px; transition: all 0.2s; font-family: var(--font-body); }
  .lang-btn.is-active { background: #fff; color: var(--indigo); box-shadow: 0 1px 4px rgba(15,23,42,0.08); }

  .nav-cta-btn {
    background: var(--grad-primary); color: #fff; padding: 10px 18px; border-radius: 11px;
    font-size: 12.5px; font-weight: 700; text-decoration: none; display: flex; align-items: center; gap: 6px;
    box-shadow: 0 4px 16px rgba(6,182,212,0.25); transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  }
  .nav-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(6,182,212,0.35); }

  .burger { background: none; border: none; color: var(--ink); cursor: pointer; align-items:center; justify-content:center; }

  .mobile-panel { background: rgba(255,255,255,0.92); backdrop-filter: blur(20px); border-radius: 18px; margin: 0 8px 8px; padding-bottom: 14px; border: 1px solid rgba(15,23,42,0.06); }
  .mobile-pagelinks { padding: 14px 18px 6px; display: flex; gap: 8px; flex-wrap: wrap; }
  .mobile-pagelink { background: rgba(15,23,42,0.03); border: 1px solid rgba(15,23,42,0.06); color: var(--ink-soft); font-size: 12px; padding: 7px 12px; border-radius: 9px; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 5px; }
  .mobile-pagelink.is-active { background: rgba(99,102,241,0.08); border-color: rgba(99,102,241,0.2); color: var(--indigo); }
  .mobile-divider { height: 1px; background: rgba(15,23,42,0.06); margin: 6px 0; }
  .mobile-navlink { display: block; width: 100%; background: none; border: none; border-bottom: 1px solid rgba(15,23,42,0.04); color: var(--ink-soft); font-size: 14px; padding: 12px 22px; text-align: left; cursor: pointer; font-family: var(--font-body); font-weight: 500; }
  .mobile-navlink.is-accent { color: var(--violet); font-weight: 700; }
  .mobile-lang-row { display: flex; align-items: center; gap: 10px; padding: 12px 18px; }
  .mobile-cta { display: flex; align-items:center; justify-content:center; gap:8px; background: var(--grad-primary); color: #fff; padding: 13px; border-radius: 12px; font-size: 15px; font-weight: 700; text-decoration: none; text-align: center; }

  .site-footer { border-top: 1px solid rgba(15,23,42,0.06); padding: 44px 20px; text-align: center; background: var(--bg-alt); }
  .footer-brand { justify-content: center; margin-bottom: 16px; font-size: 21px; }
  .footer-links { display: flex; justify-content: center; gap: 22px; margin-bottom: 18px; flex-wrap: wrap; }
  .footer-link { font-size: 13px; color: var(--ink-soft); text-decoration: none; display: flex; align-items: center; gap: 6px; font-weight: 500; }
  .footer-link:hover { color: var(--indigo); }
  .footer-copy { font-size: 12.5px; color: var(--ink-faint); }

  .wa-float { position: fixed; bottom: 24px; right: 20px; z-index: 1000; }
  .wa-bubble { position: absolute; bottom: 66px; right: 0; background: rgba(15,23,42,0.92); backdrop-filter: blur(10px); border-radius: 12px 12px 4px 12px; padding: 9px 14px; font-size: 12px; color: #fff; white-space: nowrap; box-shadow: 0 8px 24px rgba(15,23,42,0.25); display:flex; align-items:center; gap:6px; font-weight: 500; }
  .wa-button { width: 56px; height: 56px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 24px rgba(37,211,102,0.4); text-decoration: none; transition: transform 0.25s; }
  .wa-button:hover { transform: scale(1.06); }
`;
