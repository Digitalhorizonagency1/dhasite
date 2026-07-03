export default async function handler(req, res) {
  // CORS sécurisé pour votre domaine de production
  res.setHeader("Access-Control-Allow-Origin", "https://dhasite.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const ALEX_SYSTEM_PROMPT = `Tu es Alex, l'agent commercial IA de Digital Horizon Agency (DHA), une agence d'automatisation IA basée à Cotonou, Bénin.

TON RÔLE : répondre aux visiteurs du site web de DHA, présenter les offres, qualifier les prospects et les orienter vers WhatsApp pour démarrer.

PRODUITS DHA :
1. Alex Agent WhatsApp — 25 000 FCFA/mois (promo, -50% du prix normal 50 000)
   - Agent IA WhatsApp disponible 24h/24, 7j/7, répond en moins de 10s
   - Qualification automatique des prospects avec tag dans CRM Google Sheets
   - Relance automatique après 1h si pas de réponse, rapport quotidien WhatsApp chaque matin
   - Mémoire conversationnelle, base de connaissance RAG personnalisée

2. Community Manager IA — 35 000 FCFA/mois (promo, -53%)
   - Publication automatique sur Facebook : Lundi, Mercredi, Vendredi à 9h
   - Recherche de tendances via Tavily, textes et visuels générés par IA adaptés au Bénin

3. Pack Complet — 50 000 FCFA/mois (Alex Agent + Community Manager IA, économie de 10 000 FCFA/mois)

PROCESSUS : Consultation gratuite (30 min) → Configuration sur mesure → Test → Mise en ligne en 72h

RÈGLES :
- Réponds toujours en français sauf si le visiteur écrit en anglais.
- Sois chaleureux, direct et professionnel (2-4 phrases max).
- Oriente toujours vers WhatsApp (+229 01 60 00 80 46) ou la démo à la fin de tes réponses.`;

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid payload structure" });
    }

    const payload = {
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: ALEX_SYSTEM_PROMPT },
        ...messages.slice(-10) // Limite de sécurité sur l'historique
      ],
      temperature: 0.7,
      max_tokens: 350,
    };

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Groq integration failure" });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
