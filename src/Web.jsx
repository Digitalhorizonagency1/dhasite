import { useState, useEffect, useRef } from "react";
import {
  MonitorIcon, ShoppingCartIcon, GearSixIcon, DeviceMobileIcon,
  CheckIcon, ArrowRightIcon, XIcon, WhatsappLogoIcon,
  ClipboardTextIcon, PaintBrushIcon, CodeIcon, RocketLaunchIcon,
} from "@phosphor-icons/react";
import { useLang } from "./LangContext";
import { usePageMeta } from "./usePageMeta";

const WA_NUMBER = "2290160008046";

const T = {
  fr: {
    nav_ia:"IA", nav_creative:"Créatif", nav_web:"Web",
    nav_start:"Démarrer",
    hero_badge:"Sites · Apps · E-commerce",
    hero_title:"Votre présence digitale,",
    hero_title2:"pensée pour convertir",
    hero_sub:"Création de sites vitrine, e-commerce et applications web sur mesure pour les entreprises africaines.",
    cta_start:"Démarrer mon projet",
    portfolio_title:"Nos Réalisations Web",
    portfolio_sub:"Des projets livrés, des clients satisfaits.",
    services_title:"Nos Services Web",
    services_sub:"Du site vitrine à l'application complexe.",
    process_title:"Comment on travaille",
    process_sub:"Un processus clair, du brief à la mise en ligne.",
    cta_title:"Votre projet mérite le meilleur.",
    cta_sub:"Dites-nous ce que vous voulez construire.",
    submit_wa:"Soumettre via WhatsApp",
    next:"Suivant →", prev:"← Retour", step:"Étape", of:"sur",
    devis:"Devis gratuit sous 24h",
    no_commit:"Sans engagement",
    support:"Support inclus",
    most_popular:"Le plus populaire",
    services:[
      { Icon:MonitorIcon, title:"Site Vitrine", desc:"Votre carte de visite en ligne. Design soigné, rapide, optimisé mobile et SEO.", price:"Dès 150 000 FCFA", items:["Design sur mesure","Responsive mobile","SEO de base","Formulaire de contact","Livraison en 7 jours"] },
      { Icon:ShoppingCartIcon, title:"E-commerce", desc:"Vendez en ligne 24h/24. Catalogue produits, paiements sécurisés, gestion des commandes.", price:"Dès 300 000 FCFA", items:["Catalogue produits","Paiement Mobile Money","Gestion des commandes","Tableau de bord admin","Notifications SMS/Email"] },
      { Icon:GearSixIcon, title:"Application Web", desc:"Des outils métier sur mesure pour automatiser vos processus et gagner en efficacité.", price:"Sur devis", items:["Authentification utilisateurs","Base de données","API & intégrations","Tableau de bord","Maintenance incluse"] },
      { Icon:DeviceMobileIcon, title:"Landing Page", desc:"Une page ultra-optimisée pour convertir vos visiteurs en clients ou abonnés.", price:"Dès 75 000 FCFA", items:["Design percutant","CTA optimisés","Formulaire de capture","Intégration WhatsApp","Livraison en 3 jours"] },
    ],
    steps:[
      { n:"01", Icon:ClipboardTextIcon, title:"Brief détaillé", desc:"Vous remplissez notre formulaire complet. On comprend votre vision, vos objectifs, votre budget." },
      { n:"02", Icon:PaintBrushIcon, title:"Maquette & Design", desc:"On vous soumet une maquette visuelle avant de coder. Vous validez le design." },
      { n:"03", Icon:CodeIcon, title:"Développement", desc:"On développe votre site/app. Vous suivez l'avancement en temps réel." },
      { n:"04", Icon:CheckIcon, title:"Tests & Validation", desc:"Tests sur tous appareils. Vous testez et donnez vos retours." },
      { n:"05", Icon:RocketLaunchIcon, title:"Mise en ligne", desc:"Déploiement, formation et support post-lancement inclus." },
    ],
    form_steps_titles:["Vos coordonnées","Type de projet","Détails du projet","Design & Contenu","Délai & Budget"],
  },
  en: {
    nav_ia:"AI", nav_creative:"Creative", nav_web:"Web",
    nav_start:"Get started",
    hero_badge:"Websites · Apps · E-commerce",
    hero_title:"Your digital presence,",
    hero_title2:"built to convert",
    hero_sub:"Custom websites, e-commerce and web applications for African businesses.",
    cta_start:"Start my project",
    portfolio_title:"Our Web Projects",
    portfolio_sub:"Delivered projects, satisfied clients.",
    services_title:"Our Web Services",
    services_sub:"From landing pages to complex applications.",
    process_title:"How we work",
    process_sub:"A clear process, from brief to launch.",
    cta_title:"Your project deserves the best.",
    cta_sub:"Tell us what you want to build.",
    submit_wa:"Submit via WhatsApp",
    next:"Next →", prev:"← Back", step:"Step", of:"of",
    devis:"Free quote within 24h",
    no_commit:"No commitment",
    support:"Support included",
    most_popular:"Most popular",
    services:[
      { Icon:MonitorIcon, title:"Website", desc:"Your online business card. Clean design, fast, mobile optimized and SEO.", price:"From 150,000 FCFA", items:["Custom design","Mobile responsive","Basic SEO","Contact form","Delivered in 7 days"] },
      { Icon:ShoppingCartIcon, title:"E-commerce", desc:"Sell online 24/7. Product catalog, secure payments, order management.", price:"From 300,000 FCFA", items:["Product catalog","Mobile Money payment","Order management","Admin dashboard","SMS/Email notifications"] },
      { Icon:GearSixIcon, title:"Web Application", desc:"Custom business tools to automate your processes and gain efficiency.", price:"Custom quote", items:["User authentication","Database","API & integrations","Dashboard","Maintenance included"] },
      { Icon:DeviceMobileIcon, title:"Landing Page", desc:"An ultra-optimized page to convert visitors into clients or subscribers.", price:"From 75,000 FCFA", items:["Impactful design","Optimized CTAs","Capture form","WhatsApp integration","Delivered in 3 days"] },
    ],
    steps:[
      { n:"01", Icon:ClipboardTextIcon, title:"Detailed brief", desc:"You fill out our complete form. We understand your vision, objectives and budget." },
      { n:"02", Icon:PaintBrushIcon, title:"Mockup & Design", desc:"We submit a visual mockup before coding. You validate the design." },
      { n:"03", Icon:CodeIcon, title:"Development", desc:"We develop your site/app. You follow progress in real time." },
      { n:"04", Icon:CheckIcon, title:"Tests & Validation", desc:"Tests on all devices. You test and give feedback." },
      { n:"05", Icon:RocketLaunchIcon, title:"Go Live", desc:"Deployment, training and post-launch support included." },
    ],
    form_steps_titles:["Your details","Project type","Project details","Design & Content","Deadline & Budget"],
  },
};

const WEB_PORTFOLIO = [
  { title:"Site Vitrine Restaurant",  img:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80", tags:["Site Vitrine","Restaurant"], color:"#06B6D4" },
  { title:"E-commerce Mode",          img:"https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80", tags:["E-commerce","Mode"],       color:"#8B5CF6" },
  { title:"App Web Dashboard",        img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", tags:["App Web","Dashboard"],      color:"#22D97A" },
  { title:"Landing Page Startup",     img:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80", tags:["Landing Page","Startup"], color:"#6366F1" },
  { title:"Site Immobilier",          img:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80", tags:["Immobilier","Vitrine"],     color:"#F5A623" },
];

const WEB_FORM_STEPS = [
  { fields:[
    { id:"nom",        label:"Nom & Prénom *",        type:"text",  placeholder:"Jean Dupont" },
    { id:"email",      label:"Email *",               type:"email", placeholder:"jean@exemple.com" },
    { id:"tel",        label:"WhatsApp *",            type:"tel",   placeholder:"+229 XX XX XX XX" },
    { id:"entreprise", label:"Entreprise",            type:"text",  placeholder:"Nom de votre entreprise" },
  ]},
  { tiles:[
    { id:"vitrine",   Icon:MonitorIcon,      title:"Site Vitrine",    desc:"Présentation de votre activité" },
    { id:"ecommerce", Icon:ShoppingCartIcon, title:"E-commerce",       desc:"Vente en ligne de produits" },
    { id:"app_web",   Icon:GearSixIcon,      title:"Application Web",  desc:"Outil métier sur mesure" },
    { id:"landing",   Icon:DeviceMobileIcon, title:"Landing Page",     desc:"Page de conversion optimisée" },
    { id:"blog",      Icon:ClipboardTextIcon,title:"Blog / Magazine",  desc:"Contenu & actualités" },
    { id:"autre",     Icon:CodeIcon,         title:"Autre projet",      desc:"Précisez votre besoin" },
  ]},
  { fields:[
    { id:"description", label:"Décrivez votre projet *",        type:"textarea", placeholder:"Votre activité, vos objectifs, ce que vous voulez que les visiteurs fassent..." },
    { id:"pages",       label:"Nombre de pages estimé",         type:"select",   options:["1 page (landing)","3 à 5 pages","5 à 10 pages","10+ pages","Je ne sais pas encore"] },
    { id:"fonctions",   label:"Fonctionnalités souhaitées",     type:"textarea", placeholder:"Ex: formulaire de contact, espace membre, blog, paiement en ligne..." },
    { id:"inspiration", label:"Site(s) qui vous inspirent",     type:"textarea", placeholder:"https://exemple.com — Ce que vous aimez dans ce site..." },
  ]},
  { fields:[
    { id:"style",    label:"Style visuel souhaité",        type:"select",  options:["Moderne & épuré","Coloré & dynamique","Corporate & professionnel","Créatif & original","Je fais confiance à votre équipe"] },
    { id:"couleurs", label:"Couleurs de votre marque",     type:"text",    placeholder:"Ex: bleu marine, or, blanc..." },
    { id:"logo",     label:"Avez-vous un logo ?",          type:"select",  options:["Oui, je l'enverrai sur WhatsApp","Non, j'ai besoin d'un logo aussi","En cours de création"] },
    { id:"contenu",  label:"Le contenu (textes, photos)",  type:"select",  options:["Je fournis tout le contenu","J'ai besoin d'aide pour rédiger","J'ai les textes mais pas les images","Je n'ai rien, tout est à créer"] },
  ]},
  { fields:[
    { id:"delai",       label:"Délai souhaité",           type:"select",   options:["Urgent (< 1 semaine)","2 semaines","1 mois","2 à 3 mois","Flexible"] },
    { id:"budget",      label:"Budget estimé (FCFA)",     type:"select",   options:["Moins de 100 000","100 000 – 200 000","200 000 – 500 000","500 000 – 1 000 000","Plus de 1 000 000","À discuter"] },
    { id:"hebergement", label:"Hébergement & domaine",    type:"select",   options:["Je n'ai rien, vous vous occupez de tout","J'ai déjà un domaine","J'ai domaine + hébergement"] },
    { id:"infos_sup",   label:"Informations supplémentaires", type:"textarea", placeholder:"Tout ce qui pourrait nous aider à mieux comprendre votre projet..." },
  ]},
];

function WebBriefModal({ onClose, lang }) {
  const t = T[lang] || T.fr;
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [tile, setTile] = useState("");
  const update = (id, val) => setData(p => ({ ...p, [id]: val }));

  const buildWAMessage = () => {
    let msg = `🌐 *Brief Création Web/App — DHA*\n\n`;
    if (tile) msg += `*Type :* ${tile}\n\n`;
    Object.entries(data).forEach(([k, v]) => { if (v) msg += `*${k.replace(/_/g," ")}* : ${v}\n`; });
    return encodeURIComponent(msg);
  };

  const progress = ((step + 1) / WEB_FORM_STEPS.length) * 100;
  const current = WEB_FORM_STEPS[step];

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(15,23,42,0.35)", backdropFilter:"blur(12px)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="glass-card" style={{ background:"rgba(255,255,255,0.92)", borderRadius:24, width:"100%", maxWidth:580, maxHeight:"90vh", overflowY:"auto", boxShadow:"var(--shadow-glass-lg)" }}>
        <div style={{ padding:"24px 24px 0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:11, color:"var(--cyan)", fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:4 }}>Brief Création Web / App</div>
            <div style={{ fontSize:18, fontWeight:800, color:"var(--ink)", letterSpacing:"-0.5px" }}>{t.form_steps_titles[step]}</div>
          </div>
          <button onClick={onClose} style={{ background:"rgba(15,23,42,0.05)", border:"none", color:"var(--ink-soft)", cursor:"pointer", borderRadius:"50%", width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center" }}><XIcon size={18} /></button>
        </div>
        <div style={{ padding:"14px 24px 0" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
            <span style={{ fontSize:11, color:"var(--ink-faint)" }}>{t.step} {step+1} {t.of} {WEB_FORM_STEPS.length}</span>
            <span style={{ fontSize:11, color:"var(--cyan)", fontWeight:700 }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ height:4, background:"rgba(15,23,42,0.06)", borderRadius:4 }}>
            <div style={{ height:"100%", width:`${progress}%`, background:"var(--grad-primary)", borderRadius:4, transition:"width 0.4s ease" }} />
          </div>
        </div>
        <div style={{ padding:"20px 24px 24px" }}>
          {current.tiles && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12 }}>
              {current.tiles.map(ti => (
                <button key={ti.id} onClick={() => { setTile(ti.title); update("type_projet", ti.title); }} style={{ background: tile===ti.title ? "rgba(6,182,212,0.08)" : "rgba(255,255,255,0.5)", border:`1px solid ${tile===ti.title ? "var(--cyan)" : "var(--glass-border)"}`, borderRadius:14, padding:"14px 12px", cursor:"pointer", textAlign:"left", fontFamily:"inherit", transition:"all 0.25s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                  <div style={{ marginBottom:6 }}><ti.Icon size={22} weight="duotone" color="var(--cyan)" /></div>
                  <div style={{ fontSize:13, fontWeight:700, color:"var(--ink)", marginBottom:3 }}>{ti.title}</div>
                  <div style={{ fontSize:11, color:"var(--ink-faint)" }}>{ti.desc}</div>
                </button>
              ))}
            </div>
          )}
          {current.fields && (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {current.fields.map(f => (
                <div key={f.id}>
                  <label style={{ display:"block", fontSize:13, color:"var(--ink-soft)", marginBottom:6, fontWeight:500 }}>{f.label}</label>
                  {f.type==="textarea" ? (
                    <textarea value={data[f.id]||""} onChange={e=>update(f.id,e.target.value)} placeholder={f.placeholder} rows={3} style={{ width:"100%", background:"rgba(255,255,255,0.6)", border:"1px solid var(--glass-border)", borderRadius:12, padding:"10px 14px", fontSize:13, color:"var(--ink)", outline:"none", fontFamily:"inherit", resize:"vertical", boxSizing:"border-box" }} />
                  ) : f.type==="select" ? (
                    <select value={data[f.id]||""} onChange={e=>update(f.id,e.target.value)} style={{ width:"100%", background:"var(--surface-solid)", border:"1px solid var(--glass-border)", borderRadius:12, padding:"12px 14px", fontSize:13, color: data[f.id]?"var(--ink)":"var(--ink-faint)", outline:"none", fontFamily:"inherit", cursor:"pointer" }}>
                      <option value="">Choisissez...</option>
                      {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type={f.type} value={data[f.id]||""} onChange={e=>update(f.id,e.target.value)} placeholder={f.placeholder} style={{ width:"100%", background:"rgba(255,255,255,0.6)", border:"1px solid var(--glass-border)", borderRadius:12, padding:"10px 14px", fontSize:13, color:"var(--ink)", outline:"none", fontFamily:"inherit", boxSizing:"border-box" }} />
                  )}
                </div>
              ))}
            </div>
          )}
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:24, gap:12 }}>
            {step > 0 ? (
              <button onClick={() => setStep(p=>p-1)} style={{ background:"rgba(15,23,42,0.05)", border:"1px solid var(--glass-border)", color:"var(--ink-soft)", padding:"11px 20px", borderRadius:12, fontSize:14, cursor:"pointer", fontFamily:"inherit" }}>{t.prev}</button>
            ) : <div />}
            {step < WEB_FORM_STEPS.length-1 ? (
              <button onClick={() => setStep(p=>p+1)} style={{ background:"var(--grad-primary)", color:"#fff", border:"none", padding:"11px 24px", borderRadius:12, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>{t.next}</button>
            ) : (
              <button onClick={() => { window.open(`https://wa.me/${WA_NUMBER}?text=${buildWAMessage()}`, "_blank"); onClose(); }} style={{ background:"#25D366", color:"#fff", border:"none", padding:"11px 24px", borderRadius:12, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:8 }}>
                <WhatsappLogoIcon size={17} weight="fill" />{t.submit_wa}
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

export default function Web() {
  const { lang } = useLang();
  const [modal, setModal] = useState(false);
  const [portRef, portIn] = useInView(0.1);
  const [servRef, servIn] = useInView(0.1);
  const [procRef, procIn] = useInView(0.1);
  const t = T[lang] || T.fr;

  usePageMeta(lang === "en" ? {
    title: "Web Development — Custom Websites | Digital Horizon Agency",
    description: "DHA builds fast, modern, custom-coded websites for businesses in Benin: showcase sites, e-commerce, web apps. Cotonou-based team.",
    path: "/web",
  } : {
    title: "Développement Web — Sites sur mesure | Digital Horizon Agency",
    description: "DHA conçoit des sites web modernes, rapides et sur mesure pour les entreprises béninoises : vitrines, e-commerce, applications web. Équipe basée à Cotonou.",
    path: "/web",
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ fontFamily:"var(--font-body)", background:"var(--bg)", color:"var(--ink)", overflowX:"hidden" }}>
      <style>{CSS}</style>

      {/* HERO */}
      <section style={{ minHeight:"100svh", display:"flex", alignItems:"center", justifyContent:"center", padding:"110px 24px 60px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(15,23,42,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,0.025) 1px,transparent 1px)", backgroundSize:"64px 64px" }} />
        <div style={{ position:"absolute", top:"20%", left:"5%", width:400, height:400, background:"radial-gradient(circle,rgba(6,182,212,0.13),transparent 70%)", filter:"blur(60px)", borderRadius:"50%" }} />
        <div style={{ position:"absolute", top:"20%", right:"5%", width:400, height:400, background:"radial-gradient(circle,rgba(139,92,246,0.1),transparent 70%)", filter:"blur(60px)", borderRadius:"50%" }} />
        <div style={{ position:"relative", zIndex:1, textAlign:"center", maxWidth:760 }}>
          <div className="glass-card" style={{ display:"inline-flex", alignItems:"center", gap:8, borderRadius:50, padding:"7px 18px", fontSize:12, color:"var(--cyan)", marginBottom:32, fontWeight:600 }}>
            <span style={{ width:7, height:7, background:"var(--grad-primary)", borderRadius:"50%", animation:"pulse 2s infinite" }} />
            {t.hero_badge}
          </div>
          <h1 style={{ fontSize:"clamp(38px,7vw,72px)", fontWeight:800, lineHeight:1.05, letterSpacing:"-0.03em", color:"var(--ink)", margin:"0 0 24px" }}>
            {t.hero_title}<br />
            <span style={{ background:"var(--grad-primary)", WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent" }}>{t.hero_title2}</span>
          </h1>
          <p style={{ fontSize:"clamp(15px,2.5vw,18px)", color:"var(--ink-soft)", lineHeight:1.8, maxWidth:520, margin:"0 auto 40px" }}>{t.hero_sub}</p>
          <button onClick={() => setModal(true)} style={{ background:"var(--grad-primary)", color:"#fff", border:"none", padding:"14px 36px", borderRadius:50, fontSize:16, fontWeight:700, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 8px 30px rgba(6,182,212,0.3)", display:"inline-flex", alignItems:"center", gap:8 }} className="primary-web-cta">{t.cta_start}<ArrowRightIcon size={16} weight="bold" /></button>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:40, marginTop:56 }}>
            {[["20+",lang==="en"?"Sites delivered":"Sites livrés"],["100%","Responsive"],["72h",lang==="en"?"Landing avg":"Délai moyen landing"]].map(([v,l]) => (
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontSize:28, fontWeight:800, background:"var(--grad-primary)", WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent", letterSpacing:"-1px" }}>{v}</div>
                <div style={{ fontSize:12, color:"var(--ink-faint)", marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section ref={portRef} style={{ padding:"100px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56, opacity:portIn?1:0, transform:portIn?"none":"translateY(30px)", transition:"all 0.7s" }}>
            <div style={lbl("var(--cyan)")}>{t.portfolio_title}</div>
            <h2 style={h2}>{t.portfolio_title}</h2>
            <p style={sub}>{t.portfolio_sub}</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:20 }}>
            {WEB_PORTFOLIO.map((p, i) => (
              <div key={i} className="card glass-card" style={{ borderRadius:16, overflow:"hidden", opacity:portIn?1:0, transform:portIn?"none":"translateY(30px)", transition:`opacity 0.6s ease ${i*0.1}s, transform 0.6s ease ${i*0.1}s, box-shadow 0.4s` }}>
                <div style={{ height:200, overflow:"hidden" }}>
                  <img src={p.img} alt={p.title} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.4s ease" }} className="portfolio-img" />
                </div>
                <div style={{ padding:"16px 18px" }}>
                  <div style={{ fontSize:14, fontWeight:700, color:"var(--ink)", marginBottom:6 }}>{p.title}</div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {p.tags.map(tag => <span key={tag} style={{ fontSize:11, background:`${p.color}12`, color:p.color, border:`1px solid ${p.color}30`, borderRadius:20, padding:"2px 8px" }}>{tag}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section ref={servRef} style={{ padding:"100px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:64, opacity:servIn?1:0, transform:servIn?"none":"translateY(30px)", transition:"all 0.7s" }}>
            <div style={lbl("var(--cyan)")}>{t.services_title}</div>
            <h2 style={h2}>{t.services_title}</h2>
            <p style={sub}>{t.services_sub}</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:24 }}>
            {t.services.map((s, i) => (
              <div key={i} className="card glass-card" style={{ borderRadius:24, padding:"28px 24px", opacity:servIn?1:0, transform:servIn?"none":"translateY(40px)", transition:`opacity 0.7s ease ${i*0.12}s, transform 0.7s ease ${i*0.12}s, box-shadow 0.4s` }}>
                <div style={{ marginBottom:14, width:52, height:52, borderRadius:14, background:"rgba(6,182,212,0.08)", border:"1px solid rgba(6,182,212,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}><s.Icon size={26} weight="duotone" color="var(--cyan)" /></div>
                <h3 style={{ fontSize:18, fontWeight:800, color:"var(--ink)", marginBottom:8 }}>{s.title}</h3>
                <p style={{ fontSize:13, color:"var(--ink-soft)", lineHeight:1.8, marginBottom:14 }}>{s.desc}</p>
                <div style={{ fontSize:13, fontWeight:700, color:"var(--cyan)", marginBottom:16 }}>{s.price}</div>
                <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:10 }}>
                  {s.items.map(item => (
                    <li key={item} style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, color:"var(--ink-soft)" }}>
                      <span style={{ width:16, height:16, borderRadius:"50%", background:"rgba(6,182,212,0.1)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><CheckIcon size={9} weight="bold" color="var(--cyan)" /></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setModal(true)} style={{ width:"100%", marginTop:20, padding:"12px", borderRadius:12, border:"1px solid rgba(6,182,212,0.2)", background:"rgba(6,182,212,0.06)", color:"var(--cyan)", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit", transition:"all 0.25s" }} className="services-action-btn">{lang==="en"?"Get started":"Démarrer"}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section ref={procRef} style={{ padding:"100px 24px" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:64, opacity:procIn?1:0, transform:procIn?"none":"translateY(30px)", transition:"all 0.7s" }}>
            <div style={lbl("var(--cyan)")}>{t.process_title}</div>
            <h2 style={h2}>{t.process_title}</h2>
            <p style={sub}>{t.process_sub}</p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
            {t.steps.map((s, i) => (
              <div key={i} style={{ display:"flex", gap:20, opacity:procIn?1:0, transform:procIn?"none":"translateY(20px)", transition:`opacity 0.6s ease ${i*0.1}s, transform 0.6s ease ${i*0.1}s` }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                  <div style={{ width:44, height:44, borderRadius:"50%", background:"var(--grad-primary)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><s.Icon size={19} weight="bold" color="#fff" /></div>
                  {i < t.steps.length-1 && <div style={{ width:2, flex:1, background:"rgba(6,182,212,0.15)", margin:"4px 0", minHeight:44 }} />}
                </div>
                <div style={{ paddingBottom:32 }}>
                  <div style={{ fontSize:11, color:"var(--cyan)", fontWeight:700, letterSpacing:"1px", marginBottom:4 }}>{s.n}</div>
                  <h3 style={{ fontSize:16, fontWeight:700, color:"var(--ink)", margin:"0 0 6px" }}>{s.title}</h3>
                  <p style={{ fontSize:13, color:"var(--ink-soft)", lineHeight:1.7 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"100px 24px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:600, height:300, background:"radial-gradient(ellipse,rgba(6,182,212,0.1),transparent 70%)", filter:"blur(40px)" }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <h2 style={{ fontSize:"clamp(30px,6vw,52px)", fontWeight:800, letterSpacing:"-2px", color:"var(--ink)", margin:"0 0 16px" }}>{t.cta_title}</h2>
          <p style={{ fontSize:16, color:"var(--ink-soft)", marginBottom:36 }}>{t.cta_sub}</p>
          <button onClick={() => setModal(true)} style={{ background:"var(--grad-primary)", color:"#fff", border:"none", padding:"16px 40px", borderRadius:50, fontSize:16, fontWeight:700, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 8px 30px rgba(6,182,212,0.25)", display:"inline-flex", alignItems:"center", gap:8 }} className="primary-web-cta">{t.cta_start}<ArrowRightIcon size={16} weight="bold" /></button>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:20, marginTop:28, flexWrap:"wrap" }}>
            {[t.devis, t.no_commit, t.support].map(txt => <span key={txt} style={{ fontSize:13, color:"var(--ink-soft)", fontWeight:500, display:"flex", alignItems:"center", gap:5 }}><CheckIcon size={13} weight="bold" color="#189A5C" />{txt}</span>)}
          </div>
        </div>
      </section>

      {modal && <WebBriefModal onClose={() => setModal(false)} lang={lang} />}
    </div>
  );
}

const lbl = (color) => ({ display:"inline-block", background:"rgba(6,182,212,0.07)", border:`1px solid rgba(6,182,212,0.2)`, borderRadius:50, padding:"5px 16px", fontSize:11, color, letterSpacing:"2px", textTransform:"uppercase", marginBottom:16, fontWeight:700 });
const h2 = { fontSize:"clamp(28px,5vw,46px)", fontWeight:800, letterSpacing:"-1.5px", color:"var(--ink)", margin:"0 0 16px" };
const sub = { fontSize:16, color:"var(--ink-soft)", maxWidth:500, margin:"0 auto" };

const CSS = `
  @keyframes pulse  { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.2)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  
  .card { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s !important; }
  .card:hover { transform: translateY(-6px); }
  .portfolio-img { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
  .card:hover .portfolio-img { transform: scale(1.04); }
  
  input:focus, textarea:focus, select:focus { border-color: rgba(6,182,212,0.4) !important; outline:none; background: #fff !important; }
  textarea { resize:vertical; }
  button:hover { opacity:.92; }
  a:hover { opacity:.92; }

  .primary-web-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(6,182,212,0.4) !important; }
  .services-action-btn:hover { background: rgba(6,182,212,0.12) !important; }
`;
