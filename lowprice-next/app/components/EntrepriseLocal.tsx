import { ImageWithFallback } from './figma/ImageWithFallback';

interface EntrepriseLocalProps {
  language: 'FR' | 'EN';
}

const LOCAL_BUSINESSES = [
  { id: 1, name: 'Épicerie du Coin', location: 'Douala, Akwa', image: 'https://images.unsplash.com/photo-1578303106101-56e5d0788a21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMHNob3AlMjBzdG9yZWZyb250fGVufDF8fHx8MTc2NTEzMDA2N3ww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 2, name: 'Marché Frais Plus', location: 'Yaoundé, Bastos', image: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzY1MDQ4OTY0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 3, name: 'Alimentation Mbarga', location: 'Douala, Bonanjo', image: 'https://images.unsplash.com/photo-1653618817842-16f989eadf37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMGJhc2tldHxlbnwxfHx8fDE3NjUxMzAwNjd8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 4, name: 'Superette Moderne', location: 'Yaoundé, Odza', image: 'https://images.unsplash.com/photo-1760463921690-9bec0cc7d434?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBncm9jZXJ5JTIwc3RvcmV8ZW58MXx8fHwxNzY1MTMwMDY2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 5, name: 'Boutique Chez Paul', location: 'Douala, Bonapriso', image: 'https://images.unsplash.com/photo-1578303106101-56e5d0788a21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMHNob3AlMjBzdG9yZWZyb250fGVufDF8fHx8MTc2NTEzMDA2N3ww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 6, name: 'Mini Market Express', location: 'Yaoundé, Mvan', image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGFpc2xlfGVufDF8fHx8MTc2NTAzOTYwOXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 7, name: 'Le Bon Prix', location: 'Douala, Ndokotti', image: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzY1MDQ4OTY0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 8, name: 'Alimentation Générale', location: 'Yaoundé, Essos', image: 'https://images.unsplash.com/photo-1653618817842-16f989eadf37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMGJhc2tldHxlbnwxfHx8fDE3NjUxMzAwNjd8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 9, name: 'Commerce du Quartier', location: 'Douala, Makepe', image: 'https://images.unsplash.com/photo-1760463921690-9bec0cc7d434?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBncm9jZXJ5JTIwc3RvcmV8ZW58MXx8fHwxNzY1MTMwMDY2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 10, name: 'Superette Central', location: 'Yaoundé, Tsinga', image: 'https://images.unsplash.com/photo-1578303106101-56e5d0788a21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMHNob3AlMjBzdG9yZWZyb250fGVufDF8fHx8MTc2NTEzMDA2N3ww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 11, name: 'Boutique Familiale', location: 'Douala, Deido', image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGFpc2xlfGVufDF8fHx8MTc2NTAzOTYwOXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 12, name: 'Marché du Village', location: 'Yaoundé, Ekounou', image: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzY1MDQ4OTY0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 13, name: 'Alimentation Rapide', location: 'Douala, Bonaberi', image: 'https://images.unsplash.com/photo-1653618817842-16f989eadf37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMGJhc2tldHxlbnwxfHx8fDE3NjUxMzAwNjd8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 14, name: 'Épicerie Moderne', location: 'Yaoundé, Nlongkak', image: 'https://images.unsplash.com/photo-1760463921690-9bec0cc7d434?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBncm9jZXJ5JTIwc3RvcmV8ZW58MXx8fHwxNzY1MTMwMDY2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 15, name: 'Shop & Go', location: 'Douala, Logpom', image: 'https://images.unsplash.com/photo-1578303106101-56e5d0788a21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMHNob3AlMjBzdG9yZWZyb250fGVufDF8fHx8MTc2NTEzMDA2N3ww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 16, name: 'Le Petit Commerce', location: 'Yaoundé, Mokolo', image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGFpc2xlfGVufDF8fHx8MTc2NTAzOTYwOXww&ixlib=rb-4.1.0&q=80&w=1080' },
];

export function EntrepriseLocal({ language }: EntrepriseLocalProps) {
  const text = {
    FR: {
      title: 'Entreprises Locales',
      subtitle: 'Soutenez le commerce de proximité et découvrez leurs offres exclusives',
      viewOffers: 'Voir les offres',
    },
    EN: {
      title: 'Local Businesses',
      subtitle: 'Support local commerce and discover their exclusive offers',
      viewOffers: 'View offers',
    },
  };

  const t = text[language];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      {/* Header */}
      <div className="mb-16">
        <h2 className="text-gray-900 mb-4">
          {t.title}
        </h2>
        <p className="text-gray-600 max-w-2xl">
          {t.subtitle}
        </p>
      </div>

      {/* Grid d'entreprises locales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {LOCAL_BUSINESSES.map((business) => (
          <div
            key={business.id}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 group cursor-pointer"
          >
            <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
              <ImageWithFallback
                src={business.image}
                alt={business.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h4 className="text-gray-900 mb-2">
                {business.name}
              </h4>
              <p className="text-gray-500 mb-4 text-sm">
                {business.location}
              </p>
              <button className="w-full py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm">
                {t.viewOffers}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
