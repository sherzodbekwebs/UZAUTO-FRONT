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
        centerName: "Yagona qo'ng'iroqlar markazi",
    },
    en: {
        infoService: "Information and reference service",
        centerName: "Unified call-center",
    }
};

const CallCenter = ({ lang = 'ru' }) => {
    const t = translations[lang] || translations.ru;

    return (
        // Telefonda paddinglar kichraytirildi (py-8 px-4)
        <section id="call-center" className="w-full bg-[#F8FAFC] py-8 md:py-12 px-4 md:px-6 lg:px-16 font-inter">
            <div className="max-w-[1440px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    // Telefonda border-radius (rounded) biroz kichikroq bo'ladi
                    className="relative overflow-hidden rounded-[20px] md:rounded-[32px] bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)]"
                >
                    {/* Brend ko'k chizig'i dekoratsiyasi */}
                    <div className="absolute top-0 left-0 w-1.5 md:w-2 h-full bg-[#0054A6]" />

                    {/* lg:flex-row qildim, planshetda matn uzun bo'lsa siqilib qolmasligi uchun */}
                    <div className="flex flex-col lg:flex-row items-center justify-between p-6 md:p-8 lg:p-12 gap-6 md:gap-8">

                        {/* Matnli qism */}
                        <div className="flex flex-col gap-1 md:gap-2 text-center lg:text-left">
                            <span className="text-[#0054A6] text-[10px] md:text-xs font-semibold tracking-widest md:tracking-[0.2em] uppercase opacity-80">
                                {t.infoService}
                            </span>
                            <h3 className="text-[#1a2e44] text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight">
                                {t.centerName}
                            </h3>
                        </div>

                        {/* Telefon raqami - Interaktiv qism */}
                        <motion.a
                            href="tel:+998712023223"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            // w-full orqali telefonda knopka butun ekranni egallaydi, md:w-auto kompyuterda o'z holiga qaytadi
                            className="group w-full lg:w-auto flex items-center justify-center lg:justify-start gap-4 md:gap-6 bg-[#0054A6] hover:bg-[#004488] text-white px-5 md:px-8 lg:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl transition-all duration-300 shadow-xl shadow-blue-900/10 cursor-pointer"
                        >
                            {/* Ikonka foni va o'lchami telefonga moslandi */}
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-lg md:rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors shrink-0">
                                <PhoneCall className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-[9px] md:text-[10px] font-medium uppercase tracking-widest opacity-70 mb-0.5 md:mb-1">
                                    {lang === 'ru' ? 'Связаться' : lang === 'uz' ? 'Bog\'lanish' : 'Contact'}
                                </span>
                                <span className="text-lg md:text-xl lg:text-2xl font-semibold tracking-tighter">
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