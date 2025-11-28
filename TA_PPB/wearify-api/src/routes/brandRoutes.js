import express from "express";
import { BrandController } from "../controllers/brandController.js";

const router = express.Router();

// GET /api/brands - Get all brands
router.get("/", BrandController.getAll);

// GET /api/brands/:id - Get brand by ID
router.get("/:id", BrandController.getById);

// POST /api/brands - Create new brand
router.post("/", BrandController.create);

// PUT /api/brands/:id - Update brand
router.put("/:id", BrandController.update);

// DELETE /api/brands/:id - Delete brand
router.delete("/:id", BrandController.remove);

export default router;