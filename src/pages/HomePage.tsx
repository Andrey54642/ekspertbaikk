import { useState, useEffect } from 'react';
import { useBikes } from '../context/BikeContext';
import { getImageUrl } from '../services/apiService';

export default function HomePage() {
  const { bikes, settings, isLoading } = useBikes();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phoneClean = settings.phone.replace(/[^0-9+]/g, '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-bicycle text-green-400 text-4xl mb-4 animate-pulse"></i>
          <p className="text-gray-400">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
                <i className="fas fa-bolt text-white text-lg"></i>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">ЭКСПЕРТ</span>
                <span className="text-xl font-bold text-white ml-1">БАЙК</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <a href="#bikes" className="text-gray-300 hover:text-green-400 transition-colors text-sm font-medium">Велосипеды</a>
              <a href="#/repair" className="text-gray-300 hover:text-green-400 transition-colors text-sm font-medium">Ремонт</a>
              <a href="#/couriers" className="text-gray-300 hover:text-green-400 transition-colors text-sm font-medium">Курьерам</a>
              <a href="#/blog" className="text-gray-300 hover:text-green-400 transition-colors text-sm font-medium">Блог</a>
              <a href="#contacts" className="text-gray-300 hover:text-green-400 transition-colors text-sm font-medium">Контакты</a>
              <a href={`tel:${phoneClean}`} className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg">
                <i className="fas fa-phone mr-2"></i>Позвонить
              </a>
            </div>

            <button className="md:hidden text-white text-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900/98 backdrop-blur-md border-t border-gray-800">
            <div className="px-4 py-4 space-y-3">
              <a href="#bikes" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-green-400 py-2">Велосипеды</a>
              <a href="#/repair" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-green-400 py-2">Ремонт</a>
              <a href="#/couriers" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-green-400 py-2">Курьерам</a>
              <a href="#/blog" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-green-400 py-2">Блог</a>
              <a href="#contacts" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-green-400 py-2">Контакты</a>
              <a href={`tel:${phoneClean}`} className="block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-3 rounded-full text-center font-semibold mt-4">
                <i className="fas fa-phone mr-2"></i>Позвонить
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-green-400 text-sm font-medium">Аренда и ремонт в Краснодаре</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            <span className="text-white">Электровелосипеды</span>
            <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">в аренду</span>
            <br />
            <span className="text-white text-3xl sm:text-4xl lg:text-5xl">от {bikes.length > 0 ? Math.min(...bikes.map(b => b.pricePerWeek)).toLocaleString() : '4000'}₽/неделя</span>
          </h1>

          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Мощные, стильные и экологичные электровелосипеды для города и природы.
            Забирайте сегодня — покоряйте дороги уже завтра!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
            <a href="#bikes" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl hover:scale-105 min-h-[48px] flex items-center justify-center">
              <i className="fas fa-bicycle mr-2"></i>Выбрать велосипед
            </a>
            <a href="#/repair" className="border-2 border-gray-600 hover:border-green-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:bg-green-500/5 min-h-[48px] flex items-center justify-center">
              <i className="fas fa-wrench mr-2"></i>Ремонт
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
            <div>
              <div className="text-2xl font-bold text-green-400">{bikes.length}</div>
              <div className="text-gray-500 text-sm">моделей</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{bikes.length > 0 ? Math.min(...bikes.map(b => b.pricePerWeek)).toLocaleString() : '4000'}₽</div>
              <div className="text-gray-500 text-sm">от / неделя</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">1 день</div>
              <div className="text-gray-500 text-sm">ремонт</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bikes Section */}
      <section id="bikes" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-green-400 font-semibold text-sm uppercase tracking-wider mb-3">Наш автопарк</span>
            <h2 className="text-4xl font-bold text-white mb-4">Выберите свой электровелосипед</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Мощные электровелосипеды для комфортных поездок</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {bikes.map((bike) => (
              <div key={bike.id} className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-3xl border border-gray-700/50 overflow-hidden hover:border-green-500/50 transition-all duration-500 hover:shadow-2xl">
                {bike.badge && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-green-500 to-emerald-600 text-white px-4 py-1.5 rounded-bl-2xl text-xs font-bold z-10">
                    {bike.badge}
                  </div>
                )}
                <div className="p-6">
                  <div className="w-full h-48 bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                    {bike.image ? (
                      <img src={getImageUrl(bike.image)} alt={`Электровелосипед ${bike.name} для аренды в Краснодаре`} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <i className="fas fa-bicycle text-6xl text-green-400 opacity-60"></i>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{bike.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{bike.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-800/50 rounded-xl p-2.5 text-center">
                      <div className="text-green-400 font-bold text-base">{bike.pricePerWeek.toLocaleString()}₽</div>
                      <div className="text-gray-500 text-xs">в неделю</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-2.5 text-center">
                      <div className="text-yellow-400 font-bold text-base">{bike.deposit.toLocaleString()}₽</div>
                      <div className="text-gray-500 text-xs">залог</div>
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-5">
                    {bike.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                        <i className="fas fa-check text-green-400"></i>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a href={`tel:${phoneClean}`} className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white py-3 rounded-xl font-bold text-center transition-all shadow-lg">
                    <i className="fas fa-phone mr-2"></i>Забронировать
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20 relative bg-gradient-to-b from-gray-900 to-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Как нас найти</h2>
            <p className="text-gray-400 text-lg">Приезжайте к нам или свяжитесь любым удобным способом</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-6 border border-gray-700/30">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-green-400"></i>
                Контактная информация
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-location-dot text-green-400 text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Адрес</h4>
                    <p className="text-gray-400">{settings.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-phone text-cyan-400 text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Телефон</h4>
                    <a href={`tel:${phoneClean}`} className="text-gray-400 hover:text-green-400 transition-colors">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-clock text-purple-400 text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Режим работы</h4>
                    <p className="text-gray-400">{settings.workHours}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700/30">
                <a href={`tel:${phoneClean}`} className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white py-3.5 rounded-xl font-bold text-center transition-all shadow-lg">
                  <i className="fas fa-phone mr-2"></i>Позвонить сейчас
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 overflow-hidden">
              <div className="p-4 border-b border-gray-700/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-map-marked-alt text-green-400"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Эксперт Байк</h4>
                    <p className="text-gray-400 text-xs">{settings.address}</p>
                  </div>
                </div>
                <a href={`https://yandex.ru/maps/?text=${encodeURIComponent(settings.address)}`} target="_blank" rel="noopener noreferrer" className="bg-green-500/10 hover:bg-green-500/20 text-green-400 px-3 py-2 rounded-lg text-sm font-medium transition-all">
                  <i className="fas fa-directions mr-1"></i>Маршрут
                </a>
              </div>
              <div className="h-96">
                <iframe
                  src={`https://yandex.ru/map-widget/v1/?ll=${settings.mapLng}%2C${settings.mapLat}&z=${settings.mapZoom}&pt=${settings.mapLng},${settings.mapLat},pm2rdm`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  allowFullScreen
                  title="Карта - Эксперт Байк Краснодар"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-bolt text-white text-sm"></i>
              </div>
              <span className="text-lg font-bold text-white">ЭКСПЕРТ БАЙК</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <a href="#/repair" className="text-gray-500 hover:text-green-400 transition-colors">Ремонт</a>
              <a href="#/couriers" className="text-gray-500 hover:text-green-400 transition-colors">Курьерам</a>
              <a href="#/blog" className="text-gray-500 hover:text-green-400 transition-colors">Блог</a>
              <a href="#/admin" className="text-gray-600 hover:text-green-400 transition-colors">
                <i className="fas fa-lock"></i>
              </a>
            </div>
            <p className="text-gray-500 text-xs">© 2024 Эксперт Байк</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
