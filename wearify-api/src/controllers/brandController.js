import { BrandModel } from "../models/brandModel.js";

export const BrandController = {
    // GET /api/brands
    async getAll(req, res) {
        try {
            const brands = await BrandModel.getAll();
            res.json({
                success: true,
                data: brands,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },

    // GET /api/brands/:id
    async getById(req, res) {
        try {
            const { id } = req.params;
            const brand = await BrandModel.getById(id);

            if (!brand) {
                return res.status(404).json({
                    success: false,
                    message: "Brand not found",
                });
            }

            res.json({
                success: true,
                data: brand,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },

    // POST /api/brands
    async create(req, res) {
        try {
            const { name, country, website } = req.body;

            // Validation
            if (!name) {
                return res.status(400).json({
                    success: false,
                    message: "Brand name is required",
                });
            }

            const brand = await BrandModel.create({ name, country, website });
            res.status(201).json({
                success: true,
                data: brand,
                message: "Brand created successfully",
            });
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    },

    // PUT /api/brands/:id
    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, country, website } = req.body;

            const brand = await BrandModel.update(id, { name, country, website });
            res.json({
                success: true,
                data: brand,
                message: "Brand updated successfully",
            });
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    },

    // DELETE /api/brands/:id
    async remove(req, res) {
        try {
            const { id } = req.params;
            const result = await BrandModel.remove(id);
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