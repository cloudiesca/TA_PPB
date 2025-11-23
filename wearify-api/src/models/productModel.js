import { supabase } from "../config/supabaseClient.js";

export const ProductModel = {
    // Get all products with filters
    async getAll(filters = {}) {
        let query = supabase
            .from("products")
            .select(`
        *,
        categories (id, name, gender),
        brands (id, name, country)
      `);

        // Filter by gender
        if (filters.gender) {
            query = query.eq("gender", filters.gender);
        }

        // Filter by category
        if (filters.category_id) {
            query = query.eq("category_id", filters.category_id);
        }

        // Filter by brand
        if (filters.brand_id) {
            query = query.eq("brand_id", filters.brand_id);
        }

        // Filter by featured
        if (filters.is_featured !== undefined) {
            query = query.eq("is_featured", filters.is_featured);
        }

        // Search by name or description
        if (filters.search) {
            query = query.or(
                `name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
            );
        }

        // Filter by price range
        if (filters.min_price) {
            query = query.gte("price", filters.min_price);
        }
        if (filters.max_price) {
            query = query.lte("price", filters.max_price);
        }

        // Sorting
        const sortBy = filters.sort_by || "created_at";
        const order = filters.order || "desc";
        query = query.order(sortBy, { ascending: order === "asc" });

        // Pagination
        const page = parseInt(filters.page) || 1;
        const limit = parseInt(filters.limit) || 12;
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        query = query.range(from, to);

        const { data, error, count } = await query;

        if (error) throw error;

        return {
            data,
            pagination: {
                page,
                limit,
                total: count,
                total_pages: Math.ceil(count / limit),
            },
        };
    },

    // Get product by ID with relations
    async getById(id) {
        const { data, error } = await supabase
            .from("products")
            .select(`
        *,
        categories (id, name, gender),
        brands (id, name, country, website)
      `)
            .eq("id", id)
            .single();

        if (error) throw error;
        return data;
    },

    // Get featured products
    async getFeatured(gender = null, limit = 6) {
        let query = supabase
            .from("products")
            .select(`
        *,
        categories (id, name, gender),
        brands (id, name)
      `)
            .eq("is_featured", true);

        if (gender) {
            query = query.eq("gender", gender);
        }

        query = query
            .order("created_at", { ascending: false })
            .limit(limit);

        const { data, error } = await query;

        if (error) throw error;
        return data;
    },

    // Create new product
    async create(productData) {
        const { data, error } = await supabase
            .from("products")
            .insert([productData])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update product
    async update(id, productData) {
        const { data, error } = await supabase
            .from("products")
            .update(productData)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update stock
    async updateStock(id, quantity) {
        const { data, error } = await supabase
            .from("products")
            .update({ stock: quantity })
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Decrease stock (untuk checkout)
    async decreaseStock(id, quantity) {
        // Get current stock
        const { data: product } = await supabase
            .from("products")
            .select("stock")
            .eq("id", id)
            .single();

        if (!product) throw new Error("Product not found");

        const newStock = product.stock - quantity;
        if (newStock < 0) throw new Error("Insufficient stock");

        const { data, error } = await supabase
            .from("products")
            .update({ stock: newStock })
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete product
    async remove(id) {
        const { error } = await supabase
            .from("products")
            .delete()
            .eq("id", id);

        if (error) throw error;
        return { message: "Product deleted successfully" };
    },
};