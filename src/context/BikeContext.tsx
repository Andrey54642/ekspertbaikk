import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Bike, SiteSettings } from '../types';
import * as api from '../services/apiService';

interface BikeContextType {
  bikes: Bike[];
  settings: SiteSettings;
  isLoading: boolean;
  isSyncing: boolean;
  addBike: (bike: Omit<Bike, 'id'>) => Promise<void>;
  updateBike: (id: string, bike: Partial<Bike>) => Promise<void>;
  deleteBike: (id: string) => Promise<void>;
  updateSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  refreshData: () => Promise<void>;
}

const defaultSettings: SiteSettings = {
  phone: '+7 (900) 123-45-67',
  address: 'г. Краснодар, ул. Снесарева, 3',
  workHours: 'Ежедневно с 9:00 до 21:00',
  whatsapp: '79001234567',
  telegram: '',
  instagram: '',
  vk: '',
  youtube: '',
  customSocials: [],
  yandexMetrikaId: '',
  mapLat: 45.035470,
  mapLng: 38.975310,
  mapZoom: 16,
  
  // SEO Sections toggles
  showRentSteps: true,
  showCourierSection: true,
  showReviews: true,
  showDistricts: true,
  showLandmarks: true,
  showPromos: true,
  showContactForm: true,
  
  // SEO Sections content
  rentSteps: [
    { id: '1', num: '1', title: 'Свяжитесь с нами', desc: 'Позвоните или напишите в WhatsApp', icon: 'fa-phone' },
    { id: '2', num: '2', title: 'Приезжайте к нам', desc: 'ул. Снесарева, 3', icon: 'fa-location-dot' },
    { id: '3', num: '3', title: 'Оставьте залог', desc: '1500₽ и документы', icon: 'fa-file-contract' },
    { id: '4', num: '4', title: 'Получите велосипед', desc: 'Заряженный и готовый', icon: 'fa-bicycle' },
    { id: '5', num: '5', title: 'Пользуйтесь', desc: 'Неделю или дольше', icon: 'fa-calendar-check' },
  ],
  courierBenefits: [
    { id: '1', text: 'Аренда от 1 недели без переплат' },
    { id: '2', text: 'Скидки при аренде на месяц (до 20%)' },
    { id: '3', text: 'Бесплатное техобслуживание' },
    { id: '4', text: 'Подменный велосипед на время ремонта' },
    { id: '5', text: 'Помощь с регистрацией в сервисах доставки' },
    { id: '6', text: 'Приоритетная поддержка 24/7' },
  ],
  courierEarningDay: '3000-5000₽',
  courierRentDay: '~600₽',
  reviews: [
    { id: '1', name: 'Алексей К.', role: 'Курьер Яндекс.Еды', text: 'Арендовал Майкалин U5 на месяц для работы курьером. Велосипед мощный, заряда хватает на весь день. За 30 дней ни одной поломки. Рекомендую!', rating: 5 },
    { id: '2', name: 'Мария С.', role: 'Студентка', text: 'Брала Kugo U5 на неделю для поездок по городу. Очень удобный и лёгкий. Складная конструкция — можно взять в метро. Спасибо!', rating: 5 },
    { id: '3', name: 'Дмитрий В.', role: 'Курьер Delivery Club', text: 'Работаю уже 2 месяца с Эксперт Байк. Отличные условия для курьеров, бесплатное обслуживание. Зарабатываю больше, чем на обычном велике.', rating: 5 },
    { id: '4', name: 'Елена П.', role: 'Фрилансер', text: 'Арендую велосипед каждые выходные для прогулок по паркам Краснодара. Очень удобно, не нужно покупать свой. Сервис на высоте!', rating: 5 },
    { id: '5', name: 'Игорь М.', role: 'Курьер Самокат', text: 'Перешёл с обычного велосипеда на электровелосипед. Теперь успеваю делать в 2 раза больше заказов. Окупается за неделю!', rating: 5 },
    { id: '6', name: 'Анна Л.', role: 'Мама в декрете', text: 'Брала велосипед на месяц, чтобы ездить с ребёнком в поликлинику и магазины. Очень удобно и экологично. Спасибо за отличный сервис!', rating: 5 },
  ],
  districts: [
    'Центральный', 'Западный обход', 'Юбилейный', 'Музыкальный',
    'Гидрострой', 'Пашковский', 'Энка', 'Комсомольский',
    'Фестивальный', 'Московский', 'Прикубанский', 'Центральный округ',
    'Карасунский', 'Западный', 'Восточный', 'Северный'
  ],
  landmarks: [
    { id: '1', name: 'ТЦ "Красная Площадь"', distance: '5 минут', icon: 'fa-shopping-bag' },
    { id: '2', name: 'Парк Галицкого', distance: '10 минут', icon: 'fa-tree' },
    { id: '3', name: 'Стадион ФК Краснодар', distance: '7 минут', icon: 'fa-futbol' },
    { id: '4', name: 'ТРЦ "СБС Мегамолл"', distance: '8 минут', icon: 'fa-store' },
  ],
  promos: [
    { id: '1', title: 'Первая аренда', discount: '-10%', desc: 'Скидка 10% на первую аренду электровелосипеда', color: 'green', icon: 'fa-gift' },
    { id: '2', title: 'Аренда на месяц', discount: '-15%', desc: 'Скидка 15% при аренде на месяц и более', color: 'cyan', icon: 'fa-calendar-alt' },
    { id: '3', title: 'Приведи друга', discount: 'Неделя бесплатно', desc: 'Приведи друга и получи неделю аренды бесплатно', color: 'purple', icon: 'fa-users' },
  ],
};

const BikeContext = createContext<BikeContextType | undefined>(undefined);

export function BikeProvider({ children }: { children: ReactNode }) {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await api.fetchAllData();
      if (data.bikes) setBikes(data.bikes);
      if (data.settings) {
        // Merge with defaults to ensure all fields exist
        setSettings({ ...defaultSettings, ...data.settings });
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setIsLoading(false);
  };

  const addBike = async (bike: Omit<Bike, 'id'>) => {
    setIsSyncing(true);
    try {
      const result = await api.addBike(bike);
      if (result.success && result.bike) {
        setBikes(prev => [...prev, result.bike]);
      }
    } catch (error) {
      console.error('Error adding bike:', error);
    }
    setIsSyncing(false);
  };

  const updateBike = async (id: string, updates: Partial<Bike>) => {
    setIsSyncing(true);
    try {
      const result = await api.updateBike(id, updates);
      if (result.success && result.bike) {
        setBikes(prev => prev.map(bike => bike.id === id ? result.bike : bike));
      }
    } catch (error) {
      console.error('Error updating bike:', error);
    }
    setIsSyncing(false);
  };

  const deleteBike = async (id: string) => {
    setIsSyncing(true);
    try {
      const result = await api.deleteBike(id);
      if (result.success) {
        setBikes(prev => prev.filter(bike => bike.id !== id));
      }
    } catch (error) {
      console.error('Error deleting bike:', error);
    }
    setIsSyncing(false);
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    setIsSyncing(true);
    try {
      const result = await api.updateSettings(newSettings);
      if (result.success && result.settings) {
        setSettings(result.settings);
      }
    } catch (error) {
      console.error('Error updating settings:', error);
    }
    setIsSyncing(false);
  };

  const refreshData = async () => {
    await loadData();
  };

  return (
    <BikeContext.Provider value={{ bikes, settings, isLoading, isSyncing, addBike, updateBike, deleteBike, updateSettings, refreshData }}>
      {children}
    </BikeContext.Provider>
  );
}

export function useBikes() {
  const context = useContext(BikeContext);
  if (!context) {
    throw new Error('useBikes must be used within a BikeProvider');
  }
  return context;
}
