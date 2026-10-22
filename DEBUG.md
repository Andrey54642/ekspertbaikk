# 🔧 Отладка загрузки изображений

## Проверка работы системы

### 1. Запустите тестовый скрипт

```bash
node test-api.js
```

Этот скрипт проверит:
- ✅ Подключение к backend
- ✅ Получение данных
- ✅ Добавление/удаление велосипедов

### 2. Проверьте что backend запущен

```bash
cd backend
npm start
```

Должно появиться:
```
✅ Сервер запущен на http://localhost:3001
📁 Файлы хранятся в: /path/to/backend/uploads
📄 Данные хранятся в: /path/to/backend/data.json
```

### 3. Проверьте frontend

```bash
npm run dev
```

Frontend должен запуститься на `http://localhost:5173`

## Частые проблемы и решения

### Проблема: "Не удалось подключиться к серверу"

**Причина:** Backend не запущен

**Решение:**
```bash
cd backend
npm start
```

### Проблема: "Ошибка загрузки изображения"

**Причина 1:** Backend не принимает файлы

**Решение:**
1. Проверьте логи backend в терминале
2. Убедитесь что папка `backend/uploads/` существует:
   ```bash
   mkdir -p backend/uploads
   chmod 755 backend/uploads
   ```

**Причина 2:** CORS проблемы

**Решение:**
Backend уже настроен с CORS, но проверьте что frontend обращается к правильному URL:
- В разработке: `http://localhost:3001`
- В продакшене: тот же домен (nginx проксирует)

**Причина 3:** Файл слишком большой

**Решение:**
Максимальный размер файла: 10MB
Измените в `backend/server.js`:
```javascript
limits: { fileSize: 10 * 1024 * 1024 } // 10MB
```

**Причина 4:** Неподдерживаемый формат файла

**Решение:**
Поддерживаемые форматы: JPEG, PNG, GIF, WebP
Измените в `backend/server.js`:
```javascript
const allowedTypes = /jpeg|jpg|png|gif|webp/;
```

### Проблема: Изображение загружено, но не отображается

**Причина 1:** Неправильный путь к изображению

**Решение:**
Проверьте что изображение доступно по URL:
```
http://localhost:3001/uploads/filename.jpg
```

**Причина 2:** Папка uploads не доступна

**Решение:**
Проверьте права доступа:
```bash
chmod 755 backend/uploads
chmod 644 backend/uploads/*
```

### Проблема: Велосипеды не добавляются

**Причина 1:** Backend не запущен

**Решение:**
```bash
cd backend
npm start
```

**Причина 2:** Ошибка в data.json

**Решение:**
Проверьте что `backend/data.json` имеет правильную структуру:
```json
{
  "bikes": [],
  "settings": {
    "phone": "+7 (900) 123-45-67",
    "address": "г. Краснодар, ул. Снесарева, 3",
    "workHours": "Ежедневно с 9:00 до 21:00",
    "whatsapp": "79001234567",
    "telegram": "",
    "instagram": "",
    "vk": "",
    "youtube": "",
    "customSocials": [],
    "yandexMetrikaId": "",
    "mapLat": 45.035470,
    "mapLng": 38.975310,
    "mapZoom": 16
  }
}
```

## Проверка через браузер

### 1. Откройте консоль браузера (F12)

### 2. Перейдите на вкладку Network

### 3. Попробуйте загрузить изображение

### 4. Проверьте запрос:
- **URL:** должен быть `http://localhost:3001/api/upload`
- **Method:** POST
- **Status:** 200 OK
- **Response:** `{ success: true, url: "/uploads/xxx.jpg" }`

### 5. Если ошибка:
- **Status 400:** Проблема с файлом (размер, формат)
- **Status 500:** Ошибка на сервере (смотрите логи backend)
- **Network Error:** Backend не запущен или CORS проблема

## Проверка через curl

### Тест загрузки изображения:

```bash
curl -X POST http://localhost:3001/api/upload \
  -F "image=@/path/to/image.jpg"
```

Ожидаемый ответ:
```json
{
  "success": true,
  "url": "/uploads/1234567890-image.jpg",
  "filename": "1234567890-image.jpg"
}
```

### Тест добавления велосипеда:

```bash
curl -X POST http://localhost:3001/api/bikes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Тест",
    "description": "Описание",
    "pricePerWeek": 1000,
    "deposit": 500,
    "image": "",
    "features": ["Функция 1"],
    "badge": "ТЕСТ",
    "badgeColor": "green",
    "accentColor": "green"
  }'
```

## Логи backend

Запустите backend с дополнительным логированием:

```bash
cd backend
DEBUG=* npm start
```

Или добавьте логирование в `backend/server.js`:

```javascript
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});
```

## Проверка файловой системы

### Проверьте что файлы созданы:

```bash
ls -la backend/uploads/
```

### Проверьте права доступа:

```bash
ls -la backend/
```

Должно быть:
```
drwxr-xr-x  uploads/
-rw-r--r--  data.json
```

### Исправьте права если нужно:

```bash
chmod 755 backend/uploads
chmod 644 backend/data.json
```

## Перезапуск всего

Если ничего не помогает, перезапустите всё:

```bash
# Остановите все процессы
pkill -f "node.*backend"
pkill -f "vite"

# Очистите кэш
rm -rf node_modules/.vite
rm -rf backend/uploads/*

# Перезапустите backend
cd backend
npm start

# В другом терминале перезапустите frontend
npm run dev
```

## Поддержка

Если проблема не решена:

1. Проверьте версию Node.js: `node --version` (должна быть 14+)
2. Проверьте версию npm: `npm --version`
3. Переустановите зависимости:
   ```bash
   rm -rf node_modules
   npm install
   cd backend
   rm -rf node_modules
   npm install
   ```

4. Проверьте что все файлы на месте:
   ```bash
   ls -la backend/
   # Должны быть: server.js, package.json, data.json, uploads/
   ```
