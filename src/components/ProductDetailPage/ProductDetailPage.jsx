import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, PhoneCall, Cpu, ShieldCheck, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API, { API_URL } from '../../api/axios';
import { useLanguage } from '../../context/LanguageContext';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, lang } = useLanguage();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImg, setActiveImg] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await API.get(`/products/${id}`);
                setProduct(res.data);
                setActiveImg(res.data.image);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const getField = (obj, field) => {
        if (!obj) return '---';
        const langKey = lang.charAt(0).toUpperCase() + lang.slice(1);
        return obj[`${field}${langKey}`] || obj[`${field}Ru`] || '---';
    };

    if (loading) return (
        <div className="h-screen flex flex-col items-center justify-center bg-white gap-3">
            <div className="w-10 h-10 border-4 border-gray-100 border-t-[#0061A4] rounded-full animate-spin" />
            <p className="text-[9px] tracking-[0.3em] uppercase text-gray-400 font-bold">Yuklanmoqda...</p>
        </div>
    );

    if (!product) return <div className="h-screen flex items-center justify-center font-bold text-gray-400">Mahsulot topilmadi</div>;

    const allImages = [product.image, ...(product.gallery || [])];
    const groupedSpecs = product.techSpecs?.reduce((acc, spec) => {
        const sid = spec.sectionId;
        const stitle = getField(spec.section, 'title');
        if (!acc[sid]) acc[sid] = { title: stitle, specs: [] };
        acc[sid].specs.push(spec);
        return acc;
    }, {});
    const specSections = groupedSpecs ? Object.values(groupedSpecs) : [];

    return (
        <div className="bg-white text-[#1A1C1E] min-h-screen font-inter pt-16">

            {/* ─── STICKY SUB-NAV ─── */}
            <nav className="fixed top-16 left-0 w-full z-40 h-14 flex items-center justify-between px-6 lg:px-12 border-b border-gray-50 backdrop-blur-md bg-white/90">
                <button
                    onClick={() => navigate('/products')}
                    className="flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-[#0061A4] uppercase tracking-widest transition-all group"
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    {lang === 'ru' ? 'КАТАЛОГ' : 'KATALOG'}
                </button>
                <div className="hidden sm:flex items-center gap-2 text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">
                    <span>{getField(product.category, 'title')}</span>
                    <ChevronRight size={10} />
                    <span className="text-[#0061A4]">{product.brand?.name}</span>
                </div>
            </nav>

            {/* ─── MAIN CONTENT ─── */}
            <div className="max-w-[1440px] mx-auto px-4 lg:px-12 pt-24">
                {/* 🛠 LAYOUT O'ZGARDI: lg:grid-cols-12 (7:5 nisbat) rasm kattaroq ko'rinishi uchun */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* IMAGE SECTION (7 col) */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-xl group">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeImg}
                                    src={`${API_URL}${activeImg}`}
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 w-full h-full object-contain p-4"
                                />
                            </AnimatePresence>

                            <div className="absolute top-6 left-6">
                                <div className={`px-4 py-1.5 rounded-full bg-white/90 shadow-sm border text-[9px] font-black uppercase tracking-widest ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                                    {product.inStock ? (lang === 'uz' ? 'Mavjud' : 'В наличии') : 'Tugagan'}
                                </div>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {allImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImg(img)}
                                    className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${activeImg === img ? 'border-[#0061A4] scale-95 shadow-md' : 'border-transparent opacity-60'}`}
                                >
                                    <img src={`${API_URL}${img}`} className="w-full h-full object-cover" alt="" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* INFO SECTION (5 col) */}
                    <div className="lg:col-span-5 space-y-8 py-4">
                        <div className="space-y-3">
                            <p className="text-[#0061A4] text-[11px] font-black uppercase tracking-[0.3em]">{product.brand?.name}</p>
                            <h1 className="text-3xl lg:text-4xl font-black uppercase leading-tight tracking-tight text-gray-900">
                                {getField(product, 'title')}
                            </h1>
                        </div>

                        {/* Chips Specs */}
                        <div className="grid grid-cols-2 gap-3">
                            {product.techSpecs?.slice(0, 4).map((spec, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{getField(spec, 'key')}</p>
                                    <p className="text-sm font-bold text-gray-800">{getField(spec, 'val')}</p>
                                </div>
                            ))}
                        </div>

                        {/* Price & Call */}
                        <div className="p-8 bg-[#F8F9FA] rounded-3xl space-y-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Narxi / Цена</span>
                                <span className="text-2xl font-black text-[#0061A4]">{product.price || '---'}</span>
                            </div>
                            <button className="w-full py-4 bg-[#1A1C1E] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0061A4] transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-gray-200">
                                <PhoneCall size={16} /> {lang === 'ru' ? 'СВЯЗАТЬСЯ С НАМИ' : "BOG'LANISH"}
                            </button>
                        </div>

                        {/* 🛠 YANGILANGAN: Afzalliklar (Hamma bir xil width/height) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {product.advantages?.map(adv => (
                                <div 
                                    key={adv.id} 
                                    className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm h-14 hover:border-blue-200 transition-colors"
                                >
                                    {adv.icon ? (
                                        <img src={`${API_URL}${adv.icon}`} className="w-7 h-7 object-contain shrink-0" alt="" />
                                    ) : (
                                        <ShieldCheck size={20} className="text-blue-500 shrink-0" />
                                    )}
                                    <span className="text-[9px] font-bold text-gray-700 uppercase leading-tight line-clamp-2">
                                        {adv.titleRu}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ─── DESCRIPTION ─── */}
                <div className="mt-24 pt-16 border-t border-gray-100">
                    <div className="grid lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-4 space-y-4">
                            <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                                <Info size={20} className="text-[#0061A4]" /> {lang === 'uz' ? 'Mahsulot haqida' : 'Описание'}
                            </h2>
                            <div className="w-16 h-1 bg-[#0061A4] rounded-full" />
                        </div>
                        <div className="lg:col-span-8 text-gray-500 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                            {getField(product, 'content')}
                        </div>
                    </div>
                </div>

                {/* ─── BANNER ─── */}
                {product.bannerImage && (
                    <div className="mt-24 rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-white ring-1 ring-gray-100">
                        <img src={`${API_URL}${product.bannerImage}`} className="w-full aspect-[21/9] object-cover" alt="Banner" />
                    </div>
                )}

                {/* ─── TECH SPECS ─── */}
                {specSections.length > 0 && (
                    <div className="mt-32 space-y-16">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-gray-900">{lang === 'uz' ? 'Texnik tavsif' : 'Характеристики'}</h2>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">Detailed Specification</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            {specSections.map((section, idx) => (
                                <div key={idx} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                                    <h3 className="text-sm font-black text-[#0061A4] uppercase tracking-widest mb-6 pb-3 border-b-2 border-blue-50 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-[#0061A4] rounded-full" />
                                        {section.title}
                                    </h3>
                                    <div className="space-y-4">
                                        {section.specs.map(spec => (
                                            <div key={spec.id} className="flex justify-between items-end py-1 border-b border-gray-50 last:border-0 group">
                                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-900 transition-colors">{getField(spec, 'key')}</span>
                                                <span className="text-xs font-bold text-gray-800 text-right">{getField(spec, 'val')}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* ─── FOOTER CTA ─── */}
            <section className="mt-32 bg-[#0061A4] py-16 px-6 text-center text-white min-[1440px]:rounded-t-[5rem]">
                <div className="max-w-2xl mx-auto space-y-4">
                    <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tight">{lang === 'ru' ? 'Заинтересованы?' : 'Qiziqtirdimi?'}</h2>
                    <p className="text-blue-100/70 text-sm font-medium">Menejerlarimiz sizga barcha savollaringiz bo'yicha yordam berishadi.</p>
                    <button className="mt-4 px-8 py-4 bg-white text-[#0061A4] rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto">
                        <PhoneCall size={14} /> {lang === 'ru' ? 'ЗАКАЗАТЬ ЗВОНОК' : 'BOG\'LANISH'}
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ProductDetailPage;