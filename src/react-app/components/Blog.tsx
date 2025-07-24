import { Calendar, User, ArrowRight, Clock, Tag } from 'lucide-react';
import { useState } from 'react';
import { useBlogPosts, useBlogCategories } from '@/react-app/hooks/useBlogPosts';
import { useNavigate } from 'react-router';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { posts, loading: postsLoading } = useBlogPosts(selectedCategory);
  const { categories, loading: categoriesLoading } = useBlogCategories();
  const navigate = useNavigate();

  const allCategories = ['all', ...categories];
  const handleReadMore = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  if (postsLoading || categoriesLoading) {
    return (
      <section id="blog" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-500/10 rounded-full px-6 py-2 mb-6">
            <Calendar className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-blue-600 text-sm font-medium uppercase tracking-wide">
              Blog Empresarial
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Conhecimento <span className="text-blue-600">Empresarial</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mantenha-se atualizado com as últimas novidades em direito empresarial e SST. 
            Artigos especializados para orientar sua empresa.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-blue-500/10 hover:text-blue-600'
              }`}
            >
              {category === 'all' ? 'Todos' : category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Nenhum post encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image_url || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.read_time}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handleReadMore(post.slug)}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
                  >
                    <span>Ler mais</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
