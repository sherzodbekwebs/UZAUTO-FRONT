import React, { useState, useRef, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useQuery } from '@tanstack/react-query'; // 🟢 Yangi qo'shildi
import {
    ChevronLeft, ChevronRight, ArrowUpRight, Box,
    Signal, LayoutGrid, X
} from 'lucide-react';
import API, { API_URL } from '../../api/axios';
import { useLanguage } from '../../context/LanguageContext';

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

const ScanlineOverlay = () => (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)', backgroundSize: '100% 4px' }}
    />
);

const HudCorner = ({ position = 'tl', size = 16, color = '#0061A4', radius = '12px' }) => {
    const styles = {
        tl: { top: 0, left: 0, borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}`, borderTopLeftRadius: radius },
        tr: { top: 0, right: 0, borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}`, borderTopRightRadius: radius },
        bl: { bottom: 0, left: 0, borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}`, borderBottomLeftRadius: radius },
        br: { bottom: 0, right: 0, borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}`, borderBottomRightRadius: radius },
    };
    return <span style={{ position: 'absolute', width: size, height: size, ...styles[position], transition: 'all 0.3s ease' }} />;
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
    <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-sm bg-blue-500/10 text-[#0061A4] text-[10px] font-roboto font-bold border border-blue-500/20">
        {String(count).padStart(2, '0')}
    </span>
);

const ProductsPage = () => {
    const { t, lang } = useLanguage();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [hoveredId, setHoveredId] = useState(null);

    // 🟢 REACT QUERY INTEGRATSIYASI (useEffect o'rniga)
    const { data: products = [], isLoading: pLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => API.get('/products').then(res => res.data)
    });

    const { data: categories = [], isLoading: cLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => API.get('/categories').then(res => res.data)
    });

    const { data: brands = [], isLoading: bLoading } = useQuery({
        queryKey: ['brands'],
        queryFn: () => API.get('/brands').then(res => res.data)
    });

    const loading = pLoading || cLoading || bLoading;

    // URL parametrlarini olish
    const activeCategory = searchParams.get('category') || 'all';
    const activeBrand = searchParams.get('brand') || 'all';
    const currentPage = Number(searchParams.get('page')) || 1;
    const itemsPerPage = 4;

    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.2]);

    // FILTRLASH
    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            const catMatch = activeCategory === 'all' || String(p.categoryId) === String(activeCategory);
            const brandMatch = activeBrand === 'all' || String(p.brandId) === String(activeBrand);
            const isActiveMatch = p.isActive === true;
            return catMatch && brandMatch && isActiveMatch;
        });
    }, [products, activeCategory, activeBrand]);

    // PAGINATION
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleFilterChange = (newParams) => {
        const params = new URLSearchParams(searchParams);
        Object.entries(newParams).forEach(([key, value]) => {
            if (value === 'all') params.delete(key);
            else params.set(key, value);
        });
        params.set('page', '1');
        setSearchParams(params);
        setSidebarOpen(false);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            const params = new URLSearchParams(searchParams);
            params.set('page', String(newPage));
            setSearchParams(params);
            window.scrollTo({ top: 300, behavior: 'smooth' });
        }
    };

    const getField = (item, field) => {
        if (!item) return '---';
        const k = lang === 'ru' ? 'Ru' : lang === 'en' ? 'En' : 'Uz';
        const value = item[`${field}${k}`];
        if (value) return value;
        return item[`${field}Ru`] || item[`${field}Uz`] || '---';
    };

    return (
        <div className="min-h-screen text-[#1A1C1E] font-roboto overflow-x-hidden"
            style={{ backgroundColor: '#ffffff', backgroundImage: `radial-gradient(ellipse 100% 60% at 50% -10%, rgba(0,97,164,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 90% 80%, rgba(0,97,164,0.05) 0%, transparent 60%)` }}>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
                * { box-sizing: border-box; font-family: 'Roboto', sans-serif !important; }
                .font-roboto { font-family: 'Roboto', sans-serif !important; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .product-card { transition: all 0.5s cubic-bezier(0.16,1,0.3,1); }
                .grid-bg { background-image: linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px); background-size: 60px 60px; }
                
                @keyframes shimmer {
                  0% { background-position: -200% 0; }
                  100% { background-position: 200% 0; }
                }
                .skeleton {
                  background: linear-gradient(90deg, #f6f7f8 25%, #edeef1 50%, #f6f7f8 75%);
                  background-size: 200% 100%;
                  animation: shimmer 1.5s infinite linear;
                }

                @media (min-width: 1101px) {
                    .desktop-sidebar { display: block !important; position: sticky !important; top: 100px; transform: none !important; }
                    .mobile-filter-btn { display: none !important; }
                }
                @media (max-width: 1100px) {
                    .desktop-sidebar { display: none; }
                    .desktop-sidebar.is-open { display: block !important; position: fixed !important; inset: 0 !important; width: 320px !important; z-index: 2000 !important; height: 100% !important; background: white; }
                    .mobile-filter-btn { display: flex !important; }
                }
            `}</style>

            <ScanlineOverlay />

            <section ref={heroRef} className="relative overflow-hidden border-b border-gray-100" style={{ minHeight: 'auto', backgroundColor: '#fcfdfe' }}>
                <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 grid-bg opacity-100" />

                <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-10 pt-24 lg:pt-32 pb-14 font-roboto">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-px bg-[#0061A4]" />
                                <span className="text-[#0061A4] text-[10px] font-bold tracking-[0.25em] uppercase">UzAuto Trailer — Catalog</span>
                                <Signal size={12} className="text-blue-500 animate-pulse" />
                            </div>
                            <h1 className="text-[38px] sm:text-[54px] lg:text-[82px] font-bold leading-[1] tracking-tight capitalize">
                                <GlitchText><span>{t('products')}</span></GlitchText>
                            </h1>
                        </div>

                        <div className="flex flex-col gap-3">
                            <span className="text-slate-600 text-[11px] font-bold tracking-widest"> Filter by Brand</span>
                            <div className="flex flex-wrap items-center gap-2">
                                {loading ? (
                                    [1, 2, 3].map(i => <div key={i} className="skeleton w-20 h-10 rounded-xl" />)
                                ) : (
                                    <>
                                        <button onClick={() => handleFilterChange({ brand: 'all' })}
                                            className={cn("relative px-6 py-2.5 text-[11px] font-bold transition-all duration-300 rounded-xl border capitalize", activeBrand === 'all' ? "text-white bg-[#0061A4] border-[#0061A4] shadow-lg shadow-blue-900/20" : "text-slate-700 bg-white border-slate-300 hover:border-[#0061A4] hover:text-[#0061A4]")}>
                                            {activeBrand === 'all' && <><HudCorner position="tl" color="#fff" size={8} radius="12px" /><HudCorner position="br" color="#fff" size={8} radius="12px" /></>}
                                            {t('all')}
                                        </button>
                                        {brands.map((b) => (
                                            <button key={b.id} onClick={() => handleFilterChange({ brand: String(b.id) })}
                                                className={cn("relative px-6 py-2.5 text-[11px] font-bold transition-all duration-300 rounded-xl border capitalize", String(activeBrand) === String(b.id) ? "text-white bg-[#0061A4] border-[#0061A4] shadow-lg shadow-blue-900/20" : "text-slate-700 bg-white border-slate-300 hover:border-[#0061A4] hover:text-[#0061A4]")}>
                                                {String(activeBrand) === String(b.id) && <><HudCorner position="tl" color="#fff" size={8} radius="12px" /><HudCorner position="br" color="#fff" size={8} radius="12px" /></>}
                                                {b.name}
                                            </button>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-8 mt-10 pt-6 border-t border-gray-100">
                        {loading ? (
                             <div className="flex gap-4"><div className="skeleton w-32 h-12 rounded-xl" /><div className="skeleton w-32 h-12 rounded-xl" /></div>
                        ) : (
                            <>
                                <div className="flex items-center gap-4 px-5 py-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                                    <span className="text-[#0061A4] text-2xl font-black ">{String(filteredProducts.length).padStart(2, '0')}</span>
                                    <span className="text-gray-600 text-[10px] font-bold uppercase tracking-tight">{t('units_found')}</span>
                                </div>
                                <div className="flex items-center gap-4 px-5 py-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                                    <span className="text-gray-500 text-2xl font-black ">{String(categories.length).padStart(2, '0')}</span>
                                    <span className="text-gray-600 text-[10px] font-bold uppercase tracking-tight">{t('categories_label')}</span>
                                </div>
                            </>
                        )}
                        <div className="flex-1 min-w-[20px] h-px bg-gradient-to-r from-blue-500/10 to-transparent" />
                        {!loading && (
                            <button onClick={() => setSidebarOpen(true)} className="mobile-filter-btn flex items-center gap-2 px-6 py-3 bg-[#0061A4] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-all rounded-lg shadow-lg">
                                <LayoutGrid size={14} /> {t('categories_label')}
                            </button>
                        )}
                    </div>
                </div>
            </section>

            <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-10 lg:py-14">
                <div className="flex gap-8 items-start">
                    <AnimatePresence>
                        {sidebarOpen && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-[1999] bg-black/50 backdrop-blur-sm min-[1101px]:hidden" />
                        )}
                    </AnimatePresence>

                    <aside className={cn(
                        "desktop-sidebar w-[320px] shrink-0 transition-all duration-500 font-roboto",
                        sidebarOpen ? "is-open p-6 shadow-2xl translate-x-0 h-full overflow-y-auto" : "max-[1100px]:-translate-x-full h-auto"
                    )}>
                        <div className="flex items-center justify-between mb-8 py-4 border-y border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-px bg-blue-600" />
                                <span className="text-slate-800 text-[11px] font-bold tracking-widest capitalize"> {t('categories_label')}</span>
                            </div>
                            <button onClick={() => setSidebarOpen(false)} className="min-[1101px]:hidden p-2 bg-gray-50 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-2">
                            {loading ? (
                                [1, 2, 3, 4, 5, 6].map(n => <div key={n} className="w-full h-[75px] skeleton rounded-2xl" />)
                            ) : (
                                <>
                                    <button onClick={() => handleFilterChange({ category: 'all' })}
                                        className={cn("cat-btn relative group flex items-center justify-between px-4 py-4 text-left rounded-xl transition-all duration-300", activeCategory === 'all' ? "bg-blue-50 text-[#0061A4] border border-blue-100" : "bg-gray-50 text-slate-600 hover:bg-gray-100")}>
                                        <div className="relative flex items-center gap-4">
                                            <div className={cn("w-9 h-9 flex items-center justify-center border transition-all duration-300 rounded-lg bg-white", activeCategory === 'all' ? "border-blue-500/50 text-[#0061A4]" : "border-gray-200")}>
                                                <Box size={16} />
                                            </div>
                                            <span className="text-[13px] font-bold capitalize">{t('all_models')}</span>
                                        </div>
                                        <div className="relative"><CountBadge count={products.length} /></div>
                                    </button>

                                    {categories.map((cat) => {
                                        const isActive = String(activeCategory) === String(cat.id);
                                        return (
                                            <button key={cat.id} onClick={() => handleFilterChange({ category: String(cat.id) })}
                                                className={cn("cat-btn relative group flex items-center gap-4 px-4 py-3 w-full rounded-2xl transition-all duration-300 border mb-1 capitalize", isActive ? "bg-[#F0F7FF] border-[#0061A4]/20 shadow-sm text-[#0061A4]" : "bg-gray-50 border-transparent text-slate-600 hover:bg-gray-100 hover:text-black")}>
                                                <div className={cn("w-[85px] h-[55px] flex items-center justify-center border transition-all duration-500 shrink-0 p-2 rounded-xl bg-white", isActive ? "border-[#0061A4] shadow-md" : "border-gray-100 grayscale group-hover:grayscale-0 group-hover:scale-105")}>
                                                    {cat.icon ? <img src={`${API_URL}${cat.icon}`} className="w-full h-full object-contain transition-transform" alt="" /> : <Box size={18} />}
                                                </div>
                                                <div className="flex flex-col justify-center text-left min-w-0 h-[55px]"><span className="text-[12px] font-bold tracking-tight leading-[1.2] line-clamp-2">{getField(cat, 'title')}</span></div>
                                                {isActive && <div className="absolute right-4 w-1 h-4 bg-[#0061A4] rounded-full shadow-sm" />}
                                            </button>
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    </aside>

                    <main className="flex-1 min-w-0 w-full font-roboto">
                        {loading ? (
                            <div className="flex flex-col gap-8">
                                {[1, 2, 3].map(n => (
                                    <div key={n} className="w-full h-[320px] skeleton rounded-[32px]" />
                                ))}
                            </div>
                        ) : (
                            <>
                                <AnimatePresence mode="popLayout">
                                    <div className="flex flex-col gap-8">
                                        {paginatedProducts.map((p, idx) => (
                                            <motion.article key={p.id} layout initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.5, delay: idx * 0.04 }} onClick={() => navigate(`/product/${p.id}`)} onHoverStart={() => setHoveredId(p.id)} onHoverEnd={() => setHoveredId(null)}
                                                className="product-card group relative cursor-pointer overflow-hidden bg-white border border-gray-100 rounded-[32px] shadow-sm hover:shadow-xl transition-all"
                                            >
                                                <div className="flex flex-col md:flex-row">
                                                    <div className="relative w-full md:w-[220px] lg:w-[280px] shrink-0 overflow-hidden bg-gray-50 flex items-center justify-center p-6 sm:p-8 md:border-r border-gray-100">
                                                        <img src={`${API_URL}${p.image}`} alt={getField(p, 'title')} className="w-full h-full object-contain transition-all duration-700 group-hover:scale-105" />
                                                        {!p.inStock && <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white text-[9px] font-bold rounded-full capitalize">{t('out_of_stock_label')}</div>}
                                                    </div>

                                                    <div className="flex-1 flex flex-col p-8 lg:p-10 min-w-0">
                                                        <div className="mb-6">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <span className="text-[#0061A4] text-[10px] font-bold capitalize">{p.brand?.name}</span>
                                                                <div className="h-px w-4 bg-blue-200" />
                                                                <span className="text-gray-500 text-[10px] font-bold ">ID_{p.id.substring(0, 6)}</span>
                                                            </div>
                                                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0061A4] group-hover:text-blue-700 transition-colors capitalize">{getField(p, 'title')}</h2>
                                                        </div>

                                                        {p.techSpecs?.length > 0 && (
                                                            <div className="grid grid-cols-2 min-[1440px]:grid-cols-4 gap-3 sm:gap-4 mb-8">
                                                                {p.techSpecs.slice(0, 4).map((spec, i) => (
                                                                    <div key={i} className="p-3 sm:p-4 bg-white border border-gray-100 rounded-xl min-h-[70px] flex flex-col justify-start shadow-sm hover:border-blue-100 transition-colors">
                                                                        <p className="text-slate-900 font-bold text-[9px] sm:text-[10px] capitalize mb-1.5 leading-tight">{getField(spec, 'key')}</p>
                                                                        <p className="text-black font-black text-[12px] sm:text-[14px] leading-tight capitalize">{getField(spec, 'val')}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-auto pt-6 border-t border-gray-100">
                                                            <div>
                                                                <p className="text-slate-500 text-[10px] font-bold mb-1 capitalize ">{t('price')}</p>
                                                                <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter tabular-nums ">
                                                                    {p.price ? `${p.price} ${lang === 'ru' ? 'сум' : lang === 'en' ? 'sum' : "so'm"}` : t('call_price')}
                                                                </p>
                                                            </div>
                                                            <button className="relative flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-[#0061A4] text-white rounded-xl font-bold text-[10px] transition-all hover:bg-blue-600 shadow-xl active:scale-95 capitalize">
                                                                {t('details')} <ArrowUpRight size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.article>
                                        ))}
                                    </div>
                                </AnimatePresence>

                                {/* 🔢 PAGINATION UI - Responsivlik uchun tahrirlandi */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-12 py-6 border-t border-gray-100 w-full overflow-hidden px-2">
                                        <button 
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="shrink-0 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        
                                        {/* Raqamlar uchun scrollable konteyner */}
                                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide no-scrollbar px-2 max-w-full">
                                            {[...Array(totalPages)].map((_, i) => (
                                                <button
                                                    key={i + 1}
                                                    onClick={() => handlePageChange(i + 1)}
                                                    className={cn(
                                                        "shrink-0 w-10 h-12 sm:w-12 sm:h-12 rounded-xl font-bold text-[13px] transition-all border",
                                                        currentPage === i + 1 
                                                            ? "bg-[#0061A4] text-white border-[#0061A4] shadow-lg shadow-blue-200" 
                                                            : "bg-white text-slate-600 border-gray-200 hover:border-blue-400"
                                                    )}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                        </div>

                                        <button 
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="shrink-0 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;