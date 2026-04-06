import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MapPin, Clock, Phone, Mail, 
    Copy, ExternalLink, Send, 
    Globe, Instagram, Facebook, Youtube, Send as TelegramIcon
} from 'lucide-react';
import toast from 'react-hot-toast';

const translations = {
    ru: {
        title: "Контакты",
        subtitle: "Свяжитесь с нами любым удобным способом или посетите наш офис",
        our_address: "Наш адрес",
        headOffice: "Головной офис",
        production: "Производство",
        callCenter: "Единый call-центр",
        email_label: "Для связи",
        workHours: "График работы",
        weekdays_title: "Понедельник - Пятница",
        weekdays_time: "09:00 - 18:00",
        weekend: "Суббота - Воскресенье",
        closed: "Выходной",
        tashkent: "г. Ташкент, ул. Мирзо-Улугбека, 30",
        samarkand: "Самаркандская обл., Жамбайский р-н, г. Жамбай, ул. Ташкентская, 2",
        form_title: "Напишите нам",
        name_label: "Ваше имя",
        phone_label: "Телефон",
        msg_placeholder: "Введите ваше сообщение...",
        send_btn: "Отправить сообщение",
        copy: "Копировать",
        view_map: "Открыть в картах",
        map_title: "Мы на карте",
        social_title: "Мы в соцсетях"
    },
    uz: {
        title: "Aloqa",
        subtitle: "Biz bilan o'zingizga qulay usulda bog'laning yoki ofisimizga tashrif buyuring",
        our_address: "Bizning manzil",
        headOffice: "Bosh ofis",
        production: "Ishlab chiqarish",
        callCenter: "Yagona call-markaz",
        email_label: "Aloqa uchun",
        workHours: "Ish tartibi",
        weekdays_title: "Dushanba - Juma",
        weekdays_time: "09:00 - 18:00",
        weekend: "Shanba - Yakshanba",
        closed: "Dam olish kuni",
        tashkent: "Toshkent sh., Mirzo-Ulug'bek ko'chasi, 30",
        samarkand: "Samarqand vil., Jomboy tumani, Jomboy sh., Toshkent ko'chasi, 2",
        form_title: "Bizga yozing",
        name_label: "Ismingiz",
        phone_label: "Telefon raqamingiz",
        msg_placeholder: "Xabaringizni kiriting...",
        send_btn: "Xabarni yuborish",
        copy: "Nusxalash",
        view_map: "Xaritada ochish",
        map_title: "Xaritadagi joylashuvimiz",
        social_title: "Ijtimoiy tarmoqlarimiz"
    }
};

const Contacts = ({ lang = 'ru' }) => {
    const t = translations[lang] || translations.ru;
    const [activeLocation, setActiveLocation] = useState('tashkent');

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success(lang === 'ru' ? 'Скопировано!' : 'Nusxalandi!');
    };

    const socialLinks = [
        { name: "Telegram", url: "https://t.me/uatproductsbot", icon: <TelegramIcon size={20} />, color: "hover:bg-blue-500" },
        { name: "Instagram", url: "https://www.instagram.com/uzautotrailer_official", icon: <Instagram size={20} />, color: "hover:bg-pink-600" },
        { name: "Facebook", url: "https://www.facebook.com/UzAutoTrailerofficial", icon: <Facebook size={20} />, color: "hover:bg-blue-700" },
        { name: "YouTube", url: "https://www.youtube.com/@UzAutoTrailer/videos", icon: <Youtube size={20} />, color: "hover:bg-red-600" }
    ];

    const mapUrls = {
        tashkent: "https://yandex.uz/map-widget/v1/?ll=69.31980%2C41.319700&z=17&pt=69.31980,41.31940,pm2rdm",
        samarkand: "https://yandex.uz/map-widget/v1/?ll=67.076356%2C39.690112&z=17&pt=67.076356,39.690112,pm2rdm"
    };

    return (
        <div className="pt-32 pb-20 bg-[#F8FAFC] font-inter text-[#1a2e44]">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                
                <div className="text-center mb-16 space-y-4">
                    <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-5xl lg:text-6xl font-bold tracking-tight italic">
                        {t.title}
                    </motion.h1>
                    <p className="text-gray-500 text-lg font-normal max-w-2xl mx-auto">{t.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    
                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-7 space-y-6">
                        
                        {/* Address Card */}
                        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-2xl bg-[#0061A4] flex items-center justify-center text-white shadow-lg shadow-blue-100">
                                    <MapPin size={22} />
                                </div>
                                <h3 className="text-lg font-bold uppercase tracking-wider">{t.our_address}</h3>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                <button onClick={() => setActiveLocation('tashkent')} className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeLocation === 'tashkent' ? 'bg-[#0061A4] text-white shadow-md' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>{t.headOffice}</button>
                                <button onClick={() => setActiveLocation('samarkand')} className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeLocation === 'samarkand' ? 'bg-[#0061A4] text-white shadow-md' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>{t.production}</button>
                            </div>

                            <p className="text-gray-600 font-normal leading-relaxed text-base">{activeLocation === 'tashkent' ? t.tashkent : t.samarkand}</p>

                            <div className="flex items-center gap-3">
                                <a href={activeLocation === 'tashkent' ? "https://yandex.uz/maps/org/234745806070/" : "https://yandex.uz/maps/org/242429445745/"} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-md"><ExternalLink size={14} /> {t.view_map}</a>
                                <button onClick={() => copyToClipboard(activeLocation === 'tashkent' ? t.tashkent : t.samarkand)} className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-500 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100"><Copy size={14} /> {t.copy}</button>
                            </div>
                        </div>

                        {/* Contacts & Socials Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Contact Box */}
                            <div className="space-y-6">
                                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-4">
                                    <div className="flex items-center gap-3 text-gray-400 font-semibold text-[10px] uppercase tracking-widest"><Phone size={14} className="text-[#0061A4]" /> {t.callCenter}</div>
                                    <a href="tel:+998712023223" className="text-2xl font-bold hover:text-[#0061A4] transition-colors block">+998 71 202 32 23</a>
                                </div>
                                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-4">
                                    <div className="flex items-center gap-3 text-gray-400 font-semibold text-[10px] uppercase tracking-widest"><Mail size={14} className="text-[#0061A4]" /> Email</div>
                                    <a href="mailto:info@trailer.uz" className="text-2xl font-bold hover:text-[#0061A4] transition-colors block italic">info@trailer.uz</a>
                                </div>
                            </div>

                            {/* Social Media Box */}
                            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-between">
                                <div className="flex items-center gap-3 text-gray-400 font-semibold text-[10px] uppercase tracking-widest"><Globe size={14} className="text-[#0061A4]" /> {t.social_title}</div>
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    {socialLinks.map((social, i) => (
                                        <a key={i} href={social.url} target="_blank" rel="noreferrer" 
                                           className={`flex items-center justify-center p-4 bg-gray-50 rounded-2xl text-gray-400 ${social.color} hover:text-white transition-all duration-300 shadow-sm`}>
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                                <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest text-center mt-6 italic">Follow us online</p>
                            </div>
                        </div>

                        {/* Work Hours */}
                        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 text-gray-400 font-semibold text-[10px] uppercase tracking-widest"><Clock size={14} className="text-[#0061A4]" /> {t.workHours}</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex justify-between items-center pb-3 border-b border-gray-50"><span className="font-medium text-gray-500 text-sm">{t.weekdays_title}</span><span className="font-bold text-gray-800">{t.weekdays_time}</span></div>
                                <div className="flex justify-between items-center pb-3 border-b border-gray-50"><span className="font-medium text-gray-500 text-sm">{t.weekend}</span><span className="font-bold text-red-500 uppercase text-[11px]">{t.closed}</span></div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: FORM */}
                    <div className="lg:col-span-5">
                        <div className="bg-white p-8 lg:p-10 rounded-[40px] border border-gray-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.04)] sticky top-32">
                            <h3 className="text-2xl font-bold mb-8 italic">{t.form_title}</h3>
                            <form className="space-y-6 text-[#1a2e44]">
                                <div>
                                    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest ml-1">{t.name_label}</label>
                                    <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-1 focus:ring-[#0061A4] outline-none font-medium text-sm mt-1" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest ml-1">{t.phone_label}</label>
                                    <input type="text" placeholder="+998 __ ___ __ __" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-1 focus:ring-[#0061A4] outline-none font-medium text-sm mt-1" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest ml-1">Email</label>
                                    <input type="email" placeholder="example@mail.com" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-1 focus:ring-[#0061A4] outline-none font-medium text-sm mt-1" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest ml-1">Сообщение</label>
                                    <textarea rows={4} className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-1 focus:ring-[#0061A4] outline-none font-medium text-sm mt-1 resize-none" placeholder={t.msg_placeholder}></textarea>
                                </div>
                                <button type="button" className="w-full py-5 bg-[#0061A4] text-white rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-blue-900/10 hover:bg-[#004A7D] active:scale-95 transition-all flex items-center justify-center gap-3">
                                    <Send size={16} /> {t.send_btn}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* MAP SECTION */}
                <div className="mt-20 space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-gray-400 italic">{t.map_title}</h2>
                        <div className="w-12 h-1 bg-gray-200 mx-auto rounded-full"></div>
                    </div>
                    <div className="bg-white p-3 rounded-[40px] border border-gray-100 shadow-sm h-[500px] overflow-hidden relative">
                        <AnimatePresence mode="wait">
                            <motion.iframe key={activeLocation} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} src={mapUrls[activeLocation]} className="w-full h-full rounded-[32px] contrast-[1.02] grayscale-[0.1]" style={{ border: 0 }} allowFullScreen="" loading="lazy"></motion.iframe>
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contacts;