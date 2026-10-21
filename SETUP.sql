-- ============================================
-- SQL ДЛЯ НАСТРОЙКИ БАЗЫ ДАННЫХ SUPABASE
-- Выполните этот SQL в SQL Editor вашего проекта Supabase
-- ============================================

-- Таблица электровелосипедов
CREATE TABLE bikes (
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

-- Таблица настроек сайта
CREATE TABLE settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  phone TEXT DEFAULT '+7 (900) 123-45-67',
  address TEXT DEFAULT 'г. Краснодар, ул. Снесарева, 3',
  work_hours TEXT DEFAULT 'Ежедневно с 9:00 до 21:00',
  whatsapp TEXT DEFAULT '79001234567',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Вставляем начальные настройки
INSERT INTO settings (id, phone, address, work_hours, whatsapp)
VALUES (1, '+7 (900) 123-45-67', 'г. Краснодар, ул. Снесарева, 3', 'Ежедневно с 9:00 до 21:00', '79001234567');

-- Вставляем начальные велосипеды
INSERT INTO bikes (id, name, description, price_per_week, deposit, features, badge, badge_color, accent_color)
VALUES 
  ('1', 'Майкалин U5', 'Мощный электровелосипед с увеличенным запасом хода. Идеален для длительных поездок по городу.', 4500, 1500, ARRAY['Мощный электродвигатель', 'Увеличенный запас хода', 'Комфортная посадка', 'Светодиодная фара'], 'ХИТ', 'green', 'green'),
  ('2', 'Kugo U5', 'Компактный и манёвренный электровелосипед. Отличный выбор для городских поездок.', 4000, 1500, ARRAY['Лёгкий и компактный', 'Быстрая зарядка', 'Складная конструкция', 'Дисковые тормоза'], 'ВЫГОДНО', 'cyan', 'cyan');

-- Разрешаем публичный доступ для чтения (для всех посетителей сайта)
ALTER TABLE bikes ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Политика чтения для всех
CREATE POLICY "Enable read access for all users" ON bikes FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON settings FOR SELECT USING (true);

-- Политика записи для всех (для админ-панели)
-- В продакшене лучше использовать аутентификацию Supabase
CREATE POLICY "Enable insert for all users" ON bikes FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON bikes FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON bikes FOR DELETE USING (true);
CREATE POLICY "Enable update for all users" ON settings FOR UPDATE USING (true);

-- Функция для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_bikes_updated_at
  BEFORE UPDATE ON bikes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Создание бакета для хранения изображений
INSERT INTO storage.buckets (id, name, public)
VALUES ('bike-images', 'bike-images', true);

-- Политика доступа к изображениям
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'bike-images');
CREATE POLICY "Enable insert for all users" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'bike-images');
CREATE POLICY "Enable delete for all users" ON storage.objects FOR DELETE USING (bucket_id = 'bike-images');
