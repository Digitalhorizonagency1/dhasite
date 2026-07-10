import { useEffect } from "react";

const BASE_URL = "https://dhasite.vercel.app";

function setMeta(name, content, attr = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(path) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", `${BASE_URL}${path}`);
}

/**
 * Met à jour <title>, meta description, Open Graph, Twitter Card et le lien
 * canonical pour la page active. À appeler une fois dans chaque page
 * (App / Creative / Web) avec { title, description, path }.
 * Passer noindex: true pour empêcher l'indexation (ex: pages privées).
 */
export function usePageMeta({ title, description, path = "/", noindex = false }) {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", `${BASE_URL}${path}`, "property");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setCanonical(path);
    setMeta("robots", noindex ? "noindex, nofollow" : "index, follow");
  }, [title, description, path, noindex]);
}
