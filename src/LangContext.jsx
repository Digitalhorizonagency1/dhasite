import { createContext, useState, useContext } from "react";

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem("dha_lang") || "fr";
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem("dha_lang", newLang);
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
