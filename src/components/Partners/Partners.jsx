import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import API, { API_URL } from '../../api/axios'; 
import { useLanguage } from '../../context/LanguageContext';

const translations = {
    ru: { clients: "Наши клиенты", partners: "Наши партнеры" },
    uz: { clients: "Бизнинг мижозлар", partners: "Бизнинг ҳамкорлар" },
    en: { clients: "Our clients", partners: "Our partners" }
};

const Partners = () => {
    const { lang } = useLanguage();
    const t = translations[lang] || translations.ru;

    const [clients, setClients] = useState([]);
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogos = async () => {
            try {
                setLoading(true);
                const [cRes, pRes] = await Promise.all([
                    API.get('/clients'),
                    API.get('/partners')
                ]);
                setClients(cRes.data.filter(i => i.isActive));
                setPartners(pRes.data.filter(i => i.isActive));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLogos();
    }, []);

    const LogoRow = ({ title, items, autoDir = "right" }) => {
        const scrollRef = useRef(null);

        // 🚀 ZANJIRNI ULASH (INFINITE) LOGIKASI
        const handleScroll = () => {
            const container = scrollRef.current;
            if (!container) return;

            const contentWidth = container.scrollWidth / 3; // 3 marta ko'paytirilgan bo'ladi

            // O'ng chetga yetganda o'rtaga sakrash
            if (container.scrollLeft >= contentWidth * 2) {
                container.scrollLeft -= contentWidth;
            }
            // Chap chetga yetganda o'rtaga sakrash
            else if (container.scrollLeft <= 0) {
                container.scrollLeft += contentWidth;
            }
        };

        const scrollManual = (direction) => {
            if (scrollRef.current) {
                const container = scrollRef.current;
                const card = container.querySelector('.logo-card');
                if (!card) return;

                const step = card.offsetWidth + 24; // Karta + gap (24px)
                const scrollAmount = direction === 'right' ? step : -step;
                
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        };

        // Boshlang'ich nuqtani o'rtaga surish
        useEffect(() => {
            if (scrollRef.current && items.length > 0) {
                const container = scrollRef.current;
                const contentWidth = container.scrollWidth / 3;
                container.scrollLeft = contentWidth;
            }
        }, [items]);

        // Avtomatik yurish
        useEffect(() => {
            if (items.length === 0) return;
            const interval = setInterval(() => {
                scrollManual(autoDir);
            }, 3500);
            return () => clearInterval(interval);
        }, [items, autoDir]);

        if (!items || items.length === 0) return null;

        return (
            <div className="relative w-full h-36 lg:h-44 flex items-center mb-4 last:mb-0 border-y border-gray-100 group">
                
                {/* O'ZGARISH FAQAT SHU YERDA: w-[120px] qilib telefonda ixchamlashtirildi */}
                <div 
                    className="absolute left-0 top-0 bottom-0 z-20 w-[120px] md:w-[180px] lg:w-[220px] bg-[#0054A6] flex flex-col items-center justify-center text-white"
                    style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0 100%)' }}
                >
                    {/* Yozuv o'lchami text-[10px] va px-1 qilib telefonga moslandi */}
                    <h3 className="text-[10px] md:text-sm lg:text-base font-bold uppercase tracking-tight text-center px-1 md:px-4 leading-tight mb-2 md:mb-3 pr-4 md:pr-4">
                        {title}
                    </h3>
                    
                    {/* Knopkalar o'rtasidagi masofa (gap-3) telefonda qisqartirildi */}
                    <div className="flex items-center gap-3 md:gap-6 pr-3 md:pr-0">
                        <button onClick={() => scrollManual('left')} className="hover:scale-125 transition-all active:opacity-50 cursor-pointer">
                            {/* size={24} o'rniga responsive o'lcham berildi */}
                            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                        </button>
                        <button onClick={() => scrollManual('right')} className="hover:scale-125 transition-all active:opacity-50 cursor-pointer">
                            <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                        </button>
                    </div>
                </div>

                {/* Ko'k shakl qisqargani uchun, rasmlar joylashgan qutini chapdagi masofasi ham unga moslandi (ml-[90px]) */}
                <div 
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex-1 h-full overflow-hidden flex items-center gap-6 px-10 ml-[90px] md:ml-[140px] lg:ml-[180px] scroll-smooth"
                    style={{ backgroundColor: '#fcfdfe' }}
                >
                    {/* 🚀 ZANJIR UCHUN RO'YXATNI 3 MARTA KO'PAYTIRAMIZ */}
                    {[...items, ...items, ...items].map((item, i) => (
                        <div 
                            key={i} 
                            className="logo-card w-32 h-27 lg:w-40 lg:h-auto bg-white flex items-center justify-center p-1 shrink-0 shadow-sm border border-gray-100 rounded-md transition-transform hover:scale-105"
                        >
                            <img
                                src={`${API_URL}${item.logo}`} 
                                alt={item.name}
                                className="w-full h-full object-contain pointer-events-none"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    if (loading && (clients.length === 0 && partners.length === 0)) return null;

    return (
        <section className="w-full bg-white border-y-[6px] border-[#0054A6] overflow-hidden py-1 font-inter text-[#1a2e44]">
            <div className="max-w-full">
                {/* Mijozlar o'ngga/chapga ulanib yuradi */}
                <LogoRow title={t.clients} items={clients} autoDir="right" />
                <LogoRow title={t.partners} items={partners} autoDir="left" />
            </div>
        </section>
    );
};

export default Partners;