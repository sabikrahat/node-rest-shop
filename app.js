const express = require("express");
const app = express();
const morgan = require("morgan");

app.use("/check", (req, res, next) => {
    return res.status(200).json({
        message: "Hey Rahat! Server is up and running! :)",
    });
});

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

app.use(morgan("dev"));

// Routes which should handle requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// Error handling
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        error: {
            message: error.message,
        },
    });
});

module.exports = app;