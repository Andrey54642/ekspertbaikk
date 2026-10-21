import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Bike, SiteSettings } from '../types';
import { isSupabaseConfigured } from '../config/supabase';
import * as supabaseService from '../services/supabaseService';

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
  const [bikes, setBikes] = useState<Bike[]>(defaultBikes);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  // Загрузка данных при старте
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);

    if (isSupabaseConfigured()) {
      // Загрузка из Supabase (общие данные для всех)
      try {
        const [bikesData, settingsData] = await Promise.all([
          supabaseService.fetchBikes(),
          supabaseService.fetchSettings(),
        ]);

        if (bikesData.length > 0) {
          setBikes(bikesData);
        }
        if (settingsData) {
          setSettings(settingsData);
        }
      } catch (error) {
        console.error('Error loading from Supabase:', error);
        // Fallback на localStorage
        loadFromLocalStorage();
      }
    } else {
      // Fallback на localStorage
      loadFromLocalStorage();
    }

    setIsLoading(false);
  };

  const loadFromLocalStorage = () => {
    const savedBikes = localStorage.getItem('expertbikes_bikes');
    const savedSettings = localStorage.getItem('expertbikes_settings');

    if (savedBikes) {
      try {
        setBikes(JSON.parse(savedBikes));
      } catch (e) {
        console.error('Error parsing bikes:', e);
      }
    }

    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Error parsing settings:', e);
      }
    }
  };

  // Сохранение в localStorage как backup
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('expertbikes_bikes', JSON.stringify(bikes));
    }
  }, [bikes, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('expertbikes_settings', JSON.stringify(settings));
    }
  }, [settings, isLoading]);

  const addBike = async (bike: Omit<Bike, 'id'>) => {
    setIsSyncing(true);

    if (isSupabaseConfigured()) {
      const id = await supabaseService.addBikeToSupabase(bike);
      if (id) {
        const newBike: Bike = { ...bike, id };
        setBikes(prev => [...prev, newBike]);
      }
    } else {
      const newBike: Bike = { ...bike, id: Date.now().toString() };
      setBikes(prev => [...prev, newBike]);
    }

    setIsSyncing(false);
  };

  const updateBike = async (id: string, updates: Partial<Bike>) => {
    setIsSyncing(true);

    if (isSupabaseConfigured()) {
      await supabaseService.updateBikeInSupabase(id, updates);
    }

    setBikes(prev => prev.map(bike => bike.id === id ? { ...bike, ...updates } : bike));
    setIsSyncing(false);
  };

  const deleteBike = async (id: string) => {
    setIsSyncing(true);

    if (isSupabaseConfigured()) {
      await supabaseService.deleteBikeFromSupabase(id);
    }

    setBikes(prev => prev.filter(bike => bike.id !== id));
    setIsSyncing(false);
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    setIsSyncing(true);

    if (isSupabaseConfigured()) {
      await supabaseService.updateSettingsInSupabase(newSettings);
    }

    setSettings(prev => ({ ...prev, ...newSettings }));
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
