import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const translations = {
    ru: { clients: "НАШИ КЛИЕНТЫ", partners: "НАШИ ПАРТНЕРЫ" },
    uz: { clients: "BIZNING MIJOZLAR", partners: "BIZNING HAMKORLAR" },
    en: { clients: "OUR CLIENTS", partners: "OUR PARTNERS" }
};

const Partners = ({ lang = 'ru' }) => {
    const t = translations[lang] || translations.ru;

    // Rasm formatlarini to'g'ri ko'rsatish uchun ro'yxatni aniq yozamiz
    // klient6.png va part7.png qolganlari .jpg
    const [clients, setClients] = useState([]);
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        const clientsList = Array.from({ length: 19 }, (_, i) => {
            const id = i + 1;
            return { id, image: id === 6 ? `/klient${id}.png` : `/klient${id}.jpg` };
        });

        const partnersList = Array.from({ length: 15 }, (_, i) => {
            const id = i + 1;
            return { id, image: id === 7 ? `/part${id}.png` : `/part${id}.jpg` };
        });

        setClients(clientsList);
        setPartners(partnersList);
    }, []);

    const InfiniteRow = ({ title, items, direction = "left" }) => {
        const [isPaused, setIsPaused] = useState(false);
        const timerRef = useRef(null);

        const handleDragStart = () => {
            setIsPaused(true);
            if (timerRef.current) clearTimeout(timerRef.current);
        };

        const handleDragEnd = () => {
            timerRef.current = setTimeout(() => {
                setIsPaused(false);
            }, 4000);
        };

        return (
            <div className="mb-10 st:mb-0 select-none w-full">
                <div className="flex flex-col items-center mb-10 px-6">
                    <h3 className="text-[12px] lg:text-[14px] font-semibold uppercase tracking-[0.5em] text-[#1a2e44] mb-4 text-center">
                        {title}
                    </h3>
                    <div className="h-[1.5px] w-20 bg-[#0054A6] rounded-full"></div>
                </div>

                <div className="relative w-full cursor-grab active:cursor-grabbing overflow-hidden">
                    {/* Yon tomondagi xiralashish effektlari */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

                    <motion.div
                        className="flex items-center w-max"
                        // FOIZLI SILJISH: Har qanday kenglikda ishlaydi
                        animate={isPaused ? {} : {
                            x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]
                        }}
                        transition={{
                            duration: 80, // Tezlikni shu yerdan sozlashingiz mumkin
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        drag="x"
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    >
                        {/* 4 marta ko'paytirish cheksizlik uchun yetarli */}
                        {[...items, ...items, ...items, ...items].map((item, i) => (
                            <div key={i}>
                                {/* BOX SHADOW QO'SHILGAN KARTA */}
                                <div className="h-24 lg:h-32 w-auto flex items-center ">
                                    <img
                                        src={item.image}
                                        alt="brand logo"
                                        className="h-full w-auto object-contain pointer-events-none"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        );
    };

    return (
        <section className="w-full py-15 bg-[#F8FAFC] font-inter overflow-hidden border-t border-gray-100">
            <div className="w-full">
                <InfiniteRow title={t.clients} items={clients} direction="left" />
                <InfiniteRow title={t.partners} items={partners} direction="right" />
            </div>
        </section>
    );
};

export default Partners;