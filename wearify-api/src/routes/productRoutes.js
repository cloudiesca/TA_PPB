// import express from "express";
// import { ProductController } from "../controllers/productController.js";

// const router = express.Router();

// // GET /api/products - Get all products with filters
// router.get("/", ProductController.getAll);

// // GET /api/products/featured - Get featured products
// router.get("/featured", ProductController.getFeatured);

// // GET /api/products/:id - Get product by ID
// router.get("/:id", ProductController.getById);

// // POST /api/products - Create new product
// router.post("/", ProductController.create);

// // PUT /api/products/:id - Update product
// router.put("/:id", ProductController.update);

// // PATCH /api/products/:id/stock - Update product stock
// router.patch("/:id/stock", ProductController.updateStock);

// // DELETE /api/products/:id - Delete product
// router.delete("/:id", ProductController.remove);

// export default router;

import express from "express";
import { ProductController } from "../controllers/productController.js";

const router = express.Router();

// IMPORTANT: Specific routes MUST come BEFORE generic routes
// Otherwise /:id will catch "featured" and "gender"

// GET /api/products/featured - Get featured products
router.get("/featured", ProductController.getFeatured);

// GET /api/products/gender/:gender - Get products by gender
router.get("/gender/:gender", ProductController.getByGender);

// GET /api/products - Get all products with filters
router.get("/", ProductController.getAll);

// GET /api/products/:id - Get product by ID
router.get("/:id", ProductController.getById);

// POST /api/products - Create new product
router.post("/", ProductController.create);

// PUT /api/products/:id - Update product
router.put("/:id", ProductController.update);

// PATCH /api/products/:id/stock - Update product stock
router.patch("/:id/stock", ProductController.updateStock);

// DELETE /api/products/:id - Delete product
router.delete("/:id", ProductController.remove);

export default router;