import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Building2, 
    MapPin, 
    Phone, 
    Mail, 
    Globe, 
    ArrowUpRight, 
    Briefcase,
    Link as LinkIcon
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import talcoLogo from '../../../public/talcoLogo.png'; // Talco logosini shu nomda saqlang

const translations = {
    ru: {
        heroTitle: "Дочерние компании",
        breadcrumb: "Главная > О компании > Дочерние компании",
        companyName: "ООО СП «TALCO UZAUTO TRACK»",
        status: "совместное предприятие по производству надстроек для различных грузовых шасси.",
        description: "Производственная система предприятия интегрирована в единую цепочку завода UzAutoTrailer с которого поставляется комплектующие детали и материалы, а непосредственно операции по сварке, окраске, сборке и установки надстроек на шасси осуществляется на производственных мощностях в городе Турсунзаде (Таджикистан).",
        foundersTitle: "Учредители предприятия:",
        founders: "ООО «UzAutoTrailer» и ОАО «Таджикская алюминиевая компания»",
        contactLabels: {
            email: "Почта:",
            phone: "Контакты:",
            location: "Локация:",
            map: "Посмотреть на карте",
            website: "Веб-сайт:"
        },
        address: "734024, Республика Таджикистан, г.Душанбе, ул. Айни, 48, БЦ «Созидание», Блок А, 5-й этаж"
    },
    uz: {
        heroTitle: "Sho'ba korxonalar",
        breadcrumb: "Bosh sahifa > Kompaniya > Sho'ba korxonalar",
        companyName: "«TALCO UZAUTO TRACK» MCHJ QK",
        status: "turli xil yuk shassilari uchun ustqurmalar ishlab chiqarish bo'yicha qo'shma korxona.",
        description: "Korxonaning ishlab chiqarish tizimi UzAutoTrailer zavodining yagona zanjiriga integratsiyalashgan bo'lib, u yerdan butlovchi qismlar va materiallar yetkazib beriladi, shassilarga ustqurmalarni payvandlash, bo'yash, yig'ish va o'rnatish ishlari bevosita Tursunzoda shahridagi (Tojikiston) ishlab chiqarish quvvatlarida amalga oshiriladi.",
        foundersTitle: "Korxona muassislari:",
        founders: "«UzAutoTrailer» MCHJ va «Tojikiston alyuminiy kompaniyasi» OAJ",
        contactLabels: {
            email: "Pochta:",
            phone: "Kontaktlar:",
            location: "Manzil:",
            map: "Xaritada ko'rish",
            website: "Veb-sayt:"
        },
        address: "734024, Tojikiston Respublikasi, Dushanbe sh., Ayniy ko'ch., 48, «Sozidanie» biznes markazi, A blok, 5-qavat"
    },
    en: {
        heroTitle: "Affiliated Companies",
        breadcrumb: "Home > Company > Affiliated Companies",
        companyName: "TALCO UZAUTO TRACK JV LLC",
        status: "a joint venture for the production of superstructures for various truck chassis.",
        description: "The enterprise's production system is integrated into a single chain of the UzAutoTrailer plant, from which components and materials are supplied. Welding, painting, assembly, and installation of superstructures on chassis are carried out directly at production facilities in Tursunzade (Tajikistan).",
        foundersTitle: "Founders of the enterprise:",
        founders: "UzAutoTrailer LLC and OJSC Tajik Aluminum Company",
        contactLabels: {
            email: "E-mail:",
            phone: "Contacts:",
            location: "Location:",
            map: "View on map",
            website: "Website:"
        },
        address: "734024, Republic of Tajikistan, Dushanbe, Ayni str., 48, BC 'Sozidanie', Block A, 5th floor"
    }
};

const AffiliatedCompanies = ({ lang = 'ru' }) => {
    const t = translations[lang] || translations.ru;
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [hash]);

    return (
        <div className="pt-24 bg-[#F8FAFC] font-inter min-h-screen pb-32">
            
            {/* 1. HERO SECTION */}
            <section className="relative h-[300px] lg:h-[400px] flex items-center bg-[#0a1425] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a1425] via-transparent to-[#0a1425] z-10"></div>
                <motion.img 
                    initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 0.3 }} transition={{ duration: 1.5 }}
                    src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000" 
                    className="absolute inset-0 w-full h-full object-cover grayscale" 
                    alt="Industrial Background" 
                />
                <div className="relative z-20 max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                        <span className="text-[#0054A6] font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Our Partners</span>
                        <h1 className="text-4xl lg:text-6xl font-semibold text-white tracking-tighter italic uppercase">
                            {t.heroTitle}
                        </h1>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 -mt-12 relative z-30">
                
                {/* 2. MAIN CONTENT CARD - id: talco-jv */}
                <div id="talco-jv" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch scroll-mt-28">
                    
                    {/* LEFT: LOGO & INFO */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="lg:col-span-8 bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row"
                    >
                        <div className="md:w-1/3 bg-[#F8FAFC] flex items-center justify-center p-12 border-r border-gray-100">
                            <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
                                {/* Rasmni yuklab /public papkasiga talco_logo.png deb qo'ying */}
                                <img src={talcoLogo} alt="TALCO Logo" className="w-full h-auto object-contain" />
                            </motion.div>
                        </div>
                        
                        <div className="md:w-2/3 p-8 lg:p-12 space-y-8">
                            <div>
                                <h2 className="text-2xl lg:text-3xl font-bold text-[#1a2e44] mb-3 tracking-tight uppercase">
                                    {t.companyName}
                                </h2>
                                <p className="text-[#0054A6] font-bold text-sm lg:text-base leading-relaxed">
                                    {t.status}
                                </p>
                            </div>

                            <p className="text-gray-500 text-base lg:text-lg leading-relaxed font-medium text-justify">
                                {t.description}
                            </p>

                            <div className="pt-8 border-t border-gray-50">
                                <h4 className="text-[11px] font-black tracking-[0.2em] text-gray-400 mb-4 uppercase">{t.foundersTitle}</h4>
                                <div className="flex items-center gap-4 p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                                    <Briefcase className="text-[#0054A6] shrink-0" size={24} />
                                    <p className="text-[#1a2e44] font-bold text-[15px]">{t.founders}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT: CONTACT SIDEBAR */}
                   {/* RIGHT: CONTACT SIDEBAR - Kontrast kuchaytirildi */}
<motion.div 
    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
    className="lg:col-span-4 bg-[#1a2e44] rounded-[40px] p-8 lg:p-10 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden"
>
    {/* Fon dekoratsiyasi */}
    <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-[#0054A6]/30 rounded-full blur-[100px]"></div>
    
    <div className="relative z-10 space-y-10">
        {/* Email */}
        <div className="space-y-3">
            <div className="flex items-center gap-2 text-blue-300 font-bold text-[10px] tracking-[0.3em] uppercase opacity-90">
                <Mail size={14} className="text-[#0054A6] brightness-150" /> {t.contactLabels.email}
            </div>
            <a href="mailto:info@talco.com" className="text-xl font-bold hover:text-blue-300 transition-colors block border-b border-white/5 pb-2">
                info@talco.com
            </a>
        </div>

        {/* Phone */}
        <div className="space-y-3">
            <div className="flex items-center gap-2 text-blue-300 font-bold text-[10px] tracking-[0.3em] uppercase opacity-90">
                <Phone size={14} className="text-[#0054A6] brightness-150" /> {t.contactLabels.phone}
            </div>
            <a href="tel:+992888000336" className="text-2xl font-black tracking-tighter hover:text-blue-300 transition-colors block">
                +992 888 000 336
            </a>
        </div>

        {/* Location */}
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-300 font-bold text-[10px] tracking-[0.3em] uppercase opacity-90">
                <MapPin size={14} className="text-[#0054A6] brightness-150" /> {t.contactLabels.location}
            </div>
            <p className="text-[15px] font-medium leading-relaxed text-gray-300">
                {t.address}
            </p>
            <a 
                href="https://yandex.uz/maps/-/CDuYfK3n" 
                target="_blank" 
                className="inline-flex items-center gap-2 text-[11px] font-black text-white bg-[#0054A6] px-5 py-2.5 rounded-full uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg"
            >
                {t.contactLabels.map} <ArrowUpRight size={14} />
            </a>
        </div>
    </div>

    {/* Website Button */}
    <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
        <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] tracking-[0.3em] uppercase mb-5">
            <Globe size={14} /> {t.contactLabels.website}
        </div>
        <motion.a 
            href="http://talco.com" 
            target="_blank"
            whileHover={{ y: -4, shadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-between p-5 bg-white rounded-2xl text-[#1a2e44] font-black text-sm uppercase tracking-widest shadow-xl"
        >
            talco.com
            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                <LinkIcon size={16} className="text-[#0054A6]" />
            </div>
        </motion.a>
    </div>
</motion.div>

                </div>
            </div>
        </div>
    );
};

export default AffiliatedCompanies;