import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/common/ProductCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import AdvancedFilter from '../components/common/AdvancedFilter';

export default function WomenPage({ onProductClick }) {
    const [filters, setFilters] = useState({
        gender: 'women',
        search: '',
        sort_by: 'created_at',
        order: 'desc',
        min_price: '',
        max_price: '',
        page: 1,
        limit: 12,
    });

    const { products, loading, error, pagination, refetch } = useProducts(filters);

    const handleFilterChange = (newFilters) => {
        setFilters((prev) => ({
            ...prev,
            ...newFilters,
            page: 1, // Reset to page 1 when filters change
        }));
    };

    const handlePageChange = (newPage) => {
        setFilters((prev) => ({
            ...prev,
            page: newPage,
        }));
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 pb-20 md:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                        Women's Fashion
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Explore elegant and trendy fashion for modern women. From chic dresses to stylish accessories.
                    </p>
                </div>

                {/* Filters */}
                <AdvancedFilter
                    onFilterChange={handleFilterChange}
                    initialFilters={filters}
                />

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <LoadingSkeleton key={i} />
                        ))}
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <ErrorState error={error} onRetry={refetch} />
                )}

                {/* Empty State */}
                {!loading && !error && products.length === 0 && (
                    <EmptyState
                        title="No Products Found"
                        message="Try adjusting your filters or search query"
                    />
                )}

                {/* Products Grid */}
                {!loading && !error && products.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onClick={onProductClick}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination && pagination.total_pages > 1 && (
                            <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4">
                                <button
                                    onClick={() => handlePageChange(filters.page - 1)}
                                    disabled={filters.page === 1}
                                    className="px-6 py-3 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-slate-700"
                                >
                                    ← Previous
                                </button>

                                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200">
                                    <span className="text-slate-700 font-semibold">
                                        Page {pagination.page} of {pagination.total_pages}
                                    </span>
                                    <span className="text-slate-500 text-sm">
                                        ({pagination.total} products)
                                    </span>
                                </div>

                                <button
                                    onClick={() => handlePageChange(filters.page + 1)}
                                    disabled={filters.page === pagination.total_pages}
                                    className="px-6 py-3 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-slate-700"
                                >
                                    Next →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}