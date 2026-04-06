import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Target,
    Eye,
    Heart,
    ShieldCheck,
    Zap,
    CheckCircle2,
    Users,
    Briefcase,
    ArrowRight
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const translations = {
    ru: {
        heroTitle: "Миссия, видение",
        visionTitle: "ВИДЕНИЕ",
        visionText: "Наша продукция – самая узнаваемая в Центральной Азии и СНГ.",
        missionTitle: "МИССИЯ",
        missionText: "Укрепление позиций на рынках соседних стран путём продвижения доступной, надёжной и качественной прицепной и навесной техники для большегрузных автотранспортных средств.",
        valuesTitle: "ЦЕННОСТИ, КОТОРЫЕ НАС ОБЪЕДИНЯЮТ",
        value1: { t: "Потребители", d: "удовлетворенность потребителя на первом месте." },
        value2: { t: "Заинтересованные стороны", d: "уважение личных прав и интересов наших сотрудников, требований клиентов, условий взаимодействия, выдвигаемых деловыми партнерами и обществом." },
        value3: { t: "Мотивация персонала", d: "справедливость, предполагающая оплату труда в соответствии с достигнутыми результатами и равные условия для профессионального роста." },
        introText1: "OОО “UzAutoTrailer” является динамично развивающимся предприятием в области производства прицепной и навесной техники для большегрузных автотранспортных средств, коммерческих автотранспортных средств.",
        introText2: "Политика в области качества ООО “UzAutoTrailer” (далее – Предприятие) направлена на постоянное повышение степени удовлетворенности потребителей качеством поставляемой продукции, которая обеспечивается применением передовых технологий производства, современных методов управления с использованием совершенной инфраструктуры и квалифицированного персонала.",
        introText3: "Предприятие, являясь передовым по производству техники, ставит своей целью обеспечить потребности внутреннего и внешнего рынка так, чтобы соотношение цены и качества удовлетворяло как можно большее число потребителей.",
        scopeText: "Областью применения системы менеджмента качества является: проектирование, производство и реализация прицепной и навесной техники для большегрузных автотранспортных средств.",
        directionsIntro: "В целях повышения конкурентоспособности Предприятия, для удовлетворения постоянно растущих запросов потребителей посредством достижения высокой результативности и эффективности всех процессов ее деятельности, обеспечивающих высокое качество продукции на основе непрерывного целевого планирования, их выполнения, оценки результативности и дальнейших действий по улучшению, руководство Предприятия определило необходимость развития следующих направлений деятельности:",
        directions: [
            "проектирование и освоение производства новых видов продукции;",
            "применение передового технологического оборудования в целях улучшения качества продукции, экономного использования сырьевых и энергетических ресурсов, а также для повышения производительности труда;",
            "расширение рынков сбыта и увеличение объемов реализации и производства продукции;",
            "постоянное совершенствование системы менеджмента качества;",
            "постоянное повышение квалификации персонала и обеспечение соответствующими условиями для их плодотворного труда;",
            "совершенствование инфраструктуры;",
            "поэтапное снижение себестоимости продукции без ущерба качеству производимой продукции."
        ],
        obligationsIntro: "В целях реализации основных направлений развития, высшее руководство Предприятия берет на себя следующие обязательства:",
        obligations: [
            "обеспечить выполнение требований нормативно-правовых актов Республики Узбекистан и международных стандартов;",
            "постоянно повышать результативность и эффективность системы менеджмента качества;",
            "довести до сведения всего персонала основные положения данной политики и требования потребителей;",
            "проводить регулярный анализ функционирования системы менеджмента качества в целях ее улучшения;",
            "анализировать политику и цели в области качества на предмет их постоянной пригодности;",
            "обеспечить ресурсами, необходимые для производства качественной продукции и постоянного развития Предприятия."
        ],
        policyObligationsHeader: "Политика Предприятия в области качества обязывает:",
        mgmtTitle: "Руководителей всех структурных подразделений:",
        mgmtList: [
            "руководствоваться в своей деятельности требованиями настоящей Политики, обеспечить ее понимание и практическую реализацию всеми работниками подразделений;",
            "создавать необходимые условия для качественного выполнения работ и повышения эффективности труда."
        ],
        staffTitle: "Каждого работника Предприятия:",
        staffList: [
            "понимать требования настоящей политики;",
            "выполнять все требования, предъявляемые законодательством, потребителями, стандартом ISO 9001:2015 и руководителями подразделений;",
            "проявлять творческую инициативу, давать предложения по развитию и добиваться устранения обстоятельств, препятствующих качеству."
        ]
    },
    uz: {
        heroTitle: "Missiya va strategiya",
        visionTitle: "ISTIQBOL (VISION)",
        visionText: "Mahsulotlarimiz Markaziy Osiyo va MDHda eng taniqli bo'lishi.",
        missionTitle: "MISSIYA",
        missionText: "Og'ir yuk avtotransport vositalari uchun hamyonbop, ishonchli va yuqori sifatli tirkama hamda osma texnikalarni ilgari surish orqali qo'shni davlatlar bozorida o'rnimizni mustahkamlash.",
        valuesTitle: "BIZNI BIRLASHTIRUVCHI QADRIYATLAR",
        value1: { t: "Iste'molchilar", d: "iste'molchi mamnuniyati biz uchun birinchi o'rinda." },
        value2: { t: "Manfaatdor tomonlar", d: "xodimlarimizning shaxsiy huquqlari va manfaatlarini, mijozlar talablarini, hamkorlar va jamiyat tomonidan qo'yiladigan hamkorlik shartlarini hurmat qilish." },
        value3: { t: "Xodimlarni rag'batlantirish", d: "erishilgan natijalarga muvofiq mehnatga haq to'lash va professional o'sish uchun teng sharoitlar." },
        introText1: "OОО “UzAutoTrailer” og'ir yuk avtotransport vositalari va tijorat avtotransport vositalari uchun tirkama va osma texnikalar ishlab chiqarish sohasida jadal rivojlanayotgan korxonadir.",
        introText2: "“UzAutoTrailer” MCHJning sifat sohasidagi siyosati ilg'or ishlab chiqarish texnologiyalarini va zamonaviy boshqaruv usullarini qo'llash orqali mahsulotlar sifati bo'yicha iste'molchilarning mamnunlik darajasini doimiy ravishda oshirishga qaratilgan.",
        introText3: "Korxona yetakchi ishlab chiqaruvchi sifatida narx va sifat mutanosibligi imkon qadar ko'proq iste'molchilarni qoniqtiradigan darajada ichki va tashqi bozor ehtiyojlarini ta'minlashni maqsad qilgan.",
        scopeText: "Sifat menejmenti tizimining qo'llanilish sohasi: og'ir yuk avtotransport vositalari uchun tirkama va osma texnikalarni loyihalash, ishlab chiqarish va realizatsiya qilish.",
        directionsIntro: "Korxonaning raqobatbardoshligini oshirish, iste'molchilarning doimiy o'sib borayotgan so'rovlarini qondirish maqsadida, uzluksiz maqsadli rejalashtirish va takomillashtirish orqali mahsulotning yuqori sifatini ta'minlash uchun Korxona rahbariyati quyidagi faoliyat yo'nalishlarini belgiladi:",
        directions: [
            "mahsulotlarning yangi turlarini loyihalash va ishlab chiqarishni o'zlashtirish;",
            "mahsulot sifatini yaxshilash va resurslardan tejamkor foydalanish uchun ilg'or texnologik uskunalarni qo'llash;",
            "sotish bozorlarini kengaytirish va ishlab chiqarish hamda sotish hajmini oshirish;",
            "sifat menejmenti tizimini doimiy ravishda takomillashtirish;",
            "xodimlarning malakasini doimiy ravishda oshirish va samarali mehnat uchun tegishli sharoitlarni ta'minlash;",
            "infratuzilmani takomillashtirish;",
            "ishlab chiqarilayotgan mahsulot sifatiga zarar yetkazmagan holda mahsulot tannarxini bosqichma-bosqich pasaytirish."
        ],
        obligationsIntro: "Rivojlanishning asosiy yo'nalishlarini amalga oshirish maqsadida, Korxonaning yuqori rahbariyati quyidagi majburiyatlarni o'z zimmasiga oladi:",
        obligations: [
            "O'zbekiston Respublikasi qonunchiligi va xalqaro standartlar talablariga rioya etishni ta'minlash;",
            "sifat menejmenti tizimining natijadorligi va samaradorligini doimiy ravishda oshirish;",
            "barcha xodimlarga ushbu siyosat va iste'molchilar talablarini yetkazish;",
            "sifat menejmenti tizimi faoliyatini muntazam tahlil qilib borish;",
            "sifat sohasidagi siyosat va maqsadlarning doimiy yaroqliligini tahlil qilish;",
            "sifatli mahsulot ishlab chiqarish va Korxonaning rivojlanishi uchun zarur resurslar bilan ta'minlash."
        ],
        policyObligationsHeader: "Korxonaning sifat sohasidagi siyosati quyidagilarni majbur qiladi:",
        mgmtTitle: "Barcha tarkibiy bo'linmalar rahbarlarini:",
        mgmtList: [
            "o'z faoliyatida ushbu Siyosat talablariga amal qilish va uni amaliyotga joriy etishni ta'minlash;",
            "ishlarni sifatli bajarish va mehnat samaradorligini oshirish uchun zarur sharoitlarni yaratish."
        ],
        staffTitle: "Korxonaning har bir xodimini:",
        staffList: [
            "ushbu siyosat talablarini tushunish;",
            "qonunchilik, iste'molchilar, ISO 9001:2015 standarti va rahbarlar tomonidan qo'yiladigan talablarni bajarish;",
            "ijodiy tashabbus ko'rsatish va sifatga to'sqinlik qiluvchi har qanday sabablarni bartaraf etish."
        ]
    },
    en: {
        heroTitle: "Mission & Vision",
        visionTitle: "VISION",
        visionText: "Our products are the most recognizable in Central Asia and the CIS.",
        missionTitle: "MISSION",
        missionText: "Strengthening positions in the markets of neighboring countries by promoting affordable, reliable, and high-quality trailer and mounted equipment for heavy-duty vehicles.",
        valuesTitle: "VALUES THAT UNITE US",
        value1: { t: "Consumers", d: "customer satisfaction is our top priority." },
        value2: { t: "Stakeholders", d: "respect for the personal rights and interests of our employees, customer requirements, and interaction conditions set by partners." },
        value3: { t: "Staff Motivation", d: "fairness, implying remuneration in accordance with the results achieved and equal conditions for professional growth." },
        introText1: "UzAutoTrailer LLC is a dynamically developing enterprise in the field of production of trailer and mounted equipment for heavy-duty and commercial vehicles.",
        introText2: "The quality policy of UzAutoTrailer LLC (hereinafter - the Enterprise) is aimed at constantly increasing the level of consumer satisfaction with the quality of supplied products, ensured by advanced technologies and modern management methods.",
        introText3: "The Enterprise, as a leading manufacturer, aims to meet the needs of the domestic and foreign markets in such a way that the price-quality ratio satisfies the widest range of consumers.",
        scopeText: "The scope of the quality management system includes: design, production, and sale of trailer and mounted equipment for heavy-duty vehicles.",
        directionsIntro: "In order to increase the competitiveness of the Enterprise, to satisfy the growing demands of consumers by achieving high performance of all its processes based on continuous planning and improvement, the management has determined the following development areas:",
        directions: [
            "design and development of new product types;",
            "application of advanced technological equipment to improve quality and save resources;",
            "expansion of sales markets and increase in production and sales volumes;",
            "continuous improvement of the quality management system;",
            "enhancing staff qualifications and providing conditions for fruitful labor;",
            "infrastructure improvement;",
            "phased reduction of production costs without compromising product quality."
        ],
        obligationsIntro: "To implement the main development goals, the senior management of the Enterprise takes the following obligations:",
        obligations: [
            "ensure compliance with laws and international standards defining requirements for activities;",
            "constantly improve the effectiveness and efficiency of the QMS;",
            "inform all personnel about the main provisions of this policy and requirements;",
            "conduct regular analysis of the QMS functioning to improve it;",
            "analyze the suitability of quality policies and goals;",
            "provide resources necessary for quality production and constant development."
        ],
        policyObligationsHeader: "The Company's Quality Policy obligates:",
        mgmtTitle: "Heads of all structural units:",
        mgmtList: [
            "to be guided by the requirements of this Policy and ensure its implementation by all employees;",
            "to create necessary conditions for high-quality work and increased labor efficiency."
        ],
        staffTitle: "Every employee of the Enterprise:",
        staffList: [
            "to understand the requirements of this policy;",
            "to comply with legislation, ISO 9001:2015 standards, and heads of units;",
            "to show creative initiative and strive to eliminate factors preventing quality work."
        ]
    }
};

const MissionVision = ({ lang = 'ru' }) => {
    const t = translations[lang] || translations.ru;
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
        <div className="pt-24 bg-[#F8FAFC] font-inter overflow-hidden min-h-screen">

            {/* 1. HERO SECTION */}
            <section className="relative h-[400px] flex items-center justify-center bg-[#0a1425]">
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70 z-10"></div>
                <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000" className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Corporate" />
                <div className="relative z-20 text-center px-6">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl lg:text-6xl font-semibold text-white tracking-tighter uppercase italic">
                        {t.heroTitle}
                    </motion.h1>
                    <div className="w-20 h-1 bg-[#0054A6] mx-auto mt-6 rounded-full shadow-lg"></div>
                </div>
            </section>

            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-24 relative z-30">

                {/* 2. VISION & MISSION - id: mission-vision */}
                <div id="mission-vision" className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-32 scroll-mt-28">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-[#0054A6] text-white p-12 rounded-[40px] shadow-2xl relative overflow-hidden group">
                        <Eye className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-700" size={240} />
                        <h3 className="text-[10px] font-black tracking-[0.4em] mb-10 opacity-70 uppercase">{t.visionTitle}</h3>
                        <p className="text-2xl lg:text-4xl font-semibold leading-tight relative z-10 tracking-tight">{t.visionText}</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white border border-gray-100 p-12 rounded-[40px] shadow-sm relative overflow-hidden group">
                        <Target className="absolute -right-6 -bottom-6 text-gray-50 opacity-50 group-hover:scale-110 transition-transform duration-700" size={240} />
                        <h3 className="text-[10px] font-black tracking-[0.4em] text-[#0054A6] mb-10 uppercase">{t.missionTitle}</h3>
                        <p className="text-xl lg:text-3xl font-semibold text-[#1a2e44] leading-relaxed relative z-10 tracking-tight">{t.missionText}</p>
                    </motion.div>
                </div>

                {/* 3. VALUES */}
                <div className="mb-32">
                    <h3 className="text-center text-[11px] font-black tracking-[0.5em] text-gray-400 mb-20 uppercase">{t.valuesTitle}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { ...t.value1, icon: Users, color: "bg-blue-50" },
                            { ...t.value2, icon: Heart, color: "bg-red-50" },
                            { ...t.value3, icon: ShieldCheck, color: "bg-green-50" }
                        ].map((val, i) => (
                            <div key={i} className="text-center px-4">
                                <div className={`w-16 h-16 ${val.color} text-[#0054A6] rounded-2xl flex items-center justify-center mx-auto mb-8 transition-all hover:shadow-lg duration-300`}>
                                    <val.icon size={32} strokeWidth={1.5} />
                                </div>
                                <h4 className="text-xl font-bold text-[#1a2e44] mb-4 uppercase tracking-tighter">{val.t}</h4>
                                <p className="text-gray-500 font-medium leading-relaxed text-sm lg:text-base">{val.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. VERBATIM MAIN PROSE - id: quality-policy */}
                <div id="quality-policy" className="max-w-5xl mx-auto mb-32 scroll-mt-28 space-y-12">
                    <div className="bg-white p-10 lg:p-16 rounded-[48px] shadow-sm border border-gray-100">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-xl lg:text-2xl font-semibold text-[#1a2e44] leading-relaxed border-l-4 border-[#0054A6] pl-8 mb-12 italic">
                            {t.introText1}
                        </motion.p>
                        <div className="space-y-8 text-gray-600 text-lg lg:text-xl leading-relaxed text-justify font-medium">
                            <p>{t.introText2}</p>
                            <p>{t.introText3}</p>
                            <div className="flex items-center gap-5 p-8 bg-[#0a1425] text-white rounded-[32px] shadow-xl">
                                <Zap className="text-[#0054A6] shrink-0" size={32} />
                                <span className="font-bold text-sm lg:text-base tracking-wide uppercase">{t.scopeText}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. STRATEGIC DIRECTIONS - id: strategic-directions */}
                <div id="strategic-directions" className="max-w-6xl mx-auto mb-32 scroll-mt-28">
                    <div className="bg-blue-50/50 p-10 lg:p-14 rounded-[40px] border border-blue-100/50 mb-12">
                        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="text-lg lg:text-xl text-[#1a2e44] font-bold leading-relaxed text-justify italic">
                            {t.directionsIntro}
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                        {/* 5.1 Directions List */}
                        <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                            <h4 className="text-[11px] font-black tracking-[0.3em] text-[#0054A6] mb-10 uppercase">{lang === 'ru' ? 'Направления' : 'Yo\'nalishlar'}</h4>
                            <ul className="space-y-4">
                                {(t.directions || []).map((goal, i) => (
                                    <li key={i} className="flex gap-4 items-start p-4 bg-[#F8FAFC] rounded-2xl border border-transparent hover:border-blue-100 transition-all">
                                        <CheckCircle2 size={20} className="text-[#0054A6] shrink-0 mt-0.5" />
                                        <span className="text-[14px] lg:text-[15px] text-gray-600 font-semibold leading-snug">{goal}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 5.2 Senior Management Obligations */}
                        <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                            <h4 className="text-[11px] font-black tracking-[0.3em] text-[#0054A6] mb-10 uppercase">{lang === 'ru' ? 'Обязательства' : 'Majburiyatlar'}</h4>
                            <p className="text-gray-400 font-bold text-[13px] mb-6 uppercase tracking-tighter">{t.obligationsIntro}</p>
                            <ul className="space-y-4">
                                {(t.obligations || []).map((obl, i) => (
                                    <li key={i} className="flex gap-4 items-start p-4 bg-blue-50/30 rounded-2xl border border-transparent hover:border-blue-100 transition-all">
                                        <ArrowRight size={20} className="text-[#0054A6] shrink-0 mt-0.5" />
                                        <span className="text-[14px] lg:text-[15px] text-gray-600 font-semibold leading-snug">{obl}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 6. POLICY RULES - id: personal-responsibilities */}
                <div id="personal-responsibilities" className="scroll-mt-28">
                    <div className="flex flex-col items-center mb-16">
                        <h3 className="text-2xl lg:text-4xl font-semibold text-[#1a2e44] tracking-tight text-center">{t.policyObligationsHeader}</h3>
                        <div className="w-16 h-1 bg-[#0054A6] mt-6 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Leaders */}
                        <div className="bg-[#F8FAFC] p-10 rounded-[40px] border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-5 mb-10">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#0054A6] shadow-sm"><Briefcase size={28} /></div>
                                <h4 className="text-lg lg:text-xl font-bold text-[#1a2e44] tracking-tight">{t.mgmtTitle}</h4>
                            </div>
                            <ul className="space-y-6">
                                {(t.mgmtList || []).map((item, i) => (
                                    <li key={i} className="flex gap-4 text-gray-500 font-semibold text-sm lg:text-base leading-relaxed border-l-2 border-[#0054A6] pl-6 transition-all hover:bg-blue-50/50 py-2 rounded-r-xl">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Workers */}
                        <div className="bg-[#1a2e44] p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
                            <Users className="absolute -right-10 -bottom-10 opacity-5" size={300} />
                            <div className="flex items-center gap-5 mb-10 relative z-10">
                                <div className="w-14 h-14 bg-[#0054A6] rounded-2xl flex items-center justify-center text-white"><Users size={28} /></div>
                                <h4 className="text-lg lg:text-xl font-bold tracking-tight">{t.staffTitle}</h4>
                            </div>
                            <ul className="space-y-6 relative z-10">
                                {(t.staffList || []).map((item, i) => (
                                    <li key={i} className="flex gap-4 text-gray-300 font-semibold text-sm lg:text-base leading-relaxed border-l-2 border-white/20 pl-6 transition-all hover:bg-white/5 py-2 rounded-r-xl">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MissionVision;