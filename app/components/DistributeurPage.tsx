"use client";

import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Calendar, Star, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { distributeursData } from '../data/distributeurs';
import { locationsData } from '../data/locations';

interface DistributeurPageProps {
  language: 'FR' | 'EN';
}

type Review = {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  isApproved?: boolean;
};

type Product = {
  id: string | number;
  name: string;
  price: number;
  discount?: number;
  image?: string;
  hashtags?: string[];
  tags?: string[];
};

type Flyer = {
  id: string | number;
  title: string;
  description?: string;
  image: string;
  period?: string;
  startDate?: string;
  endDate?: string;
  status?: 'En cours' | 'Terminé' | 'Active' | 'Ended';
};

type Boutique = {
  id: string;
  distributeurSlug: string;
  quartier: string;
  enseigne: string;
};

const STORAGE_KEYS = {
  boutiques: 'cms_boutiques',
  products: 'cms_products',
  flyers: 'cms_flyers',
  reviews: 'product_reviews',
} as const;

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function getReviewStats(reviews: Review[]) {
  const normalized = reviews.map((r) => ({ ...r, isApproved: r.isApproved ?? true }));
  const approved = normalized.filter((r) => r.isApproved);
  if (approved.length === 0) return { average: 0, count: 0, approvedCount: 0, totalCount: normalized.length };
  const sum = approved.reduce((acc, r) => acc + (Number.isFinite(r.rating) ? r.rating : 0), 0);
  const average = sum / approved.length;
  return {
    average,
    count: approved.length,
    approvedCount: approved.length,
    totalCount: normalized.length,
  };
}

function formatFlyerPeriod(flyer: Flyer) {
  if (flyer.period) return flyer.period;
  if (flyer.startDate || flyer.endDate) {
    const start = flyer.startDate ? new Date(flyer.startDate).toLocaleDateString('fr-FR') : '';
    const end = flyer.endDate ? new Date(flyer.endDate).toLocaleDateString('fr-FR') : '';
    return [start, end].filter(Boolean).join(' - ');
  }
  return '';
}

export function DistributeurPage({ language }: DistributeurPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [fallbackLocation, setFallbackLocation] = useState<{ country?: string; city?: string } | null>(null);

  const [boutiques, setBoutiques] = useState<Boutique[]>([]);
  const [cmsProducts, setCmsProducts] = useState<any[]>([]);
  const [cmsFlyers, setCmsFlyers] = useState<any[]>([]);
  const [reviewsByKey, setReviewsByKey] = useState<Record<string, Review[]>>({});
  const [openReviewKey, setOpenReviewKey] = useState<string | null>(null);
  const [reviewDraft, setReviewDraft] = useState<{ rating: number; comment: string }>({ rating: 5, comment: '' });
  const [activeTabByBoutiqueId, setActiveTabByBoutiqueId] = useState<Record<string, 'products' | 'flyers'>>({});

  const distributeur = useMemo(() => {
    if (!slug) return null;
    const fromStatic = (distributeursData as any)[slug] as any;
    if (fromStatic) return fromStatic;

    const prettyName = slug
      .split('-')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');

    return {
      name: prettyName,
      products: [],
      flyers: [],
      boutiques: [],
    };
  }, [slug]);

  const { country, city } = useMemo(() => {
    const qs = new URLSearchParams(location.search);
    return {
      country: qs.get('country') || '',
      city: qs.get('city') || '',
    };
  }, [location.search]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem('selected_location');
      if (!raw) return;
      const parsed = JSON.parse(raw) as { country?: string; city?: string };
      if (!parsed || typeof parsed !== 'object') return;
      setFallbackLocation({ country: parsed.country || '', city: parsed.city || '' });
    } catch {
      // ignore
    }
  }, []);

  const effectiveCountry = country || fallbackLocation?.country || '';
  const effectiveCity = city || fallbackLocation?.city || '';

  const countryObj = useMemo(() => {
    if (!effectiveCountry) return undefined;
    return locationsData.find((c) => c.id === effectiveCountry);
  }, [effectiveCountry]);

  const cityObj = useMemo(() => {
    if (!countryObj || !effectiveCity) return undefined;
    return countryObj.cities.find((c) => c.id === effectiveCity);
  }, [effectiveCity, countryObj]);

  const text = {
    FR: {
      boutiques: 'Boutiques',
      flyers: 'Flyers',
      products: 'Produits',
      period: 'Période',
      price: 'Prix',
      discount: 'Réduction',
      noData: 'Distributeur non trouvé',
      reviews: 'Avis',
      rating: 'Note',
      comment: 'Commentaire',
      addReview: 'Ajouter un avis',
      pendingReview: 'En attente de validation',
      close: 'Fermer',
      noReviews: 'Aucun avis pour le moment',
      selectTabProducts: 'Produits',
      selectTabFlyers: 'Flyers',
    },
    EN: {
      boutiques: 'Shops',
      flyers: 'Flyers',
      products: 'Products',
      period: 'Period',
      price: 'Price',
      discount: 'Discount',
      noData: 'Retailer not found',
      reviews: 'Reviews',
      rating: 'Rating',
      comment: 'Comment',
      addReview: 'Add review',
      pendingReview: 'Pending approval',
      close: 'Close',
      noReviews: 'No reviews yet',
      selectTabProducts: 'Products',
      selectTabFlyers: 'Flyers',
    },
  };

  const t = text[language];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedBoutiques = safeJsonParse<Boutique[]>(localStorage.getItem(STORAGE_KEYS.boutiques)) || [];
    const storedProducts = safeJsonParse<any[]>(localStorage.getItem(STORAGE_KEYS.products)) || [];
    const storedFlyers = safeJsonParse<any[]>(localStorage.getItem(STORAGE_KEYS.flyers)) || [];
    const storedReviews = safeJsonParse<Record<string, Review[]>>(localStorage.getItem(STORAGE_KEYS.reviews)) || {};

    setBoutiques(storedBoutiques);
    setCmsProducts(storedProducts);
    setCmsFlyers(storedFlyers);
    setReviewsByKey(storedReviews);
  }, []);

  const fallbackBoutiques = useMemo(() => {
    if (!slug || !distributeur) return [] as Boutique[];
    const quartiers = ['Akwa', 'Bonanjo', 'Deido'];
    return quartiers.map((quartier) => ({
      id: `${slug}__${quartier.toLowerCase()}`,
      distributeurSlug: slug,
      quartier,
      enseigne: `${distributeur.name} ${quartier}`,
    }));
  }, [distributeur, slug]);

  const resolvedBoutiques = useMemo(() => {
    if (!slug) return [] as Boutique[];
    const fromCms = boutiques.filter((b) => b.distributeurSlug === slug);
    if (fromCms.length > 0) return fromCms;
    const fromStatic = (distributeur?.boutiques || []) as Boutique[];
    if (fromStatic.length > 0) return fromStatic;
    return fallbackBoutiques;
  }, [boutiques, fallbackBoutiques, slug]);

  const boutiquesByQuartier = useMemo(() => {
    const grouped: Record<string, Boutique[]> = {};
    resolvedBoutiques.forEach((b) => {
      grouped[b.quartier] = grouped[b.quartier] || [];
      grouped[b.quartier].push(b);
    });
    Object.values(grouped).forEach((list) => list.sort((a, b) => a.enseigne.localeCompare(b.enseigne)));
    return grouped;
  }, [resolvedBoutiques]);

  const getProductsForBoutique = (boutique: Boutique): Product[] => {
    const cmsForBoutique = cmsProducts.filter((p: any) => p.boutiqueId === boutique.id);
    if (cmsForBoutique.length > 0) return cmsForBoutique as Product[];
    const legacyProducts = (distributeur?.products || []) as Product[];
    return legacyProducts;
  };

  const getFlyersForBoutique = (boutique: Boutique): Flyer[] => {
    const cmsForBoutique = cmsFlyers.filter((f: any) => f.boutiqueId === boutique.id);
    if (cmsForBoutique.length > 0) return cmsForBoutique as Flyer[];
    const legacyFlyers = (distributeur?.flyers || []) as Flyer[];
    return legacyFlyers;
  };

  const getProductKey = (boutiqueId: string, productId: string | number) => {
    const safeSlug = slug || 'unknown';
    return `${safeSlug}::${boutiqueId}::${String(productId)}`;
  };

  const openReviews = (key: string) => {
    setOpenReviewKey(key);
    setReviewDraft({ rating: 5, comment: '' });
  };

  const saveReviews = (next: Record<string, Review[]>) => {
    setReviewsByKey(next);
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(next));
  };

  const submitReview = () => {
    if (!openReviewKey) return;
    const rating = Math.max(1, Math.min(5, Number(reviewDraft.rating || 0)));
    const comment = String(reviewDraft.comment || '').trim();
    if (!comment) return;

    const nextReview: Review = {
      id: `${Date.now()}`,
      rating,
      comment,
      createdAt: new Date().toISOString(),
      isApproved: false,
    };

    const existing = reviewsByKey[openReviewKey] || [];
    saveReviews({
      ...reviewsByKey,
      [openReviewKey]: [nextReview, ...existing],
    });
    setReviewDraft({ rating: 5, comment: '' });
  };

  if (!slug || !distributeur) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 text-center">
        <p className="text-gray-500">{t.noData}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
      {effectiveCountry && (
        <div className="flex flex-wrap items-center gap-2 text-sm mb-6">
          <button
            type="button"
            onClick={() => navigate(`/catalogue/${effectiveCountry}`)}
            className="text-gray-600 hover:text-gray-900 underline-offset-4 hover:underline transition-colors"
          >
            {countryObj?.name || effectiveCountry}
          </button>
          {effectiveCity && (
            <>
              <span className="text-gray-300">/</span>
              <button
                type="button"
                onClick={() => navigate(`/catalogue/${effectiveCountry}/${effectiveCity}`)}
                className="text-gray-600 hover:text-gray-900 underline-offset-4 hover:underline transition-colors"
              >
                {cityObj?.name || effectiveCity}
              </button>
            </>
          )}
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">{distributeur.name}</span>
        </div>
      )}
      <h1 className="text-gray-900 mb-16 text-3xl font-bold tracking-tight">{distributeur.name}</h1>

      <div className="space-y-12">
        {Object.entries(boutiquesByQuartier).map(([quartier, quartierBoutiques]) => (
          <section key={quartier} className="bg-white border border-gray-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-gray-900 text-2xl font-semibold">{quartier}</h2>
                <p className="text-gray-500 text-sm">{quartierBoutiques.length} {t.boutiques.toLowerCase()}</p>
              </div>
            </div>

            <div className="space-y-8">
              {quartierBoutiques.map((boutique) => {
                const activeTab = activeTabByBoutiqueId[boutique.id] || 'products';
                const products = getProductsForBoutique(boutique);
                const flyers = getFlyersForBoutique(boutique);

                return (
                  <div key={boutique.id} className="border border-gray-100 rounded-xl overflow-hidden">
                    <div className="p-5 bg-gray-50 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-gray-900 font-semibold">{boutique.enseigne}</h3>
                        <p className="text-gray-500 text-sm">{quartier}</p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setActiveTabByBoutiqueId((prev) => ({ ...prev, [boutique.id]: 'products' }))}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeTab === 'products' ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {t.selectTabProducts}
                        </button>
                        <button
                          onClick={() => setActiveTabByBoutiqueId((prev) => ({ ...prev, [boutique.id]: 'flyers' }))}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeTab === 'flyers' ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {t.selectTabFlyers}
                        </button>
                      </div>
                    </div>

                    {activeTab === 'flyers' ? (
                      <div className="p-5">
                        {flyers.length === 0 ? (
                          <p className="text-gray-500 text-sm">{t.noData}</p>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {flyers.map((flyer: Flyer) => (
                              <div
                                key={String(flyer.id)}
                                className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300"
                              >
                                <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                                  <ImageWithFallback
                                    src={flyer.image}
                                    alt={flyer.title}
                                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                                  />
                                </div>
                                <div className="p-6">
                                  <div className="flex items-start justify-between gap-4">
                                    <h4 className="text-gray-900 font-semibold text-lg leading-snug">{flyer.title}</h4>
                                    {flyer.status && (
                                      <span className={`shrink-0 text-xs px-2 py-1 rounded ${
                                        flyer.status === 'Terminé' || flyer.status === 'Ended'
                                          ? 'bg-gray-100 text-gray-600'
                                          : 'bg-green-100 text-green-700'
                                      }`}>
                                        {flyer.status}
                                      </span>
                                    )}
                                  </div>
                                  {flyer.description && (
                                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">{flyer.description}</p>
                                  )}
                                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-4">
                                    <Calendar className="w-4 h-4" />
                                    <span className="font-medium">{formatFlyerPeriod(flyer)}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-5">
                        {products.length === 0 ? (
                          <p className="text-gray-500 text-sm">{t.noData}</p>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product: Product) => {
                              const productKey = getProductKey(boutique.id, product.id);
                              const reviews = reviewsByKey[productKey] || [];
                              const stats = getReviewStats(reviews);
                              const displayTags = Array.from(
                                new Set([
                                  quartier,
                                  ...(product.tags || []),
                                  ...((product.hashtags || []) as string[]),
                                ])
                              );

                              return (
                                <div
                                  key={`${boutique.id}_${String(product.id)}`}
                                  className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300"
                                >
                                  {product.image && (
                                    <div className="aspect-square bg-gray-100 overflow-hidden">
                                      <ImageWithFallback
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                                      />
                                    </div>
                                  )}
                                  <div className="p-5">
                                    <div className="flex items-start justify-between gap-3">
                                      <h4 className="text-gray-900 font-semibold text-base leading-tight">{product.name}</h4>
                                      <button
                                        onClick={() => openReviews(productKey)}
                                        className="shrink-0 text-sm font-medium text-gray-600 hover:text-gray-900 underline-offset-4 hover:underline transition-colors"
                                      >
                                        {t.reviews}
                                      </button>
                                    </div>

                                    <div className="flex items-center justify-between mb-4 mt-3">
                                      <div>
                                        <p className="text-gray-500 text-sm line-through">{product.price} FCFA</p>
                                        <p className="text-gray-900 font-bold">
                                          {Math.round(product.price * (1 - (product.discount || 0) / 100))} FCFA
                                        </p>
                                      </div>
                                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                                        -{product.discount || 0}%
                                      </span>
                                    </div>

                                    <div className="flex items-center justify-between mb-4">
                                      <div className="flex items-center gap-1 text-gray-700">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                          <Star
                                            key={i}
                                            className={`w-4 h-4 ${i <= Math.round(stats.average) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                                          />
                                        ))}
                                        <span className="text-sm font-medium ml-1">
                                          {stats.count > 0 ? stats.average.toFixed(1) : '0.0'}
                                        </span>
                                      </div>
                                      <span className="text-sm text-gray-500">({stats.count})</span>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                      {displayTags.map((tag, idx) => (
                                        <span
                                          key={`${productKey}_tag_${idx}`}
                                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {openReviewKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenReviewKey(null)}
          />
          <div className="relative bg-white w-full max-w-2xl rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-gray-900 font-semibold">{t.reviews}</h3>
              <button
                onClick={() => setOpenReviewKey(null)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto">
              {(() => {
                const all = reviewsByKey[openReviewKey] || [];
                const normalized = all.map((r) => ({ ...r, isApproved: r.isApproved ?? true }));
                const stats = getReviewStats(normalized);

                return (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-gray-700">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i <= Math.round(stats.average) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">
                          {stats.count > 0 ? stats.average.toFixed(1) : '0.0'} ({stats.count})
                        </span>
                      </div>
                      {stats.totalCount > stats.approvedCount && (
                        <span className="text-sm text-gray-500">
                          {stats.totalCount - stats.approvedCount} {t.pendingReview.toLowerCase()}
                        </span>
                      )}
                    </div>

                    <div className="border border-gray-100 rounded-lg p-4">
                      <h4 className="text-gray-900 font-medium mb-3">{t.addReview}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">{t.rating}</label>
                          <select
                            value={reviewDraft.rating}
                            onChange={(e) => setReviewDraft((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900"
                          >
                            {[1, 2, 3, 4, 5].map((v) => (
                              <option key={v} value={v}>
                                {v}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm text-gray-600 mb-1">{t.comment}</label>
                          <input
                            value={reviewDraft.comment}
                            onChange={(e) => setReviewDraft((prev) => ({ ...prev, comment: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900"
                            placeholder={language === 'FR' ? 'Votre avis...' : 'Your review...'}
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <button
                          onClick={submitReview}
                          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                        >
                          {t.addReview}
                        </button>
                        <p className="text-xs text-gray-500 mt-2">{t.pendingReview}</p>
                      </div>
                    </div>

                    {normalized.length === 0 ? (
                      <p className="text-gray-500 text-sm">{t.noReviews}</p>
                    ) : (
                      <div className="space-y-3">
                        {normalized.map((r) => (
                          <div key={r.id} className="border border-gray-100 rounded-lg p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i <= r.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                              <div className="text-right">
                                {!r.isApproved && (
                                  <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700">
                                    {t.pendingReview}
                                  </span>
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                  {new Date(r.createdAt).toLocaleDateString(language === 'FR' ? 'fr-FR' : 'en-US')}
                                </p>
                              </div>
                            </div>
                            <p className="text-gray-700 text-sm mt-3">{r.comment}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

