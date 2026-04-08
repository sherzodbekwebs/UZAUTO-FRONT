import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck,
    ZoomIn,
    X,
    ChevronRight,
    ChevronLeft,
    Award,
    FileText,
    Globe,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

// Rasmlarni public papkasiga moslab yuklang
import cert1 from '../../../public/reg_cert1.jpg';
import cert2 from '../../../public/reg_cert2.jpg';
import cert3 from '../../../public/reg_cert3.jpg';
import cert4 from '../../../public/reg_cert4.jpg';

const translations = {
    ru: {
        heroTitle: "Сведения о регистрации и товарном знаке",
        introText: "Официальные документы, подтверждающие государственную регистрацию предприятия и исключительные права на товарный знак ООО «UzAuto Trailer».",
        docsTitle: "Официальные документы",
        zoomHint: "Нажмите на документ для детального просмотра",
        docTypes: [
            { id: 1, title: "Свидетельство о регистрации", year: "2012", img: cert1 },
            { id: 2, title: "Лицензия на производство", year: "2015", img: cert2 },
            { id: 3, title: "Свидетельство на товарный знак", year: "2021", img: cert3 },
            { id: 4, title: "Приложение к свидетельству", year: "2021", img: cert4 }
        ],
        protectionTitle: "Правовая защита",
        protectionDesc: "Товарный знак «UzAuto Trailer» является интеллектуальной собственностью предприятия и охраняется законом Республики Узбекистан. Любое несанкционированное использование бренда влечет за собой ответственность в соответствии с законодательством."
    },
    uz: {
        heroTitle: "Ro'yxatdan o'tganlik va tovar belgisi",
        introText: "Korxonaning davlat ro'yxatidan o'tganligini va «UzAuto Trailer» MCHJ tovar belgisiga bo'lgan mutlaq huquqlarini tasdiqlovchi rasmiy hujjatlar.",
        docsTitle: "Rasmiy hujjatlar",
        zoomHint: "Batafsil ko'rish uchun hujjat ustiga bosing",
        docTypes: [
            { id: 1, title: "Ro'yxatdan o'tganlik guvohnomasi", year: "2012", img: cert1 },
            { id: 2, title: "Ishlab chiqarish litsenziyasi", year: "2015", img: cert2 },
            { id: 3, title: "Tovar belgisi guvohnomasi", year: "2021", img: cert3 },
            { id: 4, title: "Guvohnomaga ilova", year: "2021", img: cert4 }
        ],
        protectionTitle: "Huquqiy himoya",
        protectionDesc: "«UzAuto Trailer» tovar belgisi korxonaning intellektual mulki hisoblanadi va O'zbekiston Respublikasi qonuni bilan himoya qilinadi. Brenddan ruxsatsiz foydalanish qonunchilikka muvofiq javobgarlikka sabab bo'ladi."
    },
    en: {
        heroTitle: "Registration & Trademark",
        introText: "Official documents confirming the state registration of the enterprise and exclusive rights to the 'UzAuto Trailer' trademark.",
        docsTitle: "Official Documents",
        zoomHint: "Click on the document for a detailed view",
        docTypes: [
            { id: 1, title: "Registration Certificate", year: "2012", img: cert1 },
            { id: 2, title: "Production License", year: "2015", img: cert2 },
            { id: 3, title: "Trademark Certificate", year: "2021", img: cert3 },
            { id: 4, title: "Appendix to Certificate", year: "2021", img: cert4 }
        ],
        protectionTitle: "Legal Protection",
        protectionDesc: "The 'UzAuto Trailer' trademark is the intellectual property of the enterprise and is protected by the laws of the Republic of Uzbekistan."
    }
};

const RegistrationInfo = ({ lang = 'ru' }) => {
    const t = translations[lang] || translations.ru;
    const [selectedImgIndex, setSelectedImgIndex] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [panX, setPanX] = useState(0);
    const [panY, setPanY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [lastDistance, setLastDistance] = useState(0);
    const imgRef = useRef(null);
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [hash]);

    const handleNextImage = () => {
        setSelectedImgIndex((prev) => (prev + 1) % t.docTypes.length);
        setZoomLevel(1);
        setPanX(0);
        setPanY(0);
    };

    const handlePrevImage = () => {
        setSelectedImgIndex((prev) => (prev - 1 + t.docTypes.length) % t.docTypes.length);
        setZoomLevel(1);
        setPanX(0);
        setPanY(0);
    };

    const handleCloseModal = () => {
        setSelectedImgIndex(null);
        setZoomLevel(1);
        setPanX(0);
        setPanY(0);
    };

    const handleMouseDown = (e) => {
        if (zoomLevel > 1) {
            setIsDragging(true);
            setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging && zoomLevel > 1) {
            const newPanX = e.clientX - dragStart.x;
            const newPanY = e.clientY - dragStart.y;

            const maxPan = 150;
            setPanX(Math.max(-maxPan, Math.min(maxPan, newPanX)));
            setPanY(Math.max(-maxPan, Math.min(maxPan, newPanY)));
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Touch events for pinch zoom
    const handleTouchStart = (e) => {
        if (e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            setLastDistance(distance);
        } else if (e.touches.length === 1) {
            setIsDragging(true);
            setDragStart({
                x: e.touches[0].clientX - panX,
                y: e.touches[0].clientY - panY
            });
        }
    };

    const handleTouchMove = (e) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );

            if (lastDistance > 0) {
                const scale = distance / lastDistance;
                setZoomLevel((prev) => Math.max(1, Math.min(3, prev * scale)));
            }
            setLastDistance(distance);
        } else if (isDragging && e.touches.length === 1 && zoomLevel > 1) {
            const newPanX = e.touches[0].clientX - dragStart.x;
            const newPanY = e.touches[0].clientY - dragStart.y;

            const maxPan = 150;
            setPanX(Math.max(-maxPan, Math.min(maxPan, newPanX)));
            setPanY(Math.max(-maxPan, Math.min(maxPan, newPanY)));
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        setLastDistance(0);
    };

    const handleWheel = (e) => {
        e.preventDefault();
        const newZoom = e.deltaY > 0
            ? Math.max(1, zoomLevel - 0.1)
            : Math.min(3, zoomLevel + 0.1);
        setZoomLevel(newZoom);
    };

    const selectedImage = selectedImgIndex !== null ? t.docTypes[selectedImgIndex] : null;

    return (
        <div className="pt-0 md:pt-0 bg-[#F8FAFC] font-inter min-h-screen pb-1 md:pb-1">

            {/* 1. HERO SECTION */}
            <section className="relative h-[250px] md:h-[350px] lg:h-[450px] flex items-center bg-[#0a1425] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70 z-10"></div>
                <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.3 }}
                    transition={{ duration: 1.5 }}
                    src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85"
                    className="absolute inset-0 w-full h-full object-cover grayscale"
                    alt="Background"
                />
                <div className="relative z-20 max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 w-full">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                        <h1 className="text-3xl md:text-5xl lg:text-7xl font-semibold text-white tracking-tighter max-w-4xl leading-tight uppercase">
                            {t.heroTitle}
                        </h1>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 -mt-10 md:-mt-16 relative z-30">

                {/* 2. INTRODUCTION */}
                <div id="reg-intro" className="bg-white rounded-[24px] md:rounded-[48px] p-6 md:p-10 lg:p-16 shadow-xl border border-gray-100 mb-12 md:mb-20 scroll-mt-28">
                    <div className="max-w-4xl">
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                                <ShieldCheck className="text-[#0054A6] w-6 h-6 md:w-8 md:h-8" />
                            </div>
                            <p className="text-base sm:text-lg lg:text-2xl font-medium text-gray-600 leading-relaxed italic">
                                {t.introText}
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* 3. DOCUMENTS GRID */}
                <section id="documents" className="scroll-mt-28 mb-16 md:mb-32">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-16 px-2 md:px-4 border-b border-gray-200 pb-4 md:pb-8">
                        <div className="flex items-center gap-3 md:gap-4 text-[#1a2e44]">
                            <FileText className="text-[#0054A6] w-6 h-6 md:w-7 md:h-7" />
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-tight">{t.docsTitle}</h2>
                        </div>
                        <span className="text-[9px] md:text-[10px] font-black tracking-widest text-gray-400 uppercase mt-2 md:mt-0 opacity-80 md:opacity-100">{t.zoomHint}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                        {t.docTypes.map((doc, i) => (
                            <motion.div
                                key={doc.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group"
                            >
                                <div
                                    onClick={() => {
                                        setSelectedImgIndex(i);
                                        setZoomLevel(1);
                                        setPanX(0);
                                        setPanY(0);
                                    }}
                                    className="relative aspect-[1/1.4] bg-white rounded-[24px] md:rounded-[32px] overflow-hidden shadow-lg border-4 md:border-8 border-white cursor-zoom-in transition-all duration-500 hover:shadow-xl hover:-translate-y-1 md:group-hover:shadow-2xl md:group-hover:-translate-y-2"
                                >
                                    <img src={doc.img} className="w-full h-full object-cover" alt={doc.title} loading="lazy" />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-[#0054A6]/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                        <div className="bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-full text-[#0054A6] shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
                                            <ZoomIn className="w-6 h-6 md:w-8 md:h-8" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-6 px-2 md:px-4 text-center">
                                    <span className="text-[9px] md:text-[10px] font-black text-[#0054A6] uppercase tracking-widest mb-1.5 md:mb-2 block">{doc.year} Year</span>
                                    <h4 className="text-xs md:text-[15px] font-bold text-[#1a2e44] leading-tight">{doc.title}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 4. TRADEMARK PROTECTION */}
                {/* <div id="trademark-protection" className="bg-[#1a2e44] rounded-[32px] md:rounded-[56px] p-6 md:p-12 lg:p-20 text-white relative overflow-hidden scroll-mt-28">
                    <Award className="absolute -right-10 -bottom-10 md:-right-20 md:-bottom-20 opacity-5 text-white w-[250px] h-[250px] md:w-[500px] md:h-[500px]" />
                    <div className="max-w-4xl relative z-10">
                        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0054A6] rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                                <Globe className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <h2 className="text-xl md:text-2xl lg:text-4xl font-semibold tracking-tight italic">{t.protectionTitle}</h2>
                        </div>
                        <p className="text-sm md:text-lg lg:text-xl text-gray-300 leading-relaxed font-medium">
                            {t.protectionDesc}
                        </p>
                    </div>
                </div> */}

            </div>

            {/* ENHANCED LIGHTBOX MODAL */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCloseModal}
                        className="fixed inset-0 z-[9999] bg-[#0a1425]/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-6"
                    >
                        {/* Top Header Bar */}
                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent px-4 md:px-6 py-3 md:py-4 flex items-center justify-between z-[10001]">
                            <div className="text-white text-sm md:text-base font-semibold">
                                {selectedImgIndex + 1} / {t.docTypes.length}
                            </div>

                            <div className="flex items-center gap-3 md:gap-4">


                                <motion.button
                                    onClick={handleCloseModal}
                                    whileHover={{ scale: 1.1 }}
                                    className="text-white/70 hover:text-white transition-colors p-2"
                                >
                                    <X className="w-5 h-5 md:w-6 md:h-6" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Main Image Area */}
                        <motion.div
                            className={`relative w-full h-full max-w-[95vw] max-h-[calc(100vh-200px)] flex items-center justify-center overflow-hidden rounded-lg ${zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : ''
                                }`}
                            initial={{ scale: 0.8, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            onWheel={handleWheel}
                        >
                            <motion.img
                                ref={imgRef}
                                src={selectedImage.img}
                                className="w-auto h-auto max-w-full max-h-full object-contain shadow-[0_50px_100px_rgba(0,0,0,0.5)] rounded-lg select-none"
                                alt={selectedImage.title}
                                animate={{
                                    scale: zoomLevel,
                                    x: panX,
                                    y: panY
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                style={{ transformOrigin: 'center center' }}
                                onMouseDown={handleMouseDown}
                                draggable={false}
                            />
                        </motion.div>

                        {/* Navigation Arrows */}
                        <motion.button
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePrevImage();
                            }}
                            whileHover={{ scale: 1.15, opacity: 1 }}
                            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
                        >
                            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
                        </motion.button>

                        <motion.button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNextImage();
                            }}
                            whileHover={{ scale: 1.15, opacity: 1 }}
                            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
                        >
                            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
                        </motion.button>

                        {/* Bottom Thumbnail Gallery */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent px-4 md:px-6 py-6 md:py-8 flex items-center justify-center gap-2 md:gap-3 overflow-x-auto z-[10000]">
                            <div className="flex gap-2 md:gap-3">
                                {t.docTypes.map((doc, i) => (
                                    <motion.button
                                        key={doc.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedImgIndex(i);
                                            setZoomLevel(1);
                                            setPanX(0);
                                            setPanY(0);
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        className={`relative flex-shrink-0 h-14 md:h-20 w-10 md:w-14 rounded-lg overflow-hidden border-2 transition-all ${selectedImgIndex === i
                                            ? 'border-[#0054A6] shadow-lg shadow-[#0054A6]/50'
                                            : 'border-white/30 opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <img
                                            src={doc.img}
                                            alt={doc.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RegistrationInfo;