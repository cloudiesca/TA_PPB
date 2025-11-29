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

// import { apiClient } from "../config/api";

// export const productService = {
//     async getAllProducts() {
//         try {
//             const res = await apiClient.get("/products");
//             return res || [];
//         } catch (error) {
//             console.error("Error fetching products:", error);
//             return [];
//         }
//     },

//     async getProductsByGender(gender) {
//         try {
//             const res = await apiClient.get(`/products/gender/${gender}`);
//             return res || [];
//         } catch (error) {
//             console.error("Error fetching products by gender:", error);
//             return [];
//         }
//     },

//     async getProductById(id) {
//         try {
//             const res = await apiClient.get(`/products/${id}`);
//             return res || null;
//         } catch (error) {
//             console.error("Error fetching product:", error);
//             return null;
//         }
//     },

//     async getCategories() {
//         try {
//             const res = await apiClient.get("/categories");
//             return res || [];
//         } catch (error) {
//             console.error("Error fetching categories:", error);
//             return [];
//         }
//     },

//     async getBrands() {
//         try {
//             const res = await apiClient.get("/brands");
//             return res || [];
//         } catch (error) {
//             console.error("Error fetching brands:", error);
//             return [];
//         }
//     }
// };

