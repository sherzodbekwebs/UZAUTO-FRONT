import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldAlert, Handshake, Scale, FileWarning, Mail, PhoneCall,
    MessageSquare, FileText, UserCheck, UserX, Send, ArrowRight,
    AlertTriangle, ShieldCheck, Briefcase, Settings, Activity
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const translations = {
    ru: {
        heroTitle: "Комплаенс политика",
        introText: "OOO «UZAUTO TRAILER» укрепляет позиций на рынках соседних стран не только путём продвижения доступных, надёжных и качественных большегрузных автотранспортных средств, а также навесной и прицепной техники к ним, но и активным развитием комплаенс норм.",
        ethicsText: "Действуя как социально, ответственная компания, уважая права человека и придерживаясь высочайших стандартов этики поведения и профессиональной деятельности, OOO «UZAUTO TRAILER» улучшает показатели бизнеса в долгосрочной перспективе Мы признаем безусловную ценность честности в поведении как деловых партнёров, так и персонала Компании. Честность и деловая этика имеют значение. Если вы поступаете правильно в любых обстоятельствах, это всегда ценится.",
        commitmentText: "OOO «UZAUTO TRAILER» в полной мере привержены этим принципам и требуем от наших Деловых партнёров, чтобы они разделяли эту приверженность и выполняли обязательства, изложенные в Кодексе Поведения Деловых Партнеров.",
        informPolicy: "OOO «UZAUTO TRAILER» придерживается Утвержденной Политики Информирования, и считает, что, каждый должен иметь возможность сообщать о случаях неэтичного и неправомерного поведения персонала компании, ее поставщиков и подрядчиков.",
        reportReason: "В связи с чем, если у Вас имеются беспокойства, доказательства нарушения, или имеются сведения о фактах:",
        violationList: [
            "не соблюдения деловой этики персонала компании;",
            "не соблюдения деловой этики бизнес партнера;",
            "мошенничества, взятничества;",
            "домогательства;",
            "конфликта интересов;",
            "нарушения персоналом компании внутренних утверждённых норм (политики, процедуры)."
        ],
        examplesHeader: "Список примеров нарушений, связанных с Предприятием, о которых необходимо сообщать по каналам связи:",
        examples: [
            "Нарушение нормативно-правовых актов Республики Узбекистан, в том числе международных договоров Республики Узбекистан, а также внутренних (локальных) актов Предприятия",
            "Проявление непорядочного, коррумпированного, мошеннического и иного противозаконного или нарушающего правила деловой этики поведения, включая вымогательство, получение и дачу взятки",
            "Воспрепятствование проведению внутренних и внешних проверок",
            "Нарушение, связанное с ведением бухгалтерской (финансовой) отчетности",
            "Конфликт интересов",
            "Незаконное распространение конфиденциальной информации",
            "Иную деятельность, носящую неприемлемый характер (дискриминация, нарушение прав человека и др.)"
        ],
        notExhaustive: "Данный список не является исчерпывающим, и содержит лишь некоторые из примеров действий, которые можно считать нарушениями.",
        channelsTitle: "КАНАЛЫ СВЯЗИ",
        channelsDesc: "Заявители вправе беспрепятственно, в том числе анонимно, сообщить Отделу комплаенс о фактах незаконных либо неэтичных действий работников Предприятия по следующим каналам связи:",
        directMessage: "Eсли Заявителем является работник Предприятия, он может сообщить о нарушениях напрямую своему непосредственному руководителю, службу по комплаенсу, департаменту по работе с персоналом или юридическому отделу",
        docLinks: [
            { title: "Комплаенс Политика ИП ООО \"UzAuto Trailer\"", url: "https://uzautotrailer.uz/storage/compiance/20230425%20%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0%20%D1%80%D1%83%D1%81%D1%81%20%D1%83%D0%B7%D0%B1.pdf" },
            { title: "Комплаенс Программа ИП ООО \"UzAuto Trailer\"", url: "https://uzautotrailer.uz/storage/compiance/%D0%98%D0%A2%D0%9E%D0%93%20%D0%9F%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0.pdf" },
            { title: "Кодекс поведения сотрудников ИП ООО \"UzAuto Trailer\"", url: "https://uzautotrailer.uz/storage/compiance/%D0%BA%D0%BE%D0%B4%D0%B5%D0%BA%D1%81%20%D0%BF%D0%BE%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%20%D1%81%D0%BE%D1%82%D1%80%D1%83%D0%B4%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2.pdf" },
            { title: "Кодекс поведения деловых партнеров ИП ООО \"UzAuto Trailer\"", url: "https://uzautotrailer.uz/storage/compiance/%D0%9F%D1%80%D0%B8%D0%BA%D0%B0%D0%B7%20%E2%84%9633-%D0%9F%D0%9E%D0%94%20%D0%BE%D1%82%2011.06.2019%20%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%201.pdf" }
        ],
        formTitle: "Отправить сообщение с сайта",
        formTypeOpen: "Открыто",
        formTypeAnon: "Анонимно",
        fields: { fio: "Ф.И.О.", email: "Э-почта", subject: "Предмет сообщения", phone: "Телефон", message: "Сообщение", submit: "Отправить" },
        policyHeader: "Обязательства политики в области качества",
        mgmtTitle: "Руководители подразделений:",
        staffTitle: "Каждый работник предприятия:",
        privacy: "Официальный документ UzAuto Trailer"
    },
    uz: {
        heroTitle: "Komplaens siyosati",
        introText: "«UZAUTO TRAILER» MCHJ qo'shni davlatlar bozorlaridagi o'rnini nafaqat hamyonbop va sifatli og'ir yuk texnikalarini ilgari surish, balki komplaens normalarini faol rivojlantirish orqali ham mustahkamlamoqda.",
        ethicsText: "Ijtimoiy mas'uliyatli kompaniya sifatida harakat qilib, inson huquqlarini hurmat qilgan holda va xulq-atvor hamda professional faoliyatning eng yuqori etika standartlariga rioya qilib, «UZAUTO TRAILER» MCHJ biznes ko'rsatkichlarini uzoq muddatli istiqbolda yaxshilaydi. Biz biznes hamkorlar va xodimlarning halol xulq-atvorini so'zsiz qadriyat deb bilamiz. Agar har qanday vaziyatda to'g'ri ish qilsangiz, bu doimo qadrlanadi.",
        commitmentText: "«UZAUTO TRAILER» MCHJ ushbu tamoyillarga to'liq sodiqdir va biznes hamkorlarimizdan ham ushbu sodiqlikni baham ko'rishni hamda Biznes hamkorlarning odob-axloq kodeksida belgilangan majburiyatlarni bajarishni talab qiladi.",
        informPolicy: "«UZAUTO TRAILER» MCHJ Tasdiqlangan xabardor qilish siyosatiga amal qiladi va har bir kishi kompaniya xodimlari, yetkazib beruvchilari va pudratchilarining noetik va g'ayriqonuniy xatti-harakatlari to'g'risida xabar berish imkoniyatiga ega bo'lishi kerak deb hisoblaydi.",
        reportReason: "Shu munosabat bilan, agar sizda xavotirlar, qonunbuzarlik dalillari yoki quyidagi faktlar bo'yicha ma'lumotlar bo'lsa:",
        violationList: [
            "kompaniya xodimlarining ishbilarmonlik etikasiga rioya qilmasligi;",
            "biznes hamkorning ishbilarmonlik etikasiga rioya qilmasligi;",
            "firibgarlik, poraxo'rlik;",
            "shaxshiy daxlsizlikka tajovuz (tazyiqlar);",
            "manfaatlar to'qnashuvi;",
            "kompaniya xodimlari tomonidan ichki tasdiqlangan normalarning (siyosat, protseduralar) buzilishi."
        ],
        examplesHeader: "Aloqa kanallari orqali xabar berilishi kerak bo'lgan Korxona bilan bog'liq qonunbuzarliklar ro'yxati:",
        examples: [
            "O'zbekiston Respublikasi normativ-huquqiy hujjatlarini, xalqaro shartnomalarini, shuningdek Korxonaning ichki hujjatlarini buzish",
            "Insofsiz, korrupsion, firibgarlik va boshqa noqonuniy xatti-harakatlar, jumladan tovlamachilik va pora olish/berish",
            "Ichki va tashqi tekshiruvlar o'tkazilishiga to'sqinlik qilish",
            "Buxgalteriya (moliyaviy) hisobotini yuritish bilan bog'liq qonunbuzarliklar",
            "Manfaatlar to'qnashuvi",
            "Konfidentsial ma'lumotlarning noqonuniy tarqalishi",
            "Nomaqbul xarakterdagi boshqa faoliyat (kamsitish, inson huquqlarining buzilishi va b.)"
        ],
        notExhaustive: "Ushbu ro'yxat to'liq emas va faqat qonunbuzarlik deb hisoblanishi mumkin bo'lgan harakatlarning ba'zi namunalarini o'z ichiga oladi.",
        channelsTitle: "ALOQA KANALLARI",
        channelsDesc: "Arizachilar moneliksiz, jumladan anonim tarzda, Korxona xodimlarining noqonuniy yoki noetik harakatlari haqida Komplaens bo'limiga quyidagi kanallar orqali xabar berishlari mumkin:",
        directMessage: "Agar Arizachi Korxona xodimi bo'lsa, u qonunbuzarliklar haqida bevosita o'z rahbariga, komplaens xizmatiga, xodimlar bilan ishlash departamentiga yoki yuridik bo'limga xabar berishi mumkin.",
        docLinks: [
            { title: "«UzAuto Trailer» XRP MCHJ Komplaens Siyosati", url: "https://uzautotrailer.uz/storage/compiance/20230425%20%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0%20%D1%80%D1%83%D1%81%D1%81%20%D1%83%D0%B7%D0%B1.pdf" },
            { title: "«UzAuto Trailer» XRP MCHJ Komplaens Dasturi", url: "https://uzautotrailer.uz/storage/compiance/%D0%98%D0%A2%D0%9E%D0%93%20%D0%9F%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0.pdf" },
            { title: "«UzAuto Trailer» XRP MCHJ xodimlarining odob-axloq kodeksi", url: "https://uzautotrailer.uz/storage/compiance/%D0%BA%D0%BE%D0%B4%D0%B5%D0%BA%D1%81%20%D0%BF%D0%BE%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%20%D1%81%D0%BE%D1%82%D1%80%D1%83%D0%B4%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2.pdf" },
            { title: "«UzAuto Trailer» XRP MCHJ biznes hamkorlarining odob-axloq kodeksi", url: "https://uzautotrailer.uz/storage/compiance/%D0%9F%D1%80%D0%B8%D0%BA%D0%B0%D0%B7%20%E2%84%9633-%D0%9F%D0%9E%D0%94%20%D0%BE%D1%82%2011.06.2019%20%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%201.pdf" }
        ],
        formTitle: "Sayt orqali xabar yuborish",
        formTypeOpen: "Ochiq",
        formTypeAnon: "Anonim",
        fields: { fio: "F.I.SH.", email: "E-pochta", subject: "Xabar mavzusi", phone: "Telefon", message: "Xabar matni", submit: "Yuborish" },
        policyHeader: "Sifat sohasidagi siyosat majburiyatlari",
        mgmtTitle: "Bo'linma rahbarlari:",
        staffTitle: "Korxonaning har bir xodimi:",
        privacy: "UzAuto Trailer rasmiy hujjati"
    },
    en: {
        heroTitle: "Compliance Policy",
        introText: "UzAuto Trailer LLC strengthens its positions in the markets of neighboring countries not only by promoting affordable, reliable, and high-quality heavy-duty vehicles, as well as mounted and trailer equipment for them, but also through the active development of compliance norms.",
        ethicsText: "Acting as a socially responsible company, respecting human rights and adhering to the highest standards of ethical behavior and professional activity, UzAuto Trailer LLC improves business performance in the long term. We recognize the unconditional value of honesty in the behavior of both business partners and Company personnel. Integrity and business ethics matter. Doing the right thing under any circumstances is always valued.",
        commitmentText: "UzAuto Trailer LLC is fully committed to these principles and requires our Business Partners to share this commitment and fulfill the obligations set forth in the Code of Conduct for Business Partners.",
        informPolicy: "UzAuto Trailer LLC adheres to the Approved Informing Policy and believes that everyone should have the opportunity to report cases of unethical and unlawful behavior by company personnel, its suppliers, and contractors.",
        reportReason: "In this regard, if you have concerns, evidence of violations, or information about facts regarding:",
        violationList: [
            "non-compliance with business ethics by company personnel;",
            "non-compliance with business ethics by a business partner;",
            "fraud, bribery;",
            "harassment;",
            "conflict of interest;",
            "violation of internal approved norms (policies, procedures) by company personnel."
        ],
        examplesHeader: "List of examples of violations related to the Enterprise that must be reported through communication channels:",
        examples: [
            "Violation of the legislative acts of the Republic of Uzbekistan, including international treaties of the Republic of Uzbekistan, as well as internal (local) acts of the Enterprise",
            "Manifestations of dishonest, corrupt, fraudulent, or other illegal behavior that violates business ethics, including extortion, receiving, and giving bribes",
            "Obstructing internal and external audits",
            "Violations related to the maintenance of accounting (financial) reporting",
            "Conflict of interest",
            "Illegal disclosure of confidential information",
            "Other activities of an unacceptable nature (discrimination, human rights violations, etc.)"
        ],
        notExhaustive: "This list is not exhaustive and contains only some examples of actions that can be considered violations.",
        channelsTitle: "COMMUNICATION CHANNELS",
        channelsDesc: "Applicants have the right to freely, including anonymously, report facts of illegal or unethical actions of Enterprise employees to the Compliance Department through the following communication channels:",
        directMessage: "If the Applicant is an employee of the Enterprise, they can report violations directly to their immediate supervisor, the compliance service, the human resources department, or the legal department.",
        docLinks: [
            { title: "Compliance Policy of FE \"UzAuto Trailer\" LLC", url: "https://uzautotrailer.uz/storage/compiance/20230425%20%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0%20%D1%80%D1%83%D1%81%D1%81%20%D1%83%D0%B7%D0%B1.pdf" },
            { title: "Compliance Program of FE \"UzAuto Trailer\" LLC", url: "https://uzautotrailer.uz/storage/compiance/%D0%98%D0%A2%D0%9E%D0%93%20%D0%9F%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0.pdf" },
            { title: "Code of Conduct for Employees of FE \"UzAuto Trailer\" LLC", url: "https://uzautotrailer.uz/storage/compiance/%D0%BA%D0%BE%D0%B4%D0%B5%D0%BA%D1%81%20%D0%BF%D0%BE%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%20%D1%81%D0%BE%D1%82%D1%80%D1%83%D0%B4%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2.pdf" },
            { title: "Code of Conduct for Business Partners of FE \"UzAuto Trailer\" LLC", url: "https://uzautotrailer.uz/storage/compiance/%D0%9F%D1%80%D0%B8%D0%BA%D0%B0%D0%B7%20%E2%84%9633-%D0%9F%D0%9E%D0%94%20%D0%BE%D1%82%2011.06.2019%20%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%201.pdf" }
        ],
        formTitle: "Send a message via the website",
        formTypeOpen: "Openly",
        formTypeAnon: "Anonymously",
        fields: { fio: "Full Name", email: "E-mail", subject: "Subject of message", phone: "Phone", message: "Message", submit: "Submit" },
        policyHeader: "Obligations of the Quality Policy",
        mgmtTitle: "Heads of all structural units:",
        staffTitle: "Every employee of the Enterprise:",
        privacy: "Official UzAuto Trailer Document"
    }
};

const Compliance = ({ lang = 'ru' }) => {
    const t = translations[lang] || translations.ru;
    const { hash } = useLocation();
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', phone: '', message: '' });

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
        } else { window.scrollTo(0, 0); }
    }, [hash]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting report:", { isAnonymous, ...formData });
        alert(lang === 'ru' ? "Сообщение отправлено." : "Xabar yuborildi.");
    };

    return (
        <div className="pt-24 bg-[#F8FAFC] font-inter min-h-screen pb-32">

            {/* 1. HERO SECTION */}
            <section className="relative h-[400px] flex items-center bg-[#0a1425] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a1425] via-transparent to-[#0a1425] z-10"></div>
                <motion.img
                    initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 0.3 }} transition={{ duration: 1.5 }}
                    src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover grayscale"
                    alt="Compliance"
                />
                <div className="relative z-20 max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                        <span className="text-[#0054A6] font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block underline decoration-2 underline-offset-8">UzAuto Trailer Integrity</span>
                        <h1 className="text-4xl lg:text-7xl font-semibold text-white tracking-tighter italic uppercase leading-none">{t.heroTitle}</h1>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 -mt-12 relative z-30">

                {/* 2. INTRO & ETHICS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-stretch">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-8 bg-white rounded-[48px] p-10 lg:p-16 shadow-xl border border-gray-100">
                        <p className="text-xl lg:text-2xl font-semibold text-[#1a2e44] leading-relaxed mb-10 border-l-4 border-[#0054A6] pl-8">{t.introText}</p>
                        <div className="space-y-6 text-gray-500 text-lg leading-relaxed text-justify font-medium">
                            <p>{t.ethicsText}</p>
                            <div className="p-8 bg-blue-50/50 rounded-[32px] border border-blue-100/50 flex gap-6 items-start">
                                <Handshake className="text-[#0054A6] shrink-0" size={32} />
                                <p className="text-[#1a2e44] font-bold italic">{t.commitmentText}</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-4 bg-[#0054A6] rounded-[48px] p-10 text-white shadow-2xl flex flex-col justify-center relative overflow-hidden">
                        <Scale className="absolute -right-10 -bottom-10 opacity-10" size={300} />
                        <h4 className="text-[10px] font-black tracking-[0.4em] opacity-70 mb-10 uppercase">Policy Notice</h4>
                        <p className="text-xl lg:text-2xl font-semibold leading-relaxed relative z-10 italic">{t.informPolicy}</p>
                    </motion.div>
                </div>

                {/* 3. VIOLATIONS & EXAMPLES */}
                <section id="violations" className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 scroll-mt-28">
                    <div className="lg:col-span-5">
                        <div className="sticky top-32 space-y-6">
                            <div className="w-16 h-1 bg-[#0054A6] rounded-full"></div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2e44] tracking-tight leading-tight">{t.reportReason}</h2>
                        </div>
                    </div>
                    <div className="lg:col-span-7 grid grid-cols-1 gap-4">
                        {t.violationList.map((item, i) => (
                            <motion.div key={i} whileHover={{ x: 10 }} className="flex gap-6 items-center p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:border-red-100 transition-all">
                                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0"><FileWarning size={20} className="text-red-500" /></div>
                                <span className="text-[15px] lg:text-[16px] text-gray-600 font-bold leading-tight">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 4. EXAMPLES GRID */}
                <div id="examples" className="mb-32 scroll-mt-28 bg-white rounded-[56px] p-8 lg:p-20 shadow-sm border border-gray-100">
                    <h3 className="text-xl lg:text-2xl font-bold text-[#1a2e44] mb-12 max-w-3xl leading-snug">{t.examplesHeader}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {t.examples.map((ex, i) => (
                            <div key={i} className="flex gap-6 items-start group">
                                <span className="text-4xl font-black text-blue-100 group-hover:text-[#0054A6] transition-colors duration-500 leading-none">{i + 1}</span>
                                <p className="text-[15px] text-gray-500 font-semibold leading-relaxed pt-1">{ex}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. CHANNELS & PDF DOWNLOADS */}
                <div id="channels" className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-32 scroll-mt-28">
                    <div className="lg:col-span-8 bg-[#1a2e44] rounded-[56px] p-10 lg:p-16 text-white relative overflow-hidden shadow-2xl">
                        <MessageSquare className="absolute -right-10 -bottom-10 opacity-5" size={400} />
                        <h2 className="text-3xl font-bold mb-6 tracking-tight uppercase">{t.channelsTitle}</h2>
                        <p className="text-gray-400 font-medium mb-12 max-w-2xl">{t.channelsDesc}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-[#0054A6] font-black text-[10px] tracking-[0.3em] uppercase mb-2"><Mail size={14} /> Электронная почта</div>
                                <a href="mailto:compliance@trailer.uz" className="text-xl font-bold hover:text-[#0054A6] transition-colors border-b border-white/10 pb-1">compliance@trailer.uz</a>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-[#0054A6] font-black text-[10px] tracking-[0.3em] uppercase mb-2"><PhoneCall size={14} /> Горячая линия</div>
                                <a href="tel:+998712023883" className="text-xl font-bold hover:text-[#0054A6] transition-colors tracking-tighter">+998 71 202 38 83</a>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-4 flex flex-col">
                        {t.docLinks.map((doc, i) => (
                            <motion.a
                                key={i} href={doc.url} target="_blank" rel="noopener noreferrer"
                                whileHover={{ x: 10, backgroundColor: "#0054A6", color: "white" }}
                                className="flex-1 bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between group transition-all cursor-pointer"
                            >
                                <span className="text-[13px] font-bold leading-tight max-w-[80%]">{doc.title}</span>
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                    <FileText size={20} className="text-[#0054A6] group-hover:text-white" />
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* 6. WHISTLEBLOWING FORM */}
                <section id="compliance-form" className="max-w-4xl mx-auto scroll-mt-28">
                    <div className="bg-white rounded-[60px] p-8 lg:p-16 shadow-2xl border border-gray-100 relative overflow-hidden">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-[#1a2e44] mb-4">{t.formTitle}</h2>
                            <div className="w-12 h-1 bg-[#0054A6] mx-auto rounded-full mb-10"></div>
                            <div className="inline-flex bg-gray-100 p-1.5 rounded-2xl">
                                <button onClick={() => setIsAnonymous(false)} className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${!isAnonymous ? 'bg-white text-[#1a2e44] shadow-md' : 'text-gray-400 hover:text-gray-600'}`}><UserCheck size={16} /> {t.formTypeOpen}</button>
                                <button onClick={() => setIsAnonymous(true)} className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${isAnonymous ? 'bg-[#0054A6] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}><UserX size={16} /> {t.formTypeAnon}</button>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <AnimatePresence mode="popLayout">
                                {!isAnonymous && (
                                    <>
                                        <motion.input initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} required type="text" placeholder={t.fields.fio} className="w-full bg-gray-50 border border-transparent focus:border-blue-200 focus:bg-white rounded-2xl px-6 py-4 text-sm font-semibold outline-none transition-all" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                        <motion.input initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} required type="email" placeholder={t.fields.email} className="w-full bg-gray-50 border border-transparent focus:border-blue-200 focus:bg-white rounded-2xl px-6 py-4 text-sm font-semibold outline-none transition-all" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                    </>
                                )}
                            </AnimatePresence>
                            <input required type="text" placeholder={t.fields.subject} className="w-full bg-gray-50 border border-transparent focus:border-blue-200 focus:bg-white rounded-2xl px-6 py-4 text-sm font-semibold outline-none transition-all" onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
                            <input type="tel" placeholder={t.fields.phone} className="w-full bg-gray-50 border border-transparent focus:border-blue-200 focus:bg-white rounded-2xl px-6 py-4 text-sm font-semibold outline-none transition-all" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                            <textarea required rows="5" placeholder={t.fields.message} className="md:col-span-2 w-full bg-gray-50 border border-transparent focus:border-blue-200 focus:bg-white rounded-3xl px-6 py-4 text-sm font-semibold outline-none transition-all resize-none" onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
                            <div className="md:col-span-2 flex flex-col items-center pt-6">
                                <button type="submit" className="bg-[#0054A6] hover:bg-[#004488] text-white px-16 py-5 rounded-full font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-blue-900/20 transition-all active:scale-95 flex items-center gap-3 group">
                                    {t.fields.submit} <Send size={16} />
                                </button>
                                <p className="mt-6 flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest"><ShieldCheck size={14} className="text-green-500" /> {t.privacy}</p>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Compliance;