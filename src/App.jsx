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
        return (
          <div key={i} className="glass-card" style={{ borderRadius:16, overflow:"hidden", transition:"box-shadow 0.3s" }}>
            <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
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
            <div style={{
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
    prod2_
