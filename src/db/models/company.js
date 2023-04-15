const uuid = require('uuid');
const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection')

const Company = sequelize.define('company', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuid.v4(),
        primaryKey: true,
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        }
    }
});

module.exports = Company;
