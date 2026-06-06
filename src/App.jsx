import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ══════════════════════════════════════════════════════
   HERO TITLE — MOT QUI CYCLE + SPARKLES
══════════════════════════════════════════════════════ */
const HERO_BLOCKS = {
  fr: [
    { text:"vos activités",       bg:"#00FFB4", color:"#050810" },
    { text:"votre support client", bg:"#FFB400", color:"#050810" },
    { text:"vos prospections",    bg:"#00C8FF", color:"#050810" },
  ],
  en: [
    { text:"your activities",     bg:"#00FFB4", color:"#050810" },
    { text:"your customer support",bg:"#FFB400", color:"#050810" },
    { text:"your prospecting",    bg:"#00C8FF", color:"#050810" },
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
    <span style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10, margin:"10px 0" }}>
      {blocks.map((b, i) => (
        <span key={i} style={{ display:"inline-block", background: active===i ? b.bg : "rgba(255,255,255,0.05)", color: active===i ? b.color : "rgba(255,255,255,0.2)", padding:"6px 20px", borderRadius:8, fontSize:"clamp(22px,5vw,48px)", fontWeight:900, letterSpacing:"-1.5px", lineHeight:1.15, transition:"background 0.4s ease, color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease", transform: active===i ? "scale(1.04)" : "scale(1)", boxShadow: active===i ? `0 0 30px ${b.bg}55` : "none", WebkitTextFillColor:"unset" }}>
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

/* ══════════════════════════════════════════════════════
   TRADUCTIONS COMPLÈTES
══════════════════════════════════════════════════════ */
const WA_NUMBER = "2290160008046";

const T = {
  fr: {
    /* NAV */
    nav_ia:"IA", nav_creative:"Créatif", nav_web:"Web",
    nav_products:"Produits", nav_demo:"🤖 Démo Alex", nav_how:"Comment ça marche",
    nav_pricing:"Tarifs", nav_reviews:"Témoignages", nav_faq:"FAQ", nav_start:"Démarrer →",
    /* HERO */
    hero_badge:"🇧🇯 Agence IA N°1 au Bénin",
    hero_title:"Automatisez",
    hero_sparkle:"avec l'IA",
    hero_sub:"Des agents IA sur mesure pour répondre à vos clients, qualifier vos prospects et publier votre contenu — pendant que vous dormez.",
    hero_cta1:"💬 Démarrer gratuitement",
    hero_cta2:"🤖 Tester Alex",
    hero_social:"Utilisé par +50 entreprises béninoises",
    hero_stats:[["24/7","Disponible"],["< 10s","Temps réponse"],["72h","Mise en ligne"],["0 FCFA","Consultation"]],
    /* FEATURES */
    features:[
      { icon:"⚡", title:"Réponse en 10 secondes", desc:"Ne laissez plus vos prospects en attente. L'IA répond instantanément, même à 3h du matin." },
      { icon:"🎯", title:"Qualification automatique", desc:"Alex identifie les prospects chauds et vous alerte immédiatement pour les convertir." },
      { icon:"📊", title:"Rapport quotidien", desc:"Chaque matin, recevez un récapitulatif complet de toutes les conversations et prospects qualifiés." },
      { icon:"🌍", title:"Adapté au marché béninois", desc:"Compréhension du contexte local, des prix en FCFA, et des habitudes de communication africaines." },
    ],
    /* DEMO */
    demo_label:"Démo Interactive",
    demo_title:"Parlez à Alex maintenant",
    demo_sub:"Testez notre agent IA en temps réel. Posez n'importe quelle question sur DHA.",
    demo_disclaimer:"Ceci est une démo. Votre agent sera configuré spécifiquement pour votre business.",
    demo_suggestions:["💰 Voir les prix","🤖 Comment ça marche ?","📞 Contacter l'équipe"],
    demo_placeholder:"Posez votre question à Alex...",
    demo_wa_suggestions:["💰 Les prix","🤖 Comment ça marche ?","📞 Contacter"],
    demo_wa_placeholder:"Tapez votre message",
    /* PRODUCTS */
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
    /* PROCESS */
    process_label:"Processus",
    process_title:"Opérationnel en 72h",
    process_sub:"Pas de code, pas de prise de tête. On s'occupe de tout.",
    steps:[
      { n:"01", icon:"🎯", title:"Consultation gratuite", desc:"On analyse votre activité et vos clients. Un appel de 30 min suffit pour tout comprendre." },
      { n:"02", icon:"⚙️", title:"Configuration sur mesure", desc:"On configure Alex avec votre catalogue, vos prix, votre ton. 100% personnalisé pour vous." },
      { n:"03", icon:"✅", title:"Test & validation", desc:"Vous testez l'agent avant la mise en ligne. On ajuste jusqu'à votre satisfaction totale." },
      { n:"04", icon:"🚀", title:"Mise en ligne en 72h", desc:"Votre agent IA est actif. Support continu pour les évolutions et optimisations." },
    ],
    /* PRICING */
    pricing_label:"Tarifs",
    pricing_title:"Des prix adaptés au marché local",
    pricing_sub:"Abonnements mensuels. Sans engagement. Résiliable à tout moment.",
    pricing_note:"Hésitations ? La consultation est gratuite —",
    pricing_wa:"contactez-nous sur WhatsApp",
    pricing_cards:[
      { name:"Alex Agent", oldPrice:"50 000", price:"25 000", unit:"FCFA/mois", desc:"Pour les commerces et PME qui veulent automatiser leur service client WhatsApp.", features:["Agent WhatsApp personnalisé","Qualification de prospects","Relances automatiques","Rapport quotidien","Support technique inclus"], cta:"Démarrer avec Alex", accent:"#00FFB4", pop:false },
      { name:"Community Manager IA", oldPrice:"75 000", price:"35 000", unit:"FCFA/mois", desc:"Pour les marques qui veulent une présence Facebook active sans effort.", features:["3 publications/semaine","Visuels générés par IA","Textes adaptés contexte local","Recherche de tendances auto","Rapport de performance"], cta:"Démarrer le CM IA", accent:"#00C8FF", pop:false },
      { name:"Pack Complet", oldPrice:"110 000", price:"50 000", unit:"FCFA/mois", desc:"Les deux solutions pour une automatisation totale de votre présence digitale.", features:["Alex Agent WhatsApp","Community Manager IA","Tableau de bord unifié","Support prioritaire 24/7","Économisez 15 000 FCFA/mois"], cta:"Obtenir le Pack", accent:"#FFB400", pop:true },
    ],
    /* TESTIMONIALS */
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
    /* FAQ */
    faq_label:"FAQ",
    faq_title:"Vous avez des questions ?",
    faq_sub:"On vous répond ici.",
    faqs:[
      { cat:"💰 Investissement", q:"Est-ce que ça vaut vraiment 25 000 FCFA par mois ?", a:"Un commercial humain à Cotonou coûte entre 80 000 et 150 000 FCFA/mois — pour 8h/jour, 5 jours/semaine. Alex travaille 24h/24, 7j/7, répond en moins de 10 secondes et vous envoie un rapport chaque matin. Le calcul est vite fait." },
      { cat:"⚙️ Technique", q:"Comment Alex connaît mon business ?", a:"Lors de la configuration, on alimente Alex avec tout ce qu'il doit savoir : votre catalogue, vos prix, vos conditions de livraison, vos horaires. Il stocke ces informations dans une base de connaissance intelligente (RAG) et les utilise pour répondre avec précision." },
      { cat:"📱 WhatsApp", q:"Mon numéro WhatsApp risque-t-il d'être banni ?", a:"Non. Alex génère des messages naturels, avec des variations humaines — jamais du copier-coller en masse. Il respecte les fenêtres de 24h de WhatsApp et les règles anti-spam. Aucun de nos clients n'a jamais eu de problème." },
      { cat:"🤔 Objections", q:"Mes clients sont-ils prêts à parler à une IA ?", a:"Dans 95% des cas, les clients ne savent même pas qu'ils parlent à une IA — et s'en fichent, du moment qu'ils obtiennent une réponse rapide. Alex répond en 10 secondes, même à minuit. C'est ça qui compte." },
      { cat:"🌍 Local", q:"Est-ce que Alex comprend le contexte béninois ?", a:"Oui. Alex est configuré pour votre marché : il parle en FCFA, connaît Cotonou, Porto-Novo, Parakou, et peut même être configuré pour répondre en Fon ou Yoruba si votre clientèle le nécessite." },
      { cat:"📊 Résultats", q:"Comment je mesure les résultats ?", a:"Chaque matin, vous recevez un rapport avec : nombre de conversations gérées, prospects qualifiés, relances envoyées. Vous avez aussi accès à un tableau de bord Google Sheets mis à jour en temps réel." },
      { cat:"⚡ Démarrage", q:"Je ne suis pas tech. Est-ce que je peux vraiment utiliser ça ?", a:"Vous n'avez rien à installer, rien à coder. Vous nous donnez vos infos produits et votre numéro WhatsApp — on fait tout le reste. Si vous savez lire WhatsApp, vous savez utiliser nos produits." },
      { cat:"🔄 Flexibilité", q:"Que se passe-t-il si je veux arrêter ?", a:"Aucun engagement. Nos abonnements sont au mois, résiliables à tout moment sans frais. Un message WhatsApp suffit." },
    ],
    /* CTA FINAL */
    cta_title:"Prêt à automatiser ?",
    cta_sub:"Rejoignez les entreprises béninoises qui font confiance à l'IA pour grandir.",
    cta_wa:"💬 Contactez-nous sur WhatsApp",
    cta_demo:"🤖 Tester Alex d'abord",
    cta_badges:["✅ Consultation gratuite","✅ Sans engagement","✅ Support inclus"],
    /* FOOTER */
    footer_copy:"Digital Horizon Agency · Cotonou, Bénin · © 2025 DHA",
    /* FLOATING */
    wa_bubble:"💬 Discutez avec Alex sur WhatsApp !",
    /* ALEX CHAT REPLIES */
    alex_replies:[
      { keys:["bonjour","salut","bonsoir","hello","hi"], reply:"Bonjour ! 👋 Je suis Alex, l'assistant IA de Digital Horizon Agency. Comment puis-je vous aider ?" },
      { keys:["prix","tarif","coût","combien","fcfa"], reply:"Nos offres démarrent à **25 000 FCFA/mois** pour Alex Agent WhatsApp. Le Pack Complet est à **50 000 FCFA/mois**. Vous souhaitez plus de détails ?" },
      { keys:["alex","agent","whatsapp","répondre","client"], reply:"Alex est notre agent commercial IA pour WhatsApp 🤖 Il répond à vos clients 24h/24, qualifie les prospects et envoie un rapport quotidien." },
      { keys:["facebook","publication","post","community","contenu"], reply:"Notre Community Manager IA publie automatiquement sur Facebook 3x/semaine 📲 Il recherche les tendances, génère le texte et les visuels." },
      { keys:["comment","marche","fonctionne","processus"], reply:"C'est simple : 1) Consultation gratuite → 2) Configuration → 3) Test → 4) Mise en ligne en 72h. On s'occupe de tout 🚀" },
      { keys:["contact","appel","parler","équipe"], reply:"Contactez notre équipe directement sur WhatsApp 💬 On vous répond en moins de 2h !" },
      { keys:["pack","complet","combo"], reply:"Le Pack Complet inclut Alex + Community Manager IA pour **50 000 FCFA/mois** — économisez 10 000 FCFA/mois ! 🎉" },
    ],
    alex_fallback:"Bonne question ! 🤔 Pour une réponse précise, contactez notre équipe directement sur WhatsApp. Ils vous répondront en moins de 2h 💬",
  },
  en: {
    /* NAV */
    nav_ia:"AI", nav_creative:"Creative", nav_web:"Web",
    nav_products:"Products", nav_demo:"🤖 Demo Alex", nav_how:"How it works",
    nav_pricing:"Pricing", nav_reviews:"Reviews", nav_faq:"FAQ", nav_start:"Get started →",
    /* HERO */
    hero_badge:"🇧🇯 #1 AI Agency in Benin",
    hero_title:"Automate",
    hero_sparkle:"with AI",
    hero_sub:"Custom AI agents to respond to your clients, qualify prospects and publish your content — while you sleep.",
    hero_cta1:"💬 Get started free",
    hero_cta2:"🤖 Test Alex",
    hero_social:"Used by 50+ businesses in Benin",
    hero_stats:[["24/7","Available"],["< 10s","Response time"],["72h","Go live"],["Free","Consultation"]],
    /* FEATURES */
    features:[
      { icon:"⚡", title:"Response in 10 seconds", desc:"Never leave your prospects waiting. AI responds instantly, even at 3am." },
      { icon:"🎯", title:"Automatic qualification", desc:"Alex identifies hot prospects and alerts you immediately to convert them." },
      { icon:"📊", title:"Daily report", desc:"Every morning, receive a full summary of all conversations and qualified prospects." },
      { icon:"🌍", title:"Adapted to Beninese market", desc:"Understanding of local context, FCFA pricing, and African communication habits." },
    ],
    /* DEMO */
    demo_label:"Live Demo",
    demo_title:"Talk to Alex now",
    demo_sub:"Test our AI agent in real time. Ask any question about DHA.",
    demo_disclaimer:"This is a demo. Your agent will be configured specifically for your business.",
    demo_suggestions:["💰 See pricing","🤖 How does it work?","📞 Contact team"],
    demo_placeholder:"Ask Alex a question...",
    demo_wa_suggestions:["💰 Pricing","🤖 How it works?","📞 Contact"],
    demo_wa_placeholder:"Type your message",
    /* PRODUCTS */
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
    /* PROCESS */
    process_label:"Process",
    process_title:"Live in 72 hours",
    process_sub:"No code, no hassle. We handle everything.",
    steps:[
      { n:"01", icon:"🎯", title:"Free consultation", desc:"We analyze your business and clients. A 30-min call is enough to understand everything." },
      { n:"02", icon:"⚙️", title:"Custom configuration", desc:"We configure Alex with your catalog, prices, tone. 100% personalized for you." },
      { n:"03", icon:"✅", title:"Test & validation", desc:"You test the agent before going live. We adjust until you're fully satisfied." },
      { n:"04", icon:"🚀", title:"Go live in 72h", desc:"Your AI agent is active. Ongoing support for updates and optimizations." },
    ],
    /* PRICING */
    pricing_label:"Pricing",
    pricing_title:"Prices adapted to the local market",
    pricing_sub:"Monthly subscriptions. No commitment. Cancel anytime.",
    pricing_note:"Hesitant? The consultation is free —",
    pricing_wa:"contact us on WhatsApp",
    pricing_cards:[
      { name:"Alex Agent", oldPrice:"50 000", price:"25 000", unit:"FCFA/mo", desc:"For businesses and SMEs who want to automate their WhatsApp customer service.", features:["Custom WhatsApp agent","Prospect qualification","Automatic follow-ups","Daily report","Technical support included"], cta:"Start with Alex", accent:"#00FFB4", pop:false },
      { name:"AI Community Manager", oldPrice:"75 000", price:"35 000", unit:"FCFA/mo", desc:"For brands who want an active Facebook presence without effort.", features:["3 posts/week","AI-generated visuals","Locally adapted text","Auto trend research","Performance report"], cta:"Start CM AI", accent:"#00C8FF", pop:false },
      { name:"Complete Pack", oldPrice:"110 000", price:"50 000", unit:"FCFA/mo", desc:"Both solutions for total automation of your digital presence.", features:["Alex WhatsApp Agent","AI Community Manager","Unified dashboard","Priority 24/7 support","Save 15,000 FCFA/month"], cta:"Get the Pack", accent:"#FFB400", pop:true },
    ],
    /* TESTIMONIALS */
    reviews_label:"Reviews",
    reviews_title:"They trust us",
    reviews_sub:"Beninese businesses that automated with DHA.",
    testimonials:[
      { name:"Fatou A.", role:"Manager · Beauty Boutique, Cotonou", text:"Since Alex, I no longer receive the same questions 10 times a day. My clients get answers in seconds.", avatar:"F", color:"#00FFB4" },
      { name:"Kodjo M.", role:"Director · Import-Export, Porto-Novo", text:"The daily qualified prospect report is indispensable. My team knows exactly who to follow up with each morning.", avatar:"K", color:"#00C8FF" },
      { name:"Rosine D.", role:"Founder · Catering company", text:"My Facebook page has never been so active. The AI CM posts for me while I work.", avatar:"R", color:"#FFB400" },
      { name:"Ibrahim S.", role:"CEO · Central Pharmacy, Parakou", text:"In 3 weeks, Alex handled over 400 conversations. Zero errors, zero client complaints. Impressive.", avatar:"I", color:"#00FFB4" },
      { name:"Aïcha B.", role:"Director · Training center", text:"Our enrollments doubled. Alex responds at night when we're closed. Our competitors don't understand how.", avatar:"A", color:"#00C8FF" },
    ],
    /* FAQ */
    faq_label:"FAQ",
    faq_title:"Have questions?",
    faq_sub:"We answer them here.",
    faqs:[
      { cat:"💰 Investment", q:"Is it really worth 25,000 FCFA per month?", a:"A human sales rep in Cotonou costs 80,000 to 150,000 FCFA/month — for 8h/day, 5 days/week. Alex works 24/7, responds in under 10 seconds and sends you a report every morning. The math is simple." },
      { cat:"⚙️ Technical", q:"How does Alex know my business?", a:"During setup, we feed Alex everything it needs to know: your catalog, prices, delivery terms, hours. It stores this in an intelligent knowledge base (RAG) and uses it to respond accurately." },
      { cat:"📱 WhatsApp", q:"Will my WhatsApp number get banned?", a:"No. Alex generates natural messages with human variations — never mass copy-paste. It respects WhatsApp's 24h windows and anti-spam rules. None of our clients have ever had a problem." },
      { cat:"🤔 Objections", q:"Are my clients ready to talk to an AI?", a:"In 95% of cases, clients don't even know they're talking to AI — and don't care, as long as they get a fast, accurate answer. Alex responds in 10 seconds, even at midnight." },
      { cat:"🌍 Local", q:"Does Alex understand the Beninese context?", a:"Yes. Alex is configured for your market: it speaks in FCFA, knows Cotonou, Porto-Novo, Parakou, and can even be set up to respond in Fon or Yoruba if your clients need it." },
      { cat:"📊 Results", q:"How do I measure results?", a:"Every morning you receive a report with: conversations handled, qualified prospects, follow-ups sent. You also have access to a Google Sheets dashboard updated in real time." },
      { cat:"⚡ Getting started", q:"I'm not tech-savvy. Can I really use this?", a:"You don't need to install or code anything. Give us your product info and WhatsApp number — we do the rest. If you can read WhatsApp, you can use our products." },
      { cat:"🔄 Flexibility", q:"What if I want to stop?", a:"No commitment. Monthly subscriptions, cancelable anytime with no fees. One WhatsApp message is all it takes." },
    ],
    /* CTA FINAL */
    cta_title:"Ready to automate?",
    cta_sub:"Join the Beninese businesses that trust AI to grow.",
    cta_wa:"💬 Contact us on WhatsApp",
    cta_demo:"🤖 Test Alex first",
    cta_badges:["✅ Free consultation","✅ No commitment","✅ Support included"],
    /* FOOTER */
    footer_copy:"Digital Horizon Agency · Cotonou, Benin · © 2025 DHA",
    /* FLOATING */
    wa_bubble:"💬 Chat with Alex on WhatsApp!",
    /* ALEX CHAT REPLIES */
    alex_replies:[
      { keys:["hello","hi","hey","good morning","good evening"], reply:"Hello! 👋 I'm Alex, DHA's AI assistant. How can I help you today?" },
      { keys:["price","pricing","cost","how much","fcfa"], reply:"Our offers start at **25,000 FCFA/month** for Alex WhatsApp Agent. The Complete Pack is **50,000 FCFA/month**. Want more details?" },
      { keys:["alex","agent","whatsapp","respond","client"], reply:"Alex is our AI sales agent for WhatsApp 🤖 It responds to your clients 24/7, qualifies prospects and sends a daily report." },
      { keys:["facebook","post","community","content"], reply:"Our AI Community Manager automatically posts on Facebook 3x/week 📲 It researches trends, generates text and visuals." },
      { keys:["how","works","process","steps"], reply:"Simple: 1) Free consultation → 2) Configuration → 3) Test → 4) Go live in 72h. We handle everything 🚀" },
      { keys:["contact","call","talk","team"], reply:"Contact our team directly on WhatsApp 💬 We respond in under 2 hours!" },
      { keys:["pack","complete","combo","both"], reply:"The Complete Pack includes Alex + AI Community Manager for **50,000 FCFA/month** — save 10,000 FCFA/month! 🎉" },
    ],
    alex_fallback:"Great question! 🤔 For a precise answer tailored to your situation, contact our team directly on WhatsApp. They'll respond in under 2 hours 💬",
  },
};

/* ══════════════════════════════════════════════════════
   CHAT DEMO
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

function DemoChat({ lang }) {
  const t = T[lang] || T.fr;
  const [msgs, setMsgs] = useState([
    { role:"alex", text: lang === "en" ? "Hello! 👋 I'm Alex, DHA's AI assistant. Ask me a question about our services!" : "Bonjour ! 👋 Je suis Alex, l'assistant IA de DHA. Posez-moi une question sur nos services !", time: new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}) }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (msgs.length > 1) setTimeout(() => bottomRef.current?.scrollIntoView({ behavior:"smooth", block:"end" }), 100);
  }, [msgs, typing]);

  const getReply = (msg) => {
    const lower = msg.toLowerCase();
    for (const r of t.alex_replies) {
      if (r.keys.some(k => lower.includes(k))) return r.reply;
    }
    return t.alex_fallback;
  };

  const send = async () => {
    const txt = input.trim();
    if (!txt || typing) return;
    const time = new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"});
    setInput("");
    setMsgs(p => [...p, { role:"user", text:txt, time }]);
    setTyping(true);
    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
    setTyping(false);
    setMsgs(p => [...p, { role:"alex", text:getReply(txt), time: new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}) }]);
  };

  const renderText = (tx) => tx.split(/\*\*(.*?)\*\*/g).map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part);

  if (isMobile) {
    return (
      <div style={{ borderRadius:16, overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.6)", maxWidth:340, margin:"0 auto", fontFamily:"'Segoe UI',sans-serif" }}>
        <div style={{ background:"#075E54", padding:"10px 14px", display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ fontSize:18, color:"#fff" }}>←</div>
          <div style={{ width:36, height:36, borderRadius:"50%", background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"#fff", fontSize:14 }}>A</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:700, color:"#fff" }}>Alex · DHA</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.7)" }}>{lang==="en" ? "online" : "en ligne"}</div>
          </div>
          <div style={{ display:"flex", gap:16, color:"rgba(255,255,255,0.8)", fontSize:18 }}><span>📞</span><span>⋮</span></div>
        </div>
        <div style={{ background:"#ECE5DD", backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4c9ba' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")", height:320, overflowY:"auto", padding:"12px 10px", display:"flex", flexDirection:"column", gap:6 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display:"flex", justifyContent: m.role==="alex" ? "flex-start" : "flex-end" }}>
              <div style={{ maxWidth:"80%", padding:"7px 10px 4px", fontSize:13, lineHeight:1.5, background: m.role==="alex" ? "#fff" : "#DCF8C6", color:"#111", borderRadius: m.role==="alex" ? "0px 10px 10px 10px" : "10px 0px 10px 10px", boxShadow:"0 1px 2px rgba(0,0,0,0.15)", animation:"fadeUp 0.3s ease both" }}>
                {m.role==="alex" && <div style={{ fontSize:11, color:"#075E54", fontWeight:700, marginBottom:3 }}>Alex · DHA</div>}
                <div>{renderText(m.text)}</div>
                <div style={{ fontSize:10, color:"#999", textAlign:"right", marginTop:3, display:"flex", alignItems:"center", justifyContent:"flex-end", gap:3 }}>
                  {m.time}{m.role==="user" && <span style={{ color:"#53BDEB" }}>✓✓</span>}
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
        <div style={{ background:"#ECE5DD", padding:"6px 10px", display:"flex", gap:6, flexWrap:"wrap" }}>
          {t.demo_wa_suggestions.map(s => (
            <button key={s} onClick={() => setInput(s)} style={{ background:"#fff", border:"1px solid #d0d0d0", borderRadius:20, padding:"4px 10px", fontSize:11, color:"#075E54", cursor:"pointer", fontFamily:"inherit" }}>{s}</button>
          ))}
        </div>
        <div style={{ background:"#F0F0F0", padding:"8px 10px", display:"flex", alignItems:"center", gap:8 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key==="Enter") send(); }} placeholder={t.demo_wa_placeholder} style={{ flex:1, background:"#fff", borderRadius:24, padding:"10px 14px", fontSize:13, color:"#111", border:"none", outline:"none", fontFamily:"inherit" }} />
          <button onClick={send} disabled={typing || !input.trim()} style={{ width:42, height:42, borderRadius:"50%", background: input.trim() ? "#075E54" : "#aaa", border:"none", cursor: input.trim() ? "pointer" : "default", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:"#fff" }}>➤</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background:"#0a0f1e", border:"1px solid rgba(0,255,180,0.12)", borderRadius:20, overflow:"hidden", boxShadow:"0 30px 80px rgba(0,0,0,0.5)" }}>
      <div style={{ background:"rgba(0,255,180,0.06)", borderBottom:"1px solid rgba(0,255,180,0.1)", padding:"14px 18px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:38, height:38, borderRadius:"50%", background:"linear-gradient(135deg,#00FFB4,#00C8FF)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"#050810", fontSize:15 }}>A</div>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:"#fff" }}>Alex · Agent Commercial DHA</div>
            <div style={{ fontSize:11, color:"#00FFB4", display:"flex", alignItems:"center", gap:5, marginTop:3 }}>
              <span style={{ width:5, height:5, background:"#00FFB4", borderRadius:"50%", animation:"blink 2s infinite" }} />
              {lang==="en" ? "Online · Responds in under 10s" : "En ligne · Répond en moins de 10s"}
            </div>
          </div>
        </div>
        <div style={{ background:"rgba(0,255,180,0.1)", border:"1px solid rgba(0,255,180,0.2)", borderRadius:8, padding:"4px 10px", fontSize:10, color:"#00FFB4", fontWeight:700 }}>LIVE DEMO</div>
      </div>
      <div style={{ height:340, overflowY:"auto", padding:"16px 14px", display:"flex", flexDirection:"column", gap:12 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display:"flex", justifyContent: m.role==="alex" ? "flex-start" : "flex-end", alignItems:"flex-end", gap:8 }}>
            {m.role==="alex" && <div style={{ width:26, height:26, borderRadius:"50%", background:"linear-gradient(135deg,#00FFB4,#00C8FF)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"#050810", fontSize:10, flexShrink:0 }}>A</div>}
            <div style={{ maxWidth:"78%", padding:"10px 14px", fontSize:13, lineHeight:1.65, background: m.role==="alex" ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg,#00FFB4,#00C8FF)", color: m.role==="alex" ? "#e2e8f0" : "#050810", borderRadius: m.role==="alex" ? "4px 16px 16px 16px" : "16px 4px 16px 16px", border: m.role==="alex" ? "1px solid rgba(255,255,255,0.07)" : "none", animation:"fadeUp 0.3s ease both" }}>{renderText(m.text)}</div>
          </div>
        ))}
        {typing && (
          <div style={{ display:"flex", alignItems:"flex-end", gap:8 }}>
            <div style={{ width:26, height:26, borderRadius:"50%", background:"linear-gradient(135deg,#00FFB4,#00C8FF)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"#050810", fontSize:10, flexShrink:0 }}>A</div>
            <div style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"4px 16px 16px 16px", padding:"12px 16px", display:"flex", gap:4 }}>
              {[0,0.2,0.4].map((d,i) => <span key={i} style={{ width:6, height:6, background:"#00FFB4", borderRadius:"50%", display:"inline-block", animation:`typeBounce 0.9s ${d}s infinite` }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding:"0 14px 10px", display:"flex", gap:6, flexWrap:"wrap" }}>
        {t.demo_suggestions.map(s => (
          <button key={s} onClick={() => setInput(s)} style={{ background:"rgba(0,255,180,0.06)", border:"1px solid rgba(0,255,180,0.15)", borderRadius:20, padding:"5px 12px", fontSize:11, color:"#00FFB4", cursor:"pointer", fontFamily:"inherit" }}>{s}</button>
        ))}
      </div>
      <div style={{ padding:"10px 12px 14px", borderTop:"1px solid rgba(255,255,255,0.05)", display:"flex", gap:8 }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")send();}} placeholder={t.demo_placeholder} style={{ flex:1, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, padding:"11px 14px", fontSize:13, color:"#e2e8f0", outline:"none", fontFamily:"inherit" }} />
        <button onClick={send} disabled={typing || !input.trim()} style={{ width:42, height:42, borderRadius:12, background: input.trim() ? "linear-gradient(135deg,#00FFB4,#00C8FF)" : "rgba(255,255,255,0.05)", border:"none", cursor: input.trim() ? "pointer" : "default", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>➤</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   FLOATING WIDGET
══════════════════════════════════════════════════════ */
function FloatingWidget({ lang }) {
  const t = T[lang] || T.fr;
  const [pulse, setPulse] = useState(true);
  useEffect(() => { const ti = setTimeout(() => setPulse(false), 5000); return () => clearTimeout(ti); }, []);
  return (
    <div style={{ position:"fixed", bottom:24, right:20, zIndex:300 }}>
      {pulse && (
        <div style={{ position:"absolute", bottom:66, right:0, background:"#075E54", border:"1px solid rgba(37,211,102,0.3)", borderRadius:"12px 12px 4px 12px", padding:"8px 14px", fontSize:12, color:"#fff", whiteSpace:"nowrap", boxShadow:"0 4px 20px rgba(0,0,0,0.4)", animation:"slideUp 0.4s ease" }}>
          {t.wa_bubble}
        </div>
      )}
      <a href={`https://wa.me/${WA_NUMBER}?text=Bonjour%20Alex%20!%20Je%20veux%20en%20savoir%20plus%20sur%20DHA.`} target="_blank" rel="noopener noreferrer" style={{ width:56, height:56, borderRadius:"50%", background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 20px rgba(37,211,102,0.5)", textDecoration:"none", transition:"transform 0.2s" }} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   TESTIMONIALS SCROLL
══════════════════════════════════════════════════════ */
function TestimonialsScroll({ testimonials }) {
  const doubled = [...testimonials, ...testimonials];
  return (
    <div style={{ overflow:"hidden", position:"relative", padding:"20px 0" }}>
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:80, background:"linear-gradient(90deg,#050810,transparent)", zIndex:2 }} />
      <div style={{ position:"absolute", right:0, top:0, bottom:0, width:80, background:"linear-gradient(-90deg,#050810,transparent)", zIndex:2 }} />
      <div style={{ display:"flex", gap:16, animation:"scrollLeft 30s linear infinite", width:"max-content" }}>
        {doubled.map((t, i) => (
          <div key={i} style={{ width:280, flexShrink:0, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"20px 18px" }}>
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
   FAQ
══════════════════════════════════════════════════════ */
function FAQ({ faqs }) {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
      {faqs.map((f, i) => (
        <div key={i} style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${open===i ? "rgba(0,255,180,0.25)" : "rgba(255,255,255,0.07)"}`, borderRadius:14, overflow:"hidden", transition:"border 0.3s" }}>
          <button onClick={() => setOpen(open===i ? null : i)} style={{ width:"100%", background:"none", border:"none", padding:"16px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", fontFamily:"inherit", textAlign:"left", gap:12 }}>
            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              <span style={{ fontSize:10, color: open===i ? "#00FFB4" : "#475569", fontWeight:700, letterSpacing:"0.5px" }}>{f.cat}</span>
              <span style={{ fontSize:14, fontWeight:600, color: open===i ? "#fff" : "#cbd5e1", transition:"color 0.3s", lineHeight:1.4 }}>{f.q}</span>
            </div>
            <span style={{ color: open===i ? "#00FFB4" : "#475569", fontSize:20, flexShrink:0, transition:"transform 0.3s, color 0.3s", transform: open===i ? "rotate(45deg)" : "rotate(0)", lineHeight:1 }}>+</span>
          </button>
          {open===i && <div style={{ padding:"0 20px 18px", paddingTop:14, fontSize:13, color:"#94a3b8", lineHeight:1.85, animation:"fadeUp 0.25s ease", borderTop:"1px solid rgba(255,255,255,0.04)" }}>{f.a}</div>}
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════ */
export default function DHASite() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [vis, setVis] = useState(new Set());
  const [activeStep, setActiveStep] = useState(0);
  const [lang, setLang] = useState("fr");
  const t = T[lang] || T.fr;

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

  useEffect(() => {
    const ti = setInterval(() => setActiveStep(p => (p+1) % t.steps.length), 3500);
    return () => clearInterval(ti);
  }, [t.steps.length]);

  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMenuOpen(false); };
  const v = id => vis.has(id);

  const pageLinks = [
    { to:"/",         label:t.nav_ia,       emoji:"🤖", active:true },
    { to:"/creative", label:t.nav_creative,  emoji:"🎨" },
    { to:"/web",      label:t.nav_web,       emoji:"💻" },
  ];

  const navLinks = [
    ["produits",    t.nav_products],
    ["demo",        t.nav_demo],
    ["comment",     t.nav_how],
    ["tarifs",      t.nav_pricing],
    ["temoignages", t.nav_reviews],
    ["faq",         t.nav_faq],
  ];

  return (
    <div style={{ fontFamily:"'Outfit',sans-serif", background:"#050810", color:"#e2e8f0", overflowX:"hidden" }}>
      <style>{CSS}</style>

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, transition:"all 0.4s", background: scrollY>60 ? "rgba(5,8,16,0.95)" : "transparent", backdropFilter: scrollY>60 ? "blur(24px)" : "none", borderBottom: scrollY>60 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 20px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
          <Link to="/" style={{ fontSize:22, fontWeight:900, letterSpacing:"-1px", color:"#e2e8f0", textDecoration:"none", flexShrink:0 }}>
            <span style={{ color:"#00FFB4" }}>D</span>HA
            <span style={{ fontSize:11, color:"#94a3b8", fontWeight:400, marginLeft:8, letterSpacing:"1px" }}>AGENCY</span>
          </Link>

          <div className="desk-nav" style={{ alignItems:"center", gap:2, flex:1, justifyContent:"center" }}>
            {pageLinks.map(({ to, label, emoji, active }) => (
              <Link key={to} to={to} style={{ background: active ? "rgba(0,255,180,0.08)" : "none", border: active ? "1px solid rgba(0,255,180,0.2)" : "1px solid transparent", color: active ? "#00FFB4" : "#94a3b8", fontSize:12, padding:"6px 12px", borderRadius:8, textDecoration:"none", fontWeight: active ? 700 : 500, transition:"all 0.2s", display:"flex", alignItems:"center", gap:5 }}>
                <span>{emoji}</span>{label}
              </Link>
            ))}
            <div style={{ width:1, height:18, background:"rgba(255,255,255,0.06)", margin:"0 6px" }} />
            {navLinks.map(([id,label]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{ background:"none", border:"none", color: id==="demo" ? "#00FFB4" : "#94a3b8", fontSize:12, cursor:"pointer", padding:"6px 11px", borderRadius:8, fontFamily:"inherit", fontWeight: id==="demo" ? 700 : 500, transition:"color 0.2s", whiteSpace:"nowrap" }}>{label}</button>
            ))}
          </div>

          <div className="desk-nav" style={{ alignItems:"center", gap:8, flexShrink:0 }}>
            {/* Lang toggle FR/EN */}
            <div style={{ display:"flex", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, overflow:"hidden" }}>
              {["fr","en"].map(code => (
                <button key={code} onClick={() => setLang(code)} style={{ background: lang===code ? "rgba(0,255,180,0.15)" : "none", border:"none", padding:"6px 12px", fontSize:12, color: lang===code ? "#00FFB4" : "#94a3b8", cursor:"pointer", fontFamily:"inherit", fontWeight: lang===code ? 700 : 400, transition:"all 0.2s" }}>
                  {code === "fr" ? "🇫🇷 FR" : "🇬🇧 EN"}
                </button>
              ))}
            </div>
            <a href={`https://wa.me/${WA_NUMBER}`} style={{ background:"linear-gradient(135deg,#00FFB4,#00C8FF)", color:"#050810", padding:"9px 16px", borderRadius:10, fontSize:12, fontWeight:700, textDecoration:"none", whiteSpace:"nowrap" }}>{t.nav_start}</a>
          </div>

          <button className="burger" onClick={() => setMenuOpen(!menuOpen)} style={{ display:"none", background:"none", border:"none", color:"#e2e8f0", fontSize:24, cursor:"pointer" }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div style={{ background:"rgba(5,8,16,0.98)", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ padding:"10px 20px 6px", display:"flex", gap:8, flexWrap:"wrap" }}>
              {pageLinks.map(({ to, label, emoji, active }) => (
                <Link key={to} to={to} onClick={() => setMenuOpen(false)} style={{ background: active ? "rgba(0,255,180,0.08)" : "rgba(255,255,255,0.03)", border: active ? "1px solid rgba(0,255,180,0.2)" : "1px solid rgba(255,255,255,0.06)", color: active ? "#00FFB4" : "#94a3b8", fontSize:12, padding:"6px 12px", borderRadius:8, textDecoration:"none", fontWeight: active ? 700 : 500, display:"flex", alignItems:"center", gap:5 }}>
                  {emoji} {label}
                </Link>
              ))}
            </div>
            <div style={{ height:1, background:"rgba(255,255,255,0.06)", margin:"6px 0" }} />
            {navLinks.map(([id,label]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{ display:"block", width:"100%", background:"none", border:"none", borderBottom:"1px solid rgba(255,255,255,0.06)", color: id==="demo"?"#00FFB4":"#94a3b8", fontSize:15, padding:"14px 24px", textAlign:"left", cursor:"pointer", fontFamily:"inherit" }}>{label}</button>
            ))}
            <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 20px" }}>
              <div style={{ display:"flex", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, overflow:"hidden" }}>
                {["fr","en"].map(code => (
                  <button key={code} onClick={() => setLang(code)} style={{ background: lang===code ? "rgba(0,255,180,0.15)" : "none", border:"none", padding:"7px 14px", fontSize:12, color: lang===code ? "#00FFB4" : "#94a3b8", cursor:"pointer", fontFamily:"inherit", fontWeight: lang===code ? 700 : 400 }}>
                    {code==="fr" ? "🇫🇷 FR" : "🇬🇧 EN"}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ padding:"4px 20px 16px" }}>
              <a href={`https://wa.me/${WA_NUMBER}`} style={{ display:"block", background:"linear-gradient(135deg,#00FFB4,#00C8FF)", color:"#050810", padding:"13px", borderRadius:12, fontSize:15, fontWeight:700, textDecoration:"none", textAlign:"center" }}>{t.nav_start}</a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ minHeight:"100svh", padding:"90px 20px 60px", position:"relative", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(0,255,180,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,180,0.03) 1px,transparent 1px)", backgroundSize:"64px 64px" }} />
        <div style={{ position:"absolute", top:"-5%", left:"-10%", width:"50vw", height:"50vw", maxWidth:600, maxHeight:600, background:"radial-gradient(circle,rgba(0,255,180,0.08) 0%,transparent 65%)", filter:"blur(60px)", borderRadius:"50%" }} />
        <div style={{ position:"absolute", bottom:"-5%", right:"-10%", width:"45vw", height:"45vw", maxWidth:500, maxHeight:500, background:"radial-gradient(circle,rgba(0,200,255,0.07) 0%,transparent 65%)", filter:"blur(60px)", borderRadius:"50%" }} />
        <div style={{ position:"relative", zIndex:1, maxWidth:700, textAlign:"center" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(0,255,180,0.07)", border:"1px solid rgba(0,255,180,0.2)", borderRadius:24, padding:"7px 16px", fontSize:12, color:"#00FFB4", marginBottom:28, animation:"fadeUp 0.6s ease both" }}>
            <span style={{ width:6, height:6, background:"#00FFB4", borderRadius:"50%", animation:"blink 2s infinite" }} />
            {t.hero_badge}
          </div>
          <h1 style={{ fontSize:"clamp(36px,8vw,72px)", fontWeight:900, lineHeight:1.15, letterSpacing:"-2.5px", color:"#fff", margin:"0 0 20px", animation:"fadeUp 0.7s 0.1s ease both", display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            <span>{t.hero_title}</span>
            <HeroWord lang={lang} />
            <SparkleText text={t.hero_sparkle} />
          </h1>
          <p style={{ fontSize:"clamp(15px,3.5vw,18px)", color:"#94a3b8", lineHeight:1.75, maxWidth:520, margin:"0 auto 36px", animation:"fadeUp 0.7s 0.2s ease both" }}>{t.hero_sub}</p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:48, animation:"fadeUp 0.7s 0.3s ease both" }}>
            <a href={`https://wa.me/${WA_NUMBER}`} style={{ background:"linear-gradient(135deg,#00FFB4,#00C8FF)", color:"#050810", padding:"14px 28px", borderRadius:12, fontSize:15, fontWeight:700, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8, boxShadow:"0 0 40px rgba(0,255,180,0.25)" }}>{t.hero_cta1}</a>
            <button onClick={() => scrollTo("demo")} style={{ background:"rgba(255,255,255,0.05)", color:"#e2e8f0", border:"1px solid rgba(255,255,255,0.1)", padding:"14px 28px", borderRadius:12, fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>{t.hero_cta2}</button>
          </div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:16, flexWrap:"wrap", animation:"fadeUp 0.7s 0.4s ease both" }}>
            <div style={{ display:"flex" }}>
              {["F","K","R","I","A"].map((l,i) => (
                <div key={i} style={{ width:32, height:32, borderRadius:"50%", background:`linear-gradient(135deg,${["#00FFB4","#00C8FF","#FFB400","#00FFB4","#00C8FF"][i]},#050810)`, border:"2px solid #050810", marginLeft: i>0?-8:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:"#050810" }}>{l}</div>
              ))}
            </div>
            <div style={{ fontSize:13, color:"#64748b" }}><span style={{ color:"#00FFB4", fontWeight:700 }}>4.9/5</span> · {t.hero_social}</div>
          </div>
          <div style={{ display:"flex", gap:24, justifyContent:"center", flexWrap:"wrap", marginTop:48, animation:"fadeUp 0.7s 0.5s ease both" }}>
            {t.hero_stats.map(([v,l]) => (
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontSize:"clamp(20px,4vw,28px)", fontWeight:900, color:"#00FFB4", letterSpacing:"-1px", lineHeight:1.1 }}>{v}</div>
                <div style={{ fontSize:11, color:"#475569", marginTop:3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:"60px 20px", background:"linear-gradient(180deg,#050810,#070d1a)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="feat-grid">
            {t.features.map((f, i) => (
              <div key={i} data-observe id={`feat${i}`} style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:16, padding:"24px 20px", opacity:v(`feat${i}`)?1:0, transform:v(`feat${i}`)?"none":"translateY(24px)", transition:`all 0.6s ease ${i*0.1}s` }}>
                <div style={{ fontSize:28, marginBottom:14 }}>{f.icon}</div>
                <h3 style={{ fontSize:15, fontWeight:700, color:"#fff", marginBottom:8, lineHeight:1.3 }}>{f.title}</h3>
                <p style={{ fontSize:13, color:"#64748b", lineHeight:1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" style={{ padding:"80px 20px", background:"#070d1a" }}>
        <div style={{ maxWidth:680, margin:"0 auto" }}>
          <div data-observe id="demo-h" style={{ textAlign:"center", marginBottom:40, opacity:v("demo-h")?1:0, transform:v("demo-h")?"none":"translateY(24px)", transition:"all 0.7s" }}>
            <div style={labelStyle}>{t.demo_label}</div>
            <h2 style={h2Style}>{t.demo_title}</h2>
            <p style={{ fontSize:15, color:"#64748b", maxWidth:460, margin:"0 auto" }}>{t.demo_sub}</p>
          </div>
          <div data-observe id="demo-chat" style={{ opacity:v("demo-chat")?1:0, transform:v("demo-chat")?"none":"translateY(30px)", transition:"all 0.7s 0.15s" }}>
            <DemoChat lang={lang} />
          </div>
          <p style={{ textAlign:"center", fontSize:12, color:"#334155", marginTop:14 }}>{t.demo_disclaimer}</p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="produits" style={{ padding:"80px 20px", background:"#050810" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div data-observe id="prod-h" style={{ textAlign:"center", marginBottom:48, opacity:v("prod-h")?1:0, transform:v("prod-h")?"none":"translateY(24px)", transition:"all 0.7s" }}>
            <div style={labelStyle}>{t.products_label}</div>
            <h2 style={h2Style}>{t.products_title}</h2>
            <p style={subStyle}>{t.products_sub}</p>
          </div>
          {/* ALEX */}
          <div data-observe id="p1" style={{ opacity:v("p1")?1:0, transform:v("p1")?"none":"translateY(36px)", transition:"all 0.7s ease", marginBottom:24 }}>
            <div style={{ background:"rgba(0,255,180,0.03)", border:"1px solid rgba(0,255,180,0.18)", borderRadius:24, overflow:"hidden", position:"relative" }}>
              <div style={{ position:"absolute", top:-60, right:-60, width:300, height:300, background:"radial-gradient(circle,rgba(0,255,180,0.07),transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />
              <div style={{ padding:"32px 28px 0" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:16, marginBottom:20 }}>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                      <div style={{ width:48, height:48, borderRadius:13, background:"rgba(0,255,180,0.1)", border:"1px solid rgba(0,255,180,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>🤖</div>
                      <div>
                        <div style={{ fontSize:10, letterSpacing:"1.5px", color:"#00FFB4", fontWeight:700, textTransform:"uppercase", marginBottom:3 }}>{t.prod1_tag}</div>
                        <h3 style={{ fontSize:28, fontWeight:900, color:"#00FFB4", letterSpacing:"-1px", lineHeight:1 }}>ALEX</h3>
                      </div>
                    </div>
                    <p style={{ fontSize:14, color:"#94a3b8", lineHeight:1.75, maxWidth:520 }}>{t.prod1_desc}</p>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontSize:12, color:"#475569", textDecoration:"line-through" }}>50 000 FCFA/mois</div>
                    <div style={{ fontSize:28, fontWeight:900, color:"#00FFB4", letterSpacing:"-1px" }}>25 000</div>
                    <div style={{ display:"flex", alignItems:"center", gap:6, justifyContent:"flex-end" }}>
                      <span style={{ fontSize:12, color:"#475569" }}>FCFA / {lang==="en"?"mo":"mois"}</span>
                      <span style={{ fontSize:10, background:"rgba(0,255,180,0.1)", color:"#00FFB4", border:"1px solid rgba(0,255,180,0.2)", borderRadius:20, padding:"2px 7px", fontWeight:700 }}>-50%</span>
                    </div>
                    <a href={`https://wa.me/${WA_NUMBER}`} style={{ display:"inline-block", marginTop:10, background:"linear-gradient(135deg,#00FFB4,#00C8FF)", color:"#050810", padding:"10px 20px", borderRadius:10, fontSize:13, fontWeight:700, textDecoration:"none" }}>{t.start_btn}</a>
                  </div>
                </div>
                <div className="feat6-grid" style={{ marginBottom:28 }}>
                  {t.prod1_features.map((f,i) => (
                    <div key={i} style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(0,255,180,0.08)", borderRadius:14, padding:"16px 14px" }}>
                      <div style={{ fontSize:20, marginBottom:8 }}>{f.icon}</div>
                      <div style={{ fontSize:13, fontWeight:700, color:"#e2e8f0", marginBottom:5 }}>{f.title}</div>
                      <div style={{ fontSize:12, color:"#64748b", lineHeight:1.6 }}>{f.desc}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background:"rgba(0,0,0,0.3)", borderTop:"1px solid rgba(0,255,180,0.08)", padding:"18px 0 20px", display:"flex", alignItems:"center", justifyContent:"center", gap:0, flexWrap:"wrap", overflow:"hidden" }}>
                  {t.prod1_workflow.map((step, i, arr) => (
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
          {/* CM */}
          <div data-observe id="p2" style={{ opacity:v("p2")?1:0, transform:v("p2")?"none":"translateY(36px)", transition:"all 0.7s ease 0.15s" }}>
            <div style={{ background:"rgba(0,200,255,0.03)", border:"1px solid rgba(0,200,255,0.18)", borderRadius:24, overflow:"hidden", position:"relative" }}>
              <div style={{ position:"absolute", top:-60, left:-60, width:280, height:280, background:"radial-gradient(circle,rgba(0,200,255,0.06),transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />
              <div style={{ padding:"32px 28px 0" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:16, marginBottom:20 }}>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                      <div style={{ width:48, height:48, borderRadius:13, background:"rgba(0,200,255,0.1)", border:"1px solid rgba(0,200,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>📲</div>
                      <div>
                        <div style={{ fontSize:10, letterSpacing:"1.5px", color:"#00C8FF", fontWeight:700, textTransform:"uppercase", marginBottom:3 }}>{t.prod2_tag}</div>
                        <h3 style={{ fontSize:24, fontWeight:900, color:"#00C8FF", letterSpacing:"-0.8px", lineHeight:1 }}>{lang==="en" ? "AI Community Manager" : "Community Manager IA"}</h3>
                      </div>
                    </div>
                    <p style={{ fontSize:14, color:"#94a3b8", lineHeight:1.75, maxWidth:520 }}>{t.prod2_desc}</p>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontSize:12, color:"#475569", textDecoration:"line-through" }}>75 000 FCFA/mois</div>
                    <div style={{ fontSize:28, fontWeight:900, color:"#00C8FF", letterSpacing:"-1px" }}>35 000</div>
                    <div style={{ display:"flex", alignItems:"center", gap:6, justifyContent:"flex-end" }}>
                      <span style={{ fontSize:12, color:"#475569" }}>FCFA / {lang==="en"?"mo":"mois"}</span>
                      <span style={{ fontSize:10, background:"rgba(0,200,255,0.1)", color:"#00C8FF", border:"1px solid rgba(0,200,255,0.2)", borderRadius:20, padding:"2px 7px", fontWeight:700 }}>-53%</span>
                    </div>
                    <a href={`https://wa.me/${WA_NUMBER}`} style={{ display:"inline-block", marginTop:10, background:"linear-gradient(135deg,#00C8FF,#00C8FF99)", color:"#050810", padding:"10px 20px", borderRadius:10, fontSize:13, fontWeight:700, textDecoration:"none" }}>{t.start_btn}</a>
                  </div>
                </div>
                <div className="feat6-grid" style={{ marginBottom:28 }}>
                  {t.prod2_features.map((f,i) => (
                    <div key={i} style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(0,200,255,0.08)", borderRadius:14, padding:"16px 14px" }}>
                      <div style={{ fontSize:20, marginBottom:8 }}>{f.icon}</div>
                      <div style={{ fontSize:13, fontWeight:700, color:"#e2e8f0", marginBottom:5 }}>{f.title}</div>
                      <div style={{ fontSize:12, color:"#64748b", lineHeight:1.6 }}>{f.desc}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background:"rgba(0,0,0,0.3)", borderTop:"1px solid rgba(0,200,255,0.08)", padding:"18px 0 20px", display:"flex", alignItems:"center", justifyContent:"center", gap:0, flexWrap:"wrap" }}>
                  {t.prod2_workflow.map((step, i, arr) => (
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

      {/* PROCESS */}
      <section id="comment" style={{ padding:"80px 20px", background:"linear-gradient(180deg,#050810,#070d1a)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div data-observe id="how-h" style={{ textAlign:"center", marginBottom:56, opacity:v("how-h")?1:0, transform:v("how-h")?"none":"translateY(24px)", transition:"all 0.7s" }}>
            <div style={labelStyle}>{t.process_label}</div>
            <h2 style={h2Style}>{t.process_title}</h2>
            <p style={subStyle}>{t.process_sub}</p>
          </div>
          <div className="steps-layout">
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {t.steps.map((s, i) => (
                <button key={i} onClick={() => setActiveStep(i)} style={{ background: activeStep===i ? "rgba(0,255,180,0.06)" : "rgba(255,255,255,0.02)", border:`1px solid ${activeStep===i ? "rgba(0,255,180,0.25)" : "rgba(255,255,255,0.06)"}`, borderRadius:16, padding:"18px 20px", cursor:"pointer", textAlign:"left", fontFamily:"inherit", transition:"all 0.3s", display:"flex", alignItems:"flex-start", gap:16 }}>
                  <div style={{ fontSize:28, fontWeight:900, color: activeStep===i ? "#00FFB4" : "rgba(255,255,255,0.1)", letterSpacing:"-1px", lineHeight:1, flexShrink:0, transition:"color 0.3s" }}>{s.n}</div>
                  <div>
                    <div style={{ fontSize:15, fontWeight:700, color: activeStep===i ? "#fff" : "#94a3b8", marginBottom:4, transition:"color 0.3s" }}>{s.icon} {s.title}</div>
                    {activeStep===i && <div style={{ fontSize:13, color:"#64748b", lineHeight:1.65, animation:"fadeUp 0.3s ease" }}>{s.desc}</div>}
                  </div>
                </button>
              ))}
            </div>
            <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:32, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:280 }}>
              <div style={{ fontSize:64, marginBottom:20, animation:"fadeUp 0.4s ease" }}>{t.steps[activeStep].icon}</div>
              <h3 style={{ fontSize:20, fontWeight:800, color:"#fff", textAlign:"center", marginBottom:12, letterSpacing:"-0.5px" }}>{t.steps[activeStep].title}</h3>
              <p style={{ fontSize:13, color:"#64748b", textAlign:"center", lineHeight:1.7, maxWidth:260, animation:"fadeUp 0.4s ease" }}>{t.steps[activeStep].desc}</p>
              <div style={{ display:"flex", gap:8, marginTop:24 }}>
                {t.steps.map((_,i) => (
                  <div key={i} style={{ width: activeStep===i ? 20 : 6, height:6, borderRadius:3, background: activeStep===i ? "#00FFB4" : "rgba(255,255,255,0.15)", transition:"all 0.3s" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="tarifs" style={{ padding:"80px 20px", background:"#050810" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div data-observe id="prix-h" style={{ textAlign:"center", marginBottom:48, opacity:v("prix-h")?1:0, transform:v("prix-h")?"none":"translateY(24px)", transition:"all 0.7s" }}>
            <div style={labelStyle}>{t.pricing_label}</div>
            <h2 style={h2Style}>{t.pricing_title}</h2>
            <p style={subStyle}>{t.pricing_sub}</p>
          </div>
          <div className="three-col-grid" style={{ alignItems:"start" }}>
            {t.pricing_cards.map((card, i) => (
              <div key={i} data-observe id={`t${i}`} style={{ background: card.pop ? `linear-gradient(145deg,${card.accent}08,#070d1a)` : "rgba(255,255,255,0.025)", border:`1px solid ${card.pop ? card.accent : card.accent+"22"}`, borderRadius:20, padding:"28px 24px", position:"relative", opacity:v(`t${i}`)?1:0, transform:v(`t${i}`)?"none":"translateY(36px)", transition:`all 0.7s ease ${i*0.12}s` }}>
                {card.pop && <div style={{ position:"absolute", top:-13, left:"50%", transform:"translateX(-50%)", background:card.accent, color:"#050810", padding:"4px 16px", borderRadius:20, fontSize:11, fontWeight:700, whiteSpace:"nowrap" }}>⭐ {lang==="en"?"Most popular":"Le plus populaire"}</div>}
                <h3 style={{ fontSize:17, fontWeight:700, color:card.accent, marginBottom:14 }}>{card.name}</h3>
                <div style={{ marginBottom:14 }}>
                  <div style={{ fontSize:13, color:"#475569", textDecoration:"line-through", marginBottom:4 }}>{card.oldPrice} {card.unit}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:32, fontWeight:900, color:"#fff", letterSpacing:"-2px" }}>{card.price}</span>
                    <span style={{ fontSize:13, color:"#64748b" }}>{card.unit}</span>
                    <span style={{ fontSize:11, background:"rgba(0,255,180,0.1)", color:"#00FFB4", border:"1px solid rgba(0,255,180,0.2)", borderRadius:20, padding:"2px 8px", fontWeight:700 }}>-50%</span>
                  </div>
                </div>
                <p style={{ fontSize:13, color:"#64748b", lineHeight:1.65, marginBottom:20 }}>{card.desc}</p>
                <ul style={{ listStyle:"none", padding:0, margin:"0 0 24px", display:"flex", flexDirection:"column", gap:9 }}>
                  {card.features.map(f => (
                    <li key={f} style={{ display:"flex", alignItems:"center", gap:9, fontSize:13, color:"#94a3b8" }}>
                      <span style={{ width:6, height:6, borderRadius:"50%", background:card.accent, flexShrink:0 }} />{f}
                    </li>
                  ))}
                </ul>
                <a href={`https://wa.me/${WA_NUMBER}`} style={{ display:"block", textAlign:"center", background:`linear-gradient(135deg,${card.accent},${card.accent}AA)`, color:"#050810", padding:"12px", borderRadius:12, fontSize:14, fontWeight:700, textDecoration:"none" }}>{card.cta}</a>
              </div>
            ))}
          </div>
          <p style={{ textAlign:"center", color:"#475569", fontSize:13, marginTop:32 }}>📞 {t.pricing_note} <a href={`https://wa.me/${WA_NUMBER}`} style={{ color:"#00FFB4", textDecoration:"none" }}>{t.pricing_wa}</a></p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="temoignages" style={{ padding:"80px 0", background:"linear-gradient(180deg,#050810,#070d1a)", overflow:"hidden" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 20px" }}>
          <div data-observe id="testi-h" style={{ textAlign:"center", marginBottom:48, opacity:v("testi-h")?1:0, transform:v("testi-h")?"none":"translateY(24px)", transition:"all 0.7s" }}>
            <div style={labelStyle}>{t.reviews_label}</div>
            <h2 style={h2Style}>{t.reviews_title}</h2>
            <p style={subStyle}>{t.reviews_sub}</p>
          </div>
        </div>
        <TestimonialsScroll testimonials={t.testimonials} />
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding:"80px 20px", background:"#050810" }}>
        <div style={{ maxWidth:720, margin:"0 auto" }}>
          <div data-observe id="faq-h" style={{ textAlign:"center", marginBottom:48, opacity:v("faq-h")?1:0, transform:v("faq-h")?"none":"translateY(24px)", transition:"all 0.7s" }}>
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
      <section style={{ padding:"80px 20px", position:"relative", overflow:"hidden", textAlign:"center", background:"linear-gradient(180deg,#070d1a,#030609)" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"70vw", maxWidth:600, height:300, background:"radial-gradient(ellipse,rgba(0,255,180,0.07) 0%,transparent 70%)", filter:"blur(50px)" }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <h2 style={{ fontSize:"clamp(28px,6vw,50px)", fontWeight:900, letterSpacing:"-2px", color:"#fff", margin:"0 0 14px" }}>{t.cta_title}</h2>
          <p style={{ fontSize:15, color:"#64748b", marginBottom:36, maxWidth:440, margin:"0 auto 36px" }}>{t.cta_sub}</p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <a href={`https://wa.me/${WA_NUMBER}`} style={{ background:"linear-gradient(135deg,#00FFB4,#00C8FF)", color:"#050810", padding:"14px 30px", borderRadius:12, fontSize:15, fontWeight:700, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8, boxShadow:"0 0 40px rgba(0,255,180,0.2)" }}>{t.cta_wa}</a>
            <button onClick={() => scrollTo("demo")} style={{ background:"rgba(255,255,255,0.05)", color:"#e2e8f0", border:"1px solid rgba(255,255,255,0.1)", padding:"14px 30px", borderRadius:12, fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>{t.cta_demo}</button>
          </div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:20, marginTop:32, flexWrap:"wrap" }}>
            {t.cta_badges.map(b => <span key={b} style={{ fontSize:13, color:"#475569" }}>{b}</span>)}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"40px 20px", textAlign:"center" }}>
        <div style={{ fontSize:20, fontWeight:900, color:"#fff", letterSpacing:"-0.5px", marginBottom:14 }}><span style={{ color:"#00FFB4" }}>D</span>HA</div>
        <div style={{ display:"flex", justifyContent:"center", gap:20, marginBottom:16, flexWrap:"wrap" }}>
          {pageLinks.map(({ to, label, emoji }) => (
            <Link key={to} to={to} style={{ fontSize:13, color:"#94a3b8", textDecoration:"none", display:"flex", alignItems:"center", gap:5 }}>{emoji} {label}</Link>
          ))}
        </div>
        <p style={{ fontSize:13, color:"#334155" }}>{t.footer_copy}</p>
      </footer>

      <FloatingWidget lang={lang} />
    </div>
  );
}

const labelStyle = { display:"inline-block", background:"rgba(0,255,180,0.07)", border:"1px solid rgba(0,255,180,0.18)", borderRadius:20, padding:"5px 14px", fontSize:11, color:"#00FFB4", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:14 };
const h2Style   = { fontSize:"clamp(26px,5vw,46px)", fontWeight:900, letterSpacing:"-1.5px", color:"#fff", margin:"0 0 14px", lineHeight:1.1 };
const subStyle  = { fontSize:15, color:"#64748b", maxWidth:480, margin:"0 auto", lineHeight:1.7 };

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body { background:#050810; -webkit-font-smoothing:antialiased; }

  @keyframes blink      { 0%,100%{opacity:.35} 50%{opacity:1} }
  @keyframes sparkle    { 0%,100%{opacity:0;transform:scale(0) rotate(0deg)} 20%{opacity:1;transform:scale(1.2) rotate(15deg)} 50%{opacity:.8;transform:scale(0.9) rotate(-10deg)} 80%{opacity:.3;transform:scale(1.1) rotate(20deg)} }
  @keyframes fadeUp     { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideUp    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes typeBounce { 0%,80%,100%{transform:scale(0.6);opacity:.4} 40%{transform:scale(1);opacity:1} }
  @keyframes scrollLeft { from{transform:translateX(0)} to{transform:translateX(-50%)} }

  input::placeholder { color:#334155; }
  input:focus { border-color:rgba(0,255,180,0.3) !important; }
  ::-webkit-scrollbar { width:4px; height:4px; }
  ::-webkit-scrollbar-thumb { background:rgba(0,255,180,0.15); border-radius:4px; }

  .feat6-grid     { display:grid; grid-template-columns:1fr; gap:12px; }
  .three-col-grid { display:grid; grid-template-columns:1fr; gap:20px; }
  .feat-grid      { display:grid; grid-template-columns:1fr; gap:14px; }
  .steps-layout   { display:grid; grid-template-columns:1fr; gap:20px; }
  .desk-nav       { display:none !important; }
  .burger         { display:block !important; }

  @media(min-width:600px) {
    .feat-grid      { grid-template-columns:repeat(2,1fr); }
    .three-col-grid { grid-template-columns:repeat(2,1fr); }
    .feat6-grid     { grid-template-columns:repeat(2,1fr); }
  }
  @media(min-width:900px) {
    .desk-nav       { display:flex !important; }
    .burger         { display:none !important; }
    .three-col-grid { grid-template-columns:repeat(3,1fr); }
    .feat-grid      { grid-template-columns:repeat(4,1fr); }
    .steps-layout   { grid-template-columns:1fr 1fr; gap:28px; align-items:start; }
    .feat6-grid     { grid-template-columns:repeat(3,1fr); }
  }

  button:hover { opacity:.85; }
  a:hover      { opacity:.85; }
`;
