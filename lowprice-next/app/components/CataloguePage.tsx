"use client";

import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { locationsData } from '../data/locations';
import { distributeursData } from '../data/distributeurs';

interface CataloguePageProps {
  language: 'FR' | 'EN';
}

export function CataloguePage({ language }: CataloguePageProps) {
  const { country, city } = useParams<{ country: string; city?: string }>();
  const navigate = useNavigate();

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

  const countryObj = useMemo(() => locationsData.find((c) => c.id === country), [country]);
  const cityObj = useMemo(() => {
    if (!countryObj || !city) return undefined;
    return countryObj.cities.find((c) => c.id === city);
  }, [city, countryObj]);

  const onOpenCatalogue = (slug: string) => {
    const qs = new URLSearchParams();
    if (country) qs.set('country', country);
    if (city) qs.set('city', city);
    const queryString = qs.toString();
    navigate(`/distributeur/${slug}${queryString ? `?${queryString}` : ''}`);
  };

  const distributorSlugs = useMemo(() => {
    if (cityObj?.distributors?.length) return cityObj.distributors;
    if (!countryObj) return [] as string[];
    const all = countryObj.cities.flatMap((c) => c.distributors || []);
    return Array.from(new Set(all));
  }, [cityObj, countryObj]);

  const catalogues = useMemo(() => {
    const fallbackImages = [
      'https://images.unsplash.com/photo-1628102491629-778571d893a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1606824722920-4c652a70f348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1752694950205-8cd0bbb984db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ];

    return distributorSlugs.map((slug, index) => {
      const data = (distributeursData as any)[slug] as any;
      const name = String(data?.name || slug.replace(/-/g, ' ')).trim();
      const firstFlyer = Array.isArray(data?.flyers) ? data.flyers[0] : null;
      const image = String(firstFlyer?.image || fallbackImages[index % fallbackImages.length]);
      const period = String(firstFlyer?.period || '');

      return {
        id: slug,
        slug,
        company: name,
        period,
        image,
        discount: 'Promos',
      };
    });
  }, [distributorSlugs]);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-gray-900 mb-4">
          {t.title}
        </h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-gray-500">
            <MapPin className="w-4 h-4" />
            <span className="capitalize">
              {cityObj ? `${cityObj.name}, ${countryObj?.name || country}` : (countryObj?.name || country)}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <button
              type="button"
              onClick={() => navigate(`/catalogue/${country}`)}
              className="text-gray-600 hover:text-gray-900 underline-offset-4 hover:underline transition-colors"
            >
              {countryObj?.name || country}
            </button>
            {city && (
              <>
                <span className="text-gray-300">/</span>
                <button
                  type="button"
                  onClick={() => navigate(`/catalogue/${country}/${city}`)}
                  className="text-gray-600 hover:text-gray-900 underline-offset-4 hover:underline transition-colors"
                >
                  {cityObj?.name || city}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Catalogues Grid */}
      {catalogues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {catalogues.map((catalogue) => (
            <div
              key={catalogue.id}
              role="button"
              tabIndex={0}
              onClick={() => onOpenCatalogue(catalogue.slug)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onOpenCatalogue(catalogue.slug);
              }}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenCatalogue(catalogue.slug);
                  }}
                  className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-sm hover:shadow-md"
                >
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