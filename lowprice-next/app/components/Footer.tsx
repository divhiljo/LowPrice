"use client";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

interface FooterProps {
  language: 'FR' | 'EN';
}

export function Footer({ language }: FooterProps) {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail === 'admin@lowprice.cm' && adminPassword === 'admin123') {
      navigate('/admin');
    } else {
      alert(language === 'FR' ? 'Email ou mot de passe incorrect' : 'Incorrect email or password');
    }
  };

  const text = {
    FR: {
      company: 'Notre Entreprise',
      about: 'Qui sommes-nous?',
      downloadApp: 'Télécharger notre app',
      catalog: 'Notre catalogue',
      retailers: 'Grand distributeur',
      local: 'Entreprise local',
      contact: 'Contact',
      contactFaq: 'Contact & FAQ',
      business: 'LowPrice pour les entreprises',
      legal: 'Juridiction',
      legalNotice: 'Mention légale',
      privacy: 'Politique de confidentialité',
      terms: 'CGU',
      adminLogin: 'Connexion admin',
      email: 'Email',
      password: 'Mot de passe',
      login: 'Connexion',
      cancel: 'Annuler',
    },
    EN: {
      company: 'Our Company',
      about: 'About us',
      downloadApp: 'Download our app',
      catalog: 'Our catalog',
      retailers: 'Major retailers',
      local: 'Local business',
      contact: 'Contact',
      contactFaq: 'Contact & FAQ',
      business: 'LowPrice for business',
      legal: 'Legal',
      legalNotice: 'Legal notice',
      privacy: 'Privacy policy',
      terms: 'Terms of use',
      adminLogin: 'Admin login',
      email: 'Email',
      password: 'Password',
      login: 'Login',
      cancel: 'Cancel',
    },
  };

  const t = text[language];

  return (
    <footer className="bg-white border-t border-gray-100 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Notre Entreprise */}
          <div>
            <h4 className="text-gray-900 mb-6">{t.company}</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate('/about-us')}
                  className="text-gray-600 hover:text-gray-900 transition-colors text-left text-sm"
                >
                  {t.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/download-app')}
                  className="text-gray-600 hover:text-gray-900 transition-colors text-left text-sm"
                >
                  {t.downloadApp}
                </button>
              </li>
            </ul>
          </div>

          {/* Notre catalogue */}
          <div>
            <h4 className="text-gray-900 mb-6">{t.catalog}</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate('/grand-distributeur')}
                  className="text-gray-600 hover:text-gray-900 transition-colors text-left text-sm"
                >
                  {t.retailers}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/entreprise-local')}
                  className="text-gray-600 hover:text-gray-900 transition-colors text-left text-sm"
                >
                  {t.local}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 mb-6">{t.contact}</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate('/contact-faq')}
                  className="text-gray-600 hover:text-gray-900 transition-colors text-left text-sm"
                >
                  {t.contactFaq}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/business')}
                  className="text-gray-600 hover:text-gray-900 transition-colors text-left text-sm"
                >
                  {t.business}
                </button>
              </li>
            </ul>
          </div>

          {/* Juridiction */}
          <div>
            <h4 className="text-gray-900 mb-6">{t.legal}</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate('/legal-notice')}
                  className="text-gray-600 hover:text-gray-900 transition-colors text-left text-sm"
                >
                  {t.legalNotice}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/privacy-policy')}
                  className="text-gray-600 hover:text-gray-900 transition-colors text-left text-sm"
                >
                  {t.privacy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/terms-of-service')}
                  className="text-gray-600 hover:text-gray-900 transition-colors text-left text-sm"
                >
                  {t.terms}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm">
              ©2025 lowprice.cm
            </p>

            {!showAdminLogin ? (
              <button
                onClick={() => setShowAdminLogin(true)}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm"
              >
                <Lock className="w-4 h-4" />
                {t.adminLogin}
              </button>
            ) : (
              <form onSubmit={handleAdminLogin} className="flex items-center gap-3">
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder={t.email}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-gray-50"
                  required
                />
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder={t.password}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-gray-50"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
                >
                  {t.login}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAdminLogin(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  {t.cancel}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}