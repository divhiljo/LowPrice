"use client";

import { MapPin, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onLocationClick: () => void;
  language: 'FR' | 'EN';
  onLanguageChange: (lang: 'FR' | 'EN') => void;
}

export function Header({ onLocationClick, language, onLanguageChange }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5">
        <div className="flex items-center justify-between gap-8">
          {/* Logo et nom */}
          <div 
            className="flex items-center gap-3 cursor-pointer flex-shrink-0"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
              <span className="text-white text-sm">LP</span>
            </div>
            <h1 className="text-gray-900 tracking-tight">LowPrice</h1>
          </div>

          {/* Barre de recherche */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'FR' ? 'Rechercher...' : 'Search...'}
                className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-gray-50 text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </form>

          {/* Boutons de droite */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              onClick={onLocationClick}
              className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === 'FR' ? 'Localisation' : 'Location'}
              </span>
            </button>

            <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-white">
              <button
                onClick={() => onLanguageChange('FR')}
                className={`px-3 py-1.5 text-sm transition-colors ${
                  language === 'FR' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => onLanguageChange('EN')}
                className={`px-3 py-1.5 text-sm transition-colors ${
                  language === 'EN' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* Barre de recherche mobile */}
        <form onSubmit={handleSearch} className="mt-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'FR' ? 'Rechercher...' : 'Search...'}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-gray-50 text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </form>
      </div>
    </header>
  );
}