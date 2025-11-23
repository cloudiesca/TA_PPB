import { useState, useEffect, useCallback } from 'react';
import orderService from '../services/orderService';
import { getUserIdentifier } from '../services/userService';

/**
 * Custom hook for fetching orders
 * @param {Object} params - Query parameters
 * @returns {Object} - { orders, loading, error, refetch }
 */
export function useOrders(params = {}) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await orderService.getOrders(params);

            if (response.success) {
                setOrders(response.data || []);
            } else {
                setError(response.message || 'Failed to fetch orders');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching orders');
            setOrders([]);
        } finally {
            setLoading(false);
        }
    }, [JSON.stringify(params)]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return {
        orders,
        loading,
        error,
        refetch: fetchOrders,
    };
}

/**
 * Custom hook for fetching user's orders
 * @returns {Object} - { orders, loading, error, refetch }
 */
export function useUserOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userIdentifier = getUserIdentifier();

    const fetchUserOrders = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await orderService.getOrdersByUser(userIdentifier);

            if (response.success) {
                setOrders(response.data || []);
            } else {
                setError(response.message || 'Failed to fetch orders');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching orders');
            setOrders([]);
        } finally {
            setLoading(false);
        }
    }, [userIdentifier]);

    useEffect(() => {
        fetchUserOrders();
    }, [fetchUserOrders]);

    return {
        orders,
        loading,
        error,
        refetch: fetchUserOrders,
    };
}

/**
 * Custom hook for creating order
 * @returns {Object} - { createOrder, loading, error, success }
 */
export function useCreateOrder() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const createOrder = async (orderData) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            const response = await orderService.createOrder(orderData);

            if (response.success) {
                setSuccess(true);
                return response;
            } else {
                setError(response.message || 'Failed to create order');
                return null;
            }
        } catch (err) {
            setError(err.message || 'An error occurred while creating order');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        createOrder,
        loading,
        error,
        success,
    };
}

/**
 * Custom hook for fetching single order
 * @param {string} id - Order ID
 * @returns {Object} - { order, loading, error, refetch }
 */
export function useOrder(id) {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrder = useCallback(async () => {
        if (!id) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await orderService.getOrderById(id);

            if (response.success) {
                setOrder(response.data);
            } else {
                setError(response.message || 'Failed to fetch order');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching order');
            setOrder(null);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchOrder();
    }, [fetchOrder]);

    return {
        order,
        loading,
        error,
        refetch: fetchOrder,
    };
}