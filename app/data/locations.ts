export interface City {
  id: string;
  name: string;
  nameEN?: string;
  distributors?: string[]; // slugs des distributeurs disponibles dans cette ville
  products?: string[]; // IDs des produits disponibles
}

export interface Country {
  id: string;
  name: string;
  nameEN?: string;
  cities: City[];
}

export const locationsData: Country[] = [
  {
    id: 'cameroun',
    name: 'Cameroun',
    nameEN: 'Cameroon',
    cities: [
      {
        id: 'douala',
        name: 'Douala',
        nameEN: 'Douala',
        distributors: ['carrefour-market', 'domino-market', 'santa-lucia', 'spar'],
      },
      {
        id: 'yaounde',
        name: 'Yaoundé',
        nameEN: 'Yaounde',
        distributors: ['carrefour-market', 'spar', 'domino-market'],
      },
    ],
  },
  {
    id: 'cote-ivoire',
    name: 'Côte d\'Ivoire',
    nameEN: 'Ivory Coast',
    cities: [
      {
        id: 'abidjan',
        name: 'Abidjan',
        nameEN: 'Abidjan',
        distributors: ['carrefour-market', 'spar'],
      },
      {
        id: 'bouake',
        name: 'Bouaké',
        nameEN: 'Bouake',
        distributors: ['spar', 'carrefour-market'],
      },
    ],
  },
  {
    id: 'afrique-du-sud',
    name: 'Afrique du Sud',
    nameEN: 'South Africa',
    cities: [
      {
        id: 'johannesburg',
        name: 'Johannesburg',
        nameEN: 'Johannesburg',
        distributors: ['carrefour-market', 'spar', 'domino-market', 'santa-lucia'],
      },
      {
        id: 'cape-town',
        name: 'Cape Town',
        nameEN: 'Cape Town',
        distributors: ['carrefour-market', 'spar', 'domino-market'],
      },
    ],
  },
  {
    id: 'maroc',
    name: 'Maroc',
    nameEN: 'Morocco',
    cities: [
      {
        id: 'casablanca',
        name: 'Casablanca',
        nameEN: 'Casablanca',
        distributors: ['carrefour-market', 'spar', 'santa-lucia'],
      },
      {
        id: 'rabat',
        name: 'Rabat',
        nameEN: 'Rabat',
        distributors: ['carrefour-market', 'spar'],
      },
    ],
  },
  {
    id: 'algerie',
    name: 'Algérie',
    nameEN: 'Algeria',
    cities: [
      {
        id: 'alger',
        name: 'Alger',
        nameEN: 'Algiers',
        distributors: ['carrefour-market', 'spar', 'domino-market'],
      },
      {
        id: 'oran',
        name: 'Oran',
        nameEN: 'Oran',
        distributors: ['carrefour-market', 'spar'],
      },
    ],
  },
  {
    id: 'congo',
    name: 'Congo',
    nameEN: 'Congo',
    cities: [
      {
        id: 'kinshasa',
        name: 'Kinshasa',
        nameEN: 'Kinshasa',
        distributors: ['carrefour-market', 'spar', 'domino-market', 'mahima'],
      },
      {
        id: 'pointe-noire',
        name: 'Pointe-Noire',
        nameEN: 'Pointe-Noire',
        distributors: ['carrefour-market', 'spar', 'casino'],
      },
    ],
  },
];

export function getCountryById(id: string): Country | undefined {
  return locationsData.find(c => c.id === id);
}

export function getCityById(countryId: string, cityId: string): City | undefined {
  const country = getCountryById(countryId);
  return country?.cities.find(c => c.id === cityId);
}

export function getAllCountries(): Country[] {
  return locationsData;
}

export function getCitiesByCountry(countryId: string): City[] {
  const country = getCountryById(countryId);
  return country?.cities || [];
}

