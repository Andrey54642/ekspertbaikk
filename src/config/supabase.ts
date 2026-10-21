import { createClient } from '@supabase/supabase-js';

// ============================================
// ИНСТРУКЦИЯ ПО НАСТРОЙКЕ SUPABASE:
// ============================================
// 1. Зарегистрируйтесь на https://supabase.com (бесплатно)
// 2. Создайте новый проект
// 3. Перейдите в Settings → API и скопируйте:
//    - Project URL (например: https://xxxxx.supabase.co)
//    - anon/public ключ
// 4. Вставьте их ниже
// 5. Выполните SQL из файла SETUP.sql в SQL Editor Supabase
// ============================================

export const SUPABASE_URL = ''; // Вставьте Project URL
export const SUPABASE_ANON_KEY = ''; // Вставьте anon/public ключ

export const isSupabaseConfigured = () => {
  return !!SUPABASE_URL && !!SUPABASE_ANON_KEY;
};

export const supabase = isSupabaseConfigured()
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
