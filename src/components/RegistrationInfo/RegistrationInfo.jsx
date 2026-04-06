import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileCheck,
    ShieldCheck,
    ZoomIn,
    X,
    Download,
    ChevronRight,
    Award,
    FileText,
    Globe
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

// Rasmlarni public papkasiga moslab yuklang
import cert1 from '../../../public/reg_cert1.jpg'; // Guvohnoma
import cert2 from '../../../public/reg_cert2.jpg'; // Litsenziya
import cert3 from '../../../public/reg_cert3.jpg'; // Tovar belgisi
import cert4 from '../../../public/reg_cert4.jpg'; // Ilova

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
    const [selectedImg, setSelectedImg] = useState(null);
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

    return (
        <div className="pt-24 bg-[#F8FAFC] font-inter min-h-screen pb-32">

            {/* 1. HERO SECTION */}
            <section className="relative h-[350px] lg:h-[450px] flex items-center bg-[#0a1425] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70 z-10"></div>
                <motion.img
                    initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 0.3 }} transition={{ duration: 1.5 }}
                    src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85"
                    className="absolute inset-0 w-full h-full object-cover grayscale"
                    alt="Background"
                />
                <div className="relative z-20 max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                        {/* <span className="text-[#0054A6] font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Legal Identity</span> */}
                        <h1 className="text-4xl lg:text-7xl font-semibold text-white tracking-tighter max-w-4xl leading-none uppercase">
                            {t.heroTitle}
                        </h1>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 -mt-16 relative z-30">

                {/* 2. INTRODUCTION - id: reg-intro */}
                <div id="reg-intro" className="bg-white rounded-[48px] p-10 lg:p-16 shadow-xl border border-gray-100 mb-20 scroll-mt-28">
                    <div className="max-w-4xl">
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex gap-6 items-start">
                            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                                <ShieldCheck className="text-[#0054A6]" size={32} />
                            </div>
                            <p className="text-xl lg:text-2xl font-medium text-gray-600 leading-relaxed italic">
                                {t.introText}
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* 3. DOCUMENTS GRID - id: documents */}
                <section id="documents" className="scroll-mt-28 mb-32">
                    <div className="flex items-center justify-between mb-16 px-4 border-b border-gray-200 pb-8">
                        <div className="flex items-center gap-4 text-[#1a2e44]">
                            <FileText size={28} className="text-[#0054A6]" />
                            <h2 className="text-2xl lg:text-3xl font-bold uppercase tracking-tight">{t.docsTitle}</h2>
                        </div>
                        <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase hidden md:block">{t.zoomHint}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
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
                                    onClick={() => setSelectedImg(doc.img)}
                                    className="relative aspect-[1/1.4] bg-white rounded-[32px] overflow-hidden shadow-lg border-8 border-white cursor-zoom-in transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2"
                                >
                                    <img src={doc.img} className="w-full h-full object-cover" alt={doc.title} />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-[#0054A6]/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                        <div className="bg-white/90 backdrop-blur-md p-4 rounded-full text-[#0054A6] shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
                                            <ZoomIn size={32} />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 px-4 text-center">
                                    <span className="text-[10px] font-black text-[#0054A6] uppercase tracking-widest mb-2 block">{doc.year} Year</span>
                                    <h4 className="text-[15px] font-bold text-[#1a2e44] leading-tight">{doc.title}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 4. TRADEMARK PROTECTION - id: trademark-protection */}
                <div id="trademark-protection" className="bg-[#1a2e44] rounded-[56px] p-8 lg:p-20 text-white relative overflow-hidden scroll-mt-28">
                    <Award className="absolute -right-20 -bottom-20 opacity-5 text-white" size={500} />
                    <div className="max-w-4xl relative z-10">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 bg-[#0054A6] rounded-2xl flex items-center justify-center"><Globe size={24} /></div>
                            <h2 className="text-2xl lg:text-4xl font-semibold tracking-tight italic">{t.protectionTitle}</h2>
                        </div>
                        <p className="text-lg lg:text-xl text-gray-300 leading-relaxed font-medium">
                            {t.protectionDesc}
                        </p>
                    </div>
                </div>

            </div>

            {/* LIGHTBOX MODAL */}
            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedImg(null)}
                        className="fixed inset-0 z-[500] bg-[#0a1425]/95 backdrop-blur-xl flex items-center justify-center p-6 cursor-zoom-out"
                    >
                        <motion.button className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors" whileHover={{ rotate: 90 }}>
                            <X size={48} strokeWidth={1} />
                        </motion.button>
                        <motion.img
                            initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0 }}
                            src={selectedImg}
                            className="max-w-full max-h-[90vh] object-contain shadow-[0_50px_100px_rgba(0,0,0,0.5)] rounded-lg"
                            alt="Full Document"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RegistrationInfo;