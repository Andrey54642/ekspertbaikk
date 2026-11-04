const API_URL = import.meta.env.PROD ? '' : 'http://localhost:3001';

export async function fetchAllData() {
  const response = await fetch(`${API_URL}/api/data`);
  if (!response.ok) throw new Error('Ошибка загрузки данных');
  return response.json();
}

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('image', file);
  const response = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Ошибка загрузки изображения');
  return response.json();
}

export async function addBike(bike: any) {
  const response = await fetch(`${API_URL}/api/bikes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bike),
  });
  if (!response.ok) throw new Error('Ошибка добавления');
  return response.json();
}

export async function updateBike(id: string, updates: any) {
  const response = await fetch(`${API_URL}/api/bikes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error('Ошибка обновления');
  return response.json();
}

export async function deleteBike(id: string) {
  const response = await fetch(`${API_URL}/api/bikes/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Ошибка удаления');
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

export function getImageUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_URL}${path}`;
}
