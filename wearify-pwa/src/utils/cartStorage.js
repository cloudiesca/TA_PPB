const CART_KEY = 'wearify_cart';

/**
 * Get cart from localStorage
 */
export const getCart = () => {
    try {
        const cart = localStorage.getItem(CART_KEY);
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error('Error getting cart:', error);
        return [];
    }
};

/**
 * Save cart to localStorage
 */
export const saveCart = (cart) => {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        return true;
    } catch (error) {
        console.error('Error saving cart:', error);
        return false;
    }
};

/**
 * Add item to cart
 */
export const addToCart = (product, quantity = 1, size = null, color = null) => {
    try {
        const cart = getCart();

        // Check if product already exists in cart with same size and color
        const existingIndex = cart.findIndex(
            item => item.id === product.id && item.size === size && item.color === color
        );

        if (existingIndex > -1) {
            // Update quantity if exists
            cart[existingIndex].quantity += quantity;
        } else {
            // Add new item
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image_url: product.image_url,
                quantity,
                size: size || product.size,
                color: color || product.color,
                stock: product.stock,
            });
        }

        saveCart(cart);
        return { success: true, cart };
    } catch (error) {
        console.error('Error adding to cart:', error);
        return { success: false, message: error.message };
    }
};

/**
 * Update cart item quantity
 */
export const updateCartItemQuantity = (productId, size, color, quantity) => {
    try {
        const cart = getCart();
        const index = cart.findIndex(
            item => item.id === productId && item.size === size && item.color === color
        );

        if (index > -1) {
            if (quantity <= 0) {
                // Remove item if quantity is 0 or negative
                cart.splice(index, 1);
            } else {
                // Update quantity
                cart[index].quantity = quantity;
            }
            saveCart(cart);
            return { success: true, cart };
        }

        return { success: false, message: 'Item not found in cart' };
    } catch (error) {
        console.error('Error updating cart item:', error);
        return { success: false, message: error.message };
    }
};

/**
 * Remove item from cart
 */
export const removeFromCart = (productId, size, color) => {
    try {
        const cart = getCart();
        const filteredCart = cart.filter(
            item => !(item.id === productId && item.size === size && item.color === color)
        );
        saveCart(filteredCart);
        return { success: true, cart: filteredCart };
    } catch (error) {
        console.error('Error removing from cart:', error);
        return { success: false, message: error.message };
    }
};

/**
 * Clear cart
 */
export const clearCart = () => {
    try {
        localStorage.removeItem(CART_KEY);
        return { success: true };
    } catch (error) {
        console.error('Error clearing cart:', error);
        return { success: false, message: error.message };
    }
};

/**
 * Get cart total
 */
export const getCartTotal = () => {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

/**
 * Get cart item count
 */
export const getCartItemCount = () => {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
};

export default {
    getCart,
    saveCart,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
};