import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Eye, ArrowRight, ChevronLeft } from 'lucide-react';
import API, { API_URL } from '../../api/axios';

const NewsListPage = ({ lang }) => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        API.get('/news?active=true').then(res => setNews(res.data));
    }, []);

    const getField = (item, field) => {
        const k = lang.charAt(0).toUpperCase() + lang.slice(1);
        return item[`${field}${k}`] || item[`${field}Ru`] || "---";
    };

    return (
        <div className="pt-12 pb-20 bg-[#F8FAFC] min-h-screen font-inter">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <div className="mb-10">
                    <Link to="/#news-section" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#0054A6] transition-all font-medium uppercase text-[11px] tracking-[2px] group">
                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        {lang === 'ru' ? 'Назад на главную' : 'Асосий саҳифага қайтиш'}
                    </Link>
                </div>

                <div className="text-center mb-16">
                    <h1 className="text-4xl lg:text-5xl font-semibold text-[#1a2e44] tracking-tight">
                        {lang === 'ru' ? 'Все новости' : lang === 'uz' ? 'Барча янгиликлар' : 'All news'}
                    </h1>
                    <div className="w-16 h-1 bg-[#0054A6] mx-auto mt-6 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {news.map((item) => (
                        <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group">
                            <Link to={`/news/${item.id}`} className="relative h-60 overflow-hidden block">
                                <img src={`${API_URL}${item.image}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                            </Link>
                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex items-center gap-4 text-gray-400 text-[11px] font-medium mb-4 uppercase tracking-wider">
                                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[#0054A6]" /> {item.date}</span>
                                    <span className="flex items-center gap-1.5"><Eye size={14} className="text-[#0054A6]" /> {item.views}</span>
                                </div>
                                <Link to={`/news/${item.id}`}>
                                    <h3 className="text-xl font-semibold text-[#1a2e44] mb-4 hover:text-[#0054A6] transition-colors line-clamp-2 leading-snug">{getField(item, 'title')}</h3>
                                </Link>
                                {/* Tavsif yo'q bo'lsa contentdan qisqartirib oladi */}
                                <p className="text-gray-500 text-[14px] mb-8 line-clamp-3 leading-relaxed font-normal">
                                    {getField(item, 'content').substring(0, 150)}...
                                </p>
                                <Link to={`/news/${item.id}`} className="mt-auto inline-flex items-center gap-2 text-[11px] font-bold text-[#0054A6] uppercase tracking-[2px] group/link">
                                    {lang === 'ru' ? 'ПОДРОБНЕЕ' : 'БАТАФСИЛ'}
                                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsListPage;