import { useState, useEffect, useRef } from "react";
import { useLang } from "./LangContext";

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

const WA_NUMBER = "2290160008046";

const T = {
  fr: {
    start_btn:"Démarrer →",
    process_label:"Processus",
    process_title:"Notre Processus",
    process_sub:"Simple, rapide, efficace.",
    cta_title:"Un projet en tête ?",
    cta_sub:"Dites-nous tout — on s'occupe du reste.",
    submit_wa:"Soumettre via WhatsApp",
    next:"Suivant →", prev:"← Retour", step:"Étape", of:"sur",
    hero_badge:"Design · Vidéo · Motion",
    hero_title:"Donnez vie à vos idées",
    hero_sub:"Design graphique, montage vidéo et motion design pensés pour le marché africain.",
    cta_graphic:"🎨 Brief Graphique",
    cta_video:"🎬 Brief Vidéo / Motion",
    portfolio_title:"Nos Réalisations",
    portfolio_sub:"Quelques projets qui parlent pour nous.",
    filter_all:"Tous", filter_logos:"Logos", filter_affiches:"Affiches", filter_videos:"Vidéos",
    services_title:"Nos Services Créatifs",
    services_sub:"De l'idée au rendu final, on s'occupe de tout.",
    services:[
      { icon:"🎨", title:"Design Graphique", desc:"Logos, affiches, flyers, identités visuelles. Chaque visuel est pensé pour capter l'attention et convertir.", items:["Création de logo","Charte graphique","Affiches & flyers","Posts réseaux sociaux","Packaging"] },
      { icon:"🎬", title:"Montage Vidéo & Motion", desc:"Spots publicitaires, motion design, animations pour vos réseaux. Du script au rendu final.", items:["Spot app mobile/web","Motion flyer","Teaser événementiel","Intro/outro YouTube","Reels & TikTok"] },
      { icon:"✨", title:"Identité de Marque", desc:"Votre marque mérite une identité cohérente et mémorable sur tous les supports.", items:["Logo + déclinaisons","Palette couleurs","Typographies","Guide de style","Templates réseaux"] },
    ],
    steps:[
      { n:"01", icon:"💬", title:"Brief", desc:"Vous remplissez le formulaire en ligne. On comprend votre vision, vos objectifs et votre budget." },
      { n:"02", icon:"🎯", title:"Proposition", desc:"On vous envoie une proposition détaillée avec délais et tarifs sous 24h." },
      { n:"03", icon:"✏️", title:"Création", desc:"Notre équipe travaille sur votre projet. Vous suivez l'avancement et donnez vos retours." },
      { n:"04", icon:"🚀", title:"Livraison", desc:"Fichiers sources + exports finaux livrés. Révisions incluses jusqu'à votre satisfaction." },
    ],
    video_steps_titles:["Vos coordonnées","Type de projet","Détails du projet","Script & Voix","Délai & Budget"],
    graphic_steps_titles:["Vos coordonnées","Type de projet","Style & Références","Délai & Budget"],
  },
  en: {
    start_btn:"Get started →",
    process_label:"Process",
    process_title:"Our Process",
    process_sub:"Simple, fast, effective.",
    cta_title:"Have a project in mind?",
    cta_sub:"Tell us everything — we'll handle the rest.",
    submit_wa:"Submit via WhatsApp",
    next:"Next →", prev:"← Back", step:"Step", of:"of",
    hero_badge:"Design · Video · Motion",
    hero_title:"Bring your ideas to life",
    hero_sub:"Graphic design, video editing and motion design for the African market.",
    cta_graphic:"🎨 Graphic Brief",
    cta_video:"🎬 Video / Motion Brief",
    portfolio_title:"Our Work",
    portfolio_sub:"A few projects that speak for themselves.",
    filter_all:"All", filter_logos:"Logos", filter_affiches:"Posters", filter_videos:"Videos",
    services_title:"Our Creative Services",
    services_sub:"From idea to final output, we handle everything.",
    services:[
      { icon:"🎨", title:"Graphic Design", desc:"Logos, posters, flyers, visual identities. Every visual is designed to capture attention and convert.", items:["Logo creation","Brand guidelines","Posters & flyers","Social media posts","Packaging"] },
      { icon:"🎬", title:"Video & Motion Design", desc:"Ads, motion design, animations for your social media. From script to final render.", items:["App mobile/web spot","Motion flyer","Event teaser","YouTube intro/outro","Reels & TikTok"] },
      { icon:"✨", title:"Brand Identity", desc:"Your brand deserves a consistent and memorable identity across all platforms.", items:["Logo + variations","Color palette","Typography","Style guide","Social templates"] },
    ],
    steps:[
      { n:"01", icon:"💬", title:"Brief", desc:"You fill out the online form. We understand your vision, objectives and budget." },
      { n:"02", icon:"🎯", title:"Proposal", desc:"We send you a detailed proposal with timelines and pricing within 24h." },
      { n:"03", icon:"✏️", title:"Creation", desc:"Our team works on your project. You follow progress and give feedback." },
      { n:"04", icon:"🚀", title:"Delivery", desc:"Source files + final exports delivered. Revisions included until you're satisfied." },
    ],
    video_steps_titles:["Your details","Project type","Project details","Script & Voice","Deadline & Budget"],
    graphic_steps_titles:["Your details","Project type","Style & References","Deadline & Budget"],
  },
};

const PORTFOLIO = [
  { cat:"logos",    title:"Logo Tech Startup",   img:"https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80", tags:["Branding","Logo"] },
  { cat:"logos",    title:"Identité Restaurant", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", tags:["Logo","Identité"] },
  { cat:"affiches", title:"Affiche Événement",   img:"https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80", tags:["Affiche","Event"] },
  { cat:"affiches", title:"Flyer Promotionnel",  img:"https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=600&q=80", tags:["Flyer","Print"] },
  { cat:"videos",   title:"Motion Design App",   img:"https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=600&q=80", tags:["Motion","App"] },
  { cat:"videos",   title:"Spot Publicitaire",   img:"https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80", tags:["Vidéo","Pub"] },
];

const VIDEO_STEPS = [
  { fields:[
    { id:"nom", label:"Nom & Prénom *", type:"text", placeholder:"Jean Dupont" },
    { id:"email", label:"Email *", type:"email", placeholder:"jean@exemple.com" },
    { id:"tel", label:"WhatsApp *", type:"tel", placeholder:"+229 XX XX XX XX" },
    { id:"entreprise", label:"Entreprise", type:"text", placeholder:"Nom de votre entreprise" },
  ]},
  { tiles:[
    { id:"app_mobile", icon:"📱", title:"Spot · App Mobile",   desc:"Promo application iOS/Android" },
    { id:"app_web",    icon:"💻", title:"Spot · App Web",      desc:"Présentation plateforme web" },
    { id:"saas",       icon:"⚙️", title:"Spot · SAAS",         desc:"Explication logiciel B2B" },
    { id:"event",      icon:"🎪", title:"Spot Événementiel",   desc:"Teaser ou récap événement" },
    { id:"flyer",      icon:"📲", title:"Motion Flyer",        desc:"Affiche animée réseaux sociaux" },
    { id:"autre",      icon:"✨", title:"Autre besoin",         desc:"Précisez votre demande" },
  ]},
  { fields:[
    { id:"duree",      label:"Durée souhaitée",     type:"select", options:["Moins de 30 secondes","30 à 60 secondes","1 à 2 minutes","Plus de 2 minutes"] },
    { id:"style",      label:"Style visuel",        type:"select", options:["Moderne & épuré","Dynamique & coloré","Professionnel & corporate","Créatif & artistique","Je fais confiance à votre équipe"] },
    { id:"references", label:"Références (liens)",  type:"textarea", placeholder:"https://..." },
    { id:"details",    label:"Décrivez votre projet", type:"textarea", placeholder:"Votre produit, votre cible, vos objectifs..." },
  ]},
  { fields:[
    { id:"script",      label:"Avez-vous un script ?",  type:"select", options:["Oui, j'ai un script prêt","Non, j'ai besoin que vous le rédigiez","J'ai une ébauche à affiner"] },
    { id:"voix",        label:"Voix off souhaitée",     type:"select", options:["Voix masculine","Voix féminine","Pas de voix off","À discuter"] },
    { id:"langue_voix", label:"Langue de la voix",      type:"select", options:["Français","Anglais","Fon","Yoruba","Autre"] },
    { id:"musique",     label:"Musique de fond",        type:"select", options:["Oui, proposez-en une","Oui, j'en fournis une","Non, pas de musique"] },
  ]},
  { fields:[
    { id:"delai",     label:"Délai souhaité",         type:"select", options:["Urgent (< 3 jours)","1 semaine","2 semaines","1 mois ou plus","Flexible"] },
    { id:"budget",    label:"Budget estimé (FCFA)",   type:"select", options:["Moins de 50 000","50 000 – 100 000","100 000 – 200 000","200 000 – 500 000","Plus de 500 000","À discuter"] },
    { id:"infos_sup", label:"Informations supplémentaires", type:"textarea", placeholder:"Tout ce qui pourrait nous aider..." },
  ]},
];

const GRAPHIC_STEPS = [
  { fields:[
    { id:"nom", label:"Nom & Prénom *", type:"text", placeholder:"Jean Dupont" },
    { id:"email", label:"Email *", type:"email", placeholder:"jean@exemple.com" },
    { id:"tel", label:"WhatsApp *", type:"tel", placeholder:"+229 XX XX XX XX" },
    { id:"entreprise", label:"Entreprise", type:"text", placeholder:"Nom de votre entreprise" },
  ]},
  { tiles:[
    { id:"logo",      icon:"✏️", title:"Création de Logo",      desc:"Logo + déclinaisons" },
    { id:"identite",  icon:"🎨", title:"Identité Visuelle",     desc:"Charte graphique complète" },
    { id:"affiche",   icon:"🖼️", title:"Affiche / Flyer",       desc:"Print ou digital" },
    { id:"post",      icon:"📱", title:"Posts Réseaux Sociaux", desc:"Facebook, Instagram, TikTok" },
    { id:"packaging", icon:"📦", title:"Packaging",             desc:"Emballage produit" },
    { id:"autre",     icon:"✨", title:"Autre besoin",           desc:"Précisez votre demande" },
  ]},
  { fields:[
    { id:"style",       label:"Style souhaité",          type:"select",   options:["Moderne & minimaliste","Coloré & dynamique","Traditionnel & élégant","Ludique & créatif","Corporate & professionnel","Je fais confiance à votre équipe"] },
    { id:"couleurs",    label:"Couleurs préférées",      type:"text",     placeholder:"Ex: bleu marine, or, blanc..." },
    { id:"references",  label:"Références visuelles",    type:"textarea", placeholder:"Sites, logos, affiches que vous aimez..." },
    { id:"concurrents", label:"Concurrents du secteur",  type:"text",     placeholder:"Pour éviter les ressemblances" },
  ]},
  { fields:[
    { id:"fichiers",  label:"Éléments existants ?",  type:"select",   options:["Non, je pars de zéro","Oui, j'ai un ancien logo","Oui, j'enverrai les fichiers sur WhatsApp"] },
    { id:"delai",     label:"Délai souhaité",         type:"select",   options:["Urgent (< 3 jours)","1 semaine","2 semaines","1 mois ou plus","Flexible"] },
    { id:"budget",    label:"Budget estimé (FCFA)",   type:"select",   options:["Moins de 25 000","25 000 – 50 000","50 000 – 100 000","100 000 – 200 000","Plus de 200 000","À discuter"] },
    { id:"infos_sup", label:"Décrivez votre projet",  type:"textarea", placeholder:"Votre activité, votre cible, vos attentes..." },
  ]},
];

function BriefModal({ type, onClose, lang }) {
  const t = T[lang] || T.fr;
  const steps = type === "video" ? VIDEO_STEPS : GRAPHIC_STEPS;
  const stepTitles = type === "video" ? t.video_steps_titles : t.graphic_steps_titles;
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [tile, setTile] = useState("");
  const update = (id, val) => setData(p => ({ ...p, [id]: val }));
  const accent = type === "video" ? "#a855f7" : "#f59e0b";

  const buildWAMessage = () => {
    const typeLabel = type === "video" ? "Vidéo/Motion" : "Design Graphique";
    let msg = `🎨 *Brief ${typeLabel} — DHA*\n\n`;
    if (tile) msg += `*Type :* ${tile}\n\n`;
    Object.entries(data).forEach(([k, v]) => { if (v) msg += `*${k}* : ${v}\n`; });
    return encodeURIComponent(msg);
  };

  const progress = ((step + 1) / steps.length) * 100;
  const current = steps[step];

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(3,7,18,0.85)", backdropFilter:"blur(12px)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background:"#0d1117", border:`1px solid ${accent}25`, borderRadius:24, width:"100%", maxWidth:560, maxHeight:"90vh", overflowY:"auto", boxShadow:"0 20px 80px rgba(0,0,0,0.6)" }}>
        <div style={{ padding:"24px 24px 0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:11, color:accent, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:4 }}>{type==="video" ? "🎬 Brief Vidéo / Motion" : "🎨 Brief Design Graphique"}</div>
            <div style={{ fontSize:18, fontWeight:800, color:"#fff", letterSpacing:"-0.5px" }}>{stepTitles[step]}</div>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.05)", border:"none", color:"#94a3b8", fontSize:18, cursor:"pointer", borderRadius:"50%", width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        </div>
        <div style={{ padding:"14px 24px 0" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
            <span style={{ fontSize:11, color:"#64748b" }}>{t.step} {step+1} {t.of} {steps.length}</span>
            <span style={{ fontSize:11, color:accent, fontWeight:700 }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ height:4, background:"rgba(255,255,255,0.06)", borderRadius:4 }}>
            <div style={{ height:"100%", width:`${progress}%`, background:`linear-gradient(90deg,${accent},${accent}AA)`, borderRadius:4, transition:"width 0.4s ease" }} />
          </div>
        </div>
        <div style={{ padding:"20px 24px 24px" }}>
          {current.tiles && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12 }}>
              {current.tiles.map(ti => (
                <button key={ti.id} onClick={() => { setTile(ti.title); update("type_projet", ti.title); }} style={{ background: tile===ti.title ? `${accent}15` : "rgba(255,255,255,0.02)", border:`1px solid ${tile===ti.title ? accent : "rgba(255,255,255,0.06)"}`, borderRadius:14, padding:"14px 12px", cursor:"pointer", textAlign:"left", fontFamily:"inherit", transition:"all 0.25s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                  <div style={{ fontSize:24, marginBottom:6 }}>{ti.icon}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:"#fff", marginBottom:3 }}>{ti.title}</div>
                  <div style={{ fontSize:11, color:"#64748b" }}>{ti.desc}</div>
                </button>
              ))}
            </div>
          )}
          {current.fields && (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {current.fields.map(f => (
                <div key={f.id}>
                  <label style={{ display:"block", fontSize:13, color:"#94a3b8", marginBottom:6, fontWeight:500 }}>{f.label}</label>
                  {f.type==="textarea" ? (
                    <textarea value={data[f.id]||""} onChange={e=>update(f.id,e.target.value)} placeholder={f.placeholder} rows={3} style={{ width:"100%", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, padding:"10px 14px", fontSize:13, color:"#e2e8f0", outline:"none", fontFamily:"inherit", resize:"vertical", boxSizing:"border-box" }} />
                  ) : f.type==="select" ? (
                    <select value={data[f.id]||""} onChange={e=>update(f.id,e.target.value)} style={{ width:"100%", background:"#111622", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, padding:"12px 14px", fontSize:13, color: data[f.id]?"#e2e8f0":"#64748b", outline:"none", fontFamily:"inherit", cursor:"pointer" }}>
                      <option value="">Choisissez...</option>
                      {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type={f.type} value={data[f.id]||""} onChange={e=>update(f.id,e.target.value)} placeholder={f.placeholder} style={{ width:"100%", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, padding:"10px 14px", fontSize:13, color:"#e2e8f0", outline:"none", fontFamily:"inherit", boxSizing:"border-box" }} />
                  )}
                </div>
              ))}
            </div>
          )}
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:24, gap:12 }}>
            {step > 0 ? (
              <button onClick={() => setStep(p=>p-1)} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", color:"#94a3b8", padding:"11px 20px", borderRadius:12, fontSize:14, cursor:"pointer", fontFamily:"inherit" }}>{t.prev}</button>
            ) : <div />}
            {step < steps.length-1 ? (
              <button onClick={() => setStep(p=>p+1)} style={{ background:`linear-gradient(135deg,${accent},${accent}AA)`, color:"#030712", border:"none", padding:"11px 24px", borderRadius:12, fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit" }}>{t.next}</button>
            ) : (
              <button onClick={() => { window.open(`https://wa.me/${WA_NUMBER}?text=${buildWAMessage()}`, "_blank"); onClose(); }} style={{ background:"linear-gradient(135deg,#25D366,#128C7E)", color:"#fff", border:"none", padding:"11px 24px", borderRadius:12, fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:8 }}>
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

export default function Creative() {
  const { lang } = useLang();
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const [portRef, portIn] = useInView(0.1);
  const [servRef, servIn] = useInView(0.1);
  const [procRef, procIn] = useInView(0.1);
  const t = T[lang] || T.fr;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filtered = filter === "all" ? PORTFOLIO : PORTFOLIO.filter(p => p.cat === filter);

  return (
    <div style={{ fontFamily:"'Outfit',sans-serif", background:"#030712", color:"#e2e8f0", overflowX:"hidden" }}>
      <style>{CSS}</style>

      {/* HERO */}
      <section style={{ minHeight:"100svh", display:"flex", alignItems:"center", justifyContent:"center", padding:"110px 24px 60px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 60% at 50% 0%,rgba(245,158,11,0.06) 0%,transparent 70%)" }} />
        <div style={{ position:"absolute", top:"20%", right:"5%", width:400, height:400, background:"radial-gradient(circle,rgba(168,85,247,0.05),transparent 70%)", filter:"blur(60px)", borderRadius:"50%" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(245,158,11,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.015) 1px,transparent 1px)", backgroundSize:"64px 64px" }} />
        <div style={{ position:"relative", zIndex:1, textAlign:"center", maxWidth:760 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(245,158,11,0.05)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:50, padding:"7px 18px", fontSize:12, color:"#f59e0b", marginBottom:32, fontWeight:600 }}>
            <span style={{ width:7, height:7, background:"#f59e0b", borderRadius:"50%", animation:"pulse 2s infinite" }} />
            {t.hero_badge}
          </div>
          <h1 style={{ fontSize:"clamp(38px,7vw,72px)", fontWeight:900, lineHeight:1.05, letterSpacing:"-0.03em", color:"#fff", margin:"0 0 24px" }}>
            {t.hero_title}<br />
            <span style={{ background:"linear-gradient(135deg,#f59e0b,#ef4444,#a855f7)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>avec DHA</span>
          </h1>
          <p style={{ fontSize:"clamp(15px,2.5vw,18px)", color:"#94a3b8", lineHeight:1.8, maxWidth:520, margin:"0 auto 40px" }}>{t.hero_sub}</p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => setModal("graphic")} style={{ background:"linear-gradient(135deg,#f59e0b,#ef4444)", color:"#030712", border:"none", padding:"14px 32px", borderRadius:50, fontSize:16, fontWeight:800, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 8px 30px rgba(245,158,11,0.3)" }} className="primary-creative-cta">{t.cta_graphic}</button>
            <button onClick={() => setModal("video")} style={{ background:"linear-gradient(135deg,#a855f7,#7c3aed)", color:"#fff", border:"none", padding:"14px 32px", borderRadius:50, fontSize:16, fontWeight:800, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 8px 30px rgba(168,85,247,0.3)" }} className="secondary-creative-cta">{t.cta_video}</button>
          </div>
          <div style={{ display:"flex", gap:40, justifyContent:"center", flexWrap:"wrap", marginTop:56 }}>
            {[["50+",lang==="en"?"Projects delivered":"Projets livrés"],["30+",lang==="en"?"Happy clients":"Clients satisfaits"],["3",lang==="en"?"Years experience":"Ans d'expérience"]].map(([v,l]) => (
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontSize:28, fontWeight:900, color:"#f59e0b", letterSpacing:"-1px" }}>{v}</div>
                <div style={{ fontSize:12, color:"#64748b", marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section ref={portRef} style={{ padding:"100px 24px", background:"linear-gradient(180deg,#030712,#050917)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48, opacity:portIn?1:0, transform:portIn?"none":"translateY(30px)", transition:"all 0.7s" }}>
            <div style={label("#f59e0b")}>{t.portfolio_title}</div>
            <h2 style={h2}>{t.portfolio_title}</h2>
            <p style={sub}>{t.portfolio_sub}</p>
          </div>
          <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap", marginBottom:40 }}>
            {[["all",t.filter_all],["logos",t.filter_logos],["affiches",t.filter_affiches],["videos",t.filter_videos]].map(([key,lbl]) => (
              <button key={key} onClick={() => setFilter(key)} style={{ background: filter===key ? "linear-gradient(135deg,#f59e0b,#ef4444)" : "rgba(255,255,255,0.04)", color: filter===key ? "#030712" : "#94a3b8", border: filter===key ? "none" : "1px solid rgba(255,255,255,0.06)", padding:"8px 20px", borderRadius:50, fontSize:13, fontWeight: filter===key ? 800 : 400, cursor:"pointer", fontFamily:"inherit", transition:"all 0.25s cubic-bezier(0.16, 1, 0.3, 1)" }} className="filter-tab-btn">{lbl}</button>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:20 }}>
            {filtered.map((p, i) => (
              <div key={i} className="card" style={{ borderRadius:16, overflow:"hidden", background:"rgba(255,255,255,0.015)", border:"1px solid rgba(255,255,255,0.05)", opacity:portIn?1:0, transform:portIn?"none":"translateY(30px)", transition:`all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i*0.1}s`, backdropFilter:"blur(8px)" }}>
                <div style={{ height:220, overflow:"hidden" }}>
                  <img src={p.img} alt={p.title} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.4s ease" }} className="portfolio-img" />
                </div>
                <div style={{ padding:"16px 18px" }}>
                  <div style={{ fontSize:14, fontWeight:700, color:"#fff", marginBottom:6 }}>{p.title}</div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {p.tags.map(tag => <span key={tag} style={{ fontSize:11, background:"rgba(245,158,11,0.08)", color:"#f59e0b", border:"1px solid rgba(245,158,11,0.18)", borderRadius:20, padding:"2px 8px" }}>{tag}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section ref={servRef} style={{ padding:"100px 24px", background:"#030712" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:64, opacity:servIn?1:0, transform:servIn?"none":"translateY(30px)", transition:"all 0.7s" }}>
            <div style={label("#f59e0b")}>{t.services_title}</div>
            <h2 style={h2}>{t.services_title}</h2>
            <p style={sub}>{t.services_sub}</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 }}>
            {t.services.map((s, i) => (
              <div key={i} className="card" style={{ background:"rgba(255,255,255,0.015)", border:"1px solid rgba(255,255,255,0.05)", borderRadius:24, padding:"32px 28px", opacity:servIn?1:0, transform:servIn?"none":"translateY(40px)", transition:`all 0.7s ease ${i*0.15}s`, backdropFilter:"blur(8px)" }}>
                <div style={{ fontSize:40, marginBottom:16 }}>{s.icon}</div>
                <h3 style={{ fontSize:20, fontWeight:800, color:"#fff", marginBottom:12 }}>{s.title}</h3>
                <p style={{ fontSize:14, color:"#64748b", lineHeight:1.8, marginBottom:20 }}>{s.desc}</p>
                <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:10 }}>
                  {s.items.map(item => (
                    <li key={item} style={{ display:"flex", alignItems:"center", gap:10, fontSize:13, color:"#94a3b8" }}>
                      <span style={{ width:18, height:18, borderRadius:"50%", background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:"#f59e0b", flexShrink:0 }}>✓</span>
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
      <section ref={procRef} style={{ padding:"100px 24px", background:"linear-gradient(180deg,#030712,#050917)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:64, opacity:procIn?1:0, transform:procIn?"none":"translateY(30px)", transition:"all 0.7s" }}>
            <div style={label("#f59e0b")}>{t.process_title}</div>
            <h2 style={h2}>{t.process_title}</h2>
            <p style={sub}>{t.process_sub}</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:20 }}>
            {t.steps.map((s, i) => (
              <div key={i} className="card" style={{ background:"rgba(255,255,255,0.015)", border:"1px solid rgba(255,255,255,0.05)", borderRadius:20, padding:"28px 22px", opacity:procIn?1:0, transform:procIn?"none":"translateY(30px)", transition:`all 0.6s ease ${i*0.1}s`, backdropFilter:"blur(8px)" }}>
                <div style={{ fontSize:42, fontWeight:900, color:"rgba(245,158,11,0.06)", letterSpacing:"-2px", marginBottom:12 }}>{s.n}</div>
                <div style={{ fontSize:28, marginBottom:12 }}>{s.icon}</div>
                <h3 style={{ fontSize:17, fontWeight:700, color:"#fff", margin:"0 0 8px" }}>{s.title}</h3>
                <p style={{ fontSize:13, color:"#64748b", lineHeight:1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding:"100px 24px", textAlign:"center", position:"relative", overflow:"hidden", background:"#030712" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:600, height:300, background:"radial-gradient(ellipse,rgba(245,158,11,0.06),transparent 70%)", filter:"blur(40px)" }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <h2 style={{ fontSize:"clamp(30px,6vw,52px)", fontWeight:900, letterSpacing:"-2px", color:"#fff", margin:"0 0 16px" }}>{t.cta_title}</h2>
          <p style={{ fontSize:16, color:"#64748b", marginBottom:36 }}>{t.cta_sub}</p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => setModal("graphic")} style={{ background:"linear-gradient(135deg,#f59e0b,#ef4444)", color:"#030712", border:"none", padding:"14px 32px", borderRadius:50, fontSize:15, fontWeight:800, cursor:"pointer", fontFamily:"inherit" }} className="primary-creative-cta">{t.cta_graphic}</button>
            <button onClick={() => setModal("video")} style={{ background:"linear-gradient(135deg,#a855f7,#7c3aed)", color:"#fff", border:"none", padding:"14px 32px", borderRadius:50, fontSize:15, fontWeight:800, cursor:"pointer", fontFamily:"inherit" }} className="secondary-creative-cta">{t.cta_video}</button>
          </div>
        </div>
      </section>

      {modal && <BriefModal type={modal} onClose={() => setModal(null)} lang={lang} />}
    </div>
  );
}

const label = (color) => ({ display:"inline-block", background:`${color}10`, border:`1px solid ${color}30`, borderRadius:50, padding:"5px 16px", fontSize:11, color, letterSpacing:"2px", textTransform:"uppercase", marginBottom:16, fontWeight:700 });
const h2 = { fontSize:"clamp(28px,5vw,46px)", fontWeight:900, letterSpacing:"-1.5px", color:"#fff", margin:"0 0 16px" };
const sub = { fontSize:16, color:"#64748b", maxWidth:500, margin:"0 auto" };

const CSS = `
  @keyframes pulse  { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.2)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  
  .card { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s, background-color 0.4s, box-shadow 0.4s !important; }
  .card:hover { 
    transform: translateY(-6px); 
    border-color: rgba(245,158,11,0.2) !important;
    background: rgba(255,255,255,0.02) !important;
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  }
  .portfolio-img { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
  .card:hover .portfolio-img { transform: scale(1.04); }
  
  input:focus, textarea:focus, select:focus { border-color: rgba(245,158,11,0.3) !important; outline:none; background: rgba(255,255,255,0.06) !important;}
  textarea { resize:vertical; }
  button:hover { opacity:.88; }
  a:hover { opacity:.88; }

  .primary-creative-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(245,158,11,0.35) !important;
  }
  .secondary-creative-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(168,85,247,0.35) !important;
  }
  .filter-tab-btn {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }
  .filter-tab-btn:hover {
    background: rgba(255,255,255,0.06) !important;
    border-color: rgba(255,255,255,0.12) !important;
  }
`;
