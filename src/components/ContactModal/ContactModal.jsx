import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, CheckCircle2, User, Loader2, ShieldCheck, Send, MessageCircle, Bot, Minus } from 'lucide-react';

const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;
const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID;

const translations = {
    ru: {
        chatTitle: "UzAuto Assist",
        online: "Онлайн",
        greeting: "Здравствуйте! Как я могу вам помочь сегодня?",
        requestTitle: "Заказать звонок",
        requestSubtitle: "Мы перезвоним вам в течение 15 минут.",
        nameLabel: "Ваше имя",
        phoneLabel: "Номер телефона",
        msgPlaceholder: "Напишите сообщение...",
        btnSend: "Отправить",
        success: "Принято!",
        privacy: "Ваши данные защищены"
    },
    uz: {
        chatTitle: "UzAuto Assist",
        online: "Onlayn",
        greeting: "Assalomu alaykum! Sizga qanday yordam bera olaman?",
        requestTitle: "Qo'ng'iroq buyurtma qilish",
        requestSubtitle: "Biz sizga 15 daqiqa ichida qo'ng'iroq qilamiz.",
        nameLabel: "Ismingiz",
        phoneLabel: "Telefon raqamingiz",
        msgPlaceholder: "Xabaringizni yozing...",
        btnSend: "Yuborish",
        success: "Qabul qilindi!",
        privacy: "Ma'lumotlar himoyalangan"
    }
};

const ContactModal = ({ lang = 'ru' }) => {
    const [isOpenCall, setIsOpenCall] = useState(false);
    const [isOpenChat, setIsOpenChat] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [formData, setFormData] = useState({ name: '', phone: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    
    const t = translations[lang] || translations.ru;
    const scrollRef = useRef(null);

    useEffect(() => {
        if (isOpenChat && messages.length === 0) {
            setMessages([{ id: 1, text: t.greeting, sender: 'bot' }]);
        }
    }, [isOpenChat]);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

    // Raqam fokus bo'lganda +998 ni qo'shish
    const handlePhoneFocus = () => {
        if (!formData.phone) {
            setFormData({ ...formData, phone: '+998 ' });
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        const newMsg = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages([...messages, newMsg]);
        setInputValue("");
    };

    const handleCallSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const telegramMsg = `📞 *ЗАКАЗ ЗВОНКА*\n\n👤 *Имя:* ${formData.name}\n📞 *Телефон:* ${formData.phone}`;
        try {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chat_id: CHANNEL_ID, text: telegramMsg, parse_mode: "Markdown" }),
            });
            setIsSent(true);
            setTimeout(() => {
                setIsOpenCall(false);
                setIsSent(false);
                setFormData({ name: '', phone: '' });
                setIsLoading(false);
            }, 3000);
        } catch (error) { setIsLoading(false); }
    };

    return (
        <>
            {/* 🔘 IKKITA FLOATING TUGMA */}
            <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 items-end">
                <motion.button 
                    onClick={() => setIsOpenChat(!isOpenChat)}
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl cursor-pointer border transition-colors ${isOpenChat ? 'bg-white text-gray-500 border-gray-100' : 'bg-white text-[#1a2e44] border-gray-100'}`}
                >
                    {isOpenChat ? <Minus size={24} /> : <MessageCircle size={28} />}
                </motion.button>

                <motion.button 
                    onClick={() => setIsOpenCall(true)}
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 sm:w-14 sm:h-14 bg-[#0054A6] text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer relative"
                >
                    <span className="absolute inset-0 rounded-full bg-[#0054A6] animate-ping opacity-20"></span>
                    <Phone size={24} className="relative z-10" />
                </motion.button>
            </div>

            {/* 💬 TESLA-STYLE CHAT WINDOW */}
            <AnimatePresence>
                {isOpenChat && (
                    <motion.div 
                        initial={{ y: 20, opacity: 0, scale: 0.95 }} 
                        animate={{ y: 0, opacity: 1, scale: 1 }} 
                        exit={{ y: 20, opacity: 0, scale: 0.95 }} 
                        className="fixed bottom-24 right-6 z-[250] bg-white w-[90vw] sm:w-[380px] h-[70dvh] sm:h-[500px] rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden border border-gray-100"
                    >
                        <div className="p-4 flex items-center justify-between border-b bg-white">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#0054A6]"><Bot size={18}/></div>
                                <div>
                                    <h3 className="text-sm font-bold text-[#1a2e44]">{t.chatTitle}</h3>
                                    <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span><span className="text-[10px] text-gray-400 font-bold uppercase">{t.online}</span></div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpenChat(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X size={18}/></button>
                        </div>

                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fdfdfd] custom-scrollbar">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3 rounded-2xl text-[13.5px] font-medium ${msg.sender === 'user' ? "bg-[#0054A6] text-white rounded-tr-none shadow-md" : "bg-white text-gray-700 rounded-tl-none border border-gray-100 shadow-sm"}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t flex items-center gap-2">
                            <input 
                                value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                                placeholder={t.msgPlaceholder}
                                className="flex-1 bg-gray-50 border-none outline-none px-4 py-2.5 rounded-full text-sm font-medium"
                            />
                            <button type="submit" className="text-[#0054A6] p-2 hover:bg-blue-50 rounded-full transition-all cursor-pointer"><Send size={20} /></button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 📞 CALL MODAL - Tuzatilgan variant */}
            <AnimatePresence>
                {isOpenCall && (
                    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !isLoading && setIsOpenCall(false)} className="absolute inset-0 bg-[#0a1425]/60 backdrop-blur-md" />

                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white w-full max-w-[400px] rounded-[32px] overflow-hidden shadow-2xl p-8 sm:p-10">
                            <button onClick={() => setIsOpenCall(false)} className="absolute top-6 right-6 text-gray-300 hover:text-gray-500 transition-colors cursor-pointer"><X size={22}/></button>

                            {!isSent ? (
                                <form onSubmit={handleCallSubmit} className="space-y-6">
                                    <div className="text-center mb-8">
                                        {/* font-black olib tashlandi */}
                                        <h2 className="text-2xl font-semibold text-[#1a2e44] mb-2">{t.requestTitle}</h2>
                                        <p className="text-gray-400 text-sm font-normal">{t.requestSubtitle}</p>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18}/>
                                            {/* font-bold olib tashlandi */}
                                            <input required placeholder={t.nameLabel} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#f8f9fb] border border-gray-100 rounded-2xl px-12 py-4 text-sm outline-none focus:bg-white focus:border-[#0054A6]/30 transition-all text-[#1a2e44]"/>
                                        </div>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18}/>
                                            {/* onFocus va value o'zgarishi orqali +998 default qilindi */}
                                            <input required type="tel" placeholder={t.phoneLabel} value={formData.phone} onFocus={handlePhoneFocus} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#f8f9fb] border border-gray-100 rounded-2xl px-12 py-4 text-sm outline-none focus:bg-white focus:border-[#0054A6]/30 transition-all text-[#1a2e44]"/>
                                        </div>
                                    </div>
                                    <button disabled={isLoading} className="w-full bg-[#0054A6] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-[11px] shadow-lg hover:bg-[#004488] transition-all flex items-center justify-center gap-2">
                                        {isLoading ? <Loader2 className="animate-spin" size={20}/> : t.btnSend}
                                    </button>

                                    <div className="flex items-center justify-center gap-2 text-gray-400 opacity-60">
                                        <ShieldCheck size={14}/>
                                        <span className="text-[10px] uppercase tracking-widest font-medium">{t.privacy}</span>
                                    </div>
                                </form>
                            ) : (
                                <div className="text-center py-6">
                                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={48} className="text-green-500" /></div>
                                    <h3 className="text-2xl font-semibold text-[#1a2e44] mb-2">{t.success}</h3>
                                    <p className="text-gray-400 font-normal">Мы скоро свяжемся с вами.</p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ContactModal;