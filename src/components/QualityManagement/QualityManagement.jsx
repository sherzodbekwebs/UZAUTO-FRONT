import React, { useEffect, useState } from 'react';
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
        visionTitle: "ВИДЕНИЕ",
        visionText: "Наша продукция - самая узнаваемая в Центральной Азии и СНГ.",
        missionTitle: "МИССИЯ",
        missionText: "Укрепление позиций на рынках соседних стран путём продвижения доступной, надёжной и качественной прицепной и навесной техники для большегрузных автотранспортных средств.",
        valuesTitle: "ЦЕННОСТИ, КОТОРЫЕ НАС ОБЪЕДИНЯЮТ",
        value1: { t: "Потребители", d: "удовлетворенность потребителя на первом месте." },
        value2: { t: "Заинтересованные стороны", d: "уважение личных прав и интересов наших сотрудников, требований клиентов, условий взаимодействия, выдвигаемых деловыми партнерами и обществом." },
        value3: { t: "Мотивация персонала", d: "справедливость, предполагающая оплату труда в соответствии с достигнутыми результатами и равные условия для профессионального роста." },
        introText1: "ООО “UzAutoTrailer” является динамично развивающимся предприятием в области производства прицепной и навесной техники для большегрузных автотранспортных средств, коммерческих автотранспортных средств.",
        introText2: "Политика в области качества ООО “UzAutoTrailer” (далее - Предприятие) направлена на постоянное повышение степени удовлетворенности потребителей качеством поставляемой продукции, которая обеспечивается применением передовых технологий производства, современных методов управления с использованием совершенной инфраструктуры и квалифицированного персонала.",
        introText3: "Предприятие, являясь передовым производителем, ставит своей целью обеспечить потребности внутреннего и внешнего рынка так, чтобы соотношение цены и качества удовлетворяло как можно большее число потребителей.",
        scopeText: "Областью применения системы менеджмента качества является: проектирование, производство и реализация прицепной и навесной техники для большегрузных автотранспортных средств.",
        goalsIntro: "В целях повышения конкурентоспособности Предприятия руководство определило необходимость развития следующих направлений деятельности:",
        goals: [
            "Проектирование и освоение производства новых видов продукции;",
            "Применение передового технологического оборудования для улучшения качества и экономии ресурсов;",
            "Расширение рынков сбыта и увеличение объемов реализации продукции;",
            "Постоянное совершенствование системы менеджмента качества;",
            "Повышение квалификации персонала и обеспечение условий для плодотворного труда;",
            "Совершенствование инфраструктуры;",
            "Поэтапное снижение себестоимости продукции без ущерба качеству."
        ],
        obligationsHeader: "ПОЛИТИКА ПРЕДПРИЯТИЯ В ОБЛАСТИ КАЧЕСТВА ОБЯЗЫВАЕТ:",
        mgmtTitle: "Руководителей всех структурных подразделений:",
        mgmtList: [
            "руководствоваться в своей деятельности требованиями настоящей Политики;",
            "обеспечить ее понимание и практическую реализацию всеми работниками;",
            "создавать необходимые условия для качественного выполнения работ."
        ],
        staffTitle: "Каждого работника Предприятия:",
        staffList: [
            "понимать требования настоящей политики;",
            "выполнять все требования законодательства и стандарта ISO 9001:2015;",
            "проявлять творческую инициативу и добиваться устранения любых причин, препятствующих качеству."
        ],
        certsTitle: "Сертификация и стандарты"
    },
    uz: {
        heroTitle: "Sifat menejmenti tizimi",
        visionTitle: "ISTIQBOL (VISION)",
        visionText: "Mahsulotlarimiz Markaziy Osiyo va MDHda eng taniqli bo'lishi.",
        missionTitle: "MISSIYA",
        missionText: "Og'ir yuk avtotransport vositalari uchun hamyonbop, ishonchli va yuqori sifatli tirkama hamda osma texnikalarni ilgari surish orqali qo'shni davlatlar bozorida o'rnimizni mustahkamlash.",
        valuesTitle: "BIZNI BIRLASHTIRUVCHI QADRIYATLAR",
        value1: { t: "Iste'molchilar", d: "iste'molchi mamnuniyati biz uchun birinchi o'rinda." },
        value2: { t: "Manfaatdor tomonlar", d: "xodimlarimizning shaxsiy huquqlari va manfaatlarini, mijozlar talablarini, hamkorlar va jamiyat tomonidan qo'yiladigan o'zaro hamkorlik shartlarini hurmat qilish." },
        value3: { t: "Xodimlarni rag'batlantirish", d: "erishilgan natijalarga muvofiq mehnatga haq to'lash va professional o'sish uchun teng sharoitlarni nazarda tutuvchi adolat." },
        introText1: "“UzAutoTrailer” MCHJ og'ir yuk avtotransport vositalari, tijorat avtotransport vositalari uchun tirkama va osma texnikalar ishlab chiqarish sohasida jadal rivojlanayotgan korxonadir.",
        introText2: "“UzAutoTrailer” MCHJning sifat sohasidagi siyosati ilg'or ishlab chiqarish texnologiyalarini va zamonaviy boshqaruv usullarini qo'llash orqali mahsulotlar sifati bo'yicha iste'molchilarning mamnunlik darajasini doimiy ravishva oshirishga qaratilgan.",
        introText3: "Korxona yetakchi ishlab chiqaruvchi sifatida narx va sifat mutanosibligi imkon qadar ko'proq iste'molchilarni qoniqtiradigan darajada ichki va tashqi bozor ehtiyojlarini ta'minlashni maqsad qilgan.",
        scopeText: "Sifat menejmenti tizimini qo'llash sohasi: og'ir yuk avtotransport vositalari uchun tirkama va osma texnikalarni loyihalash, ishlab chiqarish va realizatsiya qilish.",
        goalsIntro: "Korxonaning raqobatbardoshligini oshirish maqsadida rahbariyat quyidagi yo'nalishlarni rivojlantirish zarurligini belgiladi:",
        goals: [
            "Mahsulotlarning yangi turlarini loyihalash va ishlab chiqarishni o'zlashtirish;",
            "Sifatni yaxshilash va resurslardan tejamkor foydalanish uchun ilg'or uskunalarni qo'llash;",
            "Sotish bozorlarini kengaytirish va mahsulot ishlab chiqarish hajmini oshirish;",
            "Sifat menejmenti tizimini doimiy ravishda takomillashtirish;",
            "Xodimlarning malakasini oshirish va samarali mehnat uchun sharoitlarni ta'minlash;",
            "Infratuzilmani takomillashtirish;",
            "Sifatga zarar yetkazmagan holda mahsulot tannarxini bosqichma-bosqich pasaytirish."
        ],
        obligationsHeader: "KORXONANING SIFAT SOHASIDAGI SIYOSATI QUYIDAGILARNI MAJBURLAYDI:",
        mgmtTitle: "Barcha tarkibiy bo'linmalar rahbarlarini:",
        mgmtList: [
            "O'z faoliyatida ushbu Siyosat talablariga amal qilish;",
            "Barcha xodimlar tomonidan uning tushunilishi va amaliyotga joriy etilishini ta'minlash;",
            "Ishlarni sifatli bajarish uchun zarur sharoitlarni yaratish."
        ],
        staffTitle: "Korxonaning har bir xodimini:",
        staffList: [
            "Ushbu siyosat talablarini tushunish;",
            "Qonunchilik va ISO 9001:2015 standarti talablarini bajarish;",
            "Sifatga to'sqinlik qiluvchi har qanday sabablarni bartaraf etishda tashabbus ko'rsatish."
        ],
        certsTitle: "Sertifikatlash va standartlar"
    },
    en: {
        heroTitle: "Quality Management System",
        visionTitle: "VISION",
        visionText: "Our products are the most recognizable in Central Asia and the CIS.",
        missionTitle: "MISSION",
        missionText: "Strengthening positions in the markets of neighboring countries by promoting affordable, reliable, and high-quality trailer and mounted equipment for heavy-duty vehicles.",
        valuesTitle: "VALUES THAT UNITE US",
        value1: { t: "Consumers", d: "customer satisfaction is our top priority." },
        value2: { t: "Stakeholders", d: "respect for the personal rights and interests of our employees, customer requirements, and interaction conditions set by business partners and society." },
        value3: { t: "Staff Motivation", d: "fairness, implying remuneration in accordance with the results achieved and equal conditions for professional growth." },
        introText1: "UzAutoTrailer LLC is a dynamically developing enterprise in the field of production of trailer and mounted equipment for heavy-duty and commercial vehicles.",
        introText2: "The quality policy of UzAutoTrailer LLC is aimed at constantly increasing the level of consumer satisfaction through advanced production technologies and modern management methods.",
        introText3: "The Enterprise, as a leading manufacturer, aims to meet the needs of the domestic and foreign markets so that the price-quality ratio satisfies the widest range of consumers.",
        scopeText: "The scope of the quality management system includes: design, production, and sale of trailer and mounted equipment for heavy-duty vehicles.",
        goalsIntro: "In order to increase the competitiveness of the Enterprise, the management has identified the following areas of activity:",
        goals: [
            "Design and development of new product types;",
            "Application of advanced technological equipment to improve quality and optimize resources;",
            "Expansion of sales markets and increase in production and sales volumes;",
            "Continuous improvement of the quality management system;",
            "Enhancing staff qualifications and providing conditions for fruitful labor;",
            "Infrastructure improvement;",
            "Phased reduction of production costs without compromising product quality."
        ],
        obligationsHeader: "THE COMPANY'S QUALITY POLICY OBLIGATES:",
        mgmtTitle: "Heads of all structural units:",
        mgmtList: [
            "to be guided in their activities by the requirements of this Policy;",
            "to ensure its understanding and practical implementation by all employees;",
            "to create the necessary conditions for high-quality performance of work."
        ],
        staffTitle: "Every employee of the Enterprise:",
        staffList: [
            "to understand the requirements of this policy;",
            "to comply with all requirements imposed by legislation and ISO 9001:2015 standard;",
            "to show creative initiative and strive to eliminate any causes preventing quality work."
        ],
        certsTitle: "Certification and Standards"
    }
};

const certificateImages = [sertificat1, sertificat2, sertificat3];

const QualityManagement = ({ lang = 'ru' }) => {
    const t = translations[lang] || translations.ru;
    const [selectedCert, setSelectedCert] = useState(null);
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [hash]);

    return (
        <div className="pt-24 bg-[#F8FAFC] font-inter overflow-hidden min-h-screen">

            {/* 1. MINIMALIST HERO */}
            <section className="relative h-[400px] flex items-center bg-[#0a1425] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a1425] via-transparent to-[#0a1425] z-10"></div>
                <motion.img
                    initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 0.4 }} transition={{ duration: 1.5 }}
                    src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Quality Background"
                />
                <div className="relative z-20 max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                        <span className="text-[#0054A6] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">UzAuto Trailer Standards</span>
                        <h1 className="text-4xl lg:text-6xl font-semibold text-white tracking-tighter max-w-3xl leading-tight italic">
                            {t.heroTitle}
                        </h1>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 -mt-16 relative z-30 pb-32">

                {/* 2. STRATEGIC DASHBOARD - id: quality-vision */}
                <div id="quality-vision" className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 scroll-mt-28">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="lg:col-span-5 bg-[#0054A6] rounded-[32px] p-10 text-white shadow-2xl relative overflow-hidden group"
                    >
                        <Target className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700" size={240} />
                        <h4 className="text-[10px] font-black tracking-[0.3em] opacity-70 mb-8 uppercase">{t.visionTitle}</h4>
                        <p className="text-2xl lg:text-3xl font-semibold leading-tight">{t.visionText}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="lg:col-span-7 bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm relative overflow-hidden group"
                    >
                        <Globe className="absolute -right-10 -bottom-10 text-gray-50 opacity-50 group-hover:rotate-12 transition-transform duration-1000" size={240} />
                        <h4 className="text-[10px] font-black tracking-[0.3em] text-[#0054A6] mb-8 uppercase">{t.missionTitle}</h4>
                        <p className="text-xl lg:text-2xl font-semibold text-[#1a2e44] leading-relaxed relative z-10">{t.missionText}</p>
                    </motion.div>
                </div>

                {/* 3. CORPORATE VALUES */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {[
                        { ...t.value1, icon: Users, color: "bg-blue-50" },
                        { ...t.value2, icon: Heart, color: "bg-red-50" },
                        { ...t.value3, icon: Award, color: "bg-green-50" }
                    ].map((val, i) => (
                        <motion.div
                            key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className={`w-14 h-14 ${val.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                <val.icon className="text-[#0054A6]" size={28} strokeWidth={1.5} />
                            </div>
                            <h4 className="text-lg font-bold text-[#1a2e44] mb-4">{val.t}</h4>
                            <p className="text-gray-500 text-sm font-medium leading-relaxed">{val.d}</p>
                        </motion.div>
                    ))}
                </div>

                {/* 4. OFFICIAL POLICY CONTENT - id: quality-policy */}
                <div id="quality-policy" className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 items-start scroll-mt-28">
                    <div className="lg:col-span-7 space-y-12">
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="relative">
                            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-[#0054A6] rounded-full" />
                            <p className="text-xl lg:text-2xl font-semibold text-[#1a2e44] leading-relaxed">
                                {t.introText1}
                            </p>
                        </motion.div>

                        <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-medium text-justify">
                            <p>{t.introText2}</p>
                            <p>{t.introText3}</p>
                            <div className="flex items-center gap-4 p-6 bg-[#0054A6]/5 rounded-2xl border border-[#0054A6]/10">
                                <ShieldCheck className="text-[#0054A6] shrink-0" size={24} />
                                <span className="font-bold text-[#1a2e44] text-sm italic">{t.scopeText}</span>
                            </div>
                        </div>
                    </div>

                    {/* Operational Directions */}
                    <div className="lg:col-span-5 bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
                        <h4 className="text-xs font-black tracking-[0.2em] text-gray-400 mb-8 uppercase">{t.directionsTitle}</h4>
                        <div className="space-y-4">
                            {t.goals.map((goal, i) => (
                                <motion.div key={i} whileHover={{ x: 5 }} className="flex gap-4 items-start py-3 border-b border-gray-50 last:border-0 group">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-[#0054A6] transition-colors">
                                        <ArrowRight size={12} className="text-[#0054A6] group-hover:text-white" />
                                    </div>
                                    <span className="text-[14px] text-gray-600 font-semibold leading-snug">{goal}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 5. OBLIGATIONS */}
                <div className="mb-24">
                    <div className="bg-[#1a2e44] rounded-[48px] p-8 lg:p-20 text-white relative overflow-hidden">
                        <Activity className="absolute -right-20 -top-20 opacity-5 text-white" size={600} />
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-2xl lg:text-4xl font-semibold mb-16 tracking-tight text-center lg:text-left italic relative z-10"
                        >
                            {t.obligationsHeader}
                        </motion.h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
                            {/* Management */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl w-fit">
                                    <Briefcase className="text-[#0054A6]" size={24} />
                                    <h4 className="text-lg font-bold uppercase tracking-wider">{t.mgmtTitle}</h4>
                                </div>
                                <ul className="space-y-6 pl-2">
                                    {t.mgmtList.map((item, i) => (
                                        <li key={i} className="flex gap-4 text-gray-300 font-medium text-sm leading-relaxed border-l border-white/10 pl-6 hover:border-[#0054A6] transition-all">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Personnel */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl w-fit">
                                    <Users className="text-[#0054A6]" size={24} />
                                    <h4 className="text-lg font-bold uppercase tracking-wider">{t.staffTitle}</h4>
                                </div>
                                <ul className="space-y-6 pl-2">
                                    {t.staffList.map((item, i) => (
                                        <li key={i} className="flex gap-4 text-gray-300 font-medium text-sm leading-relaxed border-l border-white/10 pl-6 hover:border-[#0054A6] transition-all">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 6. VERIFIED CERTIFICATES - id: certificates */}
                <section id="certificates" className="scroll-mt-28">
                    <div className="flex flex-col items-center text-center mb-16">
                        <h3 className="text-2xl lg:text-4xl font-semibold text-[#1a2e44] tracking-tight italic">{t.certsTitle}</h3>
                        <div className="w-16 h-1 bg-[#0054A6] mt-6 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {certificateImages.map((img, i) => (
                            <motion.div
                                key={i} whileHover={{ y: -10 }} onClick={() => setSelectedCert(img)}
                                className="relative group cursor-pointer rounded-[32px] overflow-hidden shadow-lg bg-white border-8 border-white aspect-[1/1.4]"
                            >
                                <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Certificate" />
                                <div className="absolute inset-0 bg-[#0054A6]/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                    <div className="bg-white/90 backdrop-blur-md p-4 rounded-full text-[#0054A6] shadow-xl transform scale-50 group-hover:scale-100 transition-all duration-500">
                                        <ZoomIn size={32} />
                                    </div>
                                </div>
                                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-white/50 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    <span className="text-[10px] font-black text-[#0054A6] uppercase tracking-widest flex items-center gap-2">
                                        <FileCheck size={14} /> ISO Certified Document
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            {/* LIGHTBOX */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedCert(null)}
                        className="fixed inset-0 z-[500] bg-[#0a1425]/95 backdrop-blur-xl flex items-center justify-center p-6 cursor-zoom-out"
                    >
                        <motion.button
                            className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors"
                            whileHover={{ rotate: 90 }}
                        >
                            <X size={48} strokeWidth={1} />
                        </motion.button>
                        <motion.img
                            initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0 }}
                            src={selectedCert}
                            className="max-w-full max-h-[90vh] object-contain shadow-[0_50px_100px_rgba(0,0,0,0.5)] rounded-lg"
                            alt="Full Certificate"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QualityManagement;