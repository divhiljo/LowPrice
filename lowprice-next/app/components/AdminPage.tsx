"use client";

import { useState, useEffect } from 'react';
import { Lock, Plus, Trash2, Edit, X, Save, FileText, Store, Image, Package, Globe, MapPin, Layout, Upload, Eye, Settings, Users, BarChart3, Star } from 'lucide-react';
import { distributeursData } from '../data/distributeurs';
import { locationsData, Country, City } from '../data/locations';

interface AdminPageProps {
  language: 'FR' | 'EN';
}

const ADMIN_EMAIL = 'admin@lowprice.cm';
const ADMIN_PASSWORD = 'admin123';

type AdminSection = 'dashboard' | 'distributeurs' | 'boutiques' | 'flyers' | 'reviews' | 'products' | 'countries' | 'cities' | 'pages' | 'content' | 'media' | 'users' | 'analytics';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  image?: string;
  category: string;
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ContentBlock {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'html' | 'markdown';
  position: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: number;
  uploadedAt: string;
}

interface User {
  id: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

type Boutique = {
  id: string;
  distributeurSlug: string;
  quartier: string;
  enseigne: string;
};

type Flyer = {
  id: string;
  boutiqueId: string;
  title: string;
  description?: string;
  image: string;
  startDate?: string;
  endDate?: string;
  status?: 'En cours' | 'Terminé';
  createdAt: string;
  updatedAt: string;
};

type Review = {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  isApproved?: boolean;
};

export function AdminPage({ language }: AdminPageProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [distributeurs, setDistributeurs] = useState<any>(distributeursData);
  const [locations, setLocations] = useState<Country[]>(locationsData);
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<string>('');

  // CMS Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [boutiques, setBoutiques] = useState<Boutique[]>([]);
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [productReviews, setProductReviews] = useState<Record<string, Review[]>>({});
  const [pages, setPages] = useState<Page[]>([]);
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const STORAGE_KEYS = {
    auth: 'admin_auth',
    distributeurs: 'cms_distributeurs',
    boutiques: 'cms_boutiques',
    flyers: 'cms_flyers',
    reviews: 'product_reviews',
    products: 'cms_products',
    pages: 'cms_pages',
    contentBlocks: 'cms_content_blocks',
    mediaFiles: 'cms_media_files',
    users: 'cms_users',
  } as const;

  const slugify = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[éèê]/g, 'e')
      .replace(/[àâ]/g, 'a')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-');
  };

  const text = {
    FR: {
      title: 'Administration CMS',
      login: 'Connexion',
      email: 'Email',
      password: 'Mot de passe',
      logout: 'Déconnexion',
      dashboard: 'Tableau de bord',
      distributeurs: 'Distributeurs',
      flyers: 'Flyers',
      products: 'Produits',
      countries: 'Pays',
      cities: 'Villes',
      pages: 'Pages',
      content: 'Blocs de contenu',
      media: 'Médias',
      users: 'Utilisateurs',
      analytics: 'Analyses',
      add: 'Ajouter',
      edit: 'Modifier',
      delete: 'Supprimer',
      save: 'Enregistrer',
      cancel: 'Annuler',
      publish: 'Publier',
      unpublish: 'Dépublier',
      name: 'Nom',
      slug: 'Slug',
      error: 'Email ou mot de passe incorrect',
      image: 'Image',
      price: 'Prix',
      discount: 'Réduction',
      period: 'Période',
      title_field: 'Titre',
      description: 'Description',
      actions: 'Actions',
      noData: 'Aucune donnée',
      confirmDelete: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
      category: 'Catégorie',
      stock: 'Stock',
      active: 'Actif',
      inactive: 'Inactif',
      contentField: 'Contenu',
      type: 'Type',
      position: 'Position',
      metaTitle: 'Titre meta',
      metaDescription: 'Description meta',
      published: 'Publié',
      draft: 'Brouillon',
      upload: 'Télécharger',
      file: 'Fichier',
      size: 'Taille',
      uploadedAt: 'Téléchargé le',
      role: 'Rôle',
      lastLogin: 'Dernière connexion',
      admin: 'Administrateur',
      editor: 'Éditeur',
      viewer: 'Lecteur',
      statistics: 'Statistiques',
      totalProducts: 'Total produits',
      totalPages: 'Total pages',
      totalUsers: 'Total utilisateurs',
      recentActivity: 'Activité récente',
      welcome: 'Bienvenue dans votre CMS personnalisé',
      cmsDescription: 'Gérez facilement votre contenu, produits et utilisateurs depuis cette interface intuitive.',
    },
    EN: {
      title: 'CMS Administration',
      login: 'Login',
      email: 'Email',
      password: 'Password',
      logout: 'Logout',
      dashboard: 'Dashboard',
      distributeurs: 'Retailers',
      flyers: 'Flyers',
      products: 'Products',
      countries: 'Countries',
      cities: 'Cities',
      pages: 'Pages',
      content: 'Content Blocks',
      media: 'Media',
      users: 'Users',
      analytics: 'Analytics',
      add: 'Add',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      publish: 'Publish',
      unpublish: 'Unpublish',
      name: 'Name',
      slug: 'Slug',
      error: 'Incorrect email or password',
      image: 'Image',
      price: 'Price',
      discount: 'Discount',
      period: 'Period',
      title_field: 'Title',
      description: 'Description',
      actions: 'Actions',
      noData: 'No data',
      confirmDelete: 'Are you sure you want to delete this item?',
      category: 'Category',
      stock: 'Stock',
      active: 'Active',
      inactive: 'Inactive',
      contentField: 'Content',
      type: 'Type',
      position: 'Position',
      metaTitle: 'Meta Title',
      metaDescription: 'Meta Description',
      published: 'Published',
      draft: 'Draft',
      upload: 'Upload',
      file: 'File',
      size: 'Size',
      uploadedAt: 'Uploaded at',
      role: 'Role',
      lastLogin: 'Last login',
      admin: 'Administrator',
      editor: 'Editor',
      viewer: 'Viewer',
      statistics: 'Statistics',
      totalProducts: 'Total products',
      totalPages: 'Total pages',
      totalUsers: 'Total users',
      recentActivity: 'Recent activity',
      welcome: 'Welcome to your custom CMS',
      cmsDescription: 'Easily manage your content, products and users from this intuitive interface.',
    },
  };

  const t = text[language];

  // Load data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem(STORAGE_KEYS.auth);
      if (auth === 'true') {
        setIsAuthenticated(true);
      }

      const savedDistributeurs = localStorage.getItem(STORAGE_KEYS.distributeurs);
      if (savedDistributeurs) setDistributeurs(JSON.parse(savedDistributeurs));

      // Load CMS data
      const savedProducts = localStorage.getItem(STORAGE_KEYS.products);
      const savedBoutiques = localStorage.getItem(STORAGE_KEYS.boutiques);
      const savedFlyers = localStorage.getItem(STORAGE_KEYS.flyers);
      const savedReviews = localStorage.getItem(STORAGE_KEYS.reviews);
      const savedPages = localStorage.getItem(STORAGE_KEYS.pages);
      const savedContentBlocks = localStorage.getItem(STORAGE_KEYS.contentBlocks);
      const savedMediaFiles = localStorage.getItem(STORAGE_KEYS.mediaFiles);
      const savedUsers = localStorage.getItem(STORAGE_KEYS.users);

      if (savedProducts) setProducts(JSON.parse(savedProducts));
      if (savedBoutiques) setBoutiques(JSON.parse(savedBoutiques));
      if (savedFlyers) setFlyers(JSON.parse(savedFlyers));
      if (savedReviews) setProductReviews(JSON.parse(savedReviews));
      if (savedPages) setPages(JSON.parse(savedPages));
      if (savedContentBlocks) setContentBlocks(JSON.parse(savedContentBlocks));
      if (savedMediaFiles) setMediaFiles(JSON.parse(savedMediaFiles));
      if (savedUsers) setUsers(JSON.parse(savedUsers));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.boutiques, JSON.stringify(boutiques));
    }
  }, [boutiques]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.flyers, JSON.stringify(flyers));
    }
  }, [flyers]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(productReviews));
    }
  }, [productReviews]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.distributeurs, JSON.stringify(distributeurs));
    }
  }, [distributeurs]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.pages, JSON.stringify(pages));
    }
  }, [pages]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.contentBlocks, JSON.stringify(contentBlocks));
    }
  }, [contentBlocks]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.mediaFiles, JSON.stringify(mediaFiles));
    }
  }, [mediaFiles]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
    }
  }, [users]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.auth, 'true');
      }
    } else {
      alert(t.error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.auth);
    }
    setEmail('');
    setPassword('');
  };

  const handleDelete = (type: string, id: string) => {
    if (!confirm(t.confirmDelete)) return;

    switch (type) {
      case 'product':
        setProducts(prev => prev.filter(p => p.id !== id));
        break;
      case 'boutique':
        setBoutiques(prev => prev.filter(b => b.id !== id));
        setProducts(prev => prev.filter((p: any) => p.boutiqueId !== id));
        setFlyers(prev => prev.filter(f => f.boutiqueId !== id));
        break;
      case 'flyer':
        setFlyers(prev => prev.filter(f => f.id !== id));
        break;
      case 'page':
        setPages(prev => prev.filter(p => p.id !== id));
        break;
      case 'content':
        setContentBlocks(prev => prev.filter(c => c.id !== id));
        break;
      case 'media':
        setMediaFiles(prev => prev.filter(m => m.id !== id));
        break;
      case 'user':
        setUsers(prev => prev.filter(u => u.id !== id));
        break;
      case 'country':
        setLocations(prev => prev.filter(country => country.id !== id));
        break;
      case 'city':
        setLocations(prev =>
          prev.map(country => ({
            ...country,
            cities: country.cities.filter(city => city.id !== id),
          }))
        );
        break;
      case 'distributeur':
        setDistributeurs((prev: any) => {
          if (!prev || typeof prev !== 'object') return prev;
          // id is the distributeur slug
          const { [id]: _removed, ...rest } = prev;
          return rest;
        });
        setBoutiques(prev => prev.filter(b => b.distributeurSlug !== id));
        break;
      default:
        console.log('Delete', type, id);
    }
  };

  const handleEdit = (item: any, type: string) => {
    setEditingItem({ ...item, type });
    setModalType(type);
    setShowModal(true);
  };

  const handleAdd = (type: string) => {
    setEditingItem(null);
    setModalType(type);
    setShowModal(true);
  };

  const toggleReviewApproval = (reviewKey: string, reviewId: string) => {
    setProductReviews((prev) => {
      const list = prev[reviewKey] || [];
      return {
        ...prev,
        [reviewKey]: list.map((r) =>
          r.id === reviewId ? { ...r, isApproved: !(r.isApproved ?? true) } : r
        ),
      };
    });
  };

  const deleteReview = (reviewKey: string, reviewId: string) => {
    if (!confirm(t.confirmDelete)) return;
    setProductReviews((prev) => {
      const list = prev[reviewKey] || [];
      const nextList = list.filter((r) => r.id !== reviewId);
      const next = { ...prev };
      if (nextList.length === 0) {
        delete next[reviewKey];
      } else {
        next[reviewKey] = nextList;
      }
      return next;
    });
  };

  const getBoutiqueLabel = (boutiqueId: string) => {
    const b = boutiques.find((x) => x.id === boutiqueId);
    if (!b) return boutiqueId;
    return `${b.enseigne} • ${b.quartier}`;
  };

  const parseReviewKey = (key: string) => {
    const parts = key.split('::');
    return {
      distributeurSlug: parts[0] || '',
      boutiqueId: parts[1] || '',
      productId: parts[2] || '',
    };
  };

  const handleSave = (data: any, type: string) => {
    const now = new Date().toISOString();

    switch (type) {
      case 'product':
        if (editingItem) {
          setProducts(products.map(p => p.id === editingItem.id ? { ...data, updatedAt: now } : p));
        } else {
          const newProduct: Product = {
            ...data,
            id: Date.now().toString(),
            createdAt: now,
            updatedAt: now,
          };
          setProducts([...products, newProduct]);
        }
        break;
      case 'boutique':
        if (editingItem) {
          setBoutiques(boutiques.map(b => b.id === editingItem.id ? { ...editingItem, ...data } : b));
        } else {
          const distributeurSlug = String(data.distributeurSlug || '').trim();
          const enseigne = String(data.enseigne || '').trim();
          const quartiersRaw = String(data.quartiers || data.quartier || '').trim();
          const quartiers = quartiersRaw
            ? quartiersRaw.split(',').map((q: string) => q.trim()).filter(Boolean)
            : [];
          const toCreate = quartiers.length > 0 ? quartiers : [String(data.quartier || '').trim()].filter(Boolean);
          const created = toCreate.map((quartier: string, idx: number) => {
            const base = `${distributeurSlug}__${slugify(quartier)}__${slugify(enseigne)}`;
            return {
              id: `${base}__${Date.now()}__${idx}`,
              distributeurSlug,
              quartier,
              enseigne,
            } as Boutique;
          });
          setBoutiques([...boutiques, ...created]);
        }
        break;
      case 'flyer':
        if (editingItem) {
          setFlyers(flyers.map(f => f.id === editingItem.id ? { ...data, updatedAt: now } : f));
        } else {
          const newFlyer: Flyer = {
            ...data,
            id: Date.now().toString(),
            createdAt: now,
            updatedAt: now,
          };
          setFlyers([...flyers, newFlyer]);
        }
        break;
      case 'distributeur': {
        const nextSlug = String(data.slug || data.id || '').trim() || slugify(String(data.name || ''));
        if (!nextSlug) break;
        setDistributeurs((prev: any) => ({
          ...(prev || {}),
          [nextSlug]: {
            ...(prev?.[nextSlug] || {}),
            ...data,
            name: data.name || prev?.[nextSlug]?.name,
          },
        }));
        break;
      }
      case 'page':
        if (editingItem) {
          setPages(pages.map(p => p.id === editingItem.id ? { ...data, updatedAt: now } : p));
        } else {
          const newPage: Page = {
            ...data,
            id: Date.now().toString(),
            createdAt: now,
            updatedAt: now,
          };
          setPages([...pages, newPage]);
        }
        break;
      case 'content':
        if (editingItem) {
          setContentBlocks(contentBlocks.map(c => c.id === editingItem.id ? { ...data, updatedAt: now } : c));
        } else {
          const newContent: ContentBlock = {
            ...data,
            id: Date.now().toString(),
            createdAt: now,
            updatedAt: now,
          };
          setContentBlocks([...contentBlocks, newContent]);
        }
        break;
      case 'media':
        if (editingItem) {
          setMediaFiles(mediaFiles.map(m => m.id === editingItem.id ? { ...data, uploadedAt: now } : m));
        } else {
          const newMedia: MediaFile = {
            ...data,
            id: Date.now().toString(),
            uploadedAt: now,
          };
          setMediaFiles([...mediaFiles, newMedia]);
        }
        break;
      case 'user':
        if (editingItem) {
          setUsers(users.map(u => u.id === editingItem.id ? data : u));
        } else {
          const newUser: User = {
            ...data,
            id: Date.now().toString(),
            createdAt: now,
          };
          setUsers([...users, newUser]);
        }
        break;
    }

    setShowModal(false);
    setEditingItem(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="max-w-md w-full bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-gray-900" />
          </div>
          <h1 className="text-gray-900 mb-8 text-center text-2xl font-semibold">{t.title}</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">{t.email}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">{t.password}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              {t.login}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'dashboard' as AdminSection, label: t.dashboard, icon: BarChart3 },
    { id: 'distributeurs' as AdminSection, label: t.distributeurs, icon: Store },
    { id: 'boutiques' as AdminSection, label: language === 'FR' ? 'Boutiques' : 'Shops', icon: Store },
    { id: 'products' as AdminSection, label: t.products, icon: Package },
    { id: 'flyers' as AdminSection, label: t.flyers, icon: Image },
    { id: 'reviews' as AdminSection, label: language === 'FR' ? 'Avis' : 'Reviews', icon: Star },
    { id: 'pages' as AdminSection, label: t.pages, icon: Layout },
    { id: 'content' as AdminSection, label: t.content, icon: FileText },
    { id: 'media' as AdminSection, label: t.media, icon: Upload },
    { id: 'countries' as AdminSection, label: t.countries, icon: Globe },
    { id: 'cities' as AdminSection, label: t.cities, icon: MapPin },
    { id: 'users' as AdminSection, label: t.users, icon: Users },
    { id: 'analytics' as AdminSection, label: t.analytics, icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-900 text-xl font-semibold">{t.title}</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              {t.logout}
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden`}>
          <div className="p-4 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-12">
          {/* Dashboard */}
          {activeSection === 'dashboard' && (
            <div>
              <h2 className="text-gray-900 text-2xl font-semibold mb-8">{t.dashboard}</h2>

              {/* Welcome Message */}
              <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
                <h3 className="text-gray-900 text-xl font-semibold mb-4">{t.welcome}</h3>
                <p className="text-gray-600">{t.cmsDescription}</p>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">{t.totalProducts}</p>
                      <p className="text-gray-900 text-2xl font-semibold">{products.length}</p>
                    </div>
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">{t.totalPages}</p>
                      <p className="text-gray-900 text-2xl font-semibold">{pages.length}</p>
                    </div>
                    <Layout className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">{t.totalUsers}</p>
                      <p className="text-gray-900 text-2xl font-semibold">{users.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">{t.content}</p>
                      <p className="text-gray-900 text-2xl font-semibold">{contentBlocks.length}</p>
                    </div>
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-gray-900 text-lg font-semibold mb-4">{t.recentActivity}</h3>
                <div className="space-y-4">
                  {[...products.slice(-3), ...pages.slice(-2)].map((item: any, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-gray-900 text-sm font-medium">
                          {item.name || item.title} {item.updatedAt ? '(modifié)' : '(créé)'}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {new Date(item.updatedAt || item.createdAt).toLocaleDateString(language === 'FR' ? 'fr-FR' : 'en-US')}
                        </p>
                      </div>
                    </div>
                  ))}
                  {products.length === 0 && pages.length === 0 && (
                    <p className="text-gray-500 text-sm">{t.noData}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'boutiques' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-gray-900 text-2xl font-semibold">{language === 'FR' ? 'Boutiques' : 'Shops'}</h2>
                <button
                  onClick={() => handleAdd('boutique')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  {t.add}
                </button>
              </div>

              {boutiques.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                  <p className="text-gray-500">{t.noData}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {boutiques
                    .slice()
                    .sort((a, b) => `${a.distributeurSlug}-${a.quartier}-${a.enseigne}`.localeCompare(`${b.distributeurSlug}-${b.quartier}-${b.enseigne}`))
                    .map((b) => (
                      <div key={b.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <h3 className="text-gray-900 mb-1 font-semibold">{b.enseigne}</h3>
                        <p className="text-gray-500 text-sm mb-1">{b.quartier}</p>
                        <p className="text-gray-500 text-xs font-mono mb-4">{b.distributeurSlug}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(b, 'boutique')}
                            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm font-medium"
                          >
                            <Edit className="w-4 h-4" />
                            {t.edit}
                          </button>
                          <button
                            onClick={() => handleDelete('boutique', b.id)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm font-medium"
                          >
                            <Trash2 className="w-4 h-4" />
                            {t.delete}
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* Products Section */}
          {activeSection === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-gray-900 text-2xl font-semibold">{t.products}</h2>
                <button
                  onClick={() => handleAdd('product')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  {t.add}
                </button>
              </div>
              {products.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                  <p className="text-gray-500">{t.noData}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      {product.image && (
                        <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                      )}
                      <h3 className="text-gray-900 mb-2 font-semibold">{product.name}</h3>
                      {(product as any).boutiqueId && (
                        <p className="text-gray-500 text-sm mb-2">{getBoutiqueLabel((product as any).boutiqueId)}</p>
                      )}
                      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-900 font-semibold">{product.price}€</span>
                        <span className={`px-2 py-1 rounded text-xs ${product.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {product.isActive ? t.active : t.inactive}
                        </span>
                      </div>
                      {typeof (product as any).discount === 'number' && (
                        <p className="text-gray-500 text-sm mb-4">{t.discount}: {(product as any).discount}%</p>
                      )}
                      {Array.isArray((product as any).tags) && (product as any).tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {(product as any).tags.slice(0, 6).map((tag: string, idx: number) => (
                            <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product, 'product')}
                          className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm font-medium"
                        >
                          <Edit className="w-4 h-4" />
                          {t.edit}
                        </button>
                        <button
                          onClick={() => handleDelete('product', product.id)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm font-medium"
                        >
                          <Trash2 className="w-4 h-4" />
                          {t.delete}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSection === 'flyers' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-gray-900 text-2xl font-semibold">{t.flyers}</h2>
                <button
                  onClick={() => handleAdd('flyer')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  {t.add}
                </button>
              </div>

              {flyers.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                  <p className="text-gray-500">{t.noData}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {flyers
                    .slice()
                    .sort((a, b) => (b.updatedAt || b.createdAt).localeCompare(a.updatedAt || a.createdAt))
                    .map((flyer) => (
                      <div key={flyer.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="text-gray-900 font-semibold">{flyer.title}</h3>
                          {flyer.status && (
                            <span className={`px-2 py-1 rounded text-xs ${flyer.status === 'Terminé' ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-600'}`}>
                              {flyer.status}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-500 text-sm mb-2">{getBoutiqueLabel(flyer.boutiqueId)}</p>
                        {flyer.description && (
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{flyer.description}</p>
                        )}
                        {(flyer.startDate || flyer.endDate) && (
                          <p className="text-gray-500 text-sm mb-4">
                            {t.period}: {[flyer.startDate, flyer.endDate].filter(Boolean).join(' - ')}
                          </p>
                        )}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(flyer, 'flyer')}
                            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm font-medium"
                          >
                            <Edit className="w-4 h-4" />
                            {t.edit}
                          </button>
                          <button
                            onClick={() => handleDelete('flyer', flyer.id)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm font-medium"
                          >
                            <Trash2 className="w-4 h-4" />
                            {t.delete}
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {activeSection === 'reviews' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-gray-900 text-2xl font-semibold">{language === 'FR' ? 'Avis produits' : 'Product reviews'}</h2>
              </div>

              {Object.keys(productReviews).length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                  <p className="text-gray-500">{t.noData}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(productReviews)
                    .slice()
                    .sort((a, b) => (b[1]?.[0]?.createdAt || '').localeCompare(a[1]?.[0]?.createdAt || ''))
                    .map(([key, reviews]) => {
                      const meta = parseReviewKey(key);
                      return (
                        <div key={key} className="bg-white border border-gray-200 rounded-lg p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                            <div>
                              <h3 className="text-gray-900 font-semibold">{meta.distributeurSlug}</h3>
                              <p className="text-gray-500 text-sm">{getBoutiqueLabel(meta.boutiqueId)} • {meta.productId}</p>
                            </div>
                            <span className="text-sm text-gray-500">{reviews.length} {language === 'FR' ? 'avis' : 'reviews'}</span>
                          </div>

                          <div className="space-y-3">
                            {reviews.map((r) => {
                              const approved = r.isApproved ?? true;
                              return (
                                <div key={r.id} className="border border-gray-100 rounded-lg p-4">
                                  <div className="flex items-start justify-between gap-4">
                                    <div>
                                      <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                          <Star key={i} className={`w-4 h-4 ${i <= r.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                                        ))}
                                      </div>
                                      <p className="text-gray-700 text-sm mt-2">{r.comment}</p>
                                      <p className="text-gray-500 text-xs mt-2">{new Date(r.createdAt).toLocaleDateString(language === 'FR' ? 'fr-FR' : 'en-US')}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                      <button
                                        onClick={() => toggleReviewApproval(key, r.id)}
                                        className={`text-xs px-2 py-1 rounded ${approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
                                      >
                                        {approved ? (language === 'FR' ? 'Approuvé' : 'Approved') : (language === 'FR' ? 'En attente' : 'Pending')}
                                      </button>
                                      <button
                                        onClick={() => deleteReview(key, r.id)}
                                        className="text-xs px-2 py-1 rounded bg-red-100 text-red-700"
                                      >
                                        {t.delete}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          )}

          {/* Pages Section */}
          {activeSection === 'pages' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-gray-900 text-2xl font-semibold">{t.pages}</h2>
                <button
                  onClick={() => handleAdd('page')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  {t.add}
                </button>
              </div>
              {pages.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                  <p className="text-gray-500">{t.noData}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pages.map((page) => (
                    <div key={page.id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-gray-900 font-semibold">{page.title}</h3>
                          <p className="text-gray-500 text-sm">/{page.slug}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${page.isPublished ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                          {page.isPublished ? t.published : t.draft}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{page.content.substring(0, 150)}...</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(page, 'page')}
                          className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm font-medium"
                        >
                          <Edit className="w-4 h-4" />
                          {t.edit}
                        </button>
                        <button
                          onClick={() => handleDelete('page', page.id)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm font-medium"
                        >
                          <Trash2 className="w-4 h-4" />
                          {t.delete}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Content Blocks Section */}
          {activeSection === 'content' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-gray-900 text-2xl font-semibold">{t.content}</h2>
                <button
                  onClick={() => handleAdd('content')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  {t.add}
                </button>
              </div>
              {contentBlocks.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                  <p className="text-gray-500">{t.noData}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contentBlocks.map((block) => (
                    <div key={block.id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-900 font-semibold">{block.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs ${block.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {block.isActive ? t.active : t.inactive}
                          </span>
                          <span className="text-gray-500 text-xs">#{block.position}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{block.content.substring(0, 150)}...</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(block, 'content')}
                          className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm font-medium"
                        >
                          <Edit className="w-4 h-4" />
                          {t.edit}
                        </button>
                        <button
                          onClick={() => handleDelete('content', block.id)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm font-medium"
                        >
                          <Trash2 className="w-4 h-4" />
                          {t.delete}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Media Section */}
          {activeSection === 'media' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-gray-900 text-2xl font-semibold">{t.media}</h2>
                <button
                  onClick={() => handleAdd('media')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  {t.upload}
                </button>
              </div>
              {mediaFiles.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                  <p className="text-gray-500">{t.noData}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mediaFiles.map((file) => (
                    <div key={file.id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                        {file.type === 'image' ? (
                          <img src={file.url} alt={file.name} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <FileText className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <h3 className="text-gray-900 font-semibold mb-2">{file.name}</h3>
                      <p className="text-gray-500 text-sm mb-4">
                        {(file.size / 1024).toFixed(1)} KB • {new Date(file.uploadedAt).toLocaleDateString(language === 'FR' ? 'fr-FR' : 'en-US')}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => window.open(file.url, '_blank')}
                          className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-sm font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          Voir
                        </button>
                        <button
                          onClick={() => handleDelete('media', file.id)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm font-medium"
                        >
                          <Trash2 className="w-4 h-4" />
                          {t.delete}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Users Section */}
          {activeSection === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-gray-900 text-2xl font-semibold">{t.users}</h2>
                <button
                  onClick={() => handleAdd('user')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  {t.add}
                </button>
              </div>
              {users.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                  <p className="text-gray-500">{t.noData}</p>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.email}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.role}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.lastLogin}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.actions}</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.role === 'admin' ? t.admin : user.role === 'editor' ? t.editor : t.viewer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString(language === 'FR' ? 'fr-FR' : 'en-US') : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(user, 'user')}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete('user', user.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Analytics Section */}
          {activeSection === 'analytics' && (
            <div>
              <h2 className="text-gray-900 text-2xl font-semibold mb-8">{t.analytics}</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">{t.noData}</p>
                <p className="text-gray-400 text-sm mt-2">Analytics functionality will be implemented here</p>
              </div>
            </div>
          )}

          {/* Existing sections for distributeurs, countries, cities remain the same */}
          {activeSection === 'distributeurs' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-gray-900 text-2xl font-semibold">{t.distributeurs}</h2>
                <button
                  onClick={() => handleAdd('distributeur')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  {t.add}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(distributeurs).map(([slug, data]: [string, any]) => (
                  <div key={slug} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-gray-900 mb-2 font-semibold">{data.name}</h3>
                    <p className="text-gray-500 text-sm mb-4 font-mono">{slug}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit({ slug, ...data }, 'distributeur')}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm font-medium"
                      >
                        <Edit className="w-4 h-4" />
                        {t.edit}
                      </button>
                      <button
                        onClick={() => handleDelete('distributeur', slug)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm font-medium"
                      >
                        <Trash2 className="w-4 h-4" />
                        {t.delete}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Countries and Cities sections remain the same */}
          {activeSection === 'countries' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-gray-900 text-2xl font-semibold">{t.countries}</h2>
                <button
                  onClick={() => handleAdd('country')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  {t.add}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {locations.map((country) => (
                  <div key={country.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-gray-900 mb-2 font-semibold">{country.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{country.cities.length} {t.cities.toLowerCase()}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(country, 'country')}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm font-medium"
                      >
                        <Edit className="w-4 h-4" />
                        {t.edit}
                      </button>
                      <button
                        onClick={() => handleDelete('country', country.id)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm font-medium"
                      >
                        <Trash2 className="w-4 h-4" />
                        {t.delete}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'cities' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-gray-900 text-2xl font-semibold">{t.cities}</h2>
                <button
                  onClick={() => handleAdd('city')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  {t.add}
                </button>
              </div>
              <div className="space-y-4">
                {locations.map((country) => (
                  <div key={country.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-gray-900 mb-4 font-semibold">{country.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {country.cities.map((city) => (
                        <div key={city.id} className="border border-gray-100 rounded-lg p-4">
                          <h4 className="text-gray-900 mb-2 font-medium">{city.name}</h4>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit({ countryId: country.id, ...city }, 'city')}
                              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
                            >
                              <Edit className="w-4 h-4" />
                              {t.edit}
                            </button>
                            <button
                              onClick={() => handleDelete('city', city.id)}
                              className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm"
                            >
                              <Trash2 className="w-4 h-4" />
                              {t.delete}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal for editing/adding items */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900 text-lg font-semibold">
                  {editingItem ? t.edit : t.add}{' '}
                  {modalType === 'product' ? t.products.toLowerCase().slice(0, -1) :
                    modalType === 'flyer' ? t.flyers.toLowerCase().slice(0, -1) :
                    modalType === 'boutique' ? (language === 'FR' ? 'boutique' : 'shop') :
                    modalType === 'distributeur' ? t.distributeurs.toLowerCase().slice(0, -1) :
                    modalType === 'page' ? t.pages.toLowerCase().slice(0, -1) :
                    modalType === 'content' ? t.content.toLowerCase() :
                    modalType === 'media' ? t.media.toLowerCase() :
                    modalType === 'user' ? t.users.toLowerCase().slice(0, -1) : ''}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <ModalForm
                type={modalType}
                item={editingItem}
                onSave={handleSave}
                onCancel={() => setShowModal(false)}
                language={language}
                text={t}
                boutiques={boutiques}
                distributeurs={distributeurs}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Modal Form Component
function ModalForm({ type, item, onSave, onCancel, language, text, boutiques, distributeurs }: any) {
  const [formData, setFormData] = useState<any>(item || {});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, type);
  };

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === 'distributeur' && (
        <>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{text.name}</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{text.slug}</label>
            <input
              type="text"
              value={formData.slug || ''}
              onChange={(e) => handleChange('slug', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              placeholder={language === 'FR' ? 'optionnel (auto si vide)' : 'optional (auto if empty)'}
            />
          </div>
        </>
      )}

      {type === 'boutique' && (
        <>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{language === 'FR' ? 'Distributeur' : 'Retailer'}</label>
            <select
              value={formData.distributeurSlug || ''}
              onChange={(e) => handleChange('distributeurSlug', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              required
            >
              <option value="">{language === 'FR' ? 'Sélectionner' : 'Select'}</option>
              {Object.keys(distributeurs || {}).map((slug: string) => (
                <option key={slug} value={slug}>
                  {slug}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{language === 'FR' ? 'Enseigne' : 'Brand'}</label>
            <input
              type="text"
              value={formData.enseigne || ''}
              onChange={(e) => handleChange('enseigne', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{language === 'FR' ? 'Quartier(s)' : 'Neighborhood(s)'}</label>
            <input
              type="text"
              value={formData.quartiers || formData.quartier || ''}
              onChange={(e) => handleChange('quartiers', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              placeholder={language === 'FR' ? 'Ex: Akwa, Bonanjo, Deido' : 'e.g. Akwa, Bonanjo, Deido'}
              required
            />
          </div>
        </>
      )}

      {type === 'flyer' && (
        <>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{language === 'FR' ? 'Boutique' : 'Shop'}</label>
            <select
              value={formData.boutiqueId || ''}
              onChange={(e) => handleChange('boutiqueId', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              required
            >
              <option value="">{language === 'FR' ? 'Sélectionner' : 'Select'}</option>
              {(boutiques || []).map((b: any) => (
                <option key={b.id} value={b.id}>
                  {b.enseigne} • {b.quartier}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{text.title_field}</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{text.description}</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{text.image} (URL)</label>
            <input
              type="url"
              value={formData.image || ''}
              onChange={(e) => handleChange('image', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">{language === 'FR' ? 'Début' : 'Start'}</label>
              <input
                type="date"
                value={formData.startDate || ''}
                onChange={(e) => handleChange('startDate', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">{language === 'FR' ? 'Fin' : 'End'}</label>
              <input
                type="date"
                value={formData.endDate || ''}
                onChange={(e) => handleChange('endDate', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{language === 'FR' ? 'Statut' : 'Status'}</label>
            <select
              value={formData.status || 'En cours'}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
            >
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
            </select>
          </div>
        </>
      )}

      {type === 'product' && (
        <>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{language === 'FR' ? 'Boutique' : 'Shop'}</label>
            <select
              value={(formData as any).boutiqueId || ''}
              onChange={(e) => handleChange('boutiqueId', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              required
            >
              <option value="">{language === 'FR' ? 'Sélectionner' : 'Select'}</option>
              {(boutiques || []).map((b: any) => (
                <option key={b.id} value={b.id}>
                  {b.enseigne} • {b.quartier}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{text.name}</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{text.description}</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              rows={3}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">{text.price}</label>
              <input
                type="number"
                step="0.01"
                value={formData.price || ''}
                onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">{text.discount}</label>
              <input
                type="number"
                min={0}
                max={100}
                value={(formData as any).discount ?? 0}
                onChange={(e) => handleChange('discount', parseFloat(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">{language === 'FR' ? 'Étiquettes (séparées par ,)' : 'Tags (comma separated)'}</label>
            <input
              type="text"
              value={Array.isArray((formData as any).tags) ? (formData as any).tags.join(', ') : (formData as any).tags || ''}
              onChange={(e) => {
                const raw = e.target.value;
                const parsed = raw
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean);
                handleChange('tags', parsed);
              }}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              placeholder={language === 'FR' ? 'Ex: bio, promo, fruits' : 'e.g. organic, promo, fruits'}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">{text.category}</label>
              <input
                type="text"
                value={formData.category || ''}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">{text.stock}</label>
              <input
                type="number"
                value={formData.stock || 0}
                onChange={(e) => handleChange('stock', parseInt(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">{text.active}</label>
            <select
              value={formData.isActive ? 'true' : 'false'}
              onChange={(e) => handleChange('isActive', e.target.value === 'true')}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
            >
              <option value="true">{text.active}</option>
              <option value="false">{text.inactive}</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">{text.image} (URL)</label>
            <input
              type="url"
              value={formData.image || ''}
              onChange={(e) => handleChange('image', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
            />
          </div>
        </>
      )}

      {type === 'page' && (
        <>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{text.title_field}</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{text.slug}</label>
            <input
              type="text"
              value={formData.slug || ''}
              onChange={(e) => handleChange('slug', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{text.contentField}</label>
            <textarea
              value={formData.content || ''}
              onChange={(e) => handleChange('content', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              rows={8}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">{text.metaTitle}</label>
              <input
                type="text"
                value={formData.metaTitle || ''}
                onChange={(e) => handleChange('metaTitle', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">{text.published}</label>
              <select
                value={formData.isPublished ? 'true' : 'false'}
                onChange={(e) => handleChange('isPublished', e.target.value === 'true')}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              >
                <option value="true">{text.published}</option>
                <option value="false">{text.draft}</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{text.metaDescription}</label>
            <textarea
              value={formData.metaDescription || ''}
              onChange={(e) => handleChange('metaDescription', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              rows={2}
            />
          </div>
        </>
      )}

      {type === 'content' && (
        <>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{text.title_field}</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{text.type}</label>
            <select
              value={formData.type || 'text'}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
            >
              <option value="text">Texte</option>
              <option value="html">HTML</option>
              <option value="markdown">Markdown</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{text.contentField}</label>
            <textarea
              value={formData.content || ''}
              onChange={(e) => handleChange('content', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              rows={6}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">{text.position}</label>
              <input
                type="number"
                value={formData.position || 0}
                onChange={(e) => handleChange('position', parseInt(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">{text.active}</label>
              <select
                value={formData.isActive ? 'true' : 'false'}
                onChange={(e) => handleChange('isActive', e.target.value === 'true')}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              >
                <option value="true">{text.active}</option>
                <option value="false">{text.inactive}</option>
              </select>
            </div>
          </div>
        </>
      )}

      {type === 'media' && (
        <>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{text.name}</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">URL</label>
            <input
              type="url"
              value={formData.url || ''}
              onChange={(e) => handleChange('url', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">{text.type}</label>
              <select
                value={formData.type || 'image'}
                onChange={(e) => handleChange('type', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              >
                <option value="image">Image</option>
                <option value="video">Vidéo</option>
                <option value="document">Document</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">{text.size} (KB)</label>
              <input
                type="number"
                value={formData.size || 0}
                onChange={(e) => handleChange('size', parseInt(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                required
              />
            </div>
          </div>
        </>
      )}

      {type === 'user' && (
        <>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{text.email}</label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{text.role}</label>
            <select
              value={formData.role || 'viewer'}
              onChange={(e) => handleChange('role', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
            >
              <option value="admin">{text.admin}</option>
              <option value="editor">{text.editor}</option>
              <option value="viewer">{text.viewer}</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">{text.active}</label>
            <select
              value={formData.isActive ? 'true' : 'false'}
              onChange={(e) => handleChange('isActive', e.target.value === 'true')}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
            >
              <option value="true">{text.active}</option>
              <option value="false">{text.inactive}</option>
            </select>
          </div>
        </>
      )}

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="flex-1 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          {text.save}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          {text.cancel}
        </button>
      </div>
    </form>
  );
}
