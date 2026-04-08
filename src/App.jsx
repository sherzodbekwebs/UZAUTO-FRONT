import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css'

// 🛡️ MARKAZIY API VA KONTEKST
import API from './api/axios'
import { LanguageProvider, useLanguage } from './context/LanguageContext'

// Komponentlar
import Navbar from './components/Navbar/navbar'
import Footer from './components/Footer/Footer'
import ContactModal from './components/ContactModal/ContactModal'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

// Sahifalar
import Home from './Home'
import NewsListPage from './components/NewsListPage/NewsListPage'
import NewsDetailPage from './components/NewsDetailPage/NewsDetailPage'
import SearchResults from './components/SearchResults/SearchResults'
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

// 🚀 Routing mantiqi alohida komponentda (Context ishlashi uchun)
const AppContent = () => {
  const { lang } = useLanguage(); // Global tilni contextdan olamiz
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

      {/* Navbar endi proplarsiz ishlaydi, u o'zi contextdan oladi */}
      <Navbar />

      <main className="flex-grow pt-16 lg:pt-20">
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/news" element={<NewsListPage lang={lang} />} />
          <Route path="/news/:id" element={<NewsDetailPage lang={lang} />} />
          <Route path="/search" element={<SearchResults lang={lang} />} />
          <Route path="/contacts" element={<Contacts lang={lang} />} />
          <Route path="/products" element={<ProductsPage lang={lang} />} />
          <Route path="/product/:id" element={<ProductDetailPage lang={lang} />} />

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
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;