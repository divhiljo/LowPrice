"use client";

interface AboutUsProps {
  language: 'FR' | 'EN';
}

export function AboutUs({ language }: AboutUsProps) {
  const text = {
    FR: {
      title: 'Qui sommes-nous ?',
      subtitle: 'Découvrez LowPrice, votre plateforme de référence pour les promotions',
      mission: 'Notre Mission',
      missionText: 'LowPrice a pour mission de centraliser tous les catalogues de promotion des distributeurs et commerces locaux, vous permettant de trouver les meilleures offres près de chez vous en un seul clic.',
      vision: 'Notre Vision',
      visionText: 'Devenir la plateforme incontournable pour les consommateurs camerounais qui cherchent à faire des économies tout en soutenant le commerce local.',
      values: 'Nos Valeurs',
      value1: 'Transparence',
      value1Text: 'Toutes nos informations sont vérifiées et mises à jour régulièrement.',
      value2: 'Accessibilité',
      value2Text: 'Une plateforme simple et intuitive accessible à tous.',
      value3: 'Engagement Local',
      value3Text: 'Nous soutenons activement les commerces de proximité et les grandes enseignes.',
    },
    EN: {
      title: 'About Us',
      subtitle: 'Discover LowPrice, your reference platform for promotions',
      mission: 'Our Mission',
      missionText: 'LowPrice\'s mission is to centralize all promotional catalogs from retailers and local businesses, allowing you to find the best deals near you with a single click.',
      vision: 'Our Vision',
      visionText: 'To become the essential platform for Cameroonian consumers looking to save money while supporting local commerce.',
      values: 'Our Values',
      value1: 'Transparency',
      value1Text: 'All our information is verified and regularly updated.',
      value2: 'Accessibility',
      value2Text: 'A simple and intuitive platform accessible to everyone.',
      value3: 'Local Commitment',
      value3Text: 'We actively support local businesses and major retailers.',
    },
  };

  const t = text[language];

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-gray-900 mb-4">{t.title}</h1>
        <p className="text-gray-600 text-lg">{t.subtitle}</p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-gray-900 mb-4">{t.mission}</h2>
          <p className="text-gray-600 leading-relaxed">{t.missionText}</p>
        </section>

        <section>
          <h2 className="text-gray-900 mb-4">{t.vision}</h2>
          <p className="text-gray-600 leading-relaxed">{t.visionText}</p>
        </section>

        <section>
          <h2 className="text-gray-900 mb-6">{t.values}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-gray-900 mb-2">{t.value1}</h3>
              <p className="text-gray-600 text-sm">{t.value1Text}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-gray-900 mb-2">{t.value2}</h3>
              <p className="text-gray-600 text-sm">{t.value2Text}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-gray-900 mb-2">{t.value3}</h3>
              <p className="text-gray-600 text-sm">{t.value3Text}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

