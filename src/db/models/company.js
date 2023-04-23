const uuid = require('uuid');
const sequelize = require('../connection/connection');
const crypto = require('crypto');

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
        },
        apiKey: {
            type: DataTypes.STRING
        },
    });

    Company.beforeCreate((company, options) => {
        company.apiKey = crypto.createHash('sha256').update(company.apiKey).digest('hex');
        return company
    })

    Company.prototype.isCorrectPassword = async function(apiKey) {
        var hash = crypto.createHash('sha256').update(apiKey).digest('hex');
        return this.apiKey === hash;
    }

    return Company;
}
