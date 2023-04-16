const uuid = require('uuid');
const sequelize = require('../connection/connection')

module.exports = (sequelize, DataTypes, Provider) => {
    const Purchase = sequelize.define('pruchase', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        providerId:{
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Provider,
                key: 'id'
            },
        },
        totalcost: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    });

    return Purchase;
}
