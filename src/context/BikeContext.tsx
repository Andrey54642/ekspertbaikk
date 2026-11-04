import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Bike, SiteSettings } from '../types';
import * as api from '../services/apiService';

interface BikeContextType {
  bikes: Bike[];
  settings: SiteSettings;
  isLoading: boolean;
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
  telegramChannel: 'expertbike',
  yandexMetrikaId: '',
  mapLat: 45.035470,
  mapLng: 38.975310,
  mapZoom: 16,
};

const BikeContext = createContext<BikeContextType | undefined>(undefined);

export function BikeProvider({ children }: { children: ReactNode }) {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await api.fetchAllData();
      if (data.bikes) setBikes(data.bikes);
      if (data.settings) setSettings({ ...defaultSettings, ...data.settings });
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setIsLoading(false);
  };

  const addBike = async (bike: Omit<Bike, 'id'>) => {
    const result = await api.addBike(bike);
    if (result.success) setBikes(prev => [...prev, result.bike]);
  };

  const updateBike = async (id: string, updates: Partial<Bike>) => {
    const result = await api.updateBike(id, updates);
    if (result.success) {
      setBikes(prev => prev.map(b => b.id === id ? result.bike : b));
    }
  };

  const deleteBike = async (id: string) => {
    const result = await api.deleteBike(id);
    if (result.success) {
      setBikes(prev => prev.filter(b => b.id !== id));
    }
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const result = await api.updateSettings(newSettings);
    if (result.success) setSettings(result.settings);
  };

  const refreshData = async () => {
    await loadData();
  };

  return (
    <BikeContext.Provider value={{ bikes, settings, isLoading, addBike, updateBike, deleteBike, updateSettings, refreshData }}>
      {children}
    </BikeContext.Provider>
  );
}

export function useBikes() {
  const context = useContext(BikeContext);
  if (!context) throw new Error('useBikes must be used within BikeProvider');
  return context;
}
