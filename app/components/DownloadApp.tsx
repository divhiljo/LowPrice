"use client";

import { Smartphone, Download } from 'lucide-react';

interface DownloadAppProps {
  language: 'FR' | 'EN';
}

export function DownloadApp({ language }: DownloadAppProps) {
  const text = {
    FR: {
      title: 'Télécharger notre application',
      subtitle: 'Accédez à toutes les promotions directement depuis votre smartphone',
      features: 'Fonctionnalités',
      feature1: 'Notifications en temps réel',
      feature1Text: 'Soyez alerté dès qu\'une nouvelle promotion est disponible',
      feature2: 'Recherche avancée',
      feature2Text: 'Trouvez rapidement les produits qui vous intéressent',
      feature3: 'Favoris',
      feature3Text: 'Sauvegardez vos promotions préférées',
      feature4: 'Géolocalisation',
      feature4Text: 'Découvrez les offres près de chez vous',
      download: 'Télécharger',
      comingSoon: 'Bientôt disponible',
    },
    EN: {
      title: 'Download our app',
      subtitle: 'Access all promotions directly from your smartphone',
      features: 'Features',
      feature1: 'Real-time notifications',
      feature1Text: 'Get alerted as soon as a new promotion is available',
      feature2: 'Advanced search',
      feature2Text: 'Quickly find products that interest you',
      feature3: 'Favorites',
      feature3Text: 'Save your favorite promotions',
      feature4: 'Geolocation',
      feature4Text: 'Discover offers near you',
      download: 'Download',
      comingSoon: 'Coming soon',
    },
  };

  const t = text[language];

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
      <div className="mb-12 text-center">
        <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <Smartphone className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-gray-900 mb-4">{t.title}</h1>
        <p className="text-gray-600 text-lg">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-gray-900 mb-2">{t.feature1}</h3>
          <p className="text-gray-600 text-sm">{t.feature1Text}</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-gray-900 mb-2">{t.feature2}</h3>
          <p className="text-gray-600 text-sm">{t.feature2Text}</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-gray-900 mb-2">{t.feature3}</h3>
          <p className="text-gray-600 text-sm">{t.feature3Text}</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-gray-900 mb-2">{t.feature4}</h3>
          <p className="text-gray-600 text-sm">{t.feature4Text}</p>
        </div>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center gap-4 bg-gray-900 text-white px-8 py-4 rounded-lg">
          <Download className="w-5 h-5" />
          <span className="text-lg">{t.comingSoon}</span>
        </div>
      </div>
    </div>
  );
}

