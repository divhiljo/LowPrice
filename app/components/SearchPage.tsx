"use client";

import { useLocation, useNavigate } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { distributeursData } from '../data/distributeurs';

interface SearchPageProps {
  language: 'FR' | 'EN';
}

export function SearchPage({ language }: SearchPageProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  const text = {
    FR: {
      title: 'Résultats de recherche',
      noResults: 'Aucun résultat trouvé',
      products: 'Produits',
      retailers: 'Distributeurs',
    },
    EN: {
      title: 'Search Results',
      noResults: 'No results found',
      products: 'Products',
      retailers: 'Retailers',
    },
  };

  const t = text[language];

  // Recherche dans les produits et distributeurs
  const results: any[] = [];
  
  if (query.trim()) {
    Object.entries(distributeursData).forEach(([slug, data]: [string, any]) => {
      // Recherche dans les produits
      data.products.forEach((product: any) => {
        const searchLower = query.toLowerCase();
        const productNameLower = product.name.toLowerCase();
        const hashtagsLower = product.hashtags.join(' ').toLowerCase();
        
        if (productNameLower.includes(searchLower) || hashtagsLower.includes(searchLower)) {
          results.push({
            type: 'product',
            retailer: data.name,
            retailerSlug: slug,
            ...product,
          });
        }
      });

      // Recherche dans les noms de distributeurs
      if (data.name.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          type: 'retailer',
          name: data.name,
          slug: slug,
        });
      }
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <h1 className="text-gray-900 mb-8">
        {t.title}: "{query}"
      </h1>

      {results.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">{t.noResults}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Produits */}
          <section>
            <h2 className="text-gray-900 mb-6">{t.products}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results
                .filter((r) => r.type === 'product')
                .map((product, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-all"
                  >
                    {product.image && (
                      <div className="aspect-square bg-gray-100 overflow-hidden">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-gray-900 mb-2 font-semibold">{product.name}</h3>
                      <p className="text-gray-500 text-sm mb-2">{product.retailer}</p>
                      <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-gray-500 text-sm line-through">
                          {product.price} FCFA
                        </p>
                        <p className="text-gray-900 font-bold">
                          {Math.round(product.price * (1 - product.discount / 100))} FCFA
                        </p>
                      </div>
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                        -{product.discount}%
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.hashtags.map((tag: string, tagIdx: number) => (
                        <span
                          key={tagIdx}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* Distributeurs */}
          <section>
            <h2 className="text-gray-900 mb-6">{t.retailers}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results
                .filter((r) => r.type === 'retailer')
                .map((retailer, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => navigate(`/distributeur/${retailer.slug}`)}
                  >
                    <h3 className="text-gray-900 font-semibold">{retailer.name}</h3>
                  </div>
                ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

