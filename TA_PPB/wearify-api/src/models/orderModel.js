import { supabase } from "../config/supabaseClient.js";

export const OrderModel = {
    // Get all orders
    async getAll(filters = {}) {
        let query = supabase
            .from("orders")
            .select("*");

        // Filter by status
        if (filters.status) {
            query = query.eq("status", filters.status);
        }

        // Filter by user
        if (filters.user_identifier) {
            query = query.eq("user_identifier", filters.user_identifier);
        }

        // Sorting
        const sortBy = filters.sort_by || "created_at";
        const order = filters.order || "desc";
        query = query.order(sortBy, { ascending: order === "asc" });

        const { data, error } = await query;

        if (error) throw error;
        return data;
    },

    // Get order by ID with items
    async getById(id) {
        // Get order
        const { data: order, error: orderError } = await supabase
            .from("orders")
            .select("*")
            .eq("id", id)
            .single();

        if (orderError) throw orderError;

        // Get order items
        const { data: items, error: itemsError } = await supabase
            .from("order_items")
            .select("*")
            .eq("order_id", id);

        if (itemsError) throw itemsError;

        return {
            ...order,
            items,
        };
    },

    // Get orders by user
    async getByUser(userIdentifier) {
        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .eq("user_identifier", userIdentifier)
            .order("created_at", { ascending: false });

        if (error) throw error;

        // Get items for each order
        const ordersWithItems = await Promise.all(
            data.map(async (order) => {
                const { data: items } = await supabase
                    .from("order_items")
                    .select("*")
                    .eq("order_id", order.id);

                return {
                    ...order,
                    items: items || [],
                };
            })
        );

        return ordersWithItems;
    },

    // Create new order (checkout)
    async create(orderData, items) {
        // 1. Create order
        const { data: order, error: orderError } = await supabase
            .from("orders")
            .insert([{
                user_identifier: orderData.user_identifier,
                customer_name: orderData.customer_name,
                customer_email: orderData.customer_email,
                customer_phone: orderData.customer_phone,
                shipping_address: orderData.shipping_address,
                total_amount: orderData.total_amount,
                status: "pending",
            }])
            .select()
            .single();

        if (orderError) throw orderError;

        // 2. Create order items
        const orderItems = items.map((item) => ({
            order_id: order.id,
            product_id: item.product_id,
            product_name: item.product_name,
            product_price: item.product_price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            subtotal: item.subtotal,
        }));

        const { error: itemsError } = await supabase
            .from("order_items")
            .insert(orderItems);

        if (itemsError) {
            // Rollback: delete order if items insert failed
            await supabase.from("orders").delete().eq("id", order.id);
            throw itemsError;
        }

        // 3. Return order with items
        return {
            ...order,
            items: orderItems,
        };
    },

    // Update order status
    async updateStatus(id, status) {
        const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

        if (!validStatuses.includes(status)) {
            throw new Error("Invalid status");
        }

        const { data, error } = await supabase
            .from("orders")
            .update({ status })
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Cancel order
    async cancel(id) {
        const { data, error } = await supabase
            .from("orders")
            .update({ status: "cancelled" })
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete order (cascade delete items)
    async remove(id) {
        const { error } = await supabase
            .from("orders")
            .delete()
            .eq("id", id);

        if (error) throw error;
        return { message: "Order deleted successfully" };
    },
};