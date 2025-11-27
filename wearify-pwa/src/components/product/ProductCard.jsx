// // src/components/product/ProductCard.jsx - FINAL CLEAN VERSION
// import { ShoppingCart, Heart } from 'lucide-react';
// import { useState } from 'react';
// import { useCart } from '../../hooks/useCart';

// const ProductCard = ({ product, onClick }) => {
//     const [isFavorite, setIsFavorite] = useState(false);
//     const [isAddingToCart, setIsAddingToCart] = useState(false);
//     const { addItem } = useCart();

//     const formatPrice = (price) => {
//         return new Intl.NumberFormat('id-ID', {
//             style: 'currency',
//             currency: 'IDR',
//             minimumFractionDigits: 0,
//         }).format(price);
//     };

//     const handleAddToCart = (e) => {
//         e.stopPropagation();
//         if (product.stock === 0) return;

//         setIsAddingToCart(true);
//         addItem({
//             id: product.id,
//             name: product.name,
//             price: product.price,
//             image: product.image_url,
//             brand: product.brands?.name || 'Brand',
//         });

//         setTimeout(() => {
//             setIsAddingToCart(false);
//         }, 1000);
//     };

//     const handleFavorite = (e) => {
//         e.stopPropagation();
//         setIsFavorite(!isFavorite);
//     };

//     return (
//         <div
//             onClick={() => onClick(product.id)}
//             className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-slate-200 hover:border-sky-300"
//         >
//             {/* Image */}
//             <div className="relative aspect-square overflow-hidden bg-slate-100">
//                 <img
//                     src={product.image_url || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600'}
//                     alt={product.name}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                     onError={(e) => {
//                         e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600';
//                     }}
//                 />

//                 {/* Favorite Button */}
//                 <button
//                     onClick={handleFavorite}
//                     className="absolute top-4 right-4 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
//                 >
//                     <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
//                 </button>

//                 {/* Stock Badge */}
//                 {product.stock === 0 && (
//                     <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
//                         Habis
//                     </div>
//                 )}
//             </div>

//             {/* Info */}
//             <div className="p-5">
//                 {/* Brand */}
//                 <p className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-2">
//                     {product.brands?.name || 'BRAND'}
//                 </p>

//                 {/* Name */}
//                 <h3 className="font-bold text-slate-900 mb-3 line-clamp-2 text-base leading-snug min-h-[2.5rem]">
//                     {product.name}
//                 </h3>

//                 {/* Price */}
//                 <p className="text-2xl font-black text-slate-900 mb-4">
//                     {formatPrice(product.price)}
//                 </p>

//                 {/* Add to Cart Button */}
//                 <button
//                     onClick={handleAddToCart}
//                     disabled={product.stock === 0 || isAddingToCart}
//                     className={`w-full py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-md ${product.stock === 0
//                             ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
//                             : isAddingToCart
//                                 ? 'bg-green-500 text-white'
//                                 : 'bg-sky-600 text-white hover:bg-sky-700 hover:shadow-lg'
//                         }`}
//                 >
//                     {isAddingToCart ? (
//                         <>
//                             <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                             <span>Ditambahkan!</span>
//                         </>
//                     ) : (
//                         <>
//                             <ShoppingCart className="w-5 h-5" />
//                             <span>Tambah ke Keranjang</span>
//                         </>
//                     )}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;

// src/components/product/ProductCard.jsx - NO FAVORITE
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../hooks/useCart';

const ProductCard = ({ product, onClick }) => {
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const { addItem } = useCart();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (product.stock === 0) return;

        setIsAddingToCart(true);
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image_url,
            brand: product.brands?.name || 'Brand',
        });

        setTimeout(() => {
            setIsAddingToCart(false);
        }, 1000);
    };

    return (
        <div
            onClick={() => onClick(product.id)}
            className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-slate-200 hover:border-sky-300"
        >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-slate-100">
                <img
                    src={product.image_url || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600';
                    }}
                />

                {/* Stock Badge */}
                {product.stock < 10 && product.stock > 0 && (
                    <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                        Stok: {product.stock}
                    </div>
                )}

                {product.stock === 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                        Habis
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="p-5">
                {/* Brand */}
                <p className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-2">
                    {product.brands?.name || 'BRAND'}
                </p>

                {/* Name */}
                <h3 className="font-bold text-slate-900 mb-3 line-clamp-2 text-base leading-snug min-h-[2.5rem]">
                    {product.name}
                </h3>

                {/* Category */}
                <p className="text-sm text-slate-500 mb-3">
                    {product.categories?.name || 'Kategori'}
                </p>

                {/* Price */}
                <p className="text-2xl font-black text-slate-900 mb-4">
                    {formatPrice(product.price)}
                </p>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0 || isAddingToCart}
                    className={`w-full py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-md ${product.stock === 0
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : isAddingToCart
                                ? 'bg-green-500 text-white'
                                : 'bg-sky-600 text-white hover:bg-sky-700 hover:shadow-lg'
                        }`}
                >
                    {isAddingToCart ? (
                        <>
                            <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Ditambahkan!</span>
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="w-5 h-5" />
                            <span>Tambah ke Keranjang</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;