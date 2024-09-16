// In ../postgres/postgres.js
module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isLowercase: true
            }
        },
        designation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        empId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });

    return User;
};
