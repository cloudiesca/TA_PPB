import { ProductModel } from "../models/productModel.js";

export const ProductController = {
    // GET /api/products
    async getAll(req, res) {
        try {
            const filters = {
                gender: req.query.gender,
                category_id: req.query.category_id,
                brand_id: req.query.brand_id,
                is_featured: req.query.is_featured,
                search: req.query.search,
                min_price: req.query.min_price,
                max_price: req.query.max_price,
                sort_by: req.query.sort_by,
                order: req.query.order,
                page: req.query.page,
                limit: req.query.limit,
            };

            const result = await ProductModel.getAll(filters);
            res.json({
                success: true,
                data: result.data,
                pagination: result.pagination,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },

    // GET /api/products/featured
    async getFeatured(req, res) {
        try {
            const gender = req.query.gender;
            const limit = parseInt(req.query.limit) || 6;

            const products = await ProductModel.getFeatured(gender, limit);
            res.json({
                success: true,
                data: products,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },

    // GET /api/products/:id
    async getById(req, res) {
        try {
            const { id } = req.params;
            const product = await ProductModel.getById(id);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }

            res.json({
                success: true,
                data: product,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },

    // POST /api/products
    async create(req, res) {
        try {
            const {
                sku,
                name,
                description,
                category_id,
                brand_id,
                price,
                stock,
                size,
                color,
                gender,
                image_url,
                is_featured,
            } = req.body;

            // Validation
            if (!name || !price || !gender) {
                return res.status(400).json({
                    success: false,
                    message: "Name, price, and gender are required",
                });
            }

            if (!["men", "women", "unisex"].includes(gender)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid gender. Must be: men, women, or unisex",
                });
            }

            if (price < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Price cannot be negative",
                });
            }

            if (stock < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Stock cannot be negative",
                });
            }

            const productData = {
                sku,
                name,
                description,
                category_id,
                brand_id,
                price: parseFloat(price),
                stock: parseInt(stock) || 0,
                size,
                color,
                gender,
                image_url,
                is_featured: is_featured || false,
            };

            const product = await ProductModel.create(productData);
            res.status(201).json({
                success: true,
                data: product,
                message: "Product created successfully",
            });
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    },

    // PUT /api/products/:id
    async update(req, res) {
        try {
            const { id } = req.params;
            const {
                sku,
                name,
                description,
                category_id,
                brand_id,
                price,
                stock,
                size,
                color,
                gender,
                image_url,
                is_featured,
            } = req.body;

            // Validation
            if (gender && !["men", "women", "unisex"].includes(gender)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid gender. Must be: men, women, or unisex",
                });
            }

            if (price && price < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Price cannot be negative",
                });
            }

            if (stock && stock < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Stock cannot be negative",
                });
            }

            const productData = {
                sku,
                name,
                description,
                category_id,
                brand_id,
                price: price ? parseFloat(price) : undefined,
                stock: stock ? parseInt(stock) : undefined,
                size,
                color,
                gender,
                image_url,
                is_featured,
            };

            // Remove undefined values
            Object.keys(productData).forEach(
                (key) => productData[key] === undefined && delete productData[key]
            );

            const product = await ProductModel.update(id, productData);
            res.json({
                success: true,
                data: product,
                message: "Product updated successfully",
            });
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    },

    // PATCH /api/products/:id/stock
    async updateStock(req, res) {
        try {
            const { id } = req.params;
            const { stock } = req.body;

            if (stock === undefined || stock < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Valid stock quantity is required",
                });
            }

            const product = await ProductModel.updateStock(id, parseInt(stock));
            res.json({
                success: true,
                data: product,
                message: "Stock updated successfully",
            });
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    },

    // DELETE /api/products/:id
    async remove(req, res) {
        try {
            const { id } = req.params;
            const result = await ProductModel.remove(id);
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