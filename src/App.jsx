import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ══════════════════════════════════════════════════════
   HERO TITLE — MOT QUI CYCLE + SPARKLES
══════════════════════════════════════════════════════ */
const HERO_BLOCKS = [
  { text:"vos activités",       bg:"#00FFB4", color:"#050810" },
  { text:"votre support client", bg:"#FFB400", color:"#050810" },
  { text:"vos prospections",    bg:"#00C8FF", color:"#050810" },
];

function HeroWord() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % HERO_BLOCKS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <span style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10, margin:"10px 0" }}>
      {HERO_BLOCKS.map((b, i) => (
        <span
          key={i}
          style={{
            display:"inline-block",
            background: active === i ? b.bg : "rgba(255,255,255,0.05)",
            color: active === i ? b.color : "rgba(255,255,255,0.2)",
            padding:"6px 20px",
            borderRadius:8,
            fontSize:"clamp(22px,5vw,48px)",
            fontWeight:900,
            letterSpacing:"-1.5px",
            lineHeight:1.15,
            transition:"background 0.4s ease, color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease",
            transform: active === i ? "scale(1.04)" : "scale(1)",
            boxShadow: active === i ? `0 0 30px ${b.bg}55` : "none",
            WebkitTextFillColor: "unset",
          }}
        >
          {b.text}
        </span>
      ))}
    </span>
  );
}

/* Étoiles qui sparklent autour du texte */
const SPARKLE_POS = [
  { top:"-18px", left:"-14px",  size:14, delay:0    },
  { top:"-10px", right:"-18px", size:10, delay:0.4  },
  { top:"50%",   left:"-20px",  size:8,  delay:0.8  },
  { bottom:"-8px",left:"20%",   size:12, delay:0.3  },
  { bottom:"-14px",right:"15%", size:9,  delay:0.6  },
  { top:"10px",  right:"10%",   size:7,  delay:1.0  },
];

function SparkleText({ text }) {
  return (
    <span style={{ position:"relative", display:"inline-block" }}>
      {SPARKLE_POS.map((s, i) => (
        <svg
          key={i}
          width={s.size} height={s.size}
          viewBox="0 0 16 16"
          style={{
            position:"absolute",
            top: s.top, left: s.left, right: s.right, bottom: s.bottom,
            animation:`sparkle 2s ${s.delay}s infinite`,
            pointerEvents:"none",
          }}
        >
          <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" fill="#00FFB4" />
        </svg>
      ))}
      <span style={{ background:"linear-gradient(135deg,#00FFB4 20%,#00C8FF 80%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
        {text}
      </span>
    </span>
  );
}

/* ══════════════════════════════════════════════════════
   DONNÉES
══════════════════════════════════════════════════════ */
const WA_NUMBER = "2290160008046"; // ← CHANGE ICI

/* ══════════════════════════════════════════════════════
   TRADUCTIONS NAV
══════════════════════════════════════════════════════ */
const NAV_LANG = {
  fr: { home:"Accueil", ia:"IA", creative:"Créatif", web:"Web", products:"Produits", demo:"🤖 Démo Alex", how:"Comment ça marche", pricing:"Tarifs", reviews:"Témoignages", faq:"FAQ", start:"Démarrer →", dark:"Mode sombre", light:"Mode clair", lang:"Langue" },
  en: { home:"Home", ia:"AI", creative:"Creative", web:"Web", products:"Products", demo:"🤖 Demo Alex", how:"How it works", pricing:"Pricing", reviews:"Reviews", faq:"FAQ", start:"Get started →", dark:"Dark mode", light:"Light mode", lang:"Language" },
  es: { home:"Inicio", ia:"IA", creative:"Creativo", web:"Web", products:"Productos", demo:"🤖 Demo Alex", how:"Cómo funciona", pricing:"Precios", reviews:"Testimonios", faq:"FAQ", start:"Empezar →", dark:"Modo oscuro", light:"Modo claro", lang:"Idioma" },
  zh: { home:"首页", ia:"人工智能", creative:"创意", web:"网站", products:"产品", demo:"🤖 演示Alex", how:"工作流程", pricing:"价格", reviews:"客户评价", faq:"常见问题", start:"开始 →", dark:"深色模式", light:"浅色模式", lang:"语言" },
  ja: { home:"ホーム", ia:"AI", creative:"クリエイティブ", web:"ウェブ", products:"製品", demo:"🤖 Alexデモ", how:"仕組み", pricing:"料金", reviews:"お客様の声", faq:"よくある質問", start:"始める →", dark:"ダークモード", light:"ライトモード", lang:"言語" },
};

const LANG_OPTIONS = [
  { code:"fr", label:"🇫🇷 FR" },
  { code:"en", label:"🇬🇧 EN" },
  { code:"es", label:"🇪🇸 ES" },
  { code:"zh", label:"🇨🇳 中文" },
  { code:"ja", label:"🇯🇵 日本語" },
];

const TESTIMONIALS = [
  { name:"Fatou A.", role:"Gérante · Boutique Beauté, Cotonou", text:"Depuis Alex, je reçois plus les mêmes questions 10 fois par jour. Mes clients ont les réponses en secondes.", avatar:"F", color:"#00FFB4" },
  { name:"Kodjo M.", role:"Directeur · Import-Export, Porto-Novo", text:"Le rapport quotidien de prospects qualifiés est indispensable. Mon équipe sait exactement qui relancer chaque matin.", avatar:"K", color:"#00C8FF" },
  { name:"Rosine D.", role:"Fondatrice · Traiteur événementiel", text:"Ma page Facebook n'a jamais été aussi active. Le CM IA publie pour moi pendant que je travaille.", avatar:"R", color:"#FFB400" },
  { name:"Ibrahim S.", role:"PDG · Pharmacie Centrale, Parakou", text:"En 3 semaines, Alex a géré plus de 400 conversations. Zéro erreur, zéro plainte client. Impressionnant.", avatar:"I", color:"#00FFB4" },
  { name:"Aïcha B.", role:"Directrice · Centre de formation", text:"Nos inscriptions ont doublé. Alex répond la nuit quand nous sommes fermés. Nos concurrents ne comprennent pas comment.", avatar:"A", color:"#00C8FF" },
];

const STEPS = [
  { n:"01", icon:"🎯", title:"Consultation gratuite", desc:"On analyse votre activité et vos clients. Un appel de 30 min suffit pour tout comprendre.", video:"consultation" },
  { n:"02", icon:"⚙️", title:"Configuration sur mesure", desc:"On configure Alex avec votre catalogue, vos prix, votre ton. 100% personnalisé pour vous.", video:"config" },
  { n:"03", icon:"✅", title:"Test & validation", desc:"Vous testez l'agent avant la mise en ligne. On ajuste jusqu'à votre satisfaction totale.", video:"test" },
  { n:"04", icon:"🚀", title:"Mise en ligne en 72h", desc:"Votre agent IA est actif. Support continu pour les évolutions et optimisations.", video:"live" },
];

const FAQS = [
  {
    cat:"💰 Investissement",
    q:"Est-ce que ça vaut vraiment 25 000 FCFA par mois ?",
    a:"Un commercial humain à Cotonou coûte entre 80 000 et 150 000 FCFA/mois — pour 8h/jour, 5 jours/semaine. Alex travaille 24h/24, 7j/7, répond en moins de 10 secondes, ne fait jamais d'erreur de communication et vous envoie un rapport chaque matin. Le calcul est vite fait."
  },
  {
    cat:"⚙️ Technique",
    q:"Comment Alex connaît mon business ? Mes produits, mes prix ?",
    a:"Lors de la configuration, on alimente Alex avec tout ce qu'il doit savoir : votre catalogue, vos prix en FCFA, vos conditions de livraison, vos horaires, vos promotions. Il stocke ces informations dans une base de connaissance intelligente (RAG) et les utilise pour répondre avec précision. Si vos prix changent, on met à jour en 10 minutes."
  },
  {
    cat:"📱 WhatsApp",
    q:"Mon numéro WhatsApp risque-t-il d'être banni par Meta ?",
    a:"Non. Alex génère des messages naturels, avec des variations humaines — jamais du copier-coller en masse. Il respecte les fenêtres de 24h de WhatsApp et les règles anti-spam. Aucun de nos clients n'a jamais eu de problème. En cas de doute, on recommande un numéro dédié séparé de votre numéro personnel."
  },
  {
    cat:"🤔 Objections",
    q:"Mes clients sont-ils prêts à parler à une IA ?",
    a:"Dans 95% des cas, les clients ne savent même pas qu'ils parlent à une IA — et s'en fichent, du moment qu'ils obtiennent une réponse rapide et précise. Ce qui frustre un client, c'est d'attendre 3h une réponse. Alex répond en 10 secondes, même à minuit. C'est ça qui compte pour votre client béninois."
  },
  {
    cat:"🌍 Local",
    q:"Est-ce que Alex comprend le contexte béninois ? Les noms, les quartiers, le FCFA ?",
    a:"Oui, c'est l'un de nos avantages clés. Alex est configuré pour votre marché : il parle en FCFA, connaît Cotonou, Porto-Novo, Parakou, comprend les références locales et peut même être configuré pour répondre en Fon ou Yoruba si votre clientèle le nécessite."
  },
  {
    cat:"📊 Résultats",
    q:"Comment je sais si Alex travaille bien ? Comment je mesure les résultats ?",
    a:"Chaque matin, vous recevez un rapport sur WhatsApp, Telegram et email avec : nombre de conversations gérées, prospects qualifiés, relances envoyées, et taux de réponse. Vous avez aussi accès à un tableau de bord Google Sheets mis à jour en temps réel. Rien n'est une boîte noire."
  },
  {
    cat:"⚡ Démarrage",
    q:"Je ne suis pas tech. Est-ce que je peux vraiment utiliser ça ?",
    a:"Vous n'avez rien à installer, rien à coder, rien à configurer. Vous nous donnez vos infos produits et votre numéro WhatsApp — on fait tout le reste. Vous recevez vos rapports sur votre téléphone comme un SMS. Si vous savez lire WhatsApp, vous savez utiliser nos produits."
  },
  {
    cat:"🔄 Flexibilité",
    q:"Que se passe-t-il si je veux changer de produit ou arrêter ?",
    a:"Aucun engagement. Nos abonnements sont au mois, résiliables à tout moment sans frais ni justification. Si vous voulez passer du Plan Alex au Pack Complet, on fait la migration en 24h. Si vous voulez pause ou arrêt, un message WhatsApp suffit."
  },
];

/* Réponses simulées pour le chat démo */
const ALEX_RESPONSES = [
  { keys:["bonjour","salut","bonsoir","hello","hi"], reply:"Bonjour ! 👋 Je suis Alex, l'assistant IA de Digital Horizon Agency. Comment puis-je vous aider aujourd'hui ?" },
  { keys:["prix","tarif","coût","combien","fcfa"], reply:"Nos offres démarrent à **25 000 FCFA/mois** pour Alex Agent WhatsApp. Le Pack Complet est à **50 000 FCFA/mois**. Vous souhaitez plus de détails sur une offre ?" },
  { keys:["alex","agent","whatsapp","répondre","réponse","client"], reply:"Alex est notre agent commercial IA pour WhatsApp 🤖 Il répond à vos clients 24h/24, qualifie les prospects, relance automatiquement et vous envoie un rapport quotidien. Vous voulez une démo ?" },
  { keys:["facebook","publication","post","community","contenu"], reply:"Notre Community Manager IA publie automatiquement sur votre page Facebook 3x/semaine 📲 Il recherche les tendances, génère le texte et les visuels, et publie Lun/Mer/Ven à 9h. Tout automatiquement !" },
  { keys:["comment","marche","fonctionne","processus","étape"], reply:"C'est simple : 1) Consultation gratuite (30 min) → 2) Configuration sur mesure → 3) Test & validation → 4) Mise en ligne en 72h. On s'occupe de tout 🚀" },
  { keys:["ban","banni","risque","sécur"], reply:"Aucun risque de ban ! Notre système génère des messages naturels qui respectent les règles WhatsApp. Aucun de nos clients n'a jamais eu de problème 🛡️" },
  { keys:["contact","appel","rdv","rencontre","parler","humain","équipe"], reply:"Bien sûr ! Contactez notre équipe directement sur WhatsApp → wa.me/" + WA_NUMBER + " 💬 On vous répond en moins de 2h !" },
  { keys:["pack","complet","deux","combo"], reply:"Le Pack Complet inclut Alex Agent WhatsApp + Community Manager IA pour **50 000 FCFA/mois** — au lieu de 60 000 FCFA séparément. Vous économisez 10 000 FCFA/mois ! 🎉" },
];

function getAlexReply(msg) {
  const lower = msg.toLowerCase();
  for (const r of ALEX_RESPONSES) {
    if (r.keys.some(k => lower.includes(k))) return r.reply;
  }
  return "Bonne question ! 🤔 Pour une réponse précise adaptée à votre situation, je vous recommande de contacter notre équipe directement sur WhatsApp. Ils vous répondront en moins de 2h 💬";
}

/* ══════════════════════════════════════════════════════
   COMPOSANT CHAT DÉMO
══════════════════════════════════════════════════════ */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return isMobile;
}

function DemoChat() {
  const [msgs, setMsgs] = useState([
    { role:"alex", text:"Bonjour ! 👋 Je suis Alex, l'assistant IA de DHA. Posez-moi une question sur nos services !", time: new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}) }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => { 
    if (msgs.length > 1) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior:"smooth", block:"end" }), 100);
    }
  }, [msgs, typing]);

  const send = async () => {
    const txt = input.trim();
    if (!txt || typing) return;
    const time = new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"});
    setInput("");
    setMsgs(p => [...p, { role:"user", text:txt, time }]);
    setTyping(true);
    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
    setTyping(false);
    setMsgs(p => [...p, { role:"alex", text:getAlexReply(txt), time: new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}) }]);
  };

  const renderText = (t) => t.split(/\*\*(.*?)\*\*/g).map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part);

  /* ── VERSION MOBILE : interface WhatsApp ── */
  if (isMobile) {
    return (
      <div style={{ borderRadius:16, overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.6)", maxWidth:340, margin:"0 auto", fontFamily:"'Segoe UI',sans-serif" }}>
        {/* WhatsApp header vert */}
        <div style={{ background:"#075E54", padding:"10px 14px", display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ fontSize:18, color:"#fff" }}>←</div>
          <div style={{ width:36, height:36, borderRadius:"50%", background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"#fff", fontSize:14 }}>A</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:700, color:"#fff" }}>Alex · DHA</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.7)" }}>en ligne</div>
          </div>
          <div style={{ display:"flex", gap:16, color:"rgba(255,255,255,0.8)", fontSize:18 }}>
            <span>📞</span>
            <span>⋮</span>
          </div>
        </div>

        {/* Fond wallpaper WhatsApp */}
        <div style={{ background:"#ECE5DD", backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4c9ba' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")", height:360, overflowY:"auto", padding:"12px 10px", display:"flex", flexDirection:"column", gap:6 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display:"flex", justifyContent: m.role==="alex" ? "flex-start" : "flex-end" }}>
              <div style={{
                maxWidth:"80%", padding:"7px 10px 4px", fontSize:13, lineHeight:1.5,
                background: m.role==="alex" ? "#fff" : "#DCF8C6",
                color:"#111",
                borderRadius: m.role==="alex" ? "0px 10px 10px 10px" : "10px 0px 10px 10px",
                boxShadow:"0 1px 2px rgba(0,0,0,0.15)",
                animation:"fadeUp 0.3s ease both",
              }}>
                {m.role==="alex" && <div style={{ fontSize:11, color:"#075E54", fontWeight:700, marginBottom:3 }}>Alex · DHA</div>}
                <div>{renderText(m.text)}</div>
                <div style={{ fontSize:10, color:"#999", textAlign:"right", marginTop:3, display:"flex", alignItems:"center", justifyContent:"flex-end", gap:3 }}>
                  {m.time}
                  {m.role==="user" && <span style={{ color:"#53BDEB" }}>✓✓</span>}
                </div>
              </div>
            </div>
          ))}
          {typing && (
            <div style={{ display:"flex", justifyContent:"flex-start" }}>
              <div style={{ background:"#fff", borderRadius:"0px 10px 10px 10px", padding:"10px 14px", boxShadow:"0 1px 2px rgba(0,0,0,0.15)", display:"flex", gap:4, alignItems:"center" }}>
                {[0,0.2,0.4].map((d,i) => <span key={i} style={{ width:7, height:7, background:"#aaa", borderRadius:"50%", display:"inline-block", animation:`typeBounce 0.9s ${d}s infinite` }} />)}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        <div style={{ background:"#ECE5DD", padding:"0 10px 6px", display:"flex", gap:6, flexWrap:"wrap" }}>
          {["💰 Les prix","🤖 Comment ça marche ?","📞 Contacter"].map(s => (
            <button key={s} onClick={() => setInput(s)} style={{ background:"#fff", border:"1px solid #d0d0d0", borderRadius:20, padding:"4px 10px", fontSize:11, color:"#075E54", cursor:"pointer", fontFamily:"inherit", boxShadow:"0 1px 2px rgba(0,0,0,0.1)" }}>{s}</button>
          ))}
        </div>

        {/* Input WhatsApp — vrai champ de saisie */}
        <div style={{ background:"#F0F0F0", padding:"8px 10px", display:"flex", alignItems:"center", gap:8 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") send(); }}
            placeholder="Tapez votre message"
            style={{ flex:1, background:"#fff", borderRadius:24, padding:"10px 14px", fontSize:13, color:"#111", border:"none", outline:"none", fontFamily:"inherit", boxShadow:"0 1px 2px rgba(0,0,0,0.1)" }}
          />
          <button onClick={send} disabled={typing || !input.trim()} style={{ width:42, height:42, borderRadius:"50%", background: input.trim() ? "#075E54" : "#aaa", border:"none", cursor: input.trim() ? "pointer" : "default", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 2px 6px rgba(0,0,0,0.2)", color:"#fff" }}>
            ➤
          </button>
        </div>
      </div>
    );
  }

  /* ── VERSION DESKTOP : interface chat normale ── */
  return (
    <div style={{ background:"#0a0f1e", border:"1px solid rgba(0,255,180,0.12)", borderRadius:20, overflow:"hidden", boxShadow:"0 30px 80px rgba(0,0,0,0.5)" }}>
      <div style={{ background:"rgba(0,255,180,0.06)", borderBottom:"1px solid rgba(0,255,180,0.1)", padding:"14px 18px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:38, height:38, borderRadius:"50%", background:"linear-gradient(135deg,#00FFB4,#00C8FF)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"#050810", fontSize:15, flexShrink:0 }}>A</div>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:"#fff", lineHeight:1.2 }}>Alex · Agent Commercial DHA</div>
            <div style={{ fontSize:11, color:"#00FFB4", display:"flex", alignItems:"center", gap:5, marginTop:3 }}>
              <span style={{ width:5, height:5, background:"#00FFB4", borderRadius:"50%", display:"inline-block", animation:"blink 2s infinite" }} />
              En ligne · Répond en moins de 10s
            </div>
          </div>
        </div>
        <div style={{ background:"rgba(0,255,180,0.1)", border:"1px solid rgba(0,255,180,0.2)", borderRadius:8, padding:"4px 10px", fontSize:10, color:"#00FFB4", fontWeight:700 }}>DÉMO LIVE</div>
      </div>
      <div style={{ height:340, overflowY:"auto", padding:"16px 14px", display:"flex", flexDirection:"column", gap:12 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display:"flex", justifyContent: m.role==="alex" ? "flex-start" : "flex-end", alignItems:"flex-end", gap:8 }}>
            {m.role === "alex" && <div style={{ width:26, height:26, borderRadius:"50%", background:"linear-gradient(135deg,#00FFB4,#00C8FF)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"#050810", fontSize:10, flexShrink:0, marginBottom:2 }}>A</div>}
            <div style={{ maxWidth:"78%", padding:"10px 14px", fontSize:13, lineHeight:1.65, fontWeight:500, background: m.role==="alex" ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg,#00FFB4,#00C8FF)", color: m.role==="alex" ? "#e2e8f0" : "#050810", borderRadius: m.role==="alex" ? "4px 16px 16px 16px" : "16px 4px 16px 16px", border: m.role==="alex" ? "1px solid rgba(255,255,255,0.07)" : "none", animation:"fadeUp 0.3s ease both" }}>{renderText(m.text)}</div>
          </div>
        ))}
        {typing && (
          <div style={{ display:"flex", alignItems:"flex-end", gap:8 }}>
            <div style={{ width:26, height:26, borderRadius:"50%", background:"linear-gradient(135deg,#00FFB4,#00C8FF)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"#050810", fontSize:10, flexShrink:0 }}>A</div>
            <div style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"4px 16px 16px 16px", padding:"12px 16px", display:"flex", gap:4, alignItems:"center" }}>
              {[0,0.2,0.4].map((d,i) => <span key={i} style={{ width:6, height:6, background:"#00FFB4", borderRadius:"50%", display:"inline-block", animation:`typeBounce 0.9s ${d}s infinite` }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding:"0 14px 10px", display:"flex", gap:6, flexWrap:"wrap" }}>
        {["💰 Voir les prix","🤖 Comment ça marche ?","📞 Contacter l'équipe"].map(s => (
          <button key={s} onClick={() => setInput(s)} style={{ background:"rgba(0,255,180,0.06)", border:"1px solid rgba(0,255,180,0.15)", borderRadius:20, padding:"5px 12px", fontSize:11, color:"#00FFB4", cursor:"pointer", fontFamily:"inherit" }}>{s}</button>
        ))}
      </div>
      <div style={{ padding:"10px 12px 14px", borderTop:"1px solid rgba(255,255,255,0.05)", display:"flex", gap:8 }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")send();}} placeholder="Posez votre question à Alex..." style={{ flex:1, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, padding:"11px 14px", fontSize:13, color:"#e2e8f0", outline:"none", fontFamily:"inherit" }} />
        <button onClick={send} disabled={typing || !input.trim()} style={{ width:42, height:42, borderRadius:12, background: input.trim() ? "linear-gradient(135deg,#00FFB4,#00C8FF)" : "rgba(255,255,255,0.05)", border:"none", cursor: input.trim() ? "pointer" : "default", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>➤</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   FLOATING WIDGET
══════════════════════════════════════════════════════ */
function FloatingWidget() {
  const [pulse, setPulse] = useState(true);
  useEffect(() => { const t = setTimeout(() => setPulse(false), 5000); return () => clearTimeout(t); }, []);

  return (
    <div style={{ position:"fixed", bottom:24, right:20, zIndex:300 }}>
      {pulse && (
        <div style={{ position:"absolute", bottom:66, right:0, background:"#075E54", border:"1px solid rgba(37,211,102,0.3)", borderRadius:"12px 12px 4px 12px", padding:"8px 14px", fontSize:12, color:"#fff", whiteSpace:"nowrap", boxShadow:"0 4px 20px rgba(0,0,0,0.4)", animation:"slideUp 0.4s ease" }}>
          💬 Discutez avec Alex sur WhatsApp !
        </div>
      )}
      <a href={`https://wa.me/${WA_NUMBER}?text=Bonjour%20Alex%20!%20Je%20veux%20en%20savoir%20plus%20sur%20DHA.`} target="_blank" rel="noopener noreferrer" style={{ width:56, height:56, borderRadius:"50%", background:"#25D366", border:"none", cursor:"pointer", fontSize:28, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 20px rgba(37,211,102,0.5)", textDecoration:"none", transition:"transform 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.transform="scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   TÉMOIGNAGES DÉFILANTS (style Wazzap)
══════════════════════════════════════════════════════ */
function TestimonialsScroll() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <div style={{ overflow:"hidden", position:"relative", padding:"20px 0" }}>
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:80, background: darkMode ? "linear-gradient(90deg,#050810,transparent)" : "linear-gradient(90deg,#EAE6DF,transparent)", zIndex:2 }} />
      <div style={{ position:"absolute", right:0, top:0, bottom:0, width:80, background: darkMode ? "linear-gradient(-90deg,#050810,transparent)" : "linear-gradient(-90deg,#EAE6DF,transparent)", zIndex:2 }} />
      <div style={{ display:"flex", gap:16, animation:"scrollLeft 30s linear infinite", width:"max-content" }}>
        {doubled.map((t, i) => (
          <div key={i} style={{ width:280, flexShrink:0, background: darkMode ? "rgba(255,255,255,0.03)" : "#fff", border: darkMode ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)", borderRadius:16, padding:"20px 18px", boxShadow: darkMode ? "none" : "0 2px 8px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize:30, color:`${t.color}22`, marginBottom:10, fontFamily:"Georgia,serif", lineHeight:1 }}>"</div>
            <p style={{ fontSize:12, color:"#94a3b8", lineHeight:1.7, marginBottom:16, fontStyle:"italic" }}>{t.text}</p>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:32, height:32, borderRadius:"50%", background:`${t.color}20`, color:t.color, border:`1px solid ${t.color}40`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:12, flexShrink:0 }}>{t.avatar}</div>
              <div>
                <div style={{ fontSize:12, fontWeight:700, color:t.color }}>{t.name}</div>
                <div style={{ fontSize:10, color:"#475569", marginTop:1 }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════════════════════════ */
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
      {FAQS.map((f, i) => (
        <div key={i} style={{ background: darkMode ? "rgba(255,255,255,0.03)" : "#fff", border:`1px solid ${open===i ? "rgba(0,255,180,0.25)" : (darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)")}`, borderRadius:14, boxShadow: darkMode ? "none" : "0 2px 8px rgba(0,0,0,0.04)", overflow:"hidden", transition:"border 0.3s" }}>
          <button onClick={() => setOpen(open===i ? null : i)} style={{ width:"100%", background:"none", border:"none", padding:"16px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", fontFamily:"inherit", textAlign:"left", gap:12 }}>
            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              <span style={{ fontSize:10, color: open===i ? "#00FFB4" : "#475569", fontWeight:700, letterSpacing:"0.5px" }}>{f.cat}</span>
              <span style={{ fontSize:14, fontWeight:600, color: open===i ? (darkMode ? "#fff" : "#0f172a") : (darkMode ? "#cbd5e1" : "#334155"), transition:"color 0.3s", lineHeight:1.4 }}>{f.q}</span>
            </div>
            <span style={{ color: open===i ? "#00FFB4" : "#475569", fontSize:20, flexShrink:0, transition:"transform 0.3s, color 0.3s", transform: open===i ? "rotate(45deg)" : "rotate(0)", lineHeight:1 }}>+</span>
          </button>
          {open === i && (
            <div style={{ padding:"0 20px 18px", fontSize:13, color:"#94a3b8", lineHeight:1.85, animation:"fadeUp 0.25s ease", borderTop:"1px solid rgba(255,255,255,0.04)", paddingTop:14 }}>{f.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════ */
export default function DHASite() {
  const [scrollY, setScrollY]   = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [vis, setVis]           = useState(new Set());
  const [activeStep, setActiveStep] = useState(0);
  const [darkMode, setDarkMode] = useState(true);          // true = dark (default)
  const [lang, setLang]         = useState("fr");
  const [langOpen, setLangOpen] = useState(false);
  const t = NAV_LANG[lang];

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setVis(p => new Set([...p, e.target.id])); }),
      { threshold:0.07 }
    );
    document.querySelectorAll("[data-observe]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Auto-cycle steps
  useEffect(() => {
    const ti = setInterval(() => setActiveStep(p => (p+1) % STEPS.length), 3500);
    return () => clearInterval(ti);
  }, []);

  // Close lang dropdown when clicking outside
  useEffect(() => {
    if (!langOpen) return;
    const close = (e) => { setLangOpen(false); };
    setTimeout(() => document.addEventListener("click", close), 10);
    return () => document.removeEventListener("click", close);
  }, [langOpen]);

  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMenuOpen(false); };
  const v = id => vis.has(id);

  // Theme colors
  const bg      = darkMode ? "#050810" : "#F2EFE9";
  const bgNav   = darkMode ? "rgba(5,8,16,0.95)" : "rgba(242,239,233,0.95)";
  const textPri = darkMode ? "#e2e8f0"              : "#0f172a";
  const textSec = darkMode ? "#94a3b8"              : "#475569";
  const border  = darkMode ? "rgba(255,255,255,0.06)": "rgba(0,0,0,0.08)";
  const cardBg  = darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)";

  const navLinks = [
    ["produits", t.products],
    ["demo", t.demo],
    ["comment", t.how],
    ["tarifs", t.pricing],
    ["temoignages", t.reviews],
    ["faq", t.faq],
  ];

  const pageLinks = [
    { to:"/", label: t.ia, emoji:"🤖", active:true },
    { to:"/creative", label: t.creative, emoji:"🎨" },
    { to:"/web", label: t.web, emoji:"💻" },
  ];

  // Inject theme CSS var overrides
  const themeVars = darkMode ? "" : `
    body { background: #F2EFE9 !important; color: #0f172a !important; }
    ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12) !important; }
    
    /* Override hardcoded dark backgrounds */
    section { background: #F2EFE9 !important; }
    nav { color: #0f172a !important; }
    
    /* Cards */
    [style*="rgba(255,255,255,0.03)"],
    [style*="rgba(255,255,255,0.025)"],
    [style*="rgba(255,255,255,0.02)"] {
      background: #fff !important;
      box-shadow: 0 2px 12px rgba(0,0,0,0.06) !important;
    }
    
    /* Dark section backgrounds */
    [style*="#050810"],
    [style*="#070d1a"],
    [style*="#07101f"],
    [style*="#030609"],
    [style*="#0a0f1e"],
    [style*="#0d1117"],
    [style*="linear-gradient(180deg,#050810"] {
      background: #F2EFE9 !important;
    }
    
    /* Text colors */
    h1, h2, h3, h4 { color: #0f172a !important; }
    [style*="color:\"#fff\""], [style*='color:"#fff"'] { color: #0f172a !important; }
    [style*="color:\"#e2e8f0\""] { color: #334155 !important; }
    [style*="color:\"#94a3b8\""] { color: #475569 !important; }
    [style*="color:\"#64748b\""] { color: #64748b !important; }
    
    /* Borders */
    [style*="rgba(255,255,255,0.06)"],
    [style*="rgba(255,255,255,0.07)"],
    [style*="rgba(255,255,255,0.08)"],
    [style*="rgba(255,255,255,0.1)"] {
      border-color: rgba(0,0,0,0.08) !important;
    }
    
    /* Chat demo */
    [style*="#0a0f1e"] { background: #fff !important; }
    [style*="#070d1a"] { background: #F2EFE9 !important; }
    
    /* Inputs */
    input, textarea, select {
      background: #fff !important;
      color: #0f172a !important;
      border-color: rgba(0,0,0,0.12) !important;
    }
    input::placeholder { color: #94a3b8 !important; }
    
    /* FAQ */
    [style*="rgba(255,255,255,0.03)"] { background: #fff !important; }
    
    /* Testimonials scroll gradient */
    [style*="linear-gradient(90deg,#050810"] { background: linear-gradient(90deg,#F2EFE9,transparent) !important; }
    [style*="linear-gradient(-90deg,#050810"] { background: linear-gradient(-90deg,#F2EFE9,transparent) !important; }
    
    /* Pricing cards */
    [style*="linear-gradient(145deg"] { background: #fff !important; }
    
    /* Hero button secondary */
    [style*="rgba(255,255,255,0.05)"] { background: rgba(0,0,0,0.05) !important; }
    [style*="rgba(255,255,255,0.04)"] { background: rgba(0,0,0,0.04) !important; }
    
    /* Steps active */
    [style*="rgba(0,255,180,0.06)"] { background: rgba(0,200,140,0.08) !important; }
    
    /* Product cards */
    [style*="rgba(0,255,180,0.03)"] { background: rgba(0,200,140,0.04) !important; }
    [style*="rgba(0,200,255,0.03)"] { background: rgba(0,180,230,0.04) !important; }
  `;

  return (
    <div style={{ fontFamily:"'Outfit',sans-serif", background:bg, color:textPri, overflowX:"hidden", transition:"background 0.3s, color 0.3s" }}>
      <style>{CSS + themeVars}</style>

      {/* ─── NAV ─── */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, transition:"all 0.4s", background: scrollY>60 ? bgNav : "transparent", backdropFilter: scrollY>60 ? "blur(24px)" : "none", borderBottom: scrollY>60 ? `1px solid ${border}` : "none" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 20px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>

          {/* LOGO */}
          <Link to="/" style={{ fontSize:22, fontWeight:900, letterSpacing:"-1px", color:textPri, textDecoration:"none", flexShrink:0 }}>
            <span style={{ color:"#00FFB4" }}>D</span>HA
            <span style={{ fontSize:11, color:textSec, fontWeight:400, marginLeft:8, letterSpacing:"1px" }}>AGENCY</span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="desk-nav" style={{ display:"flex", alignItems:"center", gap:2, flex:1, justifyContent:"center" }}>
            {/* Pages */}
            {pageLinks.map(({ to, label, emoji, active }) => (
              <Link key={to} to={to} style={{ background: active ? "rgba(0,255,180,0.08)" : "none", border: active ? "1px solid rgba(0,255,180,0.2)" : "1px solid transparent", color: active ? "#00FFB4" : textSec, fontSize:12, padding:"6px 12px", borderRadius:8, textDecoration:"none", fontWeight: active ? 700 : 500, transition:"all 0.2s", display:"flex", alignItems:"center", gap:5 }}>
                <span>{emoji}</span>{label}
              </Link>
            ))}
            <div style={{ width:1, height:18, background:border, margin:"0 6px" }} />
            {/* Scroll links */}
            {navLinks.map(([id,label]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{ background:"none", border:"none", color: id==="demo" ? "#00FFB4" : textSec, fontSize:12, cursor:"pointer", padding:"6px 11px", borderRadius:8, fontFamily:"inherit", fontWeight: id==="demo" ? 700 : 500, transition:"color 0.2s", whiteSpace:"nowrap" }}>{label}</button>
            ))}
          </div>

          {/* RIGHT CONTROLS */}
          <div className="desk-nav" style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
            {/* Dark/Light toggle */}
            <button
              onClick={() => setDarkMode(d => !d)}
              title={darkMode ? t.light : t.dark}
              style={{ background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", border:`1px solid ${border}`, borderRadius:10, width:38, height:38, cursor:"pointer", fontSize:17, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.3s" }}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {/* Language selector */}
            <div style={{ position:"relative" }}>
              <button
                onClick={(e) => { e.stopPropagation(); setLangOpen(o => !o); }}
                style={{ background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", border:`1px solid ${border}`, borderRadius:10, padding:"0 10px", height:38, cursor:"pointer", fontSize:12, color:textPri, fontFamily:"inherit", fontWeight:600, display:"flex", alignItems:"center", gap:5 }}
              >
                {LANG_OPTIONS.find(l => l.code === lang)?.label} <span style={{ fontSize:9, opacity:0.5 }}>▼</span>
              </button>
              {langOpen && (
                <div onClick={e => e.stopPropagation()} style={{ position:"absolute", top:"calc(100% + 8px)", right:0, background: darkMode ? "#0d1526" : "#fff", border:`1px solid ${border}`, borderRadius:12, padding:6, boxShadow:"0 12px 40px rgba(0,0,0,0.3)", zIndex:500, minWidth:130 }}>
                  {LANG_OPTIONS.map(opt => (
                    <button key={opt.code} onClick={() => { setLang(opt.code); setLangOpen(false); }} style={{ display:"block", width:"100%", background: lang===opt.code ? "rgba(0,255,180,0.08)" : "none", border:"none", borderRadius:8, padding:"8px 12px", fontSize:12, color: lang===opt.code ? "#00FFB4" : textSec, cursor:"pointer", fontFamily:"inherit", textAlign:"left", fontWeight: lang===opt.code ? 700 : 400, transition:"all 0.15s" }}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a href={`https://wa.me/${WA_NUMBER}`} style={{ background:"linear-gradient(135deg,#00FFB4,#00C8FF)", color:"#050810", padding:"9px 16px", borderRadius:10, fontSize:12, fontWeight:700, textDecoration:"none", whiteSpace:"nowrap" }}>{t.start}</a>
          </div>

          {/* BURGER */}
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)} style={{ display:"none", background:"none", border:"none", color:textPri, fontSize:24, cursor:"pointer" }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div style={{ background: darkMode ? "rgba(5,8,16,0.98)" : "rgba(248,250,252,0.98)", borderTop:`1px solid ${border}` }}>
            {/* Page links */}
            <div style={{ padding:"10px 20px 6px", display:"flex", gap:8, flexWrap:"wrap" }}>
              {pageLinks.map(({ to, label, emoji, active }) => (
                <Link key={to} to={to} onClick={() => setMenuOpen(false)} style={{ background: active ? "rgba(0,255,180,0.08)" : cardBg, border: active ? "1px solid rgba(0,255,180,0.2)" : `1px solid ${border}`, color: active ? "#00FFB4" : textSec, fontSize:12, padding:"6px 12px", borderRadius:8, textDecoration:"none", fontWeight: active ? 700 : 500, display:"flex", alignItems:"center", gap:5 }}>
                  {emoji} {label}
                </Link>
              ))}
            </div>
            <div style={{ height:1, background:border, margin:"6px 0" }} />
            {navLinks.map(([id,label]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{ display:"block", width:"100%", background:"none", border:"none", borderBottom:`1px solid ${border}`, color: id==="demo"?"#00FFB4":textSec, fontSize:15, padding:"14px 24px", textAlign:"left", cursor:"pointer", fontFamily:"inherit" }}>{label}</button>
            ))}
            {/* Dark mode + Lang in mobile */}
            <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 20px" }}>
              <button onClick={() => setDarkMode(d => !d)} style={{ background:cardBg, border:`1px solid ${border}`, borderRadius:10, padding:"8px 14px", fontSize:13, color:textPri, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:6 }}>
                {darkMode ? "☀️" : "🌙"} {darkMode ? t.light : t.dark}
              </button>
              <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                {LANG_OPTIONS.map(opt => (
                  <button key={opt.code} onClick={() => setLang(opt.code)} style={{ background: lang===opt.code ? "rgba(0,255,180,0.1)" : cardBg, border:`1px solid ${lang===opt.code ? "rgba(0,255,180,0.3)" : border}`, borderRadius:8, padding:"6px 8px", fontSize:11, color: lang===opt.code ? "#00FFB4" : textSec, cursor:"pointer", fontFamily:"inherit", fontWeight: lang===opt.code ? 700 : 400 }}>{opt.label}</button>
                ))}
              </div>
            </div>
            <div style={{ padding:"4px 20px 16px" }}>
              <a href={`https://wa.me/${WA_NUMBER}`} style={{ display:"block", background:"linear-gradient(135deg,#00FFB4,#00C8FF)", color:"#050810", padding:"13px", borderRadius:12, fontSize:15, fontWeight:700, textDecoration:"none", textAlign:"center" }}>{t.start}</a>
            </div>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section style={{ minHeight:"100svh", padding:"90px 20px 60px", position:"relative", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
        {/* BG grid */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(0,255,180,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,180,0.03) 1px,transparent 1px)", backgroundSize:"64px 64px" }} />
        <div style={{ position:"absolute", top:"-5%", left:"-10%", width:"50vw", height:"50vw", maxWidth:600, maxHeight:600, background:"radial-gradient(circle,rgba(0,255,180,0.08) 0%,transparent 65%)", filter:"blur(60px)", borderRadius:"50%" }} />
        <div style={{ position:"absolute", bottom:"-5%", right:"-10%", width:"45vw", height:"45vw", maxWidth:500, maxHeight:500, background:"radial-gradient(circle,rgba(0,200,255,0.07) 0%,transparent 65%)", filter:"blur(60px)", borderRadius:"50%" }} />

        <div style={{ position:"relative", zIndex:1, maxWidth:700, textAlign:"center" }}>
          {/* Badge */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(0,255,180,0.07)", border:"1px solid rgba(0,255,180,0.2)", borderRadius:24, padding:"7px 16px", fontSize:12, color:"#00FFB4", marginBottom:28, animation:"fadeUp 0.6s ease both" }}>
            <span style={{ width:6, height:6, background:"#00FFB4", borderRadius:"50%", animation:"blink 2s infinite" }} />
            🇧🇯 Agence IA N°1 au Bénin
          </div>

          {/* Title animé */}
          <h1 style={{ fontSize:"clamp(36px,8vw,72px)", fontWeight:900, lineHeight:1.15, letterSpacing:"-2.5px", color:textPri, margin:"0 0 20px", animation:"fadeUp 0.7s 0.1s ease both", display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            <span>Automatisez</span>
            <HeroWord />
            <SparkleText text="avec l'IA" />
          </h1>

          <p style={{ fontSize:"clamp(15px,3.5vw,18px)", color:"#94a3b8", lineHeight:1.75, maxWidth:520, margin:"0 auto 36px", animation:"fadeUp 0.7s 0.2s ease both" }}>
            Des agents IA sur mesure pour répondre à vos clients, qualifier vos prospects et publier votre contenu — pendant que vous dormez.
          </p>

          {/* CTAs */}
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:48, animation:"fadeUp 0.7s 0.3s ease both" }}>
            <a href={`https://wa.me/${WA_NUMBER}`} style={{ background:"linear-gradient(135deg,#00FFB4,#00C8FF)", color:"#050810", padding:"14px 28px", borderRadius:12, fontSize:15, fontWeight:700, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8, boxShadow:"0 0 40px rgba(0,255,180,0.25)" }}>
              💬 Démarrer gratuitement
            </a>
            <button onClick={() => scrollTo("demo")} style={{ background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", color: darkMode ? "#e2e8f0" : "#334155", border: darkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)", padding:"14px 28px", borderRadius:12, fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
              🤖 Tester Alex
            </button>
          </div>

          {/* Social proof */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:16, flexWrap:"wrap", animation:"fadeUp 0.7s 0.4s ease both" }}>
            <div style={{ display:"flex" }}>
              {["F","K","R","I","A"].map((l,i) => (
                <div key={i} style={{ width:32, height:32, borderRadius:"50%", background:`linear-gradient(135deg,${["#00FFB4","#00C8FF","#FFB400","#00FFB4","#00C8FF"][i]},#050810)`, border:"2px solid #050810", marginLeft: i>0?-8:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:"#050810" }}>{l}</div>
              ))}
            </div>
            <div style={{ fontSize:13, color:"#64748b" }}>
              <span style={{ color:"#00FFB4", fontWeight:700 }}>4.9/5</span> · Utilisé par +50 entreprises béninoises
            </div>
          </div>

          {/* Stats */}
          <div style={{ display:"flex", gap:24, justifyContent:"center", flexWrap:"wrap", marginTop:48, animation:"fadeUp 0.7s 0.5s ease both" }}>
            {[["24/7","Disponible"],["< 10s","Temps réponse"],["72h","Mise en ligne"],["0 FCFA","Consultation"]].map(([v,l]) => (
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontSize:"clamp(20px,4vw,28px)", fontWeight:900, color:"#00FFB4", letterSpacing:"-1px", lineHeight:1.1 }}>{v}</div>
                <div style={{ fontSize:11, color:"#475569", marginTop:3, letterSpacing:"0.3px" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES RAPIDES ─── */}
      <section style={{ padding:"60px 20px", background: darkMode ? "linear-gradient(180deg,#050810,#070d1a)" : "#EAE6DF" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="feat-grid">
            {[
              { icon:"⚡", title:"Réponse en 10 secondes", desc:"Ne laissez plus vos prospects en attente. L'IA répond instantanément, même à 3h du matin." },
              { icon:"🎯", title:"Qualification automatique", desc:"Alex identifie les prospects chauds et vous alerte immédiatement pour les convertir." },
              { icon:"📊", title:"Rapport quotidien", desc:"Chaque matin, recevez un récapitulatif complet de toutes les conversations et prospects qualifiés." },
              { icon:"🌍", title:"Adapté au marché béninois", desc:"Compréhension du contexte local, des prix en FCFA, et des habitudes de communication africaines." },
            ].map((f, i) => (
              <div key={i} data-observe id={`feat${i}`} style={{ background: darkMode ? "rgba(255,255,255,0.025)" : "#fff", border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.07)", borderRadius:16, padding:"24px 20px", boxShadow: darkMode ? "none" : "0 2px 12px rgba(0,0,0,0.05)", opacity:v(`feat${i}`)?1:0, transform:v(`feat${i}`)?"none":"translateY(24px)", transition:`all 0.6s ease ${i*0.1}s` }}>
                <div style={{ fontSize:28, marginBottom:14 }}>{f.icon}</div>
                <h3 style={{ fontSize:15, fontWeight:700, color:textPri, marginBottom:8, lineHeight:1.3 }}>{f.title}</h3>
                <p style={{ fontSize:13, color:"#64748b", lineHeight:1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DÉMO ALEX ─── */}
      <section id="demo" style={{ padding:"80px 20px", background: darkMode ? "#070d1a" : "#EAE6DF" }}>
        <div style={{ maxWidth:680, margin:"0 auto" }}>
          <div data-observe id="demo-h" style={{ textAlign:"center", marginBottom:40, opacity:v("demo-h")?1:0, transform:v("demo-h")?"none":"translateY(24px)", transition:"all 0.7s" }}>
            <div style={{ display:"inline-block", background:"rgba(0,255,180,0.07)", border:"1px solid rgba(0,255,180,0.18)", borderRadius:20, padding:"5px 14px", fontSize:11, color:"#00FFB4", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:14 }}>Démo Interactive</div>
            <h2 style={{ fontSize:"clamp(26px,5vw,44px)", fontWeight:900, letterSpacing:"-1.5px", color:"#fff", margin:"0 0 12px" }}>Parlez à Alex maintenant</h2>
            <p style={{ fontSize:15, color:"#64748b", maxWidth:460, margin:"0 auto" }}>Testez notre agent IA en temps réel. Posez n'importe quelle question sur DHA.</p>
          </div>
          <div data-observe id="demo-chat" style={{ opacity:v("demo-chat")?1:0, transform:v("demo-chat")?"none":"translateY(30px)", transition:"all 0.7s 0.15s" }}>
            <DemoChat />
          </div>
          <p style={{ textAlign:"center", fontSize:12, color:"#334155", marginTop:14 }}>
            Ceci est une démo. Votre agent sera configuré spécifiquement pour votre business.
          </p>
        </div>
      </section>

      {/* ─── PRODUITS ─── */}
      <section id="produits" style={{ padding:"80px 20px", background:bg }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div data-observe id="prod-h" style={{ textAlign:"center", marginBottom:48, opacity:v("prod-h")?1:0, transform:v("prod-h")?"none":"translateY(24px)", transition:"all 0.7s" }}>
            <div style={labelStyle}>Nos Produits</div>
            <h2 style={h2Style}>Deux solutions, un objectif</h2>
            <p style={subStyle}>Automatiser pour vendre plus, sans travailler plus.</p>
          </div>
          {/* ── ALEX — carte principale large ── */}
          <div data-observe id="p1" style={{ opacity:v("p1")?1:0, transform:v("p1")?"none":"translateY(36px)", transition:"all 0.7s ease", marginBottom:24 }}>
            <div style={{ background: darkMode ? "rgba(0,255,180,0.03)" : "#fff", border:"1px solid rgba(0,255,180,0.18)", boxShadow: darkMode ? "none" : "0 4px 20px rgba(0,0,0,0.06)", borderRadius:24, overflow:"hidden", position:"relative" }}>
              {/* Glow BG */}
              <div style={{ position:"absolute", top:-60, right:-60, width:300, height:300, background:"radial-gradient(circle,rgba(0,255,180,0.07),transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />

              <div style={{ padding:"32px 28px 0" }}>
                {/* Header */}
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:16, marginBottom:20 }}>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                      <div style={{ width:48, height:48, borderRadius:13, background:"rgba(0,255,180,0.1)", border:"1px solid rgba(0,255,180,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>🤖</div>
                      <div>
                        <div style={{ fontSize:10, letterSpacing:"1.5px", color:"#00FFB4", fontWeight:700, textTransform:"uppercase", marginBottom:3 }}>Produit 1 · Agent Commercial</div>
                        <h3 style={{ fontSize:28, fontWeight:900, color:"#00FFB4", letterSpacing:"-1px", lineHeight:1 }}>ALEX</h3>
                      </div>
                    </div>
                    <p style={{ fontSize:14, color:"#94a3b8", lineHeight:1.75, maxWidth:520 }}>
                      Votre commercial IA disponible 24h/24 sur WhatsApp. Il répond, qualifie, relance et vous rapporte — pendant que vous dormez ou travaillez sur autre chose.
                    </p>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontSize:12, color:"#475569", textDecoration:"line-through" }}>50 000 FCFA/mois</div>
                    <div style={{ fontSize:28, fontWeight:900, color:"#00FFB4", letterSpacing:"-1px" }}>25 000</div>
                    <div style={{ display:"flex", alignItems:"center", gap:6, justifyContent:"flex-end" }}>
                      <span style={{ fontSize:12, color:"#475569" }}>FCFA / mois</span>
                      <span style={{ fontSize:10, background:"rgba(0,255,180,0.1)", color:"#00FFB4", border:"1px solid rgba(0,255,180,0.2)", borderRadius:20, padding:"2px 7px", fontWeight:700 }}>-50%</span>
                    </div>
                    <a href={`https://wa.me/${WA_NUMBER}`} style={{ display:"inline-block", marginTop:10, background:"linear-gradient(135deg,#00FFB4,#00C8FF)", color:"#050810", padding:"10px 20px", borderRadius:10, fontSize:13, fontWeight:700, textDecoration:"none" }}>Démarrer →</a>
                  </div>
                </div>

                {/* Features grid 2x3 */}
                <div className="feat6-grid" style={{ marginBottom:28 }}>
                  {[
                    { icon:"💬", title:"Réponses instantanées", desc:"Répond à vos clients en moins de 10 secondes, même la nuit et les weekends." },
                    { icon:"🎯", title:"Qualification intelligente", desc:"Détecte les prospects chauds et les tague automatiquement dans votre CRM." },
                    { icon:"⏰", title:"Relance auto après 1h", desc:"Si un prospect ne répond plus, Alex relance automatiquement au bon moment." },
                    { icon:"📊", title:"Rapport quotidien WhatsApp", desc:"Chaque matin, vous recevez un résumé complet des prospects et conversations sur WhatsApp, Telegram et email." },
                    { icon:"🧠", title:"Mémoire conversationnelle", desc:"Alex se souvient de chaque client et de l'historique de la conversation pour une expérience fluide." },
                    { icon:"📚", title:"Base de connaissance RAG", desc:"Alimenté par vos catalogues, fiches produits, prix et infos — réponses toujours précises et à jour." },
                  ].map((f,i) => (
                    <div key={i} style={{ background: darkMode ? "rgba(255,255,255,0.025)" : "#F8F6F2", border: darkMode ? "1px solid rgba(0,255,180,0.08)" : "1px solid rgba(0,200,140,0.15)", borderRadius:14, padding:"16px 14px" }}>
                      <div style={{ fontSize:20, marginBottom:8 }}>{f.icon}</div>
                      <div style={{ fontSize:13, fontWeight:700, color:textPri, marginBottom:5 }}>{f.title}</div>
                      <div style={{ fontSize:12, color:"#64748b", lineHeight:1.6 }}>{f.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Workflow visual */}
                <div style={{ background:"rgba(0,0,0,0.3)", borderTop:"1px solid rgba(0,255,180,0.08)", padding:"18px 0 20px", display:"flex", alignItems:"center", justifyContent:"center", gap:0, flexWrap:"wrap", overflow:"hidden" }}>
                  {[
                    { label:"Client WhatsApp", icon:"📱", color:"#00FFB4" },
                    { label:"Alex répond", icon:"🤖", color:"#00FFB4" },
                    { label:"Prospect qualifié", icon:"🎯", color:"#FFB400" },
                    { label:"Alerte équipe", icon:"🔔", color:"#00C8FF" },
                    { label:"Rapport quotidien", icon:"📊", color:"#A855F7" },
                  ].map((step, i, arr) => (
                    <div key={i} style={{ display:"flex", alignItems:"center" }}>
                      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, padding:"0 10px" }}>
                        <div style={{ width:36, height:36, borderRadius:"50%", background:`${step.color}15`, border:`1px solid ${step.color}40`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>{step.icon}</div>
                        <span style={{ fontSize:10, color:"#475569", textAlign:"center", maxWidth:70, lineHeight:1.3 }}>{step.label}</span>
                      </div>
                      {i < arr.length-1 && <div style={{ color:"rgba(0,255,180,0.25)", fontSize:16, flexShrink:0 }}>→</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── CM IA — carte ── */}
          <div data-observe id="p2" style={{ opacity:v("p2")?1:0, transform:v("p2")?"none":"translateY(36px)", transition:"all 0.7s ease 0.15s" }}>
            <div style={{ background: darkMode ? "rgba(0,200,255,0.03)" : "#fff", border:"1px solid rgba(0,200,255,0.18)", boxShadow: darkMode ? "none" : "0 4px 20px rgba(0,0,0,0.06)", borderRadius:24, overflow:"hidden", position:"relative" }}>
              <div style={{ position:"absolute", top:-60, left:-60, width:280, height:280, background:"radial-gradient(circle,rgba(0,200,255,0.06),transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />

              <div style={{ padding:"32px 28px 0" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:16, marginBottom:20 }}>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                      <div style={{ width:48, height:48, borderRadius:13, background:"rgba(0,200,255,0.1)", border:"1px solid rgba(0,200,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>📲</div>
                      <div>
                        <div style={{ fontSize:10, letterSpacing:"1.5px", color:"#00C8FF", fontWeight:700, textTransform:"uppercase", marginBottom:3 }}>Produit 2 · Community Manager</div>
                        <h3 style={{ fontSize:24, fontWeight:900, color:"#00C8FF", letterSpacing:"-0.8px", lineHeight:1 }}>Community Manager IA</h3>
                      </div>
                    </div>
                    <p style={{ fontSize:14, color:"#94a3b8", lineHeight:1.75, maxWidth:520 }}>
                      Votre page Facebook toujours active, sans que vous leviez le petit doigt. L'IA recherche les tendances, crée le contenu et publie automatiquement.
                    </p>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontSize:12, color:"#475569", textDecoration:"line-through" }}>75 000 FCFA/mois</div>
                    <div style={{ fontSize:28, fontWeight:900, color:"#00C8FF", letterSpacing:"-1px" }}>35 000</div>
                    <div style={{ display:"flex", alignItems:"center", gap:6, justifyContent:"flex-end" }}>
                      <span style={{ fontSize:12, color:"#475569" }}>FCFA / mois</span>
                      <span style={{ fontSize:10, background:"rgba(0,200,255,0.1)", color:"#00C8FF", border:"1px solid rgba(0,200,255,0.2)", borderRadius:20, padding:"2px 7px", fontWeight:700 }}>-53%</span>
                    </div>
                    <a href={`https://wa.me/${WA_NUMBER}`} style={{ display:"inline-block", marginTop:10, background:"linear-gradient(135deg,#00C8FF,#00C8FF99)", color:"#050810", padding:"10px 20px", borderRadius:10, fontSize:13, fontWeight:700, textDecoration:"none" }}>Démarrer →</a>
                  </div>
                </div>

                <div className="feat6-grid" style={{ marginBottom:28 }}>
                  {[
                    { icon:"🔍", title:"Recherche de tendances", desc:"Tavily scanne le web chaque semaine pour trouver les sujets qui intéressent votre audience." },
                    { icon:"✍️", title:"Textes générés par IA", desc:"Contenu en français, adapté au contexte béninois et au ton de votre marque." },
                    { icon:"🎨", title:"Visuels avec texte français", desc:"Flyers et images générés par IA avec texte lisible en français — qualité pro." },
                    { icon:"📅", title:"Planning automatique", desc:"Publication Lundi, Mercredi, Vendredi à 9h — sans intervention de votre part." },
                    { icon:"📈", title:"Rapport de performance", desc:"Suivez les statistiques de vos publications depuis un tableau de bord simple." },
                    { icon:"🌍", title:"100% local", desc:"Contenu pensé pour le marché béninois, les références culturelles et les tendances africaines." },
                  ].map((f,i) => (
                    <div key={i} style={{ background: darkMode ? "rgba(255,255,255,0.025)" : "#F8F6F2", border: darkMode ? "1px solid rgba(0,200,255,0.08)" : "1px solid rgba(0,180,230,0.15)", borderRadius:14, padding:"16px 14px" }}>
                      <div style={{ fontSize:20, marginBottom:8 }}>{f.icon}</div>
                      <div style={{ fontSize:13, fontWeight:700, color:textPri, marginBottom:5 }}>{f.title}</div>
                      <div style={{ fontSize:12, color:"#64748b", lineHeight:1.6 }}>{f.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Workflow CM */}
                <div style={{ background:"rgba(0,0,0,0.3)", borderTop:"1px solid rgba(0,200,255,0.08)", padding:"18px 0 20px", display:"flex", alignItems:"center", justifyContent:"center", gap:0, flexWrap:"wrap" }}>
                  {[
                    { label:"Tendances web", icon:"🔍", color:"#00C8FF" },
                    { label:"Texte IA", icon:"✍️", color:"#00C8FF" },
                    { label:"Visuel généré", icon:"🎨", color:"#A855F7" },
                    { label:"Publication Facebook", icon:"📘", color:"#00C8FF" },
                    { label:"Rapport stats", icon:"📈", color:"#00FFB4" },
                  ].map((step, i, arr) => (
                    <div key={i} style={{ display:"flex", alignItems:"center" }}>
                      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, padding:"0 10px" }}>
                        <div style={{ width:36, height:36, borderRadius:"50%", background:`${step.color}15`, border:`1px solid ${step.color}40`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>{step.icon}</div>
                        <span style={{ fontSize:10, color:"#475569", textAlign:"center", maxWidth:70, lineHeight:1.3 }}>{step.label}</span>
                      </div>
                      {i < arr.length-1 && <div style={{ color:"rgba(0,200,255,0.25)", fontSize:16, flexShrink:0 }}>→</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMMENT ÇA MARCHE ─── */}
      <section id="comment" style={{ padding:"80px 20px", background: darkMode ? "linear-gradient(180deg,#050810,#070d1a)" : "#EAE6DF" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div data-observe id="how-h" style={{ textAlign:"center", marginBottom:56, opacity:v("how-h")?1:0, transform:v("how-h")?"none":"translateY(24px)", transition:"all 0.7s" }}>
            <div style={labelStyle}>Processus</div>
            <h2 style={h2Style}>Opérationnel en 72h</h2>
            <p style={subStyle}>Pas de code, pas de prise de tête. On s'occupe de tout.</p>
          </div>
          <div className="steps-layout">
            {/* Steps list */}
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {STEPS.map((s, i) => (
                <button key={i} onClick={() => setActiveStep(i)} style={{ background: activeStep===i ? "rgba(0,255,180,0.08)" : (darkMode ? "rgba(255,255,255,0.02)" : "#fff"), border:`1px solid ${activeStep===i ? "rgba(0,255,180,0.25)" : (darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)")}`, borderRadius:16, boxShadow: (darkMode || activeStep===i) ? "none" : "0 2px 8px rgba(0,0,0,0.04)", padding:"18px 20px", cursor:"pointer", textAlign:"left", fontFamily:"inherit", transition:"all 0.3s", display:"flex", alignItems:"flex-start", gap:16 }}>
                  <div style={{ fontSize:28, fontWeight:900, color: activeStep===i ? "#00FFB4" : "rgba(255,255,255,0.1)", letterSpacing:"-1px", lineHeight:1, flexShrink:0, transition:"color 0.3s" }}>{s.n}</div>
                  <div>
                    <div style={{ fontSize:15, fontWeight:700, color: activeStep===i ? (darkMode ? "#fff" : "#0f172a") : "#94a3b8", marginBottom:4, transition:"color 0.3s" }}>{s.icon} {s.title}</div>
                    {activeStep === i && <div style={{ fontSize:13, color:"#64748b", lineHeight:1.65, animation:"fadeUp 0.3s ease" }}>{s.desc}</div>}
                  </div>
                </button>
              ))}
            </div>
            {/* Visual mockup */}
            <div style={{ background: darkMode ? "rgba(255,255,255,0.02)" : "#fff", border: darkMode ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)", borderRadius:20, padding:32, boxShadow: darkMode ? "none" : "0 4px 20px rgba(0,0,0,0.05)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:280 }}>
              <div style={{ fontSize:64, marginBottom:20, animation:"fadeUp 0.4s ease" }}>{STEPS[activeStep].icon}</div>
              <h3 style={{ fontSize:20, fontWeight:800, color:"#fff", textAlign:"center", marginBottom:12, letterSpacing:"-0.5px" }}>{STEPS[activeStep].title}</h3>
              <p style={{ fontSize:13, color:"#64748b", textAlign:"center", lineHeight:1.7, maxWidth:260, animation:"fadeUp 0.4s ease" }}>{STEPS[activeStep].desc}</p>
              <div style={{ display:"flex", gap:8, marginTop:24 }}>
                {STEPS.map((_,i) => (
                  <div key={i} style={{ width: activeStep===i ? 20 : 6, height:6, borderRadius:3, background: activeStep===i ? "#00FFB4" : "rgba(255,255,255,0.15)", transition:"all 0.3s" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TARIFS ─── */}
      <section id="tarifs" style={{ padding:"80px 20px", background:bg }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div data-observe id="prix-h" style={{ textAlign:"center", marginBottom:48, opacity:v("prix-h")?1:0, transform:v("prix-h")?"none":"translateY(24px)", transition:"all 0.7s" }}>
            <div style={labelStyle}>Tarifs</div>
            <h2 style={h2Style}>Des prix adaptés au marché local</h2>
            <p style={subStyle}>Abonnements mensuels. Sans engagement. Résiliable à tout moment.</p>
          </div>
          <div className="three-col-grid" style={{ alignItems:"start" }}>
            {[
              { name:"Alex Agent", oldPrice:"50 000", price:"25 000", unit:"FCFA/mois", desc:"Pour les commerces et PME qui veulent automatiser leur service client WhatsApp.", features:["Agent WhatsApp personnalisé","Qualification de prospects","Relances automatiques","Rapport quotidien","Support technique inclus"], cta:"Démarrer avec Alex", accent:"#00FFB4", pop:false, id:"t1" },
              { name:"Community Manager IA", oldPrice:"75 000", price:"35 000", unit:"FCFA/mois", desc:"Pour les marques qui veulent une présence Facebook active sans effort.", features:["3 publications/semaine","Visuels générés par IA","Textes adaptés contexte local","Recherche de tendances auto","Rapport de performance"], cta:"Démarrer le CM IA", accent:"#00C8FF", pop:false, id:"t2" },
              { name:"Pack Complet", oldPrice:"110 000", price:"50 000", unit:"FCFA/mois", desc:"Les deux solutions pour une automatisation totale de votre présence digitale.", features:["Alex Agent WhatsApp","Community Manager IA","Tableau de bord unifié","Support prioritaire 24/7","Économisez 15 000 FCFA/mois"], cta:"Obtenir le Pack", accent:"#FFB400", pop:true, id:"t3" },
            ].map((t, i) => (
              <div key={i} data-observe id={t.id} style={{ background: t.pop ? `linear-gradient(145deg,${t.accent}08,#070d1a)` : "rgba(255,255,255,0.025)", border:`1px solid ${t.pop ? t.accent : t.accent+"22"}`, borderRadius:20, padding:"28px 24px", position:"relative", opacity:v(t.id)?1:0, transform:v(t.id)?"none":"translateY(36px)", transition:`all 0.7s ease ${i*0.12}s` }}>
                {t.pop && <div style={{ position:"absolute", top:-13, left:"50%", transform:"translateX(-50%)", background:t.accent, color:"#050810", padding:"4px 16px", borderRadius:20, fontSize:11, fontWeight:700, whiteSpace:"nowrap" }}>⭐ Le plus populaire</div>}
                <h3 style={{ fontSize:17, fontWeight:700, color:t.accent, marginBottom:14 }}>{t.name}</h3>
                <div style={{ marginBottom:14 }}>
                  <div style={{ fontSize:13, color:"#475569", textDecoration:"line-through", marginBottom:4 }}>{t.oldPrice} {t.unit}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:32, fontWeight:900, color: darkMode ? "#fff" : "#0f172a", letterSpacing:"-2px" }}>{t.price}</span>
                    <span style={{ fontSize:13, color:"#64748b" }}>{t.unit}</span>
                    <span style={{ fontSize:11, background:"rgba(0,255,180,0.1)", color:"#00FFB4", border:"1px solid rgba(0,255,180,0.2)", borderRadius:20, padding:"2px 8px", fontWeight:700 }}>-50%</span>
                  </div>
                </div>
                <p style={{ fontSize:13, color:"#64748b", lineHeight:1.65, marginBottom:20 }}>{t.desc}</p>
                <ul style={{ listStyle:"none", padding:0, margin:"0 0 24px", display:"flex", flexDirection:"column", gap:9 }}>
                  {t.features.map(f => (
                    <li key={f} style={{ display:"flex", alignItems:"center", gap:9, fontSize:13, color:"#94a3b8" }}>
                      <span style={{ width:6, height:6, borderRadius:"50%", background:t.accent, flexShrink:0 }} />{f}
                    </li>
                  ))}
                </ul>
                <a href={`https://wa.me/${WA_NUMBER}`} style={{ display:"block", textAlign:"center", background:`linear-gradient(135deg,${t.accent},${t.accent}AA)`, color:"#050810", padding:"12px", borderRadius:12, fontSize:14, fontWeight:700, textDecoration:"none" }}>{t.cta}</a>
              </div>
            ))}
          </div>
          <p style={{ textAlign:"center", color:"#475569", fontSize:13, marginTop:32 }}>📞 Hésitations ? La consultation est gratuite — <a href={`https://wa.me/${WA_NUMBER}`} style={{ color:"#00FFB4", textDecoration:"none" }}>contactez-nous sur WhatsApp</a></p>
        </div>
      </section>

      {/* ─── TÉMOIGNAGES ─── */}
      <section id="temoignages" style={{ padding:"80px 0 80px", background: darkMode ? "linear-gradient(180deg,#050810,#070d1a)" : "#EAE6DF", overflow:"hidden" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 20px" }}>
          <div data-observe id="testi-h" style={{ textAlign:"center", marginBottom:48, opacity:v("testi-h")?1:0, transform:v("testi-h")?"none":"translateY(24px)", transition:"all 0.7s" }}>
            <div style={labelStyle}>Témoignages</div>
            <h2 style={h2Style}>Ils nous font confiance</h2>
            <p style={subStyle}>Des entreprises béninoises qui ont automatisé avec DHA.</p>
          </div>
        </div>
        <TestimonialsScroll />
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" style={{ padding:"80px 20px", background:bg }}>
        <div style={{ maxWidth:720, margin:"0 auto" }}>
          <div data-observe id="faq-h" style={{ textAlign:"center", marginBottom:48, opacity:v("faq-h")?1:0, transform:v("faq-h")?"none":"translateY(24px)", transition:"all 0.7s" }}>
            <div style={labelStyle}>FAQ</div>
            <h2 style={h2Style}>Vous avez des questions ?</h2>
            <p style={subStyle}>On vous répond ici.</p>
          </div>
          <div data-observe id="faq-list" style={{ opacity:v("faq-list")?1:0, transform:v("faq-list")?"none":"translateY(24px)", transition:"all 0.7s 0.1s" }}>
            <FAQ />
          </div>
        </div>
      </section>

      {/* ─── FOOTER CTA ─── */}
      <section style={{ padding:"80px 20px", position:"relative", overflow:"hidden", textAlign:"center", background: darkMode ? "linear-gradient(180deg,#070d1a,#030609)" : "#EAE6DF" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"70vw", maxWidth:600, height:300, background:"radial-gradient(ellipse,rgba(0,255,180,0.07) 0%,transparent 70%)", filter:"blur(50px)" }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <h2 style={{ fontSize:"clamp(28px,6vw,50px)", fontWeight:900, letterSpacing:"-2px", color:textPri, margin:"0 0 14px" }}>Prêt à automatiser ?</h2>
          <p style={{ fontSize:15, color:"#64748b", marginBottom:36, maxWidth:440, margin:"0 auto 36px" }}>Rejoignez les entreprises béninoises qui font confiance à l'IA pour grandir.</p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <a href={`https://wa.me/${WA_NUMBER}`} style={{ background:"linear-gradient(135deg,#00FFB4,#00C8FF)", color:"#050810", padding:"14px 30px", borderRadius:12, fontSize:15, fontWeight:700, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8, boxShadow:"0 0 40px rgba(0,255,180,0.2)" }}>
              💬 Contactez-nous sur WhatsApp
            </a>
            <button onClick={() => scrollTo("demo")} style={{ background:"rgba(255,255,255,0.05)", color:"#e2e8f0", border:"1px solid rgba(255,255,255,0.1)", padding:"14px 30px", borderRadius:12, fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
              🤖 Tester Alex d'abord
            </button>
          </div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:20, marginTop:32, flexWrap:"wrap" }}>
            {["✅ Consultation gratuite","✅ Sans engagement","✅ Support inclus"].map(t => (
              <span key={t} style={{ fontSize:13, color:"#475569" }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop:`1px solid ${border}`, padding:"40px 20px", textAlign:"center", background: darkMode ? "transparent" : "#f1f5f9" }}>
        <div style={{ fontSize:20, fontWeight:900, color:textPri, letterSpacing:"-0.5px", marginBottom:14 }}><span style={{ color:"#00FFB4" }}>D</span>HA</div>
        <div style={{ display:"flex", justifyContent:"center", gap:20, marginBottom:16, flexWrap:"wrap" }}>
          {pageLinks.map(({ to, label, emoji }) => (
            <Link key={to} to={to} style={{ fontSize:13, color:textSec, textDecoration:"none", display:"flex", alignItems:"center", gap:5 }}>{emoji} {label}</Link>
          ))}
        </div>
        <p style={{ fontSize:13, color: darkMode ? "#334155" : "#94a3b8" }}>Digital Horizon Agency · Cotonou, Bénin · © 2025 DHA</p>
      </footer>

      <FloatingWidget />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════ */
const labelStyle = { display:"inline-block", background:"rgba(0,255,180,0.07)", border:"1px solid rgba(0,255,180,0.18)", borderRadius:20, padding:"5px 14px", fontSize:11, color:"#00FFB4", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:14 };
// h2Style moved to inline with textPri
const subStyle  = { fontSize:15, color:"#64748b", maxWidth:480, margin:"0 auto", lineHeight:1.7 };

/* ══════════════════════════════════════════════════════
   CSS
══════════════════════════════════════════════════════ */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body { background:#050810; -webkit-font-smoothing:antialiased; }

  @keyframes blink      { 0%,100%{opacity:.35} 50%{opacity:1} }
  @keyframes wordIn     { from{opacity:0;transform:translateY(28px) skewY(4deg)} to{opacity:1;transform:translateY(0) skewY(0)} }
  @keyframes wordOut    { from{opacity:1;transform:translateY(0) skewY(0)} to{opacity:0;transform:translateY(-24px) skewY(-3deg)} }
  @keyframes sparkle    { 0%,100%{opacity:0;transform:scale(0) rotate(0deg)} 20%{opacity:1;transform:scale(1.2) rotate(15deg)} 50%{opacity:.8;transform:scale(0.9) rotate(-10deg)} 80%{opacity:.3;transform:scale(1.1) rotate(20deg)} }
  @keyframes fadeUp     { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideUp    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes typeBounce { 0%,80%,100%{transform:scale(0.6);opacity:.4} 40%{transform:scale(1);opacity:1} }
  @keyframes scrollLeft { from{transform:translateX(0)} to{transform:translateX(-50%)} }

  input::placeholder { color:#334155; }
  input:focus { border-color:rgba(0,255,180,0.3) !important; }
  ::-webkit-scrollbar { width:4px; height:4px; }
  ::-webkit-scrollbar-thumb { background:rgba(0,255,180,0.15); border-radius:4px; }

  .feat6-grid   { display:grid; grid-template-columns:1fr; gap:12px; }
  .three-col-grid { display:grid; grid-template-columns:1fr; gap:20px; }
  .feat-grid      { display:grid; grid-template-columns:1fr; gap:14px; }
  .steps-layout   { display:grid; grid-template-columns:1fr; gap:20px; }

  .desk-nav { display:none !important; }
  .burger   { display:block !important; }

  @media(min-width:600px) {
    .two-col-grid  { grid-template-columns:repeat(2,1fr); }
    .feat-grid     { grid-template-columns:repeat(2,1fr); }
    .three-col-grid{ grid-template-columns:repeat(2,1fr); }
    .feat6-grid    { grid-template-columns:repeat(2,1fr); }
  }
  @media(min-width:900px) {
    .desk-nav      { display:flex !important; }
    .burger        { display:none !important; }
    .three-col-grid{ grid-template-columns:repeat(3,1fr); }
    .feat-grid     { grid-template-columns:repeat(4,1fr); }
    .steps-layout  { grid-template-columns:1fr 1fr; gap:28px; align-items:start; }
    .feat6-grid    { grid-template-columns:repeat(3,1fr); }
  }

  button:hover { opacity:.85; }
  a:hover      { opacity:.85; }
`;
