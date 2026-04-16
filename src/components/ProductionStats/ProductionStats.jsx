import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import buildingImg from '../../../public/bgcompany.png';
import API from '../../api/axios'; // API importi qo'shildi

const translations = {
    ru: {
        title: "ПРОИЗВОДСТВЕННЫЕ ПОКАЗАТЕЛИ",
        labels: {
            trucks: "Большегрузные автомобили",
            semiTrailers: "Полуприцепы",
            trailers: "Прицепы",
            superstructures: "Надстройки для шасси",
            projects: "Собственные конструкторские разработки"
        }
    },
    uz: {
        title: "ISHLAB CHIQARISH KO'RSATKICHLARI",
        labels: {
            trucks: "Og'ir yuk avtomobillari",
            semiTrailers: "Yarim tirkamalar",
            trailers: "Tirkamalar",
            superstructures: "Shassi ustqurmalari",
            projects: "O'zimizning loyihalar"
        }
    },
    en: {
        title: "PRODUCTION PERFORMANCE",
        labels: {
            trucks: "Heavy Duty Trucks",
            semiTrailers: "Semi-trailers",
            trailers: "Trailers",
            superstructures: "Chassis Superstructures",
            projects: "In-house Developments"
        }
    }
};

const Counter = ({ value }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        // 🛠️ TO'G'RILASH: Raqam orasidagi bo'shliqlarni olib tashlaymiz
        // value "4 647" bo'lsa, u "4647" ga aylanadi
        const stringValue = String(value).replace(/\s/g, '');
        const end = parseInt(stringValue) || 0;
        
        if (end === 0) { setCount(0); return; }
        
        let start = 0;
        let duration = 2000;
        let steps = 50;
        let increment = Math.ceil(end / steps);
        
        let counter = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(counter);
            } else {
                setCount(start);
            }
        }, duration / steps);
        
        return () => clearInterval(counter);
    }, [value]);

    return <span>{count.toLocaleString('fr-FR').replace(',', ' ')}</span>;
};

const ProductionStats = ({ lang = 'ru' }) => {
    const t = translations[lang] || translations.ru;
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await API.get('/settings');
                const data = response.data;

                const mapping = [
                    { label: t.labels.trucks, key: "Og'ir yuk avtomobillari" },
                    { label: t.labels.semiTrailers, key: "Yarim tirkamalar" },
                    { label: t.labels.trailers, key: "Tirkamalar" },
                    { label: t.labels.superstructures, key: "Shassi ustqurmalari" },
                    { label: t.labels.projects, key: "O'zimizning loyihalar" },
                ];

                const formattedStats = mapping.map(m => {
                    const found = data.find(item => item.key === m.key);
                    return {
                        label: m.label,
                        value: found ? found.value : "0"
                    };
                });

                setStats(formattedStats);
            } catch (err) {
                console.error("Stats fetch error:", err);
            }
        };
        fetchStats();
    }, [lang]);

    return (
        <section id="stats-section" className="relative w-full py-16 lg:py-32 overflow-hidden bg-[#F8FAFC]">
            <div className="absolute inset-0 z-0">
                <img
                    src={buildingImg}
                    className="w-full h-full object-cover opacity-20"
                    alt="UzAuto Trailer Factory"
                />
            </div>

            <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-16">
                <div className="mb-12 lg:mb-20 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-center lg:justify-start gap-4 mb-4"
                    >
                        <div className="w-8 lg:w-12 h-[2px] bg-[#0054A6]" />
                        <span className="text-[#0054A6] font-semibold tracking-[0.2em] text-[9px] sm:text-[10px] uppercase">
                            UzAuto Trailer Statistics
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#1a2e44] text-2xl md:text-3xl lg:text-5xl font-semibold tracking-tighter"
                    >
                        {t.title}
                    </motion.h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10 lg:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col border-l border-gray-200 pl-4 sm:pl-8 hover:border-[#0054A6] transition-all duration-500 group"
                        >
                            <div className="text-[#0054A6] text-2xl sm:text-4xl lg:text-5xl font-semibold mb-2 flex items-baseline gap-1 group-hover:scale-105 transition-transform origin-left">
                                <Counter value={stat.value} />
                                <span className="text-lg font-bold">+</span>
                            </div>
                            <p className="text-[#4b5563] text-[10px] sm:text-xs lg:text-[13px] font-medium uppercase tracking-wider leading-tight max-w-[140px] sm:max-w-[180px]">
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