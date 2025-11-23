import { useState } from 'react';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ArrowLeft, ShoppingCart, Heart, Minus, Plus, Package, Truck, Shield } from 'lucide-react';
import { formatCurrency, getGenderColor } from '../utils/helpers';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import ErrorState from '../components/common/ErrorState';

export default function ProductDetailPage({ productId, onBack }) {
    const { product, loading, error, refetch } = useProduct(productId);
    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [addingToCart, setAddingToCart] = useState(false);

    const handleAddToCart = async () => {
        if (!product) return;

        setAddingToCart(true);
        const result = addToCart(product, quantity, selectedSize, selectedColor);

        if (result.success) {
            alert('✅ Product added to cart!');
        } else {
            alert('❌ Failed to add to cart');
        }
        setAddingToCart(false);
    };

    const incrementQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <LoadingSkeleton />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <ErrorState error={error} onRetry={refetch} />
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 pb-20 md:pb-8 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-slate-600 mb-4">Product not found</p>
                    <button
                        onClick={onBack}
                        className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const sizes = product.size ? product.size.split(',').map(s => s.trim()) : [];
    const colors = product.color ? product.color.split(',').map(c => c.trim()) : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pb-20 md:pb-8">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back</span>
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg sticky top-24 h-fit">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-96 md:h-[600px] object-cover"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Header */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getGenderColor(product.gender)}`}>
                                    {product.gender === 'men' ? "Men's" : product.gender === 'women' ? "Women's" : 'Unisex'}
                                </span>
                                {product.is_featured && (
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                                        ⭐ Featured
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                                {product.name}
                            </h1>
                            <p className="text-slate-600">{product.brands?.name || 'Brand'} • {product.categories?.name || 'Category'}</p>
                        </div>

                        {/* Price */}
                        <div className="bg-primary-50 rounded-xl p-4">
                            <div className="text-4xl font-bold text-primary-600">
                                {formatCurrency(product.price)}
                            </div>
                            <p className={`text-sm mt-2 ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-600' : 'text-red-600'
                                }`}>
                                {product.stock > 0 ? `${product.stock} items in stock` : 'Out of Stock'}
                            </p>
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div>
                                <h3 className="font-bold text-slate-800 mb-2">Description</h3>
                                <p className="text-slate-600 leading-relaxed">{product.description}</p>
                            </div>
                        )}

                        {/* Size Selection */}
                        {sizes.length > 0 && (
                            <div>
                                <h3 className="font-bold text-slate-800 mb-3">Select Size</h3>
                                <div className="flex flex-wrap gap-2">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${selectedSize === size
                                                ? 'border-primary-600 bg-primary-600 text-white'
                                                : 'border-slate-300 hover:border-primary-600'
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
                                <h3 className="font-bold text-slate-800 mb-3">Select Color</h3>
                                <div className="flex flex-wrap gap-2">
                                    {colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${selectedColor === color
                                                ? 'border-primary-600 bg-primary-600 text-white'
                                                : 'border-slate-300 hover:border-primary-600'
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
                            <h3 className="font-bold text-slate-800 mb-3">Quantity</h3>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={decrementQuantity}
                                    disabled={quantity <= 1}
                                    className="p-2 border-2 border-slate-300 rounded-lg hover:border-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Minus className="w-5 h-5" />
                                </button>
                                <span className="text-2xl font-bold text-slate-800 w-12 text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={incrementQuantity}
                                    disabled={quantity >= product.stock}
                                    className="p-2 border-2 border-slate-300 rounded-lg hover:border-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                                className="flex-1 px-6 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                {addingToCart ? 'Adding...' : 'Add to Cart'}
                            </button>
                            <button className="p-4 border-2 border-slate-300 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all">
                                <Heart className="w-6 h-6 text-red-500" />
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-4 pt-6">
                            <FeatureItem icon={<Package />} text="Quality Product" />
                            <FeatureItem icon={<Truck />} text="Free Shipping" />
                            <FeatureItem icon={<Shield />} text="Secure Payment" />
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
            <div className="text-primary-600 mb-2">{icon}</div>
            <p className="text-xs font-medium text-slate-700">{text}</p>
        </div>
    );
}