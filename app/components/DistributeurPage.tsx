"use client";

import { useParams } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { distributeursData } from '../data/distributeurs';

interface DistributeurPageProps {
  language: 'FR' | 'EN';
}

export function DistributeurPage({ language }: DistributeurPageProps) {
  const { slug } = useParams<{ slug: string }>();
  
  const distributeur = slug ? (distributeursData as any)[slug] : null;

  const text = {
    FR: {
      flyers: 'Flyers',
      products: 'Produits en promotion',
      period: 'Période',
      price: 'Prix',
      discount: 'Réduction',
      noData: 'Distributeur non trouvé',
    },
    EN: {
      flyers: 'Flyers',
      products: 'Products on sale',
      period: 'Period',
      price: 'Price',
      discount: 'Discount',
      noData: 'Retailer not found',
    },
  };

  const t = text[language];

  if (!distributeur) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 text-center">
        <p className="text-gray-500">{t.noData}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
      <h1 className="text-gray-900 mb-16 text-3xl font-bold tracking-tight">{distributeur.name}</h1>

      {/* Volet 1: Flyers */}
      <section className="mb-20 pb-20 border-b border-gray-200">
        <h2 className="text-gray-900 mb-10 text-2xl font-semibold">{t.flyers}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {distributeur.flyers.map((flyer: any) => (
            <div
              key={flyer.id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                <ImageWithFallback
                  src={flyer.image}
                  alt={flyer.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-gray-900 mb-3 font-semibold text-lg">{flyer.title}</h3>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">{flyer.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Volet 2: Produits */}
      <section className="pt-4">
        <h2 className="text-gray-900 mb-10 text-2xl font-semibold">{t.products}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {distributeur.products.map((product: any) => (
            <div
              key={product.id}
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
              <div className="p-5">
                <h3 className="text-gray-900 mb-3 font-semibold text-base leading-tight">{product.name}</h3>
                <div className="flex items-center justify-between mb-4">
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
                {product.hashtags.map((tag: string, idx: number) => (
                  <span
                    key={idx}
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
    </div>
  );
}

