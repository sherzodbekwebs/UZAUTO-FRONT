import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.jpg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronRight, Globe as GlobeIcon, Search, Menu as MenuIcon, X as XIcon } from 'lucide-react';

import API from '../../api/axios'; 

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
            { label: "Контроль качества", sub: ["Система менеджмента качества", "Политика в области качества", "Награды"] },
            { label: "Технологии" },
            { label: "Конструкторское бюро" }
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
            { label: "Sifat nazorati", sub: ["Sifat menejmenti tizimi", "Sifat siyosati", "Sifat mukofotlari"] },
            { label: "Texnologiyalar" },
            { label: "Konstruktorlik byurosi" }
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
            { label: "Quality Control", sub: ["Quality Management System", "Quality Policy", "Quality Awards"] },
            { label: "Technologies" },
            { label: "Design Bureau" }
        ]
    }
};

const navigationKeywords = [
    { path: "/news", label: { ru: "Новости", uz: "Yangiliklar", en: "News" }, keys: ["новости", "news", "yangiliklar"] },
    { path: "/page/general_information", label: { ru: "Общая информация", uz: "Umumiy ma'lumot", en: "General Info" }, keys: ["информация", "info", "malumot"] },
    { path: "/contacts", label: { ru: "Контакты", uz: "Aloqa", en: "Contacts" }, keys: ["aloqa", "contacts", "manzil"] },
];

const Navbar = ({ lang, setLang }) => {
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
        // 🚀 ENDI baseURL .env DAN AVTOMATIK OLINADI
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
        if (value.trim().length > 1) {
            const query = value.toLowerCase();
            const filtered = navigationKeywords.filter(item => item.keys.some(k => k.includes(query))).slice(0, 4);
            setSuggestions(filtered);
        } else setSuggestions([]);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const query = searchTerm.toLowerCase().trim();
        if (query) {
            const navResult = navigationKeywords.find(item => item.keys.some(k => query.includes(k)));
            navResult ? navigateAndScroll(navResult.path) : navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            setSearchTerm(""); setSuggestions([]);
        }
    };

    const navigateAndScroll = (path) => {
        if (path.startsWith('/#')) {
            const id = path.split('#')[1];
            if (location.pathname === '/') document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            else navigate(path);
        } else navigate(path);
        setSearchTerm(""); setSuggestions([]); setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsLangOpen(false);
            if (searchRef.current && !searchRef.current.contains(event.target)) setSuggestions([]);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        setActiveMenu(null); setIsLangOpen(false); setIsMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-[100] bg-white/90 backdrop-blur-lg border-b border-gray-100 h-16 lg:h-20 transition-all duration-300">
                <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between px-4 lg:px-12">
                    <div className="flex items-center shrink-0">
                        <Link to="/"><img src={logo} alt="Logo" className="h-8 lg:h-11 w-auto rounded-lg object-contain cursor-pointer" /></Link>
                    </div>

                    <div className="hidden lg:flex flex-1 justify-center h-full">
                        <ul className="flex items-center gap-x-10 text-[#1a2e44] font-semibold text-[15px] h-full">
                            <NavItem label={t.about} active={activeMenu === 'about'} onEnter={() => setActiveMenu('about')} onLeave={() => setActiveMenu(null)}>
                                <div className="p-8 bg-white w-[600px] grid grid-cols-2 gap-x-8 gap-y-2">
                                    {fullAboutItems.map((item, i) => (
                                        <Link key={i} to={item.link} className="block">
                                            <div className="px-4 py-3 hover:bg-gray-50 text-[#004A99] font-bold text-[14px] rounded-xl transition-all cursor-pointer">{item.title}</div>
                                        </Link>
                                    ))}
                                </div>
                            </NavItem>

                            <NavItem label={t.production} active={activeMenu === 'prod'} onEnter={() => setActiveMenu('prod')} onLeave={() => { setActiveMenu(null); setActiveSubMenu(null); }}>
                                <ul className="py-4 w-72">
                                    {t.prodItems.map((item, i) => (
                                        <li key={i} className="relative px-6 py-3.5 hover:bg-gray-50 text-[#004A99] font-bold transition-all cursor-pointer text-sm flex items-center justify-between" onMouseEnter={() => item.sub && setActiveSubMenu(item.label)} onMouseLeave={() => setActiveSubMenu(null)}>
                                            <span>{item.label}</span>
                                            {item.sub && <ChevronRight size={14} className={activeSubMenu === item.label ? 'rotate-90' : ''} />}
                                            <AnimatePresence>
                                                {activeSubMenu === item.label && item.sub && (
                                                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="absolute top-0 left-full w-80 bg-white shadow-2xl border-l-2 border-[#0054A6] py-3 z-[110] rounded-r-2xl">
                                                        {item.sub.map((subItem, j) => (
                                                            <Link key={j} to={i === 0 && j === 0 ? "/page/quality_management" : "#"} className="block">
                                                                <div className="px-6 py-3 hover:bg-gray-50 text-[#004A99] font-bold text-sm border-b border-gray-50 last:border-0 transition-all">{subItem}</div>
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </li>
                                    ))}
                                    {dynamicProdItems.map((item, i) => (
                                        <Link key={`dyn-${i}`} to={item.link} className="block px-6 py-3.5 hover:bg-gray-50 text-[#004A99] font-bold text-sm">{item.title}</Link>
                                    ))}
                                </ul>
                            </NavItem>

                            {/* MAHSULOTLAR LINKI ENDI PRODUCTS PAGEGA YO'NALTIRILDI */}
                            <Link to="/products">
                                <li className="relative group cursor-pointer hover:text-[#0054A6] transition-colors font-semibold">{t.products}</li>
                            </Link>

                            <Link to="/contacts"><li className="relative group cursor-pointer hover:text-[#0054A6] transition-colors font-semibold">{t.contacts}</li></Link>
                        </ul>
                    </div>

                    <div className="flex items-center gap-2 lg:gap-6 justify-end flex-1 lg:flex-none">
                        <div className="relative" ref={searchRef}>
                            <form onSubmit={handleSearch} className="hidden min-[480px]:flex items-center bg-gray-100 rounded-full px-3 py-1.5 w-28 sm:w-40 lg:w-48 focus-within:w-36 focus-within:bg-white border border-transparent focus-within:border-blue-200 transition-all duration-500">
                                <Search className="w-3.5 h-3.5 text-gray-400" />
                                <input type="text" value={searchTerm} onChange={handleInputChange} placeholder={t.searchPlaceholder} className="bg-transparent border-none outline-none w-full text-[11px] lg:text-sm ml-1.5" />
                            </form>
                            <AnimatePresence>
                                {suggestions.length > 0 && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 w-full bg-white mt-2 rounded-2xl shadow-xl border border-gray-100 py-2 z-[150] overflow-hidden">
                                        {suggestions.map((item, i) => (
                                            <div key={i} onClick={() => navigateAndScroll(item.path)} className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer flex items-center justify-between group transition-colors">
                                                <span className="text-[12px] font-semibold text-gray-600 group-hover:text-[#0054A6]">{item.label[lang]}</span>
                                                <ArrowRight size={12} className="text-gray-300 group-hover:text-[#0054A6] opacity-0 group-hover:opacity-100 transition-all" />
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="relative" ref={dropdownRef}>
                            <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-1.5 px-2.5 py-1.5 lg:px-4 lg:py-2 rounded-full font-bold text-[10px] lg:text-xs uppercase bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer">
                                <GlobeIcon size={16} className="opacity-70" /> <span>{lang}</span>
                            </button>
                            <AnimatePresence>
                                {isLangOpen && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-2 w-24 lg:w-32 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden z-[120]">
                                        {['uz', 'ru', 'en'].map((item) => (
                                            <button key={item} onClick={() => { setLang(item); setIsLangOpen(false); }} className={`w-full text-left px-4 py-2 text-[11px] lg:text-xs font-bold uppercase transition-colors cursor-pointer ${lang === item ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'}`}>{item}</button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-1.5 text-[#1a2e44]"><MenuIcon className="w-6 h-6" /></button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]" />
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }} className="fixed top-0 right-0 h-screen w-[85%] sm:w-[380px] bg-white z-[210] shadow-2xl flex flex-col overflow-hidden" >
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <img src={logo} alt="Logo" className="h-8 w-auto object-contain" />
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-50 rounded-full"><XIcon className="w-6 h-6" /></button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-6">
                                <ul className="space-y-2">
                                    <li>
                                        <button onClick={() => setMobileAccordion(mobileAccordion === 'about' ? null : 'about')} className="w-full flex items-center justify-between py-3 text-lg font-bold text-[#1a2e44]">
                                            {t.about} <ChevronRight size={20} className={mobileAccordion === 'about' ? 'rotate-90' : ''} />
                                        </button>
                                        <AnimatePresence>
                                            {mobileAccordion === 'about' && (
                                                <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-gray-50 rounded-2xl">
                                                    {fullAboutItems.map((item, i) => (
                                                        <Link key={i} to={item.link} onClick={() => setIsMobileMenuOpen(false)}>
                                                            <li className="px-4 py-3 text-[14px] font-semibold text-gray-600 border-b border-white last:border-0">{item.title}</li>
                                                        </Link>
                                                    ))}
                                                </motion.ul>
                                            )}
                                        </AnimatePresence>
                                    </li>
                                    <li>
                                        <button onClick={() => setMobileAccordion(mobileAccordion === 'prod' ? null : 'prod')} className="w-full flex items-center justify-between py-3 text-lg font-bold text-[#1a2e44]">
                                            {t.production} <ChevronRight size={20} className={mobileAccordion === 'prod' ? 'rotate-90' : ''} />
                                        </button>
                                        <AnimatePresence>
                                            {mobileAccordion === 'prod' && (
                                                <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-gray-50 rounded-2xl p-2">
                                                    {t.prodItems.map((item, i) => (
                                                        <li key={i} className="px-4 py-3 border-b border-white last:border-0">
                                                            <div className="font-bold text-[#0054A6] mb-2">{item.label}</div>
                                                            {item.sub?.map((sub, j) => <div key={j} className="pl-4 py-1 text-sm text-gray-500 font-bold">{sub}</div>)}
                                                        </li>
                                                    ))}
                                                    {dynamicProdItems.map((item, i) => <Link key={i} to={item.link} onClick={() => setIsMobileMenuOpen(false)}><li className="px-4 py-3 text-sm font-bold text-gray-600">{item.title}</li></Link>)}
                                                </motion.ul>
                                            )}
                                        </AnimatePresence>
                                    </li>
                                    <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}><li className="py-3 text-lg font-bold text-[#1a2e44]">{t.products}</li></Link>
                                    <Link to="/contacts" onClick={() => setIsMobileMenuOpen(false)}><li className="py-3 text-lg font-bold text-[#1a2e44]">{t.contacts}</li></Link>
                                </ul>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

// ... (NavItem qismi o'zgarishsiz qoladi)

const NavItem = ({ label, active, onEnter, onLeave, children }) => (
    <li className="relative h-full flex items-center" onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <div className="relative py-2 flex items-center gap-1 group cursor-pointer">
            <span className={`transition-all duration-300 ${active ? 'text-[#0054A6]' : 'hover:text-[#0054A6]'}`}>{label}</span>
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