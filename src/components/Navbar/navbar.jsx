import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/Logo.jpg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
    ArrowRight, ChevronRight, Globe as GlobeIcon, 
    Search, Menu as MenuIcon, X as XIcon, 
    Info, Settings, Package, Phone, LayoutGrid 
} from 'lucide-react';

import API, { API_URL } from '../../api/axios';
import { useLanguage } from '../../context/LanguageContext';

const translations = {
    ru: {
        about: "О компании", production: "Производство", products: "Продукция", contacts: "Контакты",
        searchPlaceholder: "Поиск...", noResults: "Ничего не найдено",
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
        searchPlaceholder: "Qidirish...", noResults: "Hech narsa topilmadi",
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
        searchPlaceholder: "Search...", noResults: "Nothing found",
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

const toCyrillic = (text) => {
    const map = {
        'sh': 'ш', 'ch': 'ч', 'yo': 'ё', 'yu': 'ю', 'ya': 'я', 'ye': 'е', 'o\'': 'ў', 'g\'': 'ғ',
        'a': 'а', 'b': 'б', 'v': 'в', 'g': 'г', 'd': 'д', 'e': 'е', 'z': 'з', 'i': 'и', 'j': 'ж',
        'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н', 'o': 'о', 'p': 'п', 'r': 'р', 's': 'с', 't': 'т',
        'u': 'у', 'f': 'ф', 'h': 'х', 'ts': 'ц', 'y': 'ы'
    };
    let result = text.toLowerCase();
    Object.keys(map).forEach(key => {
        result = result.split(key).join(map[key]);
    });
    return result;
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
    const [allProducts, setAllProducts] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);
    const searchWrapperRef = useRef(null);
    const t = translations[lang] || translations.ru;

    useEffect(() => {
        API.get('/menus').then(res => setDynamicMenus(res.data));
        API.get('/products').then(res => setAllProducts(res.data));
    }, []);

    const getLangField = (obj, field) => {
        if (!obj) return "";
        const currentSuffix = lang.charAt(0).toUpperCase() + lang.slice(1);
        return obj[`${field}${currentSuffix}`] || obj[`${field}Ru`] || obj[`${field}Uz`] || obj[`${field}En`] || "";
    };

    useEffect(() => {
        const query = searchTerm.trim().toLowerCase();
        if (query.length > 1) {
            const cyrillicQuery = toCyrillic(query);
            const filtered = allProducts.filter(p => {
                const ru = (p.titleRu || "").toLowerCase();
                const uz = (p.titleUz || "").toLowerCase();
                const en = (p.titleEn || "").toLowerCase();
                return ru.includes(query) || ru.includes(cyrillicQuery) || uz.includes(query) || en.includes(query);
            });
            setSuggestions(filtered.slice(0, 6));
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }, [searchTerm, allProducts]);

    const handleResultClick = (productId) => {
        navigate(`/product/${productId}`);
        setSearchTerm("");
        setShowSuggestions(false);
        setIsMobileMenuOpen(false);
    };

    const getDynamicItems = (key) => {
        return dynamicMenus
            .filter(item => item.parentKey === key && item.isActive)
            .map(item => ({
                title: getLangField(item, 'title'),
                link: item.link
            }));
    };

    const fullAboutItems = [...t.staticAbout, ...getDynamicItems('about')];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsLangOpen(false);
            if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) setShowSuggestions(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        setActiveMenu(null); setIsLangOpen(false); setIsMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <>
            {/* 🛠️ Roboto Shriftini majburiy yuklash */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
                .navbar-roboto-container * { 
                    font-family: 'Roboto', sans-serif !important; 
                }
            `}</style>

            <nav className="navbar-roboto-container fixed top-0 left-0 w-full z-[1000] bg-white/90 backdrop-blur-lg border-b border-gray-100 h-16 lg:h-20 transition-all duration-300">
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
                                            <Link key={i} to={item.link} className="block">
                                                <div className="px-6 py-3.5 hover:bg-gray-50 text-[#004A99] font-bold text-sm transition-all">{item.label}</div>
                                            </Link>
                                        )
                                    ))}
                                </ul>
                            </NavItem>

                            <Link to="/products"><li className="hover:text-[#0054A6] font-semibold">{t.products}</li></Link>
                            <Link to="/contacts"><li className="hover:text-[#0054A6] font-semibold">{t.contacts}</li></Link>
                        </ul>
                    </div>

                    <div className="flex items-center gap-3 lg:gap-6 justify-end">
                        <div className="relative hidden lg:block" ref={searchWrapperRef}>
                            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-48 transition-all focus-within:w-64 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
                                <Search className="w-4 h-4 text-gray-400" />
                                <input 
                                    type="text" 
                                    value={searchTerm} 
                                    onChange={(e) => setSearchTerm(e.target.value)} 
                                    onFocus={() => searchTerm.length > 1 && setShowSuggestions(true)}
                                    placeholder={t.searchPlaceholder} 
                                    className="bg-transparent border-none outline-none w-full text-xs ml-2 font-bold" 
                                />
                            </div>
                            
                            <AnimatePresence>
                                {showSuggestions && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full mt-2 left-0 w-80 bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden z-[2000]">
                                        {suggestions.length > 0 ? (
                                            suggestions.map(p => (
                                                <div key={p.id} onClick={() => handleResultClick(p.id)} className="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0">
                                                    <img src={`${API_URL}${p.image}`} className="w-10 h-10 object-contain bg-gray-50 rounded-lg" alt="" />
                                                    <span className="text-[13px] font-bold text-gray-700 line-clamp-1">{getLangField(p, 'title')}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-4 text-center text-gray-400 text-xs font-bold">{t.noResults}</div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="relative" ref={dropdownRef}>
                            <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-2 px-3 py-1.5 rounded-full font-bold text-[11px] uppercase bg-gray-100 text-[#1a2e44] hover:bg-gray-200 transition-colors">
                                <GlobeIcon size={14} className="opacity-70" /> <span>{lang}</span>
                            </button>
                            <AnimatePresence>
                                {isLangOpen && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-2 w-24 bg-white shadow-2xl rounded-xl border border-gray-100 z-[120] overflow-hidden">
                                        {['uz', 'ru', 'en'].map((item) => (
                                            <button key={item} onClick={() => { setLang(item); setIsLangOpen(false); }} className={`w-full text-left px-4 py-2.5 text-[11px] font-bold uppercase transition-colors ${lang === item ? 'bg-[#0054A6] text-white' : 'hover:bg-gray-50 text-[#1a2e44]'}`}>{item}</button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-[#1a2e44] hover:bg-gray-100 rounded-lg">
                            <MenuIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="navbar-roboto-container fixed inset-0 bg-white z-[9999] lg:hidden flex flex-col font-bold">
                        <div className="h-16 flex items-center justify-between px-6 border-b">
                            <img src={logo} alt="Logo" className="h-8 w-auto" />
                            <button onClick={() => setIsMobileMenuOpen(false)}><XIcon size={24} /></button>
                        </div>

                        <div className="px-6 py-4 relative">
                            <div className="flex items-center bg-gray-100 rounded-2xl px-4 py-3 w-full border border-gray-200">
                                <Search className="w-5 h-5 text-gray-400" />
                                <input 
                                    type="text" 
                                    value={searchTerm} 
                                    onChange={(e) => setSearchTerm(e.target.value)} 
                                    placeholder={t.searchPlaceholder} 
                                    className="bg-transparent border-none outline-none w-full text-sm ml-3 font-bold" 
                                />
                            </div>
                            
                            {showSuggestions && (
                                <div className="absolute left-6 right-6 top-full mt-1 bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden z-[10000]">
                                    {suggestions.length > 0 ? (
                                        suggestions.map(p => (
                                            <div key={p.id} onClick={() => handleResultClick(p.id)} className="flex items-center gap-3 p-4 border-b border-gray-50 active:bg-gray-50">
                                                <img src={`${API_URL}${p.image}`} className="w-12 h-12 object-contain bg-gray-50 rounded-xl" alt="" />
                                                <span className="text-[14px] font-bold text-gray-800 line-clamp-1">{getLangField(p, 'title')}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-4 text-center text-gray-400 text-sm font-bold">{t.noResults}</div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 pb-10">
                            <div className="space-y-2">
                                <div className="border-b border-gray-50">
                                    <button onClick={() => setMobileAccordion(mobileAccordion === 'about' ? null : 'about')} className="w-full flex justify-between items-center py-4 text-[#1a2e44]">
                                        <div className="flex items-center gap-3"><Info size={20} className="text-blue-600" /><span className="text-base">{t.about}</span></div>
                                        <ChevronRight size={18} className={mobileAccordion === 'about' ? 'rotate-90' : ''} />
                                    </button>
                                    <AnimatePresence>
                                        {mobileAccordion === 'about' && (
                                            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden pl-11 pb-4 space-y-1">
                                                {fullAboutItems.map((item, i) => (
                                                    <Link key={i} to={item.link} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-500">{item.title}</Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="border-b border-gray-50">
                                    <button onClick={() => setMobileAccordion(mobileAccordion === 'prod' ? null : 'prod')} className="w-full flex justify-between items-center py-4 text-[#1a2e44]">
                                        <div className="flex items-center gap-3"><Settings size={20} className="text-blue-600" /><span className="text-base">{t.production}</span></div>
                                        <ChevronRight size={18} className={mobileAccordion === 'prod' ? 'rotate-90' : ''} />
                                    </button>
                                    <AnimatePresence>
                                        {mobileAccordion === 'prod' && (
                                            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden pl-11 pb-4 space-y-4">
                                                {t.prodItems.map((item, i) => (
                                                    <div key={i} className="space-y-1">
                                                        {item.sub ? (
                                                            <>
                                                                <span className="text-blue-600 text-sm uppercase tracking-wider mb-2">{item.label}</span>
                                                                {item.sub.map((s, j) => (
                                                                    <Link key={j} to={s.link} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-500">• {s.title}</Link>
                                                                ))}
                                                            </>
                                                        ) : (
                                                            <Link to={item.link} onClick={() => setIsMobileMenuOpen(false)} className="text-blue-600 block">{item.label}</Link>
                                                        )}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <Link to="/products" className="flex items-center justify-between py-4 border-b border-gray-50 text-[#1a2e44]">
                                    <div className="flex items-center gap-3"><Package size={20} className="text-blue-600" /><span className="text-base">{t.products}</span></div>
                                    <ArrowRight size={18} className="opacity-30" />
                                </Link>

                                <Link to="/contacts" className="flex items-center justify-between py-4 border-b border-gray-50 text-[#1a2e44]">
                                    <div className="flex items-center gap-3"><Phone size={20} className="text-blue-600" /><span className="text-base">{t.contacts}</span></div>
                                    <ArrowRight size={18} className="opacity-30" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const NavItem = ({ label, active, onEnter, onLeave, children }) => (
    <li className="relative h-full flex items-center font-bold" onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <div className="relative py-2 flex items-center gap-1 group cursor-pointer">
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