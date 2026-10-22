const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Статические файлы
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../dist')));

// Папки для хранения
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const DATA_FILE = path.join(__dirname, 'data.json');

// Создаем папку uploads если её нет
fs.ensureDirSync(UPLOADS_DIR);

// Инициализация data.json если его нет
if (!fs.existsSync(DATA_FILE)) {
  fs.writeJsonSync(DATA_FILE, {
    bikes: [],
    settings: {
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
      mapZoom: 16
    }
  });
}

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Только изображения разрешены!'));
    }
  }
});

// ========== API ENDPOINTS ==========

// Получить все данные
app.get('/api/data', (req, res) => {
  try {
    const data = fs.readJsonSync(DATA_FILE);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка чтения данных' });
  }
});

// Получить велосипеды
app.get('/api/bikes', (req, res) => {
  try {
    const data = fs.readJsonSync(DATA_FILE);
    res.json(data.bikes || []);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка чтения велосипедов' });
  }
});

// Получить настройки
app.get('/api/settings', (req, res) => {
  try {
    const data = fs.readJsonSync(DATA_FILE);
    res.json(data.settings || {});
  } catch (error) {
    res.status(500).json({ error: 'Ошибка чтения настроек' });
  }
});

// Загрузить изображение
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Файл не загружен' });
    }
    
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ 
      success: true, 
      url: imageUrl,
      filename: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка загрузки файла' });
  }
});

// Добавить велосипед
app.post('/api/bikes', (req, res) => {
  try {
    const data = fs.readJsonSync(DATA_FILE);
    const newBike = {
      ...req.body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    data.bikes.push(newBike);
    fs.writeJsonSync(DATA_FILE, data);
    
    res.json({ success: true, bike: newBike });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка добавления велосипеда' });
  }
});

// Обновить велосипед
app.put('/api/bikes/:id', (req, res) => {
  try {
    const data = fs.readJsonSync(DATA_FILE);
    const bikeIndex = data.bikes.findIndex(b => b.id === req.params.id);
    
    if (bikeIndex === -1) {
      return res.status(404).json({ error: 'Велосипед не найден' });
    }
    
    data.bikes[bikeIndex] = {
      ...data.bikes[bikeIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    fs.writeJsonSync(DATA_FILE, data);
    res.json({ success: true, bike: data.bikes[bikeIndex] });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления велосипеда' });
  }
});

// Удалить велосипед
app.delete('/api/bikes/:id', (req, res) => {
  try {
    const data = fs.readJsonSync(DATA_FILE);
    const bikeIndex = data.bikes.findIndex(b => b.id === req.params.id);
    
    if (bikeIndex === -1) {
      return res.status(404).json({ error: 'Велосипед не найден' });
    }
    
    // Удаляем изображение если есть
    const bike = data.bikes[bikeIndex];
    if (bike.image && bike.image.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, bike.image);
      if (fs.existsSync(imagePath)) {
        fs.removeSync(imagePath);
      }
    }
    
    data.bikes.splice(bikeIndex, 1);
    fs.writeJsonSync(DATA_FILE, data);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка удаления велосипеда' });
  }
});

// Обновить настройки
app.put('/api/settings', (req, res) => {
  try {
    const data = fs.readJsonSync(DATA_FILE);
    
    // Маппинг полей для обратной совместимости
    const settingsUpdate = {
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    // Если приходят новые поля, добавляем их
    if (req.body.customSocials !== undefined) {
      settingsUpdate.customSocials = req.body.customSocials;
    }
    if (req.body.yandexMetrikaId !== undefined) {
      settingsUpdate.yandexMetrikaId = req.body.yandexMetrikaId;
    }
    if (req.body.mapLat !== undefined) {
      settingsUpdate.mapLat = req.body.mapLat;
    }
    if (req.body.mapLng !== undefined) {
      settingsUpdate.mapLng = req.body.mapLng;
    }
    if (req.body.mapZoom !== undefined) {
      settingsUpdate.mapZoom = req.body.mapZoom;
    }
    
    data.settings = {
      ...data.settings,
      ...settingsUpdate
    };
    
    fs.writeJsonSync(DATA_FILE, data);
    res.json({ success: true, settings: data.settings });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления настроек' });
  }
});

// Удалить изображение
app.delete('/api/upload/:filename', (req, res) => {
  try {
    const imagePath = path.join(UPLOADS_DIR, req.params.filename);
    
    if (fs.existsSync(imagePath)) {
      fs.removeSync(imagePath);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Файл не найден' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ошибка удаления файла' });
  }
});

// SPA fallback - для React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Обработка ошибок multer
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'Файл слишком большой (макс. 10MB)' });
    }
  }
  res.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
  console.log(`📁 Файлы хранятся в: ${UPLOADS_DIR}`);
  console.log(`📄 Данные хранятся в: ${DATA_FILE}`);
});
