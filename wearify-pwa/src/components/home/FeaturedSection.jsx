import { ArrowRight } from 'lucide-react';
import ProductCard from '../common/ProductCard';
import LoadingSkeleton from '../common/LoadingSkeleton';
import ErrorState from '../common/ErrorState';
import EmptyState from '../common/EmptyState';

export default function FeaturedSection({
    title,
    subtitle,
    products,
    loading,
    error,
    onProductClick,
    onViewAll,
    gender
}) {
    if (loading) {
        return (
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-800">{title}</h2>
                            {subtitle && <p className="text-slate-600 mt-2">{subtitle}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <LoadingSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ErrorState error={error} />
                </div>
            </section>
        );
    }

    if (!products || products.length === 0) {
        return (
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <EmptyState
                        title="No Products Available"
                        message="Check back soon for new arrivals!"
                    />
                </div>
            </section>
        );
    }

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800">{title}</h2>
                        {subtitle && <p className="text-slate-600 mt-2">{subtitle}</p>}
                    </div>
                    {onViewAll && (
                        <button
                            onClick={onViewAll}
                            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors group"
                        >
                            <span>View All</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    )}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onClick={onProductClick}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}