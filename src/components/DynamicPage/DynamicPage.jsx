import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import API from '../../Api/axios'; // Markaziy API importi

const DynamicPage = ({ lang, slug: propSlug }) => { // <-- propSlug ni qabul qilamiz
    const { slug: paramSlug } = useParams();
    const slug = propSlug || paramSlug; // Agar prop bo'lsa propni, bo'lmasa URL parametridan oladi

    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Endi faqat endpointni yozasiz, localhost shart emas
        API.get(`/pages/slug/${slug}`)
            .then(res => {
                setContent(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [slug]);

    if (loading) return <div className="p-20 text-center text-gray-500 italic">Yuklanmoqda...</div>;

    if (!content) return (
        <div className="p-20 text-center">
            <h2 className="text-2xl text-red-500 font-bold">Sahifa topilmadi!</h2>
            <p className="text-gray-500">Slug: {slug}</p>
        </div>
    );

    // Tilga mos maydonlarni tanlash
    const langSuffix = lang.charAt(0).toUpperCase() + lang.slice(1); // 'ru' -> 'Ru'
    const title = content[`title${langSuffix}`];
    const body = content[`content${langSuffix}`];

    return (
        <div className="max-w-[1200px] mx-auto px-6 py-12 lg:py-24 min-h-[60vh]">
            {/* Sarlavha: text-white o'rniga text-[#1a2e44] (to'q ko'k) qildik */}
            <h1 className="text-3xl lg:text-5xl font-black text-[#1a2e44] mb-8 border-b-2 border-blue-600 pb-6 italic uppercase tracking-tighter">
                {title}
            </h1>

            {/* HTML Kontent: text-gray-700 qildik, shunda oq fonda yaxshi ko'rinadi */}
            <div
                className="dynamic-content prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: body }}
            />
        </div>
    );
};

export default DynamicPage;