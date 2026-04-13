import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/Logo.jpg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronRight, Globe as GlobeIcon, Search, Menu as MenuIcon, X as XIcon } from 'lucide-react';

import API from '../../api/axios';
import { useLanguage } from '../../context/LanguageContext';

const translations = {
    ru: {
        about: "О компании", production: "Производство", products: "Продукция", contacts: "Контакты",
        searchPlaceholder: "Поиск...",
        staticAbout: [
            { title: "Общая информация", link: "/page/general_information" },
            { title: "История", link: "/page/history" },
            { title: "Миссия, видение", link: "/page/mission_vision" },
            { title: "Дочерние компании", link: "/page/affiliated_companies" },
            { title: "Сведения о регистрации", link: "/page/registration_and_trademark_information" },
            { title: "Комплаенс политика", link: "/page/compliance_policy" },
            { title: "Достижения и награды", link: "/page/achievements_and_awards" },
            { title: "Карьера", link: "/page/careers" },
        ],
        prodItems: [
            {
                label: "Контроль качества",
                sub: [
                    { title: "Система менеджмента качества", link: "/page/quality_management" },
                    { title: "Политика в области качества", link: "/page/quality_policy" },
                    { title: "Награды в области качества", link: "/page/quality_awards" }
                ]
            },
            { label: "Технологии и оборудование", link: "/page/technologies" },
            { label: "Конструкторское бюро", link: "/page/design_bureau" }
        ]
    },
    uz: {
        about: "Kompaniya", production: "Ishlab chiqarish", products: "Mahsulotlar", contacts: "Aloqa",
        searchPlaceholder: "Qidirish...",
        staticAbout: [
            { title: "Umumiy ma'lumot", link: "/page/general_information" },
            { title: "Tarix", link: "/page/history" },
            { title: "Missiya va maqsadlar", link: "/page/mission_vision" },
            { title: "Sho'ba korxonalar", link: "/page/affiliated_companies" },
            { title: "Ro'yxatdan o'tganlik", link: "/page/registration_and_trademark_information" },
            { title: "Komplaens siyosati", link: "/page/compliance_policy" },
            { title: "Yutuq va mukofotlar", link: "/page/achievements_and_awards" },
            { title: "Karyera", link: "/page/careers" },
        ],
        prodItems: [
            {
                label: "Sifat nazorati",
                sub: [
                    { title: "Sifat menejmenti tizimi", link: "/page/quality_management" },
                    { title: "Sifat siyosati", link: "/page/quality_policy" },
                    { title: "Sifat sohasidagi mukofotlar", link: "/page/quality_awards" }
                ]
            },
            { label: "Texnologiyalar va uskunalar", link: "/page/technologies" },
            { label: "Konstruktorlik byurosi", link: "/page/design_bureau" }
        ]
    },
    en: {
        about: "Company", production: "Production", products: "Products", contacts: "Contacts",
        searchPlaceholder: "Search...",
        staticAbout: [
            { title: "General Information", link: "/page/general_information" },
            { title: "History", link: "/page/history" },
            { title: "Mission & Vision", link: "/page/mission_vision" },
            { title: "Subsidiaries", link: "/page/affiliated_companies" },
            { title: "Registration details", link: "/page/registration_and_trademark_information" },
            { title: "Compliance policy", link: "/page/compliance_policy" },
            { title: "Awards", link: "/page/achievements_and_awards" },
            { title: "Careers", link: "/page/careers" },
        ],
        prodItems: [
            {
                label: "Quality Control",
                sub: [
                    { title: "Quality Management System", link: "/page/quality_management" },
                    { title: "Quality Policy", link: "/page/quality_policy" },
                    { title: "Quality Awards", link: "/page/quality_awards" }
                ]
            },
            { label: "Technologies and equipment", link: "/page/technologies" },
            { label: "Design Bureau", link: "/page/design_bureau" }
        ]
    }
};

const Navbar = () => {
    const { lang, setLang } = useLanguage();
    const [dynamicMenus, setDynamicMenus] = useState([]);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileAccordion, setMobileAccordion] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);
    const searchRef = useRef(null);
    const t = translations[lang] || translations.ru;

    useEffect(() => {
        API.get('/menus')
            .then(res => setDynamicMenus(res.data))
            .catch(err => console.error("Error fetching menus:", err));
    }, []);

    const getDynamicItems = (key) => {
        const langSuffix = lang.charAt(0).toUpperCase() + lang.slice(1);
        return dynamicMenus
            .filter(item => item.parentKey === key && item.isActive)
            .map(item => ({
                title: item[`title${langSuffix}`],
                link: item.link
            }));
    };

    const fullAboutItems = [...t.staticAbout, ...getDynamicItems('about')];
    const dynamicProdItems = getDynamicItems('prod');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    const handleSearch = (e) => { e.preventDefault(); };

    const navigateAndScroll = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsLangOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        setActiveMenu(null); setIsLangOpen(false); setIsMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-[1000] bg-white/90 backdrop-blur-lg border-b border-gray-100 h-16 lg:h-20 transition-all duration-300">
                <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between px-4 lg:px-12">
                    <div className="flex items-center shrink-0">
                        <Link to="/"><img src={logo} alt="Logo" className="h-8 lg:h-11 w-auto rounded-lg object-contain cursor-pointer" /></Link>
                    </div>

                    <div className="hidden lg:flex flex-1 justify-center h-full">
                        <ul className="flex items-center gap-x-10 text-[#1a2e44] font-semibold text-[15px] h-full">
                            
                            {/* ABOUT */}
                            <NavItem label={t.about} active={activeMenu === 'about'} onEnter={() => setActiveMenu('about')} onLeave={() => setActiveMenu(null)}>
                                <div className="p-8 bg-white w-[600px] grid grid-cols-2 gap-x-8 gap-y-2">
                                    {fullAboutItems.map((item, i) => (
                                        <Link key={i} to={item.link} className="block">
                                            <div className="px-4 py-3 hover:bg-gray-50 text-[#004A99] font-bold text-[14px] rounded-xl transition-all cursor-pointer">{item.title}</div>
                                        </Link>
                                    ))}
                                </div>
                            </NavItem>

                            {/* PRODUCTION */}
                            <NavItem label={t.production} active={activeMenu === 'prod'} onEnter={() => setActiveMenu('prod')} onLeave={() => { setActiveMenu(null); setActiveSubMenu(null); }}>
                                <ul className="py-4 w-72">
                                    {t.prodItems.map((item, i) => (
                                        // ✅ AGAR ELEMENTDA 'sub' BO'LSA:
                                        item.sub ? (
                                            <li key={i} className="relative px-6 py-3.5 hover:bg-gray-50 text-[#004A99] font-bold transition-all cursor-pointer text-sm flex items-center justify-between" onMouseEnter={() => setActiveSubMenu(item.label)} onMouseLeave={() => setActiveSubMenu(null)}>
                                                <span>{item.label}</span>
                                                <ChevronRight size={14} className={activeSubMenu === item.label ? 'rotate-90' : ''} />
                                                <AnimatePresence>
                                                    {activeSubMenu === item.label && (
                                                        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="absolute top-0 left-full w-80 bg-white shadow-2xl border-l-2 border-[#0054A6] py-3 z-[110] rounded-r-2xl">
                                                            {item.sub.map((subItem, j) => (
                                                                <Link key={j} to={subItem.link || "#"} className="block">
                                                                    <div className="px-6 py-3 hover:bg-gray-50 text-[#004A99] font-bold text-sm border-b border-gray-50 last:border-0 transition-all">{subItem.title}</div>
                                                                </Link>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </li>
                                        ) : (
                                            // ✅ AGAR ELEMENTDA 'sub' BO'LMASA (Texnologiya/KB):
                                            <Link key={i} to={item.link} className="block">
                                                <div className="px-6 py-3.5 hover:bg-gray-50 text-[#004A99] font-bold text-sm transition-all">{item.label}</div>
                                            </Link>
                                        )
                                    ))}
                                    {dynamicProdItems.map((item, i) => (
                                        <Link key={`dyn-${i}`} to={item.link} className="block px-6 py-3.5 hover:bg-gray-50 text-[#004A99] font-bold text-sm">{item.title}</Link>
                                    ))}
                                </ul>
                            </NavItem>

                            <Link to="/products"><li className="hover:text-[#0054A6] font-semibold">{t.products}</li></Link>
                            <Link to="/contacts"><li className="hover:text-[#0054A6] font-semibold">{t.contacts}</li></Link>
                        </ul>
                    </div>

                    {/* RIGHT SIDE: SEARCH, LANG, MOBILE MENU */}
                    <div className="flex items-center gap-2 lg:gap-6 justify-end flex-1 lg:flex-none">
                        <div className="relative" ref={searchRef}>
                            <form className="hidden min-[480px]:flex items-center bg-gray-100 rounded-full px-3 py-1.5 w-28 sm:w-40 lg:w-48 transition-all">
                                <Search className="w-3.5 h-3.5 text-gray-400" />
                                <input type="text" value={searchTerm} onChange={handleInputChange} placeholder={t.searchPlaceholder} className="bg-transparent border-none outline-none w-full text-xs ml-1.5" />
                            </form>
                        </div>

                        <div className="relative" ref={dropdownRef}>
                            <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-bold text-xs uppercase bg-gray-100 text-[#1a2e44]">
                                <GlobeIcon size={16} className="opacity-70" /> <span>{lang}</span>
                            </button>
                            <AnimatePresence>
                                {isLangOpen && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-2 w-24 bg-white shadow-xl rounded-xl border z-[120]">
                                        {['uz', 'ru', 'en'].map((item) => (
                                            <button key={item} onClick={() => { setLang(item); setIsLangOpen(false); }} className={`w-full text-left px-4 py-2 text-xs font-bold uppercase ${lang === item ? 'bg-blue-600 text-white' : 'hover:bg-gray-50 text-[#1a2e44]'}`}>{item}</button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-1.5 text-[#1a2e44] z-50">
                            <MenuIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* 📱 MOBILE MENU */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 bg-white z-[9999] lg:hidden flex flex-col">
                        <div className="h-16 flex items-center justify-between px-6 border-b">
                            <img src={logo} alt="Logo" className="h-8 w-auto" />
                            <button onClick={() => setIsMobileMenuOpen(false)}><XIcon size={28} /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {/* ABOUT MOBILE */}
                            <div>
                                <button onClick={() => setMobileAccordion(mobileAccordion === 'about' ? null : 'about')} className="w-full flex justify-between items-center text-lg font-bold py-3">
                                    {t.about} <ChevronRight className={mobileAccordion === 'about' ? 'rotate-90' : ''} />
                                </button>
                                <AnimatePresence>
                                    {mobileAccordion === 'about' && (
                                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden pl-4 space-y-2">
                                            {fullAboutItems.map((item, i) => (
                                                <Link key={i} to={item.link} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-600">{item.title}</Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* PRODUCTION MOBILE */}
                            <div>
                                <button onClick={() => setMobileAccordion(mobileAccordion === 'prod' ? null : 'prod')} className="w-full flex justify-between items-center text-lg font-bold py-3">
                                    {t.production} <ChevronRight className={mobileAccordion === 'prod' ? 'rotate-90' : ''} />
                                </button>
                                <AnimatePresence>
                                    {mobileAccordion === 'prod' && (
                                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden pl-4 space-y-4 mt-2">
                                            {t.prodItems.map((item, i) => (
                                                <div key={i}>
                                                    {/* Agar sub menyu bo'lsa */}
                                                    {item.sub ? (
                                                        <>
                                                            <span className="text-blue-600 font-bold block mb-1">{item.label}</span>
                                                            {item.sub.map((s, j) => (
                                                                <Link key={j} to={s.link} onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-500 text-sm pl-3 py-1">• {s.title}</Link>
                                                            ))}
                                                        </>
                                                    ) : (
                                                        /* Texnologiya va KB uchun */
                                                        <Link to={item.link} onClick={() => setIsMobileMenuOpen(false)} className="text-blue-600 font-bold block">{item.label}</Link>
                                                    )}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Link to="/products" className="block text-lg font-bold py-3 border-b">{t.products}</Link>
                            <Link to="/contacts" className="block text-lg font-bold py-3 border-b">{t.contacts}</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const NavItem = ({ label, active, onEnter, onLeave, children }) => (
    <li className="relative h-full flex items-center" onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <div className="relative py-2 flex items-center gap-1 group cursor-pointer transition-colors duration-300">
            <span className={active ? 'text-[#0054A6]' : 'text-[#1a2e44] hover:text-[#0054A6]'}>{label}</span>
            <ChevronRight className={`w-3 h-3 transition-transform duration-300 ${active ? 'rotate-90 text-blue-600' : 'text-gray-400'}`} />
        </div>
        <AnimatePresence>
            {active && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-[80px] left-0 min-w-64 bg-white shadow-2xl rounded-b-2xl border-t-2 border-[#0054A6] z-[100]">
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    </li>
);

export default Navbar;