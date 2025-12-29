"use client";

interface PrivacyPolicyProps {
  language: 'FR' | 'EN';
}

export function PrivacyPolicy({ language }: PrivacyPolicyProps) {
  const text = {
    FR: {
      title: 'Politique de confidentialité',
      intro: 'LowPrice s\'engage à protéger votre vie privée. Cette politique explique comment nous collectons, utilisons et protégeons vos données.',
      dataCollection: 'Collecte de données',
      dataCollectionText: 'Nous collectons uniquement les données nécessaires au fonctionnement de notre service : localisation, préférences de recherche, et informations de contact si vous nous contactez.',
      dataUse: 'Utilisation des données',
      dataUseText: 'Vos données sont utilisées uniquement pour améliorer votre expérience sur notre plateforme et vous fournir des promotions pertinentes.',
      dataProtection: 'Protection des données',
      dataProtectionText: 'Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données contre tout accès non autorisé.',
      cookies: 'Cookies',
      cookiesText: 'Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez les désactiver dans les paramètres de votre navigateur.',
      rights: 'Vos droits',
      rightsText: 'Vous avez le droit d\'accéder, de modifier ou de supprimer vos données personnelles à tout moment.',
    },
    EN: {
      title: 'Privacy Policy',
      intro: 'LowPrice is committed to protecting your privacy. This policy explains how we collect, use, and protect your data.',
      dataCollection: 'Data Collection',
      dataCollectionText: 'We only collect data necessary for our service: location, search preferences, and contact information if you contact us.',
      dataUse: 'Data Use',
      dataUseText: 'Your data is used only to improve your experience on our platform and provide you with relevant promotions.',
      dataProtection: 'Data Protection',
      dataProtectionText: 'We implement appropriate security measures to protect your data from unauthorized access.',
      cookies: 'Cookies',
      cookiesText: 'We use cookies to improve your experience. You can disable them in your browser settings.',
      rights: 'Your Rights',
      rightsText: 'You have the right to access, modify, or delete your personal data at any time.',
    },
  };

  const t = text[language];

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
      <h1 className="text-gray-900 mb-8">{t.title}</h1>
      
      <div className="space-y-8">
        <p className="text-gray-600 leading-relaxed">{t.intro}</p>

        <section>
          <h2 className="text-gray-900 mb-4">{t.dataCollection}</h2>
          <p className="text-gray-600 leading-relaxed">{t.dataCollectionText}</p>
        </section>

        <section>
          <h2 className="text-gray-900 mb-4">{t.dataUse}</h2>
          <p className="text-gray-600 leading-relaxed">{t.dataUseText}</p>
        </section>

        <section>
          <h2 className="text-gray-900 mb-4">{t.dataProtection}</h2>
          <p className="text-gray-600 leading-relaxed">{t.dataProtectionText}</p>
        </section>

        <section>
          <h2 className="text-gray-900 mb-4">{t.cookies}</h2>
          <p className="text-gray-600 leading-relaxed">{t.cookiesText}</p>
        </section>

        <section>
          <h2 className="text-gray-900 mb-4">{t.rights}</h2>
          <p className="text-gray-600 leading-relaxed">{t.rightsText}</p>
        </section>
      </div>
    </div>
  );
}

