import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
    const subtotal = item.price * item.quantity;

    const handleIncrement = () => {
        if (item.quantity < item.stock) {
            onUpdateQuantity(item.id, item.size, item.color, item.quantity + 1);
        }
    };

    const handleDecrement = () => {
        if (item.quantity > 1) {
            onUpdateQuantity(item.id, item.size, item.color, item.quantity - 1);
        }
    };

    const handleRemove = () => {
        onRemove(item.id, item.size, item.color);
    };

    return (
        <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex gap-4">
                {/* Product Image */}
                <div className="flex-shrink-0 w-24 h-24 bg-slate-100 rounded-lg overflow-hidden">
                    <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 mb-1 truncate">
                        {item.name}
                    </h3>

                    {/* Size & Color */}
                    <div className="flex items-center gap-3 text-sm text-slate-600 mb-2">
                        {item.size && (
                            <span className="px-2 py-0.5 bg-slate-100 rounded">
                                Size: {item.size}
                            </span>
                        )}
                        {item.color && (
                            <span className="px-2 py-0.5 bg-slate-100 rounded">
                                Color: {item.color}
                            </span>
                        )}
                    </div>

                    {/* Price */}
                    <p className="text-lg font-bold text-primary-600 mb-3">
                        {formatCurrency(item.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleDecrement}
                                disabled={item.quantity <= 1}
                                className="p-1.5 border-2 border-slate-300 rounded-lg hover:border-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Minus className="w-4 h-4" />
                            </button>

                            <span className="text-lg font-bold text-slate-800 w-8 text-center">
                                {item.quantity}
                            </span>

                            <button
                                onClick={handleIncrement}
                                disabled={item.quantity >= item.stock}
                                className="p-1.5 border-2 border-slate-300 rounded-lg hover:border-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Remove Button */}
                        <button
                            onClick={handleRemove}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove from cart"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Stock Warning */}
                    {item.quantity >= item.stock && (
                        <p className="text-xs text-orange-600 mt-2">
                            ⚠️ Maximum stock reached
                        </p>
                    )}
                </div>

                {/* Subtotal (Desktop) */}
                <div className="hidden md:flex flex-col items-end justify-between">
                    <p className="text-sm text-slate-500">Subtotal</p>
                    <p className="text-xl font-bold text-slate-800">
                        {formatCurrency(subtotal)}
                    </p>
                </div>
            </div>

            {/* Subtotal (Mobile) */}
            <div className="md:hidden mt-3 pt-3 border-t border-slate-200 flex justify-between items-center">
                <span className="text-sm text-slate-500">Subtotal:</span>
                <span className="text-lg font-bold text-slate-800">
                    {formatCurrency(subtotal)}
                </span>
            </div>
        </div>
    );
}