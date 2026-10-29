import { useBikes } from '../context/BikeContext';

export default function RepairServiceLanding() {
  const { settings } = useBikes();
  const phoneClean = settings.phone.replace(/[^0-9+]/g, '');

  const services = [
    {
      icon: 'fa-battery-full',
      title: 'Ремонт аккумуляторов',
      description: 'Восстановление, замена ячеек, диагностика батареи',
      price: 'от 2000₽',
      color: 'green',
    },
    {
      icon: 'fa-microchip',
      title: 'Ремонт электроники',
      description: 'Контроллеры, дисплеи, проводка, датчики',
      price: 'от 1500₽',
      color: 'cyan',
    },
    {
      icon: 'fa-cog',
      title: 'Механический ремонт',
      description: 'Тормоза, переключатели, колёса, рама',
      price: 'от 1000₽',
      color: 'purple',
    },
    {
      icon: 'fa-bolt',
      title: 'Ремонт мотор-колёс',
      description: 'Диагностика и ремонт электродвигателей',
      price: 'от 3000₽',
      color: 'yellow',
    },
    {
      icon: 'fa-bicycle',
      title: 'Ремонт электросамокатов',
      description: 'Полный спектр услуг для электросамокатов',
      price: 'от 1500₽',
      color: 'pink',
    },
    {
      icon: 'fa-tools',
      title: 'Техобслуживание',
      description: 'Плановое ТО, чистка, смазка, регулировка',
      price: 'от 800₽',
      color: 'red',
    },
  ];

  const getColorClasses = (color: string) => {
    const map: Record<string, { bg: string; text: string; border: string }> = {
      green: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
      cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
      purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
      yellow: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
      pink: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30' },
      red: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
    };
    return map[color] || map.green;
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 relative bg-gradient-to-b from-gray-800/50 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-4">
            <i className="fas fa-wrench text-red-400"></i>
            <span className="text-red-400 text-sm font-medium">Мастерская</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            Ремонт электровелосипедов и электросамокатов
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto">
            Профессиональная мастерская с опытом более 5 лет. Ремонтируем все модели.
          </p>
        </div>

        {/* Услуги */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {services.map((service, idx) => {
            const colors = getColorClasses(service.color);
            return (
              <div
                key={idx}
                className={`bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-6 border border-gray-700/30 hover:${colors.border} transition-all`}
              >
                <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <i className={`fas ${service.icon} ${colors.text} text-2xl`}></i>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{service.description}</p>
                <div className={`${colors.text} font-bold`}>{service.price}</div>
              </div>
            );
          })}
        </div>

        {/* Преимущества */}
        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/5 rounded-2xl p-6 sm:p-8 border border-red-500/20 mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">Почему выбирают нашу мастерскую?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-certificate text-green-400 text-2xl"></i>
              </div>
              <h4 className="text-white font-semibold mb-2">Гарантия</h4>
              <p className="text-gray-400 text-sm">На все виды работ</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-clock text-cyan-400 text-2xl"></i>
              </div>
              <h4 className="text-white font-semibold mb-2">Быстро</h4>
              <p className="text-gray-400 text-sm">Ремонт за 1-3 дня</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-ruble-sign text-purple-400 text-2xl"></i>
              </div>
              <h4 className="text-white font-semibold mb-2">Честные цены</h4>
              <p className="text-gray-400 text-sm">Без скрытых платежей</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-yellow-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-user-tie text-yellow-400 text-2xl"></i>
              </div>
              <h4 className="text-white font-semibold mb-2">Опыт</h4>
              <p className="text-gray-400 text-sm">Более 5 лет работы</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Нужен ремонт?</h3>
          <p className="text-gray-400 mb-6">Привозите велосипед или самокат — сделаем бесплатную диагностику!</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${phoneClean}`}
              className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-400 hover:to-orange-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105 min-h-[48px] flex items-center justify-center"
            >
              <i className="fas fa-phone mr-2"></i>Позвонить
            </a>
            {settings.whatsapp && (
              <a
                href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent('Здравствуйте! Нужен ремонт электровелосипеда/самоката')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-red-500/50 hover:border-red-400 text-red-400 hover:text-red-300 px-8 py-4 rounded-full text-lg font-bold transition-all hover:bg-red-500/5 min-h-[48px] flex items-center justify-center"
              >
                <i className="fab fa-whatsapp mr-2"></i>WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
