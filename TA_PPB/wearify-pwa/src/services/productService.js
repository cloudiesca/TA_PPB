// import { apiClient } from '../config/api';

// class ProductService {
//     /**
//      * Get all products with filters
//      * @param {Object} params - Query parameters
//      * @returns {Promise}
//      */
//     async getProducts(params = {}) {
//         try {
//             const response = await apiClient.get('/api/products', { params });
//             return response;
//         } catch (error) {
//             throw error;
//         }
//     }

//     /**
//      * Get featured products
//      * @param {string} gender - men/women
//      * @param {number} limit - Number of products
//      * @returns {Promise}
//      */
//     async getFeaturedProducts(gender = null, limit = 6) {
//         try {
//             const params = { limit };
//             if (gender) params.gender = gender;

//             const response = await apiClient.get('/api/products/featured', { params });
//             return response;
//         } catch (error) {
//             throw error;
//         }
//     }

//     /**
//      * Get product by ID
//      * @param {string} id - Product ID
//      * @returns {Promise}
//      */
//     async getProductById(id) {
//         try {
//             const response = await apiClient.get(`/api/products/${id}`);
//             return response;
//         } catch (error) {
//             throw error;
//         }
//     }

//     /**
//      * Create new product
//      * @param {Object} productData - Product data
//      * @returns {Promise}
//      */
//     async createProduct(productData) {
//         try {
//             const response = await apiClient.post('/api/products', productData);
//             return response;
//         } catch (error) {
//             throw error;
//         }
//     }

//     /**
//      * Update product
//      * @param {string} id - Product ID
//      * @param {Object} productData - Updated product data
//      * @returns {Promise}
//      */
//     async updateProduct(id, productData) {
//         try {
//             const response = await apiClient.put(`/api/products/${id}`, productData);
//             return response;
//         } catch (error) {
//             throw error;
//         }
//     }

//     /**
//      * Delete product
//      * @param {string} id - Product ID
//      * @returns {Promise}
//      */
//     async deleteProduct(id) {
//         try {
//             const response = await apiClient.delete(`/api/products/${id}`);
//             return response;
//         } catch (error) {
//             throw error;
//         }
//     }
// }

// export default new ProductService();

// src/services/productService.js
import { supabase } from '../config/supabase';

export const productService = {
    async getAllProducts() {
        try {
            const { data, error } = await supabase
                .from('products')
                .select(`
          *,
          categories(id, name, gender),
          brands(id, name, country)
        `)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Supabase error:', error);
                return [];
            }
            return data || [];
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    },

    async getProductsByGender(gender) {
        try {
            const { data, error } = await supabase
                .from('products')
                .select(`
          *,
          categories(id, name, gender),
          brands(id, name, country)
        `)
                .eq('gender', gender)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Supabase error:', error);
                return [];
            }
            return data || [];
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    },

    async getProductById(id) {
        try {
            const { data, error } = await supabase
                .from('products')
                .select(`
          *,
          categories(id, name, gender),
          brands(id, name, country)
        `)
                .eq('id', id)
                .single();

            if (error) {
                console.error('Supabase error:', error);
                return null;
            }
            return data;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    },

    async getCategories() {
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .order('name');

            if (error) {
                console.error('Supabase error:', error);
                return [];
            }
            return data || [];
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    },

    async getBrands() {
        try {
            const { data, error } = await supabase
                .from('brands')
                .select('*')
                .order('name');

            if (error) {
                console.error('Supabase error:', error);
                return [];
            }
            return data || [];
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }
};