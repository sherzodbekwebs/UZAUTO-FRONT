import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { PencilRuler, DraftingCompass, Lightbulb, MonitorCheck, Settings2, Users2, Trophy } from 'lucide-react';

const translations = {
    ru: {
        heroTitle: "Конструкторское бюро",
        breadcrumb: "Главная > Производство > КБ",
        intro: "Предприятие имеет собственное конструкторско-технологическое бюро, состоящее из высококвалифицированных специалистов, которые занимаются разработкой и модернизацией продукции.",
        features: [
            {
                t: "Инновации",
                d: "Разработка новых моделей прицепной и навесной техники с учетом специфики дорожных условий региона.",
                icon: Lightbulb
            },
            {
                t: "Модернизация",
                d: "Постоянное совершенствование существующих конструкций для повышения их грузоподъемности и долговечности.",
                icon: Settings2
            },
            {
                t: "САПР технологии",
                d: "Проектирование ведется с использованием современных систем автоматизированного проектирования (CAD/CAM).",
                icon: MonitorCheck
            },
            {
                t: "Индивидуальные заказы",
                d: "Проектирование нестандартной технологической оснастки по специфическим требованиям заказчиков.",
                icon: PencilRuler
            }
        ]
    },
    uz: {
        heroTitle: "Konstruktorlik byurosi",
        breadcrumb: "Bosh sahifa > Ishlab chiqarish > KB",
        intro: "Korxona o'zining konstruktorlik-texnologik byuroiga ega bo'lib, u mahsulotlarni ishlab chiqish va modernizatsiya qilish bilan shug'ullanadigan yuqori malakali mutaxassislardan iborat.",
        features: [
            {
                t: "Innovatsiyalar",
                d: "Mintaqaning yo'l sharoitlarini hisobga olgan holda tirkama va osma texnikalarning yangi modellarini ishlab chiqish.",
                icon: Lightbulb
            },
            {
                t: "Modernizatsiya",
                d: "Mavjud konstruksiyalarni ularning yuk ko'tarish qobiliyati va chidamliligini oshirish uchun doimiy takomillashtirish.",
                icon: Settings2
            },
            {
                t: "SAPR texnologiyalari",
                d: "Loyihalash zamonaviy avtomatlashtirilgan loyihalash tizimlari (CAD/CAM) yordamida amalga oshiriladi.",
                icon: MonitorCheck
            },
            {
                t: "Maxsus buyurtmalar",
                d: "Buyurtmachilarning o'ziga xos talablari asosida nostandart texnologik jihozlarni loyihalash.",
                icon: PencilRuler
            }
        ]
    },
    en: {
        heroTitle: "Design Bureau",
        breadcrumb: "Home > Production > R&D",
        intro: "The enterprise has its own design and technology bureau, consisting of highly qualified specialists involved in product development and modernization.",
        features: [
            {
                t: "Innovation",
                d: "Development of new trailer and mounted equipment models considering regional road conditions.",
                icon: Lightbulb
            },
            {
                t: "Modernization",
                d: "Continuous improvement of existing designs to increase payload capacity and durability.",
                icon: Settings2
            },
            {
                t: "CAD Technologies",
                d: "Designing using advanced computer-aided design (CAD/CAM) systems.",
                icon: MonitorCheck
            },
            {
                t: "Custom Solutions",
                d: "Engineering non-standard technological tools based on specific customer requirements.",
                icon: PencilRuler
            }
        ]
    }
};

const DesignBureau = ({ lang = 'ru' }) => {
    const t = translations[lang] || translations.ru;
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="pt-0 bg-[#F8FAFC] font-inter min-h-screen pb-20">
            <section className="relative h-[300px] lg:h-[400px] flex items-center bg-[#1a2e44] overflow-hidden">
                <DraftingCompass className="absolute -right-20 -bottom-20 opacity-5 text-white" size={500} />
                <div className="relative z-20 max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="text-[#0054A6] font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Engineering Excellence</span>
                        <h1 className="text-3xl lg:text-6xl font-semibold text-white italic uppercase tracking-tighter">{t.heroTitle}</h1>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-[1200px] mx-auto px-6 lg:px-12 -mt-12 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="lg:col-span-7 bg-white p-8 lg:p-12 rounded-[40px] shadow-xl border border-gray-100">
                        <h2 className="text-2xl lg:text-3xl font-bold text-[#1a2e44] mb-8 border-l-4 border-[#0054A6] pl-6 uppercase">Наша экспертиза</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-10 font-medium">{t.intro}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {t.features.map((f, i) => (
                                <div key={i} className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100">
                                    <f.icon className="text-[#0054A6] mb-4" size={24} />
                                    <h4 className="font-bold text-[#1a2e44] mb-2">{f.t}</h4>
                                    <p className="text-xs text-gray-500 font-medium leading-relaxed">{f.d}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="lg:col-span-5 space-y-6">
                        <div className="bg-[#0054A6] p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
                            <Users2 className="absolute -right-5 -bottom-5 opacity-10" size={150} />
                            <h3 className="text-2xl font-bold mb-4 italic">Команда</h3>
                            <p className="text-sm opacity-90 leading-relaxed font-medium">
                                В нашем бюро работают высококвалифицированные местные и зарубежные конструкторы и технологи с многолетним опытом в машиностроении.
                            </p>
                        </div>
                        <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-lg">
                            <Trophy className="text-[#0054A6] mb-6" size={40} />
                            <h3 className="text-xl font-bold text-[#1a2e44] mb-4 uppercase tracking-tight">Результат</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                Каждое техническое решение проходит многократные испытания и симуляции нагрузок перед запуском в серию.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default DesignBureau;