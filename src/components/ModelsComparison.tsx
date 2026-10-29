import { useBikes } from '../context/BikeContext';
import { getImageUrl } from '../services/apiService';

export default function ModelsComparison() {
  const { bikes } = useBikes();

  if (bikes.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 lg:py-24 relative bg-gradient-to-b from-gray-800/50 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-4">
            <i className="fas fa-balance-scale text-blue-400"></i>
            <span className="text-blue-400 text-sm font-medium">Сравнение</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Сравнение моделей</h2>
          <p className="text-gray-400 text-base sm:text-lg">Выберите идеальный электровелосипед для ваших задач</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 overflow-hidden">
            <thead>
              <tr className="border-b border-gray-700/30">
                <th className="p-4 text-left text-gray-400 font-medium">Характеристика</th>
                {bikes.map((bike) => (
                  <th key={bike.id} className="p-4 text-center">
                    <div className="text-white font-bold text-lg">{bike.name}</div>
                    {bike.badge && (
                      <span className="inline-block bg-green-500/20 text-green-400 text-xs font-medium px-2 py-1 rounded-full mt-1">
                        {bike.badge}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700/30">
                <td className="p-4 text-gray-300 font-medium">
                  <i className="fas fa-ruble-sign text-green-400 mr-2"></i>Цена аренды
                </td>
                {bikes.map((bike) => (
                  <td key={bike.id} className="p-4 text-center text-white font-bold">
                    {bike.pricePerWeek.toLocaleString()}₽/нед
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-700/30">
                <td className="p-4 text-gray-300 font-medium">
                  <i className="fas fa-coins text-yellow-400 mr-2"></i>Залог
                </td>
                {bikes.map((bike) => (
                  <td key={bike.id} className="p-4 text-center text-white">
                    {bike.deposit.toLocaleString()}₽
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-700/30">
                <td className="p-4 text-gray-300 font-medium">
                  <i className="fas fa-list text-cyan-400 mr-2"></i>Особенности
                </td>
                {bikes.map((bike) => (
                  <td key={bike.id} className="p-4 text-center">
                    <div className="space-y-1">
                      {bike.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="text-gray-400 text-sm">
                          <i className="fas fa-check text-green-400 mr-1"></i>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4"></td>
                {bikes.map((bike) => (
                  <td key={bike.id} className="p-4 text-center">
                    <a
                      href="#contacts"
                      className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-6 py-2 rounded-lg font-bold text-sm transition-all"
                    >
                      Забронировать
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
