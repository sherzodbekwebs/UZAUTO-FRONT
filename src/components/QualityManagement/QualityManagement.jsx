import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck, Target, Award, Users, Heart,
    CheckCircle2, ArrowRight, X, ZoomIn, FileCheck, Briefcase,
    Zap, Activity, Globe
} from 'lucide-react';
import sertificat1 from '../../../public/sertificat1.jpg'
import sertificat2 from '../../../public/sertificat2.jpg'
import sertificat3 from '../../../public/sertificat3.jpg'
import { useLocation } from 'react-router-dom';

const translations = {
    ru: {
        heroTitle: "Система менеджмента качества",
        breadcrumb: "Главная > Производство > Качество",
        visionTitle: "ВИДЕНИЕ",
        visionText: "Наша продукция - самая узнаваемая в Центральной Азии и СНГ.",
        missionTitle: "МИССИЯ",
        missionText: "Укрепление позиций на рынках соседних стран путём продвижения доступной, надёжной и качественной прицепной и навесной техники для большегрузных автотранспортных средств.",
        valuesTitle: "ЦЕННОСТИ, КОТОРЫЕ НАС ОБЪЕДИНЯЮТ",
        value1: { t: "Потребители", d: "удовлетворенность потребителя на первом месте." },
        value2: { t: "Заинтересованные стороны", d: "уважение личных прав и интересов наших сотрудников, требований клиентов, условий взаимодействия, выдвигаемых деловыми партнерами и обществом." },
        value3: { t: "Мотивация персонала", d: "справедливость, предполагающая оплату труда в соответствии с достигнутыми результатами и равные условия для профессионального роста." },
        introText1: "ООО “UzAutoTrailer” является динамично развивающимся предприятием в области производства прицепной и навесной техники для большегрузных автотранспортных средств, коммерческих автотранспортных средств.",
        introText2: "Политика в области качества ООО “UzAutoTrailer” (далее - Предприятие) направлена на постоянное повышение степени удовлетворенности потребителей качеством поставляемой прицепной и навесной техники для большегрузных автотранспортных средств, коммерческих автотранспортных средств (далее – продукция), которая обеспечивается применением передовых технологий производства, современных методов управления с использованием совершенной инфраструктуры и квалифицированного персонала.",
        introText3: "Предприятие, являясь передовым по производству прицепной и навесной техники для большегрузных автотранспортных средств, коммерческих автотранспортных средств, ставит своей целью обеспечить потребности внутреннего и внешнего рынка, таким образом, чтобы соотношение цены и качества удовлетворяло как можно большее число потребителей.",
        scopeText: "Областью применения системы менеджмента качества является: проектирование, производство и реализация прицепной и навесной техники для большегрузных автотранспортных средств.",
        goalsIntro: "В целях повышения конкурентоспособности Предприятия, для удовлетворения постоянно растущих запросов потребителей посредством достижения высокой результативности и эффективности всех процессов ее деятельности, обеспечивающих высокое качество продукции на основе непрерывного целевого планирования, их выполнения, оценки результативности и дальнейших действий по улучшению, руководство Предприятия определило необходимость развития следующих направлений деятельности:",
        goals: [
            "проектирование и освоение производства новых видов продукции;",
            "применение передового технологического оборудования в целях улучшения качества продукции, экономного использования сырьевых и энергетических ресурсов, а также для повышения производительности труда;",
            "расширение рынков сбыта и увеличение объемов реализации и производства продукции;",
            "постоянное совершенствование системы менеджмента качества;",
            "постоянное повышение квалификации персонала и обеспечение соответствующими условиями для их плодотворного труда;",
            "совершенствование инфраструктуры;",
            "поэтапное снижение себестоимости продукции без ущерба качеству производимой продукции."
        ],
        obligationsHeader: "ПОЛИТИКА ПРЕДПРИЯТИЯ В ОБЛАСТИ КАЧЕСТВА ОБЯЗЫВАЕТ:",
        mgmtTitle: "Руководителей всех структурных подразделений:",
        mgmtList: [
            "руководствоваться в своей деятельности требованиями настоящей Политики",
            "обеспечить ее понимание и практическую реализацию всеми работниками подразделений;",
            "создавать необходимые условия для качественного выполнения работ и повышения эффективности труда."
        ],
        staffTitle: "Каждого работника Предприятия:",
        staffList: [
            "понимать требования настоящей политики;",
            "выполнять все требования, предъявляемые законодательством, потребителями, стандартом ISO 9001:2015 и руководителями подразделений;",
            "проявлять творческую инициативу, давать предложения по развитию и добиваться устранения любых причин и обстоятельств, препятствующих качественному осуществлению работ."
        ],
        certsTitle: "Сертификация и стандарты"
    },
    uz: {
        heroTitle: "Sifat menejmenti tizimi",
        breadcrumb: "Bosh sahifa > Ishlab chiqarish > Sifat",
        visionTitle: "ISTIQBOL (VISION)",
        visionText: "Mahsulotlarimiz Markaziy Osiyo va MDHda eng taniqli bo'lishi.",
        missionTitle: "MISSIYA",
        missionText: "Og'ir yuk avtotransport vositalari uchun hamyonbop, ishonchli va yuqori sifatli tirkama hamda osma texnikalarni ilgari surish orqali qo'shni davlatlar bozorida o'rnimizni mustahkamlash.",
        valuesTitle: "BIZNI BIRLASHTIRUVCHI QADRIYATLAR",
        value1: { t: "Iste'molchilar", d: "iste'molchi mamnuniyati biz uchun birinchi o'rinda." },
        value2: { t: "Manfaatdor tomonlar", d: "xodimlarimizning shaxsiy huquqlari va manfaatlarini, mijozlar talablari va hamkorlar manfaatlarini hurmat qilish." },
        value3: { t: "Xodimlarni rag'batlantirish", d: "erishilgan natijalarga muvofiq mehnatga haq to'lash va professional o'sish uchun teng sharoitlarni nazarda tutuvchi adolat." },
        introText1: "“UzAutoTrailer” MCHJ og'ir yuk avtotransport vositalari va tijorat texnikalari uchun tirkamalar ishlab chiqarish sohasida jadal rivojlanayotgan korxonadir.",
        introText2: "“UzAutoTrailer” MCHJning sifat sohasidagi siyosati ilg'or texnologiyalar va zamonaviy boshqaruv usullarini qo'llash orqali iste'molchilarning mamnunlik darajasini doimiy oshirishga qaratilgan.",
        introText3: "Korxona yetakchi ishlab chiqaruvchi sifatida narx va sifat mutanosibligi ko'proq iste'molchilarni qoniqtiradigan darajada bozor ehtiyojlarini ta'minlashni maqsad qilgan.",
        scopeText: "Sifat menejmenti tizimi sohasi: og'ir yuk avtotransport vositalari uchun tirkama va osma texnikalarni loyihalash, ishlab chiqarish va realizatsiya qilish.",
        goalsIntro: "Korxonaning raqobatbardoshligini oshirish va iste'molchilar so'rovlarini qondirish maqsadida rahbariyat quyidagi yo'nalishlarni belgiladi:",
        goals: [
            "yangi turdagi mahsulotlarni loyihalash va o'zlashtirish;",
            "sifatni yaxshilash va resurslarni tejash uchun ilg'or texnologik uskunalarni qo'llash;",
            "sotuv bozorlarini kengaytirish va hajmlarni oshirish;",
            "sifat menejmenti tizimini doimiy takomillashtirish;",
            "xodimlarning malakasini oshirish va unumli mehnat sharoitlarini yaratish;",
            "infratuzilmani takomillashtirish;",
            "sifatga zarar yetkazmagan holda tannarxni bosqichma-bosqich pasaytirish."
        ],
        obligationsHeader: "KORXONANING SIFAT SOHASIDAGI SIYOSATI QUYIDAGILARNI MAJBURLAYDI:",
        mgmtTitle: "Barcha tarkibiy bo'linmalar rahbarlarini:",
        mgmtList: [
            "Ushbu Siyosat talablariga amal qilish;",
            "Barcha xodimlar tomonidan tushunilishini ta'minlash;",
            "Sifatli ish uchun zarur sharoitlarni yaratish."
        ],
        staffTitle: "Korxonaning har bir xodimini:",
        staffList: [
            "Siyosat talablarini tushunish;",
            "ISO 9001:2015 standarti talablarini bajarish;",
            "Sifatni yaxshilashda ijodiy tashabbus ko'rsatish."
        ],
        certsTitle: "Sertifikatlash va standartlar"
    },
    en: {
        heroTitle: "Quality Management System",
        breadcrumb: "Home > Production > Quality",
        visionTitle: "VISION",
        visionText: "Our products are the most recognizable in Central Asia and the CIS.",
        missionTitle: "MISSION",
        missionText: "Strengthening positions in neighboring markets by promoting affordable, reliable, and high-quality trailer equipment for heavy-duty vehicles.",
        valuesTitle: "VALUES THAT UNITE US",
        value1: { t: "Consumers", d: "customer satisfaction is our top priority." },
        value2: { t: "Stakeholders", d: "respect for personal rights, customer requirements, and interaction conditions." },
        value3: { t: "Staff Motivation", d: "fairness in remuneration and equal conditions for professional growth." },
        introText1: "UzAutoTrailer LLC is a dynamically developing enterprise in the field of production of trailer and mounted equipment.",
        introText2: "The quality policy of UzAutoTrailer LLC is aimed at constantly increasing the degree of consumer satisfaction through advanced technologies.",
        introText3: "The Enterprise aims to meet the needs of the domestic and foreign markets so that the price-quality ratio satisfies consumers.",
        scopeText: "Scope: design, production, and sale of trailer and mounted equipment for heavy-duty vehicles.",
        goalsIntro: "In order to increase the competitiveness of the Enterprise, the management has identified the following areas:",
        goals: [
            "design and development of new products;",
            "application of advanced technological equipment;",
            "expansion of sales markets and volume growth;",
            "continuous improvement of the QMS;",
            "personnel training and productive labor conditions;",
            "infrastructure improvement;",
            "phased reduction of production costs."
        ],
        obligationsHeader: "THE COMPANY'S QUALITY POLICY OBLIGATES:",
        mgmtTitle: "All Unit Managers:",
        mgmtList: [
            "be guided by this Policy in their activities;",
            "ensure its understanding and implementation by all staff;",
            "create necessary conditions for quality performance."
        ],
        staffTitle: "Every Employee:",
        staffList: [
            "understand the requirements of this policy;",
            "comply with ISO 9001:2015 and management requirements;",
            "show creative initiative to ensure quality."
        ],
        certsTitle: "Certification and Standards"
    }
};

const certificateImages = [sertificat1, sertificat2, sertificat3];

const QualityManagement = ({ lang = 'ru' }) => {
    const t = translations[lang] || translations.ru;
    const [selectedCert, setSelectedCert] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomOrigin, setZoomOrigin] = useState("center");
    const imgRef = useRef(null);
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
        } else { window.scrollTo(0, 0); }
    }, [hash]);

    const handleImageClick = (e) => {
        e.stopPropagation();
        if (isZoomed) {
            setIsZoomed(false);
        } else {
            const rect = imgRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            setZoomOrigin(`${x}% ${y}%`);
            setIsZoomed(true);
        }
    };

    return (
        <div className="pt-0 lg:pt-0 bg-[#F8FAFC] font-inter overflow-hidden min-h-screen">
            
            {/* 1. HERO */}
            <section className="relative h-[300px] lg:h-[400px] flex items-center bg-[#0a1425] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a1425] via-transparent to-[#0a1425] z-10"></div>
                <motion.img
                    initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 0.4 }} transition={{ duration: 1.5 }}
                    src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Quality Background"
                />
                <div className="relative z-20 max-w-[1440px] mx-auto px-4 lg:px-12 w-full">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                        <span className="text-[#0054A6] font-bold tracking-[0.3em] uppercase text-[10px] lg:text-xs mb-3 lg:mb-4 block">UzAuto Trailer Standards</span>
                        <h1 className="text-2xl lg:text-6xl font-semibold text-white tracking-tighter max-w-4xl leading-tight italic uppercase">
                            {t.heroTitle}
                        </h1>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-[1440px] mx-auto px-4 lg:px-12 -mt-10 lg:-mt-16 relative z-30 pb-16 lg:pb-32">
                
                {/* 2. VISION & MISSION */}
                <div id="quality-vision" className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 mb-8 lg:mb-12 scroll-mt-28">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="lg:col-span-5 bg-[#0054A6] rounded-[24px] lg:rounded-[32px] p-6 lg:p-10 text-white shadow-xl relative overflow-hidden"
                    >
                        <Target className="absolute -right-10 -bottom-10 opacity-10" size={200} />
                        <h4 className="text-[10px] font-black tracking-[0.3em] opacity-70 mb-4 lg:mb-8 uppercase">{t.visionTitle}</h4>
                        <p className="text-xl lg:text-3xl font-semibold leading-tight">{t.visionText}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="lg:col-span-7 bg-white rounded-[24px] lg:rounded-[32px] p-6 lg:p-10 border border-gray-100 shadow-sm relative overflow-hidden"
                    >
                        <Globe className="absolute -right-10 -bottom-10 text-gray-50 opacity-50" size={200} />
                        <h4 className="text-[10px] font-black tracking-[0.3em] text-[#0054A6] mb-4 lg:mb-8 uppercase">{t.missionTitle}</h4>
                        <p className="text-base lg:text-2xl font-semibold text-[#1a2e44] leading-relaxed relative z-10">{t.missionText}</p>
                    </motion.div>
                </div>

                {/* 3. VALUES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-16 lg:mb-24">
                    {[
                        { ...t.value1, icon: Users, color: "bg-blue-50" },
                        { ...t.value2, icon: Heart, color: "bg-red-50" },
                        { ...t.value3, icon: Award, color: "bg-green-50" }
                    ].map((val, i) => (
                        <motion.div
                            key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="bg-white p-6 lg:p-8 rounded-[24px] lg:rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className={`w-12 h-12 lg:w-14 lg:h-14 ${val.color} rounded-xl lg:rounded-2xl flex items-center justify-center mb-6 lg:mb-8`}>
                                <val.icon className="text-[#0054A6]" size={24} />
                            </div>
                            <h4 className="text-lg font-bold text-[#1a2e44] mb-3">{val.t}</h4>
                            <p className="text-gray-500 text-sm font-medium leading-relaxed">{val.d}</p>
                        </motion.div>
                    ))}
                </div>

                {/* 4. INTRO & GOALS */}
                <div id="quality-policy" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 lg:mb-24 items-start scroll-mt-28">
                    <div className="lg:col-span-7 space-y-6 lg:space-y-10">
                        <div className="border-l-4 border-[#0054A6] pl-4 lg:pl-6">
                            <p className="text-lg lg:text-2xl font-semibold text-[#1a2e44] leading-relaxed">{t.introText1}</p>
                        </div>
                        <div className="space-y-6 text-gray-600 text-sm lg:text-lg leading-relaxed text-justify font-medium">
                            <p>{t.introText2}</p>
                            <p>{t.introText3}</p>
                            <div className="flex items-start lg:items-center gap-4 p-4 lg:p-6 bg-[#0054A6]/5 rounded-2xl border border-[#0054A6]/10 mt-6">
                                <ShieldCheck className="text-[#0054A6] shrink-0" size={24} />
                                <span className="font-bold text-[#1a2e44] text-xs lg:text-sm italic">{t.scopeText}</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 bg-white p-6 lg:p-10 rounded-[24px] lg:rounded-[40px] shadow-sm border border-gray-100">
                        <h4 className="text-[10px] font-black tracking-[0.2em] text-gray-400 mb-6 lg:mb-8 uppercase leading-snug">{t.goalsIntro}</h4>
                        <div className="space-y-3">
                            {t.goals.map((goal, i) => (
                                <div key={i} className="flex gap-3 items-start py-2 border-b border-gray-50 last:border-0">
                                    <ArrowRight size={14} className="text-[#0054A6] mt-1 shrink-0" />
                                    <span className="text-[13px] lg:text-[14px] text-gray-600 font-semibold leading-snug">{goal}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 5. OBLIGATIONS */}
                <div className="mb-16 lg:mb-24">
                    <div className="bg-[#1a2e44] rounded-[32px] lg:rounded-[48px] p-6 lg:p-20 text-white relative overflow-hidden shadow-2xl">
                        <Activity className="absolute -right-20 -top-20 opacity-5" size={400} />
                        <h2 className="text-xl lg:text-4xl font-semibold mb-10 lg:mb-16 tracking-tight text-center lg:text-left italic relative z-10">{t.obligationsHeader}</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 relative z-10">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl w-fit">
                                    <Briefcase className="text-[#0054A6]" size={20} />
                                    <h4 className="text-sm lg:text-lg font-bold uppercase tracking-wider">{t.mgmtTitle}</h4>
                                </div>
                                <ul className="space-y-4">
                                    {t.mgmtList.map((item, i) => (
                                        <li key={i} className="text-gray-300 font-medium text-xs lg:text-sm leading-relaxed border-l-2 border-white/10 pl-4 hover:border-[#0054A6] transition-all">{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl w-fit">
                                    <Users className="text-[#0054A6]" size={20} />
                                    <h4 className="text-sm lg:text-lg font-bold uppercase tracking-wider">{t.staffTitle}</h4>
                                </div>
                                <ul className="space-y-4">
                                    {t.staffList.map((item, i) => (
                                        <li key={i} className="text-gray-300 font-medium text-xs lg:text-sm leading-relaxed border-l-2 border-white/10 pl-4 hover:border-[#0054A6] transition-all">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 6. CERTIFICATES */}
                <section id="certificates" className="scroll-mt-28">
                    <div className="flex flex-col items-center text-center mb-10 lg:mb-16">
                        <h3 className="text-2xl lg:text-4xl font-semibold text-[#1a2e44] italic">{t.certsTitle}</h3>
                        <div className="w-12 lg:w-16 h-1 bg-[#0054A6] mt-4 lg:mt-6 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
                        {certificateImages.map((img, i) => (
                            <motion.div
                                key={i} whileHover={{ y: -5 }} onClick={() => setSelectedCert(img)}
                                className="relative group cursor-pointer rounded-[24px] lg:rounded-[32px] overflow-hidden shadow-lg bg-white border-4 lg:border-8 border-white aspect-[1/1.4]"
                            >
                                <img src={img} className="w-full h-full object-cover" alt="Certificate" />
                                <div className="absolute inset-0 bg-[#0054A6]/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                    <div className="bg-white/90 p-3 lg:p-4 rounded-full text-[#0054A6] shadow-xl"><ZoomIn size={24} /></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            {/* LIGHTBOX MODAL WITH SMART ZOOM */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => { setSelectedCert(null); setIsZoomed(false); }}
                        className="fixed inset-0 z-[9999] bg-[#0a1425]/95 backdrop-blur-xl flex items-center justify-center p-4 lg:p-10 cursor-zoom-out"
                    >
                        <button 
                            className="absolute top-5 right-5 lg:top-10 lg:right-10 text-white/50 hover:text-white transition-all z-[10000]"
                            onClick={() => { setSelectedCert(null); setIsZoomed(false); }}
                        >
                            <X size={32} lg:size={48} />
                        </button>
                        
                        <div className="relative overflow-hidden flex items-center justify-center max-w-full max-h-full">
                            <motion.img
                                ref={imgRef}
                                initial={{ scale: 0.9, y: 20 }} 
                                animate={{ 
                                    scale: isZoomed ? 2.5 : 1,
                                    transformOrigin: zoomOrigin,
                                    y: 0,
                                    cursor: isZoomed ? 'zoom-out' : 'zoom-in'
                                }} 
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                src={selectedCert}
                                onClick={handleImageClick}
                                className="max-w-full max-h-[85vh] lg:max-h-[90vh] object-contain shadow-2xl rounded-lg select-none"
                                alt="Full Certificate"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QualityManagement;