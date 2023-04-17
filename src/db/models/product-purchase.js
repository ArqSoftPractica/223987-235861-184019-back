const uuid = require('uuid');
const sequelize = require('../connection/connection')

module.exports = (sequelize, DataTypes, Product, Purchase) => {
    const ProductPurchase = sequelize.define('product-purchase', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        productId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Product,
                key: 'id'
            },
        },
        purchaseId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Purchase,
                key: 'id'
            },
        },
        productQuantity: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        productCost: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    });

    return ProductPurchase;
}