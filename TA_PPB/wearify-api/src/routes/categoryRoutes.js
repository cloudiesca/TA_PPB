import express from "express";
import { CategoryController } from "../controllers/categoryController.js";

const router = express.Router();

// GET /api/categories - Get all categories
router.get("/", CategoryController.getAll);

// GET /api/categories/gender/:gender - Get categories by gender
router.get("/gender/:gender", CategoryController.getByGender);

// GET /api/categories/:id - Get category by ID
router.get("/:id", CategoryController.getById);

// POST /api/categories - Create new category
router.post("/", CategoryController.create);

// PUT /api/categories/:id - Update category
router.put("/:id", CategoryController.update);

// DELETE /api/categories/:id - Delete category
router.delete("/:id", CategoryController.remove);

export default router;