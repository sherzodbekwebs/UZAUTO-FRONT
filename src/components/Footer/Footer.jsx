import React from 'react';
import { motion } from 'framer-motion';
import {
    Send, Instagram, Facebook, Youtube,
    MapPin, Phone, Mail, ArrowRight
} from 'lucide-react';
import logo_footer from '../../assets/logo_footer.png';
import { Link } from 'react-router-dom';

const translations = {
    ru: {
        desc: "Завод-изготовитель прицепной и навесной техники полного цикла в составе автомобильной промышленности Узбекистана.",
        columns: [
            { title: "НАВИГАЦИЯ", links: ["О компании", "Производство", "Продукция", "Контакты"] },
            {
                title: "КОНТАКТЫ", items: [
                    { icon: MapPin, text: "г. Тashkent, ул. Мирзо-Улугбека, 30" },
                    { icon: Phone, text: "+998 71 202 32 23" }
                ]
            },
            {
                title: "ПРОИЗВОДСТВО", items: [
                    { icon: MapPin, text: "г. Самарканд, ул. Ташкентская, 2" },
                    { icon: Mail, text: "info@uzautotrailer.uz" }
                ]
            }
        ],
        copyright: "© 2026 UzAuto Trailer. Все права защищены."
    },
    uz: {
        desc: "O'zbekiston avtomobil sanoatining to'liq siklli tirkama va osma texnikalar ishlab chiqaruvchi zavodi.",
        columns: [
            { title: "NAVIGATSIYA", links: ["Kompaniya", "Ishlab chiqarish", "Mahsulotlar", "Aloqa"] },
            {
                title: "KONTAKTLAR", items: [
                    { icon: MapPin, text: "Toshkent sh., Mirzo-Ulug'bek ko'chasi, 30" },
                    { icon: Phone, text: "+998 71 202 32 23" }
                ]
            },
            {
                title: "ISHLAB CHIQARISH", items: [
                    { icon: MapPin, text: "Samarqand sh., Toshkent ko'chasi, 2" },
                    { icon: Mail, text: "info@uzautotrailer.uz" }
                ]
            }
        ],
        copyright: "© 2026 UzAuto Trailer. Barcha huquqlar himoyalangan."
    },
    en: {
        desc: "Full-cycle manufacturer of trailers and mounted equipment within the automotive industry of Uzbekistan.",
        columns: [
            { title: "NAVIGATION", links: ["About Company", "Production", "Products", "Contacts"] },
            {
                title: "CONTACTS", items: [
                    { icon: MapPin, text: "30 Mirzo-Ulugbek str., Tashkent" },
                    { icon: Phone, text: "+998 71 202 32 23" }
                ]
            },
            {
                title: "PRODUCTION", items: [
                    { icon: MapPin, text: "2 Tashkent str., Samarkand" },
                    { icon: Mail, text: "info@uzautotrailer.uz" }
                ]
            }
        ],
        copyright: "© 2026 UzAuto Trailer. All rights reserved."
    },
};

// Ijtimoiy tarmoqlar o'z brend ranglari bilan
const socialLinks = [
    { icon: Send, url: "https://t.me/uatproductsbot", color: "#0088cc" }, // Telegram Blue
    { icon: Instagram, url: "https://www.instagram.com/uzautotrailer_official", color: "#E1306C" }, // Instagram Pink
    { icon: Facebook, url: "https://www.facebook.com/UzAutoTrailerofficial", color: "#1877F2" }, // Facebook Blue
    { icon: Youtube, url: "https://www.youtube.com/@UzAutoTrailer/videos", color: "#FF0000" } // YouTube Red
];

const Footer = ({ lang = 'ru' }) => {
    const t = translations[lang] || translations.ru;

    return (
        <footer className="w-full bg-[#F8FAFC] text-[#1a2e44] pt-32 pb-16 px-6 lg:px-16 font-inter border-t border-gray-200">
            <div className="max-w-[1440px] mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 pb-24">

                    {/* Brend va Ijtimoiy tarmoqlar */}
                    <div className="flex flex-col gap-8">
                        <Link to="/">
                            <img src={logo_footer} alt="Logo" className="h-7 w-auto object-contain self-start transition-all duration-500 cursor-pointer" />
                        </Link>
                        <p className="text-gray-500 text-[15px] leading-relaxed max-w-[300px]">
                            {t.desc}
                        </p>

                        <div className="flex gap-4 mt-2">
                            {socialLinks.map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    // whileHover={{ scale: 1.1, y: -2 }} // Kattalashish va yuqoriga chiqish
                                    // transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm transition-all cursor-pointer"
                                    style={{ color: social.color }} // Default ranglar
                                >
                                    <social.icon size={24} strokeWidth={2.5} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Ustunlar (Navigatsiya va Kontaktlar) */}
                    {t.columns.map((col, idx) => (
                        <div key={idx}>
                            <h4 className="text-[13px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-10">
                                {col.title}
                            </h4>
                            <ul className="flex flex-col gap-6">
                                {col.links ? col.links.map((link, i) => {
                                    const isContact = link.toLowerCase() === 'contacts' || link.toLowerCase() === 'контакты' || link.toLowerCase() === 'aloqa';
                                    return (
                                        <li key={i}>
                                            <Link 
                                                to={isContact ? "/contacts" : "/"} 
                                                className="text-[16px] font-semibold text-[#1a2e44] hover:text-[#0054A6] transition-colors flex items-center group"
                                            >
                                                {link}
                                                <ArrowRight size={16} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                            </Link>
                                        </li>
                                    )
                                }) : col.items.map((item, i) => {
                                    const isPhone = item.text.includes('+');
                                    const isEmail = item.text.includes('@');

                                    return (
                                        <li key={i} className="flex gap-4 items-start group/item">
                                            <item.icon size={22} className="text-[#0054A6] shrink-0 mt-0.5 opacity-80" />
                                            <span className="text-[16px] font-medium text-gray-600 leading-snug">
                                                {isPhone ? (
                                                    <a href={`tel:${item.text.replace(/\s+/g, '')}`} className="hover:text-[#0054A6] transition-colors font-bold text-[#1a2e44]">
                                                        {item.text}
                                                    </a>
                                                ) : isEmail ? (
                                                    <a href={`mailto:${item.text}`} className="hover:text-[#0054A6] transition-colors underline decoration-[#0054A6]/20 underline-offset-4">
                                                        {item.text}
                                                    </a>
                                                ) : (
                                                    <Link to="/contacts" className="hover:text-[#0054A6] transition-colors cursor-pointer">
                                                        {item.text}
                                                    </Link>
                                                )}
                                            </span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Pastki qism */}
                <div className="pt-12 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    <p className="text-[14px] font-medium text-gray-400">
                        {t.copyright}
                    </p>
                    <div className="flex gap-10 text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                        <Link to="/" className="hover:text-[#0054A6] transition-colors">Privacy Policy</Link>
                        <Link to="/" className="hover:text-[#0054A6] transition-colors">Terms of Use</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;