import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   ALEX PROMPT SYSTEM
═══════════════════════════════════════════ */
const ALEX_SYSTEM = `Tu es Alex, l'agent commercial IA de Digital Horizon Agency (DHA), une agence d'automatisation IA basée à Cotonou, Bénin.

Ton rôle : présenter les produits DHA, répondre aux questions, qualifier les prospects et les inviter à contacter l'équipe.

PRODUITS DHA :
1. Alex Agent (Produit 1) — Agent WhatsApp IA pour service client automatisé. Prix : 50 000 FCFA/mois. Fonctionnalités : réponses automatiques 24/7, qualification de prospects, relance après 1h, rapport quotidien Telegram, base de connaissance personnalisée.
2. Community Manager IA (Produit 2) — Publication automatique Facebook 3x/semaine. Prix : 75 000 FCFA/mois. Fonctionnalités : recherche de tendances, génération texte + visuels IA, publication Lun/Mer/Ven à 9h.
3. Pack Complet — Les deux produits combinés. Prix : 110 000 FCFA/mois (économie de 15 000 FCFA).

RÈGLES DE COMPORTEMENT :
- Réponds toujours en français, de manière chaleureuse et professionnelle
- Sois concis (2-4 phrases max par réponse)
- Si le visiteur semble intéressé, propose-lui de contacter l'équipe sur WhatsApp
- Ne parle pas d'autres sujets que DHA et l'automatisation IA
- Utilise occasionnellement des emojis adaptés au contexte africain
- Pour les prix, utilise toujours FCFA
- Si on te demande qui t'a créé, dis que tu es l'assistant IA de DHA`;

/* ═══════════════════════════════════════════
   API CALL
═══════════════════════════════════════════ */
async function callAlex(messages) {

  const res = await fetch(

    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AQ.Ab8RN6Je44Ygs4O6pW2hswyiAGnLPOkoL4PDx7ow7CJ2Bk_ytw`,

    {

      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({

        system_instruction: { parts: [{ text: ALEX_SYSTEM }] },

        contents: messages.map(m => ({

          role: m.role === "assistant" ? "model" : "user",

          parts: [{ text: m.content }]

        }))

      }),

    }

  );

  const data = await res.json();

  return data.candidates?.[0]?.content?.parts?.[0]?.text || "Erreur, réessayez 🙏";

}
  const data = await res.json();
  return data.content?.[0]?.text || "Je suis désolé, une erreur s'est produite.";
}

/* ═══════════════════════════════════════════
   LIVE CHAT COMPONENT (réutilisable)
═══════════════════════════════════════════ */
function LiveChat({ compact = false }) {
  const [msgs, setMsgs]       = useState([{ role:"assistant", text:"Bonjour 👋 Je suis Alex, l'assistant IA de DHA. Comment puis-je vous aider aujourd'hui ?" }]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef             = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs, loading]);

  const send = async () => {
    const txt = input.trim();
    if (!txt || loading) return;
    const userMsg = { role:"user", text:txt };
    setMsgs(p => [...p, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const history = [...msgs, userMsg]
        .filter(m => m.role !== "assistant" || msgs.indexOf(m) > 0)
        .map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }));
      const reply = await callAlex(history);
      setMsgs(p => [...p, { role:"assistant", text:reply }]);
    } catch {
      setMsgs(p => [...p, { role:"assistant", text:"Une erreur s'est produite. Réessayez dans un instant 🙏" }]);
    }
    setLoading(false);
  };

  const onKey = e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } };

  const h = compact ? 320 : 420;

  return (
    <div style={{ display:"flex", flexDirection:"column", height:h, background:"rgba(255,255,255,0.02)", borderRadius: compact ? "0 0 20px 20px" : 20, overflow:"hidden" }}>
      {/* Messages */}
      <div style={{ flex:1, overflowY:"auto", padding:"14px 14px 8px", display:"flex", flexDirection:"column", gap:10, scrollbarWidth:"thin", scrollbarColor:"rgba(0,255,180,0.2) transparent" }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display:"flex", justifyContent: m.role==="assistant" ? "flex-start" : "flex-end" }}>
            {m.role === "assistant" && (
              <div style={{ width:26, height:26, borderRadius:"50%", background:"linear-gradient(135deg,#00FFB4,#00C8FF)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, color:"#050810", fontSize:11, flexShrink:0, marginRight:8, marginTop:2 }}>A</div>
            )}
            <div style={{
              maxWidth:"78%", padding:"10px 13px", fontSize:13, lineHeight:1.6, fontWeight:500,
              background: m.role==="assistant" ? "rgba(0,255,180,0.08)" : "linear-gradient(135deg,#00FFB4,#00C8FF)",
              color: m.role==="assistant" ? "#e2e8f0" : "#050810",
              borderRadius: m.role==="assistant" ? "4px 18px 18px 18px" : "18px 4px 18px 18px",
              border: m.role==="assistant" ? "1px solid rgba(0,255,180,0.12)" : "none",
            }}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display:"flex", justifyContent:"flex-start", alignItems:"center", gap:8 }}>
            <div style={{ width:26, height:26, borderRadius:"50%", background:"linear-gradient(135deg,#00FFB4,#00C8FF)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, color:"#050810", fontSize:11, flexShrink:0 }}>A</div>
            <div style={{ background:"rgba(0,255,180,0.08)", border:"1px solid rgba(0,255,180,0.12)", borderRadius:"4px 18px 18px 18px", padding:"12px 16px", display:"flex", gap:4 }}>
              {[0,0.2,0.4].map((d,i) => <span key={i} className="typing-dot" style={{ animationDelay:`${d}s` }}>●</span>)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding:"10px 12px", borderTop:"1px solid rgba(255,255,255,0.05)", display:"flex", gap:8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="Écrivez votre message..."
          style={{ flex:1, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, padding:"10px 13px", fontSize:13, color:"#e2e8f0", outline:"none", fontFamily:"inherit" }}
        />
        <button onClick={send} disabled={loading || !input.trim()} style={{ background: input.trim() ? "linear-gradient(135deg,#00FFB4,#00C8FF)" : "rgba(255,255,255,0.06)", color: input.trim() ? "#050810" : "#475569", border:"none", borderRadius:10, width:40, height:40, fontSize:16, cursor: input.trim() ? "pointer" : "default", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}>
          ➤
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FLOATING WIDGET
═══════════════════════════════════════════ */
function FloatingWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position:"fixed", bottom:24, right:20, zIndex:200 }}>
      {open && (
        <div style={{ position:"absolute", bottom:64, right:0, width:"min(340px, calc(100vw - 40px))", background:"#070d1a", border:"1px solid rgba(0,255,180,0.15)", borderRadius:20, boxShadow:"0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,255,180,0.05)", overflow:"hidden", animation:"slideUp 0.25s ease" }}>
          {/* Header */}
          <div style={{ background:"rgba(0,255,180,0.07)", borderBottom:"1px solid rgba(255,255,255,0.06)", padding:"12px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#00FFB4,#00C8FF)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, color:"#050810", fontSize:13 }}>A</div>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:"#fff" }}>Alex · Agent DHA</div>
                <div style={{ fontSize:11, color:"#00FFB4", display:"flex", alignItems:"center", gap:4 }}>
                  <span style={{ width:5, height:5, background:"#00FFB4", borderRadius:"50%", display:"inline-block", animation:"blink 2s infinite" }} />En ligne
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background:"none", border:"none", color:"#64748b", fontSize:18, cursor:"pointer", lineHeight:1 }}>✕</button>
          </div>
          <LiveChat compact={true} />
        </div>
      )}

      {/* Bubble button */}
      <button onClick={() => setOpen(!open)} style={{ width:54, height:54, borderRadius:"50%", background:"linear-gradient(135deg,#00FFB4,#00C8FF)", border:"none", cursor:"pointer", fontSize:22, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 20px rgba(0,255,180,0.4)", transition:"transform 0.2s", transform: open ? "scale(0.92)" : "scale(1)" }}>
        {open ? "✕" : "💬"}
      </button>

      {!open && (
        <div style={{ position:"absolute", bottom:62, right:0, background:"#070d1a", border:"1px solid rgba(0,255,180,0.2)", borderRadius:"12px 12px 4px 12px", padding:"8px 12px", fontSize:12, color:"#e2e8f0", whiteSpace:"nowrap", boxShadow:"0 4px 20px rgba(0,0,0,0.4)", animation:"slideUp 0.3s ease" }}>
          💬 Parlez à Alex, notre IA
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   STATIC COMPONENTS
═══════════════════════════════════════════ */
const SectionHeader = ({ label, title, sub, visible }) => (
  <div style={{ textAlign:"center", marginBottom:48, opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(28px)", transition:"all 0.7s ease" }}>
    <div style={{ display:"inline-block", background:"rgba(0,255,180,0.08)", border:"1px solid rgba(0,255,180,0.2)", borderRadius:20, padding:"5px 14px", fontSize:11, color:"#00FFB4", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:14 }}>{label}</div>
    <h2 style={{ fontSize:"clamp(26px,5vw,44px)", fontWeight:800, letterSpacing:"-1.5px", color:"#fff", margin:"0 0 14px", lineHeight:1.15 }}>{title}</h2>
    <p style={{ fontSize:15, color:"#64748b", maxWidth:480, margin:"0 auto", lineHeight:1.7 }}>{sub}</p>
  </div>
);

const ProductCard = ({ icon, name, tag, desc, features, accent, visible, delay }) => (
  <div className="card-hover" style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${accent}22`, borderRadius:20, padding:"28px 24px", opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(36px)", transition:`all 0.7s ease ${delay}s` }}>
    <div style={{ width:48, height:48, borderRadius:13, background:`${accent}15`, border:`1px solid ${accent}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:18 }}>{icon}</div>
    <div style={{ fontSize:10, letterSpacing:"1.2px", textTransform:"uppercase", color:accent, fontWeight:700, marginBottom:6 }}>{tag}</div>
    <h3 style={{ fontSize:22, fontWeight:800, letterSpacing:"-0.8px", color:accent, margin:"0 0 12px" }}>{name}</h3>
    <p style={{ fontSize:13, color:"#94a3b8", lineHeight:1.75, marginBottom:20 }}>{desc}</p>
    <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:9 }}>
      {features.map(f=>(
        <li key={f} style={{ display:"flex", alignItems:"center", gap:9, fontSize:13, color:"#94a3b8" }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:accent, flexShrink:0 }} />{f}
        </li>
      ))}
    </ul>
  </div>
);

const StepCard = ({ n, title, desc, icon, visible, delay }) => (
  <div className="card-hover" style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:18, padding:"24px 20px", opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(28px)", transition:`all 0.6s ease ${delay}s` }}>
    <div style={{ fontSize:40, fontWeight:900, color:"rgba(0,255,180,0.1)", lineHeight:1, marginBottom:10, letterSpacing:"-2px" }}>{n}</div>
    <div style={{ fontSize:26, marginBottom:12 }}>{icon}</div>
    <h3 style={{ fontSize:16, fontWeight:700, color:"#fff", margin:"0 0 8px" }}>{title}</h3>
    <p style={{ fontSize:13, color:"#64748b", lineHeight:1.7 }}>{desc}</p>
  </div>
);

const PricingCard = ({ name, price, unit, desc, features, cta, accent, featured, visible, delay }) => (
  <div className="card-hover" style={{ background: featured ? `linear-gradient(145deg,${accent}0D,#070d1a)` : "rgba(255,255,255,0.03)", border:`1px solid ${featured ? accent : accent+"22"}`, borderRadius:20, padding:"32px 24px", position:"relative", opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(36px)", transition:`all 0.7s ease ${delay}s` }}>
    {featured && <div style={{ position:"absolute", top:-13, left:"50%", transform:"translateX(-50%)", background:accent, color:"#050810", padding:"4px 16px", borderRadius:20, fontSize:11, fontWeight:700, whiteSpace:"nowrap" }}>⭐ Populaire</div>}
    <h3 style={{ fontSize:17, fontWeight:700, color:accent, marginBottom:14 }}>{name}</h3>
    <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:14 }}>
      <span style={{ fontSize:34, fontWeight:900, color:"#fff", letterSpacing:"-2px" }}>{price}</span>
      <span style={{ fontSize:13, color:"#64748b" }}>{unit}</span>
    </div>
    <p style={{ fontSize:13, color:"#64748b", lineHeight:1.65, marginBottom:20 }}>{desc}</p>
    <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:9 }}>
      {features.map(f=>(
        <li key={f} style={{ display:"flex", alignItems:"center", gap:9, fontSize:13, color:"#94a3b8" }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:accent, flexShrink:0 }} />{f}
        </li>
      ))}
    </ul>
    <button style={{ width:"100%", border:"none", padding:13, borderRadius:12, fontSize:14, fontWeight:700, cursor:"pointer", marginTop:24, background:`linear-gradient(135deg,${accent},${accent}AA)`, color:"#050810", fontFamily:"inherit" }}>{cta}</button>
  </div>
);

const TestimonialCard = ({ name, role, text, avatar, accent, visible, delay }) => (
  <div className="card-hover" style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:20, padding:"28px 24px", opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(28px)", transition:`all 0.6s ease ${delay}s` }}>
    <div style={{ fontSize:44, color:"rgba(0,255,180,0.15)", lineHeight:1, marginBottom:14, fontFamily:"Georgia,serif" }}>"</div>
    <p style={{ fontSize:13, color:"#94a3b8", lineHeight:1.8, marginBottom:22, fontStyle:"italic" }}>{text}</p>
    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
      <div style={{ width:38, height:38, borderRadius:"50%", background:`${accent}22`, color:accent, border:`1px solid ${accent}44`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:15, flexShrink:0 }}>{avatar}</div>
      <div>
        <div style={{ fontSize:13, fontWeight:700, color:accent }}>{name}</div>
        <div style={{ fontSize:11, color:"#475569", marginTop:2 }}>{role}</div>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   MAIN
═══════════════════════════════════════════ */
export default function DHASite() {
  const [scrollY, setScrollY]   = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible]   = useState(new Set());

  useEffect(()=>{
    const onScroll = ()=>setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return ()=>window.removeEventListener("scroll", onScroll);
  },[]);

  useEffect(()=>{
    const obs = new IntersectionObserver(
      entries=>entries.forEach(e=>{ if(e.isIntersecting) setVisible(p=>new Set([...p,e.target.id])); }),
      { threshold:0.08 }
    );
    document.querySelectorAll("section[id]").forEach(s=>obs.observe(s));
    return ()=>obs.disconnect();
  },[]);

  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMenuOpen(false); };
  const vis = id => visible.has(id);

  return (
    <div style={{ fontFamily:"'Sora','DM Sans',sans-serif", background:"#050810", color:"#e2e8f0", overflowX:"hidden" }}>
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background: scrollY>50?"rgba(5,8,16,0.96)":"transparent", backdropFilter:scrollY>50?"blur(20px)":"none", borderBottom:scrollY>50?"1px solid rgba(0,255,180,0.07)":"none", transition:"all 0.3s ease" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 20px", height:62, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ fontSize:20, fontWeight:800, color:"#fff", letterSpacing:"-0.5px" }}>
            <span style={{ color:"#00FFB4" }}>D</span>HA
          </div>
          <div className="desktop-nav" style={{ display:"flex", alignItems:"center", gap:4 }}>
            {[["produits","Produits"],["demo","Démo Alex"],["comment","Comment ça marche"],["tarifs","Tarifs"],["temoignages","Témoignages"]].map(([id,label])=>(
              <button key={id} onClick={()=>scrollTo(id)} style={{ background:"none", border:"none", color: id==="demo" ? "#00FFB4" : "#94a3b8", fontSize:13, cursor:"pointer", padding:"8px 12px", borderRadius:8, fontFamily:"inherit", fontWeight: id==="demo" ? 700 : 400 }}>{label}</button>
            ))}
            <button onClick={()=>scrollTo("tarifs")} style={{ background:"linear-gradient(135deg,#00FFB4,#00C8FF)", color:"#050810", border:"none", padding:"9px 18px", borderRadius:10, fontSize:13, fontWeight:700, cursor:"pointer", marginLeft:8, fontFamily:"inherit" }}>Démarrer →</button>
          </div>
          <button className="burger" onClick={()=>setMenuOpen(!menuOpen)} style={{ background:"none", border:"none", color:"#fff", fontSize:22, cursor:"pointer", display:"none" }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div style={{ background:"rgba(5,8,16,0.98)", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
            {[["produits","Produits"],["demo","🤖 Démo Alex"],["comment","Comment ça marche"],["tarifs","Tarifs"],["temoignages","Témoignages"]].map(([id,label])=>(
              <button key={id} onClick={()=>scrollTo(id)} style={{ display:"block", width:"100%", background:"none", border:"none", borderBottom:"1px solid rgba(255,255,255,0.04)", color: id==="demo" ? "#00FFB4" : "#cbd5e1", fontSize:15, padding:"16px 24px", textAlign:"left", cursor:"pointer", fontFamily:"inherit" }}>{label}</button>
            ))}
            <div style={{ padding:"16px 24px" }}>
              <button onClick={()=>scrollTo("tarifs")} style={{ width:"100%", background:"linear-gradient(135deg,#00FFB4,#00C8FF)", color:"#050810", border:"none", padding:"13px", borderRadius:12, fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Démarrer →</button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={{ minHeight:"100svh", padding:"80px 20px 60px", position:"relative", overflow:"hidden", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(0,255,180,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,180,0.025) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />
        <div style={{ position:"absolute", top:"5%", left:"-10%", width:400, height:400, background:"radial-gradient(circle,rgba(0,255,180,0.09) 0%,transparent 70%)", filter:"blur(50px)", borderRadius:"50%" }} />
        <div style={{ position:"absolute", bottom:"5%", right:"-10%", width:350, height:350, background:"radial-gradient(circle,rgba(0,200,255,0.08) 0%,transparent 70%)", filter:"blur(50px)", borderRadius:"50%" }} />

        <div className="hero-inner" style={{ position:"relative", zIndex:1, width:"100%", maxWidth:1100, display:"flex", flexDirection:"column", alignItems:"center", gap:48 }}>
          <div style={{ maxWidth:560, textAlign:"center" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(0,255,180,0.08)", border:"1px solid rgba(0,255,180,0.2)", borderRadius:20, padding:"6px 14px", fontSize:11, color:"#00FFB4", marginBottom:22 }}>
              <span style={{ width:6, height:6, background:"#00FFB4", borderRadius:"50%", animation:"blink 2s infinite" }} />
              Agence IA · Cotonou, Bénin
            </div>
            <h1 style={{ fontSize:"clamp(34px,8vw,66px)", fontWeight:800, lineHeight:1.08, letterSpacing:"-2px", color:"#fff", margin:"0 0 18px" }}>
              Votre Business,{" "}
              <span style={{ background:"linear-gradient(135deg,#00FFB4,#00C8FF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Automatisé par l'IA</span>
            </h1>
            <p style={{ fontSize:"clamp(14px,3.5vw,17px)", color:"#94a3b8", lineHeight:1.75, marginBottom:32 }}>
              Des agents IA sur mesure pour répondre à vos clients, publier votre contenu et gérer vos prospects — pendant que vous dormez.
            </p>
            <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:36 }}>
              <button onClick={()=>scrollTo("tarifs")} style={{ background:"linear-gradient(135deg,#00FFB4,#00C8FF)", color:"#050810", border:"none", padding:"13px 26px", borderRadius:12, fontSize:15, fontWeight:700, cursor:"pointer", boxShadow:"0 0 30px rgba(0,255,180,0.2)", fontFamily:"inherit" }}>Voir les offres</button>
              <button onClick={()=>scrollTo("demo")} style={{ background:"rgba(0,255,180,0.08)", color:"#00FFB4", border:"1px solid rgba(0,255,180,0.25)", padding:"13px 26px", borderRadius:12, fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>🤖 Tester Alex</button>
            </div>
            <div style={{ display:"flex", gap:28, justifyContent:"center", flexWrap:"wrap" }}>
              {[["24/7","Disponible"],["< 1s","Réponse"],["100%","Local & Sur mesure"]].map(([v,l])=>(
                <div key={l} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
                  <span style={{ fontSize:24, fontWeight:800, color:"#00FFB4", letterSpacing:"-1px" }}>{v}</span>
                  <span style={{ fontSize:11, color:"#64748b" }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DÉMO ALEX (LIVE CHAT) ── */}
      <section id="demo" style={{ padding:"80px 20px", background:"linear-gradient(180deg,#050810 0%,#070d1a 100%)" }}>
        <div style={{ maxWidth:700, margin:"0 auto" }}>
          <SectionHeader label="Démo Live" title="Parlez à Alex maintenant" sub="Testez notre agent IA en temps réel. Posez-lui vos questions sur DHA." visible={vis("demo")} />
          <div style={{ opacity:vis("demo")?1:0, transform:vis("demo")?"translateY(0)":"translateY(30px)", transition:"all 0.7s ease 0.2s" }}>
            {/* Chat header */}
            <div style={{ background:"rgba(0,255,180,0.07)", border:"1px solid rgba(0,255,180,0.12)", borderRadius:"20px 20px 0 0", padding:"14px 18px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#00FFB4,#00C8FF)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, color:"#050810", fontSize:14 }}>A</div>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:"#fff" }}>Alex · Agent Commercial DHA</div>
                  <div style={{ fontSize:11, color:"#00FFB4", display:"flex", alignItems:"center", gap:5 }}>
                    <span style={{ width:5, height:5, background:"#00FFB4", borderRadius:"50%", display:"inline-block", animation:"blink 2s infinite" }} />
                    En ligne — IA propulsée par Claude
                  </div>
                </div>
              </div>
              <div style={{ fontSize:11, color:"#475569", background:"rgba(255,255,255,0.04)", padding:"4px 10px", borderRadius:10 }}>Live Demo</div>
            </div>
            <LiveChat compact={false} />
          </div>
          <p style={{ textAlign:"center", fontSize:12, color:"#334155", marginTop:14 }}>
            💡 Ceci est une démo. Pour votre propre agent Alex configuré pour votre business → <button onClick={()=>scrollTo("tarifs")} style={{ background:"none", border:"none", color:"#00FFB4", fontSize:12, cursor:"pointer", fontFamily:"inherit", textDecoration:"underline" }}>voir les offres</button>
          </p>
        </div>
      </section>

      {/* ── PRODUITS ── */}
      <section id="produits" style={{ padding:"80px 20px", background:"#050810" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SectionHeader label="Nos Produits" title="Deux solutions, un objectif" sub="Automatiser pour vendre plus, sans travailler plus." visible={vis("produits")} />
          <div className="two-col-grid">
            <ProductCard visible={vis("produits")} delay={0}    icon="🤖" name="ALEX" tag="Produit 1 — Agent Commercial" desc="Un agent IA qui répond à vos clients sur WhatsApp 24h/24, qualifie les prospects, envoie les informations produit et alerte votre équipe quand un client est prêt à acheter." features={["Réponses automatiques WhatsApp","Qualification de prospects","Relance automatique après 1h","Rapport quotidien par Telegram","Base de connaissance personnalisée"]} accent="#00FFB4" />
            <ProductCard visible={vis("produits")} delay={0.18} icon="📲" name="Community Manager IA" tag="Produit 2 — Publication Automatique" desc="Votre Community Manager IA publie automatiquement des contenus tendance sur votre page Facebook — 3 fois par semaine, avec texte et visuels générés par IA." features={["Recherche de tendances (Tavily)","Génération de texte & visuels","Publication Lun/Mer/Ven à 9h","Adapté au marché béninois","Zéro intervention manuelle"]} accent="#00C8FF" />
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section id="comment" style={{ padding:"80px 20px", background:"linear-gradient(180deg,#050810 0%,#070d1a 100%)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SectionHeader label="Processus" title="Opérationnel en 72h" sub="Pas de code, pas de prise de tête. On s'occupe de tout." visible={vis("comment")} />
          <div className="four-col-grid">
            {[
              {n:"01",icon:"🎯",title:"Consultation gratuite",desc:"On analyse votre activité, vos clients, et vos besoins. Un appel de 30 min suffit."},
              {n:"02",icon:"⚙️",title:"Configuration sur mesure",desc:"On configure l'agent avec votre catalogue, vos prix, votre ton de communication."},
              {n:"03",icon:"✅",title:"Test & validation",desc:"Vous testez l'agent avant la mise en ligne. On ajuste jusqu'à votre satisfaction."},
              {n:"04",icon:"🚀",title:"Mise en ligne",desc:"Votre agent IA est actif. On reste disponibles pour le support et les évolutions."},
            ].map((s,i)=><StepCard key={i} {...s} visible={vis("comment")} delay={i*0.12} />)}
          </div>
        </div>
      </section>

      {/* ── TARIFS ── */}
      <section id="tarifs" style={{ padding:"80px 20px", background:"#050810" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SectionHeader label="Tarifs" title="Des prix adaptés au marché local" sub="Abonnements mensuels. Sans engagement. Résiliable à tout moment." visible={vis("tarifs")} />
          <div className="three-col-grid" style={{ alignItems:"start" }}>
            <PricingCard visible={vis("tarifs")} delay={0}    name="Alex Agent" price="50 000" unit="FCFA / mois" desc="Pour les commerces et PME qui veulent automatiser leur service client WhatsApp." features={["Agent WhatsApp personnalisé","Qualification de prospects","Relances automatiques","Rapport quotidien","Support technique inclus"]} cta="Démarrer avec Alex" accent="#00FFB4" featured={false} />
            <PricingCard visible={vis("tarifs")} delay={0.15} name="Community Manager IA" price="75 000" unit="FCFA / mois" desc="Pour les marques qui veulent une présence Facebook active sans effort." features={["3 publications/semaine","Visuels générés par IA","Textes adaptés contexte local","Recherche de tendances auto","Rapport de performance"]} cta="Démarrer le CM IA" accent="#00C8FF" featured={false} />
            <PricingCard visible={vis("tarifs")} delay={0.3}  name="Pack Complet" price="110 000" unit="FCFA / mois" desc="Les deux solutions combinées pour une automatisation totale." features={["Alex Agent WhatsApp","Community Manager IA","Tableau de bord unifié","Support prioritaire 24/7","Économisez 15 000 FCFA/mois"]} cta="Obtenir le Pack" accent="#FFB400" featured={true} />
          </div>
          <p style={{ textAlign:"center", color:"#64748b", fontSize:14, marginTop:36 }}>📞 Vous hésitez ? Écrivez-nous sur WhatsApp — la consultation est gratuite.</p>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section id="temoignages" style={{ padding:"80px 20px", background:"linear-gradient(180deg,#050810 0%,#030609 100%)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SectionHeader label="Témoignages" title="Ils nous font confiance" sub="Des entreprises béninoises qui ont automatisé avec DHA." visible={vis("temoignages")} />
          <div className="three-col-grid">
            <TestimonialCard visible={vis("temoignages")} delay={0}    name="Adjoua F." role="Gérante · Boutique Beauté, Cotonou"   text="Depuis qu'on a Alex, je reçois plus les mêmes questions 10 fois par jour. Les clients obtiennent les réponses instantanément et moi je me concentre sur les ventes." avatar="A" accent="#00FFB4" />
            <TestimonialCard visible={vis("temoignages")} delay={0.15} name="Kodjo M."  role="Directeur · Import-Export, Porto-Novo" text="Le rapport quotidien de prospects qualifiés est devenu indispensable. Mon commercial sait exactement qui relancer chaque matin." avatar="K" accent="#00C8FF" />
            <TestimonialCard visible={vis("temoignages")} delay={0.3}  name="Rosine D." role="Fondatrice · Traiteur événementiel"     text="Le Community Manager IA publie pour moi pendant que je travaille. Ma page Facebook n'a jamais été aussi active et mes commandes ont augmenté." avatar="R" accent="#FFB400" />
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section style={{ padding:"80px 20px", position:"relative", overflow:"hidden", textAlign:"center", background:"linear-gradient(180deg,#030609 0%,#050810 100%)" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:500, height:250, background:"radial-gradient(ellipse,rgba(0,255,180,0.06) 0%,transparent 70%)", filter:"blur(40px)" }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <h2 style={{ fontSize:"clamp(26px,6vw,46px)", fontWeight:800, letterSpacing:"-1.5px", color:"#fff", margin:"0 0 14px" }}>Prêt à automatiser ?</h2>
          <p style={{ fontSize:15, color:"#64748b", marginBottom:32 }}>Rejoignez les entreprises béninoises qui font confiance à l'IA pour grandir.</p>
          <a href="https://wa.me/22900000000" style={{ background:"linear-gradient(135deg,#00FFB4,#00C8FF)", color:"#050810", border:"none", padding:"14px 30px", borderRadius:12, fontSize:15, fontWeight:700, cursor:"pointer", textDecoration:"none", display:"inline-block", boxShadow:"0 0 30px rgba(0,255,180,0.2)", fontFamily:"inherit" }}>
            💬 Contactez-nous sur WhatsApp
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:"1px solid rgba(255,255,255,0.05)", padding:"28px 20px", textAlign:"center" }}>
        <div style={{ fontSize:18, fontWeight:800, color:"#fff", marginBottom:8 }}><span style={{ color:"#00FFB4" }}>D</span>HA</div>
        <p style={{ fontSize:13, color:"#475569", margin:"4px 0" }}>Digital Horizon Agency · Cotonou, Bénin</p>
        <p style={{ fontSize:12, color:"#334155", margin:"4px 0" }}>© 2025 DHA. Tous droits réservés.</p>
      </footer>

      {/* ── FLOATING WIDGET ── */}
      <FloatingWidget />
    </div>
  );
}

/* ═══════════════════════════════════════════
   CSS
═══════════════════════════════════════════ */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #050810; -webkit-font-smoothing: antialiased; }

  @keyframes blink     { 0%,100%{opacity:.4} 50%{opacity:1} }
  @keyframes fadeUp    { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes typePulse { 0%,100%{opacity:.3} 50%{opacity:1} }

  .typing-dot { font-size:7px; color:#050810; animation:typePulse 1s infinite; margin:0 1px; }
  .card-hover { transition:transform .25s ease, box-shadow .25s ease !important; }
  .card-hover:hover { transform:translateY(-4px) !important; box-shadow:0 20px 50px rgba(0,0,0,.35) !important; }

  .two-col-grid   { display:grid; grid-template-columns:1fr; gap:20px; }
  .three-col-grid { display:grid; grid-template-columns:1fr; gap:20px; }
  .four-col-grid  { display:grid; grid-template-columns:1fr; gap:16px; }

  .desktop-nav { display:none !important; }
  .burger      { display:block !important; }
  .hero-inner  { flex-direction:column !important; }

  /* Scrollbar chat */
  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:rgba(0,255,180,0.2); border-radius:4px; }

  input::placeholder { color:#475569; }
  input:focus { border-color:rgba(0,255,180,0.3) !important; box-shadow:0 0 0 2px rgba(0,255,180,0.08); }

  @media (min-width:640px) {
    .two-col-grid   { grid-template-columns:repeat(2,1fr); }
    .three-col-grid { grid-template-columns:repeat(2,1fr); }
    .four-col-grid  { grid-template-columns:repeat(2,1fr); }
  }
  @media (min-width:900px) {
    .desktop-nav    { display:flex !important; }
    .burger         { display:none !important; }
    .three-col-grid { grid-template-columns:repeat(3,1fr); }
    .four-col-grid  { grid-template-columns:repeat(4,1fr); }
    .hero-inner     { flex-direction:row !important; align-items:center; }
  }

  button:hover { opacity:.88; }
  a:hover      { opacity:.88; }
`;
