import { supabase } from "../config/supabaseClient.js";

export const BrandModel = {
    // Get all brands
    async getAll() {
        const { data, error } = await supabase
            .from("brands")
            .select("*")
            .order("name", { ascending: true });

        if (error) throw error;
        return data;
    },

    // Get brand by ID
    async getById(id) {
        const { data, error } = await supabase
            .from("brands")
            .select("*")
            .eq("id", id)
            .single();

        if (error) throw error;
        return data;
    },

    // Create new brand
    async create(brandData) {
        const { data, error } = await supabase
            .from("brands")
            .insert([brandData])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update brand
    async update(id, brandData) {
        const { data, error } = await supabase
            .from("brands")
            .update(brandData)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete brand
    async remove(id) {
        const { error } = await supabase
            .from("brands")
            .delete()
            .eq("id", id);

        if (error) throw error;
        return { message: "Brand deleted successfully" };
    }
};