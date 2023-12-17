// const mongoose = require("mongoose");

// const productSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     productImage: { type: String, required: true },
// });

// module.exports = mongoose.model("Product", productSchema);

module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("Products", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        price: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        productImage: {
            type: Sequelize.STRING,
        }
    }, {
        tableName: 'products',
        timestamps: false,
    }
    );
    return Product;
}