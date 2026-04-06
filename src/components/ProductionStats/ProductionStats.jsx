import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import buildingImg from '../../../public/bgcompany.png';

const translations = {
    ru: {
        title: "ПРОИЗВОДСТВЕННЫЕ ПОКАЗАТЕЛИ",
        stats: [
            { label: "Большегрузные автомобили", value: 4647 },
            { label: "Полуприцепы", value: 4958 },
            { label: "Прицепы", value: 719 },
            { label: "Надстройки для шасси", value: 5932 },
            { label: "Собственные конструкторские разработки", value: 500 },
        ]
    },
    uz: {
        title: "ISHLAB CHIQARISH KO'RSATKICHLARI",
        stats: [
            { label: "Og'ir yuk avtomobillari", value: 4647 },
            { label: "Yarim tirkamalar", value: 4958 },
            { label: "Tirkamalar", value: 719 },
            { label: "Shassi ustqurmalari", value: 5932 },
            { label: "O'zimizning loyihalar", value: 500 },
        ]
    },
    en: {
        title: "PRODUCTION PERFORMANCE",
        stats: [
            { label: "Heavy Duty Trucks", value: 4647 },
            { label: "Semi-trailers", value: 4958 },
            { label: "Trailers", value: 719 },
            { label: "Chassis Superstructures", value: 5932 },
            { label: "In-house Developments", value: 500 },
        ]
    }
};

const Counter = ({ value }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const end = parseInt(value);
        let duration = 2000;
        let counter = setInterval(() => {
            start += Math.ceil(end / 50);
            if (start > end) {
                setCount(end);
                clearInterval(counter);
            } else {
                setCount(start);
            }
        }, duration / 50);
        return () => clearInterval(counter);
    }, [value]);
    return <span>{count.toLocaleString()}</span>;
};

const ProductionStats = ({ lang = 'ru' }) => {
    const t = translations[lang] || translations.ru;

    return (
        <section id="stats-section" className="relative w-full py-32 overflow-hidden bg-[#F8FAFC]">
            {/* Background Image - Yorug' va xira qilingan */}
            <div className="absolute inset-0 z-0">
                <img
                    src={buildingImg}
                    className="w-full h-full object-cover opacity-20 "
                    alt="UzAuto Trailer Factory"
                />
                <div className="absolute inset-0 bg-gradient-to-b " />
            </div>

            <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-16">

                {/* Minimalist Title */}
                <div className="mb-20 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-center lg:justify-start gap-4 mb-4"
                    >
                        <div className="w-12 h-[2px] bg-[#0054A6]" />
                        {/* font-bold -> font-semibold */}
                        <span className="text-[#0054A6] font-semibold tracking-[0.3em] text-[10px] uppercase">
                            UzAuto Trailer Statistics
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#1a2e44] text-3xl lg:text-5xl font-semibold tracking-tighter"
                    >
                        {t.title}
                    </motion.h2>
                </div>

                {/* Stats Grid - Yorug' va toza dizayn */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8">
                    {t.stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col border-l border-gray-200 pl-8 hover:border-[#0054A6] transition-all duration-500 group"
                        >
                            {/* font-black -> font-semibold */}
                            <div className="text-[#0054A6] text-4xl lg:text-5xl font-semibold mb-3 flex items-baseline gap-1 group-hover:scale-105 transition-transform origin-left">
                                <Counter value={stat.value} />
                                <span className="text-xl font-bold">+</span>
                            </div>
                            {/* font-bold -> font-medium */}
                            <p className="text-[#4b5563] text-xs lg:text-[13px] font-medium uppercase tracking-wider leading-snug max-w-[180px]">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductionStats;