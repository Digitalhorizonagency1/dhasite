import { useEffect, useState } from "react";
import { usePageMeta } from "../usePageMeta";

// ── IMAGES ─────────────────────────────────────────────────────────
const POSTERS = [];

export default function Paiement() {
  usePageMeta({
    title: "Renouvellement — Canal+ Bénin",
    description: "Espace de renouvellement privé.",
    path: "/paiement",
    noindex: true,
  });

  // États pour le formulaire de pré-remplissage WhatsApp
  const [cardNumber, setCardNumber] = useState("");
  const [selectedFormula, setSelectedFormula] = useState("Access");

  // Force le fond sombre sur html/body pour cette page uniquement
  useEffect(() => {
    const prevHtmlBg = document.documentElement.style.background;
    const prevBodyBg = document.body.style.background;
    const prevBodyMargin = document.body.style.margin;

    document.documentElement.style.background = "#07070a";
    document.body.style.background = "#07070a";
    document.body.style.margin = "0";

    return () => {
      document.documentElement.style.background = prevHtmlBg;
      document.body.style.background = prevBodyBg;
      document.body.style.margin = prevBodyMargin;
    };
  }, []);

  const genres = [
    "Films", "Séries", "Sport", "Ciné+",
    "Docs", "Kids", "Action", "Foot",
  ];

  const tileCount = 12;
  const tiles = Array.from({ length: tileCount }, (_, i) => ({
    id: i,
    label: genres[i % genres.length],
    hue: (i * 47) % 360,
    light: 10 + ((i * 13) % 14),
    image: POSTERS.length ? POSTERS[i % POSTERS.length] : null,
  }));

  const formulas = [
    "Access (5 000 F)",
    "Évasion (10 000 F)",
    "Évasion+ (15 000 F)",
    "Tout CANAL+ (40 000 F)"
  ];

  // Génération du lien WhatsApp avec message pré-rempli
  const getWhatsAppLink = () => {
    // Remplacer par le numéro à 10 chiffres du revendeur (ex: 22901XXXXXXXX)
    const phone = "2290100000000"; 
    
    const message = `Bonjour, je souhaite renouveler mon abonnement Canal+ via Mobile Money.
    
• Formule : ${selectedFormula}
• Numéro de carte : ${cardNumber || "Non renseigné"}`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  // Limite la saisie aux chiffres et à 14 caractères (longueur standard d'une carte Canal+)
  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, ""); // Garde uniquement les chiffres
    if (val.length <= 14) {
      setCardNumber(val);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.grid} className="paiement-grid" aria-hidden="true">
        {tiles.map((t) => (
          <div
            key={t.id}
            style={{
              ...s.tile,
              background: t.image
                ? `url(${t.image}) center / cover no-repeat`
                : `linear-gradient(160deg, hsl(${t.hue} 50% ${t.light}%), hsl(${t.hue} 40% ${Math.max(t.light - 8, 4)}%))`,
            }}
          >
            {!t.image && <span style={s.tileLabel}>{t.label}</span>}
          </div>
        ))}
      </div>

      <div style={s.scrim} aria-hidden="true" />

      <main style={s.wrap}>
        <div style={s.card} className="paiement-card">
          <div style={s.brandRow}>
            <div style={s.mark}>C+</div>
            <span style={s.brandName}>CANAL+ BÉNIN</span>
          </div>

          <h1 style={s.h1} className="paiement-h1">Renouvellement en ligne</h1>
          <p style={s.sub}>
            Le paiement Mobile Money direct arrive très bientôt. En attendant, 
            renseignez vos informations ci-dessous pour être renouvelé par notre revendeur en 2 minutes.
          </p>

          <div style={s.divider} />

          {/* Formulaire interactif */}
          <div style={s.form}>
            <div style={s.inputGroup}>
              <label style={s.label} htmlFor="cardNumber">Numéro de réabonnement / Carte</label>
              <input
                id="cardNumber"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Ex: 14 chiffres au dos de la carte"
                value={cardNumber}
                onChange={handleCardNumberChange}
                style={s.input}
                className="paiement-input"
              />
              {cardNumber && cardNumber.length < 14 && (
                <span style={s.inputHint}>{cardNumber.length}/14 chiffres</span>
              )}
            </div>

            <div style={s.inputGroup}>
              <label style={s.label} htmlFor="formula">Formule souhaitée</label>
              <select
                id="formula"
                value={selectedFormula}
                onChange={(e) => setSelectedFormula(e.target.value)}
                style={s.select}
                className="paiement-select"
              >
                {formulas.map((f) => (
                  <option key={f} value={f} style={{ background: "#141418", color: "#fff" }}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={s.row}>
            <span style={s.rowLabel}>Statut service</span>
            <span style={s.badge} className="paiement-badge">
              <span style={s.dot} className="paiement-dot" />
              Bientôt disponible
            </span>
          </div>

          <a 
            href={getWhatsAppLink()} 
            target="_blank"
            rel="noopener noreferrer"
            style={s.cta} 
            className="paiement-cta"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.83 14.13c-.24.68-1.4 1.31-1.94 1.36-.5.05-1.02.15-3.36-.83-2.83-1.19-4.66-4.09-4.8-4.28-.14-.19-1.15-1.53-1.15-2.92s.72-2.08.98-2.36c.24-.26.53-.33.71-.33.18 0 .35.002.51.008.16.006.38-.06.6.46.24.57.81 1.97.88 2.11.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.61.17.3.75 1.24 1.62 2.01 1.11.99 2.04 1.3 2.34 1.44.3.15.48.13.65-.08.18-.21.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.73.82 2.02.96.3.15.49.22.56.35.07.13.07.75-.17 1.43z"/>
            </svg>
            Envoyer ma demande par WhatsApp
          </a>

          {/* Badges de paiement visuels et rassurants */}
          <div style={s.paymentPartners}>
            <span style={s.paymentTitle}>Moyens acceptés par le revendeur :</span>
            <div style={s.brandBadges}>
              <span style={{ ...s.brandBadge, border: "1px solid #ffcc00", color: "#ffcc00" }}>MTN MoMo</span>
              <span style={{ ...s.brandBadge, border: "1px solid #00a5e3", color: "#00a5e3" }}>Moov Money</span>
            </div>
          </div>
        </div>

        <footer style={s.footer}>Canal+ Bénin — Paiement by DHA</footer>
      </main>

      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.85); }
        }
        @keyframes pulseBadge {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201,162,75,0.0); }
          50% { box-shadow: 0 0 0 6px rgba(201,162,75,0.06); }
        }
        .paiement-cta {
          min-height: 44px;
          transition: background-color 0.2s ease, transform 0.1s ease;
        }
        .paiement-cta:hover {
          background-color: #f41b28 !important;
        }
        .paiement-cta:active {
          transform: scale(0.98);
        }
        .paiement-cta:focus-visible {
          outline: 2px solid #fff;
          outline-offset: 2px;
        }
        .paiement-input:focus, .paiement-select:focus {
          outline: none;
          border-color: rgba(255,255,255,0.25) !important;
          background: rgba(255,255,255,0.07) !important;
        }
        @media (max-width: 380px) {
          .paiement-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .paiement-card { padding: 24px 20px !important; }
          .paiement-h1 { font-size: 19px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .paiement-badge, .paiement-dot, .paiement-cta { 
            animation: none !important; 
            transition: none !important; 
          }
        }
      `}</style>
    </div>
  );
}

const s = {
  page: {
    position: "relative",
    minHeight: "100dvh",
    background: "#07070a",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  grid: {
    position: "fixed",
    inset: 0,
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 4,
    padding: 4,
    filter: "saturate(0.9)",
    transform: "scale(1.02)",
    zIndex: 0,
  },
  tile: {
    position: "relative",
    aspectRatio: "2 / 3",
    borderRadius: 4,
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-end",
    padding: 10,
  },
  tileLabel: {
    fontSize: 12,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.35)",
    fontWeight: 700,
  },
  scrim: {
    position: "fixed",
    inset: 0,
    background:
      "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(7,7,10,0.94) 0%, rgba(7,7,10,0.86) 40%, rgba(7,7,10,0.78) 100%)",
    zIndex: 1,
  },
  wrap: {
    position: "relative",
    zIndex: 2,
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 24px calc(24px + env(safe-area-inset-bottom))",
  },
  card: {
    width: "100%",
    maxWidth: 360,
    background: "rgba(20,20,24,0.72)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: "28px 24px",
    boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
  },
  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 24,
  },
  mark: {
    width: 34,
    height: 34,
    borderRadius: 8,
    background: "#e30613",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: 14,
    color: "#fff",
    letterSpacing: "-0.02em",
  },
  brandName: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: "rgba(255,255,255,0.55)",
  },
  h1: {
    fontSize: 22,
    fontWeight: 700,
    color: "#f5f5f3",
    marginBottom: 10,
    letterSpacing: "-0.01em",
    lineHeight: 1.25,
  },
  sub: {
    fontSize: 13,
    lineHeight: 1.55,
    color: "rgba(255,255,255,0.5)",
    marginBottom: 20,
  },
  divider: {
    height: 1,
    background: "rgba(255,255,255,0.08)",
    marginBottom: 20,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    marginBottom: 20,
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: 600,
    color: "rgba(255,255,255,0.45)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  input: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    padding: "10px 12px",
    color: "#fff",
    fontSize: 13,
    fontFamily: "inherit",
    transition: "border-color 0.2s, background-color 0.2s",
  },
  inputHint: {
    fontSize: 10,
    textAlign: "right",
    color: "rgba(255,255,255,0.3)",
    marginTop: 2,
  },
  select: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    padding: "10px 12px",
    color: "#fff",
    fontSize: 13,
    fontFamily: "inherit",
    cursor: "pointer",
    transition: "border-color 0.2s, background-color 0.2s",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  rowLabel: {
    fontSize: 13,
    color: "rgba(255,255,255,0.45)",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    fontSize: 12,
    fontWeight: 600,
    color: "#c9a24b",
    background: "rgba(201,162,75,0.12)",
    border: "1px solid rgba(201,162,75,0.25)",
    borderRadius: 100,
    padding: "6px 12px",
    animation: "pulseBadge 2.6s ease-in-out infinite",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#c9a24b",
    animation: "pulseDot 2.6s ease-in-out infinite",
  },
  cta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    textAlign: "center",
    textDecoration: "none",
    background: "#e30613",
    color: "#fff",
    fontWeight: 600,
    fontSize: 13,
    borderRadius: 10,
    padding: "12px 18px",
    marginBottom: 20,
  },
  paymentPartners: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    borderTop: "1px solid rgba(255,255,255,0.05)",
    paddingTop: 16,
  },
  paymentTitle: {
    fontSize: 10,
    color: "rgba(255,255,255,0.35)",
    textTransform: "uppercase",
    letterSpacing: "0.02em",
  },
  brandBadges: {
    display: "flex",
    gap:
