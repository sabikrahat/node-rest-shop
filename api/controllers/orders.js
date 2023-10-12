const mongoose = require("mongoose");

const Product = require("../models/product");
const Order = require("../models/order");


exports.get_all_orders = (req, res, next) => {
    Order.find()
        .select("product quantity _id")
        .populate("product", "name price _id")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/orders/" + doc._id
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
};

exports.create_order = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                product: req.body.productId,
                quantity: req.body.quantity,
            });
            order.save()
                .then(result => {
                    console.log(result);
                    return res.status(201).json({
                        message: "Order stored",
                        createdOrder: {
                            _id: result._id,
                            product: {
                                _id: result.product,
                                name: product.name,
                                price: product.price
                            },
                            quantity: result.quantity
                        },
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/orders/" + result._id
                        }
                    });
                });
        }).catch(err => {
            console.log(err);
            return res.status(500).json({ error: err });
        });
};

exports.get_order = (req, res, next) => {
    Order.findById(req.params.orderId)
        .select("product quantity _id")
        .populate("product", "name price _id")
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            return res.status(200).json({
                order: order,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders"
                }
            });
        }).catch(err => {
            console.log(err);
            return res.status(500).json({ error: err });
        });
};

exports.delete_order = (req, res, next) => {
    Order.deleteOne({ _id: req.params.orderId })
        .exec()
        .then(result => {
            return res.status(200).json({
                message: "Order deleted",
                request: {
                    type: "POST",
                    url: "http://localhost:3000/orders",
                    body: { productId: "ID", quantity: "Number" }
                }
            });
        }).catch(err => {
            console.log(err);
            return res.status(500).json({ error: err });
        });
}
