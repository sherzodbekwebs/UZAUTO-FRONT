import React, { useEffect } from 'react'; // useEffect qo'shildi
import { useLocation } from 'react-router-dom'; // useLocation qo'shildi
import Hero from './components/Hero/hero';
import HomeMission from './components/HomeMission/HomeMission';
import ProductionStats from './components/ProductionStats/ProductionStats';
import CallCenter from './components/CallCenter/CallCenter';
import NewsSection from './components/NewsSection/NewsSection';
import Partners from './components/Partners/Partners';


const Home = ({ lang }) => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');

            // Komponentlar render bo'lishini kutish uchun interval
            const scrollToElement = () => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    return true;
                }
                return false;
            };

            // Birinchi urinish
            if (!scrollToElement()) {
                // Agar darrov topilmasa, har 100ms da tekshirib turadi (maksimal 1 sekund)
                let attempts = 0;
                const interval = setInterval(() => {
                    attempts++;
                    if (scrollToElement() || attempts > 10) {
                        clearInterval(interval);
                    }
                }, 100);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]); 

    return (
        <>
            <Hero lang={lang} />
            <HomeMission lang={lang} />
            <ProductionStats lang={lang} />
            <CallCenter lang={lang} />
            <NewsSection lang={lang} />
            <Partners lang={lang} />
        </>
    );
};

export default Home;