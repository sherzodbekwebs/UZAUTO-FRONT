import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

// 1. Tarjimalar obyekti (Xotira samaradorligi uchun Providerdan tashqarida)
const translations = {
  ru: {
    products: "Продукция",
    categories: "Категории",
    details: "Подробнее",
    all: "Все",
    price: "Цена",
    units_found: "Найдеno единиц",
    categories_label: "Категории",
    all_models: "Все модели",
    filters: "Фильтры",
    custom_solution_title: "Нужно индивидуальное решение?",
    custom_solution_desc: "Мы проектируем технику большой грузоподъемности по вашим спецификациям.",
    contact_us: "Связаться с нами",
    loading_data: "ЗАГРУЗКА ДАННЫХ ФЛОТА",
    no_units: "ТЕХНИКА НЕ НАЙДЕНА",
    in_stock_label: "В НАЛИЧИИ",
    out_of_stock_label: "НЕТ В НАЛИЧИИ",
    tech_specs_label: "ТЕХ_ХАРАКТЕРИСТИКИ",
    call_price: "ПО ЗАПРОСУ",
    back_to_catalog: "Назад в каталог",
    about_product: "О продукte",
    interest_title: "Вас интересует этот продукт?",
    interest_desc: "Наши специалисты ответят на все ваши вопросы.",
    order_call: "Заказать звонок"
  },
  uz: {
    products: "Маҳсулотлар",
    categories: "Категориялар",
    details: "Батафсил",
    all: "Барчаси",
    price: "Нархи",
    units_found: "Техникалар сони",
    categories_label: "Категориялар",
    all_models: "Барча моделлар",
    filters: "Филтрлар",
    custom_solution_title: "Индивидуал ечим керакми?",
    custom_solution_desc: "Биз сизнинг бизнесингиз учун махсус техникаларни лойиҳалаштирамиз.",
    contact_us: "Боғланиш",
    loading_data: "ФЛОТ МАЪЛУМОТЛАРИ ЮКЛАНМОҚДА",
    no_units: "ТЕХНИКА ТОПИЛМАДИ",
    in_stock_label: "МАВЖУД",
    out_of_stock_label: "МАВЖУД ЭМАС",
    tech_specs_label: "ТЕХНИК ХУСУСИЯТЛАР",
    call_price: "КЕЛИШИЛАДИ",
    back_to_catalog: "Каталогга қайтиш",
    about_product: "Маҳсулот ҳақида",
    interest_title: "Ушбу маҳсулот қизиқтирдими?",
    interest_desc: "Мутахассисларимиз барча саволларингизга жавоб беришади.",
    order_call: "Қўнғироқ сўраш"
  },
  en: {
    products: "Products",
    categories: "Categories",
    details: "Details",
    all: "All",
    price: "Price",
    units_found: "Units found",
    categories_label: "Categories",
    all_models: "All Models",
    filters: "Filters",
    custom_solution_title: "Need a Custom Solution?",
    custom_solution_desc: "We engineer heavy-duty trailers tailored to your fleet specs.",
    contact_us: "Contact Us",
    loading_data: "LOADING FLEET DATA",
    no_units: "NO UNITS FOUND",
    in_stock_label: "IN STOCK",
    out_of_stock_label: "OUT OF STOCK",
    tech_specs_label: "TECH_SPECS",
    call_price: "ON REQUEST",
    back_to_catalog: "Back to catalog",
    about_product: "About product",
    interest_title: "Interested in this product?",
    interest_desc: "Our specialists will answer all your questions.",
    order_call: "Request a call"
  }
};

export const LanguageProvider = ({ children }) => {
  // LocalStorage dan tilni olish yoki default 'ru' ni belgilash
  const [lang, setLangState] = useState(() => {
    const savedLang = localStorage.getItem('lang');
    return ['ru', 'uz', 'en'].includes(savedLang) ? savedLang : 'ru';
  });

  const setLang = (newLang) => {
    if (['ru', 'uz', 'en'].includes(newLang)) {
      setLangState(newLang);
      localStorage.setItem('lang', newLang);
    }
  };

  // t funksiyasi: kalit bo'yicha tarjimani topadi
  const t = (key) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook - Contextdan foydalanishni osonlashtirish uchun
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};