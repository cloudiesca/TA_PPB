import { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { ArrowLeft, ShoppingCart, Heart, Minus, Plus, Package, Truck, Shield } from 'lucide-react';
import { productService } from '../services/productService';

export default function ProductDetailPage({ productId, onBack }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageError, setImageError] = useState(false);

    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [addingToCart, setAddingToCart] = useState(false);

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) {
                setError('Product ID tidak valid');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const data = await productService.getProductById(productId);

                if (data) {
                    setProduct(data);
                } else {
                    setError('Produk tidak ditemukan');
                }
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Gagal memuat produk');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const formatCurrency = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const getGenderColor = (gender) => {
        if (gender === 'men') return 'bg-blue-100 text-blue-800';
        if (gender === 'women') return 'bg-pink-100 text-pink-800';
        return 'bg-gray-100 text-gray-800';
    };

    const handleAddToCart = () => {
        if (!product) return;

        setAddingToCart(true);

        // Prepare product with image
        const productToAdd = {
            ...product,
            image: product.image_url || product.image || 'https://via.placeholder.com/400?text=No+Image',
            image_url: product.image_url || product.image || 'https://via.placeholder.com/400?text=No+Image'
        };

        const result = addToCart(productToAdd, quantity, selectedSize, selectedColor);

        if (result.success) {
            alert('✅ Produk berhasil ditambahkan ke keranjang!');
        } else {
            alert('❌ Gagal menambahkan ke keranjang');
        }
        setAddingToCart(false);
    };

    const incrementQuantity = () => {
        if (product && quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const getImageUrl = () => {
        if (imageError || !product) {
            return 'https://via.placeholder.com/600x800?text=Gambar+Tidak+Tersedia';
        }
        return product.image_url || product.image || 'https://via.placeholder.com/600x800?text=No+Image';
    };

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Memuat produk...</p>
                </div>
            </div>
        );
    }

    // Error State
    if (error || !product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="w-10 h-10 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {error || 'Produk tidak ditemukan'}
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Produk yang Anda cari tidak tersedia
                    </p>
                    <button
                        onClick={onBack}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold"
                    >
                        Kembali
                    </button>
                </div>
            </div>
        );
    }

    const sizes = product.size ? product.size.split(',').map(s => s.trim()) : [];
    const colors = product.color ? product.color.split(',').map(c => c.trim()) : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pb-24">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Kembali</span>
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg md:sticky md:top-8 h-fit">
                        <img
                            src={getImageUrl()}
                            alt={product.name}
                            className="w-full h-96 md:h-[600px] object-cover"
                            onError={() => setImageError(true)}
                        />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Header */}
                        <div>
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getGenderColor(product.gender)}`}>
                                    {product.gender === 'men' ? "Pria" : product.gender === 'women' ? "Wanita" : 'Unisex'}
                                </span>
                                {product.is_featured && (
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                                        ⭐ Unggulan
                                    </span>
                                )}
                            </div>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-2">
                                {product.name}
                            </h1>
                            <p className="text-slate-600">
                                {product.brands?.name || 'Brand'} • {product.categories?.name || 'Kategori'}
                            </p>
                        </div>

                        {/* Price */}
                        <div className="bg-indigo-50 rounded-xl p-4">
                            <div className="text-3xl md:text-4xl font-bold text-indigo-600">
                                {formatCurrency(product.price)}
                            </div>
                            <p className={`text-sm mt-2 ${product.stock > 10 ? 'text-green-600' :
                                product.stock > 0 ? 'text-orange-600' : 'text-red-600'
                                }`}>
                                {product.stock > 0 ? `${product.stock} stok tersedia` : 'Stok Habis'}
                            </p>
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div>
                                <h3 className="font-bold text-slate-800 mb-2">Deskripsi</h3>
                                <p className="text-slate-600 leading-relaxed">{product.description}</p>
                            </div>
                        )}

                        {/* Size Selection */}
                        {sizes.length > 0 && (
                            <div>
                                <h3 className="font-bold text-slate-800 mb-3">Pilih Ukuran</h3>
                                <div className="flex flex-wrap gap-2">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${selectedSize === size
                                                ? 'border-indigo-600 bg-indigo-600 text-white'
                                                : 'border-slate-300 hover:border-indigo-600'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Color Selection */}
                        {colors.length > 0 && (
                            <div>
                                <h3 className="font-bold text-slate-800 mb-3">Pilih Warna</h3>
                                <div className="flex flex-wrap gap-2">
                                    {colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${selectedColor === color
                                                ? 'border-indigo-600 bg-indigo-600 text-white'
                                                : 'border-slate-300 hover:border-indigo-600'
                                                }`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div>
                            <h3 className="font-bold text-slate-800 mb-3">Jumlah</h3>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={decrementQuantity}
                                    disabled={quantity <= 1}
                                    className="p-2 border-2 border-slate-300 rounded-lg hover:border-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Minus className="w-5 h-5" />
                                </button>
                                <span className="text-2xl font-bold text-slate-800 w-12 text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={incrementQuantity}
                                    disabled={quantity >= product.stock}
                                    className="p-2 border-2 border-slate-300 rounded-lg hover:border-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0 || addingToCart}
                                className="flex-1 px-6 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                {addingToCart ? 'Menambahkan...' : 'Tambah ke Keranjang'}
                            </button>
                            <button className="p-4 border-2 border-slate-300 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all">
                                <Heart className="w-6 h-6 text-red-500" />
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-4 pt-6">
                            <FeatureItem icon={<Package />} text="Produk Berkualitas" />
                            <FeatureItem icon={<Truck />} text="Gratis Ongkir" />
                            <FeatureItem icon={<Shield />} text="Pembayaran Aman" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeatureItem({ icon, text }) {
    return (
        <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-slate-200">
            <div className="text-indigo-600 mb-2">{icon}</div>
            <p className="text-xs font-medium text-slate-700">{text}</p>
        </div>
    );
}