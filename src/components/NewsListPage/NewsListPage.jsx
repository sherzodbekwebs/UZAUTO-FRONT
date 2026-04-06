import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Eye, ArrowRight, ChevronLeft } from 'lucide-react';
import { newsData } from '../newsData/newsData';

const NewsListPage = ({ lang }) => {
    // Sahifa ochilganda eng tepaga skroll bo'lishi uchun
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="pt-32 pb-20 bg-[#F8FAFC] min-h-screen font-inter">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

                {/* 1. NAZAD (ORQAGA) TUGMASI */}
                <div className="mb-10">
                    <Link
                        to="/#news-section"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-[#0054A6] transition-all font-medium uppercase text-[11px] tracking-[2px] group"
                    >
                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        {lang === 'ru' ? 'Назад на главную' : lang === 'uz' ? 'Asosiy sahifaga qaytish' : 'Back to home'}
                    </Link>
                </div>

                {/* 2. ASOSIY SARLAVHA - font-semibold qilindi */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl lg:text-5xl font-semibold text-[#1a2e44] tracking-tight">
                        {lang === 'ru' ? 'Все новости' : lang === 'uz' ? 'Barcha yangiliklar' : 'All news'}
                    </h1>
                    <div className="w-16 h-1 bg-[#0054A6] mx-auto mt-6 rounded-full" />
                </div>

                {/* 3. YANGILIKLAR GRIDI */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {newsData.map((item) => {
                        const t = item[lang] || item.ru; // Xavfsiz o'qish

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group"
                            >
                                {/* Karta rasmi */}
                                <Link to={`/news/${item.id}`} className="relative h-60 overflow-hidden block">
                                    <img
                                        src={item.image}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        alt=""
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                                </Link>

                                {/* Karta kontenti */}
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-4 text-gray-400 text-[11px] font-medium mb-4 uppercase tracking-wider">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar size={14} className="text-[#0054A6]" /> {item.date}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Eye size={14} className="text-[#0054A6]" /> {item.views}
                                        </span>
                                    </div>

                                    {/* Karta sarlavhasi - font-semibold qilindi */}
                                    <Link to={`/news/${item.id}`}>
                                        <h3 className="text-xl font-semibold text-[#1a2e44] mb-4 hover:text-[#0054A6] transition-colors line-clamp-2 leading-snug">
                                            {t.title}
                                        </h3>
                                    </Link>

                                    <p className="text-gray-500 text-[14px] mb-8 line-clamp-3 leading-relaxed font-normal">
                                        {t.desc}
                                    </p>

                                    {/* Podrobnee tugmasi */}
                                    <Link
                                        to={`/news/${item.id}`}
                                        className="mt-auto inline-flex items-center gap-2 text-[11px] font-bold text-[#0054A6] uppercase tracking-[2px] group/link"
                                    >
                                        {lang === 'ru' ? 'ПОДРОБНЕЕ' : lang === 'uz' ? 'BATAFSIL' : 'READ MORE'}
                                        <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default NewsListPage;