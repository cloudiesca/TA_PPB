import { useState, useEffect, useCallback } from 'react';
import productService from '../services/productService';

/**
 * Custom hook for fetching products
 * @param {Object} params - Query parameters
 * @returns {Object} - { products, loading, error, pagination, refetch }
 */
export function useProducts(params = {}) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState(null);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await productService.getProducts(params);

            if (response.success) {
                setProducts(response.data || []);
                setPagination(response.pagination || null);
            } else {
                setError(response.message || 'Failed to fetch products');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching products');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, [JSON.stringify(params)]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {
        products,
        loading,
        error,
        pagination,
        refetch: fetchProducts,
    };
}

/**
 * Custom hook for fetching featured products
 * @param {string} gender - men/women/null
 * @param {number} limit - Number of products
 * @returns {Object} - { products, loading, error, refetch }
 */
export function useFeaturedProducts(gender = null, limit = 6) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFeaturedProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await productService.getFeaturedProducts(gender, limit);

            if (response.success) {
                setProducts(response.data || []);
            } else {
                setError(response.message || 'Failed to fetch featured products');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching featured products');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, [gender, limit]);

    useEffect(() => {
        fetchFeaturedProducts();
    }, [fetchFeaturedProducts]);

    return {
        products,
        loading,
        error,
        refetch: fetchFeaturedProducts,
    };
}

/**
 * Custom hook for fetching a single product
 * @param {string} id - Product ID
 * @returns {Object} - { product, loading, error, refetch }
 */
export function useProduct(id) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProduct = useCallback(async () => {
        if (!id) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await productService.getProductById(id);

            if (response.success) {
                setProduct(response.data);
            } else {
                setError(response.message || 'Failed to fetch product');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching product');
            setProduct(null);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    return {
        product,
        loading,
        error,
        refetch: fetchProduct,
    };
}