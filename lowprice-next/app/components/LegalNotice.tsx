"use client";

interface LegalNoticeProps {
  language: 'FR' | 'EN';
}

export function LegalNotice({ language }: LegalNoticeProps) {
  const text = {
    FR: {
      title: 'Mentions légales',
      company: 'Informations sur l\'entreprise',
      companyName: 'LowPrice',
      address: 'Adresse',
      addressText: 'Cameroun',
      contact: 'Contact',
      email: 'contact@lowprice.cm',
      director: 'Directeur de publication',
      host: 'Hébergement',
      hostText: 'Informations d\'hébergement à compléter',
    },
    EN: {
      title: 'Legal Notice',
      company: 'Company Information',
      companyName: 'LowPrice',
      address: 'Address',
      addressText: 'Cameroon',
      contact: 'Contact',
      email: 'contact@lowprice.cm',
      director: 'Publication Director',
      host: 'Hosting',
      hostText: 'Hosting information to be completed',
    },
  };

  const t = text[language];

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
      <h1 className="text-gray-900 mb-8">{t.title}</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-gray-900 mb-4">{t.company}</h2>
          <div className="space-y-2 text-gray-600">
            <p><strong>{t.companyName}</strong></p>
            <p><strong>{t.address}:</strong> {t.addressText}</p>
            <p><strong>{t.contact}:</strong> {t.email}</p>
            <p><strong>{t.director}:</strong> À compléter</p>
          </div>
        </section>

        <section>
          <h2 className="text-gray-900 mb-4">{t.host}</h2>
          <p className="text-gray-600">{t.hostText}</p>
        </section>
      </div>
    </div>
  );
}

