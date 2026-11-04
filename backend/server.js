const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../dist')));

const UPLOADS_DIR = path.join(__dirname, 'uploads');
const DATA_FILE = path.join(__dirname, 'data.json');

fs.ensureDirSync(UPLOADS_DIR);

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
      telegramChannel: 'expertbike',
      yandexMetrikaId: '',
      mapLat: 45.035470,
      mapLng: 38.975310,
      mapZoom: 16,
    }
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb(new Error('Только изображения разрешены!'));
  }
});

app.get('/api/data', (req, res) => {
  try {
    const data = fs.readJsonSync(DATA_FILE);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка чтения данных' });
  }
});

app.post('/api/upload', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'Файл не загружен' });
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ success: true, url: imageUrl });
  });
});

app.post('/api/bikes', (req, res) => {
  try {
    const data = fs.readJsonSync(DATA_FILE);
    const newBike = { ...req.body, id: Date.now().toString() };
    data.bikes.push(newBike);
    fs.writeJsonSync(DATA_FILE, data);
    res.json({ success: true, bike: newBike });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка добавления' });
  }
});

app.put('/api/bikes/:id', (req, res) => {
  try {
    const data = fs.readJsonSync(DATA_FILE);
    const index = data.bikes.findIndex(b => b.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Не найдено' });
    data.bikes[index] = { ...data.bikes[index], ...req.body };
    fs.writeJsonSync(DATA_FILE, data);
    res.json({ success: true, bike: data.bikes[index] });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления' });
  }
});

app.delete('/api/bikes/:id', (req, res) => {
  try {
    const data = fs.readJsonSync(DATA_FILE);
    data.bikes = data.bikes.filter(b => b.id !== req.params.id);
    fs.writeJsonSync(DATA_FILE, data);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка удаления' });
  }
});

app.put('/api/settings', (req, res) => {
  try {
    const data = fs.readJsonSync(DATA_FILE);
    data.settings = { ...data.settings, ...req.body };
    fs.writeJsonSync(DATA_FILE, data);
    res.json({ success: true, settings: data.settings });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления настроек' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});
