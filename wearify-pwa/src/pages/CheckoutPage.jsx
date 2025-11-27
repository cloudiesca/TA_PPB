// // src/pages/CheckoutPage.jsx
// import { useState } from 'react';
// import { ArrowLeft, CreditCard, MapPin, User, Mail, Phone, Check } from 'lucide-react';
// import { useCart } from '../hooks/useCart';

// const CheckoutPage = ({ onBack, onSuccess }) => {
//     const { cart, total, itemCount, clearCart } = useCart();
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         address: '',
//         city: '',
//         postalCode: '',
//         paymentMethod: 'credit-card'
//     });
//     const [isProcessing, setIsProcessing] = useState(false);

//     const formatPrice = (price) => {
//         return new Intl.NumberFormat('id-ID', {
//             style: 'currency',
//             currency: 'IDR',
//             minimumFractionDigits: 0,
//         }).format(price);
//     };

//     const shippingCost = total >= 500000 ? 0 : 50000;
//     const finalTotal = total + shippingCost;

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Validation
//         if (!formData.name || !formData.email || !formData.phone || !formData.address) {
//             alert('Please fill in all required fields');
//             return;
//         }

//         setIsProcessing(true);

//         // Simulate payment processing
//         setTimeout(() => {
//             clearCart();
//             setIsProcessing(false);
//             onSuccess();
//             alert('Order placed successfully! 🎉');
//         }, 2000);
//     };

//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Header */}
//             <div className="bg-white border-b sticky top-0 z-10">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//                     <button
//                         onClick={onBack}
//                         className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
//                     >
//                         <ArrowLeft className="w-5 h-5" />
//                         Back to Cart
//                     </button>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

//                 <form onSubmit={handleSubmit}>
//                     <div className="grid lg:grid-cols-3 gap-8">
//                         {/* Checkout Form */}
//                         <div className="lg:col-span-2 space-y-6">
//                             {/* Personal Information */}
//                             <div className="bg-white rounded-xl p-6 shadow-sm">
//                                 <div className="flex items-center gap-3 mb-6">
//                                     <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
//                                         <User className="w-5 h-5 text-indigo-600" />
//                                     </div>
//                                     <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
//                                 </div>

//                                 <div className="grid md:grid-cols-2 gap-4">
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                                             Full Name *
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="name"
//                                             value={formData.name}
//                                             onChange={handleChange}
//                                             required
//                                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                                             placeholder="John Doe"
//                                         />
//                                     </div>

//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                                             Email *
//                                         </label>
//                                         <input
//                                             type="email"
//                                             name="email"
//                                             value={formData.email}
//                                             onChange={handleChange}
//                                             required
//                                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                                             placeholder="john@example.com"
//                                         />
//                                     </div>

//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                                             Phone Number *
//                                         </label>
//                                         <input
//                                             type="tel"
//                                             name="phone"
//                                             value={formData.phone}
//                                             onChange={handleChange}
//                                             required
//                                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                                             placeholder="+62 812 3456 7890"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Shipping Address */}
//                             <div className="bg-white rounded-xl p-6 shadow-sm">
//                                 <div className="flex items-center gap-3 mb-6">
//                                     <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
//                                         <MapPin className="w-5 h-5 text-indigo-600" />
//                                     </div>
//                                     <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
//                                 </div>

//                                 <div className="space-y-4">
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                                             Street Address *
//                                         </label>
//                                         <textarea
//                                             name="address"
//                                             value={formData.address}
//                                             onChange={handleChange}
//                                             required
//                                             rows={3}
//                                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                                             placeholder="123 Main Street, Apartment 4B"
//                                         />
//                                     </div>

//                                     <div className="grid md:grid-cols-2 gap-4">
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                                 City *
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 name="city"
//                                                 value={formData.city}
//                                                 onChange={handleChange}
//                                                 required
//                                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                                                 placeholder="Jakarta"
//                                             />
//                                         </div>

//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                                 Postal Code *
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 name="postalCode"
//                                                 value={formData.postalCode}
//                                                 onChange={handleChange}
//                                                 required
//                                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                                                 placeholder="12345"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Payment Method */}
//                             <div className="bg-white rounded-xl p-6 shadow-sm">
//                                 <div className="flex items-center gap-3 mb-6">
//                                     <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
//                                         <CreditCard className="w-5 h-5 text-indigo-600" />
//                                     </div>
//                                     <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
//                                 </div>

//                                 <div className="space-y-3">
//                                     <PaymentOption
//                                         id="credit-card"
//                                         name="paymentMethod"
//                                         value="credit-card"
//                                         checked={formData.paymentMethod === 'credit-card'}
//                                         onChange={handleChange}
//                                         label="Credit / Debit Card"
//                                         description="Visa, Mastercard, AMEX"
//                                     />
//                                     <PaymentOption
//                                         id="bank-transfer"
//                                         name="paymentMethod"
//                                         value="bank-transfer"
//                                         checked={formData.paymentMethod === 'bank-transfer'}
//                                         onChange={handleChange}
//                                         label="Bank Transfer"
//                                         description="BCA, Mandiri, BNI"
//                                     />
//                                     <PaymentOption
//                                         id="e-wallet"
//                                         name="paymentMethod"
//                                         value="e-wallet"
//                                         checked={formData.paymentMethod === 'e-wallet'}
//                                         onChange={handleChange}
//                                         label="E-Wallet"
//                                         description="GoPay, OVO, Dana"
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Order Summary */}
//                         <div className="lg:col-span-1">
//                             <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
//                                 <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

//                                 {/* Cart Items */}
//                                 <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
//                                     {cart.map((item) => (
//                                         <div key={`${item.id}-${item.size}`} className="flex gap-3 pb-3 border-b border-gray-200">
//                                             <img
//                                                 src={item.image || 'https://via.placeholder.com/80'}
//                                                 alt={item.name}
//                                                 className="w-16 h-16 object-cover rounded-lg bg-gray-100"
//                                                 onError={(e) => {
//                                                     e.target.src = 'https://via.placeholder.com/80?text=No+Image';
//                                                 }}
//                                             />
//                                             <div className="flex-1 min-w-0">
//                                                 <p className="font-medium text-gray-900 truncate text-sm">{item.name}</p>
//                                                 <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
//                                                 <p className="text-sm font-semibold text-indigo-600">{formatPrice(item.price * item.quantity)}</p>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 {/* Price Breakdown */}
//                                 <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
//                                     <div className="flex justify-between text-gray-600">
//                                         <span>Subtotal ({itemCount} items)</span>
//                                         <span className="font-semibold">{formatPrice(total)}</span>
//                                     </div>
//                                     <div className="flex justify-between text-gray-600">
//                                         <span>Shipping</span>
//                                         <span className="font-semibold">{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
//                                     </div>
//                                 </div>

//                                 <div className="flex justify-between items-center mb-6">
//                                     <span className="text-lg font-bold text-gray-900">Total</span>
//                                     <span className="text-2xl font-bold text-indigo-600">{formatPrice(finalTotal)}</span>
//                                 </div>

//                                 {/* Place Order Button */}
//                                 <button
//                                     type="submit"
//                                     disabled={isProcessing}
//                                     className="w-full py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                                 >
//                                     {isProcessing ? (
//                                         <>
//                                             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                                             Processing...
//                                         </>
//                                     ) : (
//                                         <>
//                                             <Check className="w-5 h-5" />
//                                             Place Order
//                                         </>
//                                     )}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// const PaymentOption = ({ id, name, value, checked, onChange, label, description }) => (
//     <label
//         htmlFor={id}
//         className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${checked ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
//             }`}
//     >
//         <input
//             type="radio"
//             id={id}
//             name={name}
//             value={value}
//             checked={checked}
//             onChange={onChange}
//             className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
//         />
//         <div className="flex-1">
//             <p className="font-semibold text-gray-900">{label}</p>
//             <p className="text-sm text-gray-600">{description}</p>
//         </div>
//     </label>
// );

// export default CheckoutPage;

// src/pages/CheckoutPage.jsx - FIXED IMAGE CONSISTENCY
import { useState } from 'react';
import { ArrowLeft, CreditCard, MapPin, User, Mail, Phone, Check } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const CheckoutPage = ({ onBack, onSuccess }) => {
    const { cart, total, itemCount, clearCart } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        paymentMethod: 'credit-card'
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [imageErrors, setImageErrors] = useState({});

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const shippingCost = total >= 500000 ? 0 : 50000;
    const finalTotal = total + shippingCost;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e?.preventDefault?.();

        // Validation
        if (!formData.name || !formData.email || !formData.phone || !formData.address) {
            alert('Mohon lengkapi semua field yang diperlukan');
            return;
        }

        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            clearCart();
            setIsProcessing(false);
            onSuccess();
            alert('Pesanan berhasil dibuat! 🎉');
        }, 2000);
    };

    // FIXED: Get correct image URL with fallback
    const getImageUrl = (item) => {
        const itemKey = `${item.id}-${item.size}-${item.color}`;
        if (imageErrors[itemKey]) {
            return 'https://via.placeholder.com/80?text=No+Image';
        }
        return item.image_url || item.image || 'https://via.placeholder.com/80?text=No+Image';
    };

    const handleImageError = (item) => {
        const itemKey = `${item.id}-${item.size}-${item.color}`;
        setImageErrors(prev => ({ ...prev, [itemKey]: true }));
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-24">
            {/* Content */}
            <div className="bg-white border-b sticky top-16 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Kembali ke Keranjang
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal Information */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <User className="w-5 h-5 text-indigo-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Informasi Pribadi</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Lengkap *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nomor Telepon *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="+62 812 3456 7890"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-indigo-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Alamat Pengiriman</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Alamat Lengkap *
                                    </label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Jl. Contoh No. 123, Apartment 4B"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Kota *
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            placeholder="Jakarta"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Kode Pos *
                                        </label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            placeholder="12345"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-indigo-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Metode Pembayaran</h2>
                            </div>

                            <div className="space-y-3">
                                <PaymentOption
                                    id="credit-card"
                                    name="paymentMethod"
                                    value="credit-card"
                                    checked={formData.paymentMethod === 'credit-card'}
                                    onChange={handleChange}
                                    label="Kartu Kredit / Debit"
                                    description="Visa, Mastercard, AMEX"
                                />
                                <PaymentOption
                                    id="bank-transfer"
                                    name="paymentMethod"
                                    value="bank-transfer"
                                    checked={formData.paymentMethod === 'bank-transfer'}
                                    onChange={handleChange}
                                    label="Transfer Bank"
                                    description="BCA, Mandiri, BNI"
                                />
                                <PaymentOption
                                    id="e-wallet"
                                    name="paymentMethod"
                                    value="e-wallet"
                                    checked={formData.paymentMethod === 'e-wallet'}
                                    onChange={handleChange}
                                    label="E-Wallet"
                                    description="GoPay, OVO, Dana"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl p-6 shadow-sm sticky top-28">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>

                            {/* Cart Items - FIXED IMAGE */}
                            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                                {cart.map((item) => (
                                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3 pb-3 border-b border-gray-200 last:border-0">
                                        <img
                                            src={getImageUrl(item)}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                                            onError={() => handleImageError(item)}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 truncate text-sm">{item.name}</p>
                                            <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                                                <span>Qty: {item.quantity}</span>
                                                {item.size && <span>• {item.size}</span>}
                                                {item.color && <span>• {item.color}</span>}
                                            </div>
                                            <p className="text-sm font-semibold text-indigo-600 mt-1">
                                                {formatPrice(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal ({itemCount} item)</span>
                                    <span className="font-semibold">{formatPrice(total)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Ongkir</span>
                                    <span className="font-semibold">{shippingCost === 0 ? 'GRATIS' : formatPrice(shippingCost)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <span className="text-lg font-bold text-gray-900">Total</span>
                                <span className="text-2xl font-bold text-indigo-600">{formatPrice(finalTotal)}</span>
                            </div>

                            {/* Place Order Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={isProcessing}
                                className="w-full py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Memproses...
                                    </>
                                ) : (
                                    <>
                                        <Check className="w-5 h-5" />
                                        Buat Pesanan
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

const PaymentOption = ({ id, name, value, checked, onChange, label, description }) => (
    <label
        htmlFor={id}
        className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${checked ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
            }`}
    >
        <input
            type="radio"
            id={id}
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
        />
        <div className="flex-1">
            <p className="font-semibold text-gray-900">{label}</p>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    </label>
);

export default CheckoutPage;