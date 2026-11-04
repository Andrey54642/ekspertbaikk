import { useState, useEffect } from 'react';
import { useBikes } from '../context/BikeContext';
import { Bike } from '../types';
import { uploadImage, getImageUrl } from '../services/apiService';

export default function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const { bikes, settings, addBike, updateBike, deleteBike, updateSettings } = useBikes();
  const [activeTab, setActiveTab] = useState<'bikes' | 'settings'>('bikes');
  const [editingBike, setEditingBike] = useState<Bike | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [phone, setPhone] = useState(settings.phone);
  const [address, setAddress] = useState(settings.address);
  const [workHours, setWorkHours] = useState(settings.workHours);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);
  const [telegram, setTelegram] = useState(settings.telegram);
  const [instagram, setInstagram] = useState(settings.instagram);
  const [vk, setVk] = useState(settings.vk);
  const [youtube, setYoutube] = useState(settings.youtube);
  const [telegramChannel, setTelegramChannel] = useState(settings.telegramChannel);
  const [yandexMetrikaId, setYandexMetrikaId] = useState(settings.yandexMetrikaId);
  const [mapLat, setMapLat] = useState(settings.mapLat);
  const [mapLng, setMapLng] = useState(settings.mapLng);
  const [mapZoom, setMapZoom] = useState(settings.mapZoom);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setPhone(settings.phone);
    setAddress(settings.address);
    setWorkHours(settings.workHours);
    setWhatsapp(settings.whatsapp);
    setTelegram(settings.telegram);
    setInstagram(settings.instagram);
    setVk(settings.vk);
    setYoutube(settings.youtube);
    setTelegramChannel(settings.telegramChannel);
    setYandexMetrikaId(settings.yandexMetrikaId);
    setMapLat(settings.mapLat);
    setMapLng(settings.mapLng);
    setMapZoom(settings.mapZoom);
  }, [settings]);

  const handleSaveSettings = async () => {
    await updateSettings({
      phone, address, workHours, whatsapp, telegram, instagram, vk, youtube,
      telegramChannel, yandexMetrikaId, mapLat, mapLng, mapZoom
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDeleteBike = async (id: string) => {
    if (confirm('Удалить велосипед?')) {
      await deleteBike(id);
    }
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
              <span className="text-sm font-bold text-white">Админ-панель</span>
            </div>
            <div className="flex items-center gap-3">
              <a href="/" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                <i className="fas fa-external-link-alt mr-1"></i>На сайт
              </a>
              <button onClick={onLogout} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                <i className="fas fa-sign-out-alt mr-1"></i>Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('bikes')}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'bikes' ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            <i className="fas fa-bicycle mr-2"></i>Велосипеды
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'settings' ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            <i className="fas fa-cog mr-2"></i>Настройки
          </button>
        </div>

        {activeTab === 'bikes' && !editingBike && !isAdding && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Управление велосипедами</h2>
              <button onClick={() => setIsAdding(true)} className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all">
                <i className="fas fa-plus mr-2"></i>Добавить
              </button>
            </div>

            <div className="grid gap-4">
              {bikes.map((bike) => (
                <div key={bike.id} className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 p-5 flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0">
                    {bike.image ? (
                      <img src={getImageUrl(bike.image)} alt={bike.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <i className="fas fa-bicycle text-gray-600 text-2xl"></i>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{bike.name}</h3>
                    <p className="text-gray-400 text-sm">{bike.description}</p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-green-400 font-bold text-sm">{bike.pricePerWeek.toLocaleString()}₽/нед</span>
                      <span className="text-yellow-400 text-sm">Залог: {bike.deposit.toLocaleString()}₽</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingBike(bike)} className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                      <i className="fas fa-edit mr-1"></i>Изменить
                    </button>
                    <button onClick={() => handleDeleteBike(bike.id)} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                      <i className="fas fa-trash mr-1"></i>Удалить
                    </button>
                  </div>
                </div>
              ))}
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

        {activeTab === 'settings' && (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Настройки сайта</h2>
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 p-6 space-y-5">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Телефон</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Адрес</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Режим работы</label>
                <input type="text" value={workHours} onChange={(e) => setWorkHours(e.target.value)} className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">WhatsApp</label>
                <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Telegram</label>
                <input type="text" value={telegram} onChange={(e) => setTelegram(e.target.value)} className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Instagram</label>
                <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">ВКонтакте</label>
                <input type="text" value={vk} onChange={(e) => setVk(e.target.value)} className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">YouTube</label>
                <input type="text" value={youtube} onChange={(e) => setYoutube(e.target.value)} className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Telegram канал (username)</label>
                <input type="text" value={telegramChannel} onChange={(e) => setTelegramChannel(e.target.value)} className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Яндекс.Метрика ID</label>
                <input type="text" value={yandexMetrikaId} onChange={(e) => setYandexMetrikaId(e.target.value)} className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Широта</label>
                  <input type="number" step="0.000001" value={mapLat} onChange={(e) => setMapLat(parseFloat(e.target.value))} className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all" />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Долгота</label>
                  <input type="number" step="0.000001" value={mapLng} onChange={(e) => setMapLng(parseFloat(e.target.value))} className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Масштаб карты</label>
                <input type="number" min="1" max="20" value={mapZoom} onChange={(e) => setMapZoom(parseInt(e.target.value))} className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all" />
              </div>
              <button onClick={handleSaveSettings} className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3.5 rounded-xl font-bold transition-all">
                <i className="fas fa-save mr-2"></i>Сохранить
              </button>
              {saved && <span className="ml-3 text-green-400 text-sm"><i className="fas fa-check-circle mr-1"></i>Сохранено!</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BikeForm({ bike, onSave, onCancel }: { bike: Bike | null; onSave: (data: any) => void; onCancel: () => void }) {
  const [name, setName] = useState(bike?.name || '');
  const [description, setDescription] = useState(bike?.description || '');
  const [pricePerWeek, setPricePerWeek] = useState(bike?.pricePerWeek?.toString() || '');
  const [deposit, setDeposit] = useState(bike?.deposit?.toString() || '');
  const [image, setImage] = useState(bike?.image || '');
  const [imagePreview, setImagePreview] = useState(bike?.image ? getImageUrl(bike.image) : '');
  const [features, setFeatures] = useState(bike?.features?.join('\n') || '');
  const [badge, setBadge] = useState(bike?.badge || '');
  const [accentColor, setAccentColor] = useState(bike?.accentColor || 'green');
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
      const result = await uploadImage(file);
      if (result.success) setImage(result.url);
    } catch (error) {
      console.error(error);
    }
    setUploading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name, description,
      pricePerWeek: Number(pricePerWeek),
      deposit: Number(deposit),
      image, features: features.split('\n').filter(f => f.trim()),
      badge, accentColor
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{bike ? 'Редактировать' : 'Добавить'} велосипед</h2>
        <button onClick={onCancel} className="text-gray-400 hover:text-white transition-colors">
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Основная информация</h3>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Название *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all" />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Описание</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Цена/неделя *</label>
                <input type="number" value={pricePerWeek} onChange={(e) => setPricePerWeek(e.target.value)} required className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Залог *</label>
                <input type="number" value={deposit} onChange={(e) => setDeposit(e.target.value)} required className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Фотография</h3>
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-800 border border-gray-700 flex items-center justify-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <i className="fas fa-image text-gray-600 text-4xl mb-2"></i>
                  <p className="text-gray-500 text-sm">Нет изображения</p>
                </div>
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" disabled={uploading} />
            <label htmlFor="image-upload" className={`flex items-center justify-center gap-2 w-full bg-gray-800/50 border border-gray-700 border-dashed rounded-xl px-4 py-4 text-gray-400 hover:text-green-400 cursor-pointer transition-all ${uploading ? 'opacity-50' : ''}`}>
              <i className={`fas ${uploading ? 'fa-spinner fa-spin' : 'fa-cloud-upload-alt'}`}></i>
              <span className="text-sm">{uploading ? 'Загрузка...' : 'Выберите изображение'}</span>
            </label>
          </div>
        </div>

        <div className="lg:col-span-2 flex gap-3 pt-4">
          <button type="submit" disabled={uploading} className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3.5 rounded-xl font-bold transition-all">
            <i className="fas fa-save mr-2"></i>{bike ? 'Сохранить' : 'Добавить'}
          </button>
          <button type="button" onClick={onCancel} className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3.5 rounded-xl font-medium transition-all">
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}
