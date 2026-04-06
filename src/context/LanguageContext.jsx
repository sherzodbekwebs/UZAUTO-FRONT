import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Sahifa yangilanganda ham tanlangan tilni eslab qolish uchun localStorage ishlatamiz
  const [lang, setLangState] = useState(localStorage.getItem('lang') || 'ru');

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  };

  // Static tarjimalar (Navbar va Buttonlar uchun)
  const translations = {
    ru: {
      products: "Продукция",
      categories: "Категории",
      details: "Подробнее",
      all: "Все",
      price: "Цена",
    },
    uz: {
      products: "Mahsulotlar",
      categories: "Kategoriyalar",
      details: "Batafsil",
      all: "Barchasi",
      price: "Narxi",
    },
    en: {
      products: "Products",
      categories: "Categories",
      details: "Details",
      all: "All",
      price: "Price",
    }
  };

  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);