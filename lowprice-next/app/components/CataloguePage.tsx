"use client";

import { useParams } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CataloguePageProps {
  language: 'FR' | 'EN';
}

const CATALOGUE_DATA = {
  douala: [
    {
      id: 1,
      company: 'Carrefour Market Akwa',
      period: '1-15 Décembre 2025',
      image: 'https://images.unsplash.com/photo-1628102491629-778571d893a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMHNob3BwaW5nfGVufDF8fHx8MTc2NTEyODI0MHww&ixlib=rb-4.1.0&q=80&w=1080',
      discount: '-30%',
    },
    {
      id: 2,
      company: 'Spar Bonanjo',
      period: '5-20 Décembre 2025',
      image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzdG9yZXxlbnwxfHx8fDE3NjUwMDk5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      discount: '-25%',
    },
    {
      id: 3,
      company: 'Santa Lucia Bonapriso',
      period: '1-31 Décembre 2025',
      image: 'https://images.unsplash.com/photo-1606824722920-4c652a70f348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwcHJvZHVjdHN8ZW58MXx8fHwxNzY1MTEyMzk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      discount: '-40%',
    },
    {
      id: 4,
      company: 'Domino Market Ndokotti',
      period: '7-14 Décembre 2025',
      image: 'https://images.unsplash.com/photo-1752694950205-8cd0bbb984db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNjb3VudCUyMHByb21vdGlvbnxlbnwxfHx8fDE3NjUxMjgyNDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      discount: '-20%',
    },
    {
      id: 5,
      company: 'Casino Makepe',
      period: '1-10 Décembre 2025',
      image: 'https://images.unsplash.com/photo-1628102491629-778571d893a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMHNob3BwaW5nfGVufDF8fHx8MTc2NTEyODI0MHww&ixlib=rb-4.1.0&q=80&w=1080',
      discount: '-35%',
    },
    {
      id: 6,
      company: 'Mahima Deido',
      period: '15-31 Décembre 2025',
      image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzdG9yZXxlbnwxfHx8fDE3NjUwMDk5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      discount: '-45%',
    },
  ],
  yaounde: [
    {
      id: 7,
      company: 'Carrefour Market Bastos',
      period: '1-15 Décembre 2025',
      image: 'https://images.unsplash.com/photo-1606824722920-4c652a70f348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwcHJvZHVjdHN8ZW58MXx8fHwxNzY1MTEyMzk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      discount: '-30%',
    },
    {
      id: 8,
      company: 'Spar Odza',
      period: '5-20 Décembre 2025',
      image: 'https://images.unsplash.com/photo-1752694950205-8cd0bbb984db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNjb3VudCUyMHByb21vdGlvbnxlbnwxfHx8fDE3NjUxMjgyNDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      discount: '-25%',
    },
    {
      id: 9,
      company: 'Santa Lucia Mvan',
      period: '1-31 Décembre 2025',
      image: 'https://images.unsplash.com/photo-1628102491629-778571d893a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMHNob3BwaW5nfGVufDF8fHx8MTc2NTEyODI0MHww&ixlib=rb-4.1.0&q=80&w=1080',
      discount: '-40%',
    },
    {
      id: 10,
      company: 'Domino Market Essos',
      period: '7-14 Décembre 2025',
      image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzdG9yZXxlbnwxfHx8fDE3NjUwMDk5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      discount: '-20%',
    },
  ],
};

export function CataloguePage({ language }: CataloguePageProps) {
  const { country, city } = useParams<{ country: string; city?: string }>();

  const text = {
    FR: {
      title: 'Catalogues de Promotions',
      subtitle: 'Découvrez toutes les offres disponibles',
      location: 'Localisation',
      period: 'Période',
      viewCatalog: 'Voir le catalogue',
      noCatalog: 'Aucun catalogue disponible pour cette zone',
    },
    EN: {
      title: 'Promotional Catalogs',
      subtitle: 'Discover all available offers',
      location: 'Location',
      period: 'Period',
      viewCatalog: 'View catalog',
      noCatalog: 'No catalogs available for this area',
    },
  };

  const t = text[language];

  // Get catalogues based on city
  let catalogues: typeof CATALOGUE_DATA.douala = [];
  if (city === 'douala') {
    catalogues = CATALOGUE_DATA.douala;
  } else if (city === 'yaounde') {
    catalogues = CATALOGUE_DATA.yaounde;
  } else {
    // Show all if no specific city
    catalogues = [...CATALOGUE_DATA.douala, ...CATALOGUE_DATA.yaounde];
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-gray-900 mb-4">
          {t.title}
        </h2>
        <div className="flex items-center gap-2 text-gray-500">
          <MapPin className="w-4 h-4" />
          <span className="capitalize">
            {city ? `${city}, ${country}` : country}
          </span>
        </div>
      </div>

      {/* Catalogues Grid */}
      {catalogues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {catalogues.map((catalogue) => (
            <div
              key={catalogue.id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={catalogue.image}
                  alt={catalogue.company}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-full text-sm">
                  {catalogue.discount}
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-gray-900 mb-3">
                  {catalogue.company}
                </h4>
                <div className="flex items-center gap-2 text-gray-500 mb-5 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{catalogue.period}</span>
                </div>
                <button className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                  {t.viewCatalog}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">{t.noCatalog}</p>
        </div>
      )}
    </div>
  );
}