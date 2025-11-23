import { CategoryModel } from "../models/categoryModel.js";

export const CategoryController = {
    // GET /api/categories
    async getAll(req, res) {
        try {
            const categories = await CategoryModel.getAll();
            res.json({
                success: true,
                data: categories,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },

    // GET /api/categories/:id
    async getById(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryModel.getById(id);

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: "Category not found",
                });
            }

            res.json({
                success: true,
                data: category,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },

    // GET /api/categories/gender/:gender
    async getByGender(req, res) {
        try {
            const { gender } = req.params;

            // Validate gender
            if (!["men", "women", "unisex"].includes(gender)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid gender. Must be: men, women, or unisex",
                });
            }

            const categories = await CategoryModel.getByGender(gender);
            res.json({
                success: true,
                data: categories,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },

    // POST /api/categories
    async create(req, res) {
        try {
            const { name, gender } = req.body;

            // Validation
            if (!name || !gender) {
                return res.status(400).json({
                    success: false,
                    message: "Name and gender are required",
                });
            }

            if (!["men", "women", "unisex"].includes(gender)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid gender. Must be: men, women, or unisex",
                });
            }

            const category = await CategoryModel.create({ name, gender });
            res.status(201).json({
                success: true,
                data: category,
                message: "Category created successfully",
            });
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    },

    // PUT /api/categories/:id
    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, gender } = req.body;

            // Validation
            if (gender && !["men", "women", "unisex"].includes(gender)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid gender. Must be: men, women, or unisex",
                });
            }

            const category = await CategoryModel.update(id, { name, gender });
            res.json({
                success: true,
                data: category,
                message: "Category updated successfully",
            });
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    },

    // DELETE /api/categories/:id
    async remove(req, res) {
        try {
            const { id } = req.params;
            const result = await CategoryModel.remove(id);
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