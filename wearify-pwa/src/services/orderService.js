import { apiClient } from '../config/api';

class OrderService {
    /**
     * Get all orders
     * @param {Object} params - Query parameters
     * @returns {Promise}
     */
    async getOrders(params = {}) {
        try {
            const response = await apiClient.get('/api/orders', { params });
            return response;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get order by ID
     * @param {string} id - Order ID
     * @returns {Promise}
     */
    async getOrderById(id) {
        try {
            const response = await apiClient.get(`/api/orders/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get orders by user
     * @param {string} userIdentifier - User identifier
     * @returns {Promise}
     */
    async getOrdersByUser(userIdentifier) {
        try {
            const response = await apiClient.get(`/api/orders/user/${userIdentifier}`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create order (Checkout)
     * @param {Object} orderData - Order data with items
     * @returns {Promise}
     */
    async createOrder(orderData) {
        try {
            const response = await apiClient.post('/api/orders', orderData);
            return response;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update order status
     * @param {string} id - Order ID
     * @param {string} status - New status
     * @returns {Promise}
     */
    async updateOrderStatus(id, status) {
        try {
            const response = await apiClient.patch(`/api/orders/${id}/status`, { status });
            return response;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Cancel order
     * @param {string} id - Order ID
     * @returns {Promise}
     */
    async cancelOrder(id) {
        try {
            const response = await apiClient.patch(`/api/orders/${id}/cancel`);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default new OrderService();