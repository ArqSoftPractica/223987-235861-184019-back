const uuid = require('uuid');
const sequelize = require('../connection/connection')

module.exports = (sequelize, DataTypes, Company) => {
    const Product = sequelize.define('product', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'name_companyId',
            validate: {
                notEmpty: true,
            }
        },
        companyId: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: 'name_companyId',
            references: {
                model: Company,
                key: 'id',
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {type: DataTypes.STRING},
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        totalProductCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        purchasedProductCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    });

    Product.prototype.stock = async function() {
        return this.totalProductCount - purchasedProductCount;
    }

    return Product;
}
