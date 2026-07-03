export default async function handler(req, res) {
  // 1. Restriction CORS (Remplacez "*" par "https://dhasite.vercel.app" en production)
  const allowedOrigin = "https://dhasite.vercel.app"; 
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Gestion de la requête de pré-vérification (Preflight request)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // 2. Filtrage strict de la méthode HTTP
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée. Utilisez POST." });
  }

  try {
    const { messages } = req.body;

    // 3. Validation élémentaire des données d'entrée
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        error: "Requête invalide. Le champ 'messages' doit être un tableau valide." 
      });
    }

    // 4. Encapsulation sécurisée du payload
    // Nous définissons ici les règles système pour éviter qu'un utilisateur n'altère le modèle ou le prompt système.
    const systemPrompt = {
      role: "system",
      content: "Tu es l'assistant virtuel de Digital Horizon Agency (DHA), une agence d'IA et d'automatisation basée au Bénin."
    };

    const groqPayload = {
      model: "llama-3.3-70b-versatile", // Déclaré côté serveur pour éviter les abus
      messages: [systemPrompt, ...messages],
      temperature: 0.7,
      max_completion_tokens: 1024,
    };

    // 5. Appel à l'API Groq avec gestion des erreurs réseau
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify(groqPayload),
    });

    // Si Groq retourne une erreur (par exemple 401, 429 ou 500)
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erreur Groq API:", errorText);
      return res.status(response.status).json({ 
        error: "L'API de génération a rencontré une erreur.",
        details: response.statusText 
      });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    // Capture des erreurs d'exécution (panne réseau, JSON malformé...)
    console.error("Erreur serveur interne:", error);
    return res.status(500).json({ 
      error: "Erreur interne du serveur.", 
      message: error.message 
    });
  }
}
