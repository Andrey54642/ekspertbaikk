import { useState } from 'react';
import { useBikes } from '../context/BikeContext';

export default function SEOSections() {
  const { settings } = useBikes();
  const [formData, setFormData] = useState({ name: '', phone: '', service: 'Аренда электровелосипеда' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
    setFormData({ name: '', phone: '', service: 'Аренда электровелосипеда' });
  };

  return (
    <>
      {/* Как арендовать - Пошаговая инструкция */}
      {settings.showRentSteps && settings.rentSteps.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-24 relative bg-gradient-to-b from-gray-900 to-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Как арендовать электровелосипед</h2>
              <p className="text-gray-400 text-base sm:text-lg">Простая процедура аренды за {settings.rentSteps.length} шагов</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {settings.rentSteps.map((step, idx) => (
                <div key={step.id || idx} className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/30 text-center">
                  <div className="absolute -top-3 -left-3 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg">
                    {step.num}
                  </div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <i className={`fas ${step.icon} text-green-400 text-xl sm:text-2xl`}></i>
                  </div>
                  <h3 className="text-white font-bold text-sm sm:text-base mb-1 sm:mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Для курьеров - Специальные условия */}
      {settings.showCourierSection && (
        <section className="py-12 sm:py-16 lg:py-24 relative bg-gradient-to-b from-gray-800/50 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-4">
                <i className="fas fa-motorcycle text-green-400"></i>
                <span className="text-green-400 text-sm font-medium">Для курьеров</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Специальные условия для курьеров</h2>
              <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto">
                Работаете в Яндекс.Еде, Delivery Club, Самокате? У нас есть выгодные предложения для вас!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-xl sm:rounded-2xl p-6 border border-green-500/20">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-star text-yellow-400"></i>
                  Преимущества для курьеров
                </h3>
                <ul className="space-y-3 text-gray-300 text-sm sm:text-base">
                  {settings.courierBenefits.map((benefit, idx) => (
                    <li key={benefit.id || idx} className="flex items-start gap-2">
                      <i className="fas fa-check text-green-400 mt-1 flex-shrink-0"></i>
                      <span>{benefit.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-xl sm:rounded-2xl p-6 border border-gray-700/30">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-calculator text-cyan-400"></i>
                  Сколько можно заработать?
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-sm">Средний доход в день</span>
                      <span className="text-green-400 font-bold text-lg">{settings.courierEarningDay}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-sm">Аренда в день</span>
                      <span className="text-yellow-400 font-bold text-lg">{settings.courierRentDay}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">Ваша прибыль</span>
                      <span className="text-green-400 font-bold text-xl">2400-4400₽/день</span>
                    </div>
                  </div>
                </div>
                <a href="#contacts" className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white py-3 rounded-lg sm:rounded-xl font-bold text-center transition-all shadow-lg shadow-green-500/20 mt-4">
                  <i className="fas fa-phone mr-2"></i>Узнать подробнее
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Отзывы клиентов */}
      {settings.showReviews && settings.reviews.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-24 relative bg-gradient-to-b from-gray-900 to-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Отзывы наших клиентов</h2>
              <p className="text-gray-400 text-base sm:text-lg">Что говорят о нас курьеры и обычные пользователи</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {settings.reviews.map((review) => (
                <div key={review.id} className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/30">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">"{review.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                      {review.name[0]}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm sm:text-base">{review.name}</div>
                      <div className="text-gray-500 text-xs sm:text-sm">{review.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Районы обслуживания */}
      {settings.showDistricts && settings.districts.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-24 relative bg-gradient-to-b from-gray-800/50 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Районы обслуживания в Краснодаре</h2>
              <p className="text-gray-400 text-base sm:text-lg">Доставляем электровелосипеды во все районы города</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
              {settings.districts.map((district, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-700/30 text-center hover:border-green-500/30 transition-all">
                  <i className="fas fa-map-marker-alt text-green-400 text-sm sm:text-base mb-1 sm:mb-2"></i>
                  <p className="text-white text-xs sm:text-sm font-medium">{district}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-6 sm:mt-8">
              <p className="text-gray-400 text-sm sm:text-base">
                Не нашли свой район? <a href="#contacts" className="text-green-400 hover:underline">Свяжитесь с нами</a> — мы работаем по всему Краснодару!
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Рядом с нами */}
      {settings.showLandmarks && settings.landmarks.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-24 relative bg-gradient-to-b from-gray-900 to-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Рядом с нашей мастерской</h2>
              <p className="text-gray-400 text-base sm:text-lg">Удобное расположение в центре Краснодара</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {settings.landmarks.map((place) => (
                <div key={place.id} className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/30 text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <i className={`fas ${place.icon} text-green-400 text-xl sm:text-2xl`}></i>
                  </div>
                  <h3 className="text-white font-bold text-sm sm:text-base mb-1">{place.name}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">{place.distance} от нас</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Акции и скидки */}
      {settings.showPromos && settings.promos.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-24 relative bg-gradient-to-b from-gray-800/50 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-4">
                <i className="fas fa-fire text-red-400"></i>
                <span className="text-red-400 text-sm font-medium">Акции</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Акции и скидки</h2>
              <p className="text-gray-400 text-base sm:text-lg">Специальные предложения для наших клиентов</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {settings.promos.map((promo) => {
                const colorMap: Record<string, { bg: string; text: string; border: string }> = {
                  green: { bg: 'from-green-500/10 to-emerald-500/5', text: 'text-green-400', border: 'border-green-500/20' },
                  cyan: { bg: 'from-cyan-500/10 to-blue-500/5', text: 'text-cyan-400', border: 'border-cyan-500/20' },
                  purple: { bg: 'from-purple-500/10 to-pink-500/5', text: 'text-purple-400', border: 'border-purple-500/20' },
                };
                const colors = colorMap[promo.color] || colorMap.green;

                return (
                  <div key={promo.id} className={`bg-gradient-to-br ${colors.bg} rounded-xl sm:rounded-2xl p-6 border ${colors.border} text-center`}>
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <i className={`fas ${promo.icon} ${colors.text} text-2xl sm:text-3xl`}></i>
                    </div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">{promo.title}</h3>
                    <div className={`${colors.text} font-bold text-2xl sm:text-3xl mb-3`}>{promo.discount}</div>
                    <p className="text-gray-400 text-sm">{promo.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-6 sm:mt-8">
              <a href="#contacts" className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all shadow-xl shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 min-h-[48px]">
                <i className="fas fa-phone"></i>Получить скидку
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Форма обратной связи */}
      {settings.showContactForm && (
        <section className="py-12 sm:py-16 lg:py-24 relative bg-gradient-to-b from-gray-900 to-gray-800/50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Оставить заявку</h2>
              <p className="text-gray-400 text-base sm:text-lg">Заполните форму и мы свяжемся с вами в ближайшее время</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-700/30">
              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-check text-green-400 text-3xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Заявка отправлена!</h3>
                  <p className="text-gray-400">Мы свяжемся с вами в ближайшее время</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Ваше имя</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all min-h-[44px]"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Телефон</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all min-h-[44px]"
                      placeholder="+7 (900) 123-45-67"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Услуга</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all min-h-[44px]"
                    >
                      <option>Аренда электровелосипеда</option>
                      <option>Ремонт электровелосипеда</option>
                      <option>Консультация</option>
                      <option>Условия для курьеров</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/30 min-h-[48px]"
                  >
                    <i className="fas fa-paper-plane mr-2"></i>Отправить заявку
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
