"use client";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { GrandDistributeur } from './components/GrandDistributeur';
import { EntrepriseLocal } from './components/EntrepriseLocal';
import { CataloguePage } from './components/CataloguePage';
import { LocationSidebar } from './components/LocationSidebar';
import { AboutUs } from './components/AboutUs';
import { DownloadApp } from './components/DownloadApp';
import { ContactFAQ } from './components/ContactFAQ';
import { BusinessPage } from './components/BusinessPage';
import { LegalNotice } from './components/LegalNotice';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { DistributeurPage } from './components/DistributeurPage';
import { AdminPage } from './components/AdminPage';
import { SearchPage } from './components/SearchPage';

function App() {
  const [isLocationSidebarOpen, setIsLocationSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<'FR' | 'EN'>('FR');

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header 
          onLocationClick={() => setIsLocationSidebarOpen(true)}
          language={language}
          onLanguageChange={setLanguage}
        />
        
        <LocationSidebar 
          isOpen={isLocationSidebarOpen}
          onClose={() => setIsLocationSidebarOpen(false)}
          language={language}
        />

        <main className="min-h-[calc(100vh-400px)]">
          <Routes>
            <Route path="/" element={<HomePage language={language} />} />
            <Route path="/grand-distributeur" element={<GrandDistributeur language={language} />} />
            <Route path="/entreprise-local" element={<EntrepriseLocal language={language} />} />
            <Route path="/catalogue/:country/:city?" element={<CataloguePage language={language} />} />
            <Route path="/about-us" element={<AboutUs language={language} />} />
            <Route path="/download-app" element={<DownloadApp language={language} />} />
            <Route path="/contact-faq" element={<ContactFAQ language={language} />} />
            <Route path="/business" element={<BusinessPage language={language} />} />
            <Route path="/legal-notice" element={<LegalNotice language={language} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy language={language} />} />
            <Route path="/terms-of-service" element={<TermsOfService language={language} />} />
            <Route path="/distributeur/:slug" element={<DistributeurPage language={language} />} />
            <Route path="/admin" element={<AdminPage language={language} />} />
            <Route path="/search" element={<SearchPage language={language} />} />
          </Routes>
        </main>

        <Footer language={language} />
      </div>
    </Router>
  );
}

export default App;