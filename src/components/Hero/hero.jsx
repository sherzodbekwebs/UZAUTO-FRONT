import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const translations = {
    uz: { catalogBtn: "KATALOG", contactBtn: "ALOQA", title: "Kelajak yo'llari uchun qudratli yechimlar", description: "UzAuto Trailer — og'ir yuk tashish sanoatida ishonchli hamkoringiz. Biz kuch va innovatsiyani birlashtiramiz." },
    ru: { catalogBtn: "КАТАЛОГ", contactBtn: "КОНТАКТЫ", title: "МОЩНЫЕ РЕШЕНИЯ ДЛЯ ДОРОГ БУДУЩЕГО", description: "UzAuto Trailer — ваш надежный партнер в индустрии большегрузных перевозок. Мы объединяем силу и инновации." },
    en: { catalogBtn: "CATALOG", contactBtn: "CONTACT", title: "POWERFUL SOLUTIONS FOR THE ROADS OF THE FUTURE", description: "UzAuto Trailer is your reliable partner in the heavy haulage industry. We combine strength and innovation." }
};

// 🛡️ Stil yordamchisi
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Hero = ({ lang = 'ru' }) => {
    const [bgImages, setBgImages] = useState([]);
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(true);

    const t = translations[lang] || translations.ru;
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    // 1. Backenddan ma'lumot olish
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/sliders`);
                const activeImages = response.data.filter(item => item.isActive !== false);
                setBgImages(activeImages);
                setLoading(false);
            } catch (err) {
                console.error("Xato:", err);
                setLoading(false);
            }
        };
        fetchImages();
    }, [API_BASE_URL]);

    // 🚀 2. AVTOMATIK O'TISH MANTIQLARI (Timer)
    useEffect(() => {
        if (bgImages.length > 0) {
            const timer = setInterval(() => {
                nextSlide();
            }, 5000); 
            return () => clearInterval(timer);
        }
    }, [current, bgImages]);

    const nextSlide = () => setCurrent(prev => (prev === bgImages.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrent(prev => (prev === 0 ? bgImages.length - 1 : prev - 1));

    if (loading || bgImages.length === 0) return <div className="h-screen bg-[#0a0a0a]" />;

    const currentImage = bgImages[current];
    const imagePath = currentImage.image.startsWith('http') ? currentImage.image : `${API_BASE_URL}${currentImage.image}`;

    return (
        <section className="relative w-full flex flex-col lg:h-screen lg:block overflow-hidden bg-[#0a0a0a] font-inter">

            {/* 📸 IMAGE AREA */}
            <div className="relative w-full h-auto lg:h-full lg:absolute lg:inset-0 z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImage.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-full"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent lg:bg-gradient-to-r lg:from-black/70 lg:via-black/20 lg:to-transparent z-10" />
                        
                        <img
                            src={imagePath}
                            alt="UzAuto Trailer"
                            className="w-full h-auto lg:h-full object-contain lg:object-cover object-center lg:object-[75%_center]"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* 📝 TEXT CONTENT AREA */}
            {/* 🚀 pt-10 dan pt-6 ga o'zgartirildi (bu matnni 15-16px yuqoriga ko'taradi) */}
            <div className="relative z-20 flex-1 lg:h-full max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col justify-start lg:justify-center items-center lg:items-start text-center lg:text-left bg-[#0a0a0a] lg:bg-transparent pt-6 pb-24 lg:py-0">
                <div className="max-w-3xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl sm:text-4xl lg:text-[54px] font-black text-white leading-tight lg:leading-[1.05] mb-4 lg:mb-6 uppercase drop-shadow-2xl"
                    >
                        {t.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-sm lg:text-lg text-white/60 mb-8 lg:mb-10 max-w-lg font-medium leading-relaxed px-2 lg:px-0"
                    >
                        {t.description}
                    </motion.p>

                    <div className="flex gap-4 w-full sm:w-auto px-4 lg:px-0">
                        <button className="flex-1 sm:flex-none bg-[#0061A4] hover:bg-blue-600 text-white px-8 lg:px-12 py-3.5 lg:py-4 rounded-sm font-bold transition-all text-[11px] tracking-widest cursor-pointer active:scale-95 shadow-xl">
                            {t.catalogBtn}
                        </button>
                        <button className="flex-1 sm:flex-none bg-[#E88B3A] hover:bg-[#d47a2e] text-white px-8 lg:px-12 py-3.5 lg:py-4 rounded-sm font-bold transition-all text-[11px] tracking-widest cursor-pointer active:scale-95 shadow-xl">
                            {t.contactBtn}
                        </button>
                    </div>
                </div>
            </div>

            {/* 🎮 CONTROLS AREA */}
            <div className="absolute bottom-6 lg:bottom-12 left-0 right-0 z-40 px-6 lg:px-12 flex justify-between items-center pointer-events-none">
                
                <div className="flex gap-2 pointer-events-auto items-center">
                    {bgImages.map((_, idx) => (
                        <div
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`cursor-pointer transition-all duration-500 rounded-full ${idx === current ? 'w-8 lg:w-16 h-[3px] bg-[#0061A4]' : 'w-4 lg:w-8 h-[2px] bg-white/20'}`}
                        />
                    ))}
                </div>

                <div className="flex gap-3 pointer-events-auto">
                    <button onClick={prevSlide} className="w-9 h-9 lg:w-12 lg:h-12 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10 backdrop-blur-md transition-all">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={nextSlide} className="w-9 h-9 lg:w-12 lg:h-12 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10 backdrop-blur-md transition-all">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;