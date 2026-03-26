"use client";

interface TermsOfServiceProps {
  language: 'FR' | 'EN';
}

export function TermsOfService({ language }: TermsOfServiceProps) {
  const text = {
    FR: {
      title: 'Conditions Générales d\'Utilisation',
      intro: 'En utilisant LowPrice, vous acceptez les conditions suivantes :',
      use: 'Utilisation du service',
      useText: 'LowPrice est un service gratuit permettant de consulter les catalogues de promotion. Vous vous engagez à utiliser le service de manière légale et respectueuse.',
      content: 'Contenu',
      contentText: 'Tous les contenus affichés sur LowPrice sont la propriété de leurs propriétaires respectifs. Nous ne sommes pas responsables de l\'exactitude des promotions affichées.',
      liability: 'Responsabilité',
      liabilityText: 'LowPrice ne peut être tenu responsable des erreurs ou omissions dans les informations affichées. Les promotions sont fournies à titre informatif.',
      modifications: 'Modifications',
      modificationsText: 'Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications seront publiées sur cette page.',
    },
    EN: {
      title: 'Terms of Service',
      intro: 'By using LowPrice, you agree to the following conditions:',
      use: 'Service Use',
      useText: 'LowPrice is a free service for viewing promotional catalogs. You agree to use the service legally and respectfully.',
      content: 'Content',
      contentText: 'All content displayed on LowPrice is the property of their respective owners. We are not responsible for the accuracy of displayed promotions.',
      liability: 'Liability',
      liabilityText: 'LowPrice cannot be held responsible for errors or omissions in displayed information. Promotions are provided for informational purposes.',
      modifications: 'Modifications',
      modificationsText: 'We reserve the right to modify these terms at any time. Changes will be published on this page.',
    },
  };

  const t = text[language];

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
      <h1 className="text-gray-900 mb-8">{t.title}</h1>
      
      <div className="space-y-8">
        <p className="text-gray-600 leading-relaxed">{t.intro}</p>

        <section>
          <h2 className="text-gray-900 mb-4">{t.use}</h2>
          <p className="text-gray-600 leading-relaxed">{t.useText}</p>
        </section>

        <section>
          <h2 className="text-gray-900 mb-4">{t.content}</h2>
          <p className="text-gray-600 leading-relaxed">{t.contentText}</p>
        </section>

        <section>
          <h2 className="text-gray-900 mb-4">{t.liability}</h2>
          <p className="text-gray-600 leading-relaxed">{t.liabilityText}</p>
        </section>

        <section>
          <h2 className="text-gray-900 mb-4">{t.modifications}</h2>
          <p className="text-gray-600 leading-relaxed">{t.modificationsText}</p>
        </section>
      </div>
    </div>
  );
}

