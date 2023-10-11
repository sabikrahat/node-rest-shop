const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
    return res.status(200).json({
        message: "Handling GET requests to /products"
    });
});

router.post("/", (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
    };
    return res.status(201).json({
        message: "Handling POST requests to /products. You sent a product!",
        createdProduct: product
    });
});

router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    if (id === "special") {
        return res.status(200).json({
            message: "You discovered the special ID",
            id: id
        });
    } else {
        return res.status(200).json({
            message: "You passed an ID"
        });
    }
});

router.patch("/:productId", (req, res, next) => {
    return res.status(200).json({
        message: "Updated product!"
    });
});

router.delete("/:productId", (req, res, next) => {
    return res.status(200).json({
        message: "Deleted product!"
    });
});

module.exports = router;