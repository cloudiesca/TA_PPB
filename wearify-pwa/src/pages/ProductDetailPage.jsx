// import { useState, useEffect } from 'react';
// import { useCart } from '../hooks/useCart';
// import { ArrowLeft, ShoppingCart, Heart, Minus, Plus, Package, Truck, Shield } from 'lucide-react';
// import { productService } from '../services/productService';

// export default function ProductDetailPage({ productId, onBack }) {
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [imageError, setImageError] = useState(false);

//     const { addToCart } = useCart();

//     const [quantity, setQuantity] = useState(1);
//     const [selectedSize, setSelectedSize] = useState('');
//     const [selectedColor, setSelectedColor] = useState('');
//     const [addingToCart, setAddingToCart] = useState(false);

//     // Fetch product data
//     useEffect(() => {
//         const fetchProduct = async () => {
//             if (!productId) {
//                 setError('Product ID tidak valid');
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 setLoading(true);
//                 setError(null);
//                 const data = await productService.getProductById(productId);

//                 if (data) {
//                     setProduct(data);
//                 } else {
//                     setError('Produk tidak ditemukan');
//                 }
//             } catch (err) {
//                 console.error('Error fetching product:', err);
//                 setError('Gagal memuat produk');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProduct();
//     }, [productId]);

//     const formatCurrency = (price) => {
//         return new Intl.NumberFormat('id-ID', {
//             style: 'currency',
//             currency: 'IDR',
//             minimumFractionDigits: 0,
//         }).format(price);
//     };

//     const getGenderColor = (gender) => {
//         if (gender === 'men') return 'bg-blue-100 text-blue-800';
//         if (gender === 'women') return 'bg-pink-100 text-pink-800';
//         return 'bg-gray-100 text-gray-800';
//     };

//     const handleAddToCart = () => {
//         if (!product) return;

//         setAddingToCart(true);

//         // Prepare product with image
//         const productToAdd = {
//             ...product,
//             image: product.image_url || product.image || 'https://via.placeholder.com/400?text=No+Image',
//             image_url: product.image_url || product.image || 'https://via.placeholder.com/400?text=No+Image'
//         };

//         const result = addToCart(productToAdd, quantity, selectedSize, selectedColor);

//         if (result.success) {
//             alert('✅ Produk berhasil ditambahkan ke keranjang!');
//         } else {
//             alert('❌ Gagal menambahkan ke keranjang');
//         }
//         setAddingToCart(false);
//     };

//     const incrementQuantity = () => {
//         if (product && quantity < product.stock) {
//             setQuantity(quantity + 1);
//         }
//     };

//     const decrementQuantity = () => {
//         if (quantity > 1) {
//             setQuantity(quantity - 1);
//         }
//     };

//     const getImageUrl = () => {
//         if (imageError || !product) {
//             return 'https://via.placeholder.com/600x800?text=Gambar+Tidak+Tersedia';
//         }
//         return product.image_url || product.image || 'https://via.placeholder.com/600x800?text=No+Image';
//     };

//     // Loading State
//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//                     <p className="text-gray-600 font-medium">Memuat produk...</p>
//                 </div>
//             </div>
//         );
//     }

//     // Error State
//     if (error || !product) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
//                 <div className="text-center">
//                     <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Package className="w-10 h-10 text-red-600" />
//                     </div>
//                     <h2 className="text-2xl font-bold text-gray-900 mb-2">
//                         {error || 'Produk tidak ditemukan'}
//                     </h2>
//                     <p className="text-gray-600 mb-6">
//                         Produk yang Anda cari tidak tersedia
//                     </p>
//                     <button
//                         onClick={onBack}
//                         className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold"
//                     >
//                         Kembali
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     const sizes = product.size ? product.size.split(',').map(s => s.trim()) : [];
//     const colors = product.color ? product.color.split(',').map(c => c.trim()) : [];

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pb-24">
//             {/* Header */}
//             <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
//                 <div className="max-w-7xl mx-auto px-4 py-4">
//                     <button
//                         onClick={onBack}
//                         className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors"
//                     >
//                         <ArrowLeft className="w-5 h-5" />
//                         <span className="font-medium">Kembali</span>
//                     </button>
//                 </div>
//             </div>

//             <div className="max-w-7xl mx-auto px-4 py-8">
//                 <div className="grid md:grid-cols-2 gap-8">
//                     {/* Product Image */}
//                     <div className="bg-white rounded-2xl overflow-hidden shadow-lg md:sticky md:top-8 h-fit">
//                         <img
//                             src={getImageUrl()}
//                             alt={product.name}
//                             className="w-full h-96 md:h-[600px] object-cover"
//                             onError={() => setImageError(true)}
//                         />
//                     </div>

//                     {/* Product Info */}
//                     <div className="space-y-6">
//                         {/* Header */}
//                         <div>
//                             <div className="flex items-center gap-2 mb-2 flex-wrap">
//                                 <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getGenderColor(product.gender)}`}>
//                                     {product.gender === 'men' ? "Pria" : product.gender === 'women' ? "Wanita" : 'Unisex'}
//                                 </span>
//                                 {product.is_featured && (
//                                     <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
//                                         ⭐ Unggulan
//                                     </span>
//                                 )}
//                             </div>
//                             <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-2">
//                                 {product.name}
//                             </h1>
//                             <p className="text-slate-600">
//                                 {product.brands?.name || 'Brand'} • {product.categories?.name || 'Kategori'}
//                             </p>
//                         </div>

//                         {/* Price */}
//                         <div className="bg-indigo-50 rounded-xl p-4">
//                             <div className="text-3xl md:text-4xl font-bold text-indigo-600">
//                                 {formatCurrency(product.price)}
//                             </div>
//                             <p className={`text-sm mt-2 ${product.stock > 10 ? 'text-green-600' :
//                                 product.stock > 0 ? 'text-orange-600' : 'text-red-600'
//                                 }`}>
//                                 {product.stock > 0 ? `${product.stock} stok tersedia` : 'Stok Habis'}
//                             </p>
//                         </div>

//                         {/* Description */}
//                         {product.description && (
//                             <div>
//                                 <h3 className="font-bold text-slate-800 mb-2">Deskripsi</h3>
//                                 <p className="text-slate-600 leading-relaxed">{product.description}</p>
//                             </div>
//                         )}

//                         {/* Size Selection */}
//                         {sizes.length > 0 && (
//                             <div>
//                                 <h3 className="font-bold text-slate-800 mb-3">Pilih Ukuran</h3>
//                                 <div className="flex flex-wrap gap-2">
//                                     {sizes.map((size) => (
//                                         <button
//                                             key={size}
//                                             onClick={() => setSelectedSize(size)}
//                                             className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${selectedSize === size
//                                                 ? 'border-indigo-600 bg-indigo-600 text-white'
//                                                 : 'border-slate-300 hover:border-indigo-600'
//                                                 }`}
//                                         >
//                                             {size}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Color Selection */}
//                         {colors.length > 0 && (
//                             <div>
//                                 <h3 className="font-bold text-slate-800 mb-3">Pilih Warna</h3>
//                                 <div className="flex flex-wrap gap-2">
//                                     {colors.map((color) => (
//                                         <button
//                                             key={color}
//                                             onClick={() => setSelectedColor(color)}
//                                             className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${selectedColor === color
//                                                 ? 'border-indigo-600 bg-indigo-600 text-white'
//                                                 : 'border-slate-300 hover:border-indigo-600'
//                                                 }`}
//                                         >
//                                             {color}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Quantity */}
//                         <div>
//                             <h3 className="font-bold text-slate-800 mb-3">Jumlah</h3>
//                             <div className="flex items-center gap-4">
//                                 <button
//                                     onClick={decrementQuantity}
//                                     disabled={quantity <= 1}
//                                     className="p-2 border-2 border-slate-300 rounded-lg hover:border-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                 >
//                                     <Minus className="w-5 h-5" />
//                                 </button>
//                                 <span className="text-2xl font-bold text-slate-800 w-12 text-center">
//                                     {quantity}
//                                 </span>
//                                 <button
//                                     onClick={incrementQuantity}
//                                     disabled={quantity >= product.stock}
//                                     className="p-2 border-2 border-slate-300 rounded-lg hover:border-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                 >
//                                     <Plus className="w-5 h-5" />
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="flex gap-4 pt-4">
//                             <button
//                                 onClick={handleAddToCart}
//                                 disabled={product.stock === 0 || addingToCart}
//                                 className="flex-1 px-6 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
//                             >
//                                 <ShoppingCart className="w-6 h-6" />
//                                 {addingToCart ? 'Menambahkan...' : 'Tambah ke Keranjang'}
//                             </button>
//                             <button className="p-4 border-2 border-slate-300 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all">
//                                 <Heart className="w-6 h-6 text-red-500" />
//                             </button>
//                         </div>

//                         {/* Features */}
//                         <div className="grid grid-cols-3 gap-4 pt-6">
//                             <FeatureItem icon={<Package />} text="Produk Berkualitas" />
//                             <FeatureItem icon={<Truck />} text="Gratis Ongkir" />
//                             <FeatureItem icon={<Shield />} text="Pembayaran Aman" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// function FeatureItem({ icon, text }) {
//     return (
//         <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-slate-200">
//             <div className="text-indigo-600 mb-2">{icon}</div>
//             <p className="text-xs font-medium text-slate-700">{text}</p>
//         </div>
//     );
// }

import { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { ArrowLeft, ShoppingCart, Heart, Minus, Plus, Package, Truck, Shield, Star } from 'lucide-react';
import { productService } from '../services/productService';

export default function ProductDetailPage({ productId, onBack }) {
    console.log('🎯 ProductDetailPage RENDERED');
    console.log('📦 productId:', productId);
    console.log('🔙 onBack:', typeof onBack);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageError, setImageError] = useState(false);
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [addingToCart, setAddingToCart] = useState(false);

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

                console.log('🔄 Fetching product:', productId);
                const data = await productService.getProductById(productId);
                console.log('📦 Product data received:', data);

                if (data && data.id) {
                    setProduct(data);
                    console.log('✅ Product set successfully');
                } else {
                    console.log('❌ Invalid product data:', data);
                    setError('Produk tidak ditemukan');
                }
            } catch (err) {
                console.error('❌ Error fetching product:', err);
                setError('Gagal memuat produk. Silakan coba lagi.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const formatCurrency = (price) => {
        const numPrice = Number(price) || 0;
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(numPrice);
    };

    const handleAddToCart = () => {
        if (!product) return;

        let productPrice = 0;

        if (product.price) {
            productPrice = Number(product.price);
        } else if (product.harga) {
            productPrice = Number(product.harga);
        } else if (product.prices) {
            productPrice = Number(product.prices);
        }

        if (productPrice === 0) {
            alert('❌ Harga produk tidak valid');
            return;
        }

        setAddingToCart(true);

        const productToAdd = {
            id: product.id,
            name: product.name,
            price: productPrice,
            image: product.image_url || product.image || 'https://via.placeholder.com/400',
            image_url: product.image_url || product.image || 'https://via.placeholder.com/400',
            brand: product.brands?.name || product.brand || 'Brand',
            category: product.categories?.name || product.category || 'Category',
            stock: product.stock || 999,
            gender: product.gender || 'unisex'
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
            return 'https://via.placeholder.com/600x600/e2e8f0/64748b?text=Gambar+Tidak+Tersedia';
        }
        return product.image_url || product.image || 'https://via.placeholder.com/600x600/e2e8f0/64748b?text=No+Image';
    };

    if (loading) {
        console.log('⏳ LOADING STATE');
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Memuat produk...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        console.log('❌ ERROR STATE:', error);
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="text-center">
                    <Package className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{error || 'Produk tidak ditemukan'}</h2>
                    <p className="text-gray-600 mb-6">Produk yang Anda cari tidak tersedia</p>
                    <button
                        onClick={onBack}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
                    >
                        Kembali
                    </button>
                </div>
            </div>
        );
    }

    const sizes = product.size ? product.size.split(',').map(s => s.trim()) : [];
    const colors = product.color ? product.color.split(',').map(c => c.trim()) : [];
    const productPrice = Number(product.price) || Number(product.harga) || Number(product.prices) || 0;
    const productStock = Number(product.stock) || 0;
    const productName = product.name || 'Produk Tanpa Nama';
    const productBrand = product.brands?.name || product.brand || 'Brand';
    const productCategory = product.categories?.name || product.category || 'Kategori';
    const productGender = product.gender || 'unisex';
    const productDescription = product.description || 'Tidak ada deskripsi';
    const isFeatured = product.is_featured || false;

    console.log('✅ RENDERING PRODUCT:', productName);
    console.log('💰 Price:', productPrice);
    console.log('📦 Stock:', productStock);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Fixed Header */}
            <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Kembali</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Image Section */}
                        <div className="lg:sticky lg:top-24 lg:self-start">
                            <img
                                src={getImageUrl()}
                                alt={product.name}
                                className="w-full rounded-2xl shadow-lg bg-white"
                                onError={() => setImageError(true)}
                            />
                        </div>

                        {/* Info Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 space-y-6">

                            {/* Badges */}
                            <div className="flex gap-2 flex-wrap">
                                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                                    {productGender === 'men' ? 'Pria' : productGender === 'women' ? 'Wanita' : 'Unisex'}
                                </span>
                                {isFeatured && (
                                    <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold flex items-center gap-1">
                                        <Star className="w-3.5 h-3.5" />
                                        Unggulan
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                    {productName}
                                </h1>
                                <p className="text-gray-600">
                                    {productBrand} • {productCategory}
                                </p>
                            </div>

                            {/* Price */}
                            <div className="bg-indigo-50 rounded-xl p-6 border-2 border-indigo-200">
                                <div className="text-3xl lg:text-4xl font-black text-indigo-600 mb-2">
                                    {formatCurrency(productPrice)}
                                </div>
                                <p className={`text-sm font-semibold ${productStock > 10 ? 'text-green-600' : productStock > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                                    {productStock > 0 ? `Stok: ${productStock}` : 'Stok Habis'}
                                </p>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Deskripsi</h3>
                                <p className="text-gray-600 leading-relaxed">{productDescription}</p>
                            </div>

                            {/* Size */}
                            {sizes.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">Ukuran</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`px-5 py-2.5 rounded-lg font-semibold border-2 transition-all ${selectedSize === size
                                                        ? 'bg-indigo-600 text-white border-indigo-600'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-600'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Color */}
                            {colors.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">Warna</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {colors.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`px-5 py-2.5 rounded-lg font-semibold border-2 transition-all ${selectedColor === color
                                                        ? 'bg-indigo-600 text-white border-indigo-600'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-600'
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
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Jumlah</h3>
                                <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-xl w-fit border-2 border-gray-200">
                                    <button
                                        onClick={decrementQuantity}
                                        disabled={quantity <= 1}
                                        className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border-2 border-gray-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                    >
                                        <Minus className="w-5 h-5" />
                                    </button>
                                    <span className="text-xl font-bold text-gray-900 min-w-[3rem] text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={incrementQuantity}
                                        disabled={quantity >= productStock}
                                        className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border-2 border-gray-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={productStock === 0 || addingToCart}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    {addingToCart ? 'Menambahkan...' : 'Tambah ke Keranjang'}
                                </button>
                                <button className="w-14 h-14 flex items-center justify-center bg-white border-2 border-red-200 rounded-xl hover:bg-red-50 transition-all">
                                    <Heart className="w-6 h-6 text-red-500" />
                                </button>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                                <div className="flex flex-col items-center text-center gap-2">
                                    <Package className="w-8 h-8 text-indigo-600" />
                                    <span className="text-xs font-semibold text-gray-600">Produk Berkualitas</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <Truck className="w-8 h-8 text-indigo-600" />
                                    <span className="text-xs font-semibold text-gray-600">Gratis Ongkir</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <Shield className="w-8 h-8 text-indigo-600" />
                                    <span className="text-xs font-semibold text-gray-600">Pembayaran Aman</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}