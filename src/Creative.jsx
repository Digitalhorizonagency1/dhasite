import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const WA_NUMBER = "2290160008046";
const LANG = {
  fr: {
    nav: ["Accueil","IA","Créatif","Web"],
    hero_badge: "Design · Vidéo · Motion",
    hero_title: "Donnez vie à vos idées",
    hero_sub: "Design graphique, montage vidéo et motion design pensés pour le marché africain.",
    cta_graphic: "🎨 Brief Graphique",
    cta_video: "🎬 Brief Vidéo / Motion",
    portfolio_title: "Nos Réalisations",
    portfolio_sub: "Quelques projets qui parlent pour nous.",
    all: "Tous", logos: "Logos", affiches: "Affiches", videos: "Vidéos",
    services_title: "Nos Services Créatifs",
    services_sub: "De l'idée au rendu final, on s'occupe de tout.",
    process_title: "Notre Processus",
    process_sub: "Simple, rapide, efficace.",
    cta_title: "Un projet en tête ?",
    cta_sub: "Dites-nous tout — on s'occupe du reste.",
    submit_wa: "Soumettre via WhatsApp",
    next: "Suivant →",
    prev: "← Retour",
    step: "Étape",
    of: "sur",
  },
  en: {
    nav: ["Home","AI","Creative","Web"],
    hero_badge: "Design · Video · Motion",
    hero_title: "Bring your ideas to life",
    hero_sub: "Graphic design, video editing and motion design for the African market.",
    cta_graphic: "🎨 Graphic Brief",
    cta_video: "🎬 Video / Motion Brief",
    portfolio_title: "Our Work",
    portfolio_sub: "A few projects that speak for themselves.",
    all: "All", logos: "Logos", affiches: "Posters", videos: "Videos",
    services_title: "Our Creative Services",
    services_sub: "From idea to final output, we handle everything.",
    process_title: "Our Process",
    process_sub: "Simple, fast, effective.",
    cta_title: "Have a project in mind?",
    cta_sub: "Tell us everything — we'll handle the rest.",
    submit_wa: "Submit via WhatsApp",
    next: "Next →",
    prev: "← Back",
    step: "Step",
    of: "of",
  },
  es: {
    nav: ["Inicio","IA","Creativo","Web"],
    hero_badge: "Diseño · Video · Motion",
    hero_title: "Dale vida a tus ideas",
    hero_sub: "Diseño gráfico, edición de video y motion design para el mercado africano.",
    cta_graphic: "🎨 Brief Gráfico",
    cta_video: "🎬 Brief Video / Motion",
    portfolio_title: "Nuestros Trabajos",
    portfolio_sub: "Algunos proyectos que hablan por sí solos.",
    all: "Todos", logos: "Logos", affiches: "Carteles", videos: "Videos",
    services_title: "Nuestros Servicios Creativos",
    services_sub: "De la idea al resultado final, nos encargamos de todo.",
    process_title: "Nuestro Proceso",
    process_sub: "Simple, rápido, efectivo.",
    cta_title: "¿Tienes un proyecto?",
    cta_sub: "Cuéntanos todo — nosotros nos encargamos.",
    submit_wa: "Enviar via WhatsApp",
    next: "Siguiente →",
    prev: "← Volver",
    step: "Paso",
    of: "de",
  },
};

const PORTFOLIO = [
  { cat:"logos",    title:"Logo Tech Startup",     img:"https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80", tags:["Branding","Logo"] },
  { cat:"logos",    title:"Identité Restaurant",   img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", tags:["Logo","Identité"] },
  { cat:"affiches", title:"Affiche Événement",     img:"https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80", tags:["Affiche","Event"] },
  { cat:"affiches", title:"Flyer Promotionnel",    img:"https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=600&q=80", tags:["Flyer","Print"] },
  { cat:"videos",   title:"Motion Design App",     img:"https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=600&q=80", tags:["Motion","App"] },
  { cat:"videos",   title:"Spot Publicitaire",     img:"https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80", tags:["Vidéo","Pub"] },
];

const SERVICES = [
  { icon:"🎨", title:"Design Graphique", desc:"Logos, affiches, flyers, identités visuelles. Chaque visuel est pensé pour capter l'attention et convertir.", items:["Création de logo","Charte graphique","Affiches & flyers","Posts réseaux sociaux","Packaging"] },
  { icon:"🎬", title:"Montage Vidéo & Motion", desc:"Spots publicitaires, motion design, animations pour vos réseaux. Du script au rendu final.", items:["Spot app mobile/web","Motion flyer","Teaser événementiel","Intro/outro YouTube","Reels & TikTok"] },
  { icon:"✨", title:"Identité de Marque", desc:"Votre marque mérite une identité cohérente et mémorable sur tous les supports.", items:["Logo + déclinaisons","Palette couleurs","Typographies","Guide de style","Templates réseaux"] },
];

const STEPS = [
  { n:"01", icon:"💬", title:"Brief", desc:"Vous remplissez le formulaire en ligne. On comprend votre vision, vos objectifs et votre budget." },
  { n:"02", icon:"🎯", title:"Proposition", desc:"On vous envoie une proposition détaillée avec délais et tarifs sous 24h." },
  { n:"03", icon:"✏️", title:"Création", desc:"Notre équipe travaille sur votre projet. Vous suivez l'avancement et donnez vos retours." },
  { n:"04", icon:"🚀", title:"Livraison", desc:"Fichiers sources + exports finaux livrés. Révisions incluses jusqu'à votre satisfaction." },
];

/* ── BRIEF VIDÉO / MOTION ── */
const VIDEO_STEPS = [
  {
    title: "Vos coordonnées",
    fields: [
      { id:"nom", label:"Nom & Prénom *", type:"text", placeholder:"Jean Dupont" },
      { id:"email", label:"Email *", type:"email", placeholder:"jean@exemple.com" },
      { id:"tel", label:"WhatsApp / Téléphone *", type:"tel", placeholder:"+229 XX XX XX XX" },
      { id:"entreprise", label:"Entreprise (optionnel)", type:"text", placeholder:"Nom de votre entreprise" },
    ]
  },
  {
    title: "Type de projet",
    tiles: [
      { id:"app_mobile", icon:"📱", title:"Spot · App Mobile", desc:"Promo application iOS/Android" },
      { id:"app_web",    icon:"💻", title:"Spot · App Web",    desc:"Présentation plateforme web" },
      { id:"saas",       icon:"⚙️", title:"Spot · SAAS",       desc:"Explication logiciel B2B" },
      { id:"event",      icon:"🎪", title:"Spot Événementiel", desc:"Teaser ou récap événement" },
      { id:"flyer",      icon:"📲", title:"Motion Flyer",      desc:"Affiche animée réseaux sociaux" },
      { id:"autre",      icon:"✨", title:"Autre besoin",       desc:"Précisez votre demande" },
    ]
  },
  {
    title: "Détails du projet",
    fields: [
      { id:"duree", label:"Durée souhaitée", type:"select", options:["Moins de 30 secondes","30 à 60 secondes","1 à 2 minutes","Plus de 2 minutes"] },
      { id:"style", label:"Style visuel", type:"select", options:["Moderne & épuré","Dynamique & coloré","Professionnel & corporate","Créatif & artistique","Je fais confiance à votre équipe"] },
      { id:"references", label:"Sites / vidéos de référence (liens)", type:"textarea", placeholder:"https://..." },
      { id:"details", label:"Décrivez votre projet", type:"textarea", placeholder:"Parlez-nous de votre produit, votre cible, vos objectifs..." },
    ]
  },
  {
    title: "Script & Voix",
    fields: [
      { id:"script", label:"Avez-vous un script ?", type:"select", options:["Oui, j'ai un script prêt","Non, j'ai besoin que vous le rédigiez","J'ai une ébauche à affiner"] },
      { id:"voix", label:"Voix off souhaitée", type:"select", options:["Voix masculine","Voix féminine","Pas de voix off","À discuter"] },
      { id:"langue_voix", label:"Langue de la voix", type:"select", options:["Français","Anglais","Fon","Yoruba","Autre"] },
      { id:"musique", label:"Musique de fond", type:"select", options:["Oui, proposez-en une","Oui, j'en fournis une","Non, pas de musique"] },
    ]
  },
  {
    title: "Délai & Budget",
    fields: [
      { id:"delai", label:"Délai souhaité", type:"select", options:["Urgent (moins de 3 jours)","1 semaine","2 semaines","1 mois ou plus","Flexible"] },
      { id:"budget", label:"Budget estimé (FCFA)", type:"select", options:["Moins de 50 000","50 000 – 100 000","100 000 – 200 000","200 000 – 500 000","Plus de 500 000","À discuter"] },
      { id:"infos_sup", label:"Informations supplémentaires", type:"textarea", placeholder:"Tout ce qui pourrait nous aider à mieux comprendre votre projet..." },
    ]
  },
];

/* ── BRIEF GRAPHIQUE ── */
const GRAPHIC_STEPS = [
  {
    title: "Vos coordonnées",
    fields: [
      { id:"nom", label:"Nom & Prénom *", type:"text", placeholder:"Jean Dupont" },
      { id:"email", label:"Email *", type:"email", placeholder:"jean@exemple.com" },
      { id:"tel", label:"WhatsApp / Téléphone *", type:"tel", placeholder:"+229 XX XX XX XX" },
      { id:"entreprise", label:"Entreprise (optionnel)", type:"text", placeholder:"Nom de votre entreprise" },
    ]
  },
  {
    title: "Type de projet",
    tiles: [
      { id:"logo",      icon:"✏️", title:"Création de Logo",      desc:"Logo + déclinaisons" },
      { id:"identite",  icon:"🎨", title:"Identité Visuelle",     desc:"Charte graphique complète" },
      { id:"affiche",   icon:"🖼️", title:"Affiche / Flyer",       desc:"Print ou digital" },
      { id:"post",      icon:"📱", title:"Posts Réseaux Sociaux", desc:"Facebook, Instagram, TikTok" },
      { id:"packaging", icon:"📦", title:"Packaging",             desc:"Emballage produit" },
      { id:"autre",     icon:"✨", title:"Autre besoin",           desc:"Précisez votre demande" },
    ]
  },
  {
    title: "Style & Références",
    fields: [
      { id:"style", label:"Style souhaité", type:"select", options:["Moderne & minimaliste","Coloré & dynamique","Traditionnel & élégant","Ludique & créatif","Corporate & professionnel","Je fais confiance à votre équipe"] },
      { id:"couleurs", label:"Couleurs préférées", type:"text", placeholder:"Ex: bleu marine, or, blanc..." },
      { id:"references", label:"Références visuelles (liens ou descriptions)", type:"textarea", placeholder:"Sites, logos, affiches que vous aimez..." },
      { id:"concurrents", label:"Concurrents / Acteurs du secteur", type:"text", placeholder:"Pour éviter les ressemblances" },
    ]
  },
  {
    title: "Délai & Budget",
    fields: [
      { id:"fichiers", label:"Avez-vous des éléments existants ?", type:"select", options:["Non, je pars de zéro","Oui, j'ai un ancien logo","Oui, j'ai une charte existante","Oui, j'enverrai les fichiers sur WhatsApp"] },
      { id:"delai", label:"Délai souhaité", type:"select", options:["Urgent (moins de 3 jours)","1 semaine","2 semaines","1 mois ou plus","Flexible"] },
      { id:"budget", label:"Budget estimé (FCFA)", type:"select", options:["Moins de 25 000","25 000 – 50 000","50 000 – 100 000","100 000 – 200 000","Plus de 200 000","À discuter"] },
      { id:"infos_sup", label:"Décrivez votre projet", type:"textarea", placeholder:"Votre activité, votre cible, vos valeurs, vos attentes..." },
    ]
  },
];

function BriefModal({ type, onClose, lang }) {
  const t = LANG[lang] || LANG.fr;
  const steps = type === "video" ? VIDEO_STEPS : GRAPHIC_STEPS;
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [tile, setTile] = useState("");

  const update = (id, val) => setData(p => ({ ...p, [id]: val }));

  const buildWAMessage = () => {
    const typeLabel = type === "video" ? "Vidéo/Motion" : "Design Graphique";
    let msg = `🎨 *Nouveau Brief ${typeLabel} — DHA*\n\n`;
    if (tile) msg += `*Type de projet :* ${tile}\n\n`;
    Object.entries(data).forEach(([k, v]) => {
      if (v) msg += `*${k.charAt(0).toUpperCase() + k.slice(1)}* : ${v}\n`;
    });
    return encodeURIComponent(msg);
  };

  const submitWA = () => {
    window.open(`https://wa.me/${WA_NUMBER}?text=${buildWAMessage()}`, "_blank");
    onClose();
  };

  const currentStep = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background:"#0d1117", border:"1px solid rgba(255,255,255,0.1)", borderRadius:24, width:"100%", maxWidth:560, maxHeight:"90vh", overflowY:"auto", animation:"fadeUp 0.3s ease" }}>
        {/* Header */}
        <div style={{ padding:"20px 24px 0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:11, color: type==="video" ? "#a855f7" : "#f59e0b", fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:4 }}>
              {type==="video" ? "🎬 Brief Vidéo / Motion" : "🎨 Brief Design Graphique"}
            </div>
            <div style={{ fontSize:18, fontWeight:800, color:"#fff" }}>{currentStep.title}</div>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.05)", border:"none", color:"#94a3b8", fontSize:20, cursor:"pointer", borderRadius:"50%", width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        </div>

        {/* Progress bar */}
        <div style={{ padding:"14px 24px 0" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
            <span style={{ fontSize:11, color:"#64748b" }}>{t.step} {step + 1} {t.of} {steps.length}</span>
            <span style={{ fontSize:11, color: type==="video" ? "#a855f7" : "#f59e0b" }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ height:4, background:"rgba(255,255,255,0.06)", borderRadius:4 }}>
            <div style={{ height:"100%", width:`${progress}%`, background: type==="video" ? "linear-gradient(90deg,#a855f7,#7c3aed)" : "linear-gradient(90deg,#f59e0b,#ef4444)", borderRadius:4, transition:"width 0.4s ease" }} />
          </div>
        </div>

        {/* Content */}
        <div style={{ padding:"20px 24px 24px" }}>
          {/* Tiles */}
          {currentStep.tiles && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12 }}>
              {currentStep.tiles.map(t => (
                <button key={t.id} onClick={() => { setTile(t.title); update("type_projet", t.title); }} style={{ background: tile===t.title ? (type==="video" ? "rgba(168,85,247,0.15)" : "rgba(245,158,11,0.15)") : "rgba(255,255,255,0.03)", border:`1px solid ${tile===t.title ? (type==="video" ? "#a855f7" : "#f59e0b") : "rgba(255,255,255,0.07)"}`, borderRadius:14, padding:"14px 12px", cursor:"pointer", textAlign:"left", fontFamily:"inherit", transition:"all 0.2s" }}>
                  <div style={{ fontSize:24, marginBottom:6 }}>{t.icon}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:"#fff", marginBottom:3 }}>{t.title}</div>
                  <div style={{ fontSize:11, color:"#64748b" }}>{t.desc}</div>
                </button>
              ))}
            </div>
          )}

          {/* Fields */}
          {currentStep.fields && (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {currentStep.fields.map(f => (
                <div key={f.id}>
                  <label style={{ display:"block", fontSize:13, color:"#94a3b8", marginBottom:6, fontWeight:500 }}>{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea value={data[f.id] || ""} onChange={e => update(f.id, e.target.value)} placeholder={f.placeholder} rows={3} style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, padding:"10px 14px", fontSize:13, color:"#e2e8f0", outline:"none", fontFamily:"inherit", resize:"vertical", boxSizing:"border-box" }} />
                  ) : f.type === "select" ? (
                    <select value={data[f.id] || ""} onChange={e => update(f.id, e.target.value)} style={{ width:"100%", background:"#1a1f2e", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, padding:"10px 14px", fontSize:13, color: data[f.id] ? "#e2e8f0" : "#64748b", outline:"none", fontFamily:"inherit", cursor:"pointer" }}>
                      <option value="">Choisissez...</option>
                      {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type={f.type} value={data[f.id] || ""} onChange={e => update(f.id, e.target.value)} placeholder={f.placeholder} style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, padding:"10px 14px", fontSize:13, color:"#e2e8f0", outline:"none", fontFamily:"inherit", boxSizing:"border-box" }} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:24, gap:12 }}>
            {step > 0 ? (
              <button onClick={() => setStep(p => p - 1)} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", color:"#94a3b8", padding:"11px 20px", borderRadius:10, fontSize:14, cursor:"pointer", fontFamily:"inherit" }}>{t.prev}</button>
            ) : <div />}
            {step < steps.length - 1 ? (
              <button onClick={() => setStep(p => p + 1)} style={{ background: type==="video" ? "linear-gradient(135deg,#a855f7,#7c3aed)" : "linear-gradient(135deg,#f59e0b,#ef4444)", color:"#fff", border:"none", padding:"11px 24px", borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>{t.next}</button>
            ) : (
              <button onClick={submitWA} style={{ background:"linear-gradient(135deg,#25D366,#128C7E)", color:"#fff", border:"none", padding:"11px 24px", borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                {t.submit_wa}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export default function Creative() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(null); // "video" | "graphic" | null
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState("fr");
  const [heroRef, heroIn] = useInView(0.1);
  const [portRef, portIn] = useInView(0.1);
  const [servRef, servIn] = useInView(0.1);
  const [procRef, procIn] = useInView(0.1);
  const t = LANG[lang] || LANG.fr;

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const bg = dark ? "#050810" : "#f8fafc";
  const text = dark ? "#e2e8f0" : "#1e293b";
  const cardBg = dark ? "rgba(255,255,255,0.03)" : "#fff";
  const cardBorder = dark ? "rgba(255,255,255,0.07)" : "#e2e8f0";
  const navBg = scrollY > 60 ? (dark ? "rgba(5,8,16,0.95)" : "rgba(248,250,252,0.95)") : "transparent";

  const filtered = filter === "all" ? PORTFOLIO : PORTFOLIO.filter(p => p.cat === filter);

  return (
    <div style={{ fontFamily:"'Outfit',sans-serif", background: bg, color: text, overflowX:"hidden", transition:"background 0.3s, color 0.3s" }}>
      <style>{CSS}</style>

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background: navBg, backdropFilter: scrollY>60 ? "blur(24px)" : "none", borderBottom: scrollY>60 ? `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` : "none", transition:"all 0.4s" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", height:68, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <Link to="/" style={{ textDecoration:"none", fontSize:22, fontWeight:900, letterSpacing:"-1px" }}>
            <span style={{ color:"#f59e0b" }}>D</span><span style={{ color: text }}>HA</span>
            <span style={{ fontSize:11, color:"#64748b", fontWeight:400, marginLeft:8 }}>AGENCY</span>
          </Link>

          <div className="desk-nav" style={{ display:"flex", alignItems:"center", gap:4 }}>
            <Link to="/" style={navLink(dark)}>{t.nav[0]}</Link>
            <Link to="/" style={navLink(dark)}>{t.nav[1]}</Link>
            <Link to="/creative" style={{ ...navLink(dark), color:"#f59e0b", fontWeight:700 }}>{t.nav[2]}</Link>
            <Link to="/web" style={navLink(dark)}>{t.nav[3]}</Link>

            {/* Lang selector */}
            <select value={lang} onChange={e => setLang(e.target.value)} style={{ background:"transparent", border:`1px solid ${dark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`, color: text, borderRadius:8, padding:"5px 8px", fontSize:12, cursor:"pointer", fontFamily:"inherit", marginLeft:8 }}>
              <option value="fr">🇫🇷 FR</option>
              <option value="en">🇬🇧 EN</option>
              <option value="es">🇪🇸 ES</option>
            </select>

            {/* Dark/Light toggle */}
            <button onClick={() => setDark(!dark)} style={{ background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)", border:"none", borderRadius:20, padding:"6px 12px", cursor:"pointer", fontSize:16, marginLeft:4 }}>
              {dark ? "☀️" : "🌙"}
            </button>

            <button onClick={() => setModal("graphic")} style={{ background:"linear-gradient(135deg,#f59e0b,#ef4444)", color:"#fff", border:"none", padding:"9px 18px", borderRadius:50, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit", marginLeft:8 }}>{t.cta_graphic}</button>
          </div>

          <button className="burger" onClick={() => setMenuOpen(!menuOpen)} style={{ display:"none", background:"none", border:"none", color: text, fontSize:24, cursor:"pointer" }}>{menuOpen ? "✕" : "☰"}</button>
        </div>

        {menuOpen && (
          <div style={{ background: dark ? "rgba(5,8,16,0.98)" : "rgba(248,250,252,0.98)", borderTop:`1px solid ${cardBorder}`, padding:"8px 0 20px" }}>
            {[["/" ,t.nav[0]],["/",t.nav[1]],["/creative",t.nav[2]],["/web",t.nav[3]]].map(([path,label]) => (
              <Link key={label} to={path} onClick={() => setMenuOpen(false)} style={{ display:"block", color: text, fontSize:16, padding:"14px 24px", textDecoration:"none" }}>{label}</Link>
            ))}
            <div style={{ padding:"8px 24px 0", display:"flex", gap:8 }}>
              <button onClick={() => { setModal("graphic"); setMenuOpen(false); }} style={{ flex:1, background:"linear-gradient(135deg,#f59e0b,#ef4444)", color:"#fff", border:"none", padding:"12px", borderRadius:12, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>{t.cta_graphic}</button>
              <button onClick={() => { setModal("video"); setMenuOpen(false); }} style={{ flex:1, background:"linear-gradient(135deg,#a855f7,#7c3aed)", color:"#fff", border:"none", padding:"12px", borderRadius:12, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>{t.cta_video}</button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section ref={heroRef} style={{ minHeight:"100svh", display:"flex", alignItems:"center", justifyContent:"center", padding:"100px 24px 60px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background: dark ? "radial-gradient(ellipse 80% 60% at 50% 0%,rgba(245,158,11,0.07) 0%,transparent 70%)" : "radial-gradient(ellipse 80% 60% at 50% 0%,rgba(245,158,11,0.05) 0%,transparent 70%)" }} />
        <div style={{ position:"absolute", top:"20%", right:"5%", width:400, height:400, background:"radial-gradient(circle,rgba(168,85,247,0.06),transparent 70%)", filter:"blur(60px)", borderRadius:"50%" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${dark ? "rgba(245,158,11,0.02)" : "rgba(245,158,11,0.03)"} 1px,transparent 1px),linear-gradient(90deg,${dark ? "rgba(245,158,11,0.02)" : "rgba(245,158,11,0.03)"} 1px,transparent 1px)`, backgroundSize:"80px 80px" }} />

        <div style={{ position:"relative", zIndex:1, textAlign:"center", maxWidth:760 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background: dark ? "rgba(245,158,11,0.08)" : "rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.25)", borderRadius:50, padding:"7px 18px", fontSize:12, color:"#f59e0b", marginBottom:32, opacity: heroIn?1:0, transform: heroIn?"translateY(0)":"translateY(20px)", transition:"all 0.8s ease" }}>
            <span style={{ width:7, height:7, background:"#f59e0b", borderRadius:"50%", animation:"pulse 2s infinite" }} />
            {t.hero_badge}
          </div>

          <h1 style={{ fontSize:"clamp(38px,7vw,72px)", fontWeight:900, lineHeight:1.05, letterSpacing:"-2.5px", color: dark?"#fff":text, margin:"0 0 24px", opacity: heroIn?1:0, transform: heroIn?"translateY(0)":"translateY(30px)", transition:"all 0.8s ease 0.1s" }}>
            {t.hero_title}<br />
            <span style={{ background:"linear-gradient(135deg,#f59e0b,#ef4444,#a855f7)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              avec DHA
            </span>
          </h1>

          <p style={{ fontSize:"clamp(15px,2.5vw,18px)", color:"#94a3b8", lineHeight:1.8, maxWidth:520, margin:"0 auto 40px", opacity: heroIn?1:0, transform: heroIn?"translateY(0)":"translateY(30px)", transition:"all 0.8s ease 0.2s" }}>
            {t.hero_sub}
          </p>

          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap", opacity: heroIn?1:0, transition:"all 0.8s ease 0.3s" }}>
            <button onClick={() => setModal("graphic")} style={{ background:"linear-gradient(135deg,#f59e0b,#ef4444)", color:"#fff", border:"none", padding:"14px 32px", borderRadius:50, fontSize:16, fontWeight:700, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 8px 30px rgba(245,158,11,0.3)" }}>{t.cta_graphic}</button>
            <button onClick={() => setModal("video")} style={{ background:"linear-gradient(135deg,#a855f7,#7c3aed)", color:"#fff", border:"none", padding:"14px 32px", borderRadius:50, fontSize:16, fontWeight:700, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 8px 30px rgba(168,85,247,0.3)" }}>{t.cta_video}</button>
          </div>

          {/* Stats */}
          <div style={{ display:"flex", gap:40, justifyContent:"center", flexWrap:"wrap", marginTop:56, opacity: heroIn?1:0, transition:"all 0.8s ease 0.4s" }}>
            {[["50+","Projets livrés"],["30+","Clients satisfaits"],["3","Ans d'expérience"]].map(([v,l]) => (
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontSize:28, fontWeight:900, color:"#f59e0b", letterSpacing:"-1px" }}>{v}</div>
                <div style={{ fontSize:12, color:"#64748b", marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section ref={portRef} style={{ padding:"100px 24px", background: dark ? "linear-gradient(180deg,#050810,#07101f)" : "#f1f5f9" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48, opacity: portIn?1:0, transform: portIn?"translateY(0)":"translateY(30px)", transition:"all 0.7s" }}>
            <div style={labelStyle("#f59e0b")}>{t.portfolio_title}</div>
            <h2 style={h2Style(dark)}>{t.portfolio_title}</h2>
            <p style={{ fontSize:16, color:"#64748b" }}>{t.portfolio_sub}</p>
          </div>

          {/* Filters */}
          <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap", marginBottom:40 }}>
            {[["all",t.all],["logos",t.logos],["affiches",t.affiches],["videos",t.videos]].map(([key,label]) => (
              <button key={key} onClick={() => setFilter(key)} style={{ background: filter===key ? "linear-gradient(135deg,#f59e0b,#ef4444)" : (dark ? "rgba(255,255,255,0.05)" : "#fff"), color: filter===key ? "#fff" : (dark ? "#94a3b8" : "#64748b"), border: filter===key ? "none" : `1px solid ${cardBorder}`, padding:"8px 20px", borderRadius:50, fontSize:13, fontWeight: filter===key ? 700 : 400, cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s" }}>{label}</button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:20 }}>
            {filtered.map((p, i) => (
              <div key={i} className="card" style={{ borderRadius:16, overflow:"hidden", background: cardBg, border:`1px solid ${cardBorder}`, opacity: portIn?1:0, transform: portIn?"translateY(0)":"translateY(30px)", transition:`all 0.6s ease ${i*0.1}s` }}>
                <div style={{ position:"relative", overflow:"hidden", height:220 }}>
                  <img src={p.img} alt={p.title} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.4s ease" }} className="portfolio-img" />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,0.6),transparent)", opacity:0, transition:"opacity 0.3s" }} className="portfolio-overlay" />
                </div>
                <div style={{ padding:"16px 18px" }}>
                  <div style={{ fontSize:14, fontWeight:700, color: dark?"#fff":text, marginBottom:6 }}>{p.title}</div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {p.tags.map(tag => (
                      <span key={tag} style={{ fontSize:11, background:"rgba(245,158,11,0.1)", color:"#f59e0b", border:"1px solid rgba(245,158,11,0.2)", borderRadius:20, padding:"2px 8px" }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section ref={servRef} style={{ padding:"100px 24px", background: bg }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:64, opacity: servIn?1:0, transform: servIn?"translateY(0)":"translateY(30px)", transition:"all 0.7s" }}>
            <div style={labelStyle("#f59e0b")}>{t.services_title}</div>
            <h2 style={h2Style(dark)}>{t.services_title}</h2>
            <p style={{ fontSize:16, color:"#64748b" }}>{t.services_sub}</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 }}>
            {SERVICES.map((s, i) => (
              <div key={i} className="card" style={{ background: cardBg, border:`1px solid ${cardBorder}`, borderRadius:24, padding:"32px 28px", opacity: servIn?1:0, transform: servIn?"translateY(0)":"translateY(40px)", transition:`all 0.7s ease ${i*0.15}s` }}>
                <div style={{ fontSize:40, marginBottom:16 }}>{s.icon}</div>
                <h3 style={{ fontSize:20, fontWeight:800, color: dark?"#fff":text, marginBottom:12, letterSpacing:"-0.5px" }}>{s.title}</h3>
                <p style={{ fontSize:14, color:"#64748b", lineHeight:1.8, marginBottom:20 }}>{s.desc}</p>
                <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:8 }}>
                  {s.items.map(item => (
                    <li key={item} style={{ display:"flex", alignItems:"center", gap:10, fontSize:13, color:"#94a3b8" }}>
                      <span style={{ width:18, height:18, borderRadius:"50%", background:"rgba(245,158,11,0.12)", border:"1px solid rgba(245,158,11,0.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:"#f59e0b", flexShrink:0 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section ref={procRef} style={{ padding:"100px 24px", background: dark ? "linear-gradient(180deg,#050810,#07101f)" : "#f1f5f9" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:64, opacity: procIn?1:0, transform: procIn?"translateY(0)":"translateY(30px)", transition:"all 0.7s" }}>
            <div style={labelStyle("#f59e0b")}>{t.process_title}</div>
            <h2 style={h2Style(dark)}>{t.process_title}</h2>
            <p style={{ fontSize:16, color:"#64748b" }}>{t.process_sub}</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:20 }}>
            {STEPS.map((s, i) => (
              <div key={i} className="card" style={{ background: cardBg, border:`1px solid ${cardBorder}`, borderRadius:20, padding:"28px 22px", opacity: procIn?1:0, transform: procIn?"translateY(0)":"translateY(30px)", transition:`all 0.6s ease ${i*0.1}s` }}>
                <div style={{ fontSize:42, fontWeight:900, color:"rgba(245,158,11,0.1)", letterSpacing:"-2px", marginBottom:12 }}>{s.n}</div>
                <div style={{ fontSize:28, marginBottom:12 }}>{s.icon}</div>
                <h3 style={{ fontSize:17, fontWeight:700, color: dark?"#fff":text, margin:"0 0 8px" }}>{s.title}</h3>
                <p style={{ fontSize:13, color:"#64748b", lineHeight:1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding:"100px 24px", textAlign:"center", position:"relative", overflow:"hidden", background: bg }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:600, height:300, background:"radial-gradient(ellipse,rgba(245,158,11,0.07),transparent 70%)", filter:"blur(40px)" }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <h2 style={{ fontSize:"clamp(30px,6vw,52px)", fontWeight:900, letterSpacing:"-2px", color: dark?"#fff":text, margin:"0 0 16px" }}>{t.cta_title}</h2>
          <p style={{ fontSize:16, color:"#64748b", marginBottom:36 }}>{t.cta_sub}</p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => setModal("graphic")} style={{ background:"linear-gradient(135deg,#f59e0b,#ef4444)", color:"#fff", border:"none", padding:"14px 32px", borderRadius:50, fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 8px 30px rgba(245,158,11,0.3)" }}>{t.cta_graphic}</button>
            <button onClick={() => setModal("video")} style={{ background:"linear-gradient(135deg,#a855f7,#7c3aed)", color:"#fff", border:"none", padding:"14px 32px", borderRadius:50, fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 8px 30px rgba(168,85,247,0.3)" }}>{t.cta_video}</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:`1px solid ${cardBorder}`, padding:"32px 24px", textAlign:"center" }}>
        <Link to="/" style={{ textDecoration:"none", fontSize:20, fontWeight:900 }}>
          <span style={{ color:"#f59e0b" }}>D</span><span style={{ color: dark?"#fff":text }}>HA</span>
        </Link>
        <p style={{ fontSize:13, color:"#475569", margin:"8px 0 0" }}>Digital Horizon Agency · Cotonou, Bénin · © 2025</p>
      </footer>

      {/* Bouton flottant WhatsApp */}
      <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" style={{ position:"fixed", bottom:28, right:28, zIndex:999, width:56, height:56, borderRadius:"50%", background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 8px 30px rgba(37,211,102,0.5)", textDecoration:"none" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      {/* Modal */}
      {modal && <BriefModal type={modal} onClose={() => setModal(null)} lang={lang} />}
    </div>
  );
}

const navLink = (dark) => ({ textDecoration:"none", color: dark?"#94a3b8":"#64748b", fontSize:14, padding:"8px 14px", borderRadius:8, fontWeight:400 });
const labelStyle = (color) => ({ display:"inline-block", background:`${color}10`, border:`1px solid ${color}30`, borderRadius:50, padding:"5px 16px", fontSize:11, color, letterSpacing:"2px", textTransform:"uppercase", marginBottom:16 });
const h2Style = (dark) => ({ fontSize:"clamp(28px,5vw,46px)", fontWeight:900, letterSpacing:"-1.5px", color: dark?"#fff":"#1e293b", margin:"0 0 16px" });

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body { -webkit-font-smoothing:antialiased; }

  @keyframes pulse { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.2)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

  .card { transition:transform 0.25s ease, box-shadow 0.25s ease; }
  .card:hover { transform:translateY(-6px); box-shadow:0 24px 60px rgba(0,0,0,0.2); }
  .portfolio-img { transition:transform 0.4s ease; }
  .card:hover .portfolio-img { transform:scale(1.05); }

  .desk-nav { display:none; align-items:center; gap:4px; }
  .burger { display:block !important; }

  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-thumb { background:rgba(245,158,11,0.2); border-radius:4px; }

  input, textarea, select { transition:border-color 0.2s; }
  input:focus, textarea:focus, select:focus { border-color:rgba(245,158,11,0.4) !important; outline:none; }
  textarea { resize:vertical; }

  @media (min-width:768px) {
    .desk-nav { display:flex !important; }
    .burger { display:none !important; }
  }
`;
