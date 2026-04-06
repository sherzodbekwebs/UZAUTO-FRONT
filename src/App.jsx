import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast' // Professional bildirishnomalar uchun
import './App.css'

// 🛡️ MARKAZIY API XIZMATI
import API from './api/axios'

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

// MAHSULOTLAR SAHIFALARI
import ProductsPage from './components/ProductsPage/ProductsPage'
import ProductDetailPage from './components/ProductDetailPage/ProductDetailPage' // Buni keyinchalik yaratamiz

// Dinamik sahifa komponenti
import DynamicPage from './components/DynamicPage/DynamicPage'
import { LanguageProvider } from './context/LanguageContext'

function App() {
  const [lang, setLang] = useState('ru');
  const [dynamicRoutes, setDynamicRoutes] = useState([]);

  // Backenddan dinamik yaratilgan sahifalar yo'llarini (slug) olamiz
  useEffect(() => {
    API.get('/pages/active-routes')
      .then(res => {
        setDynamicRoutes(res.data);
      })
      .catch(err => console.error("Dinamik yo'llarni yuklashda xato:", err));
  }, []);

  return (
    <LanguageProvider>

      <Router>
        <div className="flex flex-col min-h-screen font-inter">
          {/* Sahifa o'zgarganda tepaga qaytarish */}
          <ScrollToTop />

          {/* Bildirishnomalar markazi (toast) */}
          <Toaster position="top-center" reverseOrder={false} />

          {/* Asosiy navigatsiya */}
          <Navbar lang={lang} setLang={setLang} />

          <main className="flex-grow pt-16 lg:pt-20"> {/* Navbar balandligi uchun */}
            <Routes>
              {/* 1. ASOSIY SAHIFALAR */}
              <Route path="/" element={<Home lang={lang} />} />
              <Route path="/news" element={<NewsListPage lang={lang} />} />
              <Route path="/news/:id" element={<NewsDetailPage lang={lang} />} />
              <Route path="/search" element={<SearchResults lang={lang} />} />
              <Route path="/contacts" element={<Contacts lang={lang} />} />

              {/* 🚀 MAHSULOTLAR BO'LIMI (Katalog va Detail) */}
              <Route path="/products" element={<ProductsPage lang={lang} />} />
              <Route path="/product/:id" element={<ProductDetailPage lang={lang} />} />

              {/* 2. STATIK KOMPANIYA SAHIFALARI */}
              <Route path="/page/general_information" element={<GeneralInfo lang={lang} />} />
              <Route path="/page/quality_management" element={<QualityManagement lang={lang} />} />
              <Route path="/page/history" element={<CompanyHistory lang={lang} />} />
              <Route path="/page/mission_vision" element={<MissionVision lang={lang} />} />
              <Route path="/page/affiliated_companies" element={<AffiliatedCompanies lang={lang} />} />
              <Route path="/page/registration_and_trademark_information" element={<RegistrationInfo lang={lang} />} />
              <Route path="/page/compliance_policy" element={<Compliance lang={lang} />} />
              <Route path="/page/careers" element={<Careers lang={lang} />} />
              <Route path="/page/achievements_and_awards" element={<Achievements lang={lang} />} />

              {/* 3. BACKENDDAN KELADIGAN DINAMIK SAHIFALAR */}
              {dynamicRoutes.map((route) => (
                <Route
                  key={route.slug}
                  path={`/page/${route.slug}`}
                  element={<DynamicPage lang={lang} slug={route.slug} />}
                />
              ))}

              {/* Xato yo'l bo'lsa bosh sahifaga qaytarish */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer lang={lang} />

          {/* Bog'lanish modali */}
          <ContactModal lang={lang} />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App