#!/usr/bin/env node

/**
 * Тестовый скрипт для проверки работы backend API
 * Запуск: node test-api.js
 */

const API_URL = 'http://localhost:3001';

async function testAPI() {
  console.log('🧪 Тестирование backend API...\n');

  // Тест 1: Проверка подключения
  console.log('1️⃣ Проверка подключения к серверу...');
  try {
    const response = await fetch(`${API_URL}/api/data`);
    if (response.ok) {
      console.log('✅ Сервер доступен\n');
    } else {
      console.log(`❌ Ошибка: ${response.status} ${response.statusText}\n`);
      return;
    }
  } catch (error) {
    console.log('❌ Не удалось подключиться к серверу');
    console.log('💡 Убедитесь что backend запущен: cd backend && npm start\n');
    return;
  }

  // Тест 2: Получение данных
  console.log('2️⃣ Получение данных...');
  try {
    const response = await fetch(`${API_URL}/api/data`);
    const data = await response.json();
    console.log(`✅ Получено: ${data.bikes?.length || 0} велосипедов`);
    console.log(`✅ Настройки: ${data.settings ? 'загружены' : 'отсутствуют'}\n`);
  } catch (error) {
    console.log(`❌ Ошибка: ${error.message}\n`);
  }

  // Тест 3: Добавление тестового велосипеда
  console.log('3️⃣ Добавление тестового велосипеда...');
  try {
    const testBike = {
      name: 'Тестовый велосипед',
      description: 'Описание тестового велосипеда',
      pricePerWeek: 1000,
      deposit: 500,
      image: '',
      features: ['Тестовая функция 1', 'Тестовая функция 2'],
      badge: 'ТЕСТ',
      badgeColor: 'green',
      accentColor: 'green'
    };

    const response = await fetch(`${API_URL}/api/bikes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testBike)
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Велосипед добавлен с ID: ${result.bike?.id}\n`);

      // Тест 4: Удаление тестового велосипеда
      console.log('4️⃣ Удаление тестового велосипеда...');
      const deleteResponse = await fetch(`${API_URL}/api/bikes/${result.bike.id}`, {
        method: 'DELETE'
      });

      if (deleteResponse.ok) {
        console.log('✅ Тестовый велосипед удалён\n');
      } else {
        console.log(`❌ Ошибка удаления: ${deleteResponse.status}\n`);
      }
    } else {
      const error = await response.json();
      console.log(`❌ Ошибка: ${error.error}\n`);
    }
  } catch (error) {
    console.log(`❌ Ошибка: ${error.message}\n`);
  }

  // Тест 5: Проверка загрузки изображений
  console.log('5️⃣ Проверка загрузки изображений...');
  console.log('💡 Для тестирования загрузки изображений используйте админ-панель');
  console.log('💡 Откройте: http://localhost:5173/#/admin\n');

  console.log('✅ Тестирование завершено!');
  console.log('\n📋 Если все тесты пройдены, но изображения не загружаются:');
  console.log('   1. Проверьте логи backend в терминале');
  console.log('   2. Проверьте права доступа к папке backend/uploads/');
  console.log('   3. Проверьте размер файла (максимум 10MB)');
  console.log('   4. Проверьте формат файла (JPEG, PNG, GIF, WebP)');
}

testAPI();
