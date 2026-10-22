import { useState, useEffect } from 'react';
import { useBikes } from '../context/BikeContext';
import { Bike } from '../types';
import { uploadImage, deleteImage, getImageUrl } from '../services/apiService';

export default function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const { bikes, settings, addBike, updateBike, deleteBike, updateSettings, isSyncing, refreshData } = useBikes();
  const [activeTab, setActiveTab] = useState<'bikes' | 'settings' | 'social' | 'metrika' | 'map' | 'status'>('bikes');
  const [editingBike, setEditingBike] = useState<Bike | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const [phone, setPhone] = useState(settings.phone);
  const [address, setAddress] = useState(settings.address);
  const [workHours, setWorkHours] = useState(settings.workHours);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);
  const [telegram, setTelegram] = useState(settings.telegram);
  const [instagram, setInstagram] = useState(settings.instagram);
  const [vk, setVk] = useState(settings.vk);
  const [youtube, setYoutube] = useState(settings.youtube);
  const [customSocials, setCustomSocials] = useState(settings.customSocials || []);
  const [yandexMetrikaId, setYandexMetrikaId] = useState(settings.yandexMetrikaId || '');
  const [mapLat, setMapLat] = useState(settings.mapLat || 45.035470);
  const [mapLng, setMapLng] = useState(settings.mapLng || 38.975310);
  const [mapZoom, setMapZoom] = useState(settings.mapZoom || 16);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [refreshStatus, setRefreshStatus] = useState('');

  const handleSaveSettings = async () => {
    await updateSettings({ phone, address, workHours, whatsapp });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  const handleSaveSocial = async () => {
    await updateSettings({ telegram, instagram, vk, youtube, customSocials });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  const handleSaveMetrika = async () => {
    await updateSettings({ yandexMetrikaId });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  const handleSaveMap = async () => {
    await updateSettings({ mapLat, mapLng, mapZoom });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  const addCustomSocial = () => {
    setCustomSocials([...customSocials, {
      id: Date.now().toString(),
      name: '',
      url: '',
      icon: 'fas fa-link',
      color: 'gray'
    }]);
  };

  const updateCustomSocial = (id: string, updates: Partial<any>) => {
    setCustomSocials(customSocials.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const removeCustomSocial = (id: string) => {
    setCustomSocials(customSocials.filter(s => s.id !== id));
  };

  const handleDeleteBike = async (id: string) => {
    await deleteBike(id);
    setShowDeleteConfirm(null);
  };

  const handleRefresh = async () => {
    setRefreshStatus('Обновление...');
    await refreshData();
    setRefreshStatus('Обновлено!');
    setTimeout(() => setRefreshStatus(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-bolt text-white text-sm"></i>
              </div>
              <div>
                <span className="text-sm font-bold text-white">Админ-панель</span>
                <span className="text-xs text-gray-500 block">Эксперт Байк</span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {isSyncing && (
                <span className="text-yellow-400 text-xs hidden sm:block">
                  <i className="fas fa-spinner fa-spin mr-1"></i>Синхронизация
                </span>
              )}
              <button
                onClick={handleRefresh}
                className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                title="Обновить данные"
              >
                <i className="fas fa-sync-alt"></i>
              </button>
              <a href="/" className="text-gray-400 hover:text-green-400 text-sm transition-colors hidden sm:block">
                <i className="fas fa-external-link-alt mr-1"></i>На сайт
              </a>
              <button
                onClick={onLogout}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                <i className="fas fa-sign-out-alt mr-1"></i><span className="hidden sm:inline">Выйти</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => { setActiveTab('bikes'); setEditingBike(null); setIsAdding(false); }}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${activeTab === 'bikes' ? 'bg-green-500 text-white shadow-lg shadow-green-500/25' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            <i className="fas fa-bicycle mr-2"></i>Велосипеды
          </button>
          <button
            onClick={() => { setActiveTab('settings'); setEditingBike(null); setIsAdding(false); }}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${activeTab === 'settings' ? 'bg-green-500 text-white shadow-lg shadow-green-500/25' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            <i className="fas fa-cog mr-2"></i>Настройки
          </button>
          <button
            onClick={() => { setActiveTab('social'); setEditingBike(null); setIsAdding(false); }}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${activeTab === 'social' ? 'bg-green-500 text-white shadow-lg shadow-green-500/25' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            <i className="fas fa-share-alt mr-2"></i>Соцсети
          </button>
          <button
            onClick={() => { setActiveTab('metrika'); setEditingBike(null); setIsAdding(false); }}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${activeTab === 'metrika' ? 'bg-green-500 text-white shadow-lg shadow-green-500/25' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            <i className="fas fa-chart-line mr-2"></i>Метрика
          </button>
          <button
            onClick={() => { setActiveTab('map'); setEditingBike(null); setIsAdding(false); }}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${activeTab === 'map' ? 'bg-green-500 text-white shadow-lg shadow-green-500/25' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            <i className="fas fa-map mr-2"></i>Карта
          </button>
          <button
            onClick={() => { setActiveTab('status'); setEditingBike(null); setIsAdding(false); }}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${activeTab === 'status' ? 'bg-green-500 text-white shadow-lg shadow-green-500/25' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            <i className="fas fa-database mr-2"></i>Статус
          </button>
        </div>

        {/* Bikes Tab */}
        {activeTab === 'bikes' && !editingBike && !isAdding && (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Управление электровелосипедами</h2>
              <button
                onClick={() => setIsAdding(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-4 sm:px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-green-500/20 min-h-[44px] flex items-center justify-center w-full sm:w-auto"
              >
                <i className="fas fa-plus mr-2"></i>Добавить
              </button>
            </div>

            <div className="grid gap-3 sm:gap-4">
              {bikes.map((bike) => (
                <div key={bike.id} className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0 flex items-center justify-center">
                    {bike.image ? (
                      <img src={bike.image} alt={bike.name} className="w-full h-full object-cover" />
                    ) : (
                      <i className="fas fa-bicycle text-gray-600 text-xl sm:text-2xl"></i>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 w-full sm:w-auto">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold text-white">{bike.name}</h3>
                      {bike.badge && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-green-500/20 text-green-400">{bike.badge}</span>
                      )}
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm line-clamp-2">{bike.description}</p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                      <span className="text-green-400 font-bold text-xs sm:text-sm">{bike.pricePerWeek.toLocaleString()}₽/нед</span>
                      <span className="text-yellow-400 text-xs sm:text-sm">Залог: {bike.deposit.toLocaleString()}₽</span>
                      <span className="text-gray-500 text-xs">{bike.features.length} хар-к</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
                    <button
                      onClick={() => setEditingBike(bike)}
                      className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex-1 sm:flex-initial min-h-[44px] flex items-center justify-center"
                    >
                      <i className="fas fa-edit mr-1"></i><span className="hidden sm:inline">Изменить</span><span className="sm:hidden">Изм.</span>
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(bike.id)}
                      className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex-1 sm:flex-initial min-h-[44px] flex items-center justify-center"
                    >
                      <i className="fas fa-trash mr-1"></i><span className="hidden sm:inline">Удалить</span><span className="sm:hidden">Уд.</span>
                    </button>
                  </div>
                </div>
              ))}

              {bikes.length === 0 && (
                <div className="text-center py-16 bg-gray-800/30 rounded-2xl border border-gray-700/30">
                  <i className="fas fa-bicycle text-gray-600 text-4xl mb-4"></i>
                  <p className="text-gray-400">Нет электровелосипедов</p>
                </div>
              )}
            </div>
          </div>
        )}

        {(editingBike || isAdding) && (
          <BikeForm
            bike={editingBike}
            onSave={async (bikeData) => {
              if (editingBike) {
                await updateBike(editingBike.id, bikeData);
              } else {
                await addBike(bikeData as Omit<Bike, 'id'>);
              }
              setEditingBike(null);
              setIsAdding(false);
            }}
            onCancel={() => { setEditingBike(null); setIsAdding(false); }}
          />
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Настройки сайта</h2>
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 p-4 sm:p-6 space-y-4 sm:space-y-5">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Телефон</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all min-h-[44px]"
                  placeholder="+7 (900) 123-45-67" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Адрес</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all min-h-[44px]"
                  placeholder="г. Краснодар, ул. Снесарева, 3" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Режим работы</label>
                <input type="text" value={workHours} onChange={(e) => setWorkHours(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all min-h-[44px]"
                  placeholder="Ежедневно с 9:00 до 21:00" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">WhatsApp (номер без +)</label>
                <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all min-h-[44px]"
                  placeholder="79001234567" />
              </div>

              <div className="pt-2 sm:pt-4">
                <button onClick={handleSaveSettings}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-green-500/20 min-h-[48px] w-full sm:w-auto">
                  <i className="fas fa-save mr-2"></i>Сохранить настройки
                </button>
                {settingsSaved && (
                  <span className="ml-0 sm:ml-3 mt-2 sm:mt-0 block sm:inline text-green-400 text-sm">
                    <i className="fas fa-check-circle mr-1"></i>Сохранено!
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Social Tab */}
        {activeTab === 'social' && (
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Социальные сети</h2>
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 p-4 sm:p-6 space-y-4 sm:space-y-5">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  <i className="fab fa-telegram text-blue-400 mr-2"></i>Telegram
                </label>
                <input type="url" value={telegram} onChange={(e) => setTelegram(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all min-h-[44px]"
                  placeholder="https://t.me/your_channel" />
                <p className="text-gray-500 text-xs mt-1">Ссылка на ваш Telegram канал или чат</p>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  <i className="fab fa-instagram text-pink-400 mr-2"></i>Instagram
                </label>
                <input type="url" value={instagram} onChange={(e) => setInstagram(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all min-h-[44px]"
                  placeholder="https://instagram.com/your_profile" />
                <p className="text-gray-500 text-xs mt-1">Ссылка на ваш профиль в Instagram</p>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  <i className="fab fa-vk text-blue-400 mr-2"></i>ВКонтакте
                </label>
                <input type="url" value={vk} onChange={(e) => setVk(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all min-h-[44px]"
                  placeholder="https://vk.com/your_group" />
                <p className="text-gray-500 text-xs mt-1">Ссылка на вашу группу ВКонтакте</p>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  <i className="fab fa-youtube text-red-400 mr-2"></i>YouTube
                </label>
                <input type="url" value={youtube} onChange={(e) => setYoutube(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all min-h-[44px]"
                  placeholder="https://youtube.com/your_channel" />
                <p className="text-gray-500 text-xs mt-1">Ссылка на ваш YouTube канал</p>
              </div>

              {/* Кастомные соцсети */}
              <div className="pt-4 border-t border-gray-700/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <i className="fas fa-plus-circle text-green-400"></i>
                    Дополнительные соцсети
                  </h3>
                  <button
                    onClick={addCustomSocial}
                    className="bg-green-500/10 hover:bg-green-500/20 text-green-400 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                  >
                    <i className="fas fa-plus mr-1"></i>Добавить
                  </button>
                </div>

                {customSocials.length === 0 && (
                  <p className="text-gray-500 text-sm text-center py-4">
                    Нет дополнительных соцсетей. Добавьте Max, Одноклассники, TikTok и другие.
                  </p>
                )}

                <div className="space-y-3">
                  {customSocials.map((social) => (
                    <div key={social.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="block text-gray-300 text-xs font-medium mb-1">Название</label>
                          <input
                            type="text"
                            value={social.name}
                            onChange={(e) => updateCustomSocial(social.id, { name: e.target.value })}
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-green-500 transition-all"
                            placeholder="Max, Одноклассники..."
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 text-xs font-medium mb-1">Иконка</label>
                          <select
                            value={social.icon}
                            onChange={(e) => updateCustomSocial(social.id, { icon: e.target.value })}
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500 transition-all"
                          >
                            <option value="fas fa-link">🔗 Ссылка</option>
                            <option value="fas fa-comment">💬 Чат</option>
                            <option value="fas fa-paper-plane">✈️ Мессенджер</option>
                            <option value="fas fa-music">🎵 Музыка</option>
                            <option value="fas fa-video">📹 Видео</option>
                            <option value="fas fa-gamepad">🎮 Игры</option>
                            <option value="fas fa-shopping-bag">🛍️ Магазин</option>
                            <option value="fas fa-envelope">📧 Почта</option>
                            <option value="fas fa-globe">🌐 Сайт</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-gray-300 text-xs font-medium mb-1">URL</label>
                          <input
                            type="url"
                            value={social.url}
                            onChange={(e) => updateCustomSocial(social.id, { url: e.target.value })}
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-green-500 transition-all"
                            placeholder="https://..."
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 text-xs font-medium mb-1">Цвет</label>
                          <select
                            value={social.color}
                            onChange={(e) => updateCustomSocial(social.id, { color: e.target.value })}
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500 transition-all"
                          >
                            <option value="green">🟢 Зелёный</option>
                            <option value="blue">🔵 Синий</option>
                            <option value="purple">🟣 Фиолетовый</option>
                            <option value="red">🔴 Красный</option>
                            <option value="yellow">🟡 Жёлтый</option>
                            <option value="pink">🩷 Розовый</option>
                            <option value="orange">🟠 Оранжевый</option>
                            <option value="gray">⚪ Серый</option>
                          </select>
                        </div>
                      </div>
                      <button
                        onClick={() => removeCustomSocial(social.id)}
                        className="mt-3 text-red-400 hover:text-red-300 text-xs transition-colors"
                      >
                        <i className="fas fa-trash mr-1"></i>Удалить
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 sm:pt-4">
                <button onClick={handleSaveSocial}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-green-500/20 min-h-[48px] w-full sm:w-auto">
                  <i className="fas fa-save mr-2"></i>Сохранить соцсети
                </button>
                {settingsSaved && (
                  <span className="ml-0 sm:ml-3 mt-2 sm:mt-0 block sm:inline text-green-400 text-sm">
                    <i className="fas fa-check-circle mr-1"></i>Сохранено!
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Метрика Tab */}
        {activeTab === 'metrika' && (
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Яндекс.Метрика</h2>
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 p-4 sm:p-6 space-y-4 sm:space-y-5">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  <i className="fas fa-chart-line text-yellow-400 mr-2"></i>ID счётчика Яндекс.Метрики
                </label>
                <input
                  type="text"
                  value={yandexMetrikaId}
                  onChange={(e) => setYandexMetrikaId(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all min-h-[44px]"
                  placeholder="12345678"
                />
                <p className="text-gray-500 text-xs mt-2">
                  Введите ID счётчика Яндекс.Метрики. Получить можно в <a href="https://metrika.yandex.ru/" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Яндекс.Метрике</a>
                </p>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                <h4 className="text-yellow-400 font-medium text-sm mb-2 flex items-center gap-2">
                  <i className="fas fa-info-circle"></i>
                  Как получить ID счётчика:
                </h4>
                <ol className="text-yellow-400/70 text-xs space-y-1 list-decimal list-inside">
                  <li>Зарегистрируйтесь в <a href="https://metrika.yandex.ru/" target="_blank" rel="noopener noreferrer" className="underline">Яндекс.Метрике</a></li>
                  <li>Создайте новый счётчик для вашего сайта</li>
                  <li>Скопируйте номер счётчика (ID)</li>
                  <li>Вставьте его в поле выше</li>
                  <li>Нажмите "Сохранить"</li>
                </ol>
              </div>

              <div className="pt-2 sm:pt-4">
                <button onClick={handleSaveMetrika}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-green-500/20 min-h-[48px] w-full sm:w-auto">
                  <i className="fas fa-save mr-2"></i>Сохранить настройки метрики
                </button>
                {settingsSaved && (
                  <span className="ml-0 sm:ml-3 mt-2 sm:mt-0 block sm:inline text-green-400 text-sm">
                    <i className="fas fa-check-circle mr-1"></i>Сохранено!
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Карта Tab */}
        {activeTab === 'map' && (
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Настройки карты</h2>
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 p-4 sm:p-6 space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    <i className="fas fa-map-marker-alt text-red-400 mr-2"></i>Широта (Latitude)
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={mapLat}
                    onChange={(e) => setMapLat(parseFloat(e.target.value))}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all min-h-[44px]"
                    placeholder="45.035470"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    <i className="fas fa-map-marker-alt text-red-400 mr-2"></i>Долгота (Longitude)
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={mapLng}
                    onChange={(e) => setMapLng(parseFloat(e.target.value))}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all min-h-[44px]"
                    placeholder="38.975310"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  <i className="fas fa-search-plus text-blue-400 mr-2"></i>Масштаб карты (Zoom)
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={mapZoom}
                  onChange={(e) => setMapZoom(parseInt(e.target.value))}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all min-h-[44px]"
                  placeholder="16"
                />
                <p className="text-gray-500 text-xs mt-1">От 1 (весь мир) до 20 (здание)</p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <h4 className="text-blue-400 font-medium text-sm mb-2 flex items-center gap-2">
                  <i className="fas fa-info-circle"></i>
                  Как узнать координаты:
                </h4>
                <ol className="text-blue-400/70 text-xs space-y-1 list-decimal list-inside">
                  <li>Откройте <a href="https://maps.yandex.ru/" target="_blank" rel="noopener noreferrer" className="underline">Яндекс.Карты</a></li>
                  <li>Найдите ваше местоположение</li>
                  <li>Кликните правой кнопкой мыши на точку</li>
                  <li>Выберите "Что здесь?"</li>
                  <li>Скопируйте координаты (широта, долгота)</li>
                </ol>
              </div>

              {/* Превью карты */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Превью карты</label>
                <div className="rounded-xl overflow-hidden border border-gray-700/30 h-64">
                  <iframe
                    src={`https://yandex.ru/map-widget/v1/?ll=${mapLng}%2C${mapLat}&z=${mapZoom}&pt=${mapLng},${mapLat},pm2rdm`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen
                    title="Превью карты"
                  ></iframe>
                </div>
              </div>

              <div className="pt-2 sm:pt-4">
                <button onClick={handleSaveMap}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-green-500/20 min-h-[48px] w-full sm:w-auto">
                  <i className="fas fa-save mr-2"></i>Сохранить настройки карты
                </button>
                {settingsSaved && (
                  <span className="ml-0 sm:ml-3 mt-2 sm:mt-0 block sm:inline text-green-400 text-sm">
                    <i className="fas fa-check-circle mr-1"></i>Сохранено!
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Status Tab */}
        {activeTab === 'status' && (
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Статус системы</h2>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 p-5 sm:p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-server text-green-400"></i>
                  Backend сервер
                </h3>
                <div className="space-y-3">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                    <p className="text-green-400 font-medium text-sm mb-2">✓ Backend API активен</p>
                    <p className="text-green-400/70 text-xs">Все данные хранятся на вашем сервере</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <p className="text-gray-400 text-sm">
                      <i className="fas fa-info-circle mr-2 text-blue-400"></i>
                      Данные сохраняются в <code className="bg-gray-700 px-1 rounded">backend/data.json</code>
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      <i className="fas fa-images mr-2 text-blue-400"></i>
                      Изображения сохраняются в <code className="bg-gray-700 px-1 rounded">backend/uploads/</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 p-5 sm:p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-database text-cyan-400"></i>
                  Статистика
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-800/50 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-white">{bikes.length}</div>
                    <div className="text-gray-500 text-xs">велосипедов</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-white">{bikes.filter(b => b.image).length}</div>
                    <div className="text-gray-500 text-xs">с фото</div>
                  </div>
                </div>
              </div>

              {refreshStatus && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                  <p className="text-green-400 text-sm">{refreshStatus}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 p-5 sm:p-6 max-w-sm w-full">
            <div className="text-center">
              <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-exclamation-triangle text-red-400 text-xl"></i>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Удалить электровелосипед?</h3>
              <p className="text-gray-400 text-sm mb-6">Это действие нельзя отменить</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-medium transition-all min-h-[48px]">
                  Отмена
                </button>
                <button onClick={() => handleDeleteBike(showDeleteConfirm)}
                  className="flex-1 bg-red-500 hover:bg-red-400 text-white py-3 rounded-xl font-medium transition-all min-h-[48px]">
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Bike Form Component
function BikeForm({ bike, onSave, onCancel }: { bike: Bike | null; onSave: (data: any) => void; onCancel: () => void }) {
  const [name, setName] = useState(bike?.name || '');
  const [description, setDescription] = useState(bike?.description || '');
  const [pricePerWeek, setPricePerWeek] = useState(bike?.pricePerWeek?.toString() || '');
  const [deposit, setDeposit] = useState(bike?.deposit?.toString() || '');
  const [image, setImage] = useState(bike?.image || '');
  const [imagePreview, setImagePreview] = useState('');
  const [features, setFeatures] = useState(bike?.features?.join('\n') || '');
  const [badge, setBadge] = useState(bike?.badge || '');
  const [badgeColor, setBadgeColor] = useState(bike?.badgeColor || 'green');
  const [accentColor, setAccentColor] = useState(bike?.accentColor || 'green');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Загружаем превью изображения при редактировании
  useEffect(() => {
    if (bike?.image) {
      setImagePreview(getImageUrl(bike.image));
    }
  }, [bike]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Файл слишком большой. Максимум 10MB');
      return;
    }

    setUploadError('');
    setUploading(true);

    try {
      // Показываем превью сразу
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Загружаем на сервер
      const result = await uploadImage(file);
      
      if (result.success && result.url) {
        setImage(result.url);
        setUploadError('');
      } else {
        setUploadError('Ошибка загрузки на сервер');
      }
    } catch (error) {
      setUploadError('Ошибка загрузки: ' + (error as Error).message);
    }

    setUploading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      description,
      pricePerWeek: Number(pricePerWeek),
      deposit: Number(deposit),
      image,
      features: features.split('\n').filter(f => f.trim()),
      badge,
      badgeColor,
      accentColor,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          {bike ? 'Редактировать' : 'Добавить'} электровелосипед
        </h2>
        <button onClick={onCancel} className="text-gray-400 hover:text-white transition-colors w-11 h-11 flex items-center justify-center">
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 p-4 sm:p-6 space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <i className="fas fa-info-circle text-green-400"></i>Основная информация
          </h3>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Название *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all min-h-[44px]"
              placeholder="Майкалин U5" required />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Описание</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all resize-none"
              placeholder="Описание электровелосипеда..." />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Цена/неделя (₽) *</label>
              <input type="number" value={pricePerWeek} onChange={(e) => setPricePerWeek(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all min-h-[44px]"
                placeholder="4500" required />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Залог (₽) *</label>
              <input type="number" value={deposit} onChange={(e) => setDeposit(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all min-h-[44px]"
                placeholder="1500" required />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 p-4 sm:p-6 space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <i className="fas fa-list text-cyan-400"></i>Характеристики
          </h3>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Особенности (каждая с новой строки)</label>
            <textarea value={features} onChange={(e) => setFeatures(e.target.value)} rows={5}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all resize-none"
              placeholder={"Мощный электродвигатель\nУвеличенный запас хода\nКомфортная посадка"} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Бейдж</label>
              <input type="text" value={badge} onChange={(e) => setBadge(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all min-h-[44px]"
                placeholder="ХИТ" />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Цвет бейджа</label>
              <select value={badgeColor} onChange={(e) => setBadgeColor(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all min-h-[44px]">
                <option value="green">Зелёный</option>
                <option value="cyan">Голубой</option>
                <option value="purple">Фиолетовый</option>
                <option value="yellow">Жёлтый</option>
                <option value="red">Красный</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Основной цвет карточки</label>
            <select value={accentColor} onChange={(e) => setAccentColor(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all min-h-[44px]">
              <option value="green">Зелёный</option>
              <option value="cyan">Голубой</option>
              <option value="purple">Фиолетовый</option>
              <option value="yellow">Жёлтый</option>
              <option value="red">Красный</option>
              <option value="pink">Розовый</option>
            </select>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 p-4 sm:p-6 space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <i className="fas fa-image text-purple-400"></i>Фотография
          </h3>
          
          <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-800 border border-gray-700 flex items-center justify-center relative">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center">
                <i className="fas fa-image text-gray-600 text-3xl sm:text-4xl mb-2"></i>
                <p className="text-gray-500 text-xs sm:text-sm">Нет изображения</p>
              </div>
            )}
            {uploading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-spinner fa-spin text-green-400 text-2xl mb-2"></i>
                  <p className="text-white text-sm">Загрузка...</p>
                </div>
              </div>
            )}
          </div>

          {uploadError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-xs sm:text-sm">
              <i className="fas fa-exclamation-circle mr-1"></i>{uploadError}
            </div>
          )}

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Загрузить файл</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="hidden" 
              id="image-upload" 
              disabled={uploading}
            />
            <label 
              htmlFor="image-upload"
              className={`flex items-center justify-center gap-2 w-full bg-gray-800/50 border border-gray-700 border-dashed rounded-xl px-4 py-4 text-gray-400 hover:text-green-400 hover:border-green-500/50 cursor-pointer transition-all min-h-[48px] ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <i className={`fas ${uploading ? 'fa-spinner fa-spin' : 'fa-cloud-upload-alt'}`}></i>
              <span className="text-xs sm:text-sm">{uploading ? 'Загрузка...' : 'Выберите изображение (до 10MB)'}</span>
            </label>
          </div>

          {imagePreview && !uploading && (
            <button 
              type="button" 
              onClick={() => { setImage(''); setImagePreview(''); }}
              className="text-red-400 hover:text-red-300 text-sm transition-colors min-h-[44px] flex items-center"
            >
              <i className="fas fa-trash mr-1"></i>Удалить изображение
            </button>
          )}

          <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3 text-green-400 text-xs">
            <i className="fas fa-server mr-1"></i>Изображения сохраняются на вашем сервере
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4">
          <button type="submit" disabled={uploading}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 sm:px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-green-500/20 min-h-[48px] flex items-center justify-center order-2 sm:order-1">
            <i className={`fas ${uploading ? 'fa-spinner fa-spin' : 'fa-save'} mr-2`}></i>{uploading ? 'Загрузка...' : (bike ? 'Сохранить изменения' : 'Добавить')}
          </button>
          <button type="button" onClick={onCancel} disabled={uploading}
            className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white px-6 py-3.5 rounded-xl font-medium transition-all min-h-[48px] flex items-center justify-center order-1 sm:order-2">
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}
