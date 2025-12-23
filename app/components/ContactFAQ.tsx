"use client";

import { Mail, Phone, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface ContactFAQProps {
  language: 'FR' | 'EN';
}

export function ContactFAQ({ language }: ContactFAQProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const text = {
    FR: {
      title: 'Contact & FAQ',
      contact: 'Contactez-nous',
      faq: 'Questions fréquentes',
      name: 'Nom',
      email: 'Email',
      message: 'Message',
      send: 'Envoyer',
      q1: 'Comment fonctionne LowPrice ?',
      a1: 'LowPrice centralise tous les catalogues de promotion des distributeurs et commerces locaux. Vous pouvez rechercher par localisation et découvrir les meilleures offres.',
      q2: 'Les promotions sont-elles vérifiées ?',
      a2: 'Oui, toutes les promotions sont vérifiées et mises à jour régulièrement pour garantir leur exactitude.',
      q3: 'Puis-je ajouter mon commerce ?',
      a3: 'Oui, contactez-nous via le formulaire ci-dessus pour ajouter votre commerce à notre plateforme.',
      q4: 'L\'application est-elle gratuite ?',
      a4: 'Oui, LowPrice est entièrement gratuit pour les utilisateurs.',
    },
    EN: {
      title: 'Contact & FAQ',
      contact: 'Contact Us',
      faq: 'Frequently Asked Questions',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send',
      q1: 'How does LowPrice work?',
      a1: 'LowPrice centralizes all promotional catalogs from retailers and local businesses. You can search by location and discover the best deals.',
      q2: 'Are promotions verified?',
      a2: 'Yes, all promotions are verified and regularly updated to ensure their accuracy.',
      q3: 'Can I add my business?',
      a3: 'Yes, contact us via the form above to add your business to our platform.',
      q4: 'Is the app free?',
      a4: 'Yes, LowPrice is completely free for users.',
    },
  };

  const t = text[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(language === 'FR' ? 'Message envoyé avec succès!' : 'Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
      <h1 className="text-gray-900 mb-12 text-center">{t.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <h2 className="text-gray-900 mb-6">{t.contact}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">{t.name}</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">{t.email}</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">{t.message}</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {t.send}
            </button>
          </form>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-gray-900 mb-6">{t.faq}</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-gray-900 mb-2 font-semibold">{t.q1}</h3>
              <p className="text-gray-600 text-sm">{t.a1}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-gray-900 mb-2 font-semibold">{t.q2}</h3>
              <p className="text-gray-600 text-sm">{t.a2}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-gray-900 mb-2 font-semibold">{t.q3}</h3>
              <p className="text-gray-600 text-sm">{t.a3}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-gray-900 mb-2 font-semibold">{t.q4}</h3>
              <p className="text-gray-600 text-sm">{t.a4}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

