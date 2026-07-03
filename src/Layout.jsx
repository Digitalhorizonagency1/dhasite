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
      window.removeEventListener("scroll", fn => setScrollY(window.scrollY));
      clearTimeout(ti);
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
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          transition: "all 0.4s",
          background: scrollY > 60 ? "rgba(5,8,16,0.95)" : "transparent",
          backdropFilter: scrollY > 60 ? "blur(24px)" : "none",
          borderBottom: scrollY > 60 ? "1px solid rgba(255,255,255,0.06)" : "none"
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <Link to="/" style={{ fontSize: 22, fontWeight: 900, color: "#e2e8f0", textDecoration: "none", letterSpacing: "-1px" }}>
              <span style={{ color: "#00FFB4" }}>D</span>HA
              <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 400, marginLeft: 8, letterSpacing: "1px" }}>AGENCY</span>
            </Link>

            <div className="desk-nav" style={{ alignItems: "center", gap: 2 }}>
              {pageLinks.map(({ to, label, emoji, active }) => (
                <Link key={to} to={to} style={{
                  background: active ? "rgba(0,255,180,0.08)" : "none",
                  border: active ? "1px solid rgba(0,255,180,0.2)" : "1px solid transparent",
                  color: active ? "#00FFB4" : "#94a3b8",
                  fontSize: 12, padding: "6px 12px", borderRadius: 8, textDecoration: "none", fontWeight: active ? 700 : 500, display: "flex", alignItems: "center", gap: 4
                }}>
                  <span>{emoji}</span>{label}
                </Link>
              ))}
              <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.06)", margin: "0 6px" }} />
              {navLinks.map(([id, label]) => (
                <button key={id} onClick={() => scrollTo(id)} style={{
                  background: "none", border: "none", color: id === "demo" ? "#00FFB4" : "#94a3b8", fontSize: 12, cursor: "pointer", padding: "6px 11px", borderRadius: 8, fontWeight: id === "demo" ? 700 : 500
                }}>{label}</button>
              ))}
            </div>

            <div className="desk-nav" style={{ alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden" }}>
                {["fr", "en"].map(code => (
                  <button key={code} onClick={() => setLang(code)} style={{
                    background: lang === code ? "rgba(0,255,180,0.15)" : "none", border: "none", padding: "6px 12px", fontSize: 12, color: lang === code ? "#00FFB4" : "#94a3b8", cursor: "pointer", fontWeight: lang === code ? 700 : 400
                  }}>
                    {code === "fr" ? "🇫🇷 FR" : "🇬🇧 EN"}
                  </button>
                ))}
              </div>
              <a href={`https://wa.me/${WA_NUMBER}`} style={{ background:"linear-gradient(135deg,#00FFB4,#00C8FF)", color:"#050810", padding:"9px 16px", borderRadius:10, fontSize:12, fontWeight:700, textDecoration:"none" }}>{t.start}</a>
            </div>

            <button className="burger" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: "#e2e8f0", fontSize:24, cursor: "pointer" }}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>

          {menuOpen && (
            <div style={{ background: "rgba(5,8,16,0.98)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ padding: "10px 20px 6px", display: "flex", gap: 8, flexWrap: "wrap" }}>
                {pageLinks.map(({ to, label, emoji, active }) => (
                  <Link key={to} to={to} onClick={() => setMenuOpen(false)} style={{
                    background: active ? "rgba(0,255,180,0.08)" : "rgba(255,255,255,0.03)",
                    border: active ? "1px solid rgba(0,255,180,0.2)" : "1px solid rgba(255,255,255,0.06)",
                    color: active ? "#00FFB4" : "#94a3b8", fontSize: 12, padding: "6px 12px", borderRadius: 8, textDecoration: "none", fontWeight: active ? 700 : 500, display: "flex", alignItems: "center", gap: 5
                  }}>{emoji} {label}</Link>
                ))}
              </div>
              <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "6px 0" }} />
              {navLinks.map(([id, label]) => (
                <button key={id} onClick={() => scrollTo(id)} style={{
                  display: "block", width: "100%", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.06)", color: id === "demo" ? "#00FFB4" : "#94a3b8", fontSize: 15, padding: "14px 24px", textAlign: "left", cursor: "pointer"
                }}>{label}</button>
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 20px" }}>
                <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden" }}>
                  {["fr", "en"].map(code => (
                    <button key={code} onClick={() => { setLang(code); setMenuOpen(false); }} style={{
                      background: lang === code ? "rgba(0,255,180,0.15)" : "none", border: "none", padding: "7px 14px", fontSize: 12, color: lang === code ? "#00FFB4" : "#94a3b8", cursor: "pointer", fontWeight: lang === code ? 700 : 400
                    }}>{code === "fr" ? "🇫🇷 FR" : "🇬🇧 EN"}</button>
                ))}
                </div>
              </div>
              <div style={{ padding: "4px 20px 16px" }}>
                <a href={`https://wa.me/${WA_NUMBER}`} style={{ display: "block", background: "linear-gradient(135deg,#00FFB4,#00C8FF)", color: "#050810", padding: "13px", borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: "none", textAlign: "center" }}>{t.start}</a>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main style={{ minHeight: "calc(100vh - 180px)" }}>
        <Outlet />
      </main>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "40px 20px", textAlign: "center", background: "#050810" }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", marginBottom: 14 }}><span style={{ color: "#00FFB4" }}>D</span>HA</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 16, flexWrap: "wrap" }}>
          {pageLinks.map(({ to, label, emoji }) => (
            <Link key={to} to={to} style={{ fontSize: 13, color: "#94a3b8", textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}>{emoji} {label}</Link>
          ))}
        </div>
        <p style={{ fontSize: 13, color: "#334155" }}>{t.footer_copy}</p>
      </footer>

      {/* WhatsApp Flottant */}
      <div style={{ position: "fixed", bottom: 24, right: 20, zIndex: 1000 }}>
        {pulse && (
          <div style={{ position: "absolute", bottom: 66, right: 0, background: "#075E54", border: "1px solid rgba(37,211,102,0.3)", borderRadius: "12px 12px 4px 12px", padding: "8px 14px", fontSize: 12, color: "#fff", whiteSpace: "nowrap", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
            {t.wa_bubble}
          </div>
        )}
        <a href={`https://wa.me/${WA_NUMBER}?text=Bonjour%20Alex%20!%20Je%20veux%20en%20savoir%20plus%20sur%20DHA.`} target="_blank" rel="noopener noreferrer" style={{ width: 56, height: 56, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.5)", textDecoration: "none" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>
    </div>
  );
}

const NAV_CSS = `
  .desk-nav { display: none !important; }
  .burger { display: block !important; }
  @media(min-width:900px) {
    .desk-nav { display: flex !important; }
    .burger { display: none !important; }
  }
`;
