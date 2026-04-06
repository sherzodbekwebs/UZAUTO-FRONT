import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Eye, ChevronLeft, Share2, Check } from 'lucide-react';
import { newsData } from '../newsData/newsData';

const NewsDetailPage = ({ lang }) => {
    const { id } = useParams();
    const post = newsData.find(n => n.id === parseInt(id));
    const [copied, setCopied] = React.useState(false);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    if (!post) return <div className="py-40 text-center font-bold text-2xl text-[#1a2e44]">Yangilik topilmadi</div>;

    // ULASHISH FUNKSIYASI
    const handleShare = async () => {
        const shareData = {
            title: post[lang].title,
            text: post[lang].desc,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Agar navigator.share ishlamasa, linkni copy qiladi
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="pt-32 pb-20 bg-white font-inter">
            <div className="max-w-[1000px] mx-auto px-6 lg:px-8">

                {/* 1. ORQAGA QAYTISH */}
                <Link
                    to="/#news-section"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-[#0054A6] mb-12 transition-all font-semibold uppercase text-[11px] tracking-[2px] group"
                >
                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    {lang === 'ru' ? 'Назад к списку' : 'Ro\'yxatga qaytish'}
                </Link>

                {/* 2. ASOSIY RASM - rounded-2xl va border-4 qilingan */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-12 border-4 border-gray-50">
                    <img
                        src={post.image}
                        className="w-full h-[300px] md:h-[500px] object-cover"
                        alt={post[lang].title}
                    />
                </div>

                {/* 3. META DATA VA SHARE */}
                <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-8">
                    <div className="flex items-center gap-6 text-gray-400 font-medium uppercase text-[11px] tracking-wider">
                        <span className="flex items-center gap-2">
                            <Calendar size={16} className="text-[#0054A6]" /> {post.date}
                        </span>
                        <span className="flex items-center gap-2">
                            <Eye size={16} className="text-[#0054A6]" /> {post.views}
                        </span>
                    </div>

                    {/* SHARE TUGMASI */}
                    <button
                        onClick={handleShare}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-[#0054A6] hover:text-white rounded-full text-gray-500 transition-all duration-300 cursor-pointer text-xs font-bold uppercase tracking-widest"
                    >
                        {copied ? <Check size={16} /> : <Share2 size={16} />}
                        <span>{copied ? (lang === 'ru' ? 'Копировано' : 'Nusxalandi') : (lang === 'ru' ? 'Поделиться' : 'Ulashish')}</span>
                    </button>
                </div>

                {/* 4. SARLAVHA - font-semibold qilingan, italic olib tashlangan */}
                <h1 className="text-3xl lg:text-5xl font-semibold text-[#1a2e44] mb-10 leading-tight tracking-tight">
                    {post[lang].title}
                </h1>

                {/* 5. MATN QISMI */}
                <div className="text-gray-600 text-lg lg:text-xl leading-relaxed space-y-8 font-normal">
                    <p className="">
                        {post[lang].content}
                    </p>
                    <p>
                        UzAuto Trailer kompaniyasi o'z faoliyatini kengaytirishda davom etmoqda va 2026-yilda yangi
                        strategik maqsadlarni amalga oshirishni rejalashtirmoqda. Bu loyihalar nafaqat O'zbekiston,
                        balki butun Markaziy Osiyo bozorida bizning o'rnimizni mustahkamlaydi.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NewsDetailPage;