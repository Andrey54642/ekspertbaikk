# Инструкция по развертыванию на сервере

## 📦 Что нужно загрузить на сервер

1. **Папку `backend/`** - серверная часть
2. **Папку `dist/`** - собранная клиентская часть (после `npm run build`)

## 🚀 Установка на сервере

### Шаг 1: Загрузите файлы на сервер

```bash
# Загрузите папки backend и dist на ваш сервер
scp -r backend/ user@your-server:/path/to/app/
scp -r dist/ user@your-server:/path/to/app/
```

### Шаг 2: Установите зависимости backend

```bash
cd /path/to/app/backend
npm install
```

### Шаг 3: Создайте папку для загрузок

```bash
mkdir -p /path/to/app/backend/uploads
```

### Шаг 4: Запустите сервер

```bash
# Для тестирования
node server.js

# Для продакшена (используйте PM2)
npm install -g pm2
pm2 start server.js --name expert-bike
pm2 save
pm2 startup
```

### Шаг 5: Настройте Nginx (опционально)

Создайте файл `/etc/nginx/sites-available/expert-bike`:

```nginx
server {
    listen 80;
    server_name your-domain.ru;

    # Frontend
    location / {
        root /path/to/app/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Uploads
    location /uploads {
        alias /path/to/app/backend/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

Активируйте сайт:

```bash
sudo ln -s /etc/nginx/sites-available/expert-bike /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 📁 Структура на сервере

```
/path/to/app/
├── backend/
│   ├── server.js          # Серверный код
│   ├── package.json       # Зависимости
│   ├── data.json          # Данные (создается автоматически)
│   └── uploads/           # Загруженные изображения
└── dist/                  # Собранный frontend
    ├── index.html
    └── assets/
```

## 🔧 Управление

### Перезапуск сервера
```bash
pm2 restart expert-bike
```

### Просмотр логов
```bash
pm2 logs expert-bike
```

### Остановка сервера
```bash
pm2 stop expert-bike
```

## 📊 Хранение данных

- **Данные** (велосипеды, настройки): `/path/to/app/backend/data.json`
- **Изображения**: `/path/to/app/backend/uploads/`

Все данные хранятся на вашем сервере!

## 🔒 Безопасность

1. Настройте firewall:
```bash
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

2. Установите SSL сертификат (Let's Encrypt):
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.ru
```

3. Ограничьте доступ к админ-панели через Nginx или измените пароль в `AdminLogin.tsx`

## 🔄 Обновление сайта

1. Соберите новую версию:
```bash
npm run build
```

2. Загрузите `dist/` на сервер:
```bash
scp -r dist/* user@your-server:/path/to/app/dist/
```

3. Данные и изображения останутся на месте!

## 💡 Примечания

- Сервер работает на порту 3001 (можно изменить в `server.js`)
- Максимальный размер загружаемого файла: 10MB
- Поддерживаемые форматы: JPEG, PNG, GIF, WebP
- Данные хранятся в JSON файле на сервере
- Изображения хранятся в папке `uploads/`
