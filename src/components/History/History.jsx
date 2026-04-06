import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Globe, 
    Building2, 
    X,
    ZoomIn,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
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
    const t = translations[lang] || translations.ru;
    const { hash } = useLocation();

    // --- BACKENDDAN KELADIGAN MA'LUMOTLAR UCHUN STATE ---
    const [historyList, setHistoryList] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImg, setSelectedImg] = useState(null); // Lightbox uchun

    useEffect(() => {
        // --- BU YERDA BACKENDDAN FETCH QILINADI ---
        const fetchData = async () => {
            setLoading(true);
            // Simulyatsiya (1.jpg, 2.jpg va h.k. rasmlar o'rniga o'zingiznikini qo'ying)
            const data = [
                { id: "2022", year: "2022", ru: { title: "Линейка FAW", desc: "Производство легкой коммерческой техники FAW T-80." }, uz: { title: "FAW liniyasi", desc: "FAW T-80 yengil tijorat texnikasi ishlab chiqarilishi." }, en: { title: "FAW Line", desc: "Production of FAW T-80 light commercial vehicles." }, images: ["/1.jpg"] },
                { id: "2021", year: "2021", ru: { title: "Автоматизация", desc: "Обновление систем управления производством." }, uz: { title: "Avtomatlashtirish", desc: "Ishlab chiqarishni boshqarish tizimlarini yangilash." }, en: { title: "Automation", desc: "Updating production management systems." }, images: ["/2.jpg", "/3.png"] },
                { id: "2020", year: "2020", ru: { title: "Цифровизация", desc: "Внедрение ERP систем в рабочие процессы." }, uz: { title: "Raqamlashtirish", desc: "Ish jarayonlariga ERP tizimlarini joriy etish." }, en: { title: "Digitalization", desc: "Implementation of ERP systems in workflows." }, images: ["/4.png"] },
                { id: "2019", year: "2019", ru: { title: "Сервисная сеть", desc: "Расширение сети по всей Республике." }, uz: { title: "Servis tarmog'i", desc: "Butun Respublika bo'ylab tarmoqni kengaytirish." }, en: { title: "Service Network", desc: "Expansion of the network across the Republic." }, images: ["/5.png"] },
                { id: "2018", year: "2018", ru: { title: "Рост мощностей", desc: "Увеличение объема выпуска продукции." }, uz: { title: "Quvvatlar o'sishi", desc: "Mahsulot ishlab chiqarish hajmini oshirish." }, en: { title: "Capacity Growth", desc: "Increasing production output volume." }, images: ["/6.png"] },
                { id: "2017", year: "2017", ru: { title: "Технологии Messer", desc: "Внедрение плазменной резки металла." }, uz: { title: "Messer texnologiyasi", desc: "Metallni plazmali kesishni joriy etish." }, en: { title: "Messer Tech", desc: "Implementation of plasma metal cutting." }, images: ["/7.png"] },
                { id: "2016", year: "2016", ru: { title: "Сертификация", desc: "Получение международных стандартов качества." }, uz: { title: "Sertifikatlash", desc: "Xalqaro sifat standartlarini qo'lga kiritish." }, en: { title: "Certification", desc: "Obtaining international quality standards." }, images: ["/8.png"] },
                { id: "2015", year: "2015", ru: { title: "Экспортный старт", desc: "Первые поставки в страны СНГ." }, uz: { title: "Eksport starti", desc: "MDH davlatlariga ilk yetkazib berishlar." }, en: { title: "Export Launch", desc: "First supplies to CIS countries." }, images: ["/9.png"] },
                { id: "2014", year: "2014", ru: { title: "Лидеры отрасли", desc: "Партнерство с мировыми поставщиками." }, uz: { title: "Soha yetakchilari", desc: "Jahon yetkazib beruvchilari bilan hamkorlik." }, en: { title: "Industry Leaders", desc: "Partnership with global suppliers." }, images: ["/10.png"] },
                { id: "2013_1", year: "2013", ru: { title: "Новая линейка", desc: "Запуск производства изотермических кузовов." }, uz: { title: "Yangi liniya", desc: "Izotermik kuzovlar ishlab chiqarishni boshlash." }, en: { title: "New Line", desc: "Starting production of isothermal bodies." }, images: ["/11.png"] },
                { id: "2013_2", year: "2013", ru: { title: "Стандарт ISO", desc: "Внедрение системы ISO 9001:2015." }, uz: { title: "ISO standarti", desc: "ISO 9001:2015 tizimini joriy etish." }, en: { title: "ISO Standard", desc: "Implementation of ISO 9001:2015 system." }, images: ["/1.jpg"] },
                { id: "2012", year: "2012", ru: { title: "Основание", desc: "4 июня 2012 года учреждено ООО «UzAuto TRAILER»." }, uz: { title: "Tashkil etish", desc: "2012-yil 4-iyunda «UzAuto TRAILER» MCHJ tashkil etildi." }, en: { title: "Founding", desc: "UzAuto TRAILER LLC was founded on June 4, 2012." }, images: ["/2.jpg"] }
            ];
            setHistoryList(data);
            setSelectedEvent(data[0]);
            setLoading(false);
        };
        fetchData();
    }, []);

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
        <div className="pt-24 bg-white font-inter overflow-hidden min-h-screen">
            
            {/* 1. HERO */}
            <section className="relative h-[300px] flex items-center justify-center bg-[#0a1425]">
                <div className="absolute inset-0 bg-blue-900/10 z-10"></div>
                <img src="https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=2000" className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale" alt="Background" />
                <div className="relative z-20 text-center px-6">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl lg:text-6xl font-semibold text-white tracking-tighter uppercase italic">
                        {t.heroTitle}
                    </motion.h1>
                    <div className="w-20 h-1 bg-[#0054A6] mx-auto mt-6 rounded-full"></div>
                </div>
            </section>

            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20">
                
                {/* 2. INTRODUCTION */}
                <div id="history-intro" className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 items-start scroll-mt-28">
                    <div className="lg:col-span-7 space-y-8">
                        <h2 className="text-3xl lg:text-4xl font-semibold text-[#1a2e44]">{t.introTitle}</h2>
                        <div className="text-gray-600 text-lg leading-relaxed text-justify space-y-6 font-medium">
                            <p>4 июня 2012 году Акционерной компанией «Узавтосаноат» учреждено предприятие в форме общества с ограниченной ответственностью «UzAuto TRAILER» по выпуску прицепной техники и различных видов надстроек на грузовые шасси.</p>
                            <p>Проектная мощность завода рассчитана на 3000 единиц: 2000 единиц – полуприцепов и 1000 единиц – надстроек на грузовые шасси, также освоен выпуск широкого спектра автомобильной техники для обеспечения различных отраслей хозяйства республики.</p>
                            <p>ООО “UzAuto TRAILER” нацелено на реализацию своей продукции не только на внутреннем рынке Узбекистана, но и в соседних странах Центральной Азии: Казахстан, Азербайджан, Афганистан, Туркменистан, Таджикистан и Кыргызстан.</p>
                        </div>
                    </div>
                    <div className="lg:col-span-5 bg-[#F8FAFC] p-10 rounded-[40px] border border-gray-100 shadow-sm flex flex-col justify-center h-full">
                        <div className="space-y-8">
                            <div className="flex gap-5">
                                <Globe className="text-[#0054A6]" size={28} />
                                <div><h4 className="font-bold text-[#1a2e44] mb-2 uppercase text-xs tracking-widest">{t.marketTitle}</h4><p className="text-sm text-gray-500 font-semibold leading-relaxed">Казахстан, Азербайджан, Афганистан, Туркменистан, Таджикистан и Кыргызстан.</p></div>
                            </div>
                            <div className="flex gap-5">
                                <Building2 className="text-[#0054A6]" size={28} />
                                <div><h4 className="font-bold text-[#1a2e44] mb-2 uppercase text-xs tracking-widest">{t.serviceTitle}</h4><p className="text-sm text-gray-500 font-semibold leading-relaxed">{t.serviceDesc}</p></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. GRID TIMELINE */}
                <section id="timeline" className="scroll-mt-28">
                    <div className="flex flex-col items-center mb-16 text-center">
                        <span className="text-[10px] font-black tracking-[0.4em] text-gray-400 uppercase mb-4">{t.timelineHint}</span>
                        
                        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4 w-full pt-8 border-t border-gray-100">
                            {historyList.map((item) => (
                                <button 
                                    key={item.id}
                                    onClick={() => setSelectedEvent(item)}
                                    // select-none faqat yillar uchun
                                    className={`select-none flex flex-col items-center py-4 rounded-2xl transition-all duration-300 ${selectedEvent?.id === item.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                                >
                                    <div className={`w-3 h-3 rounded-full mb-3 border-2 ${selectedEvent?.id === item.id ? 'bg-[#0054A6] border-[#0054A6]' : 'bg-white border-gray-300'}`} />
                                    <span className={`text-sm lg:text-base font-bold ${selectedEvent?.id === item.id ? 'text-[#0054A6]' : 'text-gray-400'}`}>
                                        {item.year}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {selectedEvent && (
                            <motion.div 
                                key={selectedEvent.id}
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[400px]"
                            >
                                <div className="lg:col-span-5 space-y-6">
                                    <div className="select-none text-7xl lg:text-9xl font-black text-[#0054A6]/5 italic leading-none">{selectedEvent.year}</div>
                                    <div className="relative z-10 space-y-6">
                                        <h3 className="text-3xl lg:text-4xl font-semibold text-[#1a2e44] leading-tight tracking-tighter">{selectedEvent[lang].title}</h3>
                                        <p className="text-gray-500 text-lg leading-relaxed font-medium">{selectedEvent[lang].desc}</p>
                                    </div>
                                </div>

                                <div className="lg:col-span-7">
                                    <div className={`grid gap-4 ${selectedEvent.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                                        {selectedEvent.images.map((img, idx) => (
                                            <div 
                                                key={idx}
                                                onClick={() => setSelectedImg(img)}
                                                className={`cursor-zoom-in relative rounded-3xl overflow-hidden shadow-xl border-4 border-white ${
                                                    selectedEvent.images.length === 3 && idx === 0 ? 'row-span-2 h-full' : 
                                                    selectedEvent.images.length === 1 ? 'h-[400px]' : 'h-[250px]'
                                                }`}
                                            >
                                                <img src={img} className="w-full h-full object-cover" alt="History" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </div>

            {/* LIGHTBOX MODAL */}
            <AnimatePresence>
                {selectedImg && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedImg(null)}
                        className="fixed inset-0 z-[500] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 cursor-zoom-out"
                    >
                        <button className="absolute top-10 right-10 text-white transition-colors hover:text-red-500"><X size={40} /></button>
                        <motion.img 
                            initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            src={selectedImg} className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-lg" alt="Full view" 
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CompanyHistory;