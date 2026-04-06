import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, CheckCircle2, User, Loader2, ShieldCheck } from 'lucide-react';

const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;
const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID;

const translations = {
    ru: {
        title: "Заказать звонок",
        subtitle: "Оставьте заявку, и наш менеджер свяжется с вами в ближайшее время.",
        namePlaceholder: "Ваше имя",
        phonePlaceholder: "Номер телефона",
        button: "Заказать звонок",
        sending: "Отправка...",
        success: "Заявка принята!",
        successDesc: "Мы получили ваш запрос и скоро позвоним вам.",
        privacy: "Ваши данные под защитой UzAuto Trailer"
    },
    uz: {
        title: "Qo'ng'iroq buyurtma qilish",
        subtitle: "Ma'lumotlaringizni qoldiring va menejerimiz siz bilan tezda bog'lanadi.",
        namePlaceholder: "Ismingiz",
        phonePlaceholder: "Telefon raqamingiz",
        button: "Qo'ng'iroqni kutaman!",
        sending: "Yuborilmoqda...",
        success: "Arizangiz qabul qilindi!",
        successDesc: "Sizning so'rovingizni oldik, tez orada bog'lanamiz.",
        privacy: "Sizning ma'lumotlaringiz UzAuto Trailer himoyasida"
    },
    en: {
        title: "Request a Call",
        subtitle: "Leave your details and our manager will get back to you shortly.",
        namePlaceholder: "Your name",
        phonePlaceholder: "Phone number",
        button: "Request call",
        sending: "Sending...",
        success: "Request Received!",
        successDesc: "We've received your request and will call you soon.",
        privacy: "Your data is protected by UzAuto Trailer"
    }
};

const ContactModal = ({ lang = 'ru' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '' });

    const t = translations[lang] || translations.ru;

    useEffect(() => {
        let timer1, timer2;
        const firstShown = sessionStorage.getItem('modalFirstShown');
        if (!firstShown) {
            timer1 = setTimeout(() => {
                setIsOpen(true);
                sessionStorage.setItem('modalFirstShown', 'true');
            }, 10000); // 10 soniya
        }

        const secondShown = sessionStorage.getItem('modalSecondShown');
        if (!secondShown) {
            timer2 = setTimeout(() => {
                setIsOpen(true);
                sessionStorage.setItem('modalSecondShown', 'true');
            }, 140000);
        }

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    const handlePhoneFocus = () => {
        if (!formData.phone) {
            setFormData({ ...formData, phone: '+998 ' });
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (value.startsWith('+998') || value === '') {
            setFormData({ ...formData, phone: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const currentPageUrl = window.location.href;

        // --- O'ZGARTIRILGAN QISM ---
        // Linkni ` ` belgisiga o'radik, shunda ichidagi _ (pastki chiziq) xato bermaydi
        const message = `🔔 *НОВАЯ ЗАЯВКА С САЙТА*\n\n` +
            `👤 *Имя:* ${formData.name}\n` +
            `📞 *Телефон:* ${formData.phone}\n` +
            `🌐 *Язык интерфейса:* ${lang.toUpperCase()}\n\n` +
            `📍 *Отправлено со страницы:* \n\`${currentPageUrl}\``;
        // ---------------------------

        try {
            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: CHANNEL_ID,
                    text: message,
                    parse_mode: "Markdown",
                    disable_web_page_preview: true
                }),
            });

            if (response.ok) {
                setIsSent(true);
                setTimeout(() => {
                    setIsSent(false);
                    setIsOpen(false);
                    setFormData({ name: '', phone: '' });
                    setIsLoading(false);
                }, 3500);
            } else {
                // Agar xato bo'lsa, konsolda ko'rish uchun
                const err = await response.json();
                console.error("Telegram Error:", err);
                setIsLoading(false); // Xato bo'lsa ham loadingni to'xtatish
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            setIsLoading(false);
        }
    };

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-8 right-8 z-[200] w-16 h-16 bg-[#0054A6] text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer"
            >
                <span className="absolute inset-0 rounded-full bg-[#0054A6] animate-ping opacity-20"></span>
                <Phone className="w-7 h-7 relative z-10" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[300] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isLoading && setIsOpen(false)}
                            className="absolute inset-0 bg-[#0a1425]/60 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative bg-white w-full max-w-[440px] rounded-[40px] overflow-hidden shadow-2xl"
                        >
                            <div className="h-1.5 w-full bg-[#0054A6]" />

                            <div className="p-10 lg:p-12">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-8 right-8 text-gray-400 hover:text-[#1a2e44] transition-colors p-2 cursor-pointer"
                                >
                                    <X size={22} />
                                </button>

                                {!isSent ? (
                                    <form onSubmit={handleSubmit} className="flex flex-col">
                                        <div className="mb-10 text-center">
                                            {/* Novosti sarlavhasi kabi font-semibold va tracking-tight qilindi */}
                                            <h2 className="text-2xl lg:text-3xl font-semibold text-[#1a2e44] mb-3 tracking-tight">
                                                {t.title}
                                            </h2>
                                            {/* font-medium o'rnatildi */}
                                            <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                                {t.subtitle}
                                            </p>
                                        </div>

                                        <div className="space-y-4 mb-10">
                                            <div className="relative flex items-center">
                                                <User className="absolute left-6 text-gray-400 w-5 h-5" />
                                                {/* font-medium (Novosti date kabi) */}
                                                <input
                                                    required
                                                    type="text"
                                                    disabled={isLoading}
                                                    placeholder={t.namePlaceholder}
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full bg-[#F8FAFC] border border-gray-100 rounded-3xl px-14 py-5 text-sm font-medium text-[#1a2e44] outline-none focus:bg-white focus:border-[#0054A6]/30 transition-all"
                                                />
                                            </div>
                                            <div className="relative flex items-center">
                                                <Phone className="absolute left-6 text-gray-400 w-5 h-5" />
                                                <input
                                                    required
                                                    type="tel"
                                                    disabled={isLoading}
                                                    placeholder={t.phonePlaceholder}
                                                    value={formData.phone}
                                                    onFocus={handlePhoneFocus}
                                                    onChange={handlePhoneChange}
                                                    className="w-full bg-[#F8FAFC] border border-gray-100 rounded-3xl px-14 py-5 text-sm font-medium text-[#1a2e44] outline-none focus:bg-white focus:border-[#0054A6]/30 transition-all"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="relative w-full bg-[#0054A6] hover:bg-[#004488] disabled:bg-gray-400 text-white py-5 rounded-3xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 group cursor-pointer shadow-xl shadow-blue-900/10"
                                        >
                                            {isLoading ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <>
                                                    {/* font-semibold (Novosti sarlavhasi kabi) */}
                                                    <span className="uppercase tracking-widest text-xs font-semibold">{t.button}</span>
                                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>

                                        <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-center">
                                            <ShieldCheck size={14} className="shrink-0" />
                                            {/* font-medium (Novosti desc kabi) */}
                                            <span className="text-[10px] font-medium uppercase tracking-widest">{t.privacy}</span>
                                        </div>
                                    </form>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center text-center py-6"
                                    >
                                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8">
                                            <CheckCircle2 size={56} className="text-green-500" />
                                        </div>
                                        {/* Muvaffaqiyat sarlavhasi semibold */}
                                        <h3 className="text-2xl font-semibold text-[#1a2e44] mb-3">{t.success}</h3>
                                        <p className="text-gray-500 text-sm font-medium px-4 leading-relaxed">
                                            {t.successDesc}
                                        </p>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

const ChevronRight = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
    </svg>
);

export default ContactModal;