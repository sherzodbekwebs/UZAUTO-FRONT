import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Building2, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const translations = {
    ru: {
        heroTitle: "История предприятия",
        introTitle: "ООО “UzAuto TRAILER”",
        marketTitle: "Рынки сбыта",
        serviceTitle: "Обслуживание",
        serviceDesc: "Приобрести технику и осуществить ее обслуживание потребители могут в дилерских центрах расположенных в Ташкенте и других региональных центрах нашей республики.",
        timelineHint: "Выберите важную веху развития",
        loading: "Загрузка истории..."
    },
    uz: {
        heroTitle: "Korxona tarixi",
        introTitle: "“UzAuto TRAILER” MCHJ",
        marketTitle: "Sotuv bozorlari",
        serviceTitle: "Xizmat ko'rsatish",
        serviceDesc: "Texnikani sotib olish va unga xizmat ko'rsatish Toshkent hamda respublikamizning boshqa mintaqaviy markazlarida joylashgan dilerlik markazlarida amalga oshirilishi mumkin.",
        timelineHint: "Rivojlanishning muhim bosqichini tanlang",
        loading: "Tarix yuklanmoqda..."
    },
    en: {
        heroTitle: "Company History",
        introTitle: "“UzAuto TRAILER” LLC",
        marketTitle: "Sales Markets",
        serviceTitle: "Service",
        serviceDesc: "Consumers can purchase equipment and carry out its maintenance at dealer centers located in Tashkent and other regional centers of our republic.",
        timelineHint: "Select a significant development milestone",
        loading: "Loading history..."
    }
};

const CompanyHistory = ({ lang = 'ru' }) => {
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const t = translations[lang] || translations.ru;
    const { hash } = useLocation();

    const [historyList, setHistoryList] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImg, setSelectedImg] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/history`);
                const data = await response.json();

                const formattedData = data
                    .filter(item => item.isActive)
                    .map(item => ({
                        id: item.id,
                        year: item.year || item.sortOrder.toString(),
                        ru: { title: item.titleRu, desc: item.descRu },
                        uz: { title: item.titleUz, desc: item.descUz },
                        en: { title: item.titleEn, desc: item.descEn },
                        images: item.image ? [`${API_BASE_URL}${item.image}`] : []
                    }));

                setHistoryList(formattedData);
                if (formattedData.length > 0) {
                    setSelectedEvent(formattedData[0]);
                }
            } catch (error) {
                console.error("Tarixni yuklashda xatolik:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [API_BASE_URL]);

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [hash]);

    if (loading) return <div className="h-screen flex items-center justify-center font-bold text-gray-400">{t.loading}</div>;

    return (
        <div className="pt-0 lg:pt-0 bg-white font-inter overflow-hidden min-h-screen">

            {/* 1. HERO */}
            <section className="relative h-[250px] lg:h-[300px] flex items-center justify-center bg-[#0a1425]">
                <div className="absolute inset-0 bg-blue-900/10 z-10"></div>
                <img src="https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=2000" className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale" alt="Background" />
                <div className="relative z-20 text-center px-4">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl lg:text-6xl font-semibold text-white tracking-tighter uppercase italic">
                        {t.heroTitle}
                    </motion.h1>
                    <div className="w-16 lg:w-20 h-1 bg-[#0054A6] mx-auto mt-4 lg:mt-6 rounded-full"></div>
                </div>
            </section>

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-20">

                {/* 2. INTRODUCTION */}
                <div id="history-intro" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 lg:mb-32 items-start scroll-mt-28">
                    <div className="lg:col-span-7 space-y-6 lg:space-y-8">
                        <h2 className="text-2xl lg:text-4xl font-semibold text-[#1a2e44]">{t.introTitle}</h2>
                        <div className="text-gray-600 text-base lg:text-lg leading-relaxed text-left sm:text-justify space-y-4 lg:space-y-6 font-medium">
                            <p>4 июня 2012 году Акционерной компанией «Узавтосаноат» учреждено предприятие в форме общества с ограниченной ответственностью «UzAuto TRAILER» по выпуску прицепной техники и различных видов надстроек на грузовые шасси.</p>
                            <p>Проектная мощность завода рассчитана на 3000 единиц: 2000 единиц – полуприцепов и 1000 единиц – надстроек на грузовые шасси, также освоен выпуск широкого спектра автомобильной техники для обеспечения различных отраслей хозяйства республики.</p>
                            <p>ООО “UzAuto TRAILER” нацелено на реализацию своей продукции не только на внутреннем рынке Узбекистана, но и в соседних странах Центральной Азии: Казахстан, Азербайджан, Афганистан, Туркменистан, Таджикистан и Кыргызстан.</p>
                        </div>
                    </div>
                    <div className="lg:col-span-5 bg-[#F8FAFC] p-6 lg:p-10 rounded-[30px] lg:rounded-[40px] border border-gray-100 shadow-sm flex flex-col justify-center">
                        <div className="space-y-6 lg:space-y-8">
                            <div className="flex gap-4 lg:gap-5">
                                <div className="shrink-0"><Globe className="text-[#0054A6]" size={24} /></div>
                                <div><h4 className="font-bold text-[#1a2e44] mb-1 lg:mb-2 uppercase text-[10px] lg:text-xs tracking-widest">{t.marketTitle}</h4><p className="text-xs lg:text-sm text-gray-500 font-semibold leading-relaxed">Казахстан, Азербайджан, Афганистан, Туркменистан, Таджикистан и Кыргызстан.</p></div>
                            </div>
                            <div className="flex gap-4 lg:gap-5">
                                <div className="shrink-0"><Building2 className="text-[#0054A6]" size={24} /></div>
                                <div><h4 className="font-bold text-[#1a2e44] mb-1 lg:mb-2 uppercase text-[10px] lg:text-xs tracking-widest">{t.serviceTitle}</h4><p className="text-xs lg:text-sm text-gray-500 font-semibold leading-relaxed">{t.serviceDesc}</p></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. GRID TIMELINE */}
                <section id="timeline" className="scroll-mt-28">
                    <div className="flex flex-col items-center mb-10 lg:mb-16 text-center">
                        <span className="text-[10px] font-black tracking-[0.4em] text-gray-400 uppercase mb-4">{t.timelineHint}</span>

                        <div className="w-full overflow-x-auto pb-4 no-scrollbar">
                            <div className="flex lg:grid lg:grid-cols-12 gap-2 lg:gap-4 min-w-max lg:min-w-full pt-8 border-t border-gray-100">
                                {historyList.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setSelectedEvent(item)}
                                        className={`select-none flex flex-col items-center py-3 lg:py-4 px-4 lg:px-0 rounded-2xl transition-all duration-300 min-w-[80px] lg:min-w-0 ${selectedEvent?.id === item.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                                    >
                                        <div className={`w-2.5 h-2.5 rounded-full mb-3 border-2 ${selectedEvent?.id === item.id ? 'bg-[#0054A6] border-[#0054A6]' : 'bg-white border-gray-300'}`} />
                                        <span className={`text-xs lg:text-base font-bold ${selectedEvent?.id === item.id ? 'text-[#0054A6]' : 'text-gray-400'}`}>
                                            {item.year}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {selectedEvent && (
                            <motion.div
                                key={selectedEvent.id}
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[300px] lg:min-h-[400px]"
                            >
                                <div className="lg:col-span-5 space-y-4 lg:space-y-6 order-2 lg:order-1">
                                    <div className="hidden lg:block select-none text-7xl lg:text-9xl font-black text-[#0054A6]/5 italic leading-none">{selectedEvent.year}</div>
                                    <div className="relative z-10 space-y-4 lg:space-y-6">
                                        <h3 className="text-2xl lg:text-4xl font-semibold text-[#1a2e44] leading-tight tracking-tighter">
                                            {selectedEvent[lang]?.title}
                                        </h3>
                                        <p className="text-gray-500 text-base lg:text-lg leading-relaxed font-medium">
                                            {selectedEvent[lang]?.desc}
                                        </p>
                                    </div>
                                </div>

                                <div className="lg:col-span-7 order-1 lg:order-2">
                                    <div className="grid grid-cols-1 gap-4">
                                        {selectedEvent.images.length > 0 ? (
                                            selectedEvent.images.map((img, idx) => (
                                                <div
                                                    key={idx}
                                                    onClick={() => setSelectedImg(img)}
                                                    className="cursor-zoom-in relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl border-2 lg:border-4 border-white h-[250px] lg:h-[450px]"
                                                >
                                                    <img src={img} className="w-full h-full object-cover" alt="History" />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="h-[250px] lg:h-[450px] bg-gray-100 rounded-3xl flex items-center justify-center text-gray-400 italic">No image available</div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </div>

            {/* LIGHTBOX MODAL - z-[9999] qo'shildi */}
            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedImg(null)}
                        className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 lg:p-6 cursor-zoom-out"
                    >
                        <button className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white transition-colors hover:text-red-500 z-[10000]"><X size={32} /></button>
                        <motion.img
                            initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            src={selectedImg} className="max-w-full max-h-[85vh] lg:max-h-[90vh] object-contain shadow-2xl rounded-lg" alt="Full view"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

           <style>
                {`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `}
            </style>
        </div>
    );
};

export default CompanyHistory;