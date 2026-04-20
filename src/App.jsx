import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // 🟢 Yangi qo'shildi
import './App.css'

// 🛡️ MARKAZIY API VA KONTEKST
import API from './api/axios'
import { LanguageProvider, useLanguage } from './context/LanguageContext'

// Komponentlar ... (hamma importlar o'z joyida)
import Navbar from './components/Navbar/navbar'
import Footer from './components/Footer/Footer'
import ContactModal from './components/ContactModal/ContactModal'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

// Sahifalar ... (hamma importlar o'z joyida)
import Home from './Home'
import NewsListPage from './components/NewsListPage/NewsListPage'
import NewsDetailPage from './components/NewsDetailPage/NewsDetailPage'
import Contacts from './components/Contacts/Contacts'
import GeneralInfo from './components/GeneralInfo/GeneralInfo'
import QualityManagement from './components/QualityManagement/QualityManagement'
import CompanyHistory from './components/History/History'
import MissionVision from './components/MissionVision/MissionVision'
import AffiliatedCompanies from './components/AffiliatedCompanies/AffiliatedCompanies'
import RegistrationInfo from './components/RegistrationInfo/RegistrationInfo'
import Compliance from './components/Compliance/Compliance'
import Careers from './components/Careers/Careers'
import Achievements from './components/Achievements/Achievements'
import ProductsPage from './components/ProductsPage/ProductsPage'
import ProductDetailPage from './components/ProductDetailPage/ProductDetailPage'
import DynamicPage from './components/DynamicPage/DynamicPage'
import QualityPolicy from './components/QualityPolicy/QualityPolicy';
import QualityAwards from './components/QualityAwards/QualityAwards'
import Technologies from './components/Technologies/Technologies'
import DesignBureau from './components/DesignBureau//DesignBureau'

// 🟢 QueryClient sozlamalari (Front-endda ma'lumotni keshda saqlash vaqti)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 daqiqa davomida ma'lumotni keshdan oladi (API ga qayta chiqmaydi)
      cacheTime: 1000 * 60 * 30, // Ma'lumot xotirada 30 daqiqa saqlanadi
      refetchOnWindowFocus: false, // Tablar o'zgarganda qayta so'rov yubormaydi
    },
  },
});

const AppContent = () => {
  const { lang } = useLanguage();
  const [dynamicRoutes, setDynamicRoutes] = useState([]);

  useEffect(() => {
    API.get('/pages/active-routes')
      .then(res => setDynamicRoutes(res.data))
      .catch(err => console.error("Dinamik yo'llarni yuklashda xato:", err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-inter">
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} />

      <Navbar />

      <main className="flex-grow pt-16 lg:pt-20">
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/news" element={<NewsListPage lang={lang} />} />
          <Route path="/news/:id" element={<NewsDetailPage lang={lang} />} />
          <Route path="/contacts" element={<Contacts lang={lang} />} />
          <Route path="/products" element={<ProductsPage lang={lang} />} />
          <Route path="/product/:id" element={<ProductDetailPage lang={lang} />} />

          {/* ... Boshqa barcha statik yo'llar */}
          <Route path="/page/general_information" element={<GeneralInfo lang={lang} />} />
          <Route path="/page/quality_management" element={<QualityManagement lang={lang} />} />
          <Route path="/page/history" element={<CompanyHistory lang={lang} />} />
          <Route path="/page/mission_vision" element={<MissionVision lang={lang} />} />
          <Route path="/page/affiliated_companies" element={<AffiliatedCompanies lang={lang} />} />
          <Route path="/page/registration_and_trademark_information" element={<RegistrationInfo lang={lang} />} />
          <Route path="/page/compliance_policy" element={<Compliance lang={lang} />} />
          <Route path="/page/careers" element={<Careers lang={lang} />} />
          <Route path="/page/achievements_and_awards" element={<Achievements lang={lang} />} />
          <Route path="/page/quality_policy" element={<QualityPolicy lang={lang} />} />
          <Route path="/page/quality_awards" element={<QualityAwards lang={lang} />} />
          <Route path="/page/technologies" element={<Technologies lang={lang} />} />
          <Route path="/page/design_bureau" element={<DesignBureau lang={lang} />} />

          {dynamicRoutes.map((route) => (
            <Route
              key={route.slug}
              path={`/page/${route.slug}`}
              element={<DynamicPage lang={lang} slug={route.slug} />}
            />
          ))}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer lang={lang} />
      <ContactModal lang={lang} />
    </div>
  );
}

function App() {
  return (
    // 🟢 QueryClientProvider barcha App ni o'rab olishi kerak
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router>
          <AppContent />
        </Router>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;