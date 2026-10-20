const DB_NAME = 'ExpertBikeDB';
const DB_VERSION = 1;
const STORE_NAME = 'images';

/**
 * Инициализация IndexedDB
 */
function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
}

/**
 * Сохранение изображения в IndexedDB
 * @param key - уникальный ключ (например, id велосипеда)
 * @param base64Image - изображение в формате base64
 */
export async function saveImage(key: string, base64Image: string): Promise<string> {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(base64Image, key);

    request.onsuccess = () => resolve(`indexeddb://${key}`);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Получение изображения из IndexedDB
 * @param key - ключ изображения
 */
export async function getImage(key: string): Promise<string | null> {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(key);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Удаление изображения из IndexedDB
 * @param key - ключ изображения
 */
export async function deleteImage(key: string): Promise<void> {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(key);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

/**
 * Проверка, является ли URL локальным (indexeddb://)
 */
export function isLocalImage(url: string): boolean {
  return url.startsWith('indexeddb://');
}

/**
 * Извлечение ключа из локального URL
 */
export function getKeyFromUrl(url: string): string {
  return url.replace('indexeddb://', '');
}

/**
 * Получение URL изображения (для локальных загружает из IndexedDB)
 */
export async function resolveImageUrl(url: string): Promise<string> {
  if (isLocalImage(url)) {
    const key = getKeyFromUrl(url);
    const imageData = await getImage(key);
    return imageData || '';
  }
  return url;
}
