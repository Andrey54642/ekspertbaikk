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

export interface SiteSettings {
  phone: string;
  address: string;
  workHours: string;
  whatsapp: string;
  telegram: string;
  instagram: string;
  vk: string;
  youtube: string;
}
