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
      if (data.settings) setSettings(data.settings);
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
