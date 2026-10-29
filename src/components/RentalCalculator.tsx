import { useState } from 'react';
import { useBikes } from '../context/BikeContext';

export default function RentalCalculator() {
  const { bikes, settings } = useBikes();
  const [selectedBike, setSelectedBike] = useState(bikes[0]?.id || '');
  const [weeks, setWeeks] = useState(1);
  const [showResult, setShowResult] = useState(false);

  const bike = bikes.find(b => b.id === selectedBike);
  const totalPrice = bike ? bike.pricePerWeek * weeks : 0;
  const deposit = bike?.deposit || 0;

  const calculate = () => {
    setShowResult(true);
  };

  const reset = () => {
    setShowResult(false);
    setWeeks(1);
  };

  if (bikes.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 lg:py-24 relative bg-gradient-to-b from-gray-800/50 to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-2 mb-4">
            <i className="fas fa-calculator text-cyan-400"></i>
            <span className="text-cyan-400 text-sm font-medium">Калькулятор</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Рассчитайте стоимость аренды</h2>
          <p className="text-gray-400 text-base sm:text-lg">Узнайте точную стоимость аренды электровелосипеда</p>
        </div>

        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 p-6 sm:p-8">
          {!showResult ? (
            <div className="space-y-6">
              {/* Выбор модели */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-3">Выберите модель</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {bikes.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBike(b.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        selectedBike === b.id
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                          {b.image ? (
                            <img src={b.image} alt={b.name} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <i className="fas fa-bicycle text-gray-600 text-xl"></i>
                          )}
                        </div>
                        <div>
                          <div className="text-white font-bold">{b.name}</div>
                          <div className="text-green-400 text-sm">{b.pricePerWeek.toLocaleString()}₽/неделя</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Срок аренды */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-3">Срок аренды (недель)</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setWeeks(Math.max(1, weeks - 1))}
                    className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center text-white text-xl transition-all"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center">
                    <div className="text-4xl font-bold text-white">{weeks}</div>
                    <div className="text-gray-500 text-sm">
                      {weeks === 1 ? 'неделя' : weeks < 5 ? 'недели' : 'недель'}
                    </div>
                  </div>
                  <button
                    onClick={() => setWeeks(weeks + 1)}
                    className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center text-white text-xl transition-all"
                  >
                    +
                  </button>
                </div>
                {weeks >= 4 && (
                  <div className="mt-3 bg-green-500/10 border border-green-500/30 rounded-xl p-3 text-center">
                    <p className="text-green-400 text-sm">
                      <i className="fas fa-gift mr-2"></i>
                      Скидка 15% при аренде от 4 недель!
                    </p>
                  </div>
                )}
              </div>

              {/* Кнопка расчёта */}
              <button
                onClick={calculate}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
              >
                <i className="fas fa-calculator mr-2"></i>Рассчитать стоимость
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Результат */}
              <div className="text-center">
                <div className="inline-block bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-2xl p-6 border border-green-500/20 mb-6">
                  <div className="text-gray-400 text-sm mb-2">Итоговая стоимость</div>
                  <div className="text-5xl font-bold text-green-400 mb-2">
                    {totalPrice.toLocaleString()}₽
                  </div>
                  <div className="text-gray-500 text-sm">
                    {bike?.name} • {weeks} {weeks === 1 ? 'неделя' : weeks < 5 ? 'недели' : 'недель'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="text-gray-400 text-sm mb-1">Залог</div>
                    <div className="text-yellow-400 font-bold text-xl">{deposit.toLocaleString()}₽</div>
                    <div className="text-gray-500 text-xs">возвращается</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="text-gray-400 text-sm mb-1">Итого к оплате</div>
                    <div className="text-green-400 font-bold text-xl">{(totalPrice + deposit).toLocaleString()}₽</div>
                    <div className="text-gray-500 text-xs">аренда + залог</div>
                  </div>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-6">
                  <p className="text-cyan-400 text-sm">
                    <i className="fas fa-info-circle mr-2"></i>
                    Залог возвращается при возврате велосипеда в исправном состоянии
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Здравствуйте! Хочу арендовать ${bike?.name} на ${weeks} ${weeks === 1 ? 'неделю' : weeks < 5 ? 'недели' : 'недель'}. Стоимость: ${totalPrice.toLocaleString()}₽`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <i className="fab fa-whatsapp"></i>Забронировать
                  </a>
                  <button
                    onClick={reset}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-bold transition-all"
                  >
                    <i className="fas fa-redo mr-2"></i>Пересчитать
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
