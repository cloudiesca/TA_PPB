/**
 * Format currency to IDR
 */
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};

/**
 * Format date to readable string
 */
export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

/**
 * Format date with time
 */
export const formatDateTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

/**
 * Truncate text
 */
export const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

/**
 * Get gender badge color
 */
export const getGenderColor = (gender) => {
    const colors = {
        men: 'bg-blue-100 text-blue-800',
        women: 'bg-pink-100 text-pink-800',
        unisex: 'bg-purple-100 text-purple-800',
    };
    return colors[gender?.toLowerCase()] || 'bg-gray-100 text-gray-800';
};

/**
 * Get order status color
 */
export const getOrderStatusColor = (status) => {
    const colors = {
        pending: 'bg-yellow-100 text-yellow-800',
        processing: 'bg-blue-100 text-blue-800',
        shipped: 'bg-indigo-100 text-indigo-800',
        delivered: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
};

/**
 * Get order status text
 */
export const getOrderStatusText = (status) => {
    const texts = {
        pending: 'Menunggu Pembayaran',
        processing: 'Diproses',
        shipped: 'Dikirim',
        delivered: 'Selesai',
        cancelled: 'Dibatalkan',
    };
    return texts[status?.toLowerCase()] || status;
};

/**
 * Validate email
 */
export const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

/**
 * Validate phone (Indonesia)
 */
export const isValidPhone = (phone) => {
    const regex = /^(\+62|62|0)[0-9]{9,12}$/;
    return regex.test(phone);
};

/**
 * Debounce function
 */
export const debounce = (func, wait = 300) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Generate unique ID
 */
export const generateId = () => {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};