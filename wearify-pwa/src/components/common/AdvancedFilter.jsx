import { useState } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';

export default function AdvancedFilter({ onFilterChange, initialFilters = {} }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(initialFilters.search || '');
    const [filters, setFilters] = useState({
        sort_by: initialFilters.sort_by || 'created_at',
        order: initialFilters.order || 'desc',
        min_price: initialFilters.min_price || '',
        max_price: initialFilters.max_price || '',
    });

    const handleSearchChange = (value) => {
        setSearchQuery(value);
        if (onFilterChange) {
            onFilterChange({ ...filters, search: value });
        }
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        if (onFilterChange) {
            onFilterChange({ ...newFilters, search: searchQuery });
        }
    };

    const handleReset = () => {
        const resetFilters = {
            sort_by: 'created_at',
            order: 'desc',
            min_price: '',
            max_price: '',
        };
        setFilters(resetFilters);
        setSearchQuery('');
        if (onFilterChange) {
            onFilterChange({ ...resetFilters, search: '' });
        }
    };

    const activeFilterCount = Object.values(filters).filter(
        v => v && v !== 'created_at' && v !== 'desc'
    ).length + (searchQuery ? 1 : 0);

    return (
        <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-sm"
                />
            </div>

            {/* Filter Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
            >
                <SlidersHorizontal className="w-5 h-5 text-slate-600" />
                <span className="font-medium text-slate-700">Filters</span>
                {activeFilterCount > 0 && (
                    <span className="px-2 py-0.5 bg-primary-500 text-white text-xs font-bold rounded-full">
                        {activeFilterCount}
                    </span>
                )}
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Filter Panel */}
            {isOpen && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg space-y-4 animate-slide-down">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <SlidersHorizontal className="w-5 h-5" />
                            Filter & Sort
                        </h3>
                        <button
                            onClick={handleReset}
                            className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                        >
                            <X className="w-4 h-4" />
                            Reset
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Price Range */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Min Price
                            </label>
                            <input
                                type="number"
                                value={filters.min_price}
                                onChange={(e) => handleFilterChange('min_price', e.target.value)}
                                placeholder="0"
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Max Price
                            </label>
                            <input
                                type="number"
                                value={filters.max_price}
                                onChange={(e) => handleFilterChange('max_price', e.target.value)}
                                placeholder="1000000"
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                            />
                        </div>

                        {/* Sort By */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Sort By
                            </label>
                            <select
                                value={filters.sort_by}
                                onChange={(e) => handleFilterChange('sort_by', e.target.value)}
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                            >
                                <option value="created_at">Newest</option>
                                <option value="name">Name (A-Z)</option>
                                <option value="price">Price</option>
                            </select>
                        </div>

                        {/* Order */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Order
                            </label>
                            <select
                                value={filters.order}
                                onChange={(e) => handleFilterChange('order', e.target.value)}
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                            >
                                <option value="desc">Descending (High → Low)</option>
                                <option value="asc">Ascending (Low → High)</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}