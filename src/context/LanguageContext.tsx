import React, { createContext, useContext, useState, useEffect } from "react";
import { AppLanguage, translations, Translations } from "../utils/translations";

interface LanguageContextType {
  lang: AppLanguage;
  setLang: (lang: AppLanguage) => void;
  toggleLang: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<AppLanguage>(() => {
    try {
      const saved = localStorage.getItem("gcoeara_clean_lang");
      if (saved === "mr" || saved === "en") return saved;
    } catch {}
    return "mr"; // Default to Marathi for GCOEARA campus community & cleaning staff
  });

  const setLang = (newLang: AppLanguage) => {
    setLangState(newLang);
    try {
      localStorage.setItem("gcoeara_clean_lang", newLang);
    } catch {}
  };

  const toggleLang = () => {
    setLang(lang === "mr" ? "en" : "mr");
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Graceful fallback if used outside provider
    return {
      lang: "mr",
      setLang: () => {},
      toggleLang: () => {},
      t: translations.mr,
    };
  }
  return context;
};
