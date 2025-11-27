import { formatCurrency } from '../../utils/helpers';

export default function CartSummary({
    subtotal,
    shipping = 0,
    tax = 0,
    total,
    onCheckout,
    disabled = false
}) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h2>

            {/* Breakdown */}
            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">{formatCurrency(subtotal)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="font-semibold">
                        {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                    </span>
                </div>

                {tax > 0 && (
                    <div className="flex justify-between text-slate-600">
                        <span>Tax</span>
                        <span className="font-semibold">{formatCurrency(tax)}</span>
                    </div>
                )}

                <div className="pt-3 border-t border-slate-200">
                    <div className="flex justify-between text-lg font-bold text-slate-800">
                        <span>Total</span>
                        <span className="text-primary-600">{formatCurrency(total)}</span>
                    </div>
                </div>
            </div>

            {/* Checkout Button */}
            <button
                onClick={onCheckout}
                disabled={disabled}
                className="w-full py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
            >
                Proceed to Checkout
            </button>

            {/* Free Shipping Info */}
            {subtotal > 0 && subtotal < 500000 && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                        💡 Add {formatCurrency(500000 - subtotal)} more for FREE shipping!
                    </p>
                </div>
            )}

            {/* Benefits */}
            <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="text-green-600">✓</span>
                    <span>Secure payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="text-green-600">✓</span>
                    <span>Free returns within 30 days</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="text-green-600">✓</span>
                    <span>Quality guaranteed</span>
                </div>
            </div>
        </div>
    );
}