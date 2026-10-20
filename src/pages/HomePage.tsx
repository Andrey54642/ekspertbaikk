import { useState, useEffect } from 'react';
import { useBikes } from '../context/BikeContext';
import { resolveImageUrl, isLocalImage } from '../services/imageStorage';

export default function HomePage() {
  const { bikes, settings } = useBikes();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resolvedImages, setResolvedImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Загружаем изображения из IndexedDB
  useEffect(() => {
    const loadImages = async () => {
      const images: Record<string, string> = {};
      for (const bike of bikes) {
        if (bike.image && isLocalImage(bike.image)) {
          const resolved = await resolveImageUrl(bike.image);
          if (resolved) {
            images[bike.id] = resolved;
          }
        } else if (bike.image) {
          images[bike.id] = bike.image;
        }
      }
      setResolvedImages(images);
    };
    loadImages();
  }, [bikes]);

  const getAccentClasses = (color: string) => {
    const map: Record<string, { border: string; text: string; bg: string; shadow: string; check: string; btn: string }> = {
      green: {
        border: 'hover:border-green-500/50',
        text: 'text-green-400',
        bg: 'from-green-500/10 to-emerald-500/5',
        shadow: 'hover:shadow-green-500/10',
        check: 'text-green-400',
        btn: 'from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 shadow-green-500/20 hover:shadow-green-500/30',
      },
      cyan: {
        border: 'hover:border-cyan-500/50',
        text: 'text-cyan-400',
        bg: 'from-cyan-500/10 to-blue-500/5',
        shadow: 'hover:shadow-cyan-500/10',
        check: 'text-cyan-400',
        btn: 'from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-cyan-500/20 hover:shadow-cyan-500/30',
      },
      purple: {
        border: 'hover:border-purple-500/50',
        text: 'text-purple-400',
        bg: 'from-purple-500/10 to-pink-500/5',
        shadow: 'hover:shadow-purple-500/10',
        check: 'text-purple-400',
        btn: 'from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 shadow-purple-500/20 hover:shadow-purple-500/30',
      },
      yellow: {
        border: 'hover:border-yellow-500/50',
        text: 'text-yellow-400',
        bg: 'from-yellow-500/10 to-orange-500/5',
        shadow: 'hover:shadow-yellow-500/10',
        check: 'text-yellow-400',
        btn: 'from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 shadow-yellow-500/20 hover:shadow-yellow-500/30',
      },
      red: {
        border: 'hover:border-red-500/50',
        text: 'text-red-400',
        bg: 'from-red-500/10 to-pink-500/5',
        shadow: 'hover:shadow-red-500/10',
        check: 'text-red-400',
        btn: 'from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 shadow-red-500/20 hover:shadow-red-500/30',
      },
      pink: {
        border: 'hover:border-pink-500/50',
        text: 'text-pink-400',
        bg: 'from-pink-500/10 to-rose-500/5',
        shadow: 'hover:shadow-pink-500/10',
        check: 'text-pink-400',
        btn: 'from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 shadow-pink-500/20 hover:shadow-pink-500/30',
      },
    };
    return map[color] || map.green;
  };

  const phoneClean = settings.phone.replace(/[^0-9+]/g, '');

  return (
    <div className="min-h-screen bg-gray-900 text-white font-['Inter',sans-serif]">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg shadow-green-500/5' : 'bg-transparent'}`}>
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

            <div className="hidden md:flex items-center gap-8">
              <a href="#bikes" className="text-gray-300 hover:text-green-400 transition-colors text-sm font-medium">Электровелосипеды</a>
              <a href="#advantages" className="text-gray-300 hover:text-green-400 transition-colors text-sm font-medium">Преимущества</a>
              <a href="#repair" className="text-gray-300 hover:text-green-400 transition-colors text-sm font-medium">Ремонт</a>
              <a href="#contacts" className="text-gray-300 hover:text-green-400 transition-colors text-sm font-medium">Контакты</a>
              <a href={`tel:${phoneClean}`} className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40">
                <i className="fas fa-phone mr-2"></i>Позвонить
              </a>
            </div>

            <button
              className="md:hidden text-white text-2xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900/98 backdrop-blur-md border-t border-gray-800">
            <div className="px-4 py-4 space-y-3">
              <a href="#bikes" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-green-400 py-2">Электровелосипеды</a>
              <a href="#advantages" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-green-400 py-2">Преимущества</a>
              <a href="#repair" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-green-400 py-2">Ремонт</a>
              <a href="#contacts" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-green-400 py-2">Контакты</a>
              <a href={`tel:${phoneClean}`} className="block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-3 rounded-full text-center font-semibold mt-4">
                <i className="fas fa-phone mr-2"></i>Позвонить
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-green-400 text-xs sm:text-sm font-medium">Аренда и ремонт в Краснодаре</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black leading-tight mb-4 sm:mb-6">
              <span className="text-white">Электровелосипеды</span>
              <br />
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">в аренду</span>
              <br />
              <span className="text-white text-2xl sm:text-3xl lg:text-5xl">от {Math.min(...bikes.map(b => b.pricePerWeek), 4000).toLocaleString()}₽/неделя</span>
            </h1>

            <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 max-w-lg mx-auto leading-relaxed">
              Мощные, стильные и экологичные электровелосипеды для города и природы.
              Забирайте сегодня — покоряйте дороги уже завтра!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 justify-center">
              <a href="#bikes" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all shadow-xl shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 min-h-[48px] flex items-center justify-center">
                <i className="fas fa-bicycle mr-2"></i>Выбрать велосипед
              </a>
              <a href="#repair" className="border-2 border-gray-600 hover:border-green-500 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all hover:bg-green-500/5 min-h-[48px] flex items-center justify-center">
                <i className="fas fa-wrench mr-2"></i>Ремонт
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-md mx-auto">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-green-400">{bikes.length}+</div>
                <div className="text-gray-500 text-xs sm:text-sm">моделей</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-green-400">{Math.min(...bikes.map(b => b.pricePerWeek), 4000).toLocaleString()}₽</div>
                <div className="text-gray-500 text-xs sm:text-sm">от / неделя</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-green-400">1 день</div>
                <div className="text-gray-500 text-xs sm:text-sm">ремонт</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bikes Section */}
      <section id="bikes" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800/50 to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-green-400 font-semibold text-sm uppercase tracking-wider mb-3">Наш автопарк</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Выберите свой электровелосипед</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Мощные электровелосипеды для комфортных поездок по городу и за его пределами</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {bikes.map((bike) => {
              const accent = getAccentClasses(bike.accentColor);
              return (
                <div key={bike.id} className={`group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-3xl border border-gray-700/50 overflow-hidden ${accent.border} transition-all duration-500 hover:shadow-2xl ${accent.shadow}`}>
                  {bike.badge && (
                    <div className={`absolute top-0 right-0 bg-gradient-to-l from-green-500 to-emerald-600 text-white px-4 py-1.5 rounded-bl-2xl text-xs font-bold`}>
                      {bike.badge}
                    </div>
                  )}
                  <div className="p-6">
                    <div className={`w-full h-48 bg-gradient-to-br ${accent.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-500 overflow-hidden`}>
                      {resolvedImages[bike.id] ? (
                        <img src={resolvedImages[bike.id]} alt={bike.name} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <i className={`fas fa-bicycle text-6xl ${accent.text} opacity-60`}></i>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{bike.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{bike.description}</p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-800/50 rounded-xl p-2.5 text-center">
                        <div className={`${accent.text} font-bold text-base`}>{bike.pricePerWeek.toLocaleString()}₽</div>
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
                          <i className={`fas fa-check ${accent.check}`}></i>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <a href={`tel:${phoneClean}`} className={`block w-full bg-gradient-to-r ${accent.btn} text-white py-3 rounded-xl font-bold text-center transition-all shadow-lg`}>
                      <i className="fas fa-phone mr-2"></i>Забронировать
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {bikes.length === 0 && (
            <div className="text-center py-16">
              <i className="fas fa-bicycle text-gray-600 text-5xl mb-4"></i>
              <p className="text-gray-400 text-lg">Скоро здесь появятся электровелосипеды!</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-bolt text-white text-sm"></i>
              </div>
              <span className="text-base sm:text-lg font-bold text-white">ЭКСПЕРТ БАЙК</span>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm text-center">
              © 2024 Эксперт Байк. Аренда и ремонт электровелосипедов в Краснодаре.
              <a href="#/admin" className="ml-2 text-gray-600 hover:text-green-400 transition-colors">
                <i className="fas fa-lock text-xs"></i>
              </a>
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              <a href={`https://wa.me/${settings.whatsapp}`} className="w-10 h-10 bg-gray-800 hover:bg-green-500/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-green-400 transition-all">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href={`tel:${phoneClean}`} className="w-10 h-10 bg-gray-800 hover:bg-green-500/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-green-400 transition-all">
                <i className="fab fa-telegram"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
