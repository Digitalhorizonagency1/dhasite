import { useState, useEffect, useRef } from "react";
import { useLang } from "./LangContext";

const HERO_BLOCKS = {
  fr: [
    { text:"vos activités",       bg:"linear-gradient(135deg,#00FFB4,#00C8FF)", color:"#030712" },
    { text:"votre support client", bg:"linear-gradient(135deg,#FFB400,#FF7C00)", color:"#030712" },
    { text:"vos prospections",    bg:"linear-gradient(135deg,#a855f7,#7c3aed)", color:"#fff" },
  ],
  en: [
    { text:"your activities",     bg:"linear-gradient(135deg,#00FFB4,#00C8FF)", color:"#030712" },
    { text:"your customer support",bg:"linear-gradient(135deg,#FFB400,#FF7C00)", color:"#030712" },
    { text:"your prospecting",    bg:"linear-gradient(135deg,#a855f7,#7c3aed)", color:"#fff" },
  ],
};

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
        <span key={i} style={{ 
          display:"inline-block", 
          background: active===i ? b.bg : "rgba(255,255,255,0.02)", 
          color: active===i ? b.color : "rgba(255,255,255,0.15)", 
          padding:"8px 24px", 
          borderRadius:16, 
          fontSize:"clamp(24px,6vw,52px)", 
          fontWeight:900, 
          letterSpacing:"-0.03em", 
          lineHeight:1.15, 
          transition:"all 0.5s cubic-bezier(0.16, 1, 0.3, 1)", 
          transform: active===i ? "scale(1.05)" : "scale(0.96)", 
          boxShadow: active===i ? "0 10px 40px rgba(0,255,180,0.15)" : "none",
          border: active===i ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.03)"
        }}>
          {b.text}
        </span>
      ))}
    </span>
  );
}

const SPARKLE_POS = [
  { top:"-18px", left:"-14px",  size:14, delay:0   },
  { top:"-10px", right:"-18px", size:10, delay:0.4 },
  { top:"50%",   left:"-20px",  size:8,  delay:0.8 },
  { bottom:"-8px", left:"20%",  size:12, delay:0.3 },
  { bottom:"-14px",right:"15%", size:9,  delay:0.6 },
  { top:"10px",  right:"10%",   size:7,  delay:1.0 },
];
function SparkleText({ text }) {
  return (
    <span style={{ position:"relative", display:"inline-block" }}>
      {SPARKLE_POS.map((s, i) => (
        <svg key={i} width={s.size} height={s.size} viewBox="0 0 16 16" style={{ position:"absolute", top:s.top, left:s.left, right:s.right, bottom:s.bottom, animation:`sparkle 2s ${s.delay}s infinite`, pointerEvents:"none" }}>
          <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" fill="#00FFB4" />
        </svg>
      ))}
      <span style={{ background:"linear-gradient(135deg,#00FFB4 20%,#00C8FF 80%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{text}</span>
    </span>
  );
}

const WA_NUMBER = "2290160008046";

const T = {
  fr: {
    hero_badge:"🇧🇯 Agence IA & Automatisation · Bénin",
    hero_title:"Automatisez",
    hero_sparkle:"avec l'IA",
    hero_sub:"Des agents IA sur mesure pour répondre à vos clients, qualifier vos prospects et publier votre contenu — pendant que vous dormez.",
    hero_cta1:"💬 Démarrer gratuitement",
    hero_cta2:"🤖 Tester Alex",
    hero_social:"Utilisé par +50 entreprises béninoises",
    hero_stats:[["24/7","Disponible"],["< 10s","Temps réponse"],["72h","Mise en ligne"],["0 FCFA","Consultation"]],
    features:[
      { icon:"⚡", title:"Réponse en 10 secondes", desc:"Ne laissez plus vos prospects en attente. L'IA répond instantanément, même à 3h du matin." },
      { icon:"🎯", title:"Qualification automatique", desc:"Alex identifie les prospects chauds et vous alerte immédiatement pour les convertir." },
      { icon:"📊", title:"Rapport quotidien", desc:"Chaque matin, recevez un récapitulatif complet de toutes les conversations et prospects qualifiés." },
      { icon:"🌍", title:"Adapté au marché béninois", desc:"Compréhension du contexte local, des prix en FCFA, et des habitudes de communication africaines." },
    ],
    demo_label:"Démo Interactive",
    demo_title:"Parlez à Alex maintenant",
    demo_sub:"Testez notre agent IA en temps réel. Posez n'importe quelle question sur DHA.",
    demo_disclaimer:"Ceci est une démo. Votre agent sera configuré spécifiquement pour votre business.",
    demo_suggestions:["💰 Voir les prix","🤖 Comment ça marche ?","📞 Contacter l'équipe"],
    demo_placeholder:"Posez votre question à Alex...",
    demo_wa_suggestions:["💰 Les prix","🤖 Comment ça marche ?","📞 Contacter"],
    demo_wa_placeholder:"Tapez votre message",
    products_label:"Nos Produits",
    products_title:"Deux solutions, un objectif",
    products_sub:"Automatiser pour vendre plus, sans travailler plus.",
    prod1_tag:"Produit 1 · Agent Commercial",
    prod1_desc:"Votre commercial IA disponible 24h/24 sur WhatsApp. Il répond, qualifie, relance et vous rapporte — pendant que vous dormez ou travaillez sur autre chose.",
    prod1_features:[
      { icon:"💬", title:"Réponses instantanées", desc:"Répond à vos clients en moins de 10 secondes, même la nuit et les weekends." },
      { icon:"🎯", title:"Qualification intelligente", desc:"Détecte les prospects chauds et les tague automatiquement dans votre CRM." },
      { icon:"⏰", title:"Relance auto après 1h", desc:"Si un prospect ne répond plus, Alex relance automatiquement au bon moment." },
      { icon:"📊", title:"Rapport quotidien WhatsApp", desc:"Chaque matin, vous recevez un résumé complet des prospects et conversations." },
      { icon:"🧠", title:"Mémoire conversationnelle", desc:"Alex se souvient de chaque client et de l'historique de la conversation." },
      { icon:"📚", title:"Base de connaissance RAG", desc:"Alimenté par vos catalogues, fiches produits, prix et infos — réponses toujours précises." },
    ],
    prod1_workflow:[
      { label:"Client WhatsApp", icon:"📱", color:"#00FFB4" },
      { label:"Alex répond", icon:"🤖", color:"#00FFB4" },
      { label:"Prospect qualifié", icon:"🎯", color:"#FFB400" },
      { label:"Alerte équipe", icon:"🔔", color:"#00C8FF" },
      { label:"Rapport quotidien", icon:"📊", color:"#A855F7" },
    ],
    prod2_tag:"Produit 2 · Community Manager",
    prod2_desc:"Votre page Facebook toujours active, sans que vous leviez le petit doigt. L'IA recherche les tendances, crée le contenu et publie automatiquement.",
    prod2_features:[
      { icon:"🔍", title:"Recherche de tendances", desc:"Tavily scanne le web chaque semaine pour trouver les sujets qui intéressent votre audience." },
      { icon:"✍️", title:"Textes générés par IA", desc:"Contenu en français, adapté au contexte béninois et au ton de votre marque." },
      { icon:"🎨", title:"Visuels avec texte français", desc:"Flyers et images générés par IA avec texte lisible en français — qualité pro." },
      { icon:"📅", title:"Planning automatique", desc:"Publication Lundi, Mercredi, Vendredi à 9h — sans intervention de votre part." },
      { icon:"📈", title:"Rapport de performance", desc:"Suivez les statistiques de vos publications depuis un tableau de bord simple." },
      { icon:"🌍", title:"100% local", desc:"Contenu pensé pour le marché béninois, les références culturelles et les tendances africaines." },
    ],
    prod2_workflow:[
      { label:"Tendances web", icon:"🔍", color:"#00C8FF" },
      { label:"Texte IA", icon:"✍️", color:"#00C8FF" },
      { label:"Visuel généré", icon:"🎨", color:"#A855F7" },
      { label:"Publication Facebook", icon:"📘", color:"#00C8FF" },
      { label:"Rapport stats", icon:"📈", color:"#00FFB4" },
    ],
    start_btn:"Démarrer →",
    process_label:"Processus",
    process_title:"Opérationnel en 72h",
    process_sub:"Pas de code, pas de prise de tête. On s'occupe de tout.",
    steps:[
      { n:"01", icon:"🎯", title:"Consultation gratuite", desc:"On analyse votre activité et vos clients. Un appel de 30 min suffit pour tout comprendre." },
      { n:"02", icon:"⚙️", title:"Configuration sur mesure", desc:"On configure Alex avec votre catalogue, vos prix, votre ton. 100% personnalisé pour vous." },
      { n:"03", icon:"✅", title:"Test & validation", desc:"Vous testez l'agent avant la mise en ligne. On ajuste jusqu'à votre satisfaction totale." },
      { n:"04", icon:"🚀", title:"Mise en ligne en 72h", desc:"Votre agent IA est actif. Support continu pour les évolutions et optimisations." },
    ],
    pricing_label:"Tarifs",
    pricing_title:"Des tarifs adaptés",
    pricing_sub:"Abonnements mensuels. Sans engagement. Résiliable à tout moment.",
    pricing_note:"Hésitations ? La consultation est gratuite —",
    pricing_wa:"contactez-nous sur WhatsApp",
    pricing_cards:[
      { name:"Alex Agent", oldPrice:"50 000", price:"25 000", unit:"FCFA/mois", desc:"Pour les commerces et PME qui veulent automatiser leur service client WhatsApp.", features:["Agent WhatsApp personnalisé","Qualification de prospects","Relances automatiques","Rapport quotidien","Support technique inclus"], cta:"Démarrer avec Alex", accent:"#00FFB4", pop:false },
      { name:"Community Manager IA", oldPrice:"75 000", price:"35 000", unit:"FCFA/mois", desc:"Pour les marques qui veulent une présence Facebook active sans effort.", features:["3 publications/semaine","Visuels générés par IA","Textes adaptés contexte local","Recherche de tendances auto","Rapport de performance"], cta:"Démarrer le CM IA", accent:"#00C8FF", pop:false },
      { name:"Pack Complet", oldPrice:"110 000", price:"50 000", unit:"FCFA/mois", desc:"Les deux solutions pour une automatisation totale de votre présence digitale.", features:["Alex Agent WhatsApp","Community Manager IA","Tableau de bord unifié","Support prioritaire 24/7","Économisez 15 000 FCFA/mois"], cta:"Obtenir le Pack", accent:"#FFB400", pop:true },
    ],
    reviews_label:"Témoignages",
    reviews_title:"Ils nous font confiance",
    reviews_sub:"Des entreprises béninoises qui ont automatisé avec DHA.",
    testimonials:[
      { name:"Fatou A.", role:"Gérante · Boutique Beauté, Cotonou", text:"Depuis Alex, je reçois plus les mêmes questions 10 fois par jour. Mes clients ont les réponses en secondes.", avatar:"F", color:"#00FFB4" },
      { name:"Kodjo M.", role:"Directeur · Import-Export, Porto-Novo", text:"Le rapport quotidien de prospects qualifiés est indispensable. Mon équipe sait exactement qui relancer chaque matin.", avatar:"K", color:"#00C8FF" },
      { name:"Rosine D.", role:"Fondatrice · Traiteur événementiel", text:"Ma page Facebook n'a jamais été aussi active. Le CM IA publie pour moi pendant que je travaille.", avatar:"R", color:"#FFB400" },
      { name:"Ibrahim S.", role:"PDG · Pharmacie Centrale, Parakou", text:"En 3 semaines, Alex a géré plus de 400 conversations. Zéro erreur, zéro plainte client. Impressionnant.", avatar:"I", color:"#00FFB4" },
      { name:"Aïcha B.", role:"Directrice · Centre de formation", text:"Nos inscriptions ont doublé. Alex répond la nuit quand nous sommes fermés. Nos concurrents ne comprennent pas comment.", avatar:"A", color:"#00C8FF" },
    ],
    faq_label:"FAQ",
    faq_title:"Vous avez des questions ?",
    faq_sub:"On vous répond ici.",
    faqs:[
      { cat:"💰 Investissement", q:"Est-ce que ça vaut vraiment 25 000 FCFA par mois ?", a:"Un commercial humain à Cotonou coûte entre 80 000 et 150 000 FCFA/mois — pour 8h/jour, 5 jours/semaine. Alex travaille 24h/24, 7j/7, répond en moins de 10 secondes et vous envoie un rapport chaque matin. Le calcul est vite fait." },
      { cat:"⚙️ Technique", q:"Comment Alex connaît mon business ?", a:"Lors de la configuration, on alimente Alex avec tout ce qu'il doit savoir : votre catalogue, vos prix, vos conditions de livraison, vos horaires. Il stocke ces informations dans une base de connaissance intelligente (RAG) et les utilise pour répondre avec précision." },
      { cat:"📱 WhatsApp", q:"Mon numéro WhatsApp risque-t-il d'être banni ?", a:"Non. Alex génère des messages naturels, avec des variations humaines — jamais du copier-coller en masse. Il respecte les fenêtres de 24h de WhatsApp et les règles anti-spam. Aucun de nos clients n'a jamais eu de problème." },
      { cat:"🤔 Objections", q:"Mes clients sont-ils prêts à parler à une IA ?", a:"Dans 95% des cas, les clients ne savent même pas qu'ils parlent à une IA — et s'en fichent, du moment qu'ils ont une réponse rapide." },
      { cat:"🌍 Local", q:"Est-ce que Alex comprend le contexte béninois ?", a:"Oui. Alex est configuré pour votre marché : il parle en FCFA, connaît Cotonou, Porto-Novo, Parakou, et peut même être configuré pour répondre en Fon ou Yoruba si votre clientèle le nécessite." },
      { cat:"📊 Résultats", q:"Comment je mesure les résultats ?", a:"Chaque matin, vous recevez un rapport avec : nombre de conversations gérées, prospects qualifiés, relances envoyées. Vous avez aussi accès à un tableau de bord Google Sheets mis à jour en temps réel." },
      { cat:"⚡ Démarrage", q:"Je ne suis pas tech. Est-ce que je peux vraiment utiliser ça ?", a:"Vous n'avez rien à installer, rien à coder. Vous nous donnez vos infos produits et votre numéro WhatsApp — on fait tout le reste. Si vous savez lire WhatsApp, vous savez utiliser nos produits." },
      { cat:"🔄 Flexibilité", q:"Que se passe-t-il si je veux arrêter ?", a:"Aucun engagement. Nos abonnements sont au mois, résiliables à tout moment sans frais. Un message WhatsApp suffit." },
    ],
    cta_title:"Prêt à automatiser ?",
    cta_sub:"Rejoignez les entreprises béninoises qui font confiance à l'IA pour grandir.",
    cta_wa:"💬 Contactez-nous sur WhatsApp",
    cta_demo:"🤖 Tester Alex d'abord",
    cta_badges:["✅ Consultation gratuite","✅ Sans engagement","✅ Support inclus"],
  },
  en: {
    hero_badge:"🇧🇯 AI & Automation Agency · Benin",
    hero_title:"Automate",
    hero_sparkle:"with AI",
    hero_sub:"Custom AI agents to respond to your clients, qualify prospects and publish your content — while you sleep.",
    hero_cta1:"💬 Get started free",
    hero_cta2:"🤖 Test Alex",
    hero_social:"Used by 50+ businesses in Benin",
    hero_stats:[["24/7","Available"],["< 10s","Response time"],["72h","Go live"],["Free","Consultation"]],
    features:[
      { icon:"⚡", title:"Response in 10 seconds", desc:"Never leave your prospects waiting. AI responds instantly, even at 3am." },
      { icon:"🎯", title:"Automatic qualification", desc:"Alex identifies hot prospects and alerts you immediately to convert them." },
      { icon:"📊", title:"Daily report", desc:"Every morning, receive a full summary of all conversations and qualified prospects." },
      { icon:"🌍", title:"Adapted to Beninese market", desc:"Understanding of local context, FCFA pricing, and African communication habits." },
    ],
    demo_label:"Live Demo",
    demo_title:"Talk to Alex now",
    demo_sub:"Test our AI agent in real time. Ask any question about DHA.",
    demo_disclaimer:"This is a demo. Your agent will be configured specifically for your business.",
    demo_suggestions:["💰 See pricing","🤖 How does it work?","📞 Contact team"],
    demo_placeholder:"Ask Alex a question...",
    demo_wa_suggestions:["💰 Pricing","🤖 How it works?","📞 Contact"],
    demo_wa_placeholder:"Type your message",
    products_label:"Our Products",
    products_title:"Two solutions, one goal",
    products_sub:"Automate to sell more, without working more.",
    prod1_tag:"Product 1 · Sales Agent",
    prod1_desc:"Your AI sales rep available 24/7 on WhatsApp. It responds, qualifies, follows up and reports — while you sleep or work on other things.",
    prod1_features:[
      { icon:"💬", title:"Instant responses", desc:"Responds to your clients in under 10 seconds, even at night and on weekends." },
      { icon:"🎯", title:"Smart qualification", desc:"Detects hot prospects and automatically tags them in your CRM." },
      { icon:"⏰", title:"Auto follow-up after 1h", desc:"If a prospect stops responding, Alex automatically follows up at the right time." },
      { icon:"📊", title:"Daily WhatsApp report", desc:"Every morning, you receive a full summary of prospects and conversations." },
      { icon:"🧠", title:"Conversational memory", desc:"Alex remembers each client and conversation history for a smooth experience." },
      { icon:"📚", title:"RAG knowledge base", desc:"Powered by your catalogs, product sheets, prices and info — always accurate answers." },
    ],
    prod1_workflow:[
      { label:"WhatsApp client", icon:"📱", color:"#00FFB4" },
      { label:"Alex responds", icon:"🤖", color:"#00FFB4" },
      { label:"Qualified prospect", icon:"🎯", color:"#FFB400" },
      { label:"Team alert", icon:"🔔", color:"#00C8FF" },
      { label:"Daily report", icon:"📊", color:"#A855F7" },
    ],
    prod2_tag:"Product 2 · Community Manager",
    prod2_desc:"Your Facebook page always active, without lifting a finger. AI finds trends, creates content and publishes automatically.",
    prod2_features:[
      { icon:"🔍", title:"Trend research", desc:"Tavily scans the web weekly to find topics that interest your audience." },
      { icon:"✍️", title:"AI-generated text", desc:"Content in French, adapted to the Beninese context and your brand tone." },
      { icon:"🎨", title:"Visuals with French text", desc:"AI-generated flyers and images with readable French text — pro quality." },
      { icon:"📅", title:"Automatic scheduling", desc:"Published Mon/Wed/Fri at 9am — no intervention required." },
      { icon:"📈", title:"Performance report", desc:"Track your publication stats from a simple dashboard." },
      { icon:"🌍", title:"100% local", desc:"Content designed for the Beninese market, cultural references and African trends." },
    ],
    prod2_workflow:[
      { label:"Web trends", icon:"🔍", color:"#00C8FF" },
      { label:"AI text", icon:"✍️", color:"#00C8FF" },
      { label:"Generated visual", icon:"🎨", color:"#A855F7" },
      { label:"Facebook post", icon:"📘", color:"#00C8FF" },
      { label:"Stats report", icon:"📈", color:"#00FFB4" },
    ],
    start_btn:"Get started →",
    process_label:"Process",
    process_title:"Live in 72 hours",
    process_sub:"No code, no hassle. We handle everything.",
    steps:[
      { n:"01", icon:"🎯", title:"Free consultation", desc:"We analyze your business and clients. A 30-min call is enough to understand everything." },
      { n:"02", icon:"⚙️", title:"Custom configuration", desc:"We configure Alex with your catalog, prices, tone. 100% personalized for you." },
      { n:"03", icon:"✅", title:"Test & validation", desc:"You test the agent before going live. We adjust until you're fully satisfied." },
      { n:"04", icon:"🚀", title:"Go live in 72h", desc:"Your AI agent is active. Ongoing support for updates and optimizations." },
    ],
    pricing_label:"Pricing",
    pricing_title:"Prices adapted to the local market",
    pricing_sub:"Monthly subscriptions. No commitment. Cancel anytime.",
    pricing_note:"Hesitant? The consultation is free —",
    pricing_wa:"contact us on WhatsApp",
    pricing_cards:[
      { name:"Alex Agent", oldPrice:"50 000", price:"25 000", unit:"FCFA/mo", desc:"For businesses and SMEs who want to automate their WhatsApp customer service.", features:["Custom WhatsApp agent","Prospect qualification","Daily report","Technical support included"], cta:"Start with Alex", accent:"#00FFB4", pop:false },
      { name:"AI Community Manager", oldPrice:"75 000", price:"35 000", unit:"FCFA/mo", desc:"For brands who want an active Facebook presence without effort.", features:["3 posts/week","AI-generated visuals","Locally adapted text","Auto trend research","Performance report"], cta:"Start CM AI", accent:"#00C8FF", pop:false },
      { name:"Complete Pack", oldPrice:"110 000", price:"50 000", unit:"FCFA/mo", desc:"Both solutions for total automation of your digital presence.", features:["Alex WhatsApp Agent","AI Community Manager","Unified dashboard","Priority 24/7 support","Save 15,000 FCFA/month"], cta:"Get the Pack", accent:"#FFB400", pop:true },
    ],
    reviews_label:"Reviews",
    reviews_title:"They trust us",
    reviews_sub:"Beninese businesses that automated with DHA.",
    testimonials:[
      { name:"Fatou A.", role:"Manager · Beauty Boutique, Cotonou", text:"Since Alex, I don't receive the same questions 10 times a day. My clients get answers in seconds.", avatar:"F", color:"#00FFB4" },
      { name:"Kodjo M.", role:"Director · Import-Export, Porto-Novo", text:"The daily qualified prospect report is indispensable. My team knows exactly who to follow up with each morning.", avatar:"K", color:"#00C8FF" },
      { name:"Rosine D.", role:"Founder · Catering company", text:"My Facebook page has never been so active. The AI CM posts for me while I work.", avatar:"R", color:"#FFB400" },
      { name:"Ibrahim S.", role:"CEO · Central Pharmacy, Parakou", text:"In 3 weeks, Alex handled over 400 conversations. Zero errors, zero client complaints. Impressive.", avatar:"I", color:"#00FFB4" },
      { name:"Aïcha B.", role:"Director · Training center", text:"Our enrollments doubled. Alex responds at night when we're closed. Our competitors don't understand how.", avatar:"A", color:"#00C8FF" },
    ],
    faq_label:"FAQ",
    faq_title:"Have questions?",
    faq_sub:"We answer them here.",
    faqs:[
      { cat:"💰 Investment", q:"Is it really worth 25,000 FCFA per month?", a:"A human sales rep in Cotonou costs 80,000 to 150,000 FCFA/month — for 8h/day, 5 days/week. Alex works 24/7, responds in under 10 seconds and sends you a report every morning. The math is simple." },
      { cat:"⚙️ Technical", q:"How does Alex know my business?", a:"During setup, we feed Alex everything it needs to know: your catalog, prices, delivery terms, hours. It stores this in an intelligent knowledge base (RAG) and uses it to respond accurately." },
      { cat:"📱 WhatsApp", q:"Will my WhatsApp number get banned?", a:"No. Alex generates natural messages with human variations — never mass copy-paste. It respects WhatsApp's 24h windows and anti-spam rules. None of our clients have ever had a problem." },
      { cat:"🤔 Objections", q:"Are my clients ready to talk to an AI?", a:"In 95% of cases, clients don't even know they're talking to AI — and don't care, as long as they get a fast, accurate answer. Alex responds in 10 seconds, even at midnight." },
      { cat:"🌍 Local", q:"Does Alex understand the Beninese context?", a:"Yes. Alex is configured for your market: it speaks i
