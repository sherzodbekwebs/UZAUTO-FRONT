import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; 
import axios from 'axios';
import logo from '../../assets/Logo.jpg';
import API, { API_URL } from '../../api/axios';
import staticslayd from '../../../public/staticslayder.jpg';

const translations = {
    uz: { catalogBtn: "KATALOG", contactBtn: "ALOQA", title: "Kelajak yo'llari uchun qudratli yechimlar", description: "UzAuto Trailer — og'ir yuk tashish sanoatida ishonchli hamkoringiz. Biz kuch va innovatsiyani birlashtiramiz." },
    ru: { catalogBtn: "КАТАЛОГ", contactBtn: "КОНТАКТЫ", title: "МОЩНЫЕ РЕШЕНИЯ ДЛЯ ДОРОГ БУДУЩЕГО", description: "UzAuto Trailer — ваш надежный партнер в индустрии большегрузных перевозок. Мы объединяем силу и инновации." },
    en: { catalogBtn: "CATALOG", contactBtn: "CONTACT", title: "POWERFUL SOLUTIONS FOR THE ROADS OF THE FUTURE", description: "UzAuto Trailer is your reliable partner in the heavy haulage industry. We combine strength and innovation." }
};

const Hero = ({ lang = 'ru' }) => {
    const [bgImages, setBgImages] = useState([]);
    const [slides, setSlides] = useState([{ image: staticslayd, id: 'static' }]);
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [transitionEnabled, setTransitionEnabled] = useState(false);

    const navigate = useNavigate();
    const t = translations[lang] || translations.ru;

    const getFullImagePath = (img) => {
        if (!img) return staticslayd;
        if (img.startsWith('http') || img.startsWith('data:')) return img;
        if (img === staticslayd) return staticslayd;
        const cleanBaseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
        const cleanImgPath = img.startsWith('/') ? img : `/${img}`;
        return `${cleanBaseUrl}${cleanImgPath}`;
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`${API_URL}/sliders`);
                const active = response.data.filter(item => item.isActive !== false);
                if (active.length > 0) {
                    setBgImages(active);
                    setSlides([...active, ...active, ...active]);
                    setCurrent(active.length);
                }
                setLoading(false);
            } catch (err) {
                console.error("Fetch error:", err);
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    useEffect(() => {
        if (!loading) {
            const timeout = setTimeout(() => {
                setTransitionEnabled(true);
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [loading]);

    // 🔄 AVTOMATIK O'TISH (TEZLASHTIRILDI)
    useEffect(() => {
        if (bgImages.length <= 1 || isDragging || loading || !transitionEnabled) return;
        
        // Birinchi o'tishni biroz tezroq (5 soniya), keyingilarini 7 soniya qilamiz
        const timer = setInterval(() => {
            setCurrent(prev => prev + 1);
        }, 6000);

        return () => clearInterval(timer);
    }, [current, isDragging, bgImages, loading, transitionEnabled]);

    const nextSlide = () => { if (transitionEnabled) setCurrent(prev => prev + 1); };
    const prevSlide = () => { if (transitionEnabled) setCurrent(prev => prev - 1); };

    const handleUpdate = () => {
        if (loading || !bgImages.length) return;
        if (current >= bgImages.length * 2) {
            setTransitionEnabled(false);
            setCurrent(current - bgImages.length);
        } else if (current < bgImages.length) {
            setTransitionEnabled(false);
            setCurrent(current + bgImages.length);
        }
    };

    useEffect(() => {
        if (!transitionEnabled && !loading) {
            const timeout = setTimeout(() => setTransitionEnabled(true), 20);
            return () => clearTimeout(timeout);
        }
    }, [transitionEnabled, loading]);

    const onDragEnd = (e, info) => {
        if (loading) return;
        setIsDragging(false);
        const { offset, velocity } = info;
        if (offset.x < -40 || velocity.x < -400) nextSlide();
        else if (offset.x > 40 || velocity.x > 400) prevSlide();
    };

    return (
        <section className="relative w-full flex flex-col lg:h-screen lg:block overflow-hidden bg-[#0a0a0a] font-roboto">
            <Helmet><title>UzAuto Trailer - {t.title}</title></Helmet>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
                * { font-family: 'Roboto', sans-serif !important; }
            `}</style>

            <div className="relative w-full aspect-video sm:aspect-[16/8] lg:aspect-auto lg:h-full lg:absolute lg:inset-0 z-10 overflow-hidden cursor-grab active:cursor-grabbing">
                {loading ? (
                    <div className="absolute inset-0 w-full h-full">
                        {/* 🛠️ MOBILE GRADIENT LIGHTER */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-black/80 lg:via-black/20 lg:to-transparent z-10" />
                        <img src={staticslayd} alt="Static" className="w-full h-full object-cover object-center lg:object-[75%_center]" />
                    </div>
                ) : (
                    <motion.div
                        drag="x"
                        dragMomentum={false}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={onDragEnd}
                        animate={{ x: `-${current * 100}%` }}
                        onAnimationComplete={handleUpdate}
                        transition={transitionEnabled ? { type: "spring", bounce: 0, duration: 0.7 } : { duration: 0 }}
                        className="flex h-full w-full"
                    >
                        {slides.map((img, idx) => (
                            <div key={idx} className="relative h-full w-full shrink-0">
                                {/* 🛠️ MOBILE GRADIENT LIGHTER (Improved brightness) */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-black/80 lg:via-black/20 lg:to-transparent z-10" />
                                <img
                                    src={getFullImagePath(img.image)}
                                    alt="UzAuto"
                                    className="w-full h-full object-cover object-center lg:object-[75%_center] pointer-events-none select-none"
                                />
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>

            <div className="relative z-20 -mt-12 sm:-mt-16 lg:mt-0 lg:h-full max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col justify-start lg:justify-center items-center lg:items-start text-center lg:text-left bg-transparent pt-10 pb-20 lg:py-0 pointer-events-none font-roboto">
                <div className="max-w-3xl pointer-events-auto">
                    <motion.h1 key={lang} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[26px] sm:text-5xl lg:text-[62px] font-black text-white leading-[1.1] mb-4 lg:mb-6 uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                        {t.title}
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[13px] lg:text-lg text-white/90 mb-8 lg:mb-10 max-w-lg font-medium leading-relaxed px-4 lg:px-0 drop-shadow-lg">
                        {t.description}
                    </motion.p>
                    <div className="flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto px-2 lg:px-0">
                        <button onClick={() => navigate('/products')} className="flex-1 sm:flex-none min-w-[130px] sm:min-w-[180px] bg-[#0061A4] hover:bg-blue-600 text-white px-4 sm:px-10 py-3.5 rounded-sm font-bold transition-all text-[10px] tracking-widest cursor-pointer active:scale-95 shadow-xl">{t.catalogBtn}</button>
                        <button onClick={() => navigate('/contacts')} className="flex-1 sm:flex-none min-w-[130px] sm:min-w-[180px] bg-[#E88B3A] hover:bg-[#d47a2e] text-white px-4 sm:px-10 py-3.5 rounded-sm font-bold transition-all text-[10px] tracking-widest cursor-pointer active:scale-95 shadow-xl">{t.contactBtn}</button>
                    </div>
                </div>
            </div>

            {!loading && bgImages.length > 1 && (
                <>
                    <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 z-40 px-4 lg:px-8 justify-between items-center pointer-events-none w-full">
                        <button onClick={prevSlide} className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#0061A4] backdrop-blur-md transition-all active:scale-90 pointer-events-auto shadow-2xl"><ChevronLeft size={28} /></button>
                        <button onClick={nextSlide} className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#0061A4] backdrop-blur-md transition-all active:scale-90 pointer-events-auto shadow-2xl"><ChevronRight size={28} /></button>
                    </div>
                    <div className="absolute bottom-6 lg:bottom-12 left-0 right-0 z-40 px-6 lg:px-12 flex justify-center lg:justify-start items-center pointer-events-none">
                        <div className="flex gap-2 pointer-events-auto items-center">
                            {bgImages.map((_, idx) => (
                                <div key={idx} onClick={() => { if (transitionEnabled) setCurrent(idx + bgImages.length); }} 
                                className={`cursor-pointer transition-all duration-500 rounded-full ${idx === current % bgImages.length ? 'w-8 lg:w-16 h-[3px] bg-[#0061A4]' : 'w-4 lg:w-8 h-[2px] bg-white/20'}`} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default Hero;