import { ShoppingCart, Heart } from 'lucide-react';
import { formatCurrency, getGenderColor } from '../../utils/helpers';

export default function ProductCard({ product, onClick }) {
    return (
        <div
            onClick={() => onClick && onClick(product.id)}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
        >
            {/* Product Image */}
            <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Gender Badge */}
                <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getGenderColor(product.gender)}`}>
                        {product.gender === 'men' ? "Men's" : product.gender === 'women' ? "Women's" : 'Unisex'}
                    </span>
                </div>

                {/* Featured Badge */}
                {product.is_featured && (
                    <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                            ⭐ Featured
                        </span>
                    </div>
                )}

                {/* Quick Action Buttons */}
                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            // Add to wishlist logic here
                        }}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                        title="Add to Wishlist"
                    >
                        <Heart className="w-5 h-5 text-red-500" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            // Add to cart logic here
                        }}
                        className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors shadow-lg"
                        title="Add to Cart"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
                {/* Brand & Category */}
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500 font-medium">
                        {product.brands?.name || 'Brand'}
                    </span>
                    <span className="text-xs text-slate-400">
                        {product.categories?.name || 'Category'}
                    </span>
                </div>

                {/* Product Name */}
                <h3 className="font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {product.name}
                </h3>

                {/* Description */}
                {product.description && (
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                        {product.description}
                    </p>
                )}

                {/* Price & Stock */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-2xl font-bold text-primary-600">
                            {formatCurrency(product.price)}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className={`text-xs font-medium ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-600' : 'text-red-600'
                            }`}>
                            {product.stock > 0 ? `Stock: ${product.stock}` : 'Out of Stock'}
                        </p>
                    </div>
                </div>

                {/* Size & Color Info */}
                {(product.size || product.color) && (
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-4 text-xs">
                        {product.size && (
                            <div className="flex items-center gap-1">
                                <span className="text-slate-500">Size:</span>
                                <span className="font-medium text-slate-700">{product.size}</span>
                            </div>
                        )}
                        {product.color && (
                            <div className="flex items-center gap-1">
                                <span className="text-slate-500">Color:</span>
                                <span className="font-medium text-slate-700">{product.color}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}