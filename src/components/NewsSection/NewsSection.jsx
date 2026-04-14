import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Image as ImageIcon } from 'lucide-react'; // ImageIcon qo'shildi
import API, { API_URL } from '../../api/axios'; 
import { useLanguage } from '../../context/LanguageContext';

const NewsSection = () => {
    const { t, lang } = useLanguage();
    const [news, setNews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [stepWidth, setStepWidth] = useState(404); 
    
    const timeoutRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        API.get('/news?active=true')
            .then(res => setNews(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        const updateWidth = () => {
            if (window.innerWidth < 768) {
                setStepWidth(296); 
            } else {
                setStepWidth(404);
            }
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const infiniteNews = news.length > 0 ? [...news, ...news, ...news, ...news] : [];

    useEffect(() => {
        if (isPaused || news.length === 0) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev >= news.length ? 0 : prev + 1));
        }, 3500);
        return () => clearInterval(intervalRef.current);
    }, [isPaused, news.length]);

    const getField = (item, field) => {
        const k = lang.charAt(0).toUpperCase() + lang.slice(1);
        return item[`${field}${k}`] || item[`${field}Ru`] || "";
    };

    if (news.length === 0) return null;

    return (
        <section id="news-section" className="py-12 md:py-20 bg-white font-inter border-t border-gray-50 select-none">
            <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 overflow-hidden">
                
                <div className="flex flex-col items-center text-center mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#1a2e44] tracking-tight">
                        {lang === 'ru' ? 'Новости' : lang === 'uz' ? 'Янгиликлар' : 'News'}
                    </h2>
                    <div className="w-12 md:w-16 h-1 bg-[#0054A6] mt-3 md:mt-4 rounded-full" />
                </div>

                <div className="relative w-full cursor-grab active:cursor-grabbing">
                    <motion.div
                        className="flex gap-4 md:gap-6"
                        animate={{ x: -(currentIndex * stepWidth) }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        drag="x"
                        dragConstraints={{ left: -(news.length * stepWidth), right: 0 }}
                        onDragStart={() => setIsPaused(true)}
                        onDragEnd={() => { timeoutRef.current = setTimeout(() => setIsPaused(false), 4000); }}
                    >
                        {infiniteNews.map((item, index) => (
                            <div key={index} className="min-w-[280px] md:min-w-[380px] group bg-white rounded-[16px] md:rounded-[24px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                                
                                {/* 📸 IMAGE AREA WITH FALLBACK SOLUTION */}
                                <Link to={`/news/${item.id}`} className="block relative h-40 sm:h-48 md:h-56 overflow-hidden shrink-0 bg-slate-50" onPointerDown={(e) => e.stopPropagation()}>
                                    {item.image ? (
                                        <img 
                                            src={`${API_URL}${item.image}`} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none" 
                                            alt="" 
                                        />
                                    ) : (
                                        /* 🛡️ Rasm bo'lmaganda chiqadigan professional fon */
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f8f9fb] to-[#eef2f7] select-none">
                                            <div className="flex flex-col items-center opacity-20">
                                                <span className="text-[#0054A6] font-black text-xl md:text-2xl tracking-tighter italic">
                                                    UZAUTO TRAILER
                                                </span>
                                                <ImageIcon size={24} className="mt-2 text-[#0054A6]" />
                                            </div>
                                        </div>
                                    )}
                                </Link>
                                
                                <div className="p-4 md:p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 text-gray-400 text-[10px] md:text-[11px] font-medium mb-2 md:mb-3 uppercase tracking-wider">
                                        <Calendar size={13} className="text-[#0054A6]" /> {item.date}
                                    </div>

                                    <Link to={`/news/${item.id}`} className="block mb-2" onPointerDown={(e) => e.stopPropagation()}>
                                        <h3 className="text-base md:text-lg font-semibold text-[#1a2e44] hover:text-[#0054A6] transition-colors line-clamp-2 leading-snug min-h-[3rem] md:min-h-[3.5rem]">
                                            {getField(item, 'title')}
                                        </h3>
                                    </Link>

                                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 line-clamp-3 font-medium opacity-80">
                                        {getField(item, 'content').replace(/<[^>]*>/g, '')} 
                                    </p>

                                    <Link to={`/news/${item.id}`} onPointerDown={(e) => e.stopPropagation()} className="mt-auto inline-flex items-center gap-1.5 md:gap-2 text-[10px] md:text-[11px] font-bold text-[#0054A6] uppercase tracking-[1.5px] group/link">
                                        {t('details')}
                                        <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
                
                <div className="mt-8 md:mt-14 flex justify-center">
                    <Link to="/news" className="bg-[#1a2e44] text-white px-8 py-3 md:px-10 md:py-4 font-semibold uppercase text-[10px] md:text-[11px] tracking-[1.5px] md:tracking-[2px] rounded-lg md:rounded hover:bg-[#0054A6] transition-all shadow-lg active:scale-95">
                        {lang === 'ru' ? 'Все новости' : lang === 'uz' ? 'Барча янгиликлар' : 'All news'}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NewsSection;