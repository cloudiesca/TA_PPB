import { OrderModel } from "../models/orderModel.js";
import { ProductModel } from "../models/productModel.js";

export const OrderController = {
    // GET /api/orders
    async getAll(req, res) {
        try {
            const filters = {
                status: req.query.status,
                user_identifier: req.query.user_identifier,
                sort_by: req.query.sort_by,
                order: req.query.order,
            };

            const orders = await OrderModel.getAll(filters);
            res.json({
                success: true,
                data: orders,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },

    // GET /api/orders/:id
    async getById(req, res) {
        try {
            const { id } = req.params;
            const order = await OrderModel.getById(id);

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found",
                });
            }

            res.json({
                success: true,
                data: order,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },

    // GET /api/orders/user/:userIdentifier
    async getByUser(req, res) {
        try {
            const { userIdentifier } = req.params;
            const orders = await OrderModel.getByUser(userIdentifier);

            res.json({
                success: true,
                data: orders,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },

    // POST /api/orders (Checkout)
    async create(req, res) {
        try {
            const {
                user_identifier,
                customer_name,
                customer_email,
                customer_phone,
                shipping_address,
                items, // Array of { product_id, quantity, size, color }
            } = req.body;

            // Validation
            if (!user_identifier || !customer_name || !customer_phone || !shipping_address) {
                return res.status(400).json({
                    success: false,
                    message: "User identifier, customer name, phone, and shipping address are required",
                });
            }

            if (!items || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Order must contain at least one item",
                });
            }

            // Validate and calculate order
            let totalAmount = 0;
            const orderItems = [];

            for (const item of items) {
                const { product_id, quantity, size, color } = item;

                if (!product_id || !quantity || quantity <= 0) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid item: product_id and quantity are required",
                    });
                }

                // Get product details
                const product = await ProductModel.getById(product_id);

                if (!product) {
                    return res.status(404).json({
                        success: false,
                        message: `Product not found: ${product_id}`,
                    });
                }

                // Check stock
                if (product.stock < quantity) {
                    return res.status(400).json({
                        success: false,
                        message: `Insufficient stock for ${product.name}. Available: ${product.stock}`,
                    });
                }

                // Calculate subtotal
                const subtotal = product.price * quantity;
                totalAmount += subtotal;

                orderItems.push({
                    product_id,
                    product_name: product.name,
                    product_price: product.price,
                    quantity,
                    size: size || product.size,
                    color: color || product.color,
                    subtotal,
                });

                // Decrease stock
                await ProductModel.decreaseStock(product_id, quantity);
            }

            // Create order
            const orderData = {
                user_identifier,
                customer_name,
                customer_email,
                customer_phone,
                shipping_address,
                total_amount: totalAmount,
            };

            const order = await OrderModel.create(orderData, orderItems);

            res.status(201).json({
                success: true,
                data: order,
                message: "Order created successfully",
            });
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    },

    // PATCH /api/orders/:id/status
    async updateStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!status) {
                return res.status(400).json({
                    success: false,
                    message: "Status is required",
                });
            }

            const order = await OrderModel.updateStatus(id, status);
            res.json({
                success: true,
                data: order,
                message: "Order status updated successfully",
            });
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    },

    // PATCH /api/orders/:id/cancel
    async cancel(req, res) {
        try {
            const { id } = req.params;
            const order = await OrderModel.cancel(id);
            res.json({
                success: true,
                data: order,
                message: "Order cancelled successfully",
            });
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    },

    // DELETE /api/orders/:id
    async remove(req, res) {
        try {
            const { id } = req.params;
            const result = await OrderModel.remove(id);
            res.json({
                success: true,
                message: result.message,
            });
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    },
};