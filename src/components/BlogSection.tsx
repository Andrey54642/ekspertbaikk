import { useState } from 'react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Как выбрать электровелосипед для курьерской доставки в 2024 году',
    excerpt: 'Полное руководство по выбору электровелосипеда для работы курьером. Сравнение моделей, советы экспертов.',
    content: 'Полный текст статьи...',
    date: '2024-01-15',
    category: 'Советы',
  },
  {
    id: '2',
    title: 'Топ-10 маршрутов для прогулок на электровелосипеде в Краснодаре',
    excerpt: 'Лучшие маршруты для прогулок по городу и за его пределами. Карты, описания, советы.',
    content: 'Полный текст статьи...',
    date: '2024-01-10',
    category: 'Маршруты',
  },
  {
    id: '3',
    title: 'Как ухаживать за электровелосипедом: полное руководство',
    excerpt: 'Советы по обслуживанию, зарядке батареи, хранению. Продлите жизнь вашему электровелосипеду.',
    content: 'Полный текст статьи...',
    date: '2024-01-05',
    category: 'Обслуживание',
  },
  {
    id: '4',
    title: 'Сколько стоит содержать электровелосипед: расчёт затрат',
    excerpt: 'Детальный расчёт расходов на электровелосипед: электричество, обслуживание, ремонт.',
    content: 'Полный текст статьи...',
    date: '2024-01-01',
    category: 'Финансы',
  },
  {
    id: '5',
    title: 'Электровелосипед vs обычный велосипед: сравнение для курьеров',
    excerpt: 'Подробное сравнение электровелосипеда и обычного велосипеда для курьерской доставки.',
    content: 'Полный текст статьи...',
    date: '2023-12-25',
    category: 'Сравнения',
  },
  {
    id: '6',
    title: 'Почему курьеры выбирают аренду электровелосипедов',
    excerpt: 'Преимущества аренды перед покупкой. Опыт реальных курьеров.',
    content: 'Полный текст статьи...',
    date: '2023-12-20',
    category: 'Для курьеров',
  },
];

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...new Set(blogPosts.map(p => p.category))];
  const filteredPosts = filter === 'all' ? blogPosts : blogPosts.filter(p => p.category === filter);

  if (selectedPost) {
    return (
      <section className="py-12 sm:py-16 lg:py-24 relative bg-gradient-to-b from-gray-900 to-gray-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSelectedPost(null)}
            className="mb-6 text-green-400 hover:text-green-300 transition-colors flex items-center gap-2"
          >
            <i className="fas fa-arrow-left"></i>
            Назад к статьям
          </button>

          <article className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 p-6 sm:p-8">
            <div className="mb-6">
              <span className="inline-block bg-green-500/20 text-green-400 text-xs font-medium px-3 py-1 rounded-full mb-3">
                {selectedPost.category}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                {selectedPost.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-500 text-sm">
                <span>
                  <i className="fas fa-calendar mr-2"></i>
                  {new Date(selectedPost.date).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>

            {selectedPost.image && (
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-64 sm:h-80 object-cover rounded-xl mb-6"
              />
            )}

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                {selectedPost.excerpt}
              </p>
              <p className="text-gray-400 text-base leading-relaxed">
                {selectedPost.content}
              </p>
            </div>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-24 relative bg-gradient-to-b from-gray-900 to-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-4">
            <i className="fas fa-newspaper text-purple-400"></i>
            <span className="text-purple-400 text-sm font-medium">Блог</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Полезные статьи</h2>
          <p className="text-gray-400 text-base sm:text-lg">Советы, руководства и новости из мира электровелосипедов</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === category
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {category === 'all' ? 'Все' : category}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 overflow-hidden cursor-pointer hover:border-green-500/30 transition-all group"
            >
              {post.image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block bg-green-500/20 text-green-400 text-xs font-medium px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {new Date(post.date).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-green-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3">{post.excerpt}</p>
                <div className="mt-4 text-green-400 text-sm font-medium flex items-center gap-2">
                  Читать далее
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
