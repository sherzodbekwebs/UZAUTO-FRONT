import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    Settings,
    ShieldCheck,
    Cpu,
    Users,
    BarChart3,
    Clock
} from 'lucide-react';

const translations = {
    ru: {
        name: "ИП ООО «UzAuto Trailer»",
        mission: "Неиссякаемое желание быть сопричастным в успехе своих клиентов через инновации и совершенствование.",
        features: [
            { title: "Производство", text: "Современные методы производства и проектирования коммерческой техники;", icon: Settings },
            { title: "Качество", text: "Контроль качества на всех этапах производства и реализации продукции;", icon: ShieldCheck },
            { title: "Ресурсы", text: "Использование материалов и комплектующих деталей мировых лидеров отрасли;", icon: Cpu },
            { title: "Персонал", text: "Высоко мотивированный, квалифицированный и преданный своему делу персонал;", icon: Users },
            { title: "Ценность", text: "Идеология, настроенная на создание ценности и максимального дохода для своих клиентов;", icon: BarChart3 },
            { title: "Традиции", text: "Забота о будущем, приверженность традициям качества и сохранения всех достоинств, приобретенных за прошедшие года.", icon: Clock }
        ],
        badgeYear: "11",
        badgeMarket: "ЛЕТ НА РЫНКЕ"
    },
    uz: {
        name: "XRP «UzAuto Trailer» MCHJ",
        mission: "Innovatsiyalar va tizimli takomillashtirish orqali mijozlar muvaffaqiyatiga hissa qo'shish.",
        features: [
            { title: "Ishlab chiqarish", text: "Tijorat texnikasini ishlab chiqarish va loyihalashning zamonaviy usullari;", icon: Settings },
            { title: "Sifat", text: "Ishlab chiqarish va sotishning barcha bosqichlarida sifat nazorati;", icon: ShieldCheck },
            { title: "Resurslar", text: "Sohadagi jahon yetakchilari materiallari va butlovchi qismlaridan foydalanish;", icon: Cpu },
            { title: "Xodimlar", text: "Yuqori motivatsiyali, malakali va o'z ishiga sadoqatli professionallar jamoasi;", icon: Users },
            { title: "Qiymat", text: "Mijozlar uchun yuqori qiymat va maksimal daromad yaratishga yo'naltirilgan mafkura;", icon: BarChart3 },
            { title: "An'analar", text: "Kelajak haqida qayg'urish, sifat an'analariga sodiqlik va o'tgan yillar davomida to'plangan barcha afzalliklarni saqlab qolish.", icon: Clock }
        ],
        badgeYear: "11",
        badgeMarket: "YIL BOZORDA"
    },
    en: {
        name: "FE «UzAuto Trailer» LLC",
        mission: "An inexhaustible desire to contribute to our clients' success through innovation and continuous improvement.",
        features: [
            { title: "Production", text: "Modern methods of production and design of commercial vehicles;", icon: Settings },
            { title: "Quality", text: "Quality control at all stages of production and sales;", icon: ShieldCheck },
            { title: "Resources", text: "Use of materials and components from world industry leaders;", icon: Cpu },
            { title: "Personnel", text: "Highly motivated, qualified, and dedicated staff;", icon: Users },
            { title: "Value", text: "Ideology focused on creating value and maximum income for clients;", icon: BarChart3 },
            { title: "Traditions", text: "Caring for the future, commitment to quality traditions and preservation of all advantages acquired over the past years.", icon: Clock }
        ],
        badgeYear: "11",
        badgeMarket: "YEARS ON THE MARKET"
    }
};

const missionImages = ["/1.jpg", "/2.jpg", "/3.png", "/4.png", "/5.png"];

const HomeMission = ({ lang = 'ru' }) => {
    const [index, setIndex] = useState(0);
    const t = translations[lang] || translations.ru;

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % missionImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [index]);

    const next = () => setIndex((index + 1) % missionImages.length);
    const prev = () => setIndex((index - 1 + missionImages.length) % missionImages.length);

    return (
        <section id="mission-section" className="w-full bg-[#F8FAFC] py-20 px-6 lg:px-16 font-inter overflow-hidden">
            <div className="max-w-[1440px] mx-auto">

                {/* 1. CENTERED HEADER */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl lg:text-5xl font-black text-[#1a2e44] mb-6 tracking-tighter"
                    >
                        {t.name}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg lg:text-xl font-medium text-gray-500 leading-relaxed"
                    >
                        {t.mission}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                    {/* 2. IMAGE SECTION */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative aspect-[3/2] overflow-hidden rounded-[30px] shadow-xl bg-gray-200 border-4 border-white">
                            <AnimatePresence initial={false}>
                                <motion.img
                                    key={index}
                                    src={missionImages[index]}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            <div className="absolute top-6 left-6 bg-black/20 backdrop-blur-md border border-white/30 px-5 py-4 rounded-2xl text-white shadow-lg z-10">
                                <div className="text-4xl font-black italic leading-none">{t.badgeYear}</div>
                                <div className="text-[9px] font-bold tracking-[2px] opacity-90 uppercase">{t.badgeMarket}</div>
                            </div>

                            <div className="absolute bottom-6 right-6 flex gap-2 z-10">
                                <button
                                    onClick={prev}
                                    className="p-2.5 bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-md rounded-full transition-all cursor-pointer shadow-lg active:scale-90"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={next}
                                    className="p-2.5 bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-md rounded-full transition-all cursor-pointer shadow-lg active:scale-90"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 3. FEATURES SECTION */}
                    <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {t.features.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group bg-white p-5 rounded-[24px] border border-transparent hover:border-blue-100 hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center"
                            >
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#0054A6] transition-colors">
                                    <item.icon className="w-5 h-5 text-[#0054A6] group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-sm font-bold text-[#1a2e44] mb-1 group-hover:text-[#0054A6]">
                                    {item.title}
                                </h3>
                                <p className="text-[11px] text-gray-400 leading-tight">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HomeMission;