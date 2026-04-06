import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall } from 'lucide-react';

const translations = {
    ru: {
        infoService: "Информационно-справочная служба",
        centerName: "Единый call-центр",
    },
    uz: {
        infoService: "Axborot-ma'lumot xizmati",
        centerName: "Yagona call-markaz",
    },
    en: {
        infoService: "Information and reference service",
        centerName: "Unified call-center",
    }
};

const CallCenter = ({ lang = 'ru' }) => {
    const t = translations[lang] || translations.ru;

    return (
        <section id="call-center" className="w-full bg-[#F8FAFC] py-12 px-6 lg:px-16 font-inter">
            <div className="max-w-[1440px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-[32px] bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)]"
                >
                    {/* Brend ko'k chizig'i dekoratsiyasi */}
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#0054A6]" />

                    <div className="flex flex-col md:flex-row items-center justify-between p-8 lg:p-12 gap-8">

                        {/* Matnli qism */}
                        <div className="flex flex-col gap-2 text-center md:text-left">
                            {/* font-black -> font-semibold */}
                            <span className="text-[#0054A6] text-xs font-semibold tracking-[0.2em] uppercase opacity-80">
                                {t.infoService}
                            </span>
                            {/* font-black -> font-semibold */}
                            <h3 className="text-[#1a2e44] text-2xl lg:text-3xl font-semibold tracking-tight">
                                {t.centerName}
                            </h3>
                        </div>

                        {/* Telefon raqami - Interaktiv qism */}
                        <motion.a
                            href="tel:+998712023223"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group flex items-center gap-6 bg-[#0054A6] hover:bg-[#004488] text-white px-8 lg:px-10 py-5 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-900/10 cursor-pointer"
                        >
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                <PhoneCall size={24} strokeWidth={1.5} />
                            </div>
                            <div className="flex flex-col">
                                {/* font-bold -> font-medium */}
                                <span className="text-[10px] font-medium uppercase tracking-widest opacity-70 mb-1">
                                    {lang === 'ru' ? 'Связаться' : lang === 'uz' ? 'Bog\'lanish' : 'Contact'}
                                </span>
                                {/* font-black -> font-semibold */}
                                <span className="text-xl lg:text-2xl font-semibold tracking-tighter">
                                    +998 71 202 32 23
                                </span>
                            </div>
                        </motion.a>
                    </div>

                    {/* Fon uchun nafis dekoratsiya */}
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#0054A6]/5 rounded-full blur-3xl -z-10" />
                </motion.div>
            </div>
        </section>
    );
};

export default CallCenter;