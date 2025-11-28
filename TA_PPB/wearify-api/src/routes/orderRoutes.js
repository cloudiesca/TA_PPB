import express from "express";
import { OrderController } from "../controllers/orderController.js";

const router = express.Router();

// GET /api/orders - Get all orders
router.get("/", OrderController.getAll);

// GET /api/orders/user/:userIdentifier - Get orders by user
router.get("/user/:userIdentifier", OrderController.getByUser);

// GET /api/orders/:id - Get order by ID
router.get("/:id", OrderController.getById);

// POST /api/orders - Create new order (Checkout)
router.post("/", OrderController.create);

// PATCH /api/orders/:id/status - Update order status
router.patch("/:id/status", OrderController.updateStatus);

// PATCH /api/orders/:id/cancel - Cancel order
router.patch("/:id/cancel", OrderController.cancel);

// DELETE /api/orders/:id - Delete order
router.delete("/:id", OrderController.remove);

export default router;