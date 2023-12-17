// const mongoose = require("mongoose");

// const orderSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//     quantity: { type: Number, default: 1 },
// });

// module.exports = mongoose.model("Order", orderSchema);

module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("Order", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        product: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'orders',
        timestamps: false,
    }
    );

    Order.belongsTo(sequelize.models.Product, {
        foreignKey: 'product',
        as: 'product',
    });
    return Order;
}
