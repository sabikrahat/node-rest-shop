const express = require("express");

const app = express();

app.use("/check", (req, res, next) => {
    return res.status(200).json({
        message: "Hey Rahat! Server is up and running! :)",
    });
});

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

module.exports = app;