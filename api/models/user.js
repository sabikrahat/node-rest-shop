// const mongoose = require("mongoose");

// const userSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
//     },
//     password: { type: String, required: true },
// });

// module.exports = mongoose.model("User", userSchema);

const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Replace with your Sequelize instance

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, 
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: false, 
});

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("Users", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true, 
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
    return User;
}
