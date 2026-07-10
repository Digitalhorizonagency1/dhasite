import { useEffect } from "react";
import { usePageMeta } from "../usePageMeta";

// ── IMAGES ─────────────────────────────────────────────────────────
// Place tes visuels dans src/assets/posters/ puis importe-les ici.
// Formats recommandés : .jpg ou .webp, ratio 2:3 (portrait), ~600x900px.
// Exemple une fois tes fichiers ajoutés :
//
// import poster1 from "../assets/posters/poster1.jpg";
// import poster2 from "../assets/posters/poster2.jpg";
// import poster3 from "../assets/posters/poster3.jpg";
// ...
//
// Puis remplace le tableau POSTERS ci-dessous par :
// const POSTERS = [poster1, poster2, poster3, ...];
//
// Tant qu'aucune image n'est fournie, la page utilise un dégradé de
// secours (aucune erreur, aucun import cassé).

const POSTERS = [];

export default function Paiement() {
  usePageMeta({
    title: "Renouvellement — Canal+ Bénin",
    description: "Espace de renouvellement privé.",
    path: "/paiement",
    noindex: true,
  });

  // Force le fond sombre sur html/body pour cette page uniquement
  // (évite le cadre blanc autour si le reste du site a un fond clair).
  // Restauré automatiquement en quittant la page.
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

  // Grille plus large : 4 colonnes desktop, tuiles plus grandes (moins denses)
  const tileCount = 12;
  const tiles = Array.from({ length: tileCount }, (_, i) => ({
    id: i,
    label: genres[i % genres.length],
    hue: (i * 47) % 360,
    light: 10 + ((i * 13) % 14),
    image: POSTERS.length ? POSTERS[i % POSTERS.length] : null,
  }));

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
            Le paiement Mobile Money arrive très bientôt sur cet espace.
            En attendant, votre revendeur peut renouveler votre abonnement
            en quelques minutes.
          </p>

          <div style={s.divider} />

          <div style={s.row}>
            <span style={s.rowLabel}>Statut</span>
            <span style={s.badge} className="paiement-badge">
              <span style={s.dot} className="paiement-dot" />
              Bientôt disponible
            </span>
          </div>

          <a href="https://wa.me/22900000000" style={s.cta} className="paiement-cta">
            Contacter mon revendeur
          </a>

          <p style={s.footNote}>Paiement sécurisé MTN MoMo · Moov Money</p>
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
          min-height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 380px) {
          .paiement-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .paiement-card { padding: 28px 22px !important; }
          .paiement-h1 { font-size: 19px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .paiement-badge, .paiement-dot { animation: none !important; }
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
    maxWidth: 400,
    background: "rgba(20,20,24,0.72)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: "36px 30px",
    boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
  },
  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 28,
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
    fontSize: 14,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.5)",
    marginBottom: 24,
  },
  divider: {
    height: 1,
    background: "rgba(255,255,255,0.08)",
    marginBottom: 20,
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
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
    display: "block",
    textAlign: "center",
    textDecoration: "none",
    background: "#e30613",
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
    borderRadius: 12,
    padding: "14px 20px",
    marginBottom: 16,
    transition: "opacity 0.15s ease",
  },
  footNote: {
    textAlign: "center",
    fontSize: 11,
    color: "rgba(255,255,255,0.3)",
    letterSpacing: "0.02em",
  },
  footer: {
    marginTop: 24,
    fontSize: 12,
    color: "rgba(255,255,255,0.25)",
  },
};
