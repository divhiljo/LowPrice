"use client";

import { Building2, Users, TrendingUp } from 'lucide-react';

interface BusinessPageProps {
  language: 'FR' | 'EN';
}

export function BusinessPage({ language }: BusinessPageProps) {
  const text = {
    FR: {
      title: 'LowPrice pour les entreprises',
      subtitle: 'Augmentez votre visibilité et atteignez plus de clients',
      benefits: 'Avantages',
      benefit1: 'Visibilité accrue',
      benefit1Text: 'Exposez vos promotions à des milliers de clients potentiels',
      benefit2: 'Gestion simplifiée',
      benefit2Text: 'Gérez facilement vos catalogues et promotions en ligne',
      benefit3: 'Statistiques détaillées',
      benefit3Text: 'Suivez les performances de vos promotions en temps réel',
      cta: 'Rejoignez-nous',
      ctaText: 'Contactez-nous pour intégrer votre entreprise à notre plateforme',
    },
    EN: {
      title: 'LowPrice for Business',
      subtitle: 'Increase your visibility and reach more customers',
      benefits: 'Benefits',
      benefit1: 'Increased Visibility',
      benefit1Text: 'Expose your promotions to thousands of potential customers',
      benefit2: 'Simplified Management',
      benefit2Text: 'Easily manage your catalogs and promotions online',
      benefit3: 'Detailed Statistics',
      benefit3Text: 'Track your promotion performance in real-time',
      cta: 'Join Us',
      ctaText: 'Contact us to integrate your business into our platform',
    },
  };

  const t = text[language];

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-gray-900 mb-4">{t.title}</h1>
        <p className="text-gray-600 text-lg">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-gray-900" />
          </div>
          <h3 className="text-gray-900 mb-2">{t.benefit1}</h3>
          <p className="text-gray-600 text-sm">{t.benefit1Text}</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-900" />
          </div>
          <h3 className="text-gray-900 mb-2">{t.benefit2}</h3>
          <p className="text-gray-600 text-sm">{t.benefit2Text}</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-gray-900" />
          </div>
          <h3 className="text-gray-900 mb-2">{t.benefit3}</h3>
          <p className="text-gray-600 text-sm">{t.benefit3Text}</p>
        </div>
      </div>

      <div className="bg-gray-900 text-white p-8 rounded-lg text-center">
        <h2 className="text-2xl mb-4">{t.cta}</h2>
        <p className="mb-6">{t.ctaText}</p>
        <button className="bg-white text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
          {language === 'FR' ? 'Nous contacter' : 'Contact Us'}
        </button>
      </div>
    </div>
  );
}

