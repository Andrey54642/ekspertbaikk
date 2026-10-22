import { supabase } from '../config/supabase';
import { Bike, SiteSettings } from '../types';

export async function fetchBikes(): Promise<Bike[]> {
  if (!supabase) return [];
  
  const { data, error } = await supabase
    .from('bikes')
    .select('*')
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Error fetching bikes:', error);
    return [];
  }
  
  return (data || []).map((row: any) => ({
    id: row.id,
    name: row.name,
    description: row.description || '',
    pricePerWeek: row.price_per_week,
    deposit: row.deposit,
    image: row.image || '',
    features: row.features || [],
    badge: row.badge || '',
    badgeColor: row.badge_color || 'green',
    accentColor: row.accent_color || 'green',
  }));
}

export async function fetchSettings(): Promise<SiteSettings | null> {
  if (!supabase) return null;
  
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('id', 1)
    .single();
  
  if (error) {
    console.error('Error fetching settings:', error);
    return null;
  }
  
  return {
    phone: data.phone,
    address: data.address,
    workHours: data.work_hours,
    whatsapp: data.whatsapp,
    telegram: data.telegram || '',
    instagram: data.instagram || '',
    vk: data.vk || '',
    youtube: data.youtube || '',
    customSocials: data.custom_socials || [],
    yandexMetrikaId: data.yandex_metrika_id || '',
    mapLat: data.map_lat || 45.035470,
    mapLng: data.map_lng || 38.975310,
    mapZoom: data.map_zoom || 16,
  };
}

export async function addBikeToSupabase(bike: Omit<Bike, 'id'>): Promise<string | null> {
  if (!supabase) return null;
  
  const id = Date.now().toString();
  const { error } = await supabase.from('bikes').insert({
    id,
    name: bike.name,
    description: bike.description,
    price_per_week: bike.pricePerWeek,
    deposit: bike.deposit,
    image: bike.image,
    features: bike.features,
    badge: bike.badge,
    badge_color: bike.badgeColor,
    accent_color: bike.accentColor,
  });
  
  if (error) {
    console.error('Error adding bike:', error);
    return null;
  }
  
  return id;
}

export async function updateBikeInSupabase(id: string, updates: Partial<Bike>): Promise<boolean> {
  if (!supabase) return false;
  
  const dbUpdates: any = {};
  if (updates.name !== undefined) dbUpdates.name = updates.name;
  if (updates.description !== undefined) dbUpdates.description = updates.description;
  if (updates.pricePerWeek !== undefined) dbUpdates.price_per_week = updates.pricePerWeek;
  if (updates.deposit !== undefined) dbUpdates.deposit = updates.deposit;
  if (updates.image !== undefined) dbUpdates.image = updates.image;
  if (updates.features !== undefined) dbUpdates.features = updates.features;
  if (updates.badge !== undefined) dbUpdates.badge = updates.badge;
  if (updates.badgeColor !== undefined) dbUpdates.badge_color = updates.badgeColor;
  if (updates.accentColor !== undefined) dbUpdates.accent_color = updates.accentColor;
  
  const { error } = await supabase
    .from('bikes')
    .update(dbUpdates)
    .eq('id', id);
  
  if (error) {
    console.error('Error updating bike:', error);
    return false;
  }
  
  return true;
}

export async function deleteBikeFromSupabase(id: string): Promise<boolean> {
  if (!supabase) return false;
  
  const { error } = await supabase
    .from('bikes')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting bike:', error);
    return false;
  }
  
  return true;
}

export async function updateSettingsInSupabase(settings: Partial<SiteSettings>): Promise<boolean> {
  if (!supabase) return false;
  
  const dbUpdates: any = {};
  if (settings.phone !== undefined) dbUpdates.phone = settings.phone;
  if (settings.address !== undefined) dbUpdates.address = settings.address;
  if (settings.workHours !== undefined) dbUpdates.work_hours = settings.workHours;
  if (settings.whatsapp !== undefined) dbUpdates.whatsapp = settings.whatsapp;
  if (settings.telegram !== undefined) dbUpdates.telegram = settings.telegram;
  if (settings.instagram !== undefined) dbUpdates.instagram = settings.instagram;
  if (settings.vk !== undefined) dbUpdates.vk = settings.vk;
  if (settings.youtube !== undefined) dbUpdates.youtube = settings.youtube;
  
  const { error } = await supabase
    .from('settings')
    .update(dbUpdates)
    .eq('id', 1);
  
  if (error) {
    console.error('Error updating settings:', error);
    return false;
  }
  
  return true;
}

export async function uploadImageToSupabase(file: File, bikeId: string): Promise<string | null> {
  if (!supabase) return null;
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${bikeId}_${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;
  
  const { error: uploadError } = await supabase.storage
    .from('bike-images')
    .upload(filePath, file);
  
  if (uploadError) {
    console.error('Error uploading image:', uploadError);
    return null;
  }
  
  const { data } = supabase.storage
    .from('bike-images')
    .getPublicUrl(filePath);
  
  return data.publicUrl;
}

export async function deleteImageFromSupabase(imageUrl: string): Promise<boolean> {
  if (!supabase) return false;
  
  const urlParts = imageUrl.split('/storage/v1/object/public/bike-images/');
  if (urlParts.length < 2) return false;
  
  const filePath = urlParts[1];
  
  const { error } = await supabase.storage
    .from('bike-images')
    .remove([filePath]);
  
  if (error) {
    console.error('Error deleting image:', error);
    return false;
  }
  
  return true;
}
