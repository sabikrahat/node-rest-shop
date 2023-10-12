const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

// Connect to MongoDB
mongoose.connect(
    "mongodb+srv://node-rest-shop:"
    + process.env.MONGO_ATLAS_PWD +
    "@node-rest-shop.xv7vibr.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).catch(err => {
    console.log(err);
});
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS handling
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Check if server is up and running
app.use("/check", (req, res, next) => {
    return res.status(200).json({
        message: "Hey Rahat! Server is up and running! :)",
    });
});

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