import { useState, useEffect, useCallback } from 'react';
import {
    getCart,
    addToCart as addToCartStorage,
    updateCartItemQuantity as updateCartStorage,
    removeFromCart as removeFromCartStorage,
    clearCart as clearCartStorage,
    getCartTotal,
    getCartItemCount,
} from '../utils/cartStorage';

export function useCart() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [itemCount, setItemCount] = useState(0);

    const loadCart = useCallback(() => {
        const cartData = getCart();
        setCart(cartData);

        // CRITICAL FIX: Calculate total correctly
        const calculatedTotal = cartData.reduce((sum, item) => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 0;
            return sum + (price * quantity);
        }, 0);

        setTotal(calculatedTotal);
        setItemCount(getCartItemCount());

        // Debug log
        console.log('🛒 Cart loaded:', {
            items: cartData.length,
            total: calculatedTotal,
            itemCount: getCartItemCount()
        });
    }, []);

    useEffect(() => {
        loadCart();
    }, [loadCart]);

    // Add item to cart (original method)
    const addToCart = useCallback((product, quantity = 1, size = null, color = null) => {
        console.log('🔵 Adding to cart:', {
            name: product.name,
            price: product.price,
            priceType: typeof product.price,
            quantity
        });

        const result = addToCartStorage(product, quantity, size, color);
        if (result.success) {
            loadCart();
            return { success: true, message: 'Product added to cart' };
        }
        return { success: false, message: result.message };
    }, [loadCart]);

    // Add item method (for new ProductCard compatibility)
    const addItem = useCallback((product) => {
        const result = addToCartStorage(product, 1, product.size || null, product.color || null);
        if (result.success) {
            loadCart();
            return { success: true, message: 'Product added to cart' };
        }
        return { success: false, message: result.message };
    }, [loadCart]);

    const updateQuantity = useCallback((productId, size, color, quantity) => {
        const result = updateCartStorage(productId, size, color, quantity);
        if (result.success) {
            loadCart();
            return { success: true };
        }
        return { success: false, message: result.message };
    }, [loadCart]);

    const removeItem = useCallback((productId, size, color) => {
        const result = removeFromCartStorage(productId, size, color);
        if (result.success) {
            loadCart();
            return { success: true, message: 'Item removed from cart' };
        }
        return { success: false, message: result.message };
    }, [loadCart]);

    const clearCart = useCallback(() => {
        const result = clearCartStorage();
        if (result.success) {
            loadCart();
            return { success: true, message: 'Cart cleared' };
        }
        return { success: false, message: result.message };
    }, [loadCart]);

    const isInCart = useCallback((productId, size = null, color = null) => {
        return cart.some(item =>
            item.id === productId &&
            item.size === size &&
            item.color === color
        );
    }, [cart]);

    const getItemQuantity = useCallback((productId, size = null, color = null) => {
        const item = cart.find(item =>
            item.id === productId &&
            item.size === size &&
            item.color === color
        );
        return item ? item.quantity : 0;
    }, [cart]);

    return {
        cart,
        total,
        itemCount,
        addToCart,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        isInCart,
        getItemQuantity,
        refetch: loadCart,
    };
}