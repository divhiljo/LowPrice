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
        id: 'yamoussoukro',
        name: 'Yamoussoukro',
        nameEN: 'Yamoussoukro',
        distributors: ['spar'],
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

