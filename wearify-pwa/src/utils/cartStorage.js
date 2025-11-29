// src/utils/cartStorage.js - FIXED PRICE STORAGE
const CART_KEY = 'wearify_cart';

/**
 * Get cart from localStorage
 */
export const getCart = () => {
    try {
        const cart = localStorage.getItem(CART_KEY);
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error('Error reading cart:', error);
        return [];
    }
};

/**
 * Save cart to localStorage
 */
export const saveCart = (cart) => {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        return { success: true };
    } catch (error) {
        console.error('Error saving cart:', error);
        return { success: false, message: 'Failed to save cart' };
    }
};

/**
 * Add item to cart - FIXED: Proper price storage
 */
export const addToCart = (product, quantity = 1, size = null, color = null) => {
    try {
        const cart = getCart();

        // FIXED: Ensure image is included
        const productImage = product.image_url || product.image || 'https://via.placeholder.com/400?text=No+Image';

        // CRITICAL FIX: Convert price to number and validate
        const productPrice = Number(product.price) || 0;

        if (productPrice === 0) {
            console.warn('⚠️ Product price is 0 or invalid:', product);
        }

        // Check if product with same variant already exists
        const existingItemIndex = cart.findIndex(
            item => item.id === product.id && item.size === size && item.color === color
        );

        if (existingItemIndex > -1) {
            // Update quantity if item exists
            cart[existingItemIndex].quantity += quantity;

            // Make sure stock limit is respected
            if (cart[existingItemIndex].quantity > product.stock) {
                cart[existingItemIndex].quantity = product.stock;
            }
        } else {
            // Add new item with COMPLETE product info
            cart.push({
                id: product.id,
                name: product.name || 'Unknown Product',
                price: productPrice, // FIXED: Store as number
                // FIXED: Store both image fields for compatibility
                image: productImage,
                image_url: productImage,
                brand: product.brands?.name || product.brand || 'Brand',
                category: product.categories?.name || product.category || 'Category',
                stock: Number(product.stock) || 0,
                quantity: Math.min(quantity, product.stock),
                size: size,
                color: color,
                gender: product.gender || 'unisex'
            });
        }

        const result = saveCart(cart);

        // Debug log
        console.log('✅ Added to cart:', {
            name: product.name,
            price: productPrice,
            quantity: quantity,
            total: productPrice * quantity
        });

        return { ...result, success: true, message: 'Product added to cart' };
    } catch (error) {
        console.error('Error adding to cart:', error);
        return { success: false, message: 'Failed to add product to cart' };
    }
};

/**
 * Update cart item quantity
 */
export const updateCartItemQuantity = (productId, size, color, quantity) => {
    try {
        const cart = getCart();
        const itemIndex = cart.findIndex(
            item => item.id === productId && item.size === size && item.color === color
        );

        if (itemIndex === -1) {
            return { success: false, message: 'Item not found in cart' };
        }

        if (quantity <= 0) {
            return removeFromCart(productId, size, color);
        }

        // Update quantity (respect stock limit)
        cart[itemIndex].quantity = Math.min(quantity, cart[itemIndex].stock);

        const result = saveCart(cart);
        return { ...result, message: 'Quantity updated' };
    } catch (error) {
        console.error('Error updating cart quantity:', error);
        return { success: false, message: 'Failed to update quantity' };
    }
};

/**
 * Remove item from cart
 */
export const removeFromCart = (productId, size, color) => {
    try {
        const cart = getCart();
        const updatedCart = cart.filter(
            item => !(item.id === productId && item.size === size && item.color === color)
        );

        const result = saveCart(updatedCart);
        return { ...result, message: 'Item removed from cart' };
    } catch (error) {
        console.error('Error removing from cart:', error);
        return { success: false, message: 'Failed to remove item' };
    }
};

/**
 * Clear entire cart
 */
export const clearCart = () => {
    try {
        localStorage.removeItem(CART_KEY);
        return { success: true, message: 'Cart cleared' };
    } catch (error) {
        console.error('Error clearing cart:', error);
        return { success: false, message: 'Failed to clear cart' };
    }
};

/**
 * Get cart total - FIXED: Handle invalid prices
 */
export const getCartTotal = () => {
    const cart = getCart();
    return cart.reduce((total, item) => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 0;
        return total + (price * quantity);
    }, 0);
};

/**
 * Get cart item count
 */
export const getCartItemCount = () => {
    const cart = getCart();
    return cart.reduce((count, item) => count + (Number(item.quantity) || 0), 0);
};

/**
 * Check if product is in cart
 */
export const isInCart = (productId, size = null, color = null) => {
    const cart = getCart();
    return cart.some(
        item => item.id === productId && item.size === size && item.color === color
    );
};

/**
 * Get specific cart item
 */
export const getCartItem = (productId, size = null, color = null) => {
    const cart = getCart();
    return cart.find(
        item => item.id === productId && item.size === size && item.color === color
    );
};

/**
 * DEBUG: Print cart contents
 */
export const debugCart = () => {
    const cart = getCart();
    console.log('🛒 Cart Debug Info:');
    console.log('Total items:', cart.length);
    console.log('Total value:', getCartTotal());
    cart.forEach((item, index) => {
        console.log(`Item ${index + 1}:`, {
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity
        });
    });
};