import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useLang } from "./LangContext";

const WA_NUMBER = "2290160008046";

const T_NAV = {
  fr: {
    ia: "IA", creative: "Créatif", web: "Web",
    products: "Produits", demo: "🤖 Démo Alex", how: "Comment ça marche",
    pricing: "Tarifs", reviews: "Témoignages", faq: "FAQ", start: "Démarrer →",
    wa_bubble: "💬 Discutez avec nous sur WhatsApp !",
    footer_copy: "Digital Horizon Agency · Cotonou, Bénin · © 2026 DHA"
  },
  en: {
    ia: "AI", creative: "Creative", web: "Web",
    products: "Products", demo: "🤖 Demo Alex", how: "How it works",
    pricing: "Pricing", reviews: "Reviews", faq: "FAQ", start: "Get started →",
    wa_bubble: "💬 Chat with us on WhatsApp !",
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
    { to: "/", label: t.ia, emoji: "🤖", active: location.pathname === "/" },
    { to: "/creative", label: t.creative, emoji: "🎨", active: location.pathname === "/creative" },
    { to: "/web", label: t.web, emoji: "💻", active: location.pathname === "/web" },
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
        <nav style={{
          position: "fixed", top: 12, left: 12, right: 12, zIndex: 1000,
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          background: scrollY > 30 ? "rgba(3, 7, 18, 0.75)" : "transparent",
          backdropFilter: scrollY > 30 ? "blur(16px)" : "none",
          border: scrollY > 30 ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid transparent",
          borderRadius: scrollY > 30 ? "24px" : "0px",
          maxWidth: "1200px", margin: "0 auto"
        }}>
          <div style={{ padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <Link to="/" style={{ fontSize: 20, fontWeight: 900, color: "#fff", textDecoration: "none", letterSpacing: "-1px" }}>
              <span style={{ color: "#00FFB4" }}>D</span>HA
              <span style={{ fontSize: 9, color: "#94a3b8", fontWeight: 500, marginLeft: 6, letterSpacing: "1px" }}>AGENCY</span>
            </Link>

            <div className="desk-nav" style={{ alignItems: "center", gap: 4 }}>
              {pageLinks.map(({ to, label, emoji, active }) => (
                <Link key={to} to={to} style={{
                  background: active ? "rgba(0,255,180,0.06)" : "none",
                  border: active ? "1px solid rgba(0,255,180,0.18)" : "1px solid transparent",
                  color: active ? "#00FFB4" : "#94a3b8",
                  fontSize: 12, padding: "8px 14px", borderRadius: 12, textDecoration: "none", fontWeight: active ? 700 : 500, display: "flex", alignItems: "center", gap: 6, transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                }}>
                  <span>{emoji}</span>{label}
                </Link>
              ))}
              <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.08)", margin: "0 8px" }} />
              {navLinks.map(([id, label]) => (
                <button key={id} onClick={() => scrollTo(id)} style={{
                  background: "none", border: "none", color: id === "demo" ? "#00FFB4" : "#94a3b8", fontSize: 12, cursor: "pointer", padding: "6px 11px", borderRadius: 12, fontWeight: id === "demo" ? 700 : 500, transition: "color 0.25s"
                }}>{label}</button>
              ))}
            </div>

            <div className="desk-nav" style={{ alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, overflow: "hidden", padding: 2 }}>
                {["fr", "en"].map(code => (
                  <button key={code} onClick={() => setLang(code)} style={{
                    background: lang === code ? "rgba(0,255,180,0.12)" : "none", border: "none", padding: "6px 12px", fontSize: 11, color: lang === code ? "#00FFB4" : "#64748b", cursor: "pointer", fontWeight: lang === code ? 700 : 400, borderRadius: 10, transition: "all 0.25s"
                  }}>
                    {code === "fr" ? "🇫🇷" : "🇬🇧"}
                  </button>
                ))}
              </div>
              <a href={`https://wa.me/${WA_NUMBER}`} style={{ background: "linear-gradient(135deg,#00FFB4,#00C8FF)", color: "#050810", padding: "10px 18px", borderRadius: 12, fontSize: 12, fontWeight: 800, textDecoration: "none", boxShadow: "0 4px 20px rgba(0,255,180,0.15)", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }} className="nav-cta-btn">{t.start}</a>
            </div>

            <button className="burger" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: "#e2e8f0", fontSize:24, cursor: "pointer" }}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>

          {menuOpen && (
            <div style={{ background: "rgba(3, 7, 18, 0.98)", borderRadius: 20, margin: "0 10px 10px", paddingBottom: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ padding: "14px 20px 8px", display: "flex", gap: 8, flexWrap: "wrap" }}>
                {pageLinks.map(({ to, label, emoji, active }) => (
                  <Link key={to} to={to} onClick={() => setMenuOpen(false)} style={{
                    background: active ? "rgba(0,255,180,0.06)" : "rgba(255,255,255,0.02)",
                    border: active ? "1px solid rgba(0,255,180,0.15)" : "1px solid rgba(255,255,255,0.05)",
                    color: active ? "#00FFB4" : "#94a3b8", fontSize: 12, padding: "6px 12px", borderRadius: 8, textDecoration: "none", fontWeight: active ? 700 : 500, display: "flex", alignItems: "center", gap: 5
                  }}>{emoji} {label}</Link>
                ))}
              </div>
              <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "6px 0" }} />
              {navLinks.map(([id, label]) => (
                <button key={id} onClick={() => scrollTo(id)} style={{
                  display: "block", width: "100%", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.04)", color: id === "demo" ? "#00FFB4" : "#94a3b8", fontSize: 14, padding: "12px 24px", textAlign: "left", cursor: "pointer"
                }}>{label}</button>
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 20px" }}>
                <div style={{ display: "flex", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden", padding: 2 }}>
                  {["fr", "en"].map(code => (
                    <button key={code} onClick={() => { setLang(code); setMenuOpen(false); }} style={{
                      background: lang === code ? "rgba(0,255,180,0.12)" : "none", border: "none", padding: "7px 14px", fontSize: 12, color: lang === code ? "#00FFB4" : "#64748b", cursor: "pointer", fontWeight: lang === code ? 700 : 400
                    }}>{code === "fr" ? "🇫🇷" : "🇬🇧"}</button>
                  ))}
                </div>
              </div>
              <div style={{ padding: "4px 20px 4px" }}>
                <a href={`https://wa.me/${WA_NUMBER}`} style={{ display: "block", background: "linear-gradient(135deg,#00FFB4,#00C8FF)", color: "#050810", padding: "12px", borderRadius: 12, fontSize: 14, fontWeight: 800, textDecoration: "none", textAlign: "center" }}>{t.start}</a>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main style={{ minHeight: "calc(100vh - 180px)", background: "#030712" }}>
        <Outlet />
      </main>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "50px 24px", textAlign: "center", background: "#030712" }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 14, letterSpacing: "-0.5px" }}><span style={{ color: "#00FFB4" }}>D</span>HA</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 20, flexWrap: "wrap" }}>
          {pageLinks.map(({ to, label, emoji }) => (
            <Link key={to} to={to} style={{ fontSize: 13, color: "#64748b", textDecoration: "none", display: "flex", alignItems: "center", gap: 5, transition: "color 0.25s" }} onMouseEnter={e=>e.currentTarget.style.color="#00FFB4"} onMouseLeave={e=>e.currentTarget.style.color="#64748b"}>{emoji} {label}</Link>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "#374151" }}>{t.footer_copy}</p>
      </footer>
    </div>
  );
}

const NAV_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
  body { background: #030712; color: #f3f4f6; }
  .desk-nav { display: none !important; }
  .burger { display: block !important; }
  
  @media(min-width: 900px) {
    .desk-nav { display: flex !important; }
    .burger { display: none !important; }
  }

  .nav-cta-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0,255,180,0.3) !important;
  }
`;
