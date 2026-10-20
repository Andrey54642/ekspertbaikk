import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Bike, SiteSettings } from '../types';

interface BikeContextType {
  bikes: Bike[];
  settings: SiteSettings;
  addBike: (bike: Omit<Bike, 'id'>) => void;
  updateBike: (id: string, bike: Partial<Bike>) => void;
  deleteBike: (id: string) => void;
  updateSettings: (settings: Partial<SiteSettings>) => void;
}

const defaultBikes: Bike[] = [
  {
    id: '1',
    name: 'Майкалин U5',
    description: 'Мощный электровелосипед с увеличенным запасом хода. Идеален для длительных поездок по городу.',
    pricePerWeek: 4500,
    deposit: 1500,
    image: '',
    features: ['Мощный электродвигатель', 'Увеличенный запас хода', 'Комфортная посадка', 'Светодиодная фара'],
    badge: 'ХИТ',
    badgeColor: 'green',
    accentColor: 'green',
  },
  {
    id: '2',
    name: 'Kugo U5',
    description: 'Компактный и манёвренный электровелосипед. Отличный выбор для городских поездок.',
    pricePerWeek: 4000,
    deposit: 1500,
    image: '',
    features: ['Лёгкий и компактный', 'Быстрая зарядка', 'Складная конструкция', 'Дисковые тормоза'],
    badge: 'ВЫГОДНО',
    badgeColor: 'cyan',
    accentColor: 'cyan',
  },
];

const defaultSettings: SiteSettings = {
  phone: '+7 (900) 123-45-67',
  address: 'г. Краснодар, ул. Снесарева, 3',
  workHours: 'Ежедневно с 9:00 до 21:00',
  whatsapp: '79001234567',
};

const BikeContext = createContext<BikeContextType | undefined>(undefined);

export function BikeProvider({ children }: { children: ReactNode }) {
  const [bikes, setBikes] = useState<Bike[]>(() => {
    const saved = localStorage.getItem('expertbikes_bikes');
    return saved ? JSON.parse(saved) : defaultBikes;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('expertbikes_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('expertbikes_bikes', JSON.stringify(bikes));
  }, [bikes]);

  useEffect(() => {
    localStorage.setItem('expertbikes_settings', JSON.stringify(settings));
  }, [settings]);

  const addBike = (bike: Omit<Bike, 'id'>) => {
    const newBike: Bike = { ...bike, id: Date.now().toString() };
    setBikes(prev => [...prev, newBike]);
  };

  const updateBike = (id: string, updates: Partial<Bike>) => {
    setBikes(prev => prev.map(bike => bike.id === id ? { ...bike, ...updates } : bike));
  };

  const deleteBike = (id: string) => {
    setBikes(prev => prev.filter(bike => bike.id !== id));
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <BikeContext.Provider value={{ bikes, settings, addBike, updateBike, deleteBike, updateSettings }}>
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
