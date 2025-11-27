// // // // // src/pages/CartPage.jsx - FIXED IMAGE CONSISTENCY
// // // // import { useState } from 'react';
// // // // import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from 'lucide-react';
// // // // import { useCart } from '../hooks/useCart';

// // // // const CartPage = ({ onBack, onCheckout }) => {
// // // //     const { cart, total, itemCount, updateQuantity, removeItem } = useCart();
// // // //     const [imageErrors, setImageErrors] = useState({});

// // // //     const formatPrice = (price) => {
// // // //         return new Intl.NumberFormat('id-ID', {
// // // //             style: 'currency',
// // // //             currency: 'IDR',
// // // //             minimumFractionDigits: 0,
// // // //         }).format(price);
// // // //     };

// // // //     const handleQuantityChange = (item, newQuantity) => {
// // // //         if (newQuantity < 1) return;
// // // //         if (newQuantity > item.stock) {
// // // //             alert(`Stok maksimal: ${item.stock}`);
// // // //             return;
// // // //         }
// // // //         updateQuantity(item.id, item.size, item.color, newQuantity);
// // // //     };

// // // //     const handleRemoveItem = (item) => {
// // // //         if (window.confirm(`Hapus ${item.name} dari keranjang?`)) {
// // // //             removeItem(item.id, item.size, item.color);
// // // //         }
// // // //     };

// // // //     // FIXED: Get correct image URL with fallback
// // // //     const getImageUrl = (item) => {
// // // //         const itemKey = `${item.id}-${item.size}-${item.color}`;
// // // //         if (imageErrors[itemKey]) {
// // // //             return 'https://via.placeholder.com/120?text=No+Image';
// // // //         }
// // // //         return item.image_url || item.image || 'https://via.placeholder.com/120?text=No+Image';
// // // //     };

// // // //     const handleImageError = (item) => {
// // // //         const itemKey = `${item.id}-${item.size}-${item.color}`;
// // // //         setImageErrors(prev => ({ ...prev, [itemKey]: true }));
// // // //     };

// // // //     const shippingCost = total >= 500000 ? 0 : 50000;
// // // //     const finalTotal = total + shippingCost;

// // // //     if (cart.length === 0) {
// // // //         return (
// // // //             <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-24 pt-20">
// // // //                 <div className="text-center px-4">
// // // //                     <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
// // // //                         <ShoppingBag className="w-16 h-16 text-gray-400" />
// // // //                     </div>
// // // //                     <h2 className="text-3xl font-bold text-gray-900 mb-3">Keranjang Kosong</h2>
// // // //                     <p className="text-gray-600 mb-8 max-w-md mx-auto">
// // // //                         Belum ada produk di keranjang. Mulai berbelanja sekarang!
// // // //                     </p>
// // // //                     <button
// // // //                         onClick={onBack}
// // // //                         className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl inline-flex items-center gap-2"
// // // //                     >
// // // //                         <ShoppingCart className="w-5 h-5" />
// // // //                         Mulai Belanja
// // // //                     </button>
// // // //                 </div>
// // // //             </div>
// // // //         );
// // // //     }

// // // //     return (
// // // //         <div className="min-h-screen bg-gray-50 pt-20 pb-32">
// // // //             {/* Header */}
// // // //             <div className="bg-white border-b sticky top-16 z-10">
// // // //                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// // // //                     <div className="flex items-center justify-between">
// // // //                         <button
// // // //                             onClick={onBack}
// // // //                             className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
// // // //                         >
// // // //                             <ArrowLeft className="w-5 h-5" />
// // // //                             <span className="hidden sm:inline">Lanjut Belanja</span>
// // // //                         </button>
// // // //                         <h1 className="text-xl md:text-2xl font-bold text-gray-900">
// // // //                             Keranjang ({itemCount})
// // // //                         </h1>
// // // //                         <div className="w-24"></div>
// // // //                     </div>
// // // //                 </div>
// // // //             </div>

// // // //             {/* Main Content */}
// // // //             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // // //                 <div className="grid lg:grid-cols-3 gap-8">
// // // //                     {/* Cart Items */}
// // // //                     <div className="lg:col-span-2 space-y-4">
// // // //                         {cart.map((item) => (
// // // //                             <div
// // // //                                 key={`${item.id}-${item.size}-${item.color}`}
// // // //                                 className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
// // // //                             >
// // // //                                 <div className="flex gap-4">
// // // //                                     {/* Product Image - FIXED */}
// // // //                                     <div className="flex-shrink-0">
// // // //                                         <img
// // // //                                             src={getImageUrl(item)}
// // // //                                             alt={item.name}
// // // //                                             className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg bg-gray-100"
// // // //                                             onError={() => handleImageError(item)}
// // // //                                         />
// // // //                                     </div>

// // // //                                     {/* Product Info */}
// // // //                                     <div className="flex-1 min-w-0">
// // // //                                         <div className="flex justify-between items-start gap-2 mb-2">
// // // //                                             <div className="flex-1 min-w-0">
// // // //                                                 <h3 className="font-bold text-gray-900 text-base md:text-lg truncate">
// // // //                                                     {item.name}
// // // //                                                 </h3>
// // // //                                                 <p className="text-sm text-gray-600 mt-1">
// // // //                                                     {item.brand || 'Brand'}
// // // //                                                 </p>
// // // //                                             </div>
// // // //                                             <button
// // // //                                                 onClick={() => handleRemoveItem(item)}
// // // //                                                 className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg flex-shrink-0"
// // // //                                                 title="Hapus"
// // // //                                             >
// // // //                                                 <Trash2 className="w-5 h-5" />
// // // //                                             </button>
// // // //                                         </div>

// // // //                                         {/* Variants */}
// // // //                                         {(item.size || item.color) && (
// // // //                                             <div className="flex flex-wrap gap-2 mb-3">
// // // //                                                 {item.size && (
// // // //                                                     <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
// // // //                                                         Ukuran: {item.size}
// // // //                                                     </span>
// // // //                                                 )}
// // // //                                                 {item.color && (
// // // //                                                     <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
// // // //                                                         Warna: {item.color}
// // // //                                                     </span>
// // // //                                                 )}
// // // //                                             </div>
// // // //                                         )}

// // // //                                         {/* Price and Quantity */}
// // // //                                         <div className="flex items-center justify-between mt-4">
// // // //                                             <div className="text-lg md:text-xl font-bold text-indigo-600">
// // // //                                                 {formatPrice(item.price * item.quantity)}
// // // //                                             </div>

// // // //                                             {/* Quantity Controls */}
// // // //                                             <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
// // // //                                                 <button
// // // //                                                     onClick={() => handleQuantityChange(item, item.quantity - 1)}
// // // //                                                     disabled={item.quantity <= 1}
// // // //                                                     className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
// // // //                                                 >
// // // //                                                     <Minus className="w-4 h-4" />
// // // //                                                 </button>
// // // //                                                 <span className="font-semibold text-gray-900 min-w-[2rem] text-center">
// // // //                                                     {item.quantity}
// // // //                                                 </span>
// // // //                                                 <button
// // // //                                                     onClick={() => handleQuantityChange(item, item.quantity + 1)}
// // // //                                                     disabled={item.quantity >= item.stock}
// // // //                                                     className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
// // // //                                                 >
// // // //                                                     <Plus className="w-4 h-4" />
// // // //                                                 </button>
// // // //                                             </div>
// // // //                                         </div>

// // // //                                         {/* Stock Warning */}
// // // //                                         {item.quantity >= item.stock && (
// // // //                                             <p className="text-xs text-orange-600 mt-2">
// // // //                                                 Stok maksimal tercapai
// // // //                                             </p>
// // // //                                         )}
// // // //                                     </div>
// // // //                                 </div>
// // // //                             </div>
// // // //                         ))}
// // // //                     </div>

// // // //                     {/* Order Summary */}
// // // //                     <div className="lg:col-span-1">
// // // //                         <div className="bg-white rounded-xl p-6 shadow-sm sticky top-28">
// // // //                             <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>

// // // //                             <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
// // // //                                 <div className="flex justify-between text-gray-600">
// // // //                                     <span>Subtotal ({itemCount} item)</span>
// // // //                                     <span className="font-semibold">{formatPrice(total)}</span>
// // // //                                 </div>
// // // //                                 <div className="flex justify-between text-gray-600">
// // // //                                     <span>Ongkir</span>
// // // //                                     <span className="font-semibold">
// // // //                                         {shippingCost === 0 ? (
// // // //                                             <span className="text-green-600">GRATIS</span>
// // // //                                         ) : (
// // // //                                             formatPrice(shippingCost)
// // // //                                         )}
// // // //                                     </span>
// // // //                                 </div>
// // // //                                 {total < 500000 && (
// // // //                                     <p className="text-xs text-orange-600">
// // // //                                         Belanja Rp {formatPrice(500000 - total)} lagi untuk gratis ongkir!
// // // //                                     </p>
// // // //                                 )}
// // // //                             </div>

// // // //                             <div className="flex justify-between items-center mb-6">
// // // //                                 <span className="text-lg font-bold text-gray-900">Total</span>
// // // //                                 <span className="text-2xl font-bold text-indigo-600">
// // // //                                     {formatPrice(finalTotal)}
// // // //                                 </span>
// // // //                             </div>

// // // //                             <button
// // // //                                 onClick={onCheckout}
// // // //                                 className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
// // // //                             >
// // // //                                 <ShoppingCart className="w-5 h-5" />
// // // //                                 Checkout
// // // //                             </button>

// // // //                             <p className="text-xs text-gray-500 text-center mt-4">
// // // //                                 Belanja aman dengan enkripsi SSL
// // // //                             </p>
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default CartPage;

// // // // src/pages/CartPage.jsx - FIXED HEADER OVERLAP
// // // import { useState } from 'react';
// // // import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from 'lucide-react';
// // // import { useCart } from '../hooks/useCart';

// // // const CartPage = ({ onBack, onCheckout }) => {
// // //     const { cart, total, itemCount, updateQuantity, removeItem } = useCart();
// // //     const [imageErrors, setImageErrors] = useState({});

// // //     const formatPrice = (price) => {
// // //         return new Intl.NumberFormat('id-ID', {
// // //             style: 'currency',
// // //             currency: 'IDR',
// // //             minimumFractionDigits: 0,
// // //         }).format(price);
// // //     };

// // //     const handleQuantityChange = (item, newQuantity) => {
// // //         if (newQuantity < 1) return;
// // //         if (newQuantity > item.stock) {
// // //             alert(`Stok maksimal: ${item.stock}`);
// // //             return;
// // //         }
// // //         updateQuantity(item.id, item.size, item.color, newQuantity);
// // //     };

// // //     const handleRemoveItem = (item) => {
// // //         if (window.confirm(`Hapus ${item.name} dari keranjang?`)) {
// // //             removeItem(item.id, item.size, item.color);
// // //         }
// // //     };

// // //     const getImageUrl = (item) => {
// // //         const itemKey = `${item.id}-${item.size}-${item.color}`;
// // //         if (imageErrors[itemKey]) {
// // //             return 'https://via.placeholder.com/120?text=No+Image';
// // //         }
// // //         return item.image_url || item.image || 'https://via.placeholder.com/120?text=No+Image';
// // //     };

// // //     const handleImageError = (item) => {
// // //         const itemKey = `${item.id}-${item.size}-${item.color}`;
// // //         setImageErrors(prev => ({ ...prev, [itemKey]: true }));
// // //     };

// // //     const shippingCost = total >= 500000 ? 0 : 50000;
// // //     const finalTotal = total + shippingCost;

// // //     if (cart.length === 0) {
// // //         return (
// // //             <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-24 pb-32">
// // //                 <div className="text-center">
// // //                     <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
// // //                         <ShoppingBag className="w-16 h-16 text-gray-400" />
// // //                     </div>
// // //                     <h2 className="text-3xl font-bold text-gray-900 mb-3">Keranjang Kosong</h2>
// // //                     <p className="text-gray-600 mb-8 max-w-md mx-auto">
// // //                         Belum ada produk di keranjang. Mulai berbelanja sekarang!
// // //                     </p>
// // //                     <button
// // //                         onClick={onBack}
// // //                         className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl inline-flex items-center gap-2"
// // //                     >
// // //                         <ShoppingCart className="w-5 h-5" />
// // //                         Mulai Belanja
// // //                     </button>
// // //                 </div>
// // //             </div>
// // //         );
// // //     }

// // //     return (
// // //         <div className="min-h-screen bg-gray-50">
// // //             {/* Header - FIXED: Proper spacing */}
// // //             <div className="bg-white border-b fixed top-0 left-0 right-0 z-50">
// // //                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// // //                     <div className="flex items-center justify-between">
// // //                         <button
// // //                             onClick={onBack}
// // //                             className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
// // //                         >
// // //                             <ArrowLeft className="w-5 h-5" />
// // //                             <span className="hidden sm:inline">Lanjut Belanja</span>
// // //                         </button>
// // //                         <h1 className="text-xl md:text-2xl font-bold text-gray-900">
// // //                             Keranjang ({itemCount})
// // //                         </h1>
// // //                         <div className="w-24"></div>
// // //                     </div>
// // //                 </div>
// // //             </div>

// // //             {/* Main Content - FIXED: Added top padding to prevent overlap */}
// // //             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
// // //                 <div className="grid lg:grid-cols-3 gap-8">
// // //                     {/* Cart Items */}
// // //                     <div className="lg:col-span-2 space-y-4">
// // //                         {cart.map((item) => (
// // //                             <div
// // //                                 key={`${item.id}-${item.size}-${item.color}`}
// // //                                 className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
// // //                             >
// // //                                 <div className="flex gap-4">
// // //                                     {/* Product Image */}
// // //                                     <div className="flex-shrink-0">
// // //                                         <img
// // //                                             src={getImageUrl(item)}
// // //                                             alt={item.name}
// // //                                             className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg bg-gray-100"
// // //                                             onError={() => handleImageError(item)}
// // //                                         />
// // //                                     </div>

// // //                                     {/* Product Info */}
// // //                                     <div className="flex-1 min-w-0">
// // //                                         <div className="flex justify-between items-start gap-2 mb-2">
// // //                                             <div className="flex-1 min-w-0">
// // //                                                 <h3 className="font-bold text-gray-900 text-base md:text-lg truncate">
// // //                                                     {item.name}
// // //                                                 </h3>
// // //                                                 <p className="text-sm text-gray-600 mt-1">
// // //                                                     {item.brand || 'Brand'}
// // //                                                 </p>
// // //                                             </div>
// // //                                             <button
// // //                                                 onClick={() => handleRemoveItem(item)}
// // //                                                 className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg flex-shrink-0"
// // //                                                 title="Hapus"
// // //                                             >
// // //                                                 <Trash2 className="w-5 h-5" />
// // //                                             </button>
// // //                                         </div>

// // //                                         {/* Variants */}
// // //                                         {(item.size || item.color) && (
// // //                                             <div className="flex flex-wrap gap-2 mb-3">
// // //                                                 {item.size && (
// // //                                                     <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
// // //                                                         Ukuran: {item.size}
// // //                                                     </span>
// // //                                                 )}
// // //                                                 {item.color && (
// // //                                                     <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
// // //                                                         Warna: {item.color}
// // //                                                     </span>
// // //                                                 )}
// // //                                             </div>
// // //                                         )}

// // //                                         {/* Price and Quantity */}
// // //                                         <div className="flex items-center justify-between mt-4">
// // //                                             <div className="text-lg md:text-xl font-bold text-indigo-600">
// // //                                                 {formatPrice(item.price * item.quantity)}
// // //                                             </div>

// // //                                             {/* Quantity Controls */}
// // //                                             <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
// // //                                                 <button
// // //                                                     onClick={() => handleQuantityChange(item, item.quantity - 1)}
// // //                                                     disabled={item.quantity <= 1}
// // //                                                     className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
// // //                                                 >
// // //                                                     <Minus className="w-4 h-4" />
// // //                                                 </button>
// // //                                                 <span className="font-semibold text-gray-900 min-w-[2rem] text-center">
// // //                                                     {item.quantity}
// // //                                                 </span>
// // //                                                 <button
// // //                                                     onClick={() => handleQuantityChange(item, item.quantity + 1)}
// // //                                                     disabled={item.quantity >= item.stock}
// // //                                                     className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
// // //                                                 >
// // //                                                     <Plus className="w-4 h-4" />
// // //                                                 </button>
// // //                                             </div>
// // //                                         </div>

// // //                                         {/* Stock Warning */}
// // //                                         {item.quantity >= item.stock && (
// // //                                             <p className="text-xs text-orange-600 mt-2">
// // //                                                 Stok maksimal tercapai
// // //                                             </p>
// // //                                         )}
// // //                                     </div>
// // //                                 </div>
// // //                             </div>
// // //                         ))}
// // //                     </div>

// // //                     {/* Order Summary - FIXED: Better sticky positioning */}
// // //                     <div className="lg:col-span-1">
// // //                         <div className="bg-white rounded-xl p-6 shadow-sm lg:sticky lg:top-24">
// // //                             <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>

// // //                             <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
// // //                                 <div className="flex justify-between text-gray-600">
// // //                                     <span>Subtotal ({itemCount} item)</span>
// // //                                     <span className="font-semibold">{formatPrice(total)}</span>
// // //                                 </div>
// // //                                 <div className="flex justify-between text-gray-600">
// // //                                     <span>Ongkir</span>
// // //                                     <span className="font-semibold">
// // //                                         {shippingCost === 0 ? (
// // //                                             <span className="text-green-600">GRATIS</span>
// // //                                         ) : (
// // //                                             formatPrice(shippingCost)
// // //                                         )}
// // //                                     </span>
// // //                                 </div>
// // //                                 {total < 500000 && (
// // //                                     <p className="text-xs text-orange-600">
// // //                                         Belanja {formatPrice(500000 - total)} lagi untuk gratis ongkir!
// // //                                     </p>
// // //                                 )}
// // //                             </div>

// // //                             <div className="flex justify-between items-center mb-6">
// // //                                 <span className="text-lg font-bold text-gray-900">Total</span>
// // //                                 <span className="text-2xl font-bold text-indigo-600">
// // //                                     {formatPrice(finalTotal)}
// // //                                 </span>
// // //                             </div>

// // //                             <button
// // //                                 onClick={onCheckout}
// // //                                 className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
// // //                             >
// // //                                 <ShoppingCart className="w-5 h-5" />
// // //                                 Checkout
// // //                             </button>

// // //                             <p className="text-xs text-gray-500 text-center mt-4">
// // //                                 Belanja aman dengan enkripsi SSL
// // //                             </p>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default CartPage;

// // // src/pages/CartPage.jsx - FINAL FIX
// // import { useState } from 'react';
// // import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from 'lucide-react';
// // import { useCart } from '../hooks/useCart';

// // const CartPage = ({ onBack, onCheckout }) => {
// //     const { cart, total, itemCount, updateQuantity, removeItem } = useCart();
// //     const [imageErrors, setImageErrors] = useState({});

// //     const formatPrice = (price) => {
// //         return new Intl.NumberFormat('id-ID', {
// //             style: 'currency',
// //             currency: 'IDR',
// //             minimumFractionDigits: 0,
// //         }).format(price);
// //     };

// //     const handleQuantityChange = (item, newQuantity) => {
// //         if (newQuantity < 1) return;
// //         if (newQuantity > item.stock) {
// //             alert(`Stok maksimal: ${item.stock}`);
// //             return;
// //         }
// //         updateQuantity(item.id, item.size, item.color, newQuantity);
// //     };

// //     const handleRemoveItem = (item) => {
// //         if (window.confirm(`Hapus ${item.name} dari keranjang?`)) {
// //             removeItem(item.id, item.size, item.color);
// //         }
// //     };

// //     const getImageUrl = (item) => {
// //         const itemKey = `${item.id}-${item.size}-${item.color}`;
// //         if (imageErrors[itemKey]) {
// //             return 'https://via.placeholder.com/120?text=No+Image';
// //         }
// //         return item.image_url || item.image || 'https://via.placeholder.com/120?text=No+Image';
// //     };

// //     const handleImageError = (item) => {
// //         const itemKey = `${item.id}-${item.size}-${item.color}`;
// //         setImageErrors(prev => ({ ...prev, [itemKey]: true }));
// //     };

// //     const shippingCost = total >= 500000 ? 0 : 50000;
// //     const finalTotal = total + shippingCost;

// //     if (cart.length === 0) {
// //         return (
// //             <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-32">
// //                 <div className="text-center">
// //                     <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
// //                         <ShoppingBag className="w-16 h-16 text-gray-400" />
// //                     </div>
// //                     <h2 className="text-3xl font-bold text-gray-900 mb-3">Keranjang Kosong</h2>
// //                     <p className="text-gray-600 mb-8 max-w-md mx-auto">
// //                         Belum ada produk di keranjang. Mulai berbelanja sekarang!
// //                     </p>
// //                     <button
// //                         onClick={onBack}
// //                         className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl inline-flex items-center gap-2"
// //                     >
// //                         <ShoppingCart className="w-5 h-5" />
// //                         Mulai Belanja
// //                     </button>
// //                 </div>
// //             </div>
// //         );
// //     }

// //     return (
// //         <div className="min-h-screen bg-gray-50">
// //             {/* Header - FIXED: Better positioning */}
// //             <div className="bg-white border-b fixed top-0 left-0 right-0 z-50">
// //                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// //                     <div className="flex items-center justify-between">
// //                         <button
// //                             onClick={onBack}
// //                             className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
// //                         >
// //                             <ArrowLeft className="w-5 h-5" />
// //                             <span className="hidden sm:inline">Lanjut Belanja</span>
// //                         </button>
// //                         <h1 className="text-xl md:text-2xl font-bold text-gray-900">
// //                             Keranjang ({itemCount})
// //                         </h1>
// //                         <div className="w-24"></div>
// //                     </div>
// //                 </div>
// //             </div>

// //             {/* Main Content - FIXED: Increased top padding */}
// //             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8">
// //                 <div className="grid lg:grid-cols-3 gap-8">
// //                     {/* Cart Items */}
// //                     <div className="lg:col-span-2 space-y-4">
// //                         {cart.map((item) => {
// //                             // FIXED: Ensure price is a number
// //                             const itemPrice = Number(item.price) || 0;
// //                             const itemQuantity = Number(item.quantity) || 1;

// //                             return (
// //                                 <div
// //                                     key={`${item.id}-${item.size}-${item.color}`}
// //                                     className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
// //                                 >
// //                                     <div className="flex gap-4">
// //                                         {/* Product Image */}
// //                                         <div className="flex-shrink-0">
// //                                             <img
// //                                                 src={getImageUrl(item)}
// //                                                 alt={item.name}
// //                                                 className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg bg-gray-100"
// //                                                 onError={() => handleImageError(item)}
// //                                             />
// //                                         </div>

// //                                         {/* Product Info */}
// //                                         <div className="flex-1 min-w-0">
// //                                             <div className="flex justify-between items-start gap-2 mb-2">
// //                                                 <div className="flex-1 min-w-0">
// //                                                     <h3 className="font-bold text-gray-900 text-base md:text-lg truncate">
// //                                                         {item.name}
// //                                                     </h3>
// //                                                     <p className="text-sm text-gray-600 mt-1">
// //                                                         {item.brand || 'Brand'}
// //                                                     </p>
// //                                                 </div>
// //                                                 <button
// //                                                     onClick={() => handleRemoveItem(item)}
// //                                                     className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg flex-shrink-0"
// //                                                     title="Hapus"
// //                                                 >
// //                                                     <Trash2 className="w-5 h-5" />
// //                                                 </button>
// //                                             </div>

// //                                             {/* Variants */}
// //                                             {(item.size || item.color) && (
// //                                                 <div className="flex flex-wrap gap-2 mb-3">
// //                                                     {item.size && (
// //                                                         <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
// //                                                             Ukuran: {item.size}
// //                                                         </span>
// //                                                     )}
// //                                                     {item.color && (
// //                                                         <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
// //                                                             Warna: {item.color}
// //                                                         </span>
// //                                                     )}
// //                                                 </div>
// //                                             )}

// //                                             {/* Price and Quantity */}
// //                                             <div className="flex items-center justify-between mt-4">
// //                                                 <div className="text-lg md:text-xl font-bold text-indigo-600">
// //                                                     {formatPrice(itemPrice * itemQuantity)}
// //                                                 </div>

// //                                                 {/* Quantity Controls */}
// //                                                 <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
// //                                                     <button
// //                                                         onClick={() => handleQuantityChange(item, itemQuantity - 1)}
// //                                                         disabled={itemQuantity <= 1}
// //                                                         className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
// //                                                     >
// //                                                         <Minus className="w-4 h-4" />
// //                                                     </button>
// //                                                     <span className="font-semibold text-gray-900 min-w-[2rem] text-center">
// //                                                         {itemQuantity}
// //                                                     </span>
// //                                                     <button
// //                                                         onClick={() => handleQuantityChange(item, itemQuantity + 1)}
// //                                                         disabled={itemQuantity >= item.stock}
// //                                                         className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
// //                                                     >
// //                                                         <Plus className="w-4 h-4" />
// //                                                     </button>
// //                                                 </div>
// //                                             </div>

// //                                             {/* Stock Warning */}
// //                                             {itemQuantity >= item.stock && (
// //                                                 <p className="text-xs text-orange-600 mt-2">
// //                                                     Stok maksimal tercapai
// //                                                 </p>
// //                                             )}

// //                                             {/* Debug: Show if price is 0 */}
// //                                             {itemPrice === 0 && (
// //                                                 <p className="text-xs text-red-600 mt-2">
// //                                                     ⚠️ Harga produk tidak valid
// //                                                 </p>
// //                                             )}
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             );
// //                         })}
// //                     </div>

// //                     {/* Order Summary - FIXED: Better sticky positioning */}
// //                     <div className="lg:col-span-1">
// //                         <div className="bg-white rounded-xl p-6 shadow-sm lg:sticky lg:top-28">
// //                             <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>

// //                             <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
// //                                 <div className="flex justify-between text-gray-600">
// //                                     <span>Subtotal ({itemCount} item)</span>
// //                                     <span className="font-semibold">{formatPrice(total)}</span>
// //                                 </div>
// //                                 <div className="flex justify-between text-gray-600">
// //                                     <span>Ongkir</span>
// //                                     <span className="font-semibold">
// //                                         {shippingCost === 0 ? (
// //                                             <span className="text-green-600">GRATIS</span>
// //                                         ) : (
// //                                             formatPrice(shippingCost)
// //                                         )}
// //                                     </span>
// //                                 </div>
// //                                 {total < 500000 && total > 0 && (
// //                                     <p className="text-xs text-orange-600">
// //                                         Belanja {formatPrice(500000 - total)} lagi untuk gratis ongkir!
// //                                     </p>
// //                                 )}
// //                             </div>

// //                             <div className="flex justify-between items-center mb-6">
// //                                 <span className="text-lg font-bold text-gray-900">Total</span>
// //                                 <span className="text-2xl font-bold text-indigo-600">
// //                                     {formatPrice(finalTotal)}
// //                                 </span>
// //                             </div>

// //                             <button
// //                                 onClick={onCheckout}
// //                                 disabled={total === 0}
// //                                 className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
// //                             >
// //                                 <ShoppingCart className="w-5 h-5" />
// //                                 Checkout
// //                             </button>

// //                             <p className="text-xs text-gray-500 text-center mt-4">
// //                                 Belanja aman dengan enkripsi SSL
// //                             </p>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default CartPage;

// // src/pages/CartPage.jsx - ULTIMATE FIX
// import { useState } from 'react';
// import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from 'lucide-react';
// import { useCart } from '../hooks/useCart';

// const CartPage = ({ onBack, onCheckout }) => {
//     const { cart, total, itemCount, updateQuantity, removeItem } = useCart();
//     const [imageErrors, setImageErrors] = useState({});

//     const formatPrice = (price) => {
//         return new Intl.NumberFormat('id-ID', {
//             style: 'currency',
//             currency: 'IDR',
//             minimumFractionDigits: 0,
//         }).format(price);
//     };

//     const handleQuantityChange = (item, newQuantity) => {
//         if (newQuantity < 1) return;
//         if (newQuantity > item.stock) {
//             alert(`Stok maksimal: ${item.stock}`);
//             return;
//         }
//         updateQuantity(item.id, item.size, item.color, newQuantity);
//     };

//     const handleRemoveItem = (item) => {
//         if (window.confirm(`Hapus ${item.name} dari keranjang?`)) {
//             removeItem(item.id, item.size, item.color);
//         }
//     };

//     const getImageUrl = (item) => {
//         const itemKey = `${item.id}-${item.size}-${item.color}`;
//         if (imageErrors[itemKey]) {
//             return 'https://via.placeholder.com/120?text=No+Image';
//         }
//         return item.image_url || item.image || 'https://via.placeholder.com/120?text=No+Image';
//     };

//     const handleImageError = (item) => {
//         const itemKey = `${item.id}-${item.size}-${item.color}`;
//         setImageErrors(prev => ({ ...prev, [itemKey]: true }));
//     };

//     const shippingCost = total >= 500000 ? 0 : 50000;
//     const finalTotal = total + shippingCost;

//     if (cart.length === 0) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-32">
//                 <div className="text-center">
//                     <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                         <ShoppingBag className="w-16 h-16 text-gray-400" />
//                     </div>
//                     <h2 className="text-3xl font-bold text-gray-900 mb-3">Keranjang Kosong</h2>
//                     <p className="text-gray-600 mb-8 max-w-md mx-auto">
//                         Belum ada produk di keranjang. Mulai berbelanja sekarang!
//                     </p>
//                     <button
//                         onClick={onBack}
//                         className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl inline-flex items-center gap-2"
//                     >
//                         <ShoppingCart className="w-5 h-5" />
//                         Mulai Belanja
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Header - FIXED: More space */}
//             <div className="bg-white border-b fixed top-0 left-0 right-0 z-50">
//                 <div className="max-w-7xl mx-auto px-4 pt-36 pb-8">
//                     <div className="flex items-center justify-between">
//                         <button
//                             onClick={onBack}
//                             className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
//                         >
//                             <ArrowLeft className="w-5 h-5" />
//                             <span className="hidden sm:inline">Lanjut Belanja</span>
//                         </button>
//                         <h1 className="text-xl md:text-2xl font-bold text-gray-900">
//                             Keranjang ({itemCount})
//                         </h1>
//                         <div className="w-24"></div>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Content - CRITICAL FIX: HUGE TOP PADDING */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-8">
//                 <div className="grid lg:grid-cols-3 gap-8">
//                     {/* Cart Items */}
//                     <div className="lg:col-span-2 space-y-4">
//                         {cart.map((item) => {
//                             const itemPrice = Number(item.price) || 0;
//                             const itemQuantity = Number(item.quantity) || 1;

//                             return (
//                                 <div
//                                     key={`${item.id}-${item.size}-${item.color}`}
//                                     className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
//                                 >
//                                     <div className="flex gap-4">
//                                         <div className="flex-shrink-0">
//                                             <img
//                                                 src={getImageUrl(item)}
//                                                 alt={item.name}
//                                                 className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg bg-gray-100"
//                                                 onError={() => handleImageError(item)}
//                                             />
//                                         </div>

//                                         <div className="flex-1 min-w-0">
//                                             <div className="flex justify-between items-start gap-2 mb-2">
//                                                 <div className="flex-1 min-w-0">
//                                                     <h3 className="font-bold text-gray-900 text-base md:text-lg">
//                                                         {item.name}
//                                                     </h3>
//                                                     <p className="text-sm text-gray-600 mt-1">
//                                                         {item.brand || 'Brand'}
//                                                     </p>
//                                                 </div>
//                                                 <button
//                                                     onClick={() => handleRemoveItem(item)}
//                                                     className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg flex-shrink-0"
//                                                 >
//                                                     <Trash2 className="w-5 h-5" />
//                                                 </button>
//                                             </div>

//                                             {(item.size || item.color) && (
//                                                 <div className="flex flex-wrap gap-2 mb-3">
//                                                     {item.size && (
//                                                         <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
//                                                             Ukuran: {item.size}
//                                                         </span>
//                                                     )}
//                                                     {item.color && (
//                                                         <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
//                                                             Warna: {item.color}
//                                                         </span>
//                                                     )}
//                                                 </div>
//                                             )}

//                                             <div className="flex items-center justify-between mt-4">
//                                                 <div className="text-lg md:text-xl font-bold text-indigo-600">
//                                                     {formatPrice(itemPrice * itemQuantity)}
//                                                 </div>

//                                                 <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
//                                                     <button
//                                                         onClick={() => handleQuantityChange(item, itemQuantity - 1)}
//                                                         disabled={itemQuantity <= 1}
//                                                         className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                                     >
//                                                         <Minus className="w-4 h-4" />
//                                                     </button>
//                                                     <span className="font-semibold text-gray-900 min-w-[2rem] text-center">
//                                                         {itemQuantity}
//                                                     </span>
//                                                     <button
//                                                         onClick={() => handleQuantityChange(item, itemQuantity + 1)}
//                                                         disabled={itemQuantity >= item.stock}
//                                                         className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                                     >
//                                                         <Plus className="w-4 h-4" />
//                                                     </button>
//                                                 </div>
//                                             </div>

//                                             {itemQuantity >= item.stock && (
//                                                 <p className="text-xs text-orange-600 mt-2">
//                                                     Stok maksimal tercapai
//                                                 </p>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>

//                     {/* Order Summary - FIXED: Better positioning */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white rounded-xl p-6 shadow-sm lg:sticky lg:top-36">
//                             <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>

//                             <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
//                                 <div className="flex justify-between text-gray-600">
//                                     <span>Subtotal ({itemCount} item)</span>
//                                     <span className="font-semibold">{formatPrice(total)}</span>
//                                 </div>
//                                 <div className="flex justify-between text-gray-600">
//                                     <span>Ongkir</span>
//                                     <span className="font-semibold">
//                                         {shippingCost === 0 ? (
//                                             <span className="text-green-600">GRATIS</span>
//                                         ) : (
//                                             formatPrice(shippingCost)
//                                         )}
//                                     </span>
//                                 </div>
//                                 {total < 500000 && total > 0 && (
//                                     <p className="text-xs text-orange-600">
//                                         Belanja {formatPrice(500000 - total)} lagi untuk gratis ongkir!
//                                     </p>
//                                 )}
//                             </div>

//                             <div className="flex justify-between items-center mb-6">
//                                 <span className="text-lg font-bold text-gray-900">Total</span>
//                                 <span className="text-2xl font-bold text-indigo-600">
//                                     {formatPrice(finalTotal)}
//                                 </span>
//                             </div>

//                             <button
//                                 onClick={onCheckout}
//                                 disabled={total === 0}
//                                 className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 <ShoppingCart className="w-5 h-5" />
//                                 Checkout
//                             </button>

//                             <p className="text-xs text-gray-500 text-center mt-4">
//                                 Belanja aman dengan enkripsi SSL
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CartPage;

// src/pages/CartPage.jsx - MASSIVE PADDING FIX
import { useState } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const CartPage = ({ onBack, onCheckout }) => {
    const { cart, total, itemCount, updateQuantity, removeItem } = useCart();
    const [imageErrors, setImageErrors] = useState({});

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity < 1) return;
        if (newQuantity > item.stock) {
            alert(`Stok maksimal: ${item.stock}`);
            return;
        }
        updateQuantity(item.id, item.size, item.color, newQuantity);
    };

    const handleRemoveItem = (item) => {
        if (window.confirm(`Hapus ${item.name} dari keranjang?`)) {
            removeItem(item.id, item.size, item.color);
        }
    };

    const getImageUrl = (item) => {
        const itemKey = `${item.id}-${item.size}-${item.color}`;
        if (imageErrors[itemKey]) {
            return 'https://via.placeholder.com/120?text=No+Image';
        }
        return item.image_url || item.image || 'https://via.placeholder.com/120?text=No+Image';
    };

    const handleImageError = (item) => {
        const itemKey = `${item.id}-${item.size}-${item.color}`;
        setImageErrors(prev => ({ ...prev, [itemKey]: true }));
    };

    const shippingCost = total >= 500000 ? 0 : 50000;
    const finalTotal = total + shippingCost;

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-32">
                <div className="text-center">
                    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="w-16 h-16 text-gray-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Keranjang Kosong</h2>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Belum ada produk di keranjang. Mulai berbelanja sekarang!
                    </p>
                    <button
                        onClick={onBack}
                        className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        Mulai Belanja
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header - FIXED */}
            <div className="bg-white border-b fixed top-0 left-0 right-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="hidden sm:inline">Lanjut Belanja</span>
                        </button>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                            Keranjang ({itemCount})
                        </h1>
                        <div className="w-24"></div>
                    </div>
                </div>
            </div>

            {/* CRITICAL: MASSIVE TOP PADDING - 176px! */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 pb-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => {
                            const itemPrice = Number(item.price) || 0;
                            const itemQuantity = Number(item.quantity) || 1;

                            return (
                                <div
                                    key={`${item.id}-${item.size}-${item.color}`}
                                    className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={getImageUrl(item)}
                                                alt={item.name}
                                                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg bg-gray-100"
                                                onError={() => handleImageError(item)}
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start gap-2 mb-2">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-gray-900 text-base md:text-lg">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {item.brand || 'Brand'}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveItem(item)}
                                                    className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg flex-shrink-0"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>

                                            {(item.size || item.color) && (
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {item.size && (
                                                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                                            Ukuran: {item.size}
                                                        </span>
                                                    )}
                                                    {item.color && (
                                                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                                            Warna: {item.color}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="text-lg md:text-xl font-bold text-indigo-600">
                                                    {formatPrice(itemPrice * itemQuantity)}
                                                </div>

                                                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                                                    <button
                                                        onClick={() => handleQuantityChange(item, itemQuantity - 1)}
                                                        disabled={itemQuantity <= 1}
                                                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="font-semibold text-gray-900 min-w-[2rem] text-center">
                                                        {itemQuantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleQuantityChange(item, itemQuantity + 1)}
                                                        disabled={itemQuantity >= item.stock}
                                                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            {itemQuantity >= item.stock && (
                                                <p className="text-xs text-orange-600 mt-2">
                                                    Stok maksimal tercapai
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl p-6 shadow-sm lg:sticky lg:top-44">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>

                            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal ({itemCount} item)</span>
                                    <span className="font-semibold">{formatPrice(total)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Ongkir</span>
                                    <span className="font-semibold">
                                        {shippingCost === 0 ? (
                                            <span className="text-green-600">GRATIS</span>
                                        ) : (
                                            formatPrice(shippingCost)
                                        )}
                                    </span>
                                </div>
                                {total < 500000 && total > 0 && (
                                    <p className="text-xs text-orange-600">
                                        Belanja {formatPrice(500000 - total)} lagi untuk gratis ongkir!
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <span className="text-lg font-bold text-gray-900">Total</span>
                                <span className="text-2xl font-bold text-indigo-600">
                                    {formatPrice(finalTotal)}
                                </span>
                            </div>

                            <button
                                onClick={onCheckout}
                                disabled={total === 0}
                                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Checkout
                            </button>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                Belanja aman dengan enkripsi SSL
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;