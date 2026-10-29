import { useState, useEffect } from 'react';
import { useBikes } from '../context/BikeContext';

export default function ReviewsSlider() {
  const { settings } = useBikes();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const reviews = settings.reviews || [];

  useEffect(() => {
    if (!isAutoPlaying || reviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  if (reviews.length === 0) return null;

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 relative bg-gradient-to-b from-gray-900 to-gray-800/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Отзывы наших клиентов</h2>
          <p className="text-gray-400 text-base sm:text-lg">Что говорят о нас курьеры и обычные пользователи</p>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 p-6 sm:p-8 min-h-[300px] flex items-center">
            <div className="w-full">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400 text-lg"></i>
                ))}
              </div>
              <p className="text-gray-300 text-base sm:text-lg mb-6 leading-relaxed italic">
                "{reviews[currentIndex].text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {reviews[currentIndex].name[0]}
                </div>
                <div>
                  <div className="text-white font-bold text-lg">{reviews[currentIndex].name}</div>
                  <div className="text-gray-500 text-sm">{reviews[currentIndex].role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white shadow-xl transition-all hover:scale-110 border border-gray-700"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white shadow-xl transition-all hover:scale-110 border border-gray-700"
          >
            <i className="fas fa-chevron-right"></i>
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-green-500 w-8' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
