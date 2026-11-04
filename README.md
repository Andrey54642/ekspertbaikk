# Эксперт Байк - Сайт аренды электровелосипедов

Сайт для аренды и ремонта электровелосипедов в Краснодаре с админ-панелью.

## 🚀 Возможности

- ✅ Каталог электровелосипедов с ценами
- ✅ Админ-панель для управления контентом
- ✅ Загрузка фотографий на сервер
- ✅ Настройка контактов и соцсетей
- ✅ Настройка Яндекс.Карты
- ✅ Интеграция с Яндекс.Метрикой
- ✅ Адаптивный дизайн

## 🔐 Доступ к админ-панели

- URL: `ваш-сайт/#/admin`
- Пароль: `admin`

## 📦 Установка

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm start
```

Backend запустится на порту 3001.

## 🛠️ Технологии

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- Node.js + Express (backend)
- Multer (загрузка файлов)

## 📁 Структура проекта

```
├── src/
│   ├── components/       # React компоненты
│   ├── context/          # Контекст для данных
│   ├── pages/            # Страницы сайта
│   ├── services/         # API сервисы
│   ├── types.ts          # TypeScript типы
│   ├── App.tsx           # Главный компонент
│   └── main.tsx          # Точка входа
├── backend/
│   ├── server.js         # Express сервер
│   ├── uploads/          # Загруженные изображения
│   └── data.json         # Данные (создаётся автоматически)
└── public/               # Статические файлы
```

## 🚀 Запуск

1. Установите зависимости:
   ```bash
   npm install
   cd backend && npm install && cd ..
   ```

2. Запустите backend:
   ```bash
   cd backend
   npm start
   ```

3. Запустите frontend (в другом терминале):
   ```bash
   npm run dev
   ```

4. Откройте http://localhost:5173

## 📝 Лицензия

MIT
