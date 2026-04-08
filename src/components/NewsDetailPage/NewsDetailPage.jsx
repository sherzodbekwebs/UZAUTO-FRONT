import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Eye, ChevronLeft, Share2, Check, Loader2 } from 'lucide-react';
import API, { API_URL } from '../../api/axios';

const NewsDetailPage = ({ lang }) => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        // 🚀 MA'LUMOTNI OLISH VA KO'RISHLARNI OSHIRISH
        const fetchNews = async () => {
            try {
                const res = await API.get(`/news/${id}`);
                setPost(res.data);
                // Ko'rishlar sonini oshirish (Optional)
                await API.patch(`/news/${id}/views`);
            } catch (err) { console.error(err); }
        };
        fetchNews();
    }, [id]);

    if (!post) return <div className="py-40 text-center"><Loader2 className="animate-spin mx-auto text-blue-600" size={40} /></div>;

    const getField = (field) => {
        const k = lang.charAt(0).toUpperCase() + lang.slice(1);
        return post[`${field}${k}`] || post[`${field}Ru`] || "---";
    };

    const handleShare = async () => {
        const shareData = { title: getField('title'), url: window.location.href };
        if (navigator.share) {
            try { await navigator.share(shareData); } catch (err) { console.log(err); }
        } else {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="pt-14 pb-20 bg-white font-inter">
            <div className="max-w-[1000px] mx-auto px-6 lg:px-8 text-[#1a2e44]">
                <Link to="/news" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#0054A6] mb-12 transition-all font-semibold uppercase text-[11px] tracking-[2px] group">
                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    {lang === 'ru' ? 'Назад к списку' : 'Рўйхатга қайтиш'}
                </Link>

                <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-12 border-4 border-gray-50">
                    <img src={`${API_URL}${post.image}`} className="w-full h-[300px] md:h-[500px] object-cover" alt="" />
                </div>

                <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-8">
                    <div className="flex items-center gap-6 text-gray-400 font-medium uppercase text-[11px] tracking-wider">
                        <span className="flex items-center gap-2"><Calendar size={16} className="text-[#0054A6]" /> {post.date}</span>
                        <span className="flex items-center gap-2"><Eye size={16} className="text-[#0054A6]" /> {post.views}</span>
                    </div>
                    <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-[#0054A6] hover:text-white rounded-full text-gray-500 transition-all duration-300 text-xs font-bold uppercase tracking-widest cursor-pointer">
                        {copied ? <Check size={16} /> : <Share2 size={16} />}
                        <span>{copied ? (lang === 'ru' ? 'Копировано' : 'Нусхаланди') : (lang === 'ru' ? 'Поделиться' : 'Улашиш')}</span>
                    </button>
                </div>

                <h1 className="text-3xl lg:text-5xl font-semibold mb-10 leading-tight tracking-tight">
                    {getField('title')}
                </h1>

                <div className="text-gray-600 text-lg lg:text-xl leading-relaxed space-y-8 font-normal whitespace-pre-wrap">
                    {getField('content')}
                </div>
            </div>
        </div>
    );
};

export default NewsDetailPage;