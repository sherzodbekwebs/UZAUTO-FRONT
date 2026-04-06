import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import axios from 'axios';

const translations = {
    uz: {
        catalogBtn: "KATALOG",
        contactBtn: "ALOQA",
        title: "Kelajak yo'llari uchun qudratli yechimlar",
        description: "UzAuto Trailer — og'ir yuk tashish sanoatida ishonchli hamkoringiz. Biz kuch va innovatsiyani birlashtiramiz."
    },
    ru: {
        catalogBtn: "КАТАЛОГ",
        contactBtn: "СВЯЗЬ",
        title: "МОЩНЫЕ РЕШЕНИЯ ДЛЯ ДОРОГ БУДУЩЕГО",
        description: "UzAuto Trailer — ваш надежный партнер в индустрии большегрузных перевозок. Мы объединяем силу и инновации."
    },
    en: {
        catalogBtn: "CATALOG",
        contactBtn: "CONTACT",
        title: "POWERFUL SOLUTIONS FOR THE ROADS OF THE FUTURE",
        description: "UzAuto Trailer is your reliable partner in the heavy haulage industry. We combine strength and innovation."
    }
};

const Hero = ({ lang = 'ru' }) => {
    const [bgImages, setBgImages] = useState([]);
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(true);

    const t = translations[lang] || translations.ru;
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    console.log("API Base URL:", API_BASE_URL);
    

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/anniversary-sliders`);
                const activeImages = response.data.filter(item => item.isActive !== false);
                console.log(response);
                
                setBgImages(activeImages);
                setLoading(false);
            } catch (err) {
                console.error("Xato:", err);
                setLoading(false);
            }
        };
        fetchImages();
    }, [API_BASE_URL]);

    useEffect(() => {
        if (bgImages.length > 0) {
            const timer = setInterval(() => { nextSlide(); }, 8000);
            return () => clearInterval(timer);
        }
    }, [current, bgImages]);

    const nextSlide = () => setCurrent(prev => (prev === bgImages.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrent(prev => (prev === 0 ? bgImages.length - 1 : prev - 1));

    if (loading || bgImages.length === 0) return <div className="h-screen bg-[#0a0a0a]" />;

    const currentImage = bgImages[current];
    const imagePath = currentImage.image.startsWith('http') ? currentImage.image : `${API_BASE_URL}${currentImage.image}`;
    console.log("Current Image Path:", imagePath);
    return (
        <section className="relative w-full h-screen overflow-hidden bg-[#0a0a0a] font-inter">

            {/* BACKGROUND LAYER */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentImage.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full"
                >
                    {/* Gradient Overlay: Chap tomonda matn o'qilishi uchun qorong'ulik beradi */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/10 to-transparent z-10" />

                    {/* RASM: Siz aytgan object-cover va o'ngga surish mantiqi */}
                    <img
                        src={imagePath}
                        alt="UzAuto Trailer"
                        /* 
                           object-[75%_center] — rasmning 75% o'ng qismini markaz qilib oladi.
                           Bu treylerni o'ng tomonda aniq ko'rsatadi va kesilib ketishini kamaytiradi.
                        */
                        className="w-full h-full object-cover object-[75%_center]"
                    />
                </motion.div>
            </AnimatePresence>

            {/* CONTENT LAYER */}
            <div className="relative z-20 h-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col justify-center">
                <div className="max-w-2xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl lg:text-[54px] font-black text-white leading-[1.05] mb-6 uppercase drop-shadow-2xl"
                    >
                        {t.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-sm lg:text-lg text-white/80 mb-10 max-w-lg font-medium leading-relaxed"
                    >
                        {t.description}
                    </motion.p>

                    <div className="flex gap-4">
                        <button className="bg-[#4478C3] hover:bg-blue-600 text-white px-10 py-3.5 rounded-sm font-bold transition-all text-[11px] tracking-widest cursor-pointer active:scale-95 shadow-lg">
                            {t.catalogBtn}
                        </button>
                        <button className="bg-[#E88B3A] hover:bg-[#d47a2e] text-white px-10 py-3.5 rounded-sm font-bold transition-all text-[11px] tracking-widest cursor-pointer active:scale-95 shadow-lg">
                            {t.contactBtn}
                        </button>
                    </div>
                </div>
            </div>

            {/* BOTTOM CONTROLS */}
            <div className="absolute bottom-10 left-0 right-0 z-40 px-6 lg:px-12 flex justify-between items-center">

                {/* Progress Indicators */}
                <div className="flex gap-2">
                    {bgImages.map((_, idx) => (
                        <div
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`h-[2px] cursor-pointer transition-all duration-500 ${idx === current ? 'w-10 bg-[#4478C3]' : 'w-5 bg-white/20'}`}
                        />
                    ))}
                </div>

                {/* Arrows & Phone */}
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <button onClick={prevSlide} className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full hover:bg-white/10 transition-all text-white cursor-pointer backdrop-blur-sm">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={nextSlide} className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full hover:bg-white/10 transition-all text-white cursor-pointer backdrop-blur-sm">
                            <ChevronRight size={20} />
                        </button>
                    </div>

                 
                </div>
            </div>
        </section>
    );
};

export default Hero;