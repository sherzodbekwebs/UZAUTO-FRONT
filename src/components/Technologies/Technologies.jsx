import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Cpu, Settings, Drill, Layers, Scissors, ShieldCheck, Factory } from 'lucide-react';

const translations = {
    ru: {
        heroTitle: "Технологии и оборудование",
        breadcrumb: "Главная > Производство > Технологии",
        intro: "Производственный комплекс ООО «UzAuto Trailer» оснащен самым современным оборудованием от ведущих мировых производителей, что позволяет гарантировать идеальную точность и высокое качество каждой детали.",
        techList: [
            {
                title: "Плазменная резка (Messer, Германия)",
                desc: "Высокоточная резка металла на оборудовании мирового лидера Messer. Обеспечивает идеальный срез и минимальную деформацию материала.",
                icon: Zap
            },
            {
                title: "Лазерная резка (Ermaksan, Турция)",
                desc: "Использование лазерных технологий для раскроя сложных деталей с точностью до микрона.",
                icon: Scissors
            },
            {
                title: "Штамповка и гибка (Ermaksan, Турция)",
                desc: "Мощные прессы позволяют создавать сложные геометрические формы кузовов с высокой прочностью.",
                icon: Layers
            },
            {
                title: "Сварка (Fronius, Австрия)",
                desc: "Сварка в среде защитных газов на австрийском оборудовании Fronius обеспечивает максимально прочные и эстетичные швы.",
                icon: Factory
            },
            {
                title: "Окрасочный комплекс",
                desc: "Современные дробеструйные и окрасочно-сушильные камеры гарантируют долговечную защиту от коррозии.",
                icon: ShieldCheck
            }
        ]
    },
    uz: {
        heroTitle: "Texnologiyalar va uskunalar",
        breadcrumb: "Bosh sahifa > Ishlab chiqarish > Texnologiyalar",
        intro: "«UzAuto Trailer» MCHJ ishlab chiqarish majmuasi jahonning yetakchi ishlab chiqaruvchilarining eng zamonaviy uskunalari bilan jihozlangan bo'lib, bu har bir detalning ideal aniqligi va yuqori sifatini kafolatlaydi.",
        techList: [
            {
                title: "Plazmali kesish (Messer, Germaniya)",
                desc: "Messer uskunasida yuqori aniqlikdagi metall kesish. Ideal kesim va materialning minimal deformatsiyasini ta'minlaydi.",
                icon: Zap
            },
            {
                title: "Lazerli kesish (Ermaksan, Turkiya)",
                desc: "Murakkab detallarni mikron darajasidagi aniqlik bilan kesish uchun lazer texnologiyalaridan foydalanish.",
                icon: Scissors
            },
            {
                title: "Shtamplash va bukish (Ermaksan, Turkiya)",
                desc: "Kuchli presslar yuqori mustahkamlikka ega murakkab geometrik shakldagi kuzovlarni yaratishga imkon beradi.",
                icon: Layers
            },
            {
                title: "Payvandlash (Fronius, Avstriya)",
                desc: "Fronius uskunalarida himoya gazi muhitida payvandlash maksimal darajadagi mustahkam va estetik choklarni ta'minlaydi.",
                icon: Factory
            },
            {
                title: "Bo'yash majmuasi",
                desc: "Zamonaviy bo'yash va quritish kameralari korroziyadan uzoq muddatli himoyani kafolatlaydi.",
                icon: ShieldCheck
            }
        ]
    },
    en: {
        heroTitle: "Technologies & Equipment",
        breadcrumb: "Home > Production > Technologies",
        intro: "UzAuto Trailer's production complex is equipped with state-of-the-art machinery from world leaders, ensuring precision and top quality for every component.",
        techList: [
            {
                title: "Plasma Cutting (Messer, Germany)",
                desc: "High-precision metal cutting using Messer equipment, providing perfect edges and minimal material deformation.",
                icon: Zap
            },
            {
                title: "Laser Cutting (Ermaksan, Turkey)",
                desc: "Utilizing laser technology for micron-accurate cutting of complex components.",
                icon: Scissors
            },
            {
                title: "Stamping & Bending (Ermaksan, Turkey)",
                desc: "Powerful presses for forming complex and high-strength structural elements.",
                icon: Layers
            },
            {
                title: "Welding (Fronius, Austria)",
                desc: "Gas-shielded welding on Fronius equipment ensures maximum weld strength and aesthetic quality.",
                icon: Factory
            },
            {
                title: "Painting Complex",
                desc: "Modern shot-blasting and painting chambers guarantee long-lasting corrosion protection.",
                icon: ShieldCheck
            }
        ]
    }
};

const Technologies = ({ lang = 'ru' }) => {
    const t = translations[lang] || translations.ru;
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="pt-0 bg-[#F8FAFC] font-inter min-h-screen pb-20">
            <section className="relative h-[300px] lg:h-[400px] flex items-center bg-[#0a1425] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a1425] via-transparent to-[#0a1425] z-10"></div>
                <img src="https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=2000" className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale" alt="Tech" />
                <div className="relative z-20 max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                        <span className="text-[#0054A6] font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">{t.breadcrumb}</span>
                        <h1 className="text-3xl lg:text-6xl font-semibold text-white italic uppercase">{t.heroTitle}</h1>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-[1200px] mx-auto px-6 lg:px-12 -mt-12 relative z-30">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white p-8 lg:p-12 rounded-[40px] shadow-xl border border-gray-100 mb-12">
                    <p className="text-lg lg:text-2xl font-medium text-[#1a2e44] leading-relaxed text-center lg:text-justify italic">
                        {t.intro}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {t.techList.map((item, i) => (
                        <motion.div 
                            key={i} whileHover={{ y: -5 }}
                            className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex gap-6 items-start group"
                        >
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#0054A6] transition-colors duration-500">
                                <item.icon className="text-[#0054A6] group-hover:text-white" size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#1a2e44] mb-3">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm font-medium">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Technologies;