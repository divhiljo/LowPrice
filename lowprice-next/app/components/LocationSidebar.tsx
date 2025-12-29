"use client";

import { X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { locationsData } from '../data/locations';

interface LocationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'FR' | 'EN';
}

const DOUALA_QUARTIERS = [
  'Akwa', 'Bonanjo', 'Deido', 'Bali', 'Bonapriso', 'Bonaberi', 
  'Ndokotti', 'Makepe', 'Logpom', 'Pk10', 'Pk12', 'Kotto'
];

const YAOUNDE_QUARTIERS = [
  'Bastos', 'Odza', 'Mvan', 'Emana', 'Essos', 'Ngousso',
  'Tsinga', 'Elig-Essono', 'Ekounou', 'Mvog-Ada', 'Nlongkak', 'Mokolo'
];

export function LocationSidebar({ isOpen, onClose, language }: LocationSidebarProps) {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedQuartier, setSelectedQuartier] = useState('');
  const navigate = useNavigate();

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setSelectedCity('');
    setSelectedQuartier('');
  };

  const handleApply = () => {
    if (selectedCountry) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'selected_location',
          JSON.stringify({
            country: selectedCountry,
            city: selectedCity,
            quartier: selectedQuartier,
          })
        );
      }
      if (selectedCity) navigate(`/catalogue/${selectedCountry}/${selectedCity}`);
      else navigate(`/catalogue/${selectedCountry}`);
      onClose();
    }
  };

  const selectedCountryObj = locationsData.find((c) => c.id === selectedCountry);
  const cities = selectedCountryObj?.cities || [];

  const showCities = Boolean(selectedCountry);
  const showQuartiers = selectedCity === 'douala' || selectedCity === 'yaounde';
  
  let quartiersList: string[] = [];
  if (selectedCity === 'douala') quartiersList = DOUALA_QUARTIERS;
  if (selectedCity === 'yaounde') quartiersList = YAOUNDE_QUARTIERS;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-gray-100">
            <h2 className="text-gray-900">
              {language === 'FR' ? 'Votre localisation' : 'Your location'}
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {/* Pays */}
            <div>
              <label className="block mb-3 text-gray-900 text-sm">
                {language === 'FR' ? 'Pays' : 'Country'}
              </label>
              <div className="relative">
                <select
                  value={selectedCountry}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg appearance-none bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                >
                  <option value="">
                    {language === 'FR' ? 'Sélectionner un pays' : 'Select a country'}
                  </option>
                  {locationsData.map((country) => (
                    <option key={country.id} value={country.id}>
                      {language === 'FR' ? country.name : country.nameEN}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Ville */}
            {showCities && (
              <div>
                <label className="block mb-3 text-gray-900 text-sm">
                  {language === 'FR' ? 'Ville' : 'City'}
                </label>
                <div className="relative">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg appearance-none bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                    disabled={!selectedCountry}
                  >
                    <option value="">
                      {language === 'FR' ? 'Sélectionner une ville' : 'Select a city'}
                    </option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {language === 'FR' ? city.name : city.nameEN || city.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            )}

            {/* Quartier (uniquement pour Douala et Yaoundé) */}
            {showQuartiers && (
              <div>
                <label className="block mb-3 text-gray-900 text-sm">
                  {language === 'FR' ? 'Quartier' : 'Neighborhood'}
                </label>
                <div className="relative">
                  <select
                    value={selectedQuartier}
                    onChange={(e) => setSelectedQuartier(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg appearance-none bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  >
                    <option value="">
                      {language === 'FR' ? 'Sélectionner un quartier (optionnel)' : 'Select a neighborhood (optional)'}
                    </option>
                    {quartiersList.map((quartier) => (
                      <option key={quartier} value={quartier}>
                        {quartier}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-8 border-t border-gray-100">
            <button
              onClick={handleApply}
              disabled={!selectedCountry}
              className="w-full py-3.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {language === 'FR' ? 'Valider' : 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}