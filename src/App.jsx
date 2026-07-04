import { useState, useEffect, useRef } from "react";
import {
  LightningIcon, TargetIcon, ChartLineUpIcon, GlobeHemisphereWestIcon,
  RobotIcon, DeviceMobileIcon, BellIcon, ClockIcon, BrainIcon, BooksIcon,
  MagnifyingGlassIcon, PencilSimpleIcon, ImageIcon, CalendarCheckIcon,
  ChatCircleTextIcon, WhatsappLogoIcon, PaperPlaneRightIcon, ChecksIcon,
  ArrowRightIcon, PhoneIcon, DotsThreeVerticalIcon, ArrowLeftIcon,
  CaretDownIcon, StarIcon, CheckIcon, LaptopIcon, FacebookLogoIcon,
} from "@phosphor-icons/react";
import { useLang } from "./LangContext";
import { usePageMeta } from "./usePageMeta";

const WA_NUMBER = "2290160008046";

const HERO_BLOCKS = {
  fr: [
    { text:"vos activités",       grad:"var(--grad-primary)" },
    { text:"votre support client",grad:"var(--grad-secondary)" },
    { text:"vos prospections",    grad:"var(--grad-accent)" },
  ],
  en: [
    { text:"your activities",      grad:"var(--grad-primary)" },
    { text:"your customer support",grad:"var(--grad-secondary)" },
    { text:"your prospecting",     grad:"var(--grad-accent)" },
  ],
};

function TestimonialsScroll({ testimonials }) {
  const items = [...testimonials, ...testimonials];
  return (
    <div style={{ position:"relative" }}>
      <div className="testi-track" style={{ display:"flex", gap:20, width:"max-content" }}>
        {items.map((tst, i) => (
          <div key={i} className="glass-card" style={{
            width:320, flexShrink:0, borderRadius:20, padding:"24px 22px"
          }}>
            <p style={{ fontSize:14, color:"var(--ink-soft)", lineHeight:1.7, marginBottom:20, minHeight:95 }}>
              "{tst.text}"
            </p>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{
                width:40, height:40, borderRadius:"50%", background:`${tst.color}18`,
                border:`1px solid ${tst.color}45`, color:tst.color, fontWeight:800,
                fontSize:15, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0
              }}>{tst.avatar}</div>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:"var(--ink)" }}>{tst.name}</div>
                <div style={{ fontSize:11, color:"var(--ink-faint)" }}>{tst.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .testi-track { animation: testiScroll 40s linear infinite; }
        .testi-track:hover { animation-play-state: paused; }
        @keyframes testiScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

function FAQ({ faqs }) {
  const [open, setOpen] = useState(0);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      {faqs.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const btnId = `faq-btn-${i}`;
        return (
          <div key={i} className="glass-card" style={{ borderRadius:16, overflow:"hidden", transition:"box-shadow 0.3s" }}>
            <button
              id={btnId}
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              style={{
              width:"100%", background:"none", border:"none", cursor:"pointer",
              padding:"18px 20px", display:"flex", alignItems:"center", justifyContent:"space-between",
              gap:16, fontFamily:"inherit", textAlign:"left"
            }}>
              <div>
                <div style={{ fontSize:11, color:"var(--indigo)", fontWeight:700, marginBottom:4, letterSpacing:"0.3px" }}>{item.cat}</div>
                <div style={{ fontSize:14, fontWeight:700, color:"var(--ink)" }}>{item.q}</div>
              </div>
              <span style={{
                flexShrink:0, width:26, height:26, borderRadius:"50%",
                background:"rgba(99,102,241,0.08)", display:"flex", alignItems:"center",
                justifyContent:"center", color:"var(--indigo)",
                transform: isOpen ? "rotate(180deg)" : "none", transition:"transform 0.3s"
              }}><CaretDownIcon size={13} weight="bold" /></span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              style={{
              maxHeight: isOpen ? 300 : 0, overflow:"hidden", transition:"max-height 0.35s ease"
            }}>
              <p style={{ padding:"0 20px 20px", fontSize:13, color:"var(--ink-soft)", lineHeight:1.8, margin:0 }}>
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function HeroWord({ lang }) {
  const [active, setActive] = useState(0);
  const blocks = HERO_BLOCKS[lang] || HERO_BLOCKS.fr;
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % blocks.length), 2200);
    return () => clearInterval(t);
  }, [blocks.length]);
  return (
    <span style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10, margin:"14px 0" }}>
      {blocks.map((b, i) => (
        <span key={i} className="glass-card" style={{
          display:"inline-block",
          background: active===i ? b.grad : "rgba(255,255,255,0.35)",
          color: active===i ? "#fff" : "var(--ink-faint)",
          padding:"8px 24px",
          borderRadius:16,
          fontSize:"clamp(24px,6vw,52px)",
          fontWeight:800,
          letterSpacing:"-0.03em",
          lineHeight:1.15,
          transition:"all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: active===i ? "scale(1.05)" : "scale(0.96)",
          border: "1px solid rgba(15,23,42,0.06)",
        }}>
          {b.text}
        </span>
      ))}
    </span>
  );
}

function SparkleText({ text }) {
  return (
    <span style={{ position:"relative", display:"inline-block" }}>
      <span style={{ background:"var(--grad-full)", WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent" }}>{text}</span>
    </span>
  );
}

const T = {
  fr: {
    hero_badge:"Agence IA & Automatisation · Bénin",
    hero_title:"Automatisez",
    hero_sparkle:"avec l'IA",
    hero_sub:"Des agents IA sur mesure pour répondre à vos clients, qualifier vos prospects et publier votre contenu — pendant que vous dormez.",
    hero_cta1:"Démarrer gratuitement",
    hero_cta2:"Tester Alex",
    hero_social:"Utilisé par +50 entreprises béninoises",
    hero_stats:[["24/7","Disponible"],["< 10s","Temps réponse"],["72h","Mise en ligne"],["0 FCFA","Consultation"]],
    features:[
      { Icon:LightningIcon, title:"Réponse en 10 secondes", desc:"Ne laissez plus vos prospects en attente. L'IA répond instantanément, même à 3h du matin." },
      { Icon:TargetIcon, title:"Qualification automatique", desc:"Alex identifie les prospects chauds et vous alerte immédiatement pour les convertir." },
      { Icon:ChartLineUpIcon, title:"Rapport quotidien", desc:"Chaque matin, recevez un récapitulatif complet de toutes les conversations et prospects qualifiés." },
      { Icon:GlobeHemisphereWestIcon, title:"Adapté au marché béninois", desc:"Compréhension du contexte local, des prix en FCFA, et des habitudes de communication africaines." },
    ],
    demo_label:"Démo Interactive",
    demo_title:"Parlez à Alex maintenant",
    demo_sub:"Testez notre agent IA en temps réel. Posez n'importe quelle question sur DHA.",
    demo_disclaimer:"Ceci est une démo. Votre agent sera configuré spécifiquement pour votre business.",
    demo_suggestions:["Voir les prix","Comment ça marche ?","Contacter l'équipe"],
    demo_placeholder:"Posez votre question à Alex...",
    demo_wa_suggestions:["Les prix","Comment ça marche ?","Contacter"],
    demo_wa_placeholder:"Tapez votre message",
    products_label:"Nos Produits",
    products_title:"Deux solutions, un objectif",
    products_sub:"Automatiser pour vendre plus, sans travailler plus.",
    prod1_tag:"Produit 1 · Agent Commercial",
    prod1_desc:"Votre commercial IA disponible 24h/24 sur WhatsApp. Il répond, qualifie, relance et vous rapporte — pendant que vous dormez ou travaillez sur autre chose.",
    prod1_features:[
      { Icon:ChatCircleTextIcon, title:"Réponses instantanées", desc:"Répond à vos clients en moins de 10 secondes, même la nuit et les weekends." },
      { Icon:TargetIcon, title:"Qualification intelligente", desc:"Détecte les prospects chauds et les tague automatiquement dans votre CRM." },
      { Icon:ClockIcon, title:"Relance auto après 1h", desc:"Si un prospect ne répond plus, Alex relance automatiquement au bon moment." },
      { Icon:ChartLineUpIcon, title:"Rapport quotidien WhatsApp", desc:"Chaque matin, vous recevez un résumé complet des prospects et conversations." },
      { Icon:BrainIcon, title:"Mémoire conversationnelle", desc:"Alex se souvient de chaque client et de l'historique de la conversation." },
      { Icon:BooksIcon, title:"Base de connaissance RAG", desc:"Alimenté par vos catalogues, fiches produits, prix et infos — réponses toujours précises." },
    ],
    prod1_workflow:[
      { label:"Client WhatsApp", Icon:DeviceMobileIcon, color:"#06B6D4" },
      { label:"Alex répond", Icon:RobotIcon, color:"#06B6D4" },
      { label:"Prospect qualifié", Icon:TargetIcon, color:"#8B5CF6" },
      { label:"Alerte équipe", Icon:BellIcon, color:"#6366F1" },
      { label:"Rapport quotidien", Icon:ChartLineUpIcon, color:"#22D97A" },
    ],
    prod2_tag:"Produit 2 · Community Manager",
    prod2_desc:"Votre page Facebook toujours active, sans que vous leviez le petit doigt. L'IA recherche les tendances, crée le contenu et publie automatiquement.",
    prod2_features:[
      { Icon:MagnifyingGlassIcon, title:"Recherche de tendances", desc:"Tavily scanne le web chaque semaine pour trouver les sujets qui intéressent votre audience." },
      { Icon:PencilSimpleIcon, title:"Textes générés par IA", desc:"Contenu en français, adapté au contexte béninois et au ton de votre marque." },
      { Icon:ImageIcon, title:"Visuels avec texte français", desc:"Flyers et images générés par IA avec texte lisible en français — qualité pro." },
      { Icon:CalendarCheckIcon, title:"Planning automatique", desc:"Publication Lundi, Mercredi, Vendredi à 9h — sans intervention de votre part." },
      { Icon:ChartLineUpIcon, title:"Rapport de performance", desc:"Suivez les statistiques de vos publications depuis un tableau de bord simple." },
      { Icon:GlobeHemisphereWestIcon, title:"100% local", desc:"Contenu pensé pour le marché béninois, les références culturelles et les tendances africaines." },
    ],
    prod2_workflow:[
      { label:"Tendances web", Icon:MagnifyingGlassIcon, color:"#06B6D4" },
      { label:"Texte IA", Icon:PencilSimpleIcon, color:"#06B6D4" },
      { label:"Visuel généré", Icon:ImageIcon, color:"#8B5CF6" },
      { label:"Publication Facebook", Icon:FacebookLogoIcon, color:"#6366F1" },
      { label:"Rapport stats", Icon:ChartLineUpIcon, color:"#22D97A" },
    ],
    start_btn:"Démarrer",
    process_label:"Processus",
    process_title:"Opérationnel en 72h",
    process_sub:"Pas de code, pas de prise de tête. On s'occupe de tout.",
    steps:[
      { n:"01", Icon:TargetIcon, title:"Consultation gratuite", desc:"On analyse votre activité et vos clients. Un appel de 30 min suffit pour tout comprendre." },
      { n:"02", Icon:BrainIcon, title:"Configuration sur mesure", desc:"On configure Alex avec votre catalogue, vos prix, votre ton. 100% personnalisé pour vous." },
      { n:"03", Icon:CheckIcon, title:"Test & validation", desc:"Vous testez l'agent avant la mise en ligne. On ajuste jusqu'à votre satisfaction totale." },
      { n:"04", Icon:ArrowRightIcon, title:"Mise en ligne en 72h", desc:"Votre agent IA est actif. Support continu pour les évolutions et optimisations." },
    ],
    pricing_label:"Tarifs",
    pricing_title:"Des tarifs adaptés",
    pricing_sub:"Abonnements mensuels. Sans engagement. Résiliable à tout moment.",
    pricing_note:"Hésitations ? La consultation est gratuite —",
    pricing_wa:"contactez-nous sur WhatsApp",
    pricing_cards:[
      { name:"Alex Agent", oldPrice:"50 000", price:"25 000", unit:"FCFA/mois", desc:"Pour les commerces et PME qui veulent automatiser leur service client WhatsApp.", features:["Agent WhatsApp personnalisé","Qualification de prospects","Relances automatiques","Rapport quotidien","Support technique inclus"], cta:"Démarrer avec Alex", accent:"#06B6D4", pop:false },
      { name:"Community Manager IA", oldPrice:"75 000", price:"35 000", unit:"FCFA/mois", desc:"Pour les marques qui veulent une présence Facebook active sans effort.", features:["3 publications/semaine","Visuels générés par IA","Textes adaptés contexte local","Recherche de tendances auto","Rapport de performance"], cta:"Démarrer le CM IA", accent:"#6366F1", pop:false },
      { name:"Pack Complet", oldPrice:"110 000", price:"50 000", unit:"FCFA/mois", desc:"Les deux solutions pour une automatisation totale de votre présence digitale.", features:["Alex Agent WhatsApp","Community Manager IA","Tableau de bord unifié","Support prioritaire 24/7","Économisez 15 000 FCFA/mois"], cta:"Obtenir le Pack", accent:"#8B5CF6", pop:true },
    ],
    reviews_label:"Témoignages",
    reviews_title:"Ils nous font confiance",
    reviews_sub:"Des entreprises béninoises qui ont automatisé avec DHA.",
    testimonials:[
      { name:"Fatou A.", role:"Gérante · Boutique Beauté, Cotonou", text:"Depuis Alex, je reçois plus les mêmes questions 10 fois par jour. Mes clients ont les réponses en secondes.", avatar:"F", color:"#06B6D4" },
      { name:"Kodjo M.", role:"Directeur · Import-Export, Porto-Novo", text:"Le rapport quotidien de prospects qualifiés est indispensable. Mon équipe sait exactement qui relancer chaque matin.", avatar:"K", color:"#6366F1" },
      { name:"Rosine D.", role:"Fondatrice · Traiteur événementiel", text:"Ma page Facebook n'a jamais été aussi active. Le CM IA publie pour moi pendant que je travaille.", avatar:"R", color:"#8B5CF6" },
      { name:"Ibrahim S.", role:"PDG · Pharmacie Centrale, Parakou", text:"En 3 semaines, Alex a géré plus de 400 conversations. Zéro erreur, zéro plainte client. Impressionnant.", avatar:"I", color:"#22D97A" },
      { name:"Aïcha B.", role:"Directrice · Centre de formation", text:"Nos inscriptions ont doublé. Alex répond la nuit quand nous sommes fermés. Nos concurrents ne comprennent pas comment.", avatar:"A", color:"#06B6D4" },
    ],
    faq_label:"FAQ",
    faq_title:"Vous avez des questions ?",
    faq_sub:"On vous répond ici.",
    faqs:[
      { cat:"Investissement", q:"Est-ce que ça vaut vraiment 25 000 FCFA par mois ?", a:"Un commercial humain à Cotonou coûte entre 80 000 et 150 000 FCFA/mois — pour 8h/jour, 5 jours/semaine. Alex travaille 24h/24, 7j/7, répond en moins de 10 secondes et vous envoie un rapport chaque matin. Le calcul est vite fait." },
      { cat:"Technique", q:"Comment Alex connaît mon business ?", a:"Lors de la configuration, on alimente Alex avec tout ce qu'il doit savoir : votre catalogue, vos prix, vos conditions de livraison, vos horaires. Il stocke ces informations dans une base de connaissance intelligente (RAG) et les utilise pour répondre avec précision." },
      { cat:"WhatsApp", q:"Mon numéro WhatsApp risque-t-il d'être banni ?", a:"Non. Alex génère des messages naturels, avec des variations humaines — jamais du copier-coller en masse. Il respecte les fenêtres de 24h de WhatsApp et les règles anti-spam. Aucun de nos clients n'a jamais eu de problème." },
      { cat:"Objections", q:"Mes clients sont-ils prêts à parler à une IA ?", a:"Dans 95% des cas, les clients ne savent même pas qu'ils parlent à une IA — et s'en fichent, du moment qu'ils ont une réponse rapide." },
      { cat:"Local", q:"Est-ce que Alex comprend le contexte béninois ?", a:"Oui. Alex est configuré pour votre marché : il parle en FCFA, connaît Cotonou, Porto-Novo, Parakou, et peut même être configuré pour répondre en Fon ou Yoruba si votre clientèle le nécessite." },
      { cat:"Résultats", q:"Comment je mesure les résultats ?", a:"Chaque matin, vous recevez un rapport avec : nombre de conversations gérées, prospects qualifiés, relances envoyées. Vous avez aussi accès à un tableau de bord Google Sheets mis à jour en temps réel." },
      { cat:"Démarrage", q:"Je ne suis pas tech. Est-ce que je peux vraiment utiliser ça ?", a:"Vous n'avez rien à installer, rien à coder. Vous nous donnez vos infos produits et votre numéro WhatsApp — on fait tout le reste. Si vous savez lire WhatsApp, vous savez utiliser nos produits." },
      { cat:"Flexibilité", q:"Que se passe-t-il si je veux arrêter ?", a:"Aucun engagement. Nos abonnements sont au mois, résiliables à tout moment sans frais. Un message WhatsApp suffit." },
    ],
    cta_title:"Prêt à automatiser ?",
    cta_sub:"Rejoignez les entreprises béninoises qui font confiance à l'IA pour grandir.",
    cta_wa:"Contactez-nous sur WhatsApp",
    cta_demo:"Tester Alex d'abord",
    cta_badges:["Consultation gratuite","Sans engagement","Support inclus"],
  },
  en: {
    hero_badge:"AI & Automation Agency · Benin",
    hero_title:"Automate",
    hero_sparkle:"with AI",
    hero_sub:"Custom AI agents to answer your customers, qualify your leads and publish your content — while you sleep.",
    hero_cta1:"Start for free",
    hero_cta2:"Try Alex",
    hero_social:"Used by 50+ Beninese businesses",
    hero_stats:[["24/7","Available"],["< 10s","Response time"],["72h","Go-live"],["0 FCFA","Consultation"]],
    features:[
      { Icon:LightningIcon, title:"10-second response", desc:"Stop leaving prospects waiting. The AI replies instantly, even at 3am." },
      { Icon:TargetIcon, title:"Automatic qualification", desc:"Alex identifies hot leads and alerts you immediately so you can convert them." },
      { Icon:ChartLineUpIcon, title:"Daily report", desc:"Every morning, get a full recap of all conversations and qualified leads." },
      { Icon:GlobeHemisphereWestIcon, title:"Built for the Beninese market", desc:"Understands local context, FCFA pricing, and African communication habits." },
    ],
    demo_label:"Interactive Demo",
    demo_title:"Talk to Alex now",
    demo_sub:"Test our AI agent in real time. Ask any question about DHA.",
    demo_disclaimer:"This is a demo. Your agent will be configured specifically for your business.",
    demo_suggestions:["See pricing","How does it work?","Contact the team"],
    demo_placeholder:"Ask Alex a question...",
    demo_wa_suggestions:["Pricing","How it works?","Contact"],
    demo_wa_placeholder:"Type your message",
    products_label:"Our Products",
    products_title:"Two solutions, one goal",
    products_sub:"Automate to sell more, without working more.",
    prod1_tag:"Product 1 · Sales Agent",
    prod1_desc:"Your AI salesperson available 24/7 on WhatsApp. It answers, qualifies, follows up and reports back — while you sleep or focus on other things.",
    prod1_features:[
      { Icon:ChatCircleTextIcon, title:"Instant replies", desc:"Responds to your customers in under 10 seconds, even at night and on weekends." },
      { Icon:TargetIcon, title:"Smart qualification", desc:"Detects hot leads and automatically tags them in your CRM." },
      { Icon:ClockIcon, title:"Auto follow-up after 1h", desc:"If a lead stops replying, Alex follows up automatically at the right time." },
      { Icon:ChartLineUpIcon, title:"Daily WhatsApp report", desc:"Every morning, get a full summary of leads and conversations." },
      { Icon:BrainIcon, title:"Conversation memory", desc:"Alex remembers every customer and the full conversation history." },
      { Icon:BooksIcon, title:"RAG knowledge base", desc:"Powered by your catalogs, product sheets, prices and info — always accurate replies." },
    ],
    prod1_workflow:[
      { label:"WhatsApp customer", Icon:DeviceMobileIcon, color:"#06B6D4" },
      { label:"Alex replies", Icon:RobotIcon, color:"#06B6D4" },
      { label:"Lead qualified", Icon:TargetIcon, color:"#8B5CF6" },
      { label:"Team alert", Icon:BellIcon, color:"#6366F1" },
      { label:"Daily report", Icon:ChartLineUpIcon, color:"#22D97A" },
    ],
    prod2_tag:"Product 2 · Community Manager",
    prod2_desc:"Your Facebook page always active, without lifting a finger. The AI researches trends, creates content and publishes automatically.",
    prod2_features:[
      { Icon:MagnifyingGlassIcon, title:"Trend research", desc:"Tavily scans the web every week to find topics your audience cares about." },
      { Icon:PencilSimpleIcon, title:"AI-generated copy", desc:"Content in French, adapted to Beninese context and your brand's tone." },
      { Icon:ImageIcon, title:"Visuals with French text", desc:"AI-generated flyers and images with readable French text — pro quality." },
      { Icon:CalendarCheckIcon, title:"Automatic scheduling", desc:"Posts Monday, Wednesday, Friday at 9am — no action needed from you." },
      { Icon:ChartLineUpIcon, title:"Performance report", desc:"Track your post stats from a simple dashboard." },
      { Icon:GlobeHemisphereWestIcon, title:"100% local", desc:"Content designed for the Beninese market, cultural references and African trends." },
    ],
    prod2_workflow:[
      { label:"Web trends", Icon:MagnifyingGlassIcon, color:"#06B6D4" },
      { label:"AI copy", Icon:PencilSimpleIcon, color:"#06B6D4" },
      { label:"Generated visual", Icon:ImageIcon, color:"#8B5CF6" },
      { label:"Facebook post", Icon:FacebookLogoIcon, color:"#6366F1" },
      { label:"Stats report", Icon:ChartLineUpIcon, color:"#22D97A" },
    ],
    start_btn:"Get started",
    process_label:"Process",
    process_title:"Live in 72 hours",
    process_sub:"No code, no hassle. We handle everything.",
    steps:[
      { n:"01", Icon:TargetIcon, title:"Free consultation", desc:"We analyze your business and customers. A 30-min call is enough to understand it all." },
      { n:"02", Icon:BrainIcon, title:"Custom configuration", desc:"We configure Alex with your catalog, pricing, tone. 100% tailored to you." },
      { n:"03", Icon:CheckIcon, title:"Test & validation", desc:"You test the agent before launch. We adjust until you're fully satisfied." },
      { n:"04", Icon:ArrowRightIcon, title:"Live in 72h", desc:"Your AI agent is active. Ongoing support for updates and optimizations." },
    ],
    pricing_label:"Pricing",
    pricing_title:"Pricing that fits",
    pricing_sub:"Monthly subscriptions. No commitment. Cancel anytime.",
    pricing_note:"Hesitating? The consultation is free —",
    pricing_wa:"contact us on WhatsApp",
    pricing_cards:[
      { name:"Alex Agent", oldPrice:"50,000", price:"25,000", unit:"FCFA/mo", desc:"For shops and SMEs who want to automate WhatsApp customer service.", features:["Custom WhatsApp agent","Lead qualification","Automatic follow-ups","Daily report","Technical support included"], cta:"Start with Alex", accent:"#06B6D4", pop:false },
      { name:"AI Community Manager", oldPrice:"75,000", price:"35,000", unit:"FCFA/mo", desc:"For brands that want an active Facebook presence with zero effort.", features:["3 posts/week","AI-generated visuals","Copy adapted to local context","Auto trend research","Performance report"], cta:"Start CM AI", accent:"#6366F1", pop:false },
      { name:"Full Pack", oldPrice:"110,000", price:"50,000", unit:"FCFA/mo", desc:"Both solutions for total automation of your digital presence.", features:["Alex WhatsApp Agent","AI Community Manager","Unified dashboard","24/7 priority support","Save 15,000 FCFA/mo"], cta:"Get the Pack", accent:"#8B5CF6", pop:true },
    ],
    reviews_label:"Testimonials",
    reviews_title:"They trust us",
    reviews_sub:"Beninese businesses who automated with DHA.",
    testimonials:[
      { name:"Fatou A.", role:"Owner · Beauty Shop, Cotonou", text:"Since Alex, I don't get the same 10 questions a day anymore. My customers get answers in seconds.", avatar:"F", color:"#06B6D4" },
      { name:"Kodjo M.", role:"Director · Import-Export, Porto-Novo", text:"The daily qualified leads report is essential. My team knows exactly who to follow up with every morning.", avatar:"K", color:"#6366F1" },
      { name:"Rosine D.", role:"Founder · Event Catering", text:"My Facebook page has never been this active. The AI CM posts for me while I work.", avatar:"R", color:"#8B5CF6" },
      { name:"Ibrahim S.", role:"CEO · Central Pharmacy, Parakou", text:"In 3 weeks, Alex handled over 400 conversations. Zero errors, zero complaints. Impressive.", avatar:"I", color:"#22D97A" },
      { name:"Aïcha B.", role:"Director · Training Center", text:"Our enrollments doubled. Alex answers at night when we're closed. Our competitors can't figure out how.", avatar:"A", color:"#06B6D4" },
    ],
    faq_label:"FAQ",
    faq_title:"Got questions?",
    faq_sub:"We've got answers.",
    faqs:[
      { cat:"Investment", q:"Is it really worth 25,000 FCFA a month?", a:"A human sales rep in Cotonou costs between 80,000 and 150,000 FCFA/month — for 8h/day, 5 days/week. Alex works 24/7, replies in under 10 seconds and sends you a report every morning. The math speaks for itself." },
      { cat:"Technical", q:"How does Alex know my business?", a:"During setup, we feed Alex everything it needs to know: your catalog, prices, delivery terms, hours. It stores this in a smart knowledge base (RAG) and uses it to answer accurately." },
      { cat:"WhatsApp", q:"Could my WhatsApp number get banned?", a:"No. Alex generates natural messages with human-like variation — never mass copy-paste. It respects WhatsApp's 24h windows and anti-spam rules. None of our clients has ever had an issue." },
      { cat:"Objections", q:"Are my customers ready to talk to an AI?", a:"In 95% of cases, customers don't even realize they're talking to an AI — and don't mind, as long as they get a fast answer." },
      { cat:"Local", q:"Does Alex understand the Beninese context?", a:"Yes. Alex is configured for your market: it speaks in FCFA, knows Cotonou, Porto-Novo, Parakou, and can even be set up to reply in Fon or Yoruba if needed." },
      { cat:"Results", q:"How do I measure results?", a:"Every morning you get a report with: conversations handled, qualified leads, follow-ups sent. You also get a live Google Sheets dashboard." },
      { cat:"Getting started", q:"I'm not technical. Can I actually use this?", a:"Nothing to install, nothing to code. You give us your product info and WhatsApp number — we handle the rest. If you can read WhatsApp, you can use our products." },
      { cat:"Flexibility", q:"What if I want to cancel?", a:"No commitment. Our subscriptions are monthly, cancel anytime at no cost. One WhatsApp message is enough." },
    ],
    cta_title:"Ready to automate?",
    cta_sub:"Join the Beninese businesses trusting AI to grow.",
    cta_wa:"Contact us on WhatsApp",
    cta_demo:"Try Alex first",
    cta_badges:["Free consultation","No commitment","Support included"],
  },
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return isMobile;
}

function DemoChat({ lang }) {
  const t = T[lang] || T.fr;
  const [msgs, setMsgs] = useState([
    { role:"alex", text: lang === "en" ? "Hello! I'm Alex, DHA's AI assistant. Ask me a question about our services!" : "Bonjour ! Je suis Alex, l'assistant IA de DHA. Posez-moi une question sur nos services !", time: new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}) }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const isMobile = useIsMobile();
  const historyRef = useRef([]);

  useEffect(() => {
    if (msgs.length > 1) setTimeout(() => bottomRef.current?.scrollIntoView({ behavior:"smooth", block:"end" }), 100);
  }, [msgs, typing]);

  const send = async () => {
    const txt = input.trim();
    if (!txt || typing) return;
    const time = new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"});
    setInput("");
    setMsgs(p => [...p, { role:"user", text:txt, time }]);
    setTyping(true);

    historyRef.current.push({ role: "user", content: txt });

    try {
      const res = await fetch("/api/chat", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          messages: historyRef.current.slice(-10),
        }),
      });
      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content?.trim() || (lang==="en" ? "Sorry, I'm having a connection issue. Contact us on WhatsApp!" : "Désolé, je rencontre un problème de connexion. Contactez-nous sur WhatsApp !");
      historyRef.current.push({ role: "assistant", content: reply });
      setTyping(false);
      setMsgs(p => [...p, { role:"alex", text:reply, time: new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}) }]);
    } catch {
      setTyping(false);
      const fallback = lang==="en" ? "Connection issue. Contact our team on WhatsApp, they respond in under 2h!" : "Problème de connexion. Contactez notre équipe sur WhatsApp, ils répondent en moins de 2h !";
      setMsgs(p => [...p, { role:"alex", text:fallback, time: new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}) }]);
    }
  };

  const renderText = (tx) => tx.split(/\*\*(.*?)\*\*/g).map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part);

  if (isMobile) {
    return (
      <div style={{ borderRadius:24, overflow:"hidden", boxShadow:"var(--shadow-glass-lg)", maxWidth:340, margin:"0 auto", fontFamily:"var(--font-body)", border:"1px solid var(--glass-border)" }}>
        <div style={{ background:"rgba(255,255,255,0.85)", backdropFilter:"blur(12px)", padding:"12px 16px", display:"flex", alignItems:"center", gap:10, borderBottom:"1px solid var(--glass-border)" }}>
          <ArrowLeftIcon size={18} color="var(--ink)" />
          <div style={{ width:36, height:36, borderRadius:"50%", background:"var(--grad-primary)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, color:"#fff", fontSize:14 }}>A</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:700, color:"var(--ink)" }}>Alex · DHA</div>
            <div style={{ fontSize:11, color:"var(--cyan)" }}>{lang==="en" ? "online" : "en ligne"}</div>
          </div>
          <div style={{ display:"flex", gap:16, color:"var(--ink-soft)" }}><PhoneIcon size={17} /><DotsThreeVerticalIcon size={17} /></div>
        </div>
        <div style={{ background:"var(--bg-alt)", height:320, overflowY:"auto", padding:"12px 10px", display:"flex", flexDirection:"column", gap:8 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display:"flex", justifyContent: m.role==="alex" ? "flex-start" : "flex-end" }}>
              <div style={{
                maxWidth:"80%",
                padding:"10px 14px",
                fontSize:13,
                lineHeight:1.5,
                background: m.role==="alex" ? "var(--glass-strong)" : "var(--grad-primary)",
                color: m.role==="alex" ? "var(--ink)" : "#fff",
                borderRadius: m.role==="alex" ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                boxShadow:"0 2px 8px rgba(15,23,42,0.06)",
                border: m.role==="alex" ? "1px solid var(--glass-border)" : "none"
              }}>
                {m.role==="alex" && <div style={{ fontSize:11, color:"var(--indigo)", fontWeight:700, marginBottom:3 }}>Alex · DHA</div>}
                <div>{renderText(m.text)}</div>
                <div style={{ fontSize:10, color: m.role==="alex"?"var(--ink-faint)":"rgba(255,255,255,0.75)", textAlign:"right", marginTop:3, display:"flex", alignItems:"center", justifyContent:"flex-end", gap:3 }}>
                  {m.time}{m.role==="user" && <ChecksIcon size={12} />}
                </div>
              </div>
            </div>
          ))}
          {typing && (
            <div style={{ display:"flex", justifyContent:"flex-start" }}>
              <div style={{ background:"var(--glass-strong)", border:"1px solid var(--glass-border)", borderRadius:"4px 16px 16px 16px", padding:"10px 14px", display:"flex", gap:4, alignItems:"center" }}>
                {[0,0.2,0.4].map((d,i) => <span key={i} style={{ width:7, height:7, background:"var(--indigo)", borderRadius:"50%", display:"inline-block", animation:`typeBounce 0.9s ${d}s infinite` }} />)}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div style={{ background:"var(--surface-solid)", padding:"6px 10px", display:"flex", gap:6, flexWrap:"wrap", borderTop:"1px solid var(--glass-border)" }}>
          {t.demo_wa_suggestions.map(s => (
            <button key={s} onClick={() => setInput(s)} style={{ background:"var(--bg-alt)", border:"1px solid var(--glass-border)", borderRadius:20, padding:"4px 10px", fontSize:11, color:"var(--ink-soft)", cursor:"pointer", fontFamily:"inherit" }}>{s}</button>
          ))}
        </div>
        <div style={{ background:"var(--surface-solid)", padding:"8px 10px", display:"flex", alignItems:"center", gap:8, borderTop:"1px solid var(--glass-border)" }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key==="Enter") send(); }} placeholder={t.demo_wa_placeholder} style={{ flex:1, background:"var(--bg-alt)", border:"1px solid var(--glass-border)", borderRadius:24, padding:"10px 14px", fontSize:13, color:"var(--ink)", outline:"none", fontFamily:"inherit" }} />
          <button onClick={send} disabled={typing || !input.trim()} style={{ width:42, height:42, borderRadius:"50%", background: input.trim() ? "var(--grad-primary)" : "var(--bg-alt)", border:"none", cursor: input.trim() ? "pointer" : "default", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><PaperPlaneRightIcon size={18} weight="fill" color={input.trim() ? "#fff" : "var(--ink-faint)"} /></button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card" style={{ borderRadius:24, overflow:"hidden", boxShadow:"var(--shadow-glass-lg)" }}>
      <div style={{ background:"rgba(255,255,255,0.5)", borderBottom:"1px solid var(--glass-border)", padding:"14px 18px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:38, height:38, borderRadius:"50%", background:"var(--grad-primary)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, color:"#fff", fontSize:15 }}>A</div>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:"var(--ink)" }}>Alex · Agent Commercial DHA</div>
            <div style={{ fontSize:11, color:"var(--cyan)", display:"flex", alignItems:"center", gap:5, marginTop:3 }}>
              <span style={{ width:5, height:5, background:"var(--cyan)", borderRadius:"50%", animation:"blink 2s infinite" }} />
              {lang==="en" ? "Online · Responds in under 10s" : "En ligne · Répond en moins de 10s"}
            </div>
          </div>
        </div>
        <div style={{ background:"rgba(34,217,122,0.1)", border:"1px solid rgba(34,217,122,0.3)", borderRadius:8, padding:"4px 10px", fontSize:10, color:"#189A5C", fontWeight:700 }}>LIVE DEMO</div>
      </div>
      <div style={{ height:340, overflowY:"auto", padding:"16px 14px", display:"flex", flexDirection:"column", gap:12, background:"var(--bg-alt)" }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display:"flex", justifyContent: m.role==="alex" ? "flex-start" : "flex-end", alignItems:"flex-end", gap:8 }}>
            {m.role==="alex" && <div style={{ width:26, height:26, borderRadius:"50%", background:"var(--grad-primary)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, color:"#fff", fontSize:10, flexShrink:0 }}>A</div>}
            <div style={{ maxWidth:"78%", padding:"11px 16px", fontSize:13, lineHeight:1.65, background: m.role==="alex" ? "#fff" : "var(--grad-primary)", color: m.role==="alex" ? "var(--ink)" : "#fff", borderRadius: m.role==="alex" ? "4px 16px 16px 16px" : "16px 4px 16px 16px", border: m.role==="alex" ? "1px solid var(--glass-border)" : "none", boxShadow:"0 2px 6px rgba(15,23,42,0.05)" }}>{renderText(m.text)}</div>
          </div>
        ))}
        {typing && (
          <div style={{ display:"flex", alignItems:"flex-end", gap:8 }}>
            <div style={{ width:26, height:26, borderRadius:"50%", background:"var(--grad-primary)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, color:"#fff", fontSize:10, flexShrink:0 }}>A</div>
            <div style={{ background:"var(--surface-solid)", border:"1px solid var(--glass-border)", borderRadius:"4px 16px 16px 16px", padding:"12px 16px", display:"flex", gap:4 }}>
              {[0,0.2,0.4].map((d,i) => <span key={i} style={{ width:6, height:6, background:"var(--indigo)", borderRadius:"50%", display:"inline-block", animation:`typeBounce 0.9s ${d}s infinite` }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding:"0 14px 10px", display:"flex", gap:6, flexWrap:"wrap", background:"var(--surface-solid)" }}>
        {t.demo_suggestions.map(s => (
          <button key={s} onClick={() => setInput(s)} style={{ background:"rgba(99,102,241,0.06)", border:"1px solid rgba(99,102,241,0.2)", borderRadius:20, padding:"5px 12px", fontSize:11, color:"var(--indigo)", cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s" }} className="chat-sug">{s}</button>
        ))}
      </div>
      <div style={{ padding:"10px 12px 14px", borderTop:"1px solid var(--glass-border)", display:"flex", gap:8, background:"var(--surface-solid)" }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")send();}} placeholder={t.demo_placeholder} style={{ flex:1, background:"var(--bg-alt)", border:"1px solid var(--glass-border)", borderRadius:12, padding:"11px 14px", fontSize:13, color:"var(--ink)", outline:"none", fontFamily:"inherit" }} />
        <button onClick={send} disabled={typing || !input.trim()} style={{ width:42, height:42, borderRadius:12, background: input.trim() ? "var(--grad-primary)" : "var(--bg-alt)", border:"none", cursor: input.trim() ? "pointer" : "default", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><PaperPlaneRightIcon size={17} weight="fill" color={input.trim() ? "#fff" : "var(--ink-faint)"} /></button>
      </div>
    </div>
  );
}

export default function DHASite() {
  const { lang } = useLang();
  const [vis, setVis] = useState(new Set());
  const [activeStep, setActiveStep] = useState(0);
  const t = T[lang] || T.fr;

  usePageMeta(lang === "en" ? {
    title: "DHA — AI Agency & Automation in Benin | Digital Horizon Agency",
    description: "Digital Horizon Agency (DHA): 24/7 WhatsApp AI agent, automated Community Manager, custom websites. Based in Cotonou, Benin. From 25,000 FCFA/month.",
    path: "/",
  } : {
    title: "DHA — Agence IA & Automatisation au Bénin | Digital Horizon Agency",
    description: "Digital Horizon Agency (DHA) — Automatisez votre business avec l'IA. Agent WhatsApp 24h/24, Community Manager IA, sites web sur mesure. Basé à Cotonou, Bénin. Dès 25 000 FCFA/mois.",
    path: "/",
  });

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setVis(p => new Set([...p, e.target.id])); }),
      { threshold:0.07 }
    );
    document.querySelectorAll("[data-observe]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const ti = setInterval(() => setActiveStep(p => (p+1) % t.steps.length), 3500);
    return () => clearInterval(ti);
  }, [t.steps.length]);

  const v = id => vis.has(id);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  };

  const ActiveStepIcon = t.steps[activeStep].Icon;

  return (
    <div style={{ fontFamily:"var(--font-body)", background:"var(--bg)", color:"var(--ink)", overflowX:"hidden" }}>
      <style>{CSS}</style>

      {/* HERO */}
      <section style={{ minHeight:"100svh", padding:"100px 20px 60px", position:"relative", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(15,23,42,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,0.025) 1px,transparent 1px)", backgroundSize:"64px 64px" }} />
        <div style={{ position:"absolute", top:"-5%", left:"-10%", width:"50vw", height:"50vw", maxWidth:600, maxHeight:600, background:"radial-gradient(circle,rgba(6,182,212,0.14) 0%,transparent 65%)", filter:"blur(60px)", borderRadius:"50%" }} />
        <div style={{ position:"absolute", bottom:"-5%", right:"-10%", width:"45vw", height:"45vw", maxWidth:500, maxHeight:500, background:"radial-gradient(circle,rgba(139,92,246,0.13) 0%,transparent 65%)", filter:"blur(60px)", borderRadius:"50%" }} />
        <div style={{ position:"relative", zIndex:1, maxWidth:700, textAlign:"center" }}>
          <div className="glass-card" style={{ display:"inline-flex", alignItems:"center", gap:8, borderRadius:24, padding:"7px 16px", fontSize:12, color:"var(--indigo)", marginBottom:28, fontWeight:600 }}>
            <span style={{ width:6, height:6, background:"var(--grad-primary)", borderRadius:"50%", animation:"blink 2s infinite" }} />
            {t.hero_badge}
          </div>
          <h1 style={{ fontSize:"clamp(38px,8vw,76px)", fontWeight:800, lineHeight:1.1, letterSpacing:"-0.03em", color:"var(--ink)", margin:"0 0 20px", display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            <span>{t.hero_title}</span>
            <HeroWord lang={lang} />
            <SparkleText text={t.hero_sparkle} />
          </h1>
          <p style={{ fontSize:"clamp(15px,3.5vw,18px)", color:"var(--ink-soft)", lineHeight:1.8, maxWidth:520, margin:"0 auto 36px" }}>{t.hero_sub}</p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:48 }}>
            <a href={`https://wa.me/${WA_NUMBER}`} style={{ background:"var(--grad-primary)", color:"#fff", padding:"14px 28px", borderRadius:14, fontSize:15, fontWeight:700, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8, boxShadow:"0 8px 30px rgba(6,182,212,0.3)" }} className="primary-hero-cta">{t.hero_cta1}<ArrowRightIcon size={16} weight="bold" /></a>
            <button onClick={() => scrollTo("demo")} className="glass-card secondary-hero-cta" style={{ color:"var(--ink)", padding:"14px 28px", borderRadius:14, fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:"inherit", border:"1px solid var(--glass-border)", display:"inline-flex", alignItems:"center", gap:8 }}><RobotIcon size={17} />{t.hero_cta2}</button>
          </div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:16, flexWrap:"wrap" }}>
            <div style={{ display:"flex" }}>
              {["F","K","R","I","A"].map((l,i) => (
                <div key={i} style={{ width:32, height:32, borderRadius:"50%", background:["var(--grad-primary)","var(--grad-secondary)","var(--grad-accent)","var(--grad-primary)","var(--grad-secondary)"][i], border:"2px solid var(--bg)", marginLeft: i>0?-8:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:"#fff" }}>{l}</div>
              ))}
            </div>
            <div style={{ fontSize:13, color:"var(--ink-soft)", display:"flex", alignItems:"center", gap:4 }}><StarIcon size={13} weight="fill" color="#F5A623" /><span style={{ color:"var(--ink)", fontWeight:700 }}>4.9/5</span> · {t.hero_social}</div>
          </div>
          <div style={{ display:"flex", gap:24, justifyContent:"center", flexWrap:"wrap", marginTop:48 }}>
            {t.hero_stats.map(([v,l]) => (
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontSize:"clamp(22px,4vw,30px)", fontWeight:800, background:"var(--grad-primary)", WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent", letterSpacing:"-1px", lineHeight:1.1 }}>{v}</div>
                <div style={{ fontSize:11, color:"var(--ink-faint)", marginTop:3, fontWeight:500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:"80px 20px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="feat-grid">
            {t.features.map((f, i) => (
              <div key={i} data-observe id={`feat${i}`} className="card glass-card" style={{ borderRadius:20, padding:"28px 24px", opacity:v(`feat${i}`)?1:0, transform:v(`feat${i}`)?"none":"translateY(24px)", transition:`opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i*0.1}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i*0.1}s, box-shadow 0.4s` }}>
                <div style={{ marginBottom:16, background:"rgba(99,102,241,0.08)", width:54, height:54, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid rgba(99,102,241,0.15)" }}>
                  <f.Icon size={26} weight="duotone" color="var(--indigo)" />
                </div>
                <h3 style={{ fontSize:16, fontWeight:700, color:"var(--ink)", marginBottom:10, lineHeight:1.3 }}>{f.title}</h3>
                <p style={{ fontSize:13, color:"var(--ink-soft)", lineHeight:1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" style={{ padding:"100px 20px", position:"relative" }}>
        <div style={{ position:"absolute", top:"30%", left:"10%", width:350, height:350, background:"radial-gradient(circle,rgba(6,182,212,0.08) 0%,transparent 70%)", filter:"blur(40px)", borderRadius:"50%" }} />
        <div style={{ maxWidth:680, margin:"0 auto", position:"relative", zIndex:1 }}>
          <div data-observe id="demo-h" style={{ textAlign:"center", marginBottom:44, opacity:v("demo-h")?1:0, transform:v("demo-h")?"none":"translateY(24px)", transition:"all 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <div style={labelStyle}>{t.demo_label}</div>
            <h2 style={h2Style}>{t.demo_title}</h2>
            <p style={{ fontSize:15, color:"var(--ink-soft)", maxWidth:460, margin:"0 auto", lineHeight:1.7 }}>{t.demo_sub}</p>
          </div>
          <div data-observe id="demo-chat" style={{ opacity:v("demo-chat")?1:0, transform:v("demo-chat")?"none":"translateY(30px)", transition:"all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s" }}>
            <DemoChat lang={lang} />
          </div>
          <p style={{ textAlign:"center", fontSize:12, color:"var(--ink-faint)", marginTop:14 }}>{t.demo_disclaimer}</p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="produits" style={{ padding:"100px 20px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div data-observe id="prod-h" style={{ textAlign:"center", marginBottom:54, opacity:v("prod-h")?1:0, transform:v("prod-h")?"none":"translateY(24px)", transition:"all 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <div style={labelStyle}>{t.products_label}</div>
            <h2 style={h2Style}>{t.products_title}</h2>
            <p style={subStyle}>{t.products_sub}</p>
          </div>
          {/* ALEX */}
          <div data-observe id="p1" style={{ opacity:v("p1")?1:0, transform:v("p1")?"none":"translateY(36px)", transition:"all 0.8s cubic-bezier(0.16, 1, 0.3, 1)", marginBottom:32 }}>
            <div className="glass-card product-card" style={{ borderRadius:24, overflow:"hidden", position:"relative" }}>
              <div style={{ position:"absolute", top:-60, right:-60, width:300, height:300, background:"radial-gradient(circle,rgba(6,182,212,0.1),transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />
              <div style={{ padding:"40px 36px 0" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:24, marginBottom:28 }}>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:14 }}>
                      <div style={{ width:54, height:54, borderRadius:16, background:"rgba(6,182,212,0.1)", border:"1px solid rgba(6,182,212,0.25)", display:"flex", alignItems:"center", justifyContent:"center" }}><RobotIcon size={28} weight="duotone" color="var(--cyan)" /></div>
                      <div>
                        <div style={{ fontSize:10, letterSpacing:"1.5px", color:"var(--cyan)", fontWeight:800, textTransform:"uppercase", marginBottom:4 }}>{t.prod1_tag}</div>
                        <h3 style={{ fontSize:32, fontWeight:800, background:"var(--grad-primary)", WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent", letterSpacing:"-1px", lineHeight:1 }}>ALEX</h3>
                      </div>
                    </div>
                    <p style={{ fontSize:14, color:"var(--ink-soft)", lineHeight:1.8, maxWidth:560 }}>{t.prod1_desc}</p>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontSize:12, color:"var(--ink-faint)", textDecoration:"line-through" }}>50 000 FCFA/mois</div>
                    <div style={{ fontSize:32, fontWeight:800, color:"var(--cyan)", letterSpacing:"-1px", marginTop:2 }}>25 000</div>
                    <div style={{ display:"flex", alignItems:"center", gap:6, justifyContent:"flex-end" }}>
                      <span style={{ fontSize:12, color:"var(--ink-soft)" }}>FCFA / {lang==="en"?"mo":"mois"}</span>
                      <span style={{ fontSize:10, background:"rgba(34,217,122,0.12)", color:"#189A5C", border:"1px solid rgba(34,217,122,0.3)", borderRadius:20, padding:"2px 7px", fontWeight:700 }}>-50%</span>
                    </div>
                    <a href={`https://wa.me/${WA_NUMBER}`} style={{ display:"inline-block", marginTop:14, background:"var(--grad-primary)", color:"#fff", padding:"12px 24px", borderRadius:12, fontSize:13, fontWeight:700, textDecoration:"none", transition:"all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }} className="prod-cta">{t.start_btn}</a>
                  </div>
                </div>
                <div className="feat6-grid" style={{ marginBottom:36 }}>
                  {t.prod1_features.map((f,i) => (
                    <div key={i} style={{ background:"rgba(255,255,255,0.45)", border:"1px solid var(--glass-border)", borderRadius:16, padding:"20px 18px", transition:"all 0.3s" }} className="sub-feat-card">
                      <div style={{ marginBottom:10 }}><f.Icon size={22} weight="duotone" color="var(--cyan)" /></div>
                      <div style={{ fontSize:14, fontWeight:700, color:"var(--ink)", marginBottom:6 }}>{f.title}</div>
                      <div style={{ fontSize:12, color:"var(--ink-soft)", lineHeight:1.65 }}>{f.desc}</div>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop:"1px solid var(--glass-border)", padding:"24px 0 28px", display:"flex", alignItems:"center", justifyContent:"center", gap:0, flexWrap:"wrap", overflow:"hidden" }}>
                  {t.prod1_workflow.map((step, i, arr) => (
                    <div key={i} style={{ display:"flex", alignItems:"center" }}>
                      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, padding:"0 16px" }}>
                        <div style={{ width:40, height:40, borderRadius:"50%", background:`${step.color}12`, border:`1px solid ${step.color}35`, display:"flex", alignItems:"center", justifyContent:"center" }}><step.Icon size={18} color={step.color} /></div>
                        <span style={{ fontSize:11, color:"var(--ink-soft)", textAlign:"center", maxWidth:80, lineHeight:1.3 }}>{step.label}</span>
                      </div>
                      {i < arr.length-1 && <ArrowRightIcon size={16} color="var(--ink-faint)" style={{ flexShrink:0, margin:"0 4px" }} />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* CM */}
          <div data-observe id="p2" style={{ opacity:v("p2")?1:0, transform:v("p2")?"none":"translateY(36px)", transition:"all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s" }}>
            <div className="glass-card product-card blue" style={{ borderRadius:24, overflow:"hidden", position:"relative" }}>
              <div style={{ position:"absolute", top:-60, left:-60, width:280, height:280, background:"radial-gradient(circle,rgba(99,102,241,0.1),transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />
              <div style={{ padding:"40px 36px 0" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:16, marginBottom:20 }}>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:14 }}>
                      <div style={{ width:54, height:54, borderRadius:16, background:"rgba(99,102,241,0.1)", border:"1px solid rgba(99,102,241,0.25)", display:"flex", alignItems:"center", justifyContent:"center" }}><LaptopIcon size={26} weight="duotone" color="var(--indigo)" /></div>
                      <div>
                        <div style={{ fontSize:10, letterSpacing:"1.5px", color:"var(--indigo)", fontWeight:800, textTransform:"uppercase", marginBottom:4 }}>{t.prod2_tag}</div>
                        <h3 style={{ fontSize:26, fontWeight:800, background:"var(--grad-secondary)", WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent", letterSpacing:"-0.8px", lineHeight:1 }}>{lang==="en" ? "AI Community Manager" : "Community Manager IA"}</h3>
                      </div>
                    </div>
                    <p style={{ fontSize:14, color:"var(--ink-soft)", lineHeight:1.75, maxWidth:520 }}>{t.prod2_desc}</p>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontSize:12, color:"var(--ink-faint)", textDecoration:"line-through" }}>75 000 FCFA/mois</div>
                    <div style={{ fontSize:32, fontWeight:800, color:"var(--indigo)", letterSpacing:"-1px", marginTop:2 }}>35 000</div>
                    <div style={{ display:"flex", alignItems:"center", gap:6, justifyContent:"flex-end" }}>
                      <span style={{ fontSize:12, color:"var(--ink-soft)" }}>FCFA / {lang==="en"?"mo":"mois"}</span>
                      <span style={{ fontSize:10, background:"rgba(99,102,241,0.1)", color:"var(--indigo)", border:"1px solid rgba(99,102,241,0.25)", borderRadius:20, padding:"2px 7px", fontWeight:700 }}>-53%</span>
                    </div>
                    <a href={`https://wa.me/${WA_NUMBER}`} style={{ display:"inline-block", marginTop:14, background:"var(--grad-secondary)", color:"#fff", padding:"12px 24px", borderRadius:12, fontSize:13, fontWeight:700, textDecoration:"none", transition:"all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }} className="prod-cta">{t.start_btn}</a>
                  </div>
                </div>
                <div className="feat6-grid" style={{ marginBottom:36 }}>
                  {t.prod2_features.map((f,i) => (
                    <div key={i} style={{ background:"rgba(255,255,255,0.45)", border:"1px solid var(--glass-border)", borderRadius:16, padding:"20px 18px", transition:"all 0.3s" }} className="sub-feat-card">
                      <div style={{ marginBottom:10 }}><f.Icon size={20} weight="duotone" color="var(--indigo)" /></div>
                      <div style={{ fontSize:14, fontWeight:700, color:"var(--ink)", marginBottom:6 }}>{f.title}</div>
                      <div style={{ fontSize:12, color:"var(--ink-soft)", lineHeight:1.65 }}>{f.desc}</div>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop:"1px solid var(--glass-border)", padding:"24px 0 28px", display:"flex", alignItems:"center", justifyContent:"center", gap:0, flexWrap:"wrap" }}>
                  {t.prod2_workflow.map((step, i, arr) => (
                    <div key={i} style={{ display:"flex", alignItems:"center" }}>
                      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, padding:"0 16px" }}>
                        <div style={{ width:40, height:40, borderRadius:"50%", background:`${step.color}12`, border:`1px solid ${step.color}35`, display:"flex", alignItems:"center", justifyContent:"center" }}><step.Icon size={18} color={step.color} /></div>
                        <span style={{ fontSize:11, color:"var(--ink-soft)", textAlign:"center", maxWidth:80, lineHeight:1.3 }}>{step.label}</span>
                      </div>
                      {i < arr.length-1 && <ArrowRightIcon size={16} color="var(--ink-faint)" style={{ flexShrink:0, margin:"0 4px" }} />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="comment" style={{ padding:"100px 20px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div data-observe id="how-h" style={{ textAlign:"center", marginBottom:56, opacity:v("how-h")?1:0, transform:v("how-h")?"none":"translateY(24px)", transition:"all 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <div style={labelStyle}>{t.process_label}</div>
            <h2 style={h2Style}>{t.process_title}</h2>
            <p style={subStyle}>{t.process_sub}</p>
          </div>
          <div className="steps-layout">
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {t.steps.map((s, i) => (
                <button key={i} onClick={() => setActiveStep(i)} style={{
                  background: activeStep===i ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.25)",
                  border:`1px solid ${activeStep===i ? "rgba(99,102,241,0.3)" : "var(--glass-border)"}`,
                  borderRadius:20, padding:"20px 24px", cursor:"pointer", textAlign:"left", fontFamily:"inherit", transition:"all 0.3s cubic-bezier(0.16, 1, 0.3, 1)", display:"flex", alignItems:"flex-start", gap:20,
                  backdropFilter:"blur(12px)"
                }} className="step-button">
                  <div style={{ fontSize:28, fontWeight:800, color: activeStep===i ? "var(--indigo)" : "rgba(15,23,42,0.12)", letterSpacing:"-1px", lineHeight:1, flexShrink:0, transition:"color 0.3s" }}>{s.n}</div>
                  <div>
                    <div style={{ fontSize:16, fontWeight:700, color: activeStep===i ? "var(--ink)" : "var(--ink-soft)", marginBottom:6, transition:"color 0.3s", display:"flex", alignItems:"center", gap:8 }}><s.Icon size={16} weight="bold" />{s.title}</div>
                    {activeStep===i && <div style={{ fontSize:13, color:"var(--ink-soft)", lineHeight:1.7, animation:"fadeUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}>{s.desc}</div>}
                  </div>
                </button>
              ))}
            </div>
            <div className="glass-card" style={{ borderRadius:24, padding:40, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:320 }}>
              <div style={{ width:80, height:80, borderRadius:20, background:"var(--grad-primary)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
                <ActiveStepIcon size={38} weight="bold" color="#fff" />
              </div>
              <h3 style={{ fontSize:22, fontWeight:800, color:"var(--ink)", textAlign:"center", marginBottom:14, letterSpacing:"-0.5px" }}>{t.steps[activeStep].title}</h3>
              <p style={{ fontSize:14, color:"var(--ink-soft)", textAlign:"center", lineHeight:1.8, maxWidth:280 }}>{t.steps[activeStep].desc}</p>
              <div style={{ display:"flex", gap:8, marginTop:28 }}>
                {t.steps.map((_,i) => (
                  <div key={i} style={{ width: activeStep===i ? 24 : 6, height:6, borderRadius:3, background: activeStep===i ? "var(--indigo)" : "rgba(15,23,42,0.12)", transition:"all 0.3s" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="tarifs" style={{ padding:"100px 20px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div data-observe id="prix-h" style={{ textAlign:"center", marginBottom:54, opacity:v("prix-h")?1:0, transform:v("prix-h")?"none":"translateY(24px)", transition:"all 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <div style={labelStyle}>{t.pricing_label}</div>
            <h2 style={h2Style}>{t.pricing_title}</h2>
            <p style={subStyle}>{t.pricing_sub}</p>
          </div>
          <div className="three-col-grid" style={{ alignItems:"start" }}>
            {t.pricing_cards.map((card, i) => (
              <div key={i} data-observe id={`t${i}`} className="glass-card pricing-card" style={{ background: card.pop ? `linear-gradient(160deg,${card.accent}0F,rgba(255,255,255,0.6))` : undefined, border:`1px solid ${card.pop ? card.accent+"55" : "var(--glass-border)"}`, borderRadius:24, padding:"36px 28px", position:"relative", opacity:v(`t${i}`)?1:0, transform:v(`t${i}`)?"none":"translateY(36px)", transition:`opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i*0.12}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i*0.12}s, box-shadow 0.4s` }}>
                {card.pop && <div style={{ position:"absolute", top:-13, left:"50%", transform:"translateX(-50%)", background:card.accent, color:"#fff", padding:"4px 16px", borderRadius:20, fontSize:11, fontWeight:800, whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:5 }}><StarIcon size={11} weight="fill" />{lang==="en"?"Most popular":"Le plus populaire"}</div>}
                <h3 style={{ fontSize:18, fontWeight:800, color:card.accent, marginBottom:16 }}>{card.name}</h3>
                <div style={{ marginBottom:16 }}>
                  <div style={{ fontSize:13, color:"var(--ink-faint)", textDecoration:"line-through", marginBottom:4 }}>{card.oldPrice} {card.unit}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:36, fontWeight:800, color:"var(--ink)", letterSpacing:"-1px" }}>{card.price}</span>
                    <span style={{ fontSize:13, color:"var(--ink-soft)" }}>{card.unit}</span>
                    <span style={{ fontSize:11, background:"rgba(34,217,122,0.12)", color:"#189A5C", border:"1px solid rgba(34,217,122,0.3)", borderRadius:20, padding:"2px 8px", fontWeight:700 }}>-50%</span>
                  </div>
                </div>
                <p style={{ fontSize:13, color:"var(--ink-soft)", lineHeight:1.7, marginBottom:24 }}>{card.desc}</p>
                <ul style={{ listStyle:"none", padding:0, margin:"0 0 32px", display:"flex", flexDirection:"column", gap:11 }}>
                  {card.features.map(f => (
                    <li key={f} style={{ display:"flex", alignItems:"center", gap:10, fontSize:13, color:"var(--ink-soft)" }}>
                      <span style={{ width:18, height:18, borderRadius:"50%", background:`${card.accent}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><CheckIcon size={11} weight="bold" color={card.accent} /></span>{f}
                    </li>
                  ))}
                </ul>
                <a href={`https://wa.me/${WA_NUMBER}`} style={{ display:"block", textAlign:"center", background: card.pop ? card.accent : "rgba(15,23,42,0.05)", border: card.pop ? "none" : "1px solid var(--glass-border)", color: card.pop ? "#fff" : "var(--ink)", padding:"14px", borderRadius:12, fontSize:14, fontWeight:700, textDecoration:"none", transition:"all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }} className="pricing-card-btn">{card.cta}</a>
              </div>
            ))}
          </div>
          <p style={{ textAlign:"center", color:"var(--ink-faint)", fontSize:13, marginTop:36 }}>{t.pricing_note} <a href={`https://wa.me/${WA_NUMBER}`} style={{ color:"var(--indigo)", textDecoration:"none", fontWeight:600 }}>{t.pricing_wa}</a></p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="temoignages" style={{ padding:"100px 0", overflow:"hidden" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 20px" }}>
          <div data-observe id="testi-h" style={{ textAlign:"center", marginBottom:48, opacity:v("testi-h")?1:0, transform:v("testi-h")?"none":"translateY(24px)", transition:"all 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <div style={labelStyle}>{t.reviews_label}</div>
            <h2 style={h2Style}>{t.reviews_title}</h2>
            <p style={subStyle}>{t.reviews_sub}</p>
          </div>
        </div>
        <TestimonialsScroll testimonials={t.testimonials} />
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding:"100px 20px" }}>
        <div style={{ maxWidth:720, margin:"0 auto" }}>
          <div data-observe id="faq-h" style={{ textAlign:"center", marginBottom:48, opacity:v("faq-h")?1:0, transform:v("faq-h")?"none":"translateY(24px)", transition:"all 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <div style={labelStyle}>{t.faq_label}</div>
            <h2 style={h2Style}>{t.faq_title}</h2>
            <p style={subStyle}>{t.faq_sub}</p>
          </div>
          <div data-observe id="faq-list" style={{ opacity:v("faq-list")?1:0, transform:v("faq-list")?"none":"translateY(24px)", transition:"all 0.7s 0.1s" }}>
            <FAQ faqs={t.faqs} />
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding:"100px 24px", position:"relative", overflow:"hidden", textAlign:"center" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"70vw", maxWidth:600, height:300, background:"radial-gradient(ellipse,rgba(139,92,246,0.12) 0%,transparent 70%)", filter:"blur(50px)" }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <h2 style={{ fontSize:"clamp(28px,6vw,54px)", fontWeight:800, letterSpacing:"-2px", color:"var(--ink)", margin:"0 0 16px" }}>{t.cta_title}</h2>
          <p style={{ fontSize:16, color:"var(--ink-soft)", marginBottom:36, maxWidth:440, margin:"0 auto 36px" }}>{t.cta_sub}</p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <a href={`https://wa.me/${WA_NUMBER}`} style={{ background:"var(--grad-primary)", color:"#fff", padding:"14px 32px", borderRadius:14, fontSize:15, fontWeight:700, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8, boxShadow:"0 8px 30px rgba(6,182,212,0.25)" }} className="primary-hero-cta"><WhatsappLogoIcon size={17} weight="fill" />{t.cta_wa}</a>
            <button onClick={() => scrollTo("demo")} className="glass-card secondary-hero-cta" style={{ color:"var(--ink)", padding:"14px 32px", borderRadius:14, fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap:8 }}><RobotIcon size={16} />{t.cta_demo}</button>
          </div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:20, marginTop:36, flexWrap:"wrap" }}>
            {t.cta_badges.map(b => <span key={b} style={{ fontSize:13, color:"var(--ink-soft)", fontWeight:500, display:"flex", alignItems:"center", gap:5 }}><CheckIcon size={13} weight="bold" color="#189A5C" />{b}</span>)}
          </div>
        </div>
      </section>
    </div>
  );
}

const labelStyle = { display:"inline-block", background:"rgba(99,102,241,0.07)", border:"1px solid rgba(99,102,241,0.18)", borderRadius:20, padding:"5px 14px", fontSize:11, color:"var(--indigo)", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:14, fontWeight:700 };
const h2Style   = { fontSize:"clamp(28px,5vw,48px)", fontWeight:800, letterSpacing:"-1.5px", color:"var(--ink)", margin:"0 0 14px", lineHeight:1.1 };
const subStyle  = { fontSize:15, color:"var(--ink-soft)", maxWidth:480, margin:"0 auto", lineHeight:1.7 };

const CSS = `
  @keyframes blink      { 0%,100%{opacity:.35} 50%{opacity:1} }
  @keyframes fadeUp     { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes typeBounce { 0%,80%,100%{transform:scale(0.6);opacity:.4} 40%{transform:scale(1);opacity:1} }
  @keyframes scrollLeft { from{transform:translateX(0)} to{transform:translateX(-50%)} }

  input::placeholder { color: var(--ink-faint); }
  input:focus { border-color: rgba(99,102,241,0.35) !important; background: #fff !important; }

  .card { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important; }
  .card:hover { transform: translateY(-5px); }

  .product-card { transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important; }
  .product-card:hover { transform: translateY(-4px); }

  .sub-feat-card { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
  .sub-feat-card:hover { background: #fff !important; box-shadow: 0 8px 20px rgba(15,23,42,0.06); }

  .step-button:hover { box-shadow: 0 8px 24px rgba(99,102,241,0.08); }

  .pricing-card { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important; }
  .pricing-card:hover { transform: translateY(-6px); }
  .pricing-card-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(15,23,42,0.15); }

  .primary-hero-cta:hover, .prod-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(6,182,212,0.4) !important; }
  .secondary-hero-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(99,102,241,0.15) !important; }

  .chat-sug:hover { background: rgba(99,102,241,0.12) !important; }

  .feat6-grid     { display:grid; grid-template-columns:1fr; gap:12px; }
  .three-col-grid { display:grid; grid-template-columns:1fr; gap:20px; }
  .feat-grid      { display:grid; grid-template-columns:1fr; gap:16px; }
  .steps-layout   { display:grid; grid-template-columns:1fr; gap:20px; }

  @media(min-width:600px) {
    .feat-grid      { grid-template-columns:repeat(2,1fr); }
    .three-col-grid { grid-template-columns:repeat(2,1fr); }
    .feat6-grid     { grid-template-columns:repeat(2,1fr); }
  }
  @media(min-width:900px) {
    .three-col-grid { grid-template-columns:repeat(3,1fr); }
    .feat-grid      { grid-template-columns:repeat(4,1fr); }
    .steps-layout   { grid-template-columns:1fr 1fr; gap:32px; align-items:start; }
    .feat6-grid     { grid-template-columns:repeat(3,1fr); }
  }
`;
