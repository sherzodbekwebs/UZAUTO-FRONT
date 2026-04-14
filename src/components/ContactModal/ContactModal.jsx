import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, CheckCircle2, User, Loader2, ShieldCheck, MessageSquare, Send, MessageCircle } from 'lucide-react';

const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;
const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID;

const translations = {
    ru: {
        title: "Связаться с нами",
        tabCall: "Звонок",
        tabMessage: "Сообщение",
        subtitleCall: "Оставьте заявку, и мы перезвоним вам.",
        subtitleMsg: "Напишите нам, и мы ответим в ближайшее время.",
        namePlaceholder: "Ваше имя",
        phonePlaceholder: "Номер телефона",
        msgPlaceholder: "Ваше сообщение...",
        buttonCall: "Заказать звонок",
        buttonMsg: "Отправить сообщение",
        sending: "Отправка...",
        success: "Принято!",
        successDesc: "Мы получили ваше обращение.",
        privacy: "Данные под защитой"
    },
    uz: {
        title: "Biz bilan bog'lanish",
        tabCall: "Qo'ng'iroq",
        tabMessage: "Xabar",
        subtitleCall: "Ma'lumot qoldiring, biz sizga qo'ng'iroq qilamiz.",
        subtitleMsg: "Savolingizni yozing, biz sizga javob beramiz.",
        namePlaceholder: "Ismingiz",
        phonePlaceholder: "Telefon raqamingiz",
        msgPlaceholder: "Xabaringizni yozing...",
        buttonCall: "Qo'ng'iroq buyurtma qilish",
        buttonMsg: "Xabarni yuborish",
        sending: "Yuborilmoqda...",
        success: "Qabul qilindi!",
        successDesc: "Murojaatingiz muvaffaqiyatli yuborildi.",
        privacy: "Ma'lumotlar himoyalangan"
    },
    en: {
        title: "Contact Us",
        tabCall: "Call",
        tabMessage: "Message",
        subtitleCall: "Leave your details, we'll call you back.",
        subtitleMsg: "Write to us, we will answer shortly.",
        namePlaceholder: "Your name",
        phonePlaceholder: "Phone number",
        msgPlaceholder: "Your message...",
        buttonCall: "Request call",
        buttonMsg: "Send message",
        sending: "Sending...",
        success: "Received!",
        successDesc: "We have received your request.",
        privacy: "Data is protected"
    }
};

const ContactModal = ({ lang = 'ru' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('call');
    const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

    const t = translations[lang] || translations.ru;

    useEffect(() => {
        let timer1;
        const firstShown = sessionStorage.getItem('modalFirstShown');
        if (!firstShown) {
            timer1 = setTimeout(() => {
                setIsOpen(true);
                sessionStorage.setItem('modalFirstShown', 'true');
            }, 15000);
        }
        return () => clearTimeout(timer1);
    }, []);

    const handlePhoneFocus = () => { if (!formData.phone) setFormData({ ...formData, phone: '+998 ' }); };
    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (value.startsWith('+998') || value === '') setFormData({ ...formData, phone: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const typeText = activeTab === 'call' ? 'ЗАКАЗ ЗВОНКА' : 'НОВОЕ СООБЩЕНИЕ';
        const telegramMsg = `🔔 *${typeText}*\n\n👤 *Имя:* ${formData.name}\n📞 *Телефон:* ${formData.phone}\n` +
            (activeTab === 'message' ? `✉️ *Сообщение:* ${formData.message}\n` : '') +
            `🌐 *Язык:* ${lang.toUpperCase()}\n\n📍 *Страница:* \n\`${window.location.href}\``;

        try {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chat_id: CHANNEL_ID, text: telegramMsg, parse_mode: "Markdown", disable_web_page_preview: true }),
            });

            setIsSent(true);
            setTimeout(() => {
                setIsSent(false);
                setIsOpen(false);
                setFormData({ name: '', phone: '', message: '' });
                setIsLoading(false);
            }, 3000);
        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[200] w-12 h-12 sm:w-14 sm:h-14 bg-[#0054A6] text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
            >
                <span className="absolute inset-0 rounded-full bg-[#0054A6] animate-ping opacity-25"></span>
                <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !isLoading && setIsOpen(false)} className="absolute inset-0 bg-[#0a1425]/60 backdrop-blur-sm" />

                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white w-full max-w-[380px] rounded-[24px] overflow-hidden shadow-2xl">
                            
                            {/* CLOSE BUTTON */}
                            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 z-[350] text-gray-400 hover:text-gray-900 transition-all cursor-pointer p-1">
                                <X size={20} />
                            </button>

                            {/* TABS (Ixchamroq qilindi) */}
                            <div className="flex bg-gray-100 p-1 mt-10 mx-6 rounded-xl">
                                <button onClick={() => setActiveTab('call')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'call' ? 'bg-white text-[#0054A6] shadow-sm' : 'text-gray-500'}`}>
                                    <Phone size={14} /> {t.tabCall}
                                </button>
                                <button onClick={() => setActiveTab('message')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'message' ? 'bg-white text-[#0054A6] shadow-sm' : 'text-gray-500'}`}>
                                    <MessageSquare size={14} /> {t.tabMessage}
                                </button>
                            </div>

                            <div className="px-6 pb-8 pt-4">
                                {!isSent ? (
                                    <form onSubmit={handleSubmit} className="flex flex-col">
                                        <div className="mb-5 text-center">
                                            <h2 className="text-xl font-bold text-[#1a2e44] mb-1">{activeTab === 'call' ? t.title : t.tabMessage}</h2>
                                            <p className="text-gray-500 text-[12px] font-medium leading-tight">{activeTab === 'call' ? t.subtitleCall : t.subtitleMsg}</p>
                                        </div>

                                        <div className="space-y-2.5 mb-6">
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                <input required type="text" placeholder={t.namePlaceholder} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-11 py-3 text-sm font-bold outline-none focus:border-blue-400/50 transition-all" />
                                            </div>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                <input required type="tel" placeholder={t.phonePlaceholder} value={formData.phone} onFocus={handlePhoneFocus} onChange={handlePhoneChange} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-11 py-3 text-sm font-bold outline-none focus:border-blue-400/50 transition-all" />
                                            </div>
                                            {activeTab === 'message' && (
                                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                    <textarea required rows={2} placeholder={t.msgPlaceholder} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-blue-400/50 transition-all resize-none" />
                                                </motion.div>
                                            )}
                                        </div>

                                        <button type="submit" disabled={isLoading} className="w-full bg-[#0054A6] hover:bg-[#004488] text-white py-3.5 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 disabled:opacity-50">
                                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                                <span className="uppercase tracking-widest text-[10px] font-black">{activeTab === 'call' ? t.buttonCall : t.buttonMsg}</span>
                                            )}
                                        </button>

                                        <div className="mt-4 flex items-center justify-center gap-2 text-gray-400">
                                            <ShieldCheck size={12} />
                                            <span className="text-[9px] font-black uppercase tracking-widest">{t.privacy}</span>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="flex flex-col items-center text-center py-6">
                                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                                            <CheckCircle2 size={40} className="text-green-500" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1a2e44] mb-1">{t.success}</h3>
                                        <p className="text-gray-500 text-sm font-medium">{t.successDesc}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ContactModal;