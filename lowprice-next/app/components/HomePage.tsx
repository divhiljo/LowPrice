"use client";

import { Shield, Clock, TrendingDown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  language: 'FR' | 'EN';
}

const PARTNER_STORES = [
  { 
    name: 'Carrefour Market', 
    image: 'data:image/png;base64,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'
  },
  { 
    name: 'Domino Market', 
    image: 'https://ayilaa.s3.eu-west-1.amazonaws.com/attraction/logos/65c21da332653_1707220387_dOMINO.jpg'
  },
  { 
    name: 'Santa Lucia', 
    image: 'https://pbs.twimg.com/profile_images/1613543546845368321/cusK1twv_400x400.png'
  },
  { 
    name: 'Spar', 
    image: 'data:image/png;base64,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'
  },
];

export function HomePage({ language }: HomePageProps) {
  const navigate = useNavigate();

  const text = {
    FR: {
      hero: 'Tous vos catalogues de promotion en un seul endroit',
      heroSub: 'Découvrez les meilleures offres des distributeurs et commerces de proximité',
      partners: 'Nos partenaires',
      viewRetailers: 'Voir les grandes distributions',
      viewAll: 'Voir tous les partenaires',
      whyTitle: 'Pourquoi LowPrice',
      reason1: 'Promotions vérifiées',
      reason1Sub: 'Catalogues actualisés en temps réel',
      reason2: 'Gain de temps',
      reason2Sub: 'Toutes les offres regroupées',
      reason3: 'Économies garanties',
      reason3Sub: 'Les meilleures offres près de chez vous',
      viewCatalog: 'Voir le catalogue',
    },
    EN: {
      hero: 'All your promotional catalogs in one place',
      heroSub: 'Discover the best offers from retailers and local shops',
      partners: 'Our partners',
      viewRetailers: 'View major retailers',
      viewAll: 'View all partners',
      whyTitle: 'Why LowPrice',
      reason1: 'Verified Promotions',
      reason1Sub: 'Real-time updated catalogs',
      reason2: 'Save Time',
      reason2Sub: 'All offers in one place',
      reason3: 'Guaranteed Savings',
      reason3Sub: 'Best deals near you',
      viewCatalog: 'View catalog',
    },
  };

  const t = text[language];

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-pink-50 to-white pt-24 pb-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-gray-900 mb-8 max-w-3xl mx-auto text-4xl font-bold tracking-tight leading-tight">
            {t.hero}
          </h2>
          <p className="text-gray-600 mb-16 max-w-2xl mx-auto text-lg leading-relaxed">
            {t.heroSub}
          </p>

          {/* Lien vers grandes distributions */}
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => navigate('/grand-distributeur')}
              className="w-full bg-gray-900 text-white py-4 px-8 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-lg font-semibold"
            >
              {t.viewRetailers}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Partner Stores */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-20 mb-32">
        <div className="flex items-center justify-between mb-12">
          <h3 className="text-gray-900 text-2xl font-semibold">
            {t.partners}
          </h3>
          <button
            onClick={() => navigate('/grand-distributeur')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            {t.viewAll}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {PARTNER_STORES.map((store) => {
            const slugMap: Record<string, string> = {
              'Carrefour Market': 'carrefour-market',
              'Domino Market': 'domino-market',
              'Santa Lucia': 'santa-lucia',
              'Spar': 'spar',
            };
            const slug = slugMap[store.name] || store.name.toLowerCase().replace(/\s+/g, '-').replace(/é/g, 'e').replace(/è/g, 'e');
            
            return (
              <div
                key={store.name}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all cursor-pointer group"
                onClick={() => navigate(`/distributeur/${slug}`)}
              >
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  <ImageWithFallback
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 text-center">
                  <p className="text-gray-900">
                    {store.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why Trust Us */}
      <div className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h3 className="text-center text-gray-900 mb-20 text-3xl font-bold tracking-tight">
            {t.whyTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Shield className="w-7 h-7 text-gray-900" />
              </div>
              <h4 className="text-gray-900 mb-4 text-xl font-semibold">{t.reason1}</h4>
              <p className="text-gray-600 leading-relaxed">{t.reason1Sub}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Clock className="w-7 h-7 text-gray-900" />
              </div>
              <h4 className="text-gray-900 mb-4 text-xl font-semibold">{t.reason2}</h4>
              <p className="text-gray-600 leading-relaxed">{t.reason2Sub}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <TrendingDown className="w-7 h-7 text-gray-900" />
              </div>
              <h4 className="text-gray-900 mb-4 text-xl font-semibold">{t.reason3}</h4>
              <p className="text-gray-600 leading-relaxed">{t.reason3Sub}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
