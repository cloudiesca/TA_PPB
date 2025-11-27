// src/pages/HomePage.jsx - FINAL CLEAN VERSION
import { useState, useEffect } from 'react';
import { ArrowRight, Truck, Shield, Package } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { productService } from '../services/productService';

const HomePage = ({ onNavigate, onProductClick }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const productsData = await productService.getAllProducts();
            setProducts(productsData || []);
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const featuredProducts = products.slice(0, 8);
    const menProducts = products.filter(p => p.gender === 'men').slice(0, 4);
    const womenProducts = products.filter(p => p.gender === 'women').slice(0, 4);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-50 to-sky-50 pt-24 md:pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <div>
                            <div className="inline-block mb-6 px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-bold">
                                ✨ Koleksi Terbaru 2025
                            </div>

                            <h1 className="text-6xl font-black text-slate-900 mb-6 leading-tight">
                                Selamat datang di
                                <span className="block text-sky-600 mt-2">Wearify Fashion</span>
                            </h1>

                            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                                Temukan ribuan produk fashion autentik dari seluruh Indonesia. Dari gaya kasual hingga formal yang memukau.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => onNavigate('men')}
                                    className="px-8 py-4 bg-sky-600 text-white rounded-xl font-bold text-lg hover:bg-sky-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-3"
                                >
                                    <span>Jelajahi Koleksi</span>
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })}
                                    className="px-8 py-4 bg-white text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all border-2 border-slate-300"
                                >
                                    Lihat Produk
                                </button>
                            </div>
                        </div>

                        {/* Right Images */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <img
                                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80"
                                    alt="Fashion 1"
                                    className="w-full h-48 object-cover rounded-2xl shadow-lg"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80"
                                    alt="Fashion 2"
                                    className="w-full h-64 object-cover rounded-2xl shadow-lg"
                                />
                            </div>
                            <div className="space-y-4 mt-8">
                                <img
                                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80"
                                    alt="Fashion 3"
                                    className="w-full h-64 object-cover rounded-2xl shadow-lg"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&q=80"
                                    alt="Fashion 4"
                                    className="w-full h-48 object-cover rounded-2xl shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid md:grid-cols-3 gap-12">
                        <FeatureCard
                            icon={<Truck className="w-8 h-8 text-sky-600" />}
                            title="Gratis Ongkir"
                            description="Untuk pesanan di atas Rp 500.000"
                        />
                        <FeatureCard
                            icon={<Shield className="w-8 h-8 text-sky-600" />}
                            title="100% Original"
                            description="Produk asli dengan garansi kualitas"
                        />
                        <FeatureCard
                            icon={<Package className="w-8 h-8 text-sky-600" />}
                            title="Pengiriman Cepat"
                            description="Express delivery tersedia"
                        />
                    </div>
                </div>
            </section>

            {/* Loading State */}
            {loading && (
                <div className="py-32">
                    <div className="flex flex-col items-center justify-center gap-6">
                        <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-lg text-slate-600 font-semibold">Memuat produk...</p>
                    </div>
                </div>
            )}

            {/* Products Section */}
            {!loading && products.length > 0 && (
                <>
                    {/* Featured Products */}
                    <section className="py-20 bg-slate-50">
                        <div className="max-w-7xl mx-auto px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-black text-slate-900 mb-4">Produk Pilihan</h2>
                                <p className="text-lg text-slate-600">Produk-produk terbaik yang dipilih khusus untuk Anda</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {featuredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} onClick={onProductClick} />
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Men's Collection */}
                    {menProducts.length > 0 && (
                        <section className="py-20 bg-white">
                            <div className="max-w-7xl mx-auto px-8">
                                <div className="flex items-center justify-between mb-12">
                                    <div>
                                        <h2 className="text-4xl font-black text-slate-900 mb-2">Koleksi Pria</h2>
                                        <p className="text-lg text-slate-600">Fashion maskulin dan modern</p>
                                    </div>
                                    <button
                                        onClick={() => onNavigate('men')}
                                        className="px-6 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-colors flex items-center gap-2 shadow-md"
                                    >
                                        <span>Lihat Semua</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {menProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} onClick={onProductClick} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Women's Collection */}
                    {womenProducts.length > 0 && (
                        <section className="py-20 bg-slate-50">
                            <div className="max-w-7xl mx-auto px-8">
                                <div className="flex items-center justify-between mb-12">
                                    <div>
                                        <h2 className="text-4xl font-black text-slate-900 mb-2">Koleksi Wanita</h2>
                                        <p className="text-lg text-slate-600">Elegan dan menawan</p>
                                    </div>
                                    <button
                                        onClick={() => onNavigate('women')}
                                        className="px-6 py-3 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-colors flex items-center gap-2 shadow-md"
                                    >
                                        <span>Lihat Semua</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {womenProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} onClick={onProductClick} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Newsletter */}
                    <section className="py-20 bg-sky-600">
                        <div className="max-w-4xl mx-auto px-8 text-center">
                            <h2 className="text-4xl font-black text-white mb-4">Dapatkan Update Terbaru</h2>
                            <p className="text-xl text-sky-100 mb-10">
                                Berlangganan newsletter untuk penawaran eksklusif dan tips fashion
                            </p>
                            <div className="flex gap-4 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Masukkan email Anda"
                                    className="flex-1 px-6 py-4 rounded-xl text-slate-900 text-lg focus:outline-none focus:ring-4 focus:ring-sky-300"
                                />
                                <button className="px-8 py-4 bg-white text-sky-600 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-lg whitespace-nowrap">
                                    Berlangganan
                                </button>
                            </div>
                        </div>
                    </section>
                </>
            )}

            {/* Empty State */}
            {!loading && products.length === 0 && (
                <div className="py-32 text-center">
                    <Package className="w-24 h-24 text-slate-300 mx-auto mb-6" />
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">Belum Ada Produk</h3>
                    <p className="text-lg text-slate-600 mb-8">Produk akan segera hadir!</p>
                    <button
                        onClick={fetchData}
                        className="px-8 py-4 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-colors shadow-lg"
                    >
                        Muat Ulang
                    </button>
                </div>
            )}
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="text-center">
        <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600">{description}</p>
    </div>
);

export default HomePage;