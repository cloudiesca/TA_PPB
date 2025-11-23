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

/**
 * Custom hook for managing shopping cart
 * @returns {Object} - Cart state and methods
 */
export function useCart() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [itemCount, setItemCount] = useState(0);

    // Load cart from localStorage on mount
    const loadCart = useCallback(() => {
        const cartData = getCart();
        setCart(cartData);
        setTotal(getCartTotal());
        setItemCount(getCartItemCount());
    }, []);

    useEffect(() => {
        loadCart();
    }, [loadCart]);

    // Add item to cart
    const addToCart = useCallback((product, quantity = 1, size = null, color = null) => {
        const result = addToCartStorage(product, quantity, size, color);
        if (result.success) {
            loadCart();
            return { success: true, message: 'Product added to cart' };
        }
        return { success: false, message: result.message };
    }, [loadCart]);

    // Update cart item quantity
    const updateQuantity = useCallback((productId, size, color, quantity) => {
        const result = updateCartStorage(productId, size, color, quantity);
        if (result.success) {
            loadCart();
            return { success: true };
        }
        return { success: false, message: result.message };
    }, [loadCart]);

    // Remove item from cart
    const removeItem = useCallback((productId, size, color) => {
        const result = removeFromCartStorage(productId, size, color);
        if (result.success) {
            loadCart();
            return { success: true, message: 'Item removed from cart' };
        }
        return { success: false, message: result.message };
    }, [loadCart]);

    // Clear cart
    const clearCart = useCallback(() => {
        const result = clearCartStorage();
        if (result.success) {
            loadCart();
            return { success: true, message: 'Cart cleared' };
        }
        return { success: false, message: result.message };
    }, [loadCart]);

    // Check if product is in cart
    const isInCart = useCallback((productId, size = null, color = null) => {
        return cart.some(item =>
            item.id === productId &&
            item.size === size &&
            item.color === color
        );
    }, [cart]);

    // Get item quantity in cart
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
        updateQuantity,
        removeItem,
        clearCart,
        isInCart,
        getItemQuantity,
        refetch: loadCart,
    };
}