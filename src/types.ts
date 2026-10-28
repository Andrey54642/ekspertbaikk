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
  icon: string;
  color: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface Promo {
  id: string;
  title: string;
  discount: string;
  desc: string;
  color: string;
  icon: string;
}

export interface Landmark {
  id: string;
  name: string;
  distance: string;
  icon: string;
}

export interface RentStep {
  id: string;
  num: string;
  title: string;
  desc: string;
  icon: string;
}

export interface CourierBenefit {
  id: string;
  text: string;
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
  customSocials: SocialLink[];
  yandexMetrikaId: string;
  mapLat: number;
  mapLng: number;
  mapZoom: number;
  
  // SEO Sections toggles
  showRentSteps: boolean;
  showCourierSection: boolean;
  showReviews: boolean;
  showDistricts: boolean;
  showLandmarks: boolean;
  showPromos: boolean;
  showContactForm: boolean;
  
  // SEO Sections content
  rentSteps: RentStep[];
  courierBenefits: CourierBenefit[];
  courierEarningDay: string;
  courierRentDay: string;
  reviews: Review[];
  districts: string[];
  landmarks: Landmark[];
  promos: Promo[];
}
