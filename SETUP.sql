-- SQL для настройки базы данных Supabase
-- Выполните этот SQL в SQL Editor вашего проекта Supabase

-- Таблица велосипедов
CREATE TABLE IF NOT EXISTS bikes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price_per_week INTEGER NOT NULL,
  deposit INTEGER NOT NULL,
  image TEXT,
  features TEXT[] DEFAULT '{}',
  badge TEXT,
  badge_color TEXT DEFAULT 'green',
  accent_color TEXT DEFAULT 'green',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица настроек
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  phone TEXT DEFAULT '+7 (900) 123-45-67',
  address TEXT DEFAULT 'г. Краснодар, ул. Снесарева, 3',
  work_hours TEXT DEFAULT 'Ежедневно с 9:00 до 21:00',
  whatsapp TEXT DEFAULT '79001234567',
  telegram TEXT DEFAULT '',
  instagram TEXT DEFAULT '',
  vk TEXT DEFAULT '',
  youtube TEXT DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Вставка начальных настроек
INSERT INTO settings (id, phone, address, work_hours, whatsapp, telegram, instagram, vk, youtube)
VALUES (1, '+7 (900) 123-45-67', 'г. Краснодар, ул. Снесарева, 3', 'Ежедневно с 9:00 до 21:00', '79001234567', '', '', '', '')
ON CONFLICT (id) DO NOTHING;

-- Вставка начальных велосипедов
INSERT INTO bikes (id, name, description, price_per_week, deposit, features, badge, badge_color, accent_color)
VALUES 
  ('1', 'Майкалин U5', 'Мощный электровелосипед с увеличенным запасом хода. Идеален для длительных поездок по городу.', 4500, 1500, ARRAY['Мощный электродвигатель', 'Увеличенный запас хода', 'Комфортная посадка', 'Светодиодная фара'], 'ХИТ', 'green', 'green'),
  ('2', 'Kugo U5', 'Компактный и манёвренный электровелосипед. Отличный выбор для городских поездок.', 4000, 1500, ARRAY['Лёгкий и компактный', 'Быстрая зарядка', 'Складная конструкция', 'Дисковые тормоза'], 'ВЫГОДНО', 'cyan', 'cyan')
ON CONFLICT (id) DO NOTHING;

-- Включение RLS
ALTER TABLE bikes ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Политики для bikes
DROP POLICY IF EXISTS "Enable read access for all users" ON bikes;
CREATE POLICY "Enable read access for all users" ON bikes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for all users" ON bikes;
CREATE POLICY "Enable insert for all users" ON bikes FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for all users" ON bikes;
CREATE POLICY "Enable update for all users" ON bikes FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Enable delete for all users" ON bikes;
CREATE POLICY "Enable delete for all users" ON bikes FOR DELETE USING (true);

-- Политики для settings
DROP POLICY IF EXISTS "Enable read access for all users" ON settings;
CREATE POLICY "Enable read access for all users" ON settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable update for all users" ON settings;
CREATE POLICY "Enable update for all users" ON settings FOR UPDATE USING (true);

-- Функция для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггеры для bikes
DROP TRIGGER IF EXISTS update_bikes_updated_at ON bikes;
CREATE TRIGGER update_bikes_updated_at
  BEFORE UPDATE ON bikes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Триггеры для settings
DROP TRIGGER IF EXISTS update_settings_updated_at ON settings;
CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Создание бакета для хранения изображений
INSERT INTO storage.buckets (id, name, public)
VALUES ('bike-images', 'bike-images', true)
ON CONFLICT (id) DO NOTHING;

-- Политики для storage
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'bike-images');

DROP POLICY IF EXISTS "Enable insert for all users" ON storage.objects;
CREATE POLICY "Enable insert for all users" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'bike-images');

DROP POLICY IF EXISTS "Enable delete for all users" ON storage.objects;
CREATE POLICY "Enable delete for all users" ON storage.objects FOR DELETE USING (bucket_id = 'bike-images');
