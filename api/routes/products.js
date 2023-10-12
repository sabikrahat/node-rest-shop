const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        return cb(null, true);
    }
    return cb(new Error("Invalid file type"), false);
}
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter,
});

const Product = require("../models/product");

router.get("/", (req, res, next) => {
    Product.find()
        .select("name price _id, productImage")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        productImage: doc.productImage,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/products/" + doc._id
                        }
                    };
                }),
            };
            console.log(response);
            return res.status(200).json(response);
        }).catch(err => {
            console.log(err);
            return res.status(500).json({ error: err });
        });
});

router.post("/", checkAuth, upload.single('productImage'), (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path,
    });
    product.save()
        .then(result => {
            console.log(result);
            return res.status(201).json({
                message: "Created product successfully",
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/products/" + result._id
                    }
                },
            });
        }).catch(err => {
            console.log(err);
            return res.status(500).json({ error: err });
        });
});

router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select("name price _id, productImage")
        .exec().then(doc => {
            console.log(doc);
            if (doc) {
                return res.status(200).json({
                    product: doc,
                    request: {
                        type: "GET",
                        description: "Get all products",
                        url: "http://localhost:3000/products/"
                    }
                });
            } else {
                return res.status(404).json({
                    message: "No valid entry found for provided ID"
                });
            }
        }).catch(err => {
            console.log(err);
            return res.status(500).json({ error: err });
        });
});

router.patch("/:productId", checkAuth, (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
        // updateOps = {
        //     name: req.body.name,
        //     price: req.body.price,
        // }
        // json api
        // [
        //     { "propName": "name", "value": "Updated name" },
        //     { "propName": "price", "value": "Updated price" },
        // ]
    }
    Product.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            return res.status(200).json({
                message: "Product updated",
                product: {
                    _id: id,
                    name: updateOps.name,
                    price: updateOps.price,
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3000/products/" + id
                }
            });
        }).catch(err => {
            console.log(err);
            return res.status(500).json({ error: err });
        });
});

router.delete("/:productId", checkAuth, (req, res, next) => {
    const id = req.params.productId;
    Product.deleteOne({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            return res.status(200).json({
                message: "Product deleted",
                request: {
                    type: "POST",
                    url: "http://localhost:3000/products/",
                    body: { name: "String", price: "Number" }
                }
            });
        }).catch(err => {
            console.log(err);
            return res.status(500).json({ error: err });
        });
});

module.exports = router;