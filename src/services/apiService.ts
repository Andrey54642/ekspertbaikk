// API URL - измените на адрес вашего сервера
// В разработке используем localhost:3001
// В продакшене используем тот же домен (nginx проксирует /api на backend)
const API_URL = import.meta.env.DEV 
  ? 'http://localhost:3001'
  : '';

// ========== API запросы ==========

export async function fetchAllData() {
  const response = await fetch(`${API_URL}/api/data`);
  if (!response.ok) throw new Error('Ошибка загрузки данных');
  return response.json();
}

export async function fetchBikes() {
  const response = await fetch(`${API_URL}/api/bikes`);
  if (!response.ok) throw new Error('Ошибка загрузки велосипедов');
  return response.json();
}

export async function fetchSettings() {
  const response = await fetch(`${API_URL}/api/settings`);
  if (!response.ok) throw new Error('Ошибка загрузки настроек');
  return response.json();
}

export async function uploadImage(file: File): Promise<{ success: boolean; url: string }> {
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    const response = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Неизвестная ошибка' }));
      throw new Error(errorData.error || `Ошибка сервера: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Не удалось подключиться к серверу. Убедитесь, что backend запущен на порту 3001');
    }
    throw error;
  }
}

export async function deleteImage(filename: string): Promise<{ success: boolean }> {
  const response = await fetch(`${API_URL}/api/upload/${filename}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) throw new Error('Ошибка удаления изображения');
  return response.json();
}

export async function addBike(bike: any) {
  const response = await fetch(`${API_URL}/api/bikes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bike),
  });
  
  if (!response.ok) throw new Error('Ошибка добавления велосипеда');
  return response.json();
}

export async function updateBike(id: string, updates: any) {
  const response = await fetch(`${API_URL}/api/bikes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  
  if (!response.ok) throw new Error('Ошибка обновления велосипеда');
  return response.json();
}

export async function deleteBike(id: string) {
  const response = await fetch(`${API_URL}/api/bikes/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) throw new Error('Ошибка удаления велосипеда');
  return response.json();
}

export async function updateSettings(settings: any) {
  const response = await fetch(`${API_URL}/api/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  });
  
  if (!response.ok) throw new Error('Ошибка обновления настроек');
  return response.json();
}

// Получить полный URL изображения
export function getImageUrl(imagePath: string): string {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_URL}${imagePath}`;
}
