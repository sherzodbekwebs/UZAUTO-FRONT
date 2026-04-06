import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { newsData } from '../newsData/newsData';

const NewsSection = ({ lang }) => {
    const [isPaused, setIsPaused] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef(null);
    const intervalRef = useRef(null);

    // Cheksiz aylanish uchun ma'lumotlarni ko'paytiramiz
    const infiniteNews = [...newsData, ...newsData, ...newsData, ...newsData];
    
    // Bitta kartaning kengligi (Karta: 380px + Gap: 24px = 404px)
    const stepWidth = 404; 

    // AVTOMATIK BITTA-BITTA YURISH MANTIQI
    useEffect(() => {
        if (isPaused) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }

        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => {
                // Agar birinchi blok tugasa (newsData.length), boshiga qaytarish (loop)
                if (prev >= newsData.length) return 0;
                return prev + 1;
            });
        }, 3000); // 1 sekund yurish + 2 sekund qotib turish = 3000ms

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPaused, newsData.length]);

    const handleDragStart = () => {
        setIsPaused(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const handleDragEnd = () => {
        timeoutRef.current = setTimeout(() => {
            setIsPaused(false);
        }, 4000);
    };

    return (
        <section id="news-section" className="py-20 bg-white font-inter border-t border-gray-50 select-none">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 overflow-hidden">

                {/* Sarlavha qismi */}
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-semibold text-[#1a2e44] tracking-tight">
                        {lang === 'ru' ? 'Новости' : lang === 'uz' ? 'Yangiliklar' : 'News'}
                    </h2>
                    <div className="w-16 h-1 bg-[#0054A6] mt-4 rounded-full" />
                </div>

                {/* 2. SLAYDER MAYDONI */}
                <div className="relative w-full cursor-grab active:cursor-grabbing">
                    <motion.div
                        className="flex gap-6"
                        // BIR XIL TEMPDA EMAS, BITTA-BITTA INDEX BO'YICHA SURILADI
                        animate={{
                            x: -(currentIndex * stepWidth),
                        }}
                        transition={{
                            duration: 0.8, // Yurish tezligi
                            ease: "easeInOut",
                        }}
                        drag="x"
                        dragConstraints={{ left: -(newsData.length * stepWidth), right: 0 }}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    >
                        {infiniteNews.map((item, index) => {
                            const t = item[lang] || item.ru;

                            return (
                                <div
                                    key={index}
                                    className="min-w-[300px] md:min-w-[380px] group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                                >
                                    <Link 
                                        to={`/news/${item.id}`} 
                                        className="block relative h-48 md:h-56 overflow-hidden"
                                        onPointerDown={(e) => e.stopPropagation()}
                                    >
                                        <img
                                            src={item.image}
                                            draggable="false"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                                            alt=""
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                                    </Link>

                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-gray-400 text-[11px] font-medium mb-3 uppercase tracking-wider">
                                            <Calendar size={13} className="text-[#0054A6]" /> {item.date}
                                        </div>

                                        <Link 
                                            to={`/news/${item.id}`} 
                                            className="block h-14 mb-4"
                                            onPointerDown={(e) => e.stopPropagation()}
                                        >
                                            <h3 className="text-lg font-semibold text-[#1a2e44] hover:text-[#0054A6] transition-colors line-clamp-2 leading-snug">
                                                {t.title}
                                            </h3>
                                        </Link>

                                        <Link
                                            to={`/news/${item.id}`}
                                            onPointerDown={(e) => e.stopPropagation()}
                                            className="inline-flex items-center gap-2 text-[11px] font-bold text-[#0054A6] uppercase tracking-[1.5px] group/link"
                                        >
                                            {lang === 'ru' ? 'ПОДРОБНЕЕ' : lang === 'uz' ? 'BATAFSIL' : 'READ MORE'}
                                            <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* 3. PASTKI TUGMA */}
                <div className="mt-14 flex justify-center">
                    <Link
                        to="/news"
                        className="bg-[#1a2e44] text-white px-10 py-4 font-semibold uppercase text-[11px] tracking-[2px] rounded hover:bg-[#0054A6] transition-all shadow-lg active:scale-95"
                    >
                        {lang === 'ru' ? 'Все новости' : lang === 'uz' ? 'Barcha yangiliklar' : 'All news'}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NewsSection;