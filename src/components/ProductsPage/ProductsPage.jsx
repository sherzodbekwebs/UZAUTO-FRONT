import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
    ChevronRight, ArrowUpRight, Loader2, Box,
    Zap, Gauge, Weight, Truck, Filter, X,
    ChevronDown, ArrowRight, Signal, LayoutGrid, CheckCircle2
} from 'lucide-react';
import API, { API_URL } from '../../api/axios';
import { useLanguage } from '../../context/LanguageContext';

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

// ── Scanline overlay ──
const ScanlineOverlay = () => (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)', backgroundSize: '100% 4px' }}
    />
);

// ── HUD corner ──
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
        <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-75"
            style={{ color: '#0061A4', clipPath: 'inset(20% 0 60% 0)', transform: 'translateX(-2px)' }} aria-hidden >
            {children}
        </span>
    </span>
);

const CountBadge = ({ count }) => (
    <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-sm bg-blue-500/10 text-[#0061A4] text-[10px] font-mono font-bold border border-blue-500/20">
        {String(count).padStart(2, '0')}
    </span>
);

const ProductsPage = () => {
    // 🌍 T va LANGNI CHAQUV
    const { t, lang } = useLanguage();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredId, setHoveredId] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const activeCategory = searchParams.get('category') || 'all';
    const activeBrand = searchParams.get('brand') || 'all';

    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.2]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [pRes, cRes, bRes] = await Promise.all([
                    API.get('/products'),
                    API.get('/categories'),
                    API.get('/brands'),
                ]);
                setProducts(pRes.data);
                setCategories(cRes.data);
                setBrands(bRes.data);
            } catch (err) {
                console.error("Xatolik:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredProducts = products.filter((p) => {
        const catMatch = activeCategory === 'all' || p.categoryId === activeCategory;
        const brandMatch = activeBrand === 'all' || p.brandId === activeBrand;
        const isActiveMatch = p.isActive === true; 
        return catMatch && brandMatch && isActiveMatch;
    });

    // 🛠️ BACKEND DATASINI TILLARGA QARAB OLISH (Xatolarsiz)
    const getField = (item, field) => {
        if (!item) return '---';
        const k = lang === 'ru' ? 'Ru' : lang === 'en' ? 'En' : 'Uz';
        const value = item[`${field}${k}`];
        if (value) return value;
        return item[`${field}Ru`] || item[`${field}Uz`] || '---';
    };

    return (
        <div className="min-h-screen text-[#1A1C1E] font-['Barlow_Condensed',_sans-serif]"
            style={{ backgroundColor: '#ffffff', backgroundImage: `radial-gradient(ellipse 100% 60% at 50% -10%, rgba(0,97,164,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 90% 80%, rgba(0,97,164,0.05) 0%, transparent 60%)` }}>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700;800;900&family=Share+Tech+Mono&display=swap');
                * { box-sizing: border-box; }
                .mono { font-family: 'Share Tech Mono', monospace; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .product-card { transition: all 0.5s cubic-bezier(0.16,1,0.3,1); }
                .product-card:hover { transform: translateY(-4px); }
                .grid-bg { background-image: linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px); background-size: 60px 60px; }
            `}</style>

            <ScanlineOverlay />
            <div className="scan-line pointer-events-none fixed inset-x-0 z-10 h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />

            <section ref={heroRef} className="relative overflow-hidden border-b border-gray-100" style={{ minHeight: 340, backgroundColor: '#fcfdfe' }}>
                <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 grid-bg opacity-100" />
                
                <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-16 pt-20 pb-14">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-px bg-[#0061A4]" />
                                <span className="mono text-[#0061A4] text-[10px] font-bold uppercase tracking-[0.25em]">UzAuto Trailer — Fleet Catalog</span>
                                <Signal size={12} className="text-blue-500 animate-pulse" />
                            </div>
                            <h1 className="text-[64px] lg:text-[92px] font-bold uppercase leading-none tracking-tight">
                                <GlitchText><span className="text-[#1A1C1E]">{t('products')}</span></GlitchText>
                                <br />
                                <span className="text-transparent" style={{ WebkitTextStroke: '1px #E5E7EB' }}>&amp; FLEET</span>
                            </h1>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="mono text-gray-400 text-[10px] tracking-widest uppercase mb-1">// FILTER_BRAND</span>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setSearchParams({ category: activeCategory, brand: 'all' })}
                                    className={cn("relative px-6 py-3 text-[11px] font-bold uppercase tracking-widest transition-all duration-300", activeBrand === 'all' ? "text-white bg-[#0061A4]" : "text-gray-400 border border-gray-100 hover:border-blue-500/40 hover:text-[#0061A4]")}>
                                    {activeBrand === 'all' && <><HudCorner position="tl" color="#fff" size={6} /><HudCorner position="br" color="#fff" size={6} /></>}
                                    {t('all').toUpperCase()}
                                </button>
                                {brands.map((b) => (
                                    <button key={b.id} onClick={() => setSearchParams({ category: activeCategory, brand: b.id })}
                                        className={cn("relative px-6 py-3 text-[11px] font-bold uppercase tracking-widest transition-all duration-300", activeBrand === b.id ? "text-white bg-[#0061A4]" : "text-gray-400 border border-gray-100 hover:border-blue-500/40 hover:text-[#0061A4]")}>
                                        {b.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-8 mt-10 pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <span className="mono text-[#0061A4] text-2xl font-bold">{String(filteredProducts.length).padStart(2, '0')}</span>
                            <span className="text-gray-400 text-xs uppercase tracking-widest">{t('units_found')}</span>
                        </div>
                        <div className="w-px h-6 bg-gray-100" />
                        <div className="flex items-center gap-2">
                            <span className="mono text-gray-400 text-2xl font-bold">{String(categories.length).padStart(2, '0')}</span>
                            <span className="text-gray-400 text-xs uppercase tracking-widest">{t('categories_label')}</span>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-blue-500/10 to-transparent" />
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-[#0061A4] text-xs uppercase tracking-widest hover:bg-blue-50 transition-all">
                            <Filter size={14} /> {t('filters')}
                        </button>
                    </div>
                </div>
            </section>

            <div className="max-w-[1600px] mx-auto px-6 lg:px-16 py-14">
                <div className="flex gap-12 items-start">
                    <aside className={cn("lg:w-[320px] shrink-0 sticky top-6 z-50 lg:border-r lg:border-gray-100 lg:pr-12", sidebarOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full")}>
                        <div className="flex items-center justify-between mb-6 py-4 border-y border-gray-50">
                            <div className="w-4 h-px bg-blue-500" />
                            <span className="mono text-gray-400 text-[10px] tracking-[0.3em] uppercase">// {t('categories_label').toUpperCase()}</span>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <button onClick={() => { setSearchParams({ category: 'all', brand: activeBrand }); setSidebarOpen(false); }}
                                className={cn("cat-btn relative group flex items-center justify-between px-4 py-3.5 text-left", activeCategory === 'all' ? "text-[#1A1C1E]" : "text-gray-400 hover:text-black")}>
                                {activeCategory === 'all' && <motion.div layoutId="activeBar" className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#0061A4]" />}
                                <div className={cn("absolute inset-0 transition-all duration-300", activeCategory === 'all' ? "bg-blue-50/50" : "group-hover:bg-gray-50")} />
                                <div className="relative flex items-center gap-4">
                                    <div className={cn("w-9 h-9 flex items-center justify-center border transition-all duration-300", activeCategory === 'all' ? "border-blue-500/50 text-[#0061A4]" : "border-gray-100")}>
                                        <Box size={16} />
                                    </div>
                                    <span className="text-[13px] font-bold uppercase tracking-wider">{t('all_models')}</span>
                                </div>
                                <div className="relative"><CountBadge count={products.length} /></div>
                            </button>

                            {categories.map((cat) => {
                                const count = products.filter(p => p.categoryId === cat.id).length;
                                const isActive = activeCategory === cat.id;
                                return (
                                    <button key={cat.id} onClick={() => { setSearchParams({ category: cat.id, brand: activeBrand }); setSidebarOpen(false); }}
                                        className={cn("cat-btn relative group flex items-center justify-between px-4 py-3.5 text-left", isActive ? "text-[#1A1C1E]" : "text-gray-400 hover:text-black")}>
                                        {isActive && <motion.div layoutId="activeBar" className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#0061A4]" />}
                                        <div className={cn("absolute inset-0 transition-all duration-300", isActive ? "bg-blue-50/50" : "group-hover:bg-gray-50")} />
                                        <div className="relative flex items-center gap-4 min-w-0">
                                            <div className={cn("w-9 h-9 flex items-center justify-center border transition-all duration-300 shrink-0 p-1.5", isActive ? "border-blue-500/50 bg-blue-50" : "border-gray-100")}>
                                                {cat.icon ? <img src={`${API_URL}${cat.icon}`} className={cn("w-full h-full object-contain", isActive ? "" : "grayscale opacity-30")} alt="" /> : <Box size={16} />}
                                            </div>
                                            <span className="text-[12px] font-bold uppercase tracking-wider truncate leading-tight">{getField(cat, 'title')}</span>
                                        </div>
                                        <div className="relative"><CountBadge count={count} /></div>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-10 relative overflow-hidden p-6" style={{ background: 'linear-gradient(135deg, rgba(0,97,164,0.1) 0%, rgba(255,255,255,1) 100%)', border: '1px solid #E5E7EB' }}>
                            <HudCorner position="tl" size={10} />
                            <HudCorner position="br" size={10} />
                            <div className="relative z-10">
                                <div className="w-10 h-10 flex items-center justify-center border border-blue-100 mb-4 text-[#0061A4]"><Truck size={20} /></div>
                                <h4 className="text-lg font-black uppercase leading-tight text-[#1A1C1E] mb-3">{t('custom_solution_title')}</h4>
                                <p className="text-gray-400 text-xs leading-relaxed mb-5 font-medium">{t('custom_solution_desc')}</p>
                                <button onClick={() => navigate('/contacts')} className="w-full py-3 bg-[#0061A4] text-white text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-200">{t('contact_us')}</button>
                            </div>
                        </div>
                    </aside>

                    <main className="flex-1 min-w-0">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-40 gap-5"><Loader2 className="text-[#0061A4] animate-spin" size={32} /><p className="mono text-gray-400 text-[11px] tracking-[0.3em] uppercase">{t('loading_data')}</p></div>
                        ) : (
                            <AnimatePresence mode="popLayout">
                                <div className="flex flex-col gap-6">
                                    {filteredProducts.map((p, idx) => (
                                        <motion.article key={p.id} layout initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -40, scale: 0.97 }} transition={{ duration: 0.5, delay: idx * 0.06 }} onClick={() => navigate(`/product/${p.id}`)} onHoverStart={() => setHoveredId(p.id)} onHoverEnd={() => setHoveredId(null)}
                                            className="product-card group relative cursor-pointer overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                                            <HudCorner position="tl" size={12} color={hoveredId === p.id ? '#0061A4' : 'transparent'} />
                                            <HudCorner position="br" size={12} color={hoveredId === p.id ? '#0061A4' : 'transparent'} />
                                            <div className="flex flex-col md:flex-row gap-0">
                                                <div className="relative md:w-[380px] shrink-0 overflow-hidden bg-gray-50 flex items-center justify-center p-8 border-r border-gray-50">
                                                    <img src={`${API_URL}${p.image}`} alt={getField(p, 'title')} className="w-full h-full object-contain transition-all duration-700 group-hover:scale-105" />
                                                    {!p.inStock && <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white text-[9px] font-black uppercase tracking-widest shadow-lg rounded-sm">{t('out_of_stock_label')}</div>}
                                                </div>
                                                <div className="flex-1 flex flex-col p-8 lg:p-10 min-w-0">
                                                    <div className="mb-6">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <span className="mono text-[#0061A4]/80 text-[10px] font-bold uppercase tracking-widest">{p.brand?.name}</span>
                                                            <span className="w-4 h-px bg-blue-100" />
                                                            <span className="mono text-gray-400 text-[10px] uppercase tracking-tighter">ID_{p.id.substring(0, 6)}</span>
                                                        </div>
                                                        <h2 className="text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#0061A4]">{getField(p, 'title')}</h2>
                                                    </div>
                                                    {p.techSpecs?.length > 0 && (
                                                        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                                                            {p.techSpecs.slice(0, 4).map((spec, i) => (
                                                                <div key={i} className="p-3.5 bg-gray-50 border border-gray-100 rounded-xl min-h-[80px] flex flex-col justify-start">
                                                                    <p className="mono text-gray-400 text-[8.5px] tracking-widest uppercase mb-1.5 leading-tight">{getField(spec, 'key')}</p>
                                                                    <p className="text-[#1A1C1E] font-bold text-[13px] uppercase tracking-tight leading-tight">{getField(spec, 'val')}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                                                        <div className="space-y-0.5">
                                                            <p className="mono text-gray-400 text-[9px] tracking-widest uppercase font-bold">{t('price')}</p>
                                                            <p className="text-2xl font-bold text-slate-900 tracking-tighter tabular-nums italic">{p.price ? `${p.price} ${lang === 'ru' ? 'сум' : "so'm"}` : t('call_price')}</p>
                                                        </div>
                                                        <button className="relative flex items-center gap-3 px-10 py-5 bg-[#0061A4] text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all hover:bg-blue-600 shadow-xl shadow-blue-100">{t('details')} <ArrowUpRight size={14} /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.article>
                                    ))}
                                </div>
                            </AnimatePresence>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;