import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Briefcase, SearchX,
    Search, X, FilePlus, CheckCircle2, ListChecks, Target, Loader2
} from 'lucide-react';

const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;
const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID;

const translations = {
    ru: {
        heroTitle: "Карьера в компании",
        heroSub: "ПРИСОЕДИНЯЙТЕСЬ К НАШЕЙ КОМАНДЕ",
        noVacancies: "Открытых вакансий пока нет",
        noVacanciesDesc: "Следите за обновлениями, мы постоянно растем и ищем талантливых специалистов.",
        applyBtn: "Откликнуться",
        details: "Подробнее",
        searchPlaceholder: "Поиск по вакансиям...",
        categories: { all: "Все", production: "Производство", office: "Офис", tech: "Технический отдел" },
        modal: {
            requirements: "Требования",
            duties: "Обязанности",
            formTitle: "Анкета кандидата",
            fio: "Ф.И.О.",
            phone: "Номер телефона",
            upload: "Загрузить резюме (PDF, DOCX)",
            submit: "Отправить анкету",
            success: "Ваше резюме успешно отправлено! Мы свяжемся с вами."
        }
    },
    uz: {
        heroTitle: "Kompaniyadagi karyera",
        heroSub: "BIZNING JAMOAMIZGA QO'SHILING",
        noVacancies: "Hozircha bo'sh ish o'rinlari mavjud emas",
        noVacanciesDesc: "Yangiliklarni kuzatib boring, biz doimiy ravishda o'sib bormoqdamiz va iqtidorli mutaxassislarni qidiramiz.",
        applyBtn: "Ariza topshirish",
        details: "Batafsil",
        searchPlaceholder: "Vakansiyalar bo'yicha qidiruv...",
        categories: { all: "Barchasi", production: "Ishlab chiqarish", office: "Ofis", tech: "Texnik bo'lim" },
        modal: {
            requirements: "Talablar",
            duties: "Vazifalar",
            formTitle: "Nomzod anketasi",
            fio: "F.I.SH.",
            phone: "Telefon raqami",
            upload: "Rezyume yuklash (PDF, DOCX)",
            submit: "Anketani yuborish",
            success: "Rezyumeingiz muvaffaqiyatli yuborildi! Siz bilan bog'lanamiz."
        }
    },
    en: {
        heroTitle: "Careers",
        heroSub: "JOIN OUR TEAM",
        noVacancies: "No open vacancies",
        noVacanciesDesc: "Stay tuned for updates, we are constantly growing and looking for specialists.",
        applyBtn: "Apply Now",
        details: "Details",
        searchPlaceholder: "Search vacancies...",
        categories: { all: "All", production: "Production", office: "Office", tech: "Technical" },
        modal: {
            requirements: "Requirements",
            duties: "Responsibilities",
            formTitle: "Candidate Form",
            fio: "Full Name",
            phone: "Phone Number",
            upload: "Upload CV (PDF, DOCX)",
            submit: "Submit Application",
            success: "Your application sent! We will contact you soon."
        }
    }
};

const fakeVacancies = [
    {
        id: 1,
        category: "production",
        type: "Full-time",
        ru: {
            title: "Сварщик (аргонщик)",
            dept: "Цех производства прицепов",
            loc: "Самарканд",
            req: ["Опыт работы от 2 лет", "Знание технологии сварки аргоном", "Наличие сертификата"],
            duty: ["Сварка узлов прицепов", "Контроль качества швов", "Соблюдение ТБ"]
        },
        uz: {
            title: "Payvandchi (argonchi)",
            dept: "Tirkama ishlab chiqarish sexi",
            loc: "Samarqand",
            req: ["2 yillik ish tajribasi", "Argon payvandlash texnologiyasini bilish", "Sertifikat mavjudligi"],
            duty: ["Tirkama qismlarini payvandlash", "Choklar sifatini nazorat qilish", "Xavfsizlik texnikasiga rioya qilish"]
        },
        en: {
            title: "Welder (Argon)",
            dept: "Production Shop",
            loc: "Samarkand",
            req: ["2 years experience", "Argon welding knowledge", "Certificate required"],
            duty: ["Welding components", "Quality control", "Safety compliance"]
        }
    },
    {
        id: 2,
        category: "office",
        type: "Full-time",
        ru: {
            title: "Менеджер по закупкам",
            dept: "Департамент логистики",
            loc: "Ташкент",
            req: ["Высшее образование", "Опыт в закупках от 1 года", "Знание 1С"],
            duty: ["Поиск поставщиков", "Заключение договоров", "Контроль поставок"]
        },
        uz: {
            title: "Xaridlar menejeri",
            dept: "Logistika departamenti",
            loc: "Toshkent",
            req: ["Oliy ma'lumot", "1 yillik ish tajribasi", "1C dasturini bilish"],
            duty: ["Yetkazib beruvchilarni topish", "Shartnomalar tuzish", "Ta'minot nazorati"]
        },
        en: {
            title: "Procurement Manager",
            dept: "Logistics",
            loc: "Tashkent",
            req: ["Higher education", "1 year experience", "1C knowledge"],
            duty: ["Vendor sourcing", "Contract management", "Supply control"]
        }
    }
];

const Careers = ({ lang = 'ru' }) => {
    const t = translations[lang] || translations.ru;
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState('all');
    const [selectedVacancy, setSelectedVacancy] = useState(null);
    const [applyVacancy, setApplyVacancy] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [form, setForm] = useState({ name: '', phone: '', file: null });

    const filteredVacancies = fakeVacancies.filter(v => {
        const matchesSearch = v[lang]?.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTab = activeTab === 'all' || v.category === activeTab;
        return matchesSearch && matchesTab;
    });

    const handleApplySubmit = async (e) => {
        e.preventDefault();
        if (!form.file) return alert("Please upload your CV");
        setIsLoading(true);

        const caption = `📄 *НОВОЕ РЕЗЮМЕ НА ВАКАНСИЮ*\n\n` +
            `💼 *Вакансия:* ${applyVacancy[lang].title}\n` +
            `👤 *Ф.И.О:* ${form.name}\n` +
            `📞 *Телефон:* ${form.phone}\n` +
            `🌐 *Язык:* ${lang.toUpperCase()}\n` +
            `📍 *Источник:* \`${window.location.href}\``;

        const formData = new FormData();
        formData.append('chat_id', CHANNEL_ID);
        formData.append('document', form.file);
        formData.append('caption', caption);
        formData.append('parse_mode', 'Markdown');

        try {
            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setIsSent(true);
                setTimeout(() => {
                    setIsSent(false);
                    setApplyVacancy(null);
                    setForm({ name: '', phone: '', file: null });
                }, 4000);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="pt-24 bg-[#F8FAFC] min-h-screen font-inter pb-32">

            <section className="relative h-[350px] lg:h-[400px] flex items-center bg-[#0a1425] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70 z-10"></div>
                <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2000" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale" alt="Careers" />
                <div className="relative z-20 max-w-[1440px] mx-auto px-6 lg:px-12 w-full text-center lg:text-left">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl lg:text-7xl font-semibold text-white tracking-tighter uppercase italic">{t.heroTitle}</motion.h1>
                </div>
            </section>

            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 -mt-12 relative z-30">
                <div className="bg-white rounded-[32px] p-6 shadow-xl border border-gray-100 mb-12 flex flex-col lg:flex-row gap-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="text" placeholder={t.searchPlaceholder} className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-100 transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                        {Object.entries(t.categories).map(([key, label]) => (
                            <button key={key} onClick={() => setActiveTab(key)} className={`px-6 py-3 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${activeTab === key ? 'bg-[#0054A6] text-white shadow-lg shadow-blue-900/20' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>{label}</button>
                        ))}
                    </div>
                </div>

                {/* LIST / EMPTY STATE */}
                <div className="space-y-4">
                    {filteredVacancies.length > 0 ? (
                        filteredVacancies.map((v) => (
                            <motion.div key={v.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row items-center justify-between gap-6 group">
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#0054A6] group-hover:bg-[#0054A6] group-hover:text-white transition-colors duration-500"><Briefcase size={24} /></div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#1a2e44]">{v[lang].title}</h3>
                                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">{v[lang].dept} • {v[lang].loc}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => setSelectedVacancy(v)} className="px-6 py-3 bg-gray-50 text-gray-600 rounded-xl font-bold text-xs uppercase cursor-pointer hover:bg-gray-100 transition-all">
                                        {t.details}
                                    </button>
                                    <button onClick={() => setApplyVacancy(v)} className="px-6 py-3 bg-[#0054A6] text-white rounded-xl font-bold text-xs uppercase cursor-pointer hover:bg-blue-700 shadow-lg shadow-blue-900/10 transition-all">
                                        {t.applyBtn}
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        /* --- VAKANSIYALAR BO'SH BO'LGANDA CHIQUVCHI BLOK --- */
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white rounded-[48px] p-20 border border-dashed border-gray-200 flex flex-col items-center text-center space-y-6"
                        >
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-4">
                                <SearchX size={48} />
                            </div>
                            <h2 className="text-3xl font-bold text-[#1a2e44] tracking-tight italic">
                                {t.noVacancies}
                            </h2>
                            <p className="text-gray-400 max-w-md font-medium leading-relaxed">
                                {translations[lang].noVacanciesDesc || translations.ru.noVacanciesDesc}
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* MODALS (Batafsil va Anketa) kodi o'zgarishsiz qoldi */}
            <AnimatePresence>
                {selectedVacancy && (
                    <div className="fixed inset-0 z-[400] flex items-center justify-center px-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedVacancy(null)} className="absolute inset-0 bg-[#0a1425]/80 backdrop-blur-md" />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden">
                            <button onClick={() => setSelectedVacancy(null)} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-all cursor-pointer"><X size={20} /></button>
                            <div className="p-10 lg:p-14">
                                <h2 className="text-3xl font-bold text-[#1a2e44] mb-2">{selectedVacancy[lang]?.title}</h2>
                                <p className="text-[#0054A6] font-bold text-sm uppercase tracking-widest mb-10">{selectedVacancy[lang]?.dept}</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div>
                                        <h4 className="flex items-center gap-2 text-sm font-black uppercase text-gray-400 mb-4"><ListChecks size={18} /> {t.modal.requirements}</h4>
                                        <ul className="space-y-3">
                                            {(selectedVacancy[lang]?.req || []).map((r, i) => (
                                                <li key={i} className="text-sm font-semibold text-gray-600 flex gap-2">
                                                    <div className="w-1.5 h-1.5 bg-[#0054A6] rounded-full mt-1.5 shrink-0" /> {r}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="flex items-center gap-2 text-sm font-black uppercase text-gray-400 mb-4"><Target size={18} /> {t.modal.duties}</h4>
                                        <ul className="space-y-3">
                                            {(selectedVacancy[lang]?.duty || []).map((d, i) => (
                                                <li key={i} className="text-sm font-semibold text-gray-600 flex gap-2">
                                                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-1.5 shrink-0" /> {d}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <button onClick={() => { setSelectedVacancy(null); setApplyVacancy(selectedVacancy); }} className="w-full mt-12 bg-[#0054A6] py-5 rounded-2xl text-white font-bold uppercase tracking-widest hover:bg-blue-700 transition-all cursor-pointer shadow-xl">
                                    {t.applyBtn}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {applyVacancy && (
                    <div className="fixed inset-0 z-[500] flex items-center justify-center px-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !isLoading && setApplyVacancy(null)} className="absolute inset-0 bg-[#0a1425]/90 backdrop-blur-xl" />
                        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="relative bg-white w-full max-w-lg rounded-[40px] p-10 lg:p-12 shadow-2xl">
                            <button onClick={() => setApplyVacancy(null)} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black cursor-pointer"><X size={24} /></button>

                            {!isSent ? (
                                <form onSubmit={handleApplySubmit} className="space-y-6">
                                    <div className="text-center mb-8">
                                        <h2 className="text-2xl font-bold text-[#1a2e44] mb-2">{t.modal.formTitle}</h2>
                                        <p className="text-sm font-medium text-[#0054A6] uppercase tracking-wider">{applyVacancy[lang]?.title}</p>
                                    </div>
                                    <input required type="text" placeholder={t.modal.fio} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-semibold outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
                                    <input required type="tel" placeholder={t.modal.phone} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-semibold outline-none focus:ring-2 focus:ring-blue-100 transition-all" />

                                    <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-[32px] cursor-pointer transition-all ${form.file ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                        <div className="flex flex-col items-center justify-center text-center px-4">
                                            {form.file ? (
                                                <><CheckCircle2 size={28} className="text-green-500 mb-2" /><p className="text-xs font-bold text-green-700 truncate max-w-[250px]">{form.file.name}</p></>
                                            ) : (
                                                <><FilePlus size={28} className="text-gray-400 mb-2" /><p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{t.modal.upload}</p></>
                                            )}
                                        </div>
                                        <input type="file" className="hidden" accept=".pdf,.doc,.docx" required onChange={(e) => setForm({ ...form, file: e.target.files[0] })} />
                                    </label>

                                    <button type="submit" disabled={isLoading} className="w-full bg-[#0054A6] py-5 rounded-2xl text-white font-bold uppercase tracking-widest shadow-lg hover:bg-blue-700 disabled:bg-gray-300 transition-all flex items-center justify-center gap-3">
                                        {isLoading ? <Loader2 className="animate-spin" /> : t.modal.submit}
                                    </button>
                                </form>
                            ) : (
                                <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="text-center py-10">
                                    <CheckCircle2 size={80} className="text-green-500 mx-auto mb-6" />
                                    <h3 className="text-2xl font-bold text-[#1a2e44] mb-2">{t.modal.success}</h3>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Careers;