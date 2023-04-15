const uuid = require('uuid');
const sequelize = require('../connection/connection')

module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('company', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            }
        }
    });

    return Company;
}
