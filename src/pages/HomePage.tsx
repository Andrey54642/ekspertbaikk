import { useState, useEffect } from 'react';
import { useBikes } from '../context/BikeContext';

export default function HomePage() {
  const { bikes, settings, isLoading } = useBikes();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              <span className="text-white text-2xl sm:text-3xl lg:text-5xl">от {bikes.length > 0 ? Math.min(...bikes.map(b => b.pricePerWeek)).toLocaleString() : '4000'}₽/неделя</span>
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
                <div className="text-xl sm:text-2xl font-bold text-green-400">{bikes.length}</div>
                <div className="text-gray-500 text-xs sm:text-sm">моделей</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-green-400">{bikes.length > 0 ? Math.min(...bikes.map(b => b.pricePerWeek)).toLocaleString() : '4000'}₽</div>
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
                    <div className={`absolute top-0 right-0 bg-gradient-to-l from-green-500 to-emerald-600 text-white px-4 py-1.5 rounded-bl-2xl text-xs font-bold z-10`}>
                      {bike.badge}
                    </div>
                  )}
                  <div className="p-6">
                    <div className={`w-full h-48 bg-gradient-to-br ${accent.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-500 overflow-hidden`}>
                      {bike.image ? (
                        <img src={bike.image} alt={bike.name} className="w-full h-full object-cover" loading="lazy" />
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

      {/* Advantages Section */}
      <section id="advantages" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-green-400 font-semibold text-sm uppercase tracking-wider mb-3">Почему мы</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Наши преимущества</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Мы делаем аренду электровелосипедов простой, удобной и доступной для каждого</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: 'fa-ruble-sign', bg: 'bg-green-500/20', text: 'text-green-400', title: 'Доступные цены', desc: `Аренда от ${bikes.length > 0 ? Math.min(...bikes.map(b => b.pricePerWeek)).toLocaleString() : '4000'}₽ в неделю. Минимальный залог всего 1500₽.` },
              { icon: 'fa-clock', bg: 'bg-cyan-500/20', text: 'text-cyan-400', title: 'Быстрое оформление', desc: 'Оформление аренды за 10 минут. Минимум документов.' },
              { icon: 'fa-tools', bg: 'bg-purple-500/20', text: 'text-purple-400', title: 'Техобслуживание', desc: 'Все велосипеды проходят полную проверку перед выдачей.' },
              { icon: 'fa-map-marker-alt', bg: 'bg-yellow-500/20', text: 'text-yellow-400', title: 'Удобное расположение', desc: 'Находимся в центре Краснодара. Легко добраться.' },
              { icon: 'fa-headset', bg: 'bg-red-500/20', text: 'text-red-400', title: 'Поддержка 24/7', desc: 'Всегда на связи. Поможем в любое время суток.' },
              { icon: 'fa-leaf', bg: 'bg-emerald-500/20', text: 'text-emerald-400', title: 'Экологичность', desc: 'Нулевые выбросы CO₂. Экологично и бесшумно.' },
            ].map((item, idx) => (
              <div key={idx} className="group bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-5 sm:p-6 border border-gray-700/30 hover:border-green-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/5">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 ${item.bg} rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                  <i className={`fas ${item.icon} ${item.text} text-lg sm:text-xl`}></i>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Repair Section */}
      <section id="repair" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 via-gray-900 to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="inline-block text-green-400 font-semibold text-sm uppercase tracking-wider mb-3">Сервис</span>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">Профессиональный ремонт электровелосипедов</h2>
              <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                Наши мастера имеют большой опыт работы с электровелосипедами любых моделей.
                Выполняем ремонт любой сложности.
              </p>

              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {[
                  { icon: 'fa-battery-full', title: 'Ремонт аккумуляторов', desc: 'Восстановление, замена ячеек, диагностика' },
                  { icon: 'fa-microchip', title: 'Ремонт электроники', desc: 'Контроллеры, дисплеи, проводка' },
                  { icon: 'fa-cog', title: 'Механический ремонт', desc: 'Тормоза, переключатели, колёса' },
                  { icon: 'fa-bolt', title: 'Ремонт мотор-колёс', desc: 'Диагностика электродвигателей' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 sm:gap-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className={`fas ${item.icon} text-green-400 text-sm sm:text-base`}></i>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm sm:text-base">{item.title}</h4>
                      <p className="text-gray-400 text-xs sm:text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href={`tel:${phoneClean}`} className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all shadow-xl shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 min-h-[48px]">
                <i className="fas fa-phone"></i>Записаться на ремонт
              </a>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-3xl border border-gray-700/50 p-5 sm:p-8">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <i className="fas fa-wrench text-green-400 text-2xl sm:text-3xl"></i>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Почему выбирают нас</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {['Опытные мастера', 'Оригинальные запчасти', 'Гарантия на работу', 'Быстрые сроки', 'Бесплатная диагностика'].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 sm:gap-3 bg-gray-800/50 rounded-xl p-3 sm:p-4">
                      <i className="fas fa-check-circle text-green-400 text-sm sm:text-base"></i>
                      <span className="text-gray-300 text-sm sm:text-base">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-3xl border border-green-500/20 p-6 sm:p-10 md:p-16 backdrop-blur-sm">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <i className="fas fa-bolt text-white text-xl sm:text-2xl"></i>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Готовы к поездке?</h2>
            <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto">
              Позвоните нам прямо сейчас и заберите электровелосипед уже сегодня!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a href={`tel:${phoneClean}`} className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all shadow-xl shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 min-h-[48px] flex items-center justify-center">
                <i className="fas fa-phone mr-2"></i>Позвонить сейчас
              </a>
              <a href={`https://wa.me/${settings.whatsapp}`} className="border-2 border-green-500/50 hover:border-green-400 text-green-400 hover:text-green-300 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all hover:bg-green-500/5 min-h-[48px] flex items-center justify-center">
                <i className="fab fa-whatsapp mr-2"></i>WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts + Map Section */}
      <section id="contacts" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-green-400 font-semibold text-sm uppercase tracking-wider mb-3">Контакты</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Как нас найти</h2>
            <p className="text-gray-400 text-lg">Приходите к нам или свяжитесь любым удобным способом</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-10">
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-5 sm:p-6 border border-gray-700/30 text-center hover:border-green-500/30 transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <i className="fas fa-map-marker-alt text-green-400 text-lg sm:text-xl"></i>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">Адрес</h3>
              <p className="text-gray-400 text-sm sm:text-base">{settings.address}</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-5 sm:p-6 border border-gray-700/30 text-center hover:border-green-500/30 transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <i className="fas fa-phone text-cyan-400 text-lg sm:text-xl"></i>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">Телефон</h3>
              <a href={`tel:${phoneClean}`} className="text-gray-400 hover:text-green-400 transition-colors text-sm sm:text-base">{settings.phone}</a>
            </div>

            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-5 sm:p-6 border border-gray-700/30 text-center hover:border-green-500/30 transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <i className="fas fa-clock text-purple-400 text-lg sm:text-xl"></i>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">Режим работы</h3>
              <p className="text-gray-400 text-sm sm:text-base">{settings.workHours}</p>
            </div>
          </div>

          {/* Map */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 overflow-hidden">
              <div className="p-4 border-b border-gray-700/30 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-map-marked-alt text-green-400"></i>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm sm:text-base">Эксперт Байк</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">{settings.address}</p>
                </div>
                <a
                  href={`https://yandex.ru/maps/?text=${encodeURIComponent(settings.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto bg-green-500/10 hover:bg-green-500/20 text-green-400 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all"
                >
                  <i className="fas fa-directions mr-1"></i>
                  <span className="hidden sm:inline">Маршрут</span>
                </a>
              </div>
              <div className="h-72 sm:h-96">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=38.9753%2C45.0355&z=15&mode=search&sctx=ZAAAAAgBEAAaKAoSCX9S%2FkOx1kVAER1sFxlA1kRAIxgKOQC4l34a8SiFU0Aa82ozlD8RAAgCkgQi0j8%2BoAEA4AEAggSyA0h5dG9tZWxpbmtpLnJ1nQII5gM%2BcG9pbnQ%2BcG9pbnT//wEIo+Xk%2FQAgAICq9N76BjIGKjAwMjAdMB4gATAB0gEFYgEANdYBuAEAvwGbwAEBwgEJZGF0YSB1cmkK5gECPXN0cmVldC1zZWFyY2hfbWFwYgEANgFA8gECCBgbAJoEAggBUAE%2B8gEDCgIwADICJWFi5gECKAgAogQAGAAgBogGAqgGAcgGAegGAfAGApIIAggB8gECyAEC2gECCgIoAegB6AEB%2BgED0gECCgEv%2FgEA%2BgEE0gECCgE0%2FgEA%2BgEF0gECCgEx8gEA%2BgEG0gECCgEw8gEA0gECCgEy8gEA8gEDCgEz8gEA8gEDCgE08gEA8gEDCgE18gEA8gEDCgE28gEA8gEDCgE38gEA8gEDCgE48gEA8gEDCgE58gEA8gECCgEw8gEA8gECCgEx8gEA8gECCgEy8gEA8gECCgEz8gEA8gECCgE08gEA8gECCgE18gEA8gECCgE28gEA8gECCgE38gEA8gECCgE48gEA8gECCgE58gEA8gECCgEw8gEA8gECCgEx8gEA8gECCgEy8gEA8gECCgEz8gEA8gECCgE08gEA8gECCgE18gEA8gECCgE28gEA8gECCgE38gEA8gECCgE48gEA8gECCgE58gEA8gECyAEC2AEA8gEC0gEDCgEv8gEA8gEDCgEw8gEA8gEDCgEx8gEA8gEDCgEy8gEA8gEDCgEz8gEA8gEDCgE08gEA8gEDCgE18gEA8gEDCgE28gEA8gEDCgE38gEA8gEDCgE48gEA8gEDCgE58gEA8gEC"
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
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-green-500/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-green-400 transition-all">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
