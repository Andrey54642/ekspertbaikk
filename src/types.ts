export interface Bike {
  id: string;
  name: string;
  description: string;
  pricePerWeek: number;
  deposit: number;
  image: string;
  features: string[];
  badge?: string;
  badgeColor?: string;
  accentColor: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string; // font-awesome icon class
  color: string; // tailwind color
}

export interface SiteSettings {
  phone: string;
  address: string;
  workHours: string;
  whatsapp: string;
  telegram: string;
  instagram: string;
  vk: string;
  youtube: string;
  // Кастомные соцсети
  customSocials: SocialLink[];
  // Яндекс.Метрика
  yandexMetrikaId: string;
  // Настройки карты
  mapLat: number;
  mapLng: number;
  mapZoom: number;
}
