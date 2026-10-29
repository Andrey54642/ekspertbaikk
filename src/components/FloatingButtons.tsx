import { useState, useEffect } from 'react';
import { useBikes } from '../context/BikeContext';

export default function FloatingButtons() {
  const { settings } = useBikes();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {/* WhatsApp Button */}
      {settings.whatsapp && (
        <a
          href={`https://wa.me/${settings.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50 transition-all hover:scale-110 animate-pulse"
          title="Написать в WhatsApp"
        >
          <i className="fab fa-whatsapp text-white text-2xl"></i>
          <span className="absolute right-full mr-3 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Написать в WhatsApp
          </span>
        </a>
      )}

      {/* Telegram Button */}
      {settings.telegram && (
        <a
          href={settings.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 transition-all hover:scale-110"
          title="Написать в Telegram"
        >
          <i className="fab fa-telegram text-white text-2xl"></i>
          <span className="absolute right-full mr-3 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Написать в Telegram
          </span>
        </a>
      )}

      {/* Phone Button */}
      <a
        href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
        className="group relative w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50 transition-all hover:scale-110"
        title="Позвонить"
      >
        <i className="fas fa-phone text-white text-xl"></i>
        <span className="absolute right-full mr-3 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {settings.phone}
        </span>
      </a>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-14 h-14 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 border border-gray-700"
          title="Наверх"
        >
          <i className="fas fa-arrow-up text-white text-xl"></i>
        </button>
      )}
    </div>
  );
}
