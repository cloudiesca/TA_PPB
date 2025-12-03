// // // src/services/productService.js
// // import { supabase } from '../config/supabase';

// // export const productService = {
// //     async getAllProducts() {
// //         try {
// //             const { data, error } = await supabase
// //                 .from('products')
// //                 .select(`
// //           *,
// //           categories(id, name, gender),
// //           brands(id, name, country)
// //         `)
// //                 .order('created_at', { ascending: false });

// //             if (error) {
// //                 console.error('Supabase error:', error);
// //                 return [];
// //             }
// //             return data || [];
// //         } catch (error) {
// //             console.error('Error fetching products:', error);
// //             return [];
// //         }
// //     },

// //     async getProductsByGender(gender) {
// //         try {
// //             const { data, error } = await supabase
// //                 .from('products')
// //                 .select(`
// //           *,
// //           categories(id, name, gender),
// //           brands(id, name, country)
// //         `)
// //                 .eq('gender', gender)
// //                 .order('created_at', { ascending: false });

// //             if (error) {
// //                 console.error('Supabase error:', error);
// //                 return [];
// //             }
// //             return data || [];
// //         } catch (error) {
// //             console.error('Error:', error);
// //             return [];
// //         }
// //     },

// //     async getProductById(id) {
// //         try {
// //             const { data, error } = await supabase
// //                 .from('products')
// //                 .select(`
// //           *,
// //           categories(id, name, gender),
// //           brands(id, name, country)
// //         `)
// //                 .eq('id', id)
// //                 .single();

// //             if (error) {
// //                 console.error('Supabase error:', error);
// //                 return null;
// //             }
// //             return data;
// //         } catch (error) {
// //             console.error('Error:', error);
// //             return null;
// //         }
// //     },

// //     async getCategories() {
// //         try {
// //             const { data, error } = await supabase
// //                 .from('categories')
// //                 .select('*')
// //                 .order('name');

// //             if (error) {
// //                 console.error('Supabase error:', error);
// //                 return [];
// //             }
// //             return data || [];
// //         } catch (error) {
// //             console.error('Error:', error);
// //             return [];
// //         }
// //     },

// //     async getBrands() {
// //         try {
// //             const { data, error } = await supabase
// //                 .from('brands')
// //                 .select('*')
// //                 .order('name');

// //             if (error) {
// //                 console.error('Supabase error:', error);
// //                 return [];
// //             }
// //             return data || [];
// //         } catch (error) {
// //             console.error('Error:', error);
// //             return [];
// //         }
// //     }
// // };

// // // import { apiClient } from "../config/api";

// // // export const productService = {
// // //     async getAllProducts() {
// // //         try {
// // //             const res = await apiClient.get("/products");
// // //             return res || [];
// // //         } catch (error) {
// // //             console.error("Error fetching products:", error);
// // //             return [];
// // //         }
// // //     },

// // //     async getProductsByGender(gender) {
// // //         try {
// // //             const res = await apiClient.get(`/products/gender/${gender}`);
// // //             return res || [];
// // //         } catch (error) {
// // //             console.error("Error fetching products by gender:", error);
// // //             return [];
// // //         }
// // //     },

// // //     async getProductById(id) {
// // //         try {
// // //             const res = await apiClient.get(`/products/${id}`);
// // //             return res || null;
// // //         } catch (error) {
// // //             console.error("Error fetching product:", error);
// // //             return null;
// // //         }
// // //     },

// // //     async getCategories() {
// // //         try {
// // //             const res = await apiClient.get("/categories");
// // //             return res || [];
// // //         } catch (error) {
// // //             console.error("Error fetching categories:", error);
// // //             return [];
// // //         }
// // //     },

// // //     async getBrands() {
// // //         try {
// // //             const res = await apiClient.get("/brands");
// // //             return res || [];
// // //         } catch (error) {
// // //             console.error("Error fetching brands:", error);
// // //             return [];
// // //         }
// // //     }
// // // };

// // src/services/productService.js
// import { apiClient } from "../config/api";

// export const productService = {
//     async getAllProducts() {
//         try {
//             const res = await apiClient.get("/products");
//             // API backend kamu return data langsung karena interceptor
//             return res.data || res || [];
//         } catch (error) {
//             console.error("Error fetching products:", error);
//             return [];
//         }
//     },

//     async getProductsByGender(gender) {
//         try {
//             const res = await apiClient.get(`/products/gender/${gender}`);
//             return res.data || res || [];
//         } catch (error) {
//             console.error("Error fetching products by gender:", error);
//             return [];
//         }
//     },

//     async getProductById(id) {
//         try {
//             const res = await apiClient.get(`/products/${id}`);
//             return res.data || res || null;
//         } catch (error) {
//             console.error("Error fetching product:", error);
//             return null;
//         }
//     },

//     async getCategories() {
//         try {
//             const res = await apiClient.get("/categories");
//             return res.data || res || [];
//         } catch (error) {
//             console.error("Error fetching categories:", error);
//             return [];
//         }
//     },

//     async getBrands() {
//         try {
//             const res = await apiClient.get("/brands");
//             return res.data || res || [];
//         } catch (error) {
//             console.error("Error fetching brands:", error);
//             return [];
//         }
//     }
// };

// src/services/productService.js
import { apiClient } from "../config/api";

export const productService = {
    async getAllProducts() {
        try {
            const res = await apiClient.get("/products");
            console.log("✅ Products fetched from API:", res);

            // Handle different response structures
            if (res.data && Array.isArray(res.data)) {
                return res.data;
            } else if (Array.isArray(res)) {
                return res;
            }

            return [];
        } catch (error) {
            console.error("❌ Error fetching products:", error);
            return [];
        }
    },

    async getProductsByGender(gender) {
        try {
            const res = await apiClient.get(`/products/gender/${gender}`);
            console.log(`✅ Products (${gender}) fetched:`, res);

            if (res.data && Array.isArray(res.data)) {
                return res.data;
            } else if (Array.isArray(res)) {
                return res;
            }

            return [];
        } catch (error) {
            console.error(`❌ Error fetching ${gender} products:`, error);
            return [];
        }
    },

    async getProductById(id) {
        try {
            const res = await apiClient.get(`/products/${id}`);
            console.log(`✅ Product ${id} fetched:`, res);

            if (res.data) {
                return res.data;
            } else if (res && typeof res === 'object') {
                return res;
            }

            return null;
        } catch (error) {
            console.error(`❌ Error fetching product ${id}:`, error);
            return null;
        }
    },

    async getCategories() {
        try {
            const res = await apiClient.get("/categories");
            console.log("✅ Categories fetched:", res);

            if (res.data && Array.isArray(res.data)) {
                return res.data;
            } else if (Array.isArray(res)) {
                return res;
            }

            return [];
        } catch (error) {
            console.error("❌ Error fetching categories:", error);
            return [];
        }
    },

    async getBrands() {
        try {
            const res = await apiClient.get("/brands");
            console.log("✅ Brands fetched:", res);

            if (res.data && Array.isArray(res.data)) {
                return res.data;
            } else if (Array.isArray(res)) {
                return res;
            }

            return [];
        } catch (error) {
            console.error("❌ Error fetching brands:", error);
            return [];
        }
    }
};