import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import categoryRoutes from "./routes/categoryRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Health check endpoint
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Wearify API is running",
        version: "1.0.0",
        endpoints: {
            categories: "/api/categories",
            brands: "/api/brands",
            products: "/api/products",
            orders: "/api/orders",
        },
    });
});

// API Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint not found",
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
});

// Start server
app.listen(port, () => {
    console.log(`
╔═══════════════════════════════════════╗
║                                       ║
║     🚀 WEARIFY API SERVER RUNNING    ║
║                                       ║
║     Port: ${port}                        ║
║     Environment: ${process.env.NODE_ENV || "development"}        ║
║                                       ║
║     Endpoints:                        ║
║     • GET  /                          ║
║     • /api/categories                 ║
║     • /api/brands                     ║
║     • /api/products                   ║
║     • /api/orders                     ║
║                                       ║
╚═══════════════════════════════════════╝
  `);
});

export default app;