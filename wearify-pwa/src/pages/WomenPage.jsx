// // src/pages/WomenPage.jsx - FIXED SEARCH BAR
// import { useState, useEffect } from 'react';
// import { Filter, Search, X, SlidersHorizontal } from 'lucide-react';
// import ProductCard from '../components/product/ProductCard';
// import { productService } from '../services/productService';

// const WomenPage = ({ onProductClick }) => {
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [brands, setBrands] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('all');
//     const [selectedBrand, setSelectedBrand] = useState('all');
//     const [priceRange, setPriceRange] = useState('all');
//     const [showFilters, setShowFilters] = useState(false);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             setLoading(true);
//             const [productsData, categoriesData, brandsData] = await Promise.all([
//                 productService.getProductsByGender('women'),
//                 productService.getCategories(),
//                 productService.getBrands()
//             ]);

//             setProducts(productsData || []);
//             setCategories(categoriesData.filter(c => c.gender === 'women') || []);
//             setBrands(brandsData || []);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Filter products
//     const filteredProducts = products.filter(product => {
//         const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             product.description?.toLowerCase().includes(searchQuery.toLowerCase());

//         const matchesCategory = selectedCategory === 'all' ||
//             product.category_id === selectedCategory;

//         const matchesBrand = selectedBrand === 'all' ||
//             product.brand_id === selectedBrand;

//         let matchesPrice = true;
//         if (priceRange === 'under-300k') matchesPrice = product.price < 300000;
//         else if (priceRange === '300k-500k') matchesPrice = product.price >= 300000 && product.price <= 500000;
//         else if (priceRange === '500k-1m') matchesPrice = product.price >= 500000 && product.price <= 1000000;
//         else if (priceRange === 'above-1m') matchesPrice = product.price > 1000000;

//         return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
//     });

//     const clearFilters = () => {
//         setSearchQuery('');
//         setSelectedCategory('all');
//         setSelectedBrand('all');
//         setPriceRange('all');
//     };

//     const hasActiveFilters = searchQuery || selectedCategory !== 'all' ||
//         selectedBrand !== 'all' || priceRange !== 'all';

//     return (
//         <div className="min-h-screen bg-gray-50 pt-20 pb-24">
//             {/* Hero Header */}
//             <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-12">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <h1 className="text-4xl md:text-5xl font-bold mb-3">Women's Fashion</h1>
//                     <p className="text-lg text-pink-100">Discover elegant styles and trendy fashion for modern women.</p>
//                 </div>
//             </div>

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 {/* Search and Filter Bar - FIXED */}
//                 <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
//                     <div className="flex flex-col md:flex-row gap-4">
//                         {/* Search - FIXED: Better spacing */}
//                         <div className="flex-1 relative">
//                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//                             <input
//                                 type="text"
//                                 placeholder="Cari produk..."
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
//                             />
//                         </div>

//                         {/* Filter Toggle Button */}
//                         <button
//                             onClick={() => setShowFilters(!showFilters)}
//                             className="flex items-center justify-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium whitespace-nowrap"
//                         >
//                             <SlidersHorizontal className="w-5 h-5" />
//                             <span>Filter</span>
//                             {hasActiveFilters && (
//                                 <span className="ml-1 px-2 py-0.5 bg-white text-pink-600 text-xs font-bold rounded-full">
//                                     Aktif
//                                 </span>
//                             )}
//                         </button>
//                     </div>

//                     {/* Filters Panel */}
//                     {showFilters && (
//                         <div className="mt-4 pt-4 border-t border-gray-200">
//                             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                                 {/* Category Filter */}
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
//                                     <select
//                                         value={selectedCategory}
//                                         onChange={(e) => setSelectedCategory(e.target.value)}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                                     >
//                                         <option value="all">Semua Kategori</option>
//                                         {categories.map((cat) => (
//                                             <option key={cat.id} value={cat.id}>{cat.name}</option>
//                                         ))}
//                                     </select>
//                                 </div>

//                                 {/* Brand Filter */}
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
//                                     <select
//                                         value={selectedBrand}
//                                         onChange={(e) => setSelectedBrand(e.target.value)}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                                     >
//                                         <option value="all">Semua Brand</option>
//                                         {brands.map((brand) => (
//                                             <option key={brand.id} value={brand.id}>{brand.name}</option>
//                                         ))}
//                                     </select>
//                                 </div>

//                                 {/* Price Range Filter */}
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">Harga</label>
//                                     <select
//                                         value={priceRange}
//                                         onChange={(e) => setPriceRange(e.target.value)}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                                     >
//                                         <option value="all">Semua Harga</option>
//                                         <option value="under-300k">Di bawah Rp 300K</option>
//                                         <option value="300k-500k">Rp 300K - 500K</option>
//                                         <option value="500k-1m">Rp 500K - 1M</option>
//                                         <option value="above-1m">Di atas Rp 1M</option>
//                                     </select>
//                                 </div>

//                                 {/* Clear Filters */}
//                                 <div className="flex items-end">
//                                     <button
//                                         onClick={clearFilters}
//                                         disabled={!hasActiveFilters}
//                                         className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                                     >
//                                         <X className="w-4 h-4" />
//                                         Hapus Semua
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Results Count */}
//                 <div className="flex items-center justify-between mb-6">
//                     <p className="text-gray-600">
//                         Menampilkan <span className="font-semibold text-gray-900">{filteredProducts.length}</span> produk
//                     </p>
//                 </div>

//                 {/* Loading State */}
//                 {loading && (
//                     <div className="flex flex-col items-center justify-center py-20">
//                         <div className="w-16 h-16 border-4 border-pink-600 border-t-transparent rounded-full animate-spin mb-4"></div>
//                         <p className="text-gray-600 font-medium">Memuat produk...</p>
//                     </div>
//                 )}

//                 {/* Products Grid */}
//                 {!loading && filteredProducts.length > 0 && (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                         {filteredProducts.map((product) => (
//                             <ProductCard
//                                 key={product.id}
//                                 product={product}
//                                 onClick={onProductClick}
//                             />
//                         ))}
//                     </div>
//                 )}

//                 {/* Empty State */}
//                 {!loading && filteredProducts.length === 0 && (
//                     <div className="text-center py-20">
//                         <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                             <Filter className="w-12 h-12 text-gray-400" />
//                         </div>
//                         <h3 className="text-2xl font-bold text-gray-900 mb-2">Tidak ada produk ditemukan</h3>
//                         <p className="text-gray-600 mb-6">Coba sesuaikan filter atau pencarian Anda</p>
//                         {hasActiveFilters && (
//                             <button
//                                 onClick={clearFilters}
//                                 className="px-6 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors"
//                             >
//                                 Hapus Semua Filter
//                             </button>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default WomenPage;

// src/pages/WomenPage.jsx - FIXED SEARCH BAR
import { useState, useEffect } from 'react';
import { Filter, Search, X, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { productService } from '../services/productService';

const WomenPage = ({ onProductClick }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedBrand, setSelectedBrand] = useState('all');
    const [priceRange, setPriceRange] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [productsData, categoriesData, brandsData] = await Promise.all([
                productService.getProductsByGender('women'),
                productService.getCategories(),
                productService.getBrands()
            ]);

            setProducts(productsData || []);
            setCategories(categoriesData.filter(c => c.gender === 'women') || []);
            setBrands(brandsData || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'all' ||
            product.category_id === selectedCategory;

        const matchesBrand = selectedBrand === 'all' ||
            product.brand_id === selectedBrand;

        let matchesPrice = true;
        if (priceRange === 'under-300k') matchesPrice = product.price < 300000;
        else if (priceRange === '300k-500k') matchesPrice = product.price >= 300000 && product.price <= 500000;
        else if (priceRange === '500k-1m') matchesPrice = product.price >= 500000 && product.price <= 1000000;
        else if (priceRange === 'above-1m') matchesPrice = product.price > 1000000;

        return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
        setSelectedBrand('all');
        setPriceRange('all');
    };

    const hasActiveFilters = searchQuery || selectedCategory !== 'all' ||
        selectedBrand !== 'all' || priceRange !== 'all';

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Hero Header */}
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">Women's Fashion</h1>
                    <p className="text-lg text-pink-100">Temukan gaya elegan dan tren fashion untuk wanita modern.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filter Bar - FIXED */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search - FIXED: Better icon positioning */}
                        <div className="flex-1 relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <Search className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Cari produk..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Filter Toggle Button */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium whitespace-nowrap flex-shrink-0"
                        >
                            <SlidersHorizontal className="w-5 h-5" />
                            <span>Filter</span>
                            {hasActiveFilters && (
                                <span className="ml-1 px-2 py-0.5 bg-white text-pink-600 text-xs font-bold rounded-full">
                                    Aktif
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Filters Panel */}
                    {showFilters && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {/* Category Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    >
                                        <option value="all">Semua Kategori</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Brand Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                                    <select
                                        value={selectedBrand}
                                        onChange={(e) => setSelectedBrand(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    >
                                        <option value="all">Semua Brand</option>
                                        {brands.map((brand) => (
                                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Price Range Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Harga</label>
                                    <select
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    >
                                        <option value="all">Semua Harga</option>
                                        <option value="under-300k">Di bawah Rp 300K</option>
                                        <option value="300k-500k">Rp 300K - 500K</option>
                                        <option value="500k-1m">Rp 500K - 1M</option>
                                        <option value="above-1m">Di atas Rp 1M</option>
                                    </select>
                                </div>

                                {/* Clear Filters */}
                                <div className="flex items-end">
                                    <button
                                        onClick={clearFilters}
                                        disabled={!hasActiveFilters}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <X className="w-4 h-4" />
                                        Hapus Semua
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-600">
                        Menampilkan <span className="font-semibold text-gray-900">{filteredProducts.length}</span> produk
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-16 h-16 border-4 border-pink-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-600 font-medium">Memuat produk...</p>
                    </div>
                )}

                {/* Products Grid */}
                {!loading && filteredProducts.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={onProductClick}
                            />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Filter className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Tidak ada produk ditemukan</h3>
                        <p className="text-gray-600 mb-6">Coba sesuaikan filter atau pencarian Anda</p>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="px-6 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors"
                            >
                                Hapus Semua Filter
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WomenPage;