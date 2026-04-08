import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, PhoneCall, ShieldCheck, Info, Signal, Truck, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API, { API_URL } from '../../api/axios';
import { useLanguage } from '../../context/LanguageContext';

// ── Utilities ──
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

// ── Shared design system components ──
const ScanlineOverlay = () => (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
            backgroundSize: '100% 4px'
        }}
    />
);

const HudCorner = ({ position = 'tl', size = 16, color = '#0061A4' }) => {
    const styles = {
        tl: { top: 0, left: 0, borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
        tr: { top: 0, right: 0, borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}` },
        bl: { bottom: 0, left: 0, borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
        br: { bottom: 0, right: 0, borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` },
    };
    return <span style={{ position: 'absolute', width: size, height: size, ...styles[position] }} />;
};

const GlitchText = ({ children, className }) => (
    <span className={cn("relative inline-block", className)}>
        {children}
        <span
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-75"
            style={{ color: '#0061A4', clipPath: 'inset(20% 0 60% 0)', transform: 'translateX(-2px)' }}
            aria-hidden
        >
            {children}
        </span>
    </span>
);

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, lang } = useLanguage();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImg, setActiveImg] = useState(null);
    const [hoveredThumb, setHoveredThumb] = useState(null);

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
        const k = lang === 'ru' ? 'Ru' : lang === 'en' ? 'En' : 'Uz';
        const value = obj[`${field}${k}`];
        if (value) return value;
        return obj[`${field}Ru`] || obj[`${field}Uz`] || '---';
    };

    // Loading
    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4"
            style={{ backgroundColor: '#ffffff', fontFamily: "'Barlow Condensed', sans-serif" }}>
            <ScanlineOverlay />
            <div className="relative w-12 h-12">
                <HudCorner position="tl" size={10} />
                <HudCorner position="tr" size={10} />
                <HudCorner position="bl" size={10} />
                <HudCorner position="br" size={10} />
                <div className="absolute inset-3 border-2 border-t-[#0061A4] border-gray-100 rounded-full animate-spin" />
            </div>
            <p className="text-[9px] tracking-[0.35em] uppercase text-gray-400 font-bold" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                // LOADING_DATA
            </p>
        </div>
    );

    if (!product) return (
        <div className="min-h-screen flex items-center justify-center font-bold text-gray-400"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            MAHSULOT TOPILMADI
        </div>
    );

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
        <div
            className="min-h-screen text-[#1A1C1E]"
            style={{
                backgroundColor: '#ffffff',
                backgroundImage: `radial-gradient(ellipse 100% 60% at 50% -10%, rgba(0,97,164,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 90% 80%, rgba(0,97,164,0.05) 0%, transparent 60%)`,
                fontFamily: "'Barlow Condensed', sans-serif",
            }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700;800;900&family=Share+Tech+Mono&display=swap');
                * { box-sizing: border-box; }
                .mono { font-family: 'Share Tech Mono', monospace; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .grid-bg { background-image: linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px); background-size: 60px 60px; }
                .thumb-btn { transition: all 0.3s cubic-bezier(0.16,1,0.3,1); }
                .thumb-btn:hover { transform: translateY(-2px); }
                .spec-row:hover .spec-key { color: #1A1C1E; }
                .spec-row:hover .spec-val { color: #0061A4; }
            `}</style>

            <ScanlineOverlay />
            <div className="pointer-events-none fixed inset-x-0 z-10 h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />

            {/* ── STICKY SUBNAV ── */}
            <nav className="fixed top-16 left-0 w-full z-40 h-14 flex items-center justify-between px-6 lg:px-16 border-b border-gray-100 backdrop-blur-md bg-white/90">
                <button
                    onClick={() => navigate('/products')}
                    className="flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-[#0061A4] uppercase tracking-widest transition-all group"
                >
                    <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="mono">//</span> {lang === 'ru' ? 'КАТАЛОГ' : 'KATALOG'}
                </button>

                <div className="hidden sm:flex items-center gap-2">
                    <Signal size={10} className="text-blue-500 animate-pulse" />
                    <span className="mono text-[9px] text-gray-300 uppercase tracking-[0.2em]">
                        {getField(product.category, 'title')}
                    </span>
                    <ChevronRight size={10} className="text-gray-200" />
                    <span className="mono text-[9px] text-[#0061A4] uppercase tracking-[0.2em]">
                        {product.brand?.name}
                    </span>
                </div>

                <span className="mono text-[9px] text-gray-300 uppercase tracking-widest hidden lg:block">
                    ID_{product.id?.substring(0, 8)}
                </span>
            </nav>

            {/* ── HERO STRIP ── */}
            <section className="relative overflow-hidden border-b border-gray-100 pt-28 pb-10 px-6 lg:px-16"
                style={{ backgroundColor: '#fcfdfe' }}>
                <div className="absolute inset-0 grid-bg opacity-100" />
                <div className="relative z-10 max-w-[1600px] mx-auto">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-px bg-[#0061A4]" />
                        <span className="mono text-[#0061A4] text-[10px] font-bold uppercase tracking-[0.25em]">
                            {product.brand?.name} — {getField(product.category, 'title')}
                        </span>
                    </div>
                    <h1 className="text-[52px] lg:text-[72px] font-bold uppercase leading-none tracking-tight">
                        <GlitchText>
                            <span className="text-[#1A1C1E]">{getField(product, 'title')}</span>
                        </GlitchText>
                    </h1>

                    <div className="flex items-center gap-8 mt-6 pt-5 border-t border-gray-100">
                        <div className={cn(
                            "flex items-center gap-2 px-4 py-1.5 text-[9px] font-black uppercase tracking-widest border",
                            product.inStock
                                ? "border-green-200 text-green-700 bg-green-50"
                                : "border-red-200 text-red-600 bg-red-50"
                        )}>
                            <span className={cn(
                                "w-1.5 h-1.5 rounded-full",
                                product.inStock ? "bg-green-500 animate-pulse" : "bg-red-400"
                            )} />
                            {product.inStock
                                ? (lang === 'uz' ? 'Mavjud' : 'В наличии')
                                : (lang === 'uz' ? 'Tugagan' : 'Нет в наличии')}
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-blue-500/10 to-transparent" />
                    </div>
                </div>
            </section>

            {/* ── MAIN CONTENT ── */}
            <div className="max-w-[1600px] mx-auto px-6 lg:px-16 py-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* ── IMAGE COLUMN (7 cols) ── */}
                    <div className="lg:col-span-7 space-y-5">

                        {/* Main image card */}
                        <div className="relative overflow-hidden bg-gray-50 border border-gray-100 shadow-sm group">
                            <HudCorner position="tl" size={14} />
                            <HudCorner position="tr" size={14} />
                            <HudCorner position="bl" size={14} />
                            <HudCorner position="br" size={14} />

                            <div className="relative aspect-[4/3] flex items-center justify-center p-8 lg:p-14">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={activeImg}
                                        src={`${API_URL}${activeImg}`}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.02 }}
                                        transition={{ duration: 0.4 }}
                                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                                        alt={getField(product, 'title')}
                                    />
                                </AnimatePresence>
                            </div>

                            {/* Image count badge */}
                            <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-100">
                                <span className="mono text-[9px] text-gray-400 uppercase tracking-widest">
                                    {String(allImages.indexOf(activeImg) + 1).padStart(2, '0')} / {String(allImages.length).padStart(2, '0')}
                                </span>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        {allImages.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                                {allImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImg(img)}
                                        onMouseEnter={() => setHoveredThumb(idx)}
                                        onMouseLeave={() => setHoveredThumb(null)}
                                        className={cn(
                                            "thumb-btn relative w-20 h-16 shrink-0 overflow-hidden border-2 transition-all",
                                            activeImg === img
                                                ? "border-[#0061A4]"
                                                : "border-gray-100 opacity-50 hover:opacity-80"
                                        )}
                                    >
                                        {activeImg === img && (
                                            <>
                                                <HudCorner position="tl" size={5} color="#0061A4" />
                                                <HudCorner position="br" size={5} color="#0061A4" />
                                            </>
                                        )}
                                        <img
                                            src={`${API_URL}${img}`}
                                            className="w-full h-full object-cover"
                                            alt=""
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Description block */}
                        <div className="relative overflow-hidden border border-gray-100 p-8 lg:p-10 bg-white">
                            <HudCorner position="tl" size={10} />
                            <HudCorner position="br" size={10} />
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-4 h-px bg-[#0061A4]" />
                                <span className="mono text-gray-400 text-[10px] tracking-[0.3em] uppercase">
                                    // {lang === 'uz' ? 'Mahsulot haqida' : lang === 'ru' ? 'Описание' : 'Description'}
                                </span>
                            </div>
                            <p className="text-gray-500 text-lg leading-relaxed font-medium whitespace-pre-wrap">
                                {getField(product, 'content')}
                            </p>
                        </div>

                        {/* Banner image */}
                        {product.bannerImage && (
                            <div className="relative overflow-hidden border border-gray-100">
                                <HudCorner position="tl" size={12} />
                                <HudCorner position="br" size={12} />
                                <img
                                    src={`${API_URL}${product.bannerImage}`}
                                    className="w-full aspect-[21/9] object-cover"
                                    alt="Banner"
                                />
                            </div>
                        )}
                    </div>

                    {/* ── INFO COLUMN (5 cols) ── */}
                    <div className="lg:col-span-5 sticky top-32 space-y-6">

                        {/* Quick specs grid */}
                        {product.techSpecs?.length > 0 && (
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-4 h-px bg-[#0061A4]" />
                                    <span className="mono text-gray-400 text-[10px] tracking-[0.3em] uppercase">// SPEC_OVERVIEW</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {product.techSpecs.slice(0, 4).map((spec, i) => (
                                        <div
                                            key={i}
                                            className="relative p-4 bg-gray-50 border border-gray-100 group hover:border-blue-500/30 hover:bg-blue-50/30 transition-all duration-300"
                                        >
                                            <HudCorner position="tl" size={7} color="transparent" />
                                            <p className="text-gray-600 text-[9px] tracking-widest uppercase mb-1.5 leading-tight">
                                                {getField(spec, 'key')}
                                            </p>
                                            <p className="text-[#1A1C1E] font-bold text-[15px] uppercase tracking-tight leading-tight">
                                                {getField(spec, 'val')}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Price & CTA */}
                        <div className="relative overflow-hidden border border-gray-100 bg-white p-8"
                            style={{ background: 'linear-gradient(135deg, rgba(0,97,164,0.04) 0%, rgba(255,255,255,1) 60%)' }}>
                            <HudCorner position="tl" size={12} />
                            <HudCorner position="tr" size={12} />
                            <HudCorner position="bl" size={12} />
                            <HudCorner position="br" size={12} />

                            <div className="relative z-10 space-y-6">
                                <div>
                                    <p className="mono text-gray-400 text-[9px] tracking-widest uppercase font-bold mb-1">
                                        {t('price')}
                                    </p>
                                    <p className="text-3xl font-bold text-slate-900 tracking-tighter italic">
                                        {product.price
                                            ? `${product.price} ${lang === 'ru' ? 'сум' : "so'm"}`
                                            : t('call_price')}
                                    </p>
                                </div>

                                <button
                                    onClick={() => navigate('/contacts')}
                                    className="relative w-full flex items-center justify-center gap-3 py-5 bg-[#0061A4] text-white font-bold text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-[0.99]"
                                >
                                    <HudCorner position="tl" size={7} color="rgba(255,255,255,0.3)" />
                                    <HudCorner position="br" size={7} color="rgba(255,255,255,0.3)" />
                                    <PhoneCall size={14} /> {t('contact_us')}
                                    <ArrowUpRight size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Advantages */}
                        {product.advantages?.length > 0 && (
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-4 h-px bg-[#0061A4]" />
                                    <span className="mono text-gray-400 text-[10px] tracking-[0.3em] uppercase">// ADVANTAGES</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {product.advantages.map((adv) => (
                                        <div
                                            key={adv.id}
                                            className="relative flex items-center gap-3 px-4 py-3 bg-white border border-gray-100 hover:border-blue-500/30 hover:bg-blue-50/20 transition-all duration-300 group"
                                        >
                                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#0061A4] opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {adv.icon ? (
                                                <img
                                                    src={`${API_URL}${adv.icon}`}
                                                    className="w-6 h-6 object-contain shrink-0 grayscale grayscale-0 transition-all"
                                                    alt=""
                                                />
                                            ) : (
                                                <ShieldCheck size={16} className="text-gray-300 group-hover:text-[#0061A4] transition-colors shrink-0" />
                                            )}
                                            <span className=" text-[10px] font-bold text-gray-700 group-hover:text-[#1A1C1E] uppercase leading-tight tracking-wide transition-colors line-clamp-2">
                                                {getField(adv, 'title')}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Contact sidebar card */}
                        <div className="relative overflow-hidden p-6"
                            style={{ background: 'linear-gradient(135deg, rgba(0,97,164,0.1) 0%, rgba(255,255,255,1) 100%)', border: '1px solid #E5E7EB' }}>
                            <HudCorner position="tl" size={10} />
                            <HudCorner position="br" size={10} />
                            <div className="relative z-10">
                                <div className="w-9 h-9 flex items-center justify-center border border-blue-100 mb-4 text-[#0061A4]">
                                    <Truck size={18} />
                                </div>
                                <h4 className="text-base font-black uppercase leading-tight text-[#1A1C1E] mb-2">
                                    {t('custom_solution_title')}
                                </h4>
                                <p className="text-gray-400 text-xs leading-relaxed mb-4 font-medium">
                                    {t('custom_solution_desc')}
                                </p>
                                <button
                                    onClick={() => navigate('/contacts')}
                                    className="w-full py-3 bg-[#0061A4] text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                                >
                                    {t('contact_us')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── TECH SPECS SECTIONS ── */}
                {specSections.length > 0 && (
                    <div className="mt-24 pt-16 border-t border-gray-100">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-px bg-[#0061A4]" />
                                    <span className="mono text-[#0061A4] text-[10px] font-bold uppercase tracking-[0.25em]">
                                        // TECH_SPECS
                                    </span>
                                    <Signal size={12} className="text-blue-500 animate-pulse" />
                                </div>
                                <h2 className="text-[42px] lg:text-[56px] font-bold uppercase leading-none tracking-tight">
                                    <span className="text-[#1A1C1E]">
                                        {lang === 'uz' ? 'Texnik' : lang === 'ru' ? 'Технические' : 'Technical'}
                                    </span>
                                    <br />
                                    <span className="text-transparent" style={{ WebkitTextStroke: '1px #E5E7EB' }}>
                                        {lang === 'uz' ? 'TAVSIF' : lang === 'ru' ? 'ХАРАКТЕРИСТИКИ' : 'SPECS'}
                                    </span>
                                </h2>
                            </div>
                            <span className="mono text-[#0061A4] text-2xl font-bold">
                                {String(specSections.length).padStart(2, '0')}
                                <span className="text-gray-300 text-base"> / {lang === 'uz' ? 'bo\'lim' : 'секций'}</span>
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                            {specSections.map((section, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.07 }}
                                    className="relative overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500"
                                >
                                    <HudCorner position="tl" size={10} />
                                    <HudCorner position="br" size={10} />

                                    {/* Section header */}
                                    <div className="px-8 py-5 border-b border-gray-50 flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 bg-[#0061A4] rounded-full" />
                                        <h3 className=" text-[#0061A4] text-[14px] font-bold uppercase tracking-widest">
                                            {section.title}
                                        </h3>
                                    </div>

                                    {/* Spec rows */}
                                    <div className="px-8 py-4 space-y-0">
                                        {section.specs.map((spec, si) => (
                                            <div
                                                key={spec.id}
                                                className={cn(
                                                    "spec-row flex justify-between items-end py-3.5 transition-all duration-200",
                                                    si < section.specs.length - 1 ? "border-b border-gray-50" : ""
                                                )}
                                            >
                                                <span className="spec-key  text-gray-800 text-[11px] uppercase transition-colors duration-200">
                                                    {getField(spec, 'key')}
                                                </span>
                                                <span className="spec-val text-[#1A1C1E] font-bold text-[12px] uppercase  text-right transition-colors duration-200">
                                                    {getField(spec, 'val')}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* ── FOOTER CTA ── */}
            <section className="mt-24 relative overflow-hidden"
                style={{ backgroundColor: '#0061A4' }}>
                <div className="absolute inset-0 grid-bg opacity-[0.07]" />
                <div className="absolute inset-0"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)', backgroundSize: '100% 4px' }} />

                <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-16 py-20">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-px bg-white/40" />
                                <span className="mono text-white/40 text-[10px] font-bold uppercase tracking-[0.25em]">
                                    // GET_IN_TOUCH
                                </span>
                            </div>
                            <h2 className="text-[42px] lg:text-[60px] font-bold uppercase leading-none tracking-tight text-white">
                                {lang === 'ru' ? 'ЗАИНТЕРЕСОВАНЫ?' : "QIZIQTIRDIMi?"}
                            </h2>
                            <p className="text-blue-100/60 text-base font-medium mt-3 max-w-md">
                                {lang === 'ru'
                                    ? 'Наши менеджеры ответят на все ваши вопросы.'
                                    : "Menejerlarimiz sizga barcha savollaringiz bo'yicha yordam berishadi."}
                            </p>
                        </div>

                        <button
                            onClick={() => navigate('/contacts')}
                            className="relative flex items-center gap-3 px-12 py-6 bg-white text-[#0061A4] font-bold text-[11px] uppercase tracking-widest hover:bg-blue-50 transition-all shadow-2xl active:scale-[0.98]"
                        >
                            <HudCorner position="tl" size={8} color="#0061A4" />
                            <HudCorner position="br" size={8} color="#0061A4" />
                            <PhoneCall size={15} />
                            {lang === 'ru' ? 'ЗАКАЗАТЬ ЗВОНОК' : "BOG'LANISH"}
                            <ArrowUpRight size={14} />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductDetailPage;