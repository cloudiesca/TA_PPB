import { useFeaturedProducts } from '../hooks/useProducts';
import HeroSection from '../components/home/HeroSection';
import FeaturedSection from '../components/home/FeaturedSection';

export default function HomePage({ onNavigate, onProductClick }) {
    // Fetch featured products for men
    const {
        products: menProducts,
        loading: menLoading,
        error: menError,
    } = useFeaturedProducts('men', 3);

    // Fetch featured products for women
    const {
        products: womenProducts,
        loading: womenLoading,
        error: womenError,
    } = useFeaturedProducts('women', 3);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Hero Section */}
            <HeroSection />

            {/* Men's Fashion Section */}
            <FeaturedSection
                title="Men's Fashion"
                subtitle="Trending styles for modern gentlemen"
                products={menProducts}
                loading={menLoading}
                error={menError}
                onProductClick={onProductClick}
                onViewAll={() => onNavigate('men')}
                gender="men"
            />

            {/* Women's Fashion Section */}
            <FeaturedSection
                title="Women's Fashion"
                subtitle="Elegant collection for sophisticated women"
                products={womenProducts}
                loading={womenLoading}
                error={womenError}
                onProductClick={onProductClick}
                onViewAll={() => onNavigate('women')}
                gender="women"
            />

            {/* Newsletter Section */}
            <section className="py-16 bg-gradient-to-r from-primary-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Stay Updated with Latest Trends
                    </h2>
                    <p className="text-blue-100 mb-8">
                        Subscribe to our newsletter and get exclusive offers!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-3 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button className="px-8 py-3 bg-white text-primary-600 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}