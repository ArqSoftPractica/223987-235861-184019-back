const constants = require('../../constants')
const crypto = require('crypto');

module.exports = (sequelize, DataTypes, Company) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        companyId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Company,
                key: 'id',
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [8],
                    msg: 'Password must be at least 8 characters long',
                },
            },
        },
        role: {
            type: DataTypes.ENUM,
            values: constants.roles.all,
            allowNull: false
        }
    },  
    {
        beforeCreate: (user) => {
            console.log(user);
            user.password = crypto.createHash('sha256').update(user.password).digest('hex');
        },
        instanceMethods: {
            isCorrectPassword: (password) => {
                var hash = crypto.createHash('sha256').update(password).digest('hex');
                return this.password === hash;
            }
        }
    });
    
    User.belongsTo(Company, { foreignKey: 'companyId' });

    return User
}
