import { useBikes } from '../context/BikeContext';

export default function CourierLanding() {
  const { settings } = useBikes();
  const phoneClean = settings.phone.replace(/[^0-9+]/g, '');

  return (
    <section className="py-12 sm:py-16 lg:py-24 relative bg-gradient-to-b from-gray-900 to-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-4">
            <i className="fas fa-motorcycle text-orange-400"></i>
            <span className="text-orange-400 text-sm font-medium">Для курьеров</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            Станьте курьером на электровелосипеде
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto">
            Зарабатывайте больше с электровелосипедом от Эксперт Байк
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Левая колонка - преимущества */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/5 rounded-2xl p-6 border border-orange-500/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-rocket text-orange-400"></i>
                Почему курьеры выбирают нас?
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-green-400 mt-1 flex-shrink-0"></i>
                  <div>
                    <div className="font-semibold text-white">Увеличенный доход</div>
                    <div className="text-sm text-gray-400">Выполняйте в 2-3 раза больше заказов</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-green-400 mt-1 flex-shrink-0"></i>
                  <div>
                    <div className="font-semibold text-white">Быстрая окупаемость</div>
                    <div className="text-sm text-gray-400">Аренда окупается за 1-2 дня работы</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-green-400 mt-1 flex-shrink-0"></i>
                  <div>
                    <div className="font-semibold text-white">Бесплатное обслуживание</div>
                    <div className="text-sm text-gray-400">Все поломки чиним за наш счёт</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-green-400 mt-1 flex-shrink-0"></i>
                  <div>
                    <div className="font-semibold text-white">Подменный велосипед</div>
                    <div className="text-sm text-gray-400">Не теряйте дни работы при ремонте</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-green-400 mt-1 flex-shrink-0"></i>
                  <div>
                    <div className="font-semibold text-white">Гибкий график</div>
                    <div className="text-sm text-gray-400">Работайте когда удобно вам</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-6 border border-gray-700/30">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-handshake text-green-400"></i>
                Партнёрство с сервисами доставки
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <i className="fas fa-utensils text-yellow-400 text-2xl"></i>
                  </div>
                  <div className="text-white text-sm font-medium">Яндекс.Еда</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <i className="fas fa-box text-red-400 text-2xl"></i>
                  </div>
                  <div className="text-white text-sm font-medium">Delivery Club</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <i className="fas fa-shopping-bag text-purple-400 text-2xl"></i>
                  </div>
                  <div className="text-white text-sm font-medium">Самокат</div>
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка - статистика и CTA */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-2xl p-6 border border-green-500/20">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Сколько можно заработать?</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Заказов в день</span>
                    <span className="text-white font-bold">15-25</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Средний доход</span>
                    <span className="text-green-400 font-bold text-lg">{settings.courierEarningDay}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Стоимость аренды</span>
                    <span className="text-yellow-400 font-bold">{settings.courierRentDay}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                  <div className="text-gray-400 text-sm mb-1">Ваша чистая прибыль</div>
                  <div className="text-3xl font-bold text-green-400">2400-4400₽/день</div>
                  <div className="text-gray-500 text-xs mt-1">72 000 - 132 000₽ в месяц</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-6 border border-gray-700/30">
              <h3 className="text-xl font-bold text-white mb-4 text-center">Готовы начать?</h3>
              <p className="text-gray-400 text-center mb-6">
                Свяжитесь с нами и получите электровелосипед уже сегодня!
              </p>
              <div className="space-y-3">
                <a
                  href={`tel:${phoneClean}`}
                  className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white py-3 rounded-xl font-bold text-center transition-all shadow-lg shadow-green-500/20"
                >
                  <i className="fas fa-phone mr-2"></i>Позвонить
                </a>
                {settings.whatsapp && (
                  <a
                    href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent('Здравствуйте! Хочу узнать об условиях аренды для курьеров')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold text-center transition-all"
                  >
                    <i className="fab fa-whatsapp mr-2"></i>WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
