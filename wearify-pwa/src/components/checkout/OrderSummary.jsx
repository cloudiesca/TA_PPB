import { formatCurrency } from '../../utils/helpers';

export default function OrderSummary({ cart, subtotal, shipping, total }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h2>

            {/* Cart Items */}
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item, index) => (
                    <div key={`${item.id}-${item.size}-${item.color}-${index}`} className="flex gap-3">
                        <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                                src={item.image_url}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-slate-800 text-sm truncate">
                                {item.name}
                            </h4>
                            <p className="text-xs text-slate-500">
                                {item.size && `Size: ${item.size}`}
                                {item.size && item.color && ' • '}
                                {item.color && `${item.color}`}
                            </p>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-slate-500">Qty: {item.quantity}</span>
                                <span className="text-sm font-semibold text-slate-800">
                                    {formatCurrency(item.price * item.quantity)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">{formatCurrency(subtotal)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="font-semibold">
                        {shipping === 0 ? (
                            <span className="text-green-600">FREE</span>
                        ) : (
                            formatCurrency(shipping)
                        )}
                    </span>
                </div>

                <div className="pt-3 border-t border-slate-200">
                    <div className="flex justify-between text-lg font-bold">
                        <span className="text-slate-800">Total</span>
                        <span className="text-primary-600">{formatCurrency(total)}</span>
                    </div>
                </div>
            </div>

            {/* Payment Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                    💳 Payment will be processed after order confirmation
                </p>
            </div>
        </div>
    );
}